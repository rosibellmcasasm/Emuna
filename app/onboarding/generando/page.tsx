"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import { getOnboardingState, EDAD_LABEL, type EdadHijo } from "@/lib/onboarding-store";
import { AnimatedMark } from "@/components/brand/Mark";

type Paso = { label: string; status: "pendiente" | "activa" | "completada" };

export default function OnboardingGenerando() {
  const router = useRouter();
  const [edad, setEdad] = useState<EdadHijo | null>(null);
  const [pasos, setPasos] = useState<Paso[]>([]);

  useEffect(() => {
    const state = getOnboardingState();
    setEdad(state.edad);
    setPasos([
      {
        label: `Eligiendo la pregunta para ${state.edad ? EDAD_LABEL[state.edad] : "su edad"}`,
        status: "activa",
      },
      { label: "Preparando la evidencia del Caso 01", status: "pendiente" },
      { label: "Expediente listo", status: "pendiente" },
    ]);
  }, []);

  useEffect(() => {
    if (pasos.length === 0) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(
      setTimeout(() => {
        setPasos((prev) =>
          prev.map((p, i) => (i === 0 ? { ...p, status: "completada" } : i === 1 ? { ...p, status: "activa" } : p))
        );
      }, 900)
    );
    timers.push(
      setTimeout(() => {
        setPasos((prev) =>
          prev.map((p, i) => (i === 1 ? { ...p, status: "completada" } : i === 2 ? { ...p, status: "activa" } : p))
        );
      }, 1800)
    );
    timers.push(
      setTimeout(() => {
        setPasos((prev) => prev.map((p, i) => (i === 2 ? { ...p, status: "completada" } : p)));
      }, 2500)
    );
    timers.push(setTimeout(() => router.push("/onboarding/caso-01"), 3100));

    return () => timers.forEach(clearTimeout);
  }, [pasos.length, router]);

  const completadas = pasos.filter((p) => p.status === "completada").length;
  const progresoPct = pasos.length ? Math.round((completadas / pasos.length) * 100) : 0;

  return (
    <main
      className="flex min-h-dvh flex-col items-center justify-center bg-surface-base px-6 py-10 text-center"
      aria-live="polite"
      aria-busy={progresoPct < 100}
    >
      <div className="relative flex size-28 items-center justify-center">
        <AnimatedMark size={112} title="Armando tu Expediente" className="rounded-[26px] shadow-[0_10px_30px_color-mix(in_oklab,var(--brand-primary)_22%,transparent)]" />
      </div>

      <p className="mt-4 text-[13px] font-semibold tabular-nums text-txt-tertiary" aria-hidden="true">
        {progresoPct}%
      </p>

      <h1 className="mt-6 text-[22px] font-bold text-txt-primary">
        Armando tu primer Expediente…
      </h1>

      <div className="mt-8 flex w-full max-w-[320px] flex-col gap-4 text-left">
        {pasos.map((paso, i) => (
          <motion.div
            key={paso.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: paso.status === "pendiente" ? 0.4 : 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            {paso.status === "completada" ? (
              <motion.span
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-primary"
              >
                <Check size={14} strokeWidth={3} color="var(--text-inverse)" aria-hidden="true" />
              </motion.span>
            ) : paso.status === "activa" ? (
              <span className="relative flex size-6 shrink-0 items-center justify-center">
                <motion.span
                  className="size-2.5 rounded-full bg-brand-primary"
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                />
              </span>
            ) : (
              <span className="size-6 shrink-0 rounded-full border-2 border-border-strong" />
            )}
            <span className="text-[15px] leading-snug text-txt-primary">{paso.label}</span>
          </motion.div>
        ))}
      </div>

      <p className="sr-only">{edad ? `Edad seleccionada: ${EDAD_LABEL[edad]}` : ""}</p>
    </main>
  );
}
