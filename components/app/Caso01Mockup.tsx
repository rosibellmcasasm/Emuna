"use client";

import { useState } from "react";
import { Search, FlaskConical, Sparkles, Award } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { AnimatedMark } from "@/components/brand/Mark";

const PASOS = [
  {
    label: "El expediente",
    kicker: "CASO 01",
    icon: Search,
    title: "El Enigma del Origen del Universo",
    body: "“¿Cómo sabes que Dios existe, si nadie lo ha visto?”",
  },
  {
    label: "Las pistas",
    kicker: "EVIDENCIA",
    icon: FlaskConical,
    title: "Dos pistas para investigar",
    body: "Pista Ciencia: todo lo que empieza a existir tiene una causa.\nPista Lógica: el universo tuvo un comienzo (el Big Bang).",
  },
  {
    label: "La conclusión",
    kicker: "VEREDICTO",
    icon: Sparkles,
    title: "¿Qué es lo más razonable pensar?",
    body: "Que el universo tuvo una causa — y a esa causa muchos la llaman Dios.",
  },
  {
    label: "La insignia",
    kicker: "CASO RESUELTO",
    icon: Award,
    title: "Investigador Jr.",
    body: "Insignia desbloqueada. El expediente de la semana que viene ya te está esperando.",
  },
];

export function Caso01Mockup() {
  const [active, setActive] = useState(0);
  const paso = PASOS[active];
  const Icon = paso.icon;

  return (
    <div className="mx-auto w-full max-w-[300px]">
      <div className="relative overflow-hidden rounded-[28px] border-[6px] border-[#362B18] bg-surface-primary shadow-[0_16px_40px_color-mix(in_oklab,var(--brand-primary)_22%,transparent)]">
        <div className="flex items-center justify-between border-b border-border-default bg-surface-secondary px-4 py-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wide text-brand-primary">
            {paso.kicker}
          </span>
          <span className="text-[11px] font-medium text-txt-tertiary">
            {active + 1}/{PASOS.length}
          </span>
        </div>
        <div className="flex min-h-[280px] flex-col justify-between p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-3"
            >
              {active === PASOS.length - 1 ? (
                <AnimatedMark size={44} title="Insignia desbloqueada" className="rounded-[var(--radius-md)]" />
              ) : (
                <div className="flex size-11 items-center justify-center rounded-[var(--radius-md)] border border-[color-mix(in_oklab,var(--brand-primary)_25%,transparent)] bg-brand-primary-soft">
                  <Icon size={22} color="var(--brand-primary)" aria-hidden="true" />
                </div>
              )}
              <h4 className="text-lg font-bold leading-snug text-txt-primary">
                {paso.title}
              </h4>
              <p className="whitespace-pre-line text-[13.5px] leading-relaxed text-txt-secondary">
                {paso.body}
              </p>
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setActive((prev) => (prev + 1) % PASOS.length)}
            className="mt-4 w-full rounded-[var(--radius-md)] bg-brand-primary py-2.5 text-sm font-semibold text-txt-inverse transition active:scale-[0.97]"
          >
            {active === PASOS.length - 1 ? "Ver de nuevo" : "Siguiente pista"}
          </button>
        </div>
      </div>
      <p className="mt-3 text-center text-[11px] uppercase tracking-wide text-txt-tertiary">
        Mockup del mecanismo real · Caso 01, gratis en la app
      </p>
    </div>
  );
}
