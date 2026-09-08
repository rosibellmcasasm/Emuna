"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock } from "lucide-react";
import { motion } from "motion/react";
import { IconChip } from "@/components/app/IconChip";
import { PaywallStack, TOTAL_STACK } from "@/components/app/PaywallStack";
import { Mark } from "@/components/brand/Mark";
import {
  getOnboardingState,
  EDAD_LABEL,
  TIEMPO_LABEL,
  type OnboardingState,
} from "@/lib/onboarding-store";
import { hotmartCheckoutHref } from "@/lib/hotmart-config";

export default function PaywallPage() {
  const router = useRouter();
  const [state, setState] = useState<OnboardingState | null>(null);

  useEffect(() => {
    setState(getOnboardingState());
  }, []);

  function handleDesbloquear() {
    // Todavía no hay cuenta en este punto — Hotmart no la necesita para
    // cobrar, el webhook conecta el pago con la cuenta por email (o la crea
    // si compra antes de registrarse, vía `compras_pendientes`).
    const checkoutHref = hotmartCheckoutHref();
    if (checkoutHref) {
      window.location.href = checkoutHref;
      return;
    }
    router.push("/onboarding/registro?camino=pago");
  }

  const edadLabel = state?.edad ? EDAD_LABEL[state.edad] : null;
  const tiempoLabel = state?.tiempo ? TIEMPO_LABEL[state.tiempo] : null;

  return (
    <main className="flex min-h-dvh flex-col bg-surface-base px-4 py-6">
      <div className="mx-auto flex w-full max-w-[440px] flex-1 flex-col">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="Volver al inicio de Emuná">
            <Mark size={34} />
            <span className="text-[15px] font-bold text-txt-primary">Emuná</span>
          </Link>
        </div>

        {/* (2) Headline de resultado — responde "¿qué desbloqueo?" */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7"
        >
          <h1
            className="text-[28px] font-extrabold leading-[1.12] text-txt-primary"
            style={{ textWrap: "balance" }}
          >
            Tu primer Caso, resuelto. Desbloquea los otros 51.
          </h1>
          {edadLabel && tiempoLabel && (
            <p className="mt-2 text-[14.5px] leading-relaxed text-txt-secondary">
              Tu plan: 1 Expediente por semana, ~{tiempoLabel} con tu hijo de{" "}
              {edadLabel} — sigue justo donde quedaron.
            </p>
          )}
        </motion.div>

        {/* (3) Value stack — máx 3 beneficios */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6"
        >
          <PaywallStack />
        </motion.div>

        {/* (4) Precio — pago único, sin ancla mensual porque no aplica a este modelo */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 rounded-[var(--radius-lg)] border-2 border-brand-primary bg-brand-primary-soft p-6 text-center"
        >
          <span className="inline-block rounded-full bg-brand-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-txt-inverse">
            Pago único · sin mensualidades
          </span>
          <p className="mt-3 text-[13px] text-txt-tertiary">
            Valor total <span className="line-through">${TOTAL_STACK}</span>
          </p>
          <p className="mt-1 text-[44px] font-extrabold tabular-nums text-txt-primary">$29</p>
          <p className="text-[13.5px] text-txt-secondary">
            pago único · acceso de por vida a los 52 Casos
          </p>
        </motion.div>

        {/* Diferenciador #1: objeción de dinero/modelo, textual de FICHA-AVATAR.md */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-center text-[13.5px] leading-relaxed text-txt-secondary"
        >
          Nada de suscripciones que te siguen cobrando aunque no la abras.
          Pagas una vez, es tuyo para siempre.
        </motion.p>

        {/* CTA héroe */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5"
        >
          <button
            type="button"
            onClick={handleDesbloquear}
            className="flex h-14 w-full items-center justify-center rounded-[var(--radius-md)] bg-brand-primary text-[16px] font-semibold text-txt-inverse shadow-[0_8px_30px_color-mix(in_oklab,var(--brand-primary)_20%,transparent)] transition active:scale-[0.97]"
          >
            Desbloquear los 52 Casos
          </button>
        </motion.div>

        {/* Garantía — responde "¿puedo cancelar / qué riesgo corro?" */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 flex items-start gap-3 rounded-[var(--radius-md)] bg-surface-secondary p-4"
        >
          <IconChip tone="sage" size={40}>
            <ShieldCheck size={20} color="var(--brand-secondary)" aria-hidden="true" />
          </IconChip>
          <div>
            <p className="text-[14px] font-bold text-txt-primary">
              La Garantía del Primer Caso Resuelto
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-txt-secondary">
              Si en tus primeros 7 días tu hijo y tú no sienten que resolvieron
              su primer Caso de verdad, escríbenos y te devolvemos todo.
            </p>
          </div>
        </motion.div>

        {/* Salida limpia y honesta — camino gratis real */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-center"
        >
          <button
            type="button"
            onClick={() => router.push("/onboarding/registro?camino=gratis")}
            className="min-h-11 text-[14px] font-medium text-txt-secondary underline decoration-border-strong underline-offset-4 transition hover:text-txt-primary"
          >
            Seguir gratis con el Módulo 1
          </button>
          <p className="mt-2 text-[12.5px] text-txt-tertiary">
            Acceso a los Casos 2-4 sin pagar, sin tarjeta
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex items-center justify-center gap-1.5 pb-4 text-[12px] text-txt-tertiary"
        >
          <Lock size={13} aria-hidden="true" />
          Respaldada por la garantía Hotmart de 7 días
        </motion.p>
      </div>
    </main>
  );
}
