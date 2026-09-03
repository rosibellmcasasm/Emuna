"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  FlaskConical,
  Brain,
  Sparkles,
  Award,
  Check,
  X,
  BookOpen,
  NotebookPen,
  ClipboardCheck,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { IconChip } from "@/components/app/IconChip";
import { setOnboardingState } from "@/lib/onboarding-store";
import { AnimatedMark } from "@/components/brand/Mark";
import { CASOS_EXTRA } from "@/lib/casos-extra";

type Etapa = "expediente" | "pistas" | "conclusion" | "insignia" | "cierre";

// Festejo (8 chispas) que se dispersan desde el check al acertar — dura lo
// suficiente para notarse (~0.9s) y el texto/CTA esperan a que termine.
const SPARK_OFFSETS = [
  { x: -26, y: -32, delay: 0 },
  { x: 22, y: -38, delay: 0.04 },
  { x: -38, y: 6, delay: 0.08 },
  { x: 34, y: 10, delay: 0.02 },
  { x: 0, y: -44, delay: 0.1 },
  { x: -16, y: 28, delay: 0.06 },
  { x: 30, y: -12, delay: 0.12 },
  { x: -34, y: -10, delay: 0.14 },
];

const CIERRE_CASO_01 = CASOS_EXTRA[1];

const OPCIONES_CONCLUSION = [
  {
    id: "causa",
    label: "Que tuvo una causa — y a esa causa muchos la llaman Dios",
    correcta: true,
  },
  {
    id: "azar",
    label: "Que apareció solo, sin ninguna razón",
    correcta: false,
  },
  {
    id: "nadie-sabe",
    label: "Que nadie puede saberlo nunca",
    correcta: false,
  },
];

export default function Caso01Page() {
  const router = useRouter();
  const [etapa, setEtapa] = useState<Etapa>("expediente");
  const [pistaVista, setPistaVista] = useState<"ciencia" | "logica" | null>(null);
  const [ambasPistasVistas, setAmbasPistasVistas] = useState(false);
  const [pistasVistas, setPistasVistas] = useState<Set<string>>(new Set());
  const [respuesta, setRespuesta] = useState<string | null>(null);
  const [mostrarFeedback, setMostrarFeedback] = useState(false);
  const [mostrarTexto, setMostrarTexto] = useState(false);

  function verPista(tipo: "ciencia" | "logica") {
    setPistaVista(tipo);
    const next = new Set(pistasVistas);
    next.add(tipo);
    setPistasVistas(next);
    if (next.size === 2) setAmbasPistasVistas(true);
  }

  function elegirRespuesta(id: string) {
    if (mostrarFeedback) return;
    setRespuesta(id);
    setMostrarFeedback(true);
    const correcta = OPCIONES_CONCLUSION.find((o) => o.id === id)?.correcta;
    if (correcta) {
      // Deja que el festejo (rebote + chispas) se vea antes de tapar el botón
      // con el texto de "Exacto" y el CTA de continuar.
      window.setTimeout(() => setMostrarTexto(true), 700);
    } else {
      setMostrarTexto(true);
    }
  }

  function continuarDesdeFeedback() {
    const correcta = OPCIONES_CONCLUSION.find((o) => o.id === respuesta)?.correcta;
    if (correcta) {
      setOnboardingState({ caso01Completado: true, racha: 1, insignia: "Investigador Jr." });
      setEtapa("insignia");
    } else {
      // Permitir reintentar — sin skip, primera victoria real (spec del usuario)
      setMostrarFeedback(false);
      setMostrarTexto(false);
      setRespuesta(null);
    }
  }

  return (
    <main className="flex min-h-dvh flex-col bg-surface-base px-4 py-6">
      <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wide text-brand-primary">
            Caso 01 · El Enigma del Origen del Universo
          </span>
        </div>

        <div className="mt-6 flex flex-1 flex-col">
          <AnimatePresence mode="wait">
            {etapa === "expediente" && (
              <motion.div
                key="expediente"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-1 flex-col"
              >
                <IconChip tone="gold" size={56}>
                  <Search size={26} color="var(--brand-primary)" aria-hidden="true" />
                </IconChip>
                <h1 className="mt-5 text-[24px] font-extrabold leading-snug text-txt-primary">
                  Se abre el expediente
                </h1>
                <div className="mt-4 rounded-[var(--radius-md)] bg-surface-secondary p-5">
                  <p className="text-[16px] italic leading-relaxed text-txt-primary">
                    &ldquo;Mamá, un amigo en el colegio dijo que la ciencia probó
                    que Dios no existe, ¿es verdad?&rdquo;
                  </p>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-txt-secondary">
                  Hoy tu hijo y tú van a investigar esta pregunta juntos, con
                  evidencia real. Vamos a resolver el Caso.
                </p>

                <div className="mt-auto pt-8">
                  <button
                    type="button"
                    onClick={() => setEtapa("pistas")}
                    className="flex h-14 w-full items-center justify-center rounded-[var(--radius-md)] bg-brand-primary text-[16px] font-semibold text-txt-inverse transition active:scale-[0.97]"
                  >
                    Investigar las pistas
                  </button>
                </div>
              </motion.div>
            )}

            {etapa === "pistas" && (
              <motion.div
                key="pistas"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-1 flex-col"
              >
                <h1 className="text-[24px] font-extrabold leading-snug text-txt-primary">
                  Dos pistas para investigar
                </h1>
                <p className="mt-2 text-[14.5px] text-txt-secondary">
                  Toca cada pista para leerla completa.
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => verPista("ciencia")}
                    className={`w-full rounded-[var(--radius-md)] border p-4 text-left transition ${
                      pistasVistas.has("ciencia")
                        ? "border-brand-secondary bg-brand-secondary-soft"
                        : "border-border-default bg-surface-elevated"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconChip tone="sage" size={40}>
                        <FlaskConical size={20} color="var(--brand-secondary)" aria-hidden="true" />
                      </IconChip>
                      <span className="text-[13px] font-bold uppercase tracking-wide text-brand-secondary">
                        Pista de Ciencia
                      </span>
                    </div>
                    <AnimatePresence>
                      {pistaVista === "ciencia" && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="mt-3 overflow-hidden text-[15px] leading-relaxed text-txt-primary"
                        >
                          Todo lo que empieza a existir tiene una causa. Es una
                          regla que vemos siempre: nada aparece de la nada.
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </button>

                  <button
                    type="button"
                    onClick={() => verPista("logica")}
                    className={`w-full rounded-[var(--radius-md)] border p-4 text-left transition ${
                      pistasVistas.has("logica")
                        ? "border-brand-secondary bg-brand-secondary-soft"
                        : "border-border-default bg-surface-elevated"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconChip tone="rust" size={40}>
                        <Brain size={20} color="var(--brand-detail)" aria-hidden="true" />
                      </IconChip>
                      <span className="text-[13px] font-bold uppercase tracking-wide text-brand-detail">
                        Pista de Lógica
                      </span>
                    </div>
                    <AnimatePresence>
                      {pistaVista === "logica" && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="mt-3 overflow-hidden text-[15px] leading-relaxed text-txt-primary"
                        >
                          El universo tuvo un comienzo — lo llamamos el Big
                          Bang. Si tuvo un comienzo, entonces también tuvo que
                          tener una causa.
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </button>
                </div>

                <div className="mt-auto pt-8">
                  <button
                    type="button"
                    disabled={!ambasPistasVistas}
                    onClick={() => setEtapa("conclusion")}
                    className="flex h-14 w-full items-center justify-center rounded-[var(--radius-md)] bg-brand-primary text-[16px] font-semibold text-txt-inverse transition active:scale-[0.97] disabled:opacity-40"
                  >
                    {ambasPistasVistas ? "Llegar a una conclusión" : "Lee las dos pistas primero"}
                  </button>
                </div>
              </motion.div>
            )}

            {etapa === "conclusion" && (
              <motion.div
                key="conclusion"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-1 flex-col"
              >
                <IconChip tone="gold" size={56}>
                  <Sparkles size={26} color="var(--brand-primary)" aria-hidden="true" />
                </IconChip>
                <h1 className="mt-5 text-[24px] font-extrabold leading-snug text-txt-primary">
                  ¿Qué es lo más razonable pensar?
                </h1>
                <p className="mt-2 text-[14.5px] text-txt-secondary">
                  Con las dos pistas, elige la conclusión del Caso.
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  {OPCIONES_CONCLUSION.map((op) => {
                    const isSelected = respuesta === op.id;
                    const showState = mostrarFeedback && isSelected;
                    const celebrar = showState && op.correcta;
                    return (
                      <motion.button
                        key={op.id}
                        type="button"
                        onClick={() => elegirRespuesta(op.id)}
                        disabled={mostrarFeedback}
                        animate={celebrar ? { scale: [1, 1.06, 0.99, 1.02, 1] } : { scale: 1 }}
                        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                        className={`relative flex min-h-14 w-full items-center gap-3 rounded-[var(--radius-md)] border px-4 py-3.5 text-left transition-colors ${
                          showState
                            ? op.correcta
                              ? "border-[1.5px] border-brand-secondary bg-brand-secondary-soft"
                              : "border-[1.5px] border-brand-detail bg-brand-detail-soft"
                            : "border-border-default bg-surface-elevated"
                        } ${mostrarFeedback && !isSelected ? "opacity-50" : ""}`}
                      >
                        <span className="flex-1 text-[15.5px] font-medium leading-snug text-txt-primary">
                          {op.label}
                        </span>
                        {showState &&
                          (op.correcta ? (
                            <motion.span
                              initial={{ scale: 0, rotate: -20 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: "spring", stiffness: 480, damping: 14 }}
                            >
                              <Check size={20} strokeWidth={3} color="var(--brand-secondary)" aria-hidden="true" />
                            </motion.span>
                          ) : (
                            <X size={20} strokeWidth={3} color="var(--brand-detail)" aria-hidden="true" />
                          ))}

                        {celebrar && (
                          <span className="pointer-events-none absolute inset-0 overflow-visible">
                            {SPARK_OFFSETS.map(({ x, y, delay }, i) => (
                              <motion.span
                                key={i}
                                className="absolute right-8 top-1/2 size-2 rounded-full bg-brand-secondary"
                                initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                                animate={{ opacity: [0, 1, 1, 0], x, y, scale: [0, 1.3, 1, 0.5] }}
                                transition={{ duration: 0.9, delay, ease: "easeOut" }}
                              />
                            ))}
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {mostrarTexto && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="mt-5 rounded-[var(--radius-md)] bg-surface-secondary p-4"
                    >
                      {OPCIONES_CONCLUSION.find((o) => o.id === respuesta)?.correcta ? (
                        <p className="text-[15px] leading-relaxed text-txt-primary">
                          <span className="font-bold text-brand-secondary">
                            Exacto.
                          </span>{" "}
                          Todo lo que empieza a existir tiene una causa, y el
                          universo empezó a existir — así que tuvo una causa.
                          A esa causa muchos la llaman Dios.
                        </p>
                      ) : (
                        <p className="text-[15px] leading-relaxed text-txt-primary">
                          Piénsalo de nuevo con las dos pistas: si todo lo que
                          empieza a existir tiene una causa, ¿qué causó al
                          universo?
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {mostrarTexto && (
                  <div className="mt-auto pt-8">
                    <button
                      type="button"
                      onClick={continuarDesdeFeedback}
                      className="flex h-14 w-full items-center justify-center rounded-[var(--radius-md)] bg-brand-primary text-[16px] font-semibold text-txt-inverse transition active:scale-[0.97]"
                    >
                      {OPCIONES_CONCLUSION.find((o) => o.id === respuesta)?.correcta
                        ? "Cerrar el Caso"
                        : "Intentar de nuevo"}
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {etapa === "insignia" && (
              <motion.div
                key="insignia"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-1 flex-col items-center justify-center text-center"
              >
                <motion.div
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <AnimatedMark
                    size={96}
                    title="Caso resuelto"
                    className="rounded-[24px] shadow-[0_12px_32px_color-mix(in_oklab,var(--brand-primary)_25%,transparent)]"
                  />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="mt-6 text-[26px] font-extrabold text-txt-primary"
                >
                  Caso resuelto
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.22 }}
                  className="mt-2 text-[15.5px] text-txt-secondary"
                >
                  Insignia desbloqueada
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.28 }}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-brand-primary bg-brand-primary-soft px-4 py-2"
                >
                  <Award size={16} color="var(--brand-primary)" aria-hidden="true" />
                  <span className="text-[14px] font-bold text-brand-primary">
                    Investigador Jr.
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.36 }}
                  className="mt-10 w-full max-w-[300px]"
                >
                  <button
                    type="button"
                    onClick={() => setEtapa("cierre")}
                    className="flex h-14 w-full items-center justify-center rounded-[var(--radius-md)] bg-brand-primary text-[16px] font-semibold text-txt-inverse transition active:scale-[0.97]"
                  >
                    Ver el versículo y la actividad
                  </button>
                </motion.div>
              </motion.div>
            )}

            {etapa === "cierre" && (
              <motion.div
                key="cierre"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-1 flex-col"
              >
                <h1 className="text-[22px] font-extrabold leading-snug text-txt-primary">
                  Para cerrar la semana
                </h1>

                <div className="mt-5 rounded-[var(--radius-md)] border border-brand-secondary bg-brand-secondary-soft p-5">
                  <div className="flex items-center gap-2">
                    <BookOpen size={18} color="var(--brand-secondary)" aria-hidden="true" />
                    <span className="text-[12px] font-bold uppercase tracking-wide text-brand-secondary">
                      Versículo de la semana
                    </span>
                  </div>
                  <p className="mt-3 text-[16px] italic leading-relaxed text-txt-primary">
                    &ldquo;{CIERRE_CASO_01.versiculo.texto}&rdquo;
                  </p>
                  <p className="mt-2 text-[13.5px] font-semibold text-txt-secondary">
                    {CIERRE_CASO_01.versiculo.cita}
                  </p>
                </div>

                <div className="mt-4 rounded-[var(--radius-md)] bg-surface-secondary p-5">
                  <div className="flex items-center gap-2">
                    <NotebookPen size={18} color="var(--brand-primary)" aria-hidden="true" />
                    <span className="text-[12px] font-bold uppercase tracking-wide text-brand-primary">
                      Reflexión
                    </span>
                  </div>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-txt-secondary">
                    {CIERRE_CASO_01.reflexion}
                  </p>
                </div>

                <div className="mt-4 rounded-[var(--radius-md)] border border-border-default bg-surface-elevated p-5">
                  <div className="flex items-center gap-2">
                    <ClipboardCheck size={18} color="var(--brand-detail)" aria-hidden="true" />
                    <span className="text-[12px] font-bold uppercase tracking-wide" style={{ color: "var(--brand-detail)" }}>
                      Actividad en familia
                    </span>
                  </div>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-txt-primary">
                    {CIERRE_CASO_01.actividad}
                  </p>
                </div>

                <div className="mt-auto pt-8">
                  <button
                    type="button"
                    onClick={() => router.push("/onboarding/resumen")}
                    className="flex h-14 w-full items-center justify-center rounded-[var(--radius-md)] bg-brand-primary text-[16px] font-semibold text-txt-inverse transition active:scale-[0.97]"
                  >
                    Ver mi plan
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
