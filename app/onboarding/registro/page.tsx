"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Lock, Mail } from "lucide-react";
import { motion } from "motion/react";
import { getOnboardingState } from "@/lib/onboarding-store";
import { createClient } from "@/lib/supabase/client";
import { Mark } from "@/components/brand/Mark";
import { IconChip } from "@/components/app/IconChip";

function RegistroForm() {
  const params = useSearchParams();
  const camino = params.get("camino") === "gratis" ? "gratis" : "pago";

  const [email, setEmail] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || enviando) {
      setError("Ingresa un correo válido para continuar.");
      return;
    }
    setError(null);
    setEnviando(true);

    // Las respuestas del onboarding (edad/tiempo) y el Caso 01 se resolvieron
    // ANTES de tener cuenta — viajan en el propio link del correo (no del
    // localStorage) para que la migración funcione aunque el usuario abra el
    // enlace en otro dispositivo. El callback (`app/auth/callback/route.ts`)
    // las escribe en el perfil real una vez hay sesión.
    const onboarding = getOnboardingState();
    const next = `/onboarding/confirmacion?camino=${camino}`;
    const callbackParams = new URLSearchParams({ next });
    if (onboarding.edad) callbackParams.set("edad", onboarding.edad);
    if (onboarding.tiempo) callbackParams.set("tiempo", onboarding.tiempo);
    if (onboarding.caso01Completado) {
      callbackParams.set("caso01", "1");
      if (onboarding.insignia) callbackParams.set("insignia", onboarding.insignia);
    }

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?${callbackParams.toString()}`,
      },
    });

    setEnviando(false);
    if (authError) {
      setError("No pudimos enviar el enlace. Revisa el correo o intenta de nuevo en un momento.");
      return;
    }
    setEnviado(true);
  }

  if (enviado) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center bg-surface-base px-6 py-10 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <IconChip tone="sage" size={76} shape="circle">
            <Mail size={34} color="var(--brand-secondary)" aria-hidden="true" />
          </IconChip>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12 }}
          className="mx-auto mt-6 max-w-[320px] text-[24px] font-extrabold leading-snug text-txt-primary"
        >
          Revisa tu correo
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mx-auto mt-3 max-w-[340px] text-[15px] leading-relaxed text-txt-secondary"
        >
          Te mandamos un enlace a <span className="font-semibold text-txt-primary">{email}</span>.
          Tócalo desde ese correo para entrar — sin contraseña.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.28 }}
          type="button"
          onClick={() => setEnviado(false)}
          className="mt-6 min-h-11 text-[13.5px] font-medium text-txt-secondary underline underline-offset-4 transition hover:text-txt-primary"
        >
          Usar otro correo
        </motion.button>
      </main>
    );
  }

  return (
    <main className="flex min-h-dvh flex-col bg-surface-base px-6 py-10">
      <div className="mx-auto flex w-full max-w-[380px] flex-1 flex-col">
        <Link href="/" className="flex items-center gap-2" aria-label="Volver al inicio de Emuná">
          <Mark size={34} />
          <span className="text-[15px] font-bold text-txt-primary">Emuná</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8"
        >
          <h1 className="text-[24px] font-extrabold leading-snug text-txt-primary">
            {camino === "pago" ? "Crea tu cuenta para pagar" : "Crea tu cuenta gratis"}
          </h1>
          <p className="mt-2 text-[14.5px] leading-relaxed text-txt-secondary">
            {camino === "pago"
              ? "La usamos para guardar tu acceso a los 52 Casos en cualquier dispositivo."
              : "La usamos para guardar tu progreso y darte acceso a los Casos 2-4."}
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={handleSubmit}
          className="mt-7 flex flex-col gap-3"
        >
          <input
            type="email"
            required
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@correo.com"
            className="h-14 w-full rounded-[var(--radius-md)] border border-border-default bg-surface-elevated px-4 text-[16px] text-txt-primary outline-none transition focus:border-brand-primary"
          />
          {error && <p className="text-[13px] text-brand-detail">{error}</p>}

          <button
            type="submit"
            disabled={enviando}
            className="flex h-14 w-full items-center justify-center rounded-[var(--radius-md)] bg-brand-primary text-[16px] font-semibold text-txt-inverse transition active:scale-[0.97] disabled:opacity-60"
          >
            {enviando ? "Enviando el enlace…" : "Continuar"}
          </button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 flex items-center gap-1.5 text-[12.5px] text-txt-tertiary"
        >
          <Lock size={13} aria-hidden="true" />
          Sin contraseñas complicadas — tu correo es tu llave de acceso
        </motion.p>
      </div>
    </main>
  );
}

export default function RegistroPage() {
  return (
    <Suspense fallback={null}>
      <RegistroForm />
    </Suspense>
  );
}
