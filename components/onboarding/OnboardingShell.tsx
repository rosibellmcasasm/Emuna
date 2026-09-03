"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { motion } from "motion/react";
import { Mark } from "@/components/brand/Mark";

/**
 * Cascarón compartido de las pantallas de pregunta del onboarding.
 * Barra de progreso fina animada + botón atrás + logo/nombre (regla de marca de 50).
 */
export function OnboardingShell({
  progress,
  onBack,
  children,
}: {
  /** 0-100. Si es null, no se muestra barra (pantallas sin progreso: bienvenida, loading, caso, resumen). */
  progress?: number | null;
  /** Si se omite, no se muestra el botón atrás (pantalla 1). */
  onBack?: () => void;
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <main className="flex min-h-dvh flex-col bg-surface-base px-4 pt-4">
      <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col">
        <div className="flex h-11 items-center gap-3">
          {onBack ? (
            <button
              type="button"
              onClick={() => (onBack ? onBack() : router.back())}
              aria-label="Volver atrás"
              className="flex size-11 shrink-0 items-center justify-center rounded-full text-txt-secondary transition hover:bg-surface-secondary active:scale-95"
            >
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
          ) : (
            <Link
              href="/"
              className="flex items-center gap-2"
              aria-label="Volver al inicio de Emuná"
            >
              <Mark size={34} />
              <span className="text-[15px] font-bold text-txt-primary">Emuná</span>
            </Link>
          )}

          {typeof progress === "number" && (
            <div className="ml-1 h-[3px] flex-1 overflow-hidden rounded-full bg-border-default/60">
              <motion.div
                className="h-full rounded-full bg-brand-primary"
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(progress, 6)}%` }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col pb-10 pt-6">{children}</div>
      </div>
    </main>
  );
}
