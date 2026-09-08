// Verificación del hottok de Hotmart — comparación en TIEMPO CONSTANTE para no
// filtrar el secreto por temporización (ver docs/sistema/18-VENTA-HOTMART.md,
// "Autenticidad — verificar el hottok correctamente"). NUNCA usar `!==` acá.
import crypto from "node:crypto";

function timingSafeEqualStr(a: string, b: string): boolean {
  const ba = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

export function verifyHotmart(receivedHottok: string | undefined | null): boolean {
  const secret = process.env.HOTMART_HOTTOK;
  if (!secret || !receivedHottok) return false;
  return timingSafeEqualStr(receivedHottok, secret);
}
