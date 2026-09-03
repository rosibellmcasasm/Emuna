"use client";

import { useRouter } from "next/navigation";
import { Compass } from "lucide-react";
import { motion } from "motion/react";
import { IconChip } from "@/components/app/IconChip";
import { Mark } from "@/components/brand/Mark";

export default function OnboardingBienvenida() {
  const router = useRouter();

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-surface-base px-6 py-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3"
      >
        <Mark size={76} />
        <span className="text-[22px] font-bold text-txt-primary">Emuná</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10"
      >
        <IconChip tone="gold" size={72} shape="circle">
          <Compass size={34} color="var(--brand-primary)" aria-hidden="true" />
        </IconChip>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mt-6 max-w-[320px] text-[30px] font-extrabold leading-[1.12] tracking-tight text-txt-primary"
        style={{ textWrap: "balance" }}
      >
        Vamos a resolver tu primer Expediente juntos
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mt-3 max-w-[340px] text-[15.5px] leading-relaxed text-txt-secondary"
      >
        En unos minutos vas a tener el Caso 01 resuelto — sin preparar nada,
        gratis y sin tarjeta.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="mt-9 w-full max-w-[320px]"
      >
        <button
          type="button"
          onClick={() => router.push("/onboarding/edad")}
          className="flex h-14 w-full items-center justify-center rounded-[var(--radius-md)] bg-brand-primary text-[16px] font-semibold text-txt-inverse shadow-[0_8px_30px_color-mix(in_oklab,var(--brand-primary)_20%,transparent)] transition active:scale-[0.97]"
        >
          Empezar
        </button>
      </motion.div>
    </main>
  );
}
