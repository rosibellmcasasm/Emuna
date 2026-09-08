"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MessageCircleQuestion, Search } from "lucide-react";
import { motion } from "motion/react";
import { Mark } from "@/components/brand/Mark";
import { IconChip } from "@/components/app/IconChip";
import { GradientBorderCard } from "@/components/app/GradientBorderCard";
import { RevealGroup, RevealItem } from "@/components/app/Reveal";
import { BottomNav } from "@/components/app/BottomNav";
import { getProgresoState, tieneAccesoApp, type ProgresoState } from "@/lib/onboarding-store";
import { getCasoCompleto } from "@/lib/casos";

type EstadoCarga = "cargando" | "listo";

export default function GuiaPage() {
  const router = useRouter();
  const [carga, setCarga] = useState<EstadoCarga>("cargando");
  const [progreso, setProgreso] = useState<ProgresoState | null>(null);

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

  if (carga !== "listo" || !progreso) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center bg-surface-base px-6">
        <Mark size={40} />
      </main>
    );
  }

  const resueltosConGuia = progreso.casosResueltos
    .map((id) => getCasoCompleto(id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
    .sort((a, b) => a.id - b.id);

  return (
    <main className="flex min-h-dvh flex-col bg-surface-base">
      <div className="mx-auto flex w-full max-w-[440px] flex-1 flex-col px-4 pb-4 pt-6">
        <div className="flex items-center gap-2.5">
          <Mark size={36} />
          <div>
            <h1 className="text-[19px] font-extrabold text-txt-primary">Modo Guía</h1>
            <p className="text-[12.5px] text-txt-tertiary">Respuestas rápidas para ti</p>
          </div>
        </div>

        {resueltosConGuia.length === 0 ? (
          <div className="mt-14 flex flex-1 flex-col items-center justify-center text-center">
            <IconChip tone="neutral" size={64}>
              <MessageCircleQuestion size={28} color="var(--text-tertiary)" aria-hidden="true" />
            </IconChip>
            <h2 className="mt-5 text-[19px] font-extrabold text-txt-primary">
              Aún no hay guías disponibles
            </h2>
            <p className="mt-2 max-w-[300px] text-[14px] leading-relaxed text-txt-secondary">
              Resuelve tu primer Caso y aquí aparecerá cómo explicárselo a tu
              hijo, en tus propias palabras.
            </p>
            <Link
              href="/app"
              className="mt-7 flex h-13 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-brand-primary px-6 text-[15px] font-semibold text-txt-inverse transition active:scale-[0.97]"
              style={{ height: "52px" }}
            >
              <Search size={17} aria-hidden="true" />
              Ir a mi Caso de esta semana
            </Link>
          </div>
        ) : (
          <>
            <p className="mt-5 text-[13.5px] leading-relaxed text-txt-secondary">
              Para cada Caso que ya resolviste, aquí tienes cómo explicárselo a
              tu hijo si te vuelve a preguntar — corto, en tus palabras.
            </p>

            <RevealGroup className="mt-5 flex flex-col gap-3">
              {resueltosConGuia.map((caso) => (
                <RevealItem key={caso.id}>
                  <GradientBorderCard className="bg-surface-primary p-4">
                    <span className="text-[11px] font-bold uppercase tracking-wide text-brand-primary">
                      {caso.kicker}
                    </span>
                    <h3 className="mt-1 text-[15.5px] font-bold text-txt-primary">{caso.titulo}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-txt-secondary">{caso.guia}</p>
                  </GradientBorderCard>
                </RevealItem>
              ))}
            </RevealGroup>
          </>
        )}
      </div>

      <BottomNav />
    </main>
  );
}
