"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Mail } from "lucide-react";
import { motion } from "motion/react";
import { IconChip } from "@/components/app/IconChip";
import { getAuthState } from "@/lib/onboarding-store";

function ConfirmacionContent() {
  const params = useSearchParams();
  const camino = params.get("camino") === "gratis" ? "gratis" : "pago";
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail(getAuthState().email);
  }, []);

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-surface-base px-6 py-10 text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <IconChip tone="sage" size={76} shape="circle">
          <CheckCircle2 size={36} color="var(--brand-secondary)" aria-hidden="true" />
        </IconChip>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.12 }}
        className="mx-auto mt-6 max-w-[320px] text-[26px] font-extrabold leading-snug text-txt-primary"
      >
        {camino === "gratis" ? "Cuenta creada — Módulo 1 desbloqueado" : "Cuenta creada"}
      </motion.h1>

      {camino === "gratis" ? (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mx-auto mt-3 max-w-[340px] text-[15.5px] leading-relaxed text-txt-secondary"
        >
          Ya tienes acceso a los Casos 1-4, gratis. {email ? `Guardamos tu progreso en ${email}.` : ""}{" "}
          Cuando quieras los 52 Casos completos, puedes desbloquearlos por $29,
          pago único, cuando decidas.
        </motion.p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mx-auto mt-3 flex max-w-[340px] items-start gap-3 rounded-[var(--radius-md)] bg-surface-secondary p-4 text-left"
        >
          <Mail size={20} color="var(--brand-primary)" className="mt-0.5 shrink-0" aria-hidden="true" />
          <p className="text-[14px] leading-relaxed text-txt-secondary">
            Tu cuenta quedó lista{email ? ` con ${email}` : ""}. El pago real de
            $29 por Hotmart todavía no está conectado — se activa en la próxima
            etapa de construcción. Por ahora ya tienes acceso al Módulo 1
            gratis mientras tanto.
          </p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-9 w-full max-w-[300px]"
      >
        <Link
          href="/app"
          className="flex h-14 w-full items-center justify-center rounded-[var(--radius-md)] bg-brand-primary text-[16px] font-semibold text-txt-inverse transition active:scale-[0.97]"
        >
          Ir a mis Casos
        </Link>
      </motion.div>
    </main>
  );
}

export default function ConfirmacionPage() {
  return (
    <Suspense fallback={null}>
      <ConfirmacionContent />
    </Suspense>
  );
}
