"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Award, Flame, RotateCcw, Lock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Mark } from "@/components/brand/Mark";
import { IconChip } from "@/components/app/IconChip";
import { GradientBorderCard } from "@/components/app/GradientBorderCard";
import { RevealGroup, RevealItem } from "@/components/app/Reveal";
import { BottomNav } from "@/components/app/BottomNav";
import {
  getProgresoState,
  tieneAccesoApp,
  reiniciarProgreso,
  type ProgresoState,
} from "@/lib/onboarding-store";
import { CASOS_COMPLETOS, TOTAL_CASOS } from "@/lib/casos";

type EstadoCarga = "cargando" | "listo";

export default function PerfilPage() {
  const router = useRouter();
  const [carga, setCarga] = useState<EstadoCarga>("cargando");
  const [progreso, setProgreso] = useState<ProgresoState | null>(null);
  const [confirmando, setConfirmando] = useState(false);
  const [reiniciando, setReiniciando] = useState(false);

  useEffect(() => {
    let cancelado = false;
    (async () => {
      if (!(await tieneAccesoApp())) {
        router.replace("/onboarding");
        return;
      }
      const progresoReal = await getProgresoState();
      if (cancelado) return;
      setProgreso(progresoReal);
      setCarga("listo");
    })();
    return () => {
      cancelado = true;
    };
  }, [router]);

  async function handleReiniciar() {
    setReiniciando(true);
    await reiniciarProgreso();
    router.push("/onboarding");
  }

  if (carga !== "listo" || !progreso) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center bg-surface-base px-6">
        <Mark size={40} />
      </main>
    );
  }

  // Insignias posibles: las de los Casos completos + las ya ganadas de Casos futuros.
  const insigniasPosibles = new Map<number, string>();
  CASOS_COMPLETOS.forEach((c) => insigniasPosibles.set(c.id, c.insignia));
  Object.entries(progreso.insignias).forEach(([id, nombre]) => insigniasPosibles.set(Number(id), nombre));

  return (
    <main className="flex min-h-dvh flex-col bg-surface-base">
      <div className="mx-auto flex w-full max-w-[440px] flex-1 flex-col px-4 pb-4 pt-6">
        <div className="flex items-center gap-2.5">
          <Mark size={36} />
          <div>
            <h1 className="text-[19px] font-extrabold text-txt-primary">Tu progreso</h1>
            <p className="text-[12.5px] text-txt-tertiary">Racha e insignias</p>
          </div>
        </div>

        {/* Racha */}
        <RevealGroup className="mt-6">
          <RevealItem>
            <GradientBorderCard hue="var(--brand-detail)" className="bg-surface-primary p-5">
              <div className="flex items-center gap-4">
                <IconChip tone="rust" size={52}>
                  <Flame size={26} color="var(--brand-detail)" aria-hidden="true" />
                </IconChip>
                <div>
                  <p className="text-[28px] font-extrabold tabular-nums leading-none text-txt-primary">
                    {progreso.racha}
                  </p>
                  <p className="mt-1 text-[13.5px] text-txt-secondary">
                    {progreso.racha === 1 ? "día seguido resolviendo Casos" : "días seguidos resolviendo Casos"}
                  </p>
                </div>
              </div>
            </GradientBorderCard>
          </RevealItem>
        </RevealGroup>

        {/* Insignias */}
        <div className="mt-8 flex items-center justify-between">
          <h2 className="text-[15px] font-bold text-txt-primary">Insignias</h2>
          <span className="text-[12.5px] tabular-nums text-txt-tertiary">
            {progreso.casosResueltos.length}/{TOTAL_CASOS}
          </span>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-3">
          {Array.from(insigniasPosibles.entries()).map(([casoId, nombre]) => {
            const ganada = progreso.casosResueltos.includes(casoId);
            return (
              <div
                key={casoId}
                className={`flex flex-col items-center gap-2 rounded-[var(--radius-md)] border p-3 text-center ${
                  ganada
                    ? "border-brand-primary bg-brand-primary-soft"
                    : "border-border-default bg-surface-secondary"
                }`}
              >
                <IconChip tone={ganada ? "gold" : "neutral"} size={44} shape="circle">
                  {ganada ? (
                    <Award size={20} color="var(--brand-primary)" aria-hidden="true" />
                  ) : (
                    <Lock size={16} color="var(--text-tertiary)" aria-hidden="true" />
                  )}
                </IconChip>
                <span
                  className={`text-[11.5px] font-semibold leading-tight ${
                    ganada ? "text-txt-primary" : "text-txt-tertiary"
                  }`}
                >
                  {ganada ? nombre : "Por ganar"}
                </span>
              </div>
            );
          })}
        </div>

        {/* Reiniciar progreso */}
        <div className="mt-10">
          <button
            type="button"
            onClick={() => setConfirmando(true)}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-md)] border border-border-default text-[14px] font-medium text-txt-secondary transition active:scale-[0.97]"
          >
            <RotateCcw size={16} aria-hidden="true" />
            Reiniciar mi progreso
          </button>
        </div>

        <AnimatePresence>
          {confirmando && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 flex items-end justify-center bg-surface-overlay px-4 pb-6 sm:items-center"
              onClick={() => setConfirmando(false)}
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-[380px] rounded-[var(--radius-lg)] bg-surface-elevated p-6"
              >
                <h3 className="text-[18px] font-extrabold text-txt-primary">
                  ¿Reiniciar todo tu progreso?
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-txt-secondary">
                  Perderás tu racha, tus insignias y los Casos resueltos. Esto es
                  solo para volver a probar la app — no se puede deshacer.
                </p>
                <div className="mt-6 flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={handleReiniciar}
                    disabled={reiniciando}
                    className="flex h-12 w-full items-center justify-center rounded-[var(--radius-md)] bg-brand-detail text-[14.5px] font-semibold text-txt-inverse transition active:scale-[0.97] disabled:opacity-60"
                  >
                    {reiniciando ? "Reiniciando…" : "Sí, reiniciar todo"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmando(false)}
                    disabled={reiniciando}
                    className="flex h-12 w-full items-center justify-center rounded-[var(--radius-md)] text-[14.5px] font-medium text-txt-secondary transition active:scale-[0.97] disabled:opacity-60"
                  >
                    Cancelar
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BottomNav />
    </main>
  );
}
