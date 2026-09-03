import { Check } from "lucide-react";
import { GradientBorderCard } from "@/components/app/GradientBorderCard";

// Value stack compartido entre el paywall del onboarding (`/onboarding/paywall`) y el
// paywall corto de la app interna (`/app/paywall`) — mismo copy, no se duplica a mano.
export const STACK_VALOR = [
  { titulo: "Los 52 Casos del año", detalle: "1 Caso nuevo por semana, acceso de por vida", valor: "$120" },
  { titulo: "Guía de Respuestas Rápidas", detalle: "La explicación lista en lenguaje de padre", valor: "$27" },
  { titulo: "Rachas e insignias", detalle: "Para que tu hijo pida hacer el Caso de la semana", valor: "$19" },
];

export const TOTAL_STACK = 120 + 27 + 19;

export function PaywallStack() {
  return (
    <GradientBorderCard className="bg-surface-primary p-5">
      <ul className="flex flex-col gap-3">
        {STACK_VALOR.map((item) => (
          <li key={item.titulo} className="flex items-start gap-3">
            <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-secondary-soft">
              <Check size={14} strokeWidth={2.5} color="var(--brand-secondary)" aria-hidden="true" />
            </div>
            <div className="flex flex-1 items-baseline justify-between gap-2">
              <div>
                <p className="text-[14.5px] font-semibold text-txt-primary">{item.titulo}</p>
                <p className="text-[13px] text-txt-secondary">{item.detalle}</p>
              </div>
              <span className="shrink-0 text-[12.5px] tabular-nums text-txt-tertiary line-through">
                {item.valor}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </GradientBorderCard>
  );
}
