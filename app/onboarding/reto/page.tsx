"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { ChipOption } from "@/components/onboarding/ChipOption";
import { setOnboardingState, type Reto } from "@/lib/onboarding-store";

// Eco textual de FICHA-AVATAR.md — Dolores #2, #3, #4 + voz literal del avatar
const OPCIONES: { value: Reto; label: string }[] = [
  {
    value: "quedarme-en-blanco",
    label: "Quedarme en blanco sin saber qué responder",
  },
  {
    value: "clase-obligatoria",
    label: "Que sienta que es una clase obligatoria y se aburra",
  },
  {
    value: "escuela-redes",
    label: "Que la escuela y las redes le enseñen más que yo en mi propia casa",
  },
  {
    value: "cualquier-pregunta",
    label: "No sé, cualquier pregunta difícil me toma desprevenida/o",
  },
];

export default function OnboardingReto() {
  const router = useRouter();
  const [selected, setSelected] = useState<Reto | null>(null);

  function handleSelect(value: Reto) {
    setSelected(value);
    setOnboardingState({ reto: value });
    setTimeout(() => router.push("/onboarding/reconocimiento"), 320);
  }

  return (
    <OnboardingShell progress={40} onBack={() => router.push("/onboarding/edad")}>
      <h1
        className="text-[28px] font-extrabold leading-[1.1] tracking-tight text-txt-primary"
        style={{ textWrap: "balance" }}
      >
        ¿Qué es lo que más te cuesta?
      </h1>
      <p className="mt-2 text-[14.5px] text-txt-secondary">
        Cuéntanos qué te pasa a ti, no a otro papá o mamá.
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
        onClick={() => router.push("/onboarding/reconocimiento")}
        className="mt-6 min-h-11 text-center text-[13px] text-txt-tertiary transition hover:text-txt-secondary"
      >
        Saltar
      </button>
    </OnboardingShell>
  );
}
