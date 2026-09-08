"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { ChipOption } from "@/components/onboarding/ChipOption";
import { setOnboardingState, type EdadHijo } from "@/lib/onboarding-store";

const OPCIONES: { value: EdadHijo; label: string }[] = [
  { value: "8-9", label: "8-9 años" },
  { value: "10-11", label: "10-11 años" },
  { value: "12", label: "12 años" },
];

export default function OnboardingEdad() {
  const router = useRouter();
  const [selected, setSelected] = useState<EdadHijo | null>(null);

  function handleSelect(value: EdadHijo) {
    setSelected(value);
    setOnboardingState({ edad: value });
    setTimeout(() => router.push("/onboarding/reto"), 320);
  }

  return (
    <OnboardingShell progress={20} onBack={() => router.push("/onboarding")}>
      <div className="flex flex-1 flex-col justify-center">
        <h1
          className="text-[28px] font-extrabold leading-[1.1] tracking-tight text-txt-primary"
          style={{ textWrap: "balance" }}
        >
          ¿Qué edad tiene tu hijo o hija?
        </h1>
        <p className="mt-2 text-[14.5px] text-txt-secondary">
          Así elegimos el Caso con el nivel exacto para él o ella.
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
      </div>
    </OnboardingShell>
  );
}
