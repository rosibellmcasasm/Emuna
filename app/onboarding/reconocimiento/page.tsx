"use client";

import { useRouter } from "next/navigation";
import { HeartHandshake } from "lucide-react";
import { motion } from "motion/react";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { IconChip } from "@/components/app/IconChip";

// Dolor emocional #6 de FICHA-AVATAR.md, desculpabilizado — fórmula de 50 → A5
export default function OnboardingReconocimiento() {
  const router = useRouter();

  return (
    <OnboardingShell progress={55} onBack={() => router.push("/onboarding/reto")}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-1 flex-col items-center justify-center text-center"
      >
        <IconChip tone="sage" size={72} shape="circle">
          <HeartHandshake size={34} color="var(--brand-secondary)" aria-hidden="true" />
        </IconChip>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-[320px] text-[26px] font-extrabold leading-[1.15] text-txt-primary"
          style={{ textWrap: "balance" }}
        >
          No es que te falte compromiso
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-3 max-w-[320px] text-[16px] leading-relaxed text-txt-secondary"
        >
          Es que nadie te dio las herramientas. Le pasa a la gran mayoría de
          los papás, no solo a ti — y hoy eso cambia.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          type="button"
          onClick={() => router.push("/onboarding/tiempo")}
          className="flex h-14 w-full items-center justify-center rounded-[var(--radius-md)] bg-brand-primary text-[16px] font-semibold text-txt-inverse transition active:scale-[0.97]"
        >
          Continuar
        </button>
      </motion.div>
    </OnboardingShell>
  );
}
