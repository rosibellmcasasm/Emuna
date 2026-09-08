"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Award, Flame, CalendarCheck } from "lucide-react";
import { motion } from "motion/react";
import { IconChip } from "@/components/app/IconChip";
import {
  getOnboardingState,
  EDAD_LABEL,
  TIEMPO_LABEL,
  type OnboardingState,
} from "@/lib/onboarding-store";

export default function OnboardingResumen() {
  const router = useRouter();
  const [state, setState] = useState<OnboardingState | null>(null);

  useEffect(() => {
    setState(getOnboardingState());
  }, []);

  const edadLabel = state?.edad ? EDAD_LABEL[state.edad] : "tu hijo";
  const tiempoLabel = state?.tiempo ? TIEMPO_LABEL[state.tiempo] : "10-15 minutos";

  return (
    <main className="flex min-h-dvh flex-col bg-surface-base px-6 py-10">
      <div className="mx-auto flex w-full max-w-[400px] flex-1 flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="text-[12px] font-bold uppercase tracking-wide text-brand-primary">
            Tu plan
          </p>
          <h1 className="mt-2 text-[26px] font-extrabold leading-snug text-txt-primary">
            1 Expediente por semana
          </h1>
          <p className="mt-2 text-[15.5px] leading-relaxed text-txt-secondary">
            ~{tiempoLabel} con tu hijo de {edadLabel}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-col gap-3"
        >
          <div className="flex items-center gap-4 rounded-[var(--radius-md)] border border-border-default bg-surface-elevated p-4">
            <IconChip tone="rust" size={44}>
              <Flame size={22} color="var(--brand-detail)" aria-hidden="true" />
            </IconChip>
            <div>
              <p className="text-[15px] font-bold text-txt-primary">Racha iniciada</p>
              <p className="text-[13.5px] text-txt-secondary">1 Caso resuelto seguido</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-[var(--radius-md)] border border-border-default bg-surface-elevated p-4">
            <IconChip tone="gold" size={44}>
              <Award size={22} color="var(--brand-primary)" aria-hidden="true" />
            </IconChip>
            <div>
              <p className="text-[15px] font-bold text-txt-primary">Investigador Jr.</p>
              <p className="text-[13.5px] text-txt-secondary">Insignia recién ganada</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-[var(--radius-md)] border border-border-default bg-surface-elevated p-4">
            <IconChip tone="sage" size={44}>
              <CalendarCheck size={22} color="var(--brand-secondary)" aria-hidden="true" />
            </IconChip>
            <div>
              <p className="text-[15px] font-bold text-txt-primary">52 Casos al año</p>
              <p className="text-[13.5px] text-txt-secondary">1 nuevo cada semana</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9"
        >
          <button
            type="button"
            onClick={() => router.push("/onboarding/paywall")}
            className="flex h-14 w-full items-center justify-center rounded-[var(--radius-md)] bg-brand-primary text-[16px] font-semibold text-txt-inverse shadow-[0_8px_30px_color-mix(in_oklab,var(--brand-primary)_20%,transparent)] transition active:scale-[0.97]"
          >
            Ver los 52 Casos
          </button>
        </motion.div>
      </div>
    </main>
  );
}
