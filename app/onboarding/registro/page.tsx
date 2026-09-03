"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock } from "lucide-react";
import { motion } from "motion/react";
import { setAuthState } from "@/lib/onboarding-store";
import { Mark } from "@/components/brand/Mark";

function RegistroForm() {
  const router = useRouter();
  const params = useSearchParams();
  const camino = params.get("camino") === "gratis" ? "gratis" : "pago";

  const [email, setEmail] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || enviando) {
      setError("Ingresa un correo válido para continuar.");
      return;
    }
    setError(null);
    setEnviando(true);
    // Estado simulado — sin backend hasta la Sesión 6 (Supabase)
    setTimeout(() => {
      setAuthState({ registrado: true, email, camino });
      router.push(`/onboarding/confirmacion?camino=${camino}`);
    }, 700);
  }

  function handleGoogleSimulado() {
    if (enviando) return;
    setEnviando(true);
    setTimeout(() => {
      setAuthState({ registrado: true, email: "tu.correo@gmail.com", camino });
      router.push(`/onboarding/confirmacion?camino=${camino}`);
    }, 700);
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
            {enviando ? "Creando tu cuenta…" : "Continuar"}
          </button>

          <button
            type="button"
            onClick={handleGoogleSimulado}
            disabled={enviando}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-[var(--radius-md)] border border-border-default bg-surface-elevated text-[15px] font-medium text-txt-primary transition active:scale-[0.97] disabled:opacity-60"
          >
            Continuar con Google
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
