"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Lock, Flame, Search, RotateCcw } from "lucide-react";
import { motion } from "motion/react";
import { Mark } from "@/components/brand/Mark";
import { IconChip } from "@/components/app/IconChip";
import { GradientBorderCard } from "@/components/app/GradientBorderCard";
import { RevealGroup, RevealItem } from "@/components/app/Reveal";
import { BottomNav } from "@/components/app/BottomNav";
import {
  getProgresoState,
  getAuthState,
  tieneAccesoApp,
  casoDesbloqueadoSync,
  getRepasoDelDiaSync,
  type ProgresoState,
} from "@/lib/onboarding-store";
import { CASOS_COMPLETOS, CASOS_STUB, TOTAL_CASOS, getCasoTitulo, getCasoKicker } from "@/lib/casos";
import { CASOS_EXTRA } from "@/lib/casos-extra";

type EstadoCarga = "cargando" | "sin-acceso" | "listo";

function saludoDelDia(): string {
  const hora = new Date().getHours();
  if (hora < 12) return "Buenos días";
  if (hora < 19) return "Buenas tardes";
  return "Buenas noches";
}

export default function AppDashboardPage() {
  const router = useRouter();
  const [carga, setCarga] = useState<EstadoCarga>("cargando");
  const [progreso, setProgreso] = useState<ProgresoState | null>(null);
  const [pagado, setPagado] = useState(false);

  useEffect(() => {
    let cancelado = false;
    (async () => {
      if (!(await tieneAccesoApp())) {
        router.replace("/onboarding");
        return;
      }
      const [progresoReal, auth] = await Promise.all([getProgresoState(), getAuthState()]);
      if (cancelado) return;
      setProgreso(progresoReal);
      setPagado(auth.pagado);
      setCarga("listo");
    })();
    return () => {
      cancelado = true;
    };
  }, [router]);

  if (carga !== "listo" || !progreso) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center bg-surface-base px-6">
        <div className="flex flex-col items-center gap-3">
          <Mark size={40} />
          <p className="text-[14px] text-txt-tertiary">Cargando tus Casos…</p>
        </div>
      </main>
    );
  }

  const siguienteCasoId =
    Array.from({ length: TOTAL_CASOS }, (_, i) => i + 1).find(
      (id) => !progreso.casosResueltos.includes(id)
    ) ?? TOTAL_CASOS;

  const siguienteEsCompleto = siguienteCasoId <= CASOS_COMPLETOS.length;

  const repasoId = getRepasoDelDiaSync(progreso);
  const repaso = repasoId ? CASOS_EXTRA[repasoId] : null;

  return (
    <main className="flex min-h-dvh flex-col bg-surface-base">
      <div className="mx-auto flex w-full max-w-[440px] flex-1 flex-col px-4 pb-4 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Mark size={38} />
            <div>
              <p className="text-[13.5px] font-semibold text-txt-primary">
                {saludoDelDia()}, exploradores
              </p>
              <p className="text-[12px] text-txt-tertiary">Emuná</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-border-default bg-surface-elevated px-3 py-1.5">
            <Flame size={15} color="var(--brand-detail)" aria-hidden="true" />
            <span className="text-[14px] font-bold tabular-nums text-txt-primary">
              {progreso.racha}
            </span>
          </div>
        </div>

        {/* Caso de esta semana */}
        <RevealGroup className="mt-6">
          <RevealItem>
            <GradientBorderCard hue="var(--brand-primary)" thickness={2} className="bg-surface-primary p-5">
              <span className="text-[11px] font-bold uppercase tracking-wide text-brand-primary">
                Tu Caso de esta semana
              </span>
              <h1 className="mt-2 text-[21px] font-extrabold leading-snug text-txt-primary">
                {getCasoTitulo(siguienteCasoId)}
              </h1>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-txt-secondary">
                {getCasoKicker(siguienteCasoId)}
              </p>
              <Link
                href={`/app/caso/${siguienteCasoId}`}
                className="mt-5 flex h-13 w-full items-center justify-center gap-2 rounded-[var(--radius-md)] bg-brand-primary text-[15.5px] font-semibold text-txt-inverse transition active:scale-[0.97]"
                style={{ height: "52px" }}
              >
                <Search size={18} aria-hidden="true" />
                {siguienteEsCompleto ? "Investigar este Caso" : "Ver el Caso"}
              </Link>
            </GradientBorderCard>
          </RevealItem>

          {repasoId && repaso && (
            <RevealItem>
              <div className="mt-3 rounded-[var(--radius-md)] bg-surface-secondary p-4">
                <div className="flex items-center gap-2">
                  <RotateCcw size={15} color="var(--brand-secondary)" aria-hidden="true" />
                  <span className="text-[11px] font-bold uppercase tracking-wide text-brand-secondary">
                    Repaso de hoy · {getCasoTitulo(repasoId)}
                  </span>
                </div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-txt-secondary">
                  {repaso.reflexion}
                </p>
                <Link
                  href={`/app/caso/${repasoId}`}
                  className="mt-3 inline-block text-[12.5px] font-semibold text-brand-secondary underline underline-offset-2"
                >
                  Volver a este Caso
                </Link>
              </div>
            </RevealItem>
          )}
        </RevealGroup>

        {/* Grid de los 52 Casos */}
        <div className="mt-8 flex items-center justify-between">
          <h2 className="text-[15px] font-bold text-txt-primary">Todos los Casos</h2>
          <span className="text-[12.5px] tabular-nums text-txt-tertiary">
            {progreso.casosResueltos.length}/{TOTAL_CASOS} resueltos
          </span>
        </div>

        <div className="mt-3 grid grid-cols-4 gap-2.5">
          {Array.from({ length: TOTAL_CASOS }, (_, i) => i + 1).map((id) => {
            const resuelto = progreso.casosResueltos.includes(id);
            // Dos motivos de bloqueo distintos: (a) todavía no pagaste los Casos 5-52,
            // o (b) sí tienes acceso pero te falta resolver el Caso anterior en orden.
            // Solo (a) manda al paywall — (b) no es clicable, solo informa el orden.
            const dentroDelAcceso = id <= 4 || pagado;
            const desbloqueado = casoDesbloqueadoSync(id, progreso, pagado);
            const bloqueadoPorOrden = dentroDelAcceso && !desbloqueado;
            const tileClass = `relative flex aspect-square flex-col items-center justify-center gap-1 rounded-[var(--radius-md)] border text-center transition active:scale-[0.95] ${
              resuelto
                ? "border-brand-secondary bg-brand-secondary-soft"
                : desbloqueado
                  ? "border-border-default bg-surface-elevated"
                  : "border-border-default bg-surface-secondary"
            }`;
            const contenido = (
              <>
                {resuelto ? (
                  <Check size={16} strokeWidth={3} color="var(--brand-secondary)" aria-hidden="true" />
                ) : !desbloqueado ? (
                  <Lock size={14} color="var(--text-tertiary)" aria-hidden="true" />
                ) : null}
                <span
                  className={`text-[13px] font-bold tabular-nums ${
                    resuelto
                      ? "text-brand-secondary"
                      : desbloqueado
                        ? "text-txt-primary"
                        : "text-txt-tertiary"
                  }`}
                >
                  {id}
                </span>
              </>
            );

            if (bloqueadoPorOrden) {
              return (
                <div
                  key={id}
                  className={`${tileClass} cursor-default opacity-60`}
                  aria-label={`Caso ${id} — resuelve el Caso ${id - 1} primero para desbloquearlo`}
                  title={`Resuelve el Caso ${id - 1} primero`}
                >
                  {contenido}
                </div>
              );
            }

            return (
              <Link
                key={id}
                href={desbloqueado ? `/app/caso/${id}` : "/app/paywall"}
                className={tileClass}
                aria-label={`Caso ${id}${resuelto ? " — resuelto" : desbloqueado ? " — disponible" : " — bloqueado, requiere desbloquear los 52 Casos"}`}
              >
                {contenido}
              </Link>
            );
          })}
        </div>

        {!pagado && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mt-6 flex items-center gap-3 rounded-[var(--radius-md)] bg-surface-secondary p-4"
          >
            <IconChip tone="gold" size={40}>
              <Flame size={20} color="var(--brand-primary)" aria-hidden="true" />
            </IconChip>
            <div className="flex-1">
              <p className="text-[13.5px] font-bold text-txt-primary">Módulo 1 gratis, 48 Casos más esperando</p>
              <p className="text-[12.5px] text-txt-secondary">Desbloquea los 52 Casos por $29, pago único</p>
            </div>
            <Link
              href="/app/paywall"
              className="shrink-0 text-[12.5px] font-semibold text-brand-primary underline underline-offset-2"
            >
              Ver
            </Link>
          </motion.div>
        )}
      </div>

      <BottomNav />
    </main>
  );
}
