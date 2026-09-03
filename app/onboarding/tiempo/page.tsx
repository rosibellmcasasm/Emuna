"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { ChipOption } from "@/components/onboarding/ChipOption";
import { setOnboardingState, type TiempoSemanal } from "@/lib/onboarding-store";

// Eco del deseo #5 de FICHA-AVATAR.md: "10 a 15 minutos semanales en familia"
const OPCIONES: { value: TiempoSemanal; label: string }[] = [
  { value: "10", label: "10 minutos" },
  { value: "15", label: "15 minutos" },
  { value: "mas-15", label: "Más de 15 minutos" },
];

export default function OnboardingTiempo() {
  const router = useRouter();
  const [selected, setSelected] = useState<TiempoSemanal | null>(null);

  function handleSelect(value: TiempoSemanal) {
    setSelected(value);
    setOnboardingState({ tiempo: value });
    setTimeout(() => router.push("/onboarding/generando"), 320);
  }

  return (
    <OnboardingShell progress={70} onBack={() => router.push("/onboarding/reconocimiento")}>
      <h1
        className="text-[28px] font-extrabold leading-[1.1] tracking-tight text-txt-primary"
        style={{ textWrap: "balance" }}
      >
        ¿Cuánto tiempo a la semana quieres dedicarle?
      </h1>
      <p className="mt-2 text-[14.5px] text-txt-secondary">
        Sin peleas, sin pantallas pasivas — solo ustedes dos.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        {OPCIONES.map((op) => (
          <ChipOption
            key={op.value}
            label={op.label}
            selected={selected === op.value}
            onSelect={() => handleSelect(op.value)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => router.push("/onboarding/generando")}
        className="mt-6 min-h-11 text-center text-[13px] text-txt-tertiary transition hover:text-txt-secondary"
      >
        Saltar
      </button>
    </OnboardingShell>
  );
}
