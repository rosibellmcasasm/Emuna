"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Brain, FlaskConical, Landmark, FileSearch, HeartHandshake, Sparkles, Award, Check, X, Hammer, BookOpen, NotebookPen, ClipboardCheck } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { IconChip } from "@/components/app/IconChip";
import { Mark, AnimatedMark } from "@/components/brand/Mark";
import { BottomNav } from "@/components/app/BottomNav";
import {
  tieneAccesoApp,
  casoDesbloqueado,
  getAuthState,
  marcarCasoResuelto,
} from "@/lib/onboarding-store";
import { getCasoCompleto, getCasoStub, type TipoPista } from "@/lib/casos";

type Etapa = "expediente" | "pistas" | "conclusion" | "insignia" | "cierre";
type EstadoCarga = "cargando" | "listo";

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

const ICONO_PISTA: Record<TipoPista, typeof Brain> = {
  ciencia: FlaskConical,
  logica: Brain,
  historia: Landmark,
  evidencia: FileSearch,
  identidad: HeartHandshake,
};

const TONO_PISTA: Record<TipoPista, "gold" | "sage" | "rust"> = {
  ciencia: "sage",
  logica: "rust",
  historia: "sage",
  evidencia: "gold",
  identidad: "rust",
};

const COLOR_PISTA: Record<TipoPista, string> = {
  ciencia: "var(--brand-secondary)",
  logica: "var(--brand-detail)",
  historia: "var(--brand-secondary)",
  evidencia: "var(--brand-primary)",
  identidad: "var(--brand-detail)",
};

export default function CasoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const casoId = Number(id);

  const [carga, setCarga] = useState<EstadoCarga>("cargando");
  const [permitido, setPermitido] = useState(false);

  const [etapa, setEtapa] = useState<Etapa>("expediente");
  const [pistaVista, setPistaVista] = useState<string | null>(null);
  const [pistasVistas, setPistasVistas] = useState<Set<string>>(new Set());
  const [respuesta, setRespuesta] = useState<string | null>(null);
  const [mostrarFeedback, setMostrarFeedback] = useState(false);
  const [mostrarTexto, setMostrarTexto] = useState(false);

  useEffect(() => {
    if (!Number.isFinite(casoId) || casoId < 1 || casoId > 52) {
      router.replace("/app");
      return;
    }
    if (!tieneAccesoApp()) {
      router.replace("/onboarding");
      return;
    }
    const pagado = getAuthState().camino === "pago";
    const dentroDelAcceso = casoId <= 4 || pagado;
    if (!dentroDelAcceso) {
      router.replace("/app/paywall");
      return;
    }
    if (!casoDesbloqueado(casoId)) {
      // Tiene acceso a este Caso, pero todavía no resolvió el anterior en orden.
      router.replace("/app");
      return;
    }
    setPermitido(true);
    setCarga("listo");
  }, [casoId, router]);

  if (carga !== "listo" || !permitido) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center bg-surface-base px-6">
        <div className="flex flex-col items-center gap-3">
          <Mark size={40} />
          <p className="text-[14px] text-txt-tertiary">Abriendo el expediente…</p>
        </div>
      </main>
    );
  }

  const caso = getCasoCompleto(casoId);

  if (!caso) {
    const stub = getCasoStub(casoId);
    return (
      <main className="flex min-h-dvh flex-col bg-surface-base px-4 py-6">
        <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col items-center justify-center text-center">
          <IconChip tone="neutral" size={64}>
            <Hammer size={28} color="var(--text-tertiary)" aria-hidden="true" />
          </IconChip>
          <h1 className="mt-5 text-[22px] font-extrabold leading-snug text-txt-primary">
            {stub?.titulo ?? `Caso ${casoId}`}
          </h1>
          {stub?.kicker && (
            <p className="mt-2 text-[14.5px] leading-relaxed text-txt-secondary">{stub.kicker}</p>
          )}
          <p className="mt-4 rounded-[var(--radius-md)] bg-surface-secondary px-4 py-3 text-[13.5px] leading-relaxed text-txt-secondary">
            Este Caso está en construcción — vuelve pronto.
          </p>
          <button
            type="button"
            onClick={() => router.push("/app")}
            className="mt-8 flex h-14 w-full max-w-[280px] items-center justify-center rounded-[var(--radius-md)] bg-brand-primary text-[16px] font-semibold text-txt-inverse transition active:scale-[0.97]"
          >
            Volver a mis Casos
          </button>
        </div>
        <BottomNav />
      </main>
    );
  }

  function verPista(tipo: string) {
    setPistaVista(tipo);
    const next = new Set(pistasVistas);
    next.add(tipo);
    setPistasVistas(next);
  }

  function elegirRespuesta(optId: string) {
    if (mostrarFeedback || !caso) return;
    setRespuesta(optId);
    setMostrarFeedback(true);
    const opcion = caso.opciones.find((o) => o.id === optId);
    if (opcion?.correcta) {
      // Deja que el festejo (rebote + chispas) se vea antes de tapar el botón
      // con el texto de "Exacto" y el CTA de continuar.
      window.setTimeout(() => setMostrarTexto(true), 700);
    } else {
      setMostrarTexto(true);
    }
  }

  function continuarDesdeFeedback() {
    if (!caso) return;
    const opcion = caso.opciones.find((o) => o.id === respuesta);
    if (opcion?.correcta) {
      marcarCasoResuelto(caso.id, caso.insignia);
      setEtapa("insignia");
    } else {
      setMostrarFeedback(false);
      setMostrarTexto(false);
      setRespuesta(null);
    }
  }

  const todasLasPistasVistas = pistasVistas.size === caso.pistas.length;
  const opcionSeleccionada = caso.opciones.find((o) => o.id === respuesta);

  return (
    <main className="flex min-h-dvh flex-col bg-surface-base px-4 py-6">
      <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wide text-brand-primary">
            {caso.kicker} · {caso.titulo}
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
                    &ldquo;{caso.pregunta}&rdquo;
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
                  {caso.pistas.length === 2 ? "Dos pistas para investigar" : "Pistas para investigar"}
                </h1>
                <p className="mt-2 text-[14.5px] text-txt-secondary">
                  Toca cada pista para leerla completa.
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  {caso.pistas.map((pista) => {
                    const Icono = ICONO_PISTA[pista.tipo];
                    const vista = pistasVistas.has(pista.tipo);
                    return (
                      <button
                        key={pista.tipo}
                        type="button"
                        onClick={() => verPista(pista.tipo)}
                        className={`w-full rounded-[var(--radius-md)] border p-4 text-left transition ${
                          vista
                            ? "border-brand-secondary bg-brand-secondary-soft"
                            : "border-border-default bg-surface-elevated"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <IconChip tone={TONO_PISTA[pista.tipo]} size={40}>
                            <Icono size={20} color={COLOR_PISTA[pista.tipo]} aria-hidden="true" />
                          </IconChip>
                          <span
                            className="text-[13px] font-bold uppercase tracking-wide"
                            style={{ color: COLOR_PISTA[pista.tipo] }}
                          >
                            {pista.titulo}
                          </span>
                        </div>
                        <AnimatePresence>
                          {pistaVista === pista.tipo && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                              className="mt-3 overflow-hidden text-[15px] leading-relaxed text-txt-primary"
                            >
                              {pista.texto}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-auto pt-8">
                  <button
                    type="button"
                    disabled={!todasLasPistasVistas}
                    onClick={() => setEtapa("conclusion")}
                    className="flex h-14 w-full items-center justify-center rounded-[var(--radius-md)] bg-brand-primary text-[16px] font-semibold text-txt-inverse transition active:scale-[0.97] disabled:opacity-40"
                  >
                    {todasLasPistasVistas ? "Llegar a una conclusión" : "Lee todas las pistas primero"}
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
                  {caso.preguntaConclusion}
                </h1>
                <p className="mt-2 text-[14.5px] text-txt-secondary">
                  Con las pistas, elige la conclusión del Caso.
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  {caso.opciones.map((op) => {
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
                          {op.texto}
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
                      {opcionSeleccionada?.correcta ? (
                        <p className="text-[15px] leading-relaxed text-txt-primary">
                          <span className="font-bold text-brand-secondary">Exacto.</span>{" "}
                          {caso.explicacion}
                        </p>
                      ) : (
                        <p className="text-[15px] leading-relaxed text-txt-primary">
                          Piénsalo de nuevo con las pistas del expediente.
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
                      {opcionSeleccionada?.correcta ? "Cerrar el Caso" : "Intentar de nuevo"}
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
                  <span className="text-[14px] font-bold text-brand-primary">{caso.insignia}</span>
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
                    &ldquo;{caso.versiculo.texto}&rdquo;
                  </p>
                  <p className="mt-2 text-[13.5px] font-semibold text-txt-secondary">{caso.versiculo.cita}</p>
                </div>

                <div className="mt-4 rounded-[var(--radius-md)] bg-surface-secondary p-5">
                  <div className="flex items-center gap-2">
                    <NotebookPen size={18} color="var(--brand-primary)" aria-hidden="true" />
                    <span className="text-[12px] font-bold uppercase tracking-wide text-brand-primary">
                      Reflexión
                    </span>
                  </div>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-txt-secondary">{caso.reflexion}</p>
                </div>

                <div className="mt-4 rounded-[var(--radius-md)] border border-border-default bg-surface-elevated p-5">
                  <div className="flex items-center gap-2">
                    <ClipboardCheck size={18} color="var(--brand-detail)" aria-hidden="true" />
                    <span className="text-[12px] font-bold uppercase tracking-wide" style={{ color: "var(--brand-detail)" }}>
                      Actividad en familia
                    </span>
                  </div>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-txt-primary">{caso.actividad}</p>
                </div>

                <div className="mt-auto pt-8">
                  <button
                    type="button"
                    onClick={() => router.push("/app")}
                    className="flex h-14 w-full items-center justify-center rounded-[var(--radius-md)] bg-brand-primary text-[16px] font-semibold text-txt-inverse transition active:scale-[0.97]"
                  >
                    Volver a mis Casos
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
