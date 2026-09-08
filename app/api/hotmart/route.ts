// Webhook de Hotmart — el único lugar donde se marca `perfiles.pagado = true`.
// Sigue las 4 defensas de docs/sistema/18-VENTA-HOTMART.md: autenticidad (hottok en
// tiempo constante) → frescura (anti-replay) → idempotencia (no reprocesar el mismo
// evento) → autorización (una transición terminal como REFUNDED/CHARGEBACK nunca se
// revierte con un APPROVED viejo reentregado).
//
// Modelo de esta app: PAGO ÚNICO (no suscripción) — no hay FSM de trial/past_due,
// solo dos direcciones: compra aprobada concede acceso; reembolso/contracargo lo
// revoca, sin excepción (coherente con la Garantía del Primer Caso Resuelto).
export const runtime = "nodejs"; // node:crypto no corre en Edge

import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { verifyHotmart } from "@/lib/hotmart-verify";
import { createAdminClient } from "@/lib/supabase/admin";

const REPLAY_WINDOW_MS = 5 * 60 * 1000;

const EVENTOS_APRUEBAN = new Set(["PURCHASE_APPROVED", "PURCHASE_COMPLETE"]);
const EVENTOS_REVOCAN = new Set(["PURCHASE_REFUNDED", "PURCHASE_CHARGEBACK"]);
const ESTADOS_TERMINALES_NEGATIVOS = new Set(["PURCHASE_REFUNDED", "PURCHASE_CHARGEBACK"]);

type HotmartPayload = {
  id?: string;
  event_id?: string;
  event?: string;
  hottok?: string;
  creation_date?: number;
  data?: {
    purchase?: {
      transaction?: string;
      approved_date?: number;
      status?: string;
    };
    buyer?: {
      email?: string;
      name?: string;
    };
  };
};

async function registrarLog(
  admin: ReturnType<typeof createAdminClient>,
  eventId: string | null,
  type: string | null,
  result: "applied" | "duplicate" | "ignored" | "unauthorized" | "error"
) {
  await admin.from("webhook_log").insert({ event_id: eventId, type, result });
}

export async function POST(request: Request) {
  const admin = createAdminClient();

  // 1. RAW body — bytes exactos, antes de parsear (si tu cuenta de Hotmart llegara a
  //    documentar una firma propia además del hottok, se verifica sobre esto).
  const rawBody = await request.text();

  // 2. Autenticidad — hottok en header (estándar) o en el propio body (algunas cuentas viejas).
  let payload: HotmartPayload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const hottokRecibido = request.headers.get("x-hotmart-hottok") ?? payload.hottok;
  if (!verifyHotmart(hottokRecibido)) {
    await registrarLog(admin, null, payload.event ?? null, "unauthorized");
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // 3. Frescura — anti-replay. Si el evento no trae fecha fiable, no bloquear por esto.
  const ts = payload.creation_date ?? payload.data?.purchase?.approved_date;
  if (ts && Date.now() - Number(ts) > REPLAY_WINDOW_MS) {
    await registrarLog(admin, null, payload.event ?? null, "ignored");
    return NextResponse.json({ error: "stale" }, { status: 400 });
  }

  const evento = payload.event ?? "";
  const email = payload.data?.buyer?.email;
  const transactionId =
    payload.id ?? payload.event_id ?? payload.data?.purchase?.transaction ?? null;

  // Compuesto determinista para dedupe si Hotmart no manda un id — NUNCA Date.now().
  const eventId = transactionId ?? `${evento}:${email ?? "sin-email"}:${ts ?? "sin-fecha"}`;

  if (!EVENTOS_APRUEBAN.has(evento) && !EVENTOS_REVOCAN.has(evento)) {
    // Evento que no nos interesa (ej. de un tipo de producto/plan que no vendemos) — 200
    // para que Hotmart no reintente, pero lo dejamos en el log por si acaso.
    await registrarLog(admin, eventId, evento, "ignored");
    return NextResponse.json({ received: true, ignored: evento });
  }

  if (!email) {
    await registrarLog(admin, eventId, evento, "error");
    return NextResponse.json({ error: "sin_email_en_payload" }, { status: 400 });
  }

  // 4. Idempotencia + autorización — buscamos el perfil por email (o creamos/actualizamos
  //    la reserva en `compras_pendientes` si todavía no se registró en la app).
  const { data: perfil } = await admin
    .from("perfiles")
    .select("id, hotmart_transaction_id, hotmart_status")
    .eq("email", email)
    .maybeSingle();

  if (perfil) {
    // Ya procesamos exactamente esta transacción antes → duplicado, no repetir el update.
    if (transactionId && perfil.hotmart_transaction_id === transactionId) {
      await registrarLog(admin, eventId, evento, "duplicate");
      return NextResponse.json({ received: true, result: "duplicate" });
    }
    // Un evento terminal negativo (reembolso/contracargo) nunca se revierte con un
    // APPROVED reentregado tarde — regla dura de la máquina de estados.
    if (
      EVENTOS_APRUEBAN.has(evento) &&
      perfil.hotmart_status &&
      ESTADOS_TERMINALES_NEGATIVOS.has(perfil.hotmart_status)
    ) {
      await registrarLog(admin, eventId, evento, "ignored");
      return NextResponse.json({ received: true, result: "illegal_transition" });
    }

    await admin
      .from("perfiles")
      .update({
        pagado: EVENTOS_APRUEBAN.has(evento),
        hotmart_transaction_id: transactionId,
        hotmart_status: evento,
      })
      .eq("id", perfil.id);
  } else if (EVENTOS_APRUEBAN.has(evento)) {
    // Compró antes de crear su cuenta en la app — se reserva por email; el trigger
    // `handle_new_user` (ver migración `esquema_inicial_emuna`) la reconcilia al registrarse.
    await admin
      .from("compras_pendientes")
      .upsert(
        { email, hotmart_transaction_id: transactionId ?? eventId },
        { onConflict: "email" }
      );
  } else {
    // Reembolso/contracargo de alguien que nunca llegó a crear cuenta — nada que revocar.
    await registrarLog(admin, eventId, evento, "ignored");
    return NextResponse.json({ received: true, result: "sin_cuenta" });
  }

  await registrarLog(admin, eventId, evento, "applied");
  // Siempre 200 cuando la decisión se tomó (incluidos duplicados/ignorados) — así Hotmart
  // deja de reintentar. Solo respondemos con error real cuando algo falló de verdad.
  return NextResponse.json({ received: true, result: "applied" });
}
