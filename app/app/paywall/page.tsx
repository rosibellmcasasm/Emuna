"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { IconChip } from "@/components/app/IconChip";
import { PaywallStack, TOTAL_STACK } from "@/components/app/PaywallStack";
import { Mark } from "@/components/brand/Mark";
import { tieneAccesoApp, getAuthState } from "@/lib/onboarding-store";
import { hotmartCheckoutHref } from "@/lib/hotmart-config";

export default function AppPaywallPage() {
  const router = useRouter();
  const [listo, setListo] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;
    (async () => {
      if (!(await tieneAccesoApp())) {
        router.replace("/onboarding");
        return;
      }
      const auth = await getAuthState();
      if (cancelado) return;
      setEmail(auth.email);
      setListo(true);
    })();
    return () => {
      cancelado = true;
    };
  }, [router]);

  function handleDesbloquear() {
    const checkoutHref = hotmartCheckoutHref(email);
    if (checkoutHref) {
      window.location.href = checkoutHref;
      return;
    }
    // El checkout de Hotmart todavía no está conectado (ver ESTADO.md) — llevamos
    // a una pantalla honesta en vez de un link falso.
    router.push("/onboarding/confirmacion?camino=pago");
  }

  if (!listo) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center bg-surface-base px-6">
        <Mark size={40} />
      </main>
    );
  }

  return (
    <main className="flex min-h-dvh flex-col bg-surface-base px-4 py-6">
      <div className="mx-auto flex w-full max-w-[440px] flex-1 flex-col">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Volver"
            className="flex size-9 items-center justify-center rounded-full transition active:scale-95"
          >
            <ArrowLeft size={20} color="var(--text-secondary)" aria-hidden="true" />
          </button>
          <div className="flex items-center gap-2">
            <Mark size={32} />
            <span className="text-[14px] font-bold text-txt-primary">Emuná</span>
          </div>
          <span className="size-9" aria-hidden="true" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6"
        >
          <h1 className="text-[26px] font-extrabold leading-[1.15] text-txt-primary" style={{ textWrap: "balance" }}>
            Este Caso es parte de los 52 completos
          </h1>
          <p className="mt-2 text-[14.5px] leading-relaxed text-txt-secondary">
            Ya resolviste el Módulo 1 gratis. Desbloquea los 48 Casos restantes,
            uno nuevo cada semana, para siempre.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6"
        >
          <PaywallStack />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 rounded-[var(--radius-lg)] border-2 border-brand-primary bg-brand-primary-soft p-6 text-center"
        >
          <span className="inline-block rounded-full bg-brand-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-txt-inverse">
            Pago único · sin mensualidades
          </span>
          <p className="mt-3 text-[13px] text-txt-tertiary">
            Valor total <span className="line-through">${TOTAL_STACK}</span>
          </p>
          <p className="mt-1 text-[44px] font-extrabold tabular-nums text-txt-primary">$29</p>
          <p className="text-[13.5px] text-txt-secondary">
            pago único · acceso de por vida a los 52 Casos
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5"
        >
          <button
            type="button"
            onClick={handleDesbloquear}
            className="flex h-14 w-full items-center justify-center rounded-[var(--radius-md)] bg-brand-primary text-[16px] font-semibold text-txt-inverse shadow-[0_8px_30px_color-mix(in_oklab,var(--brand-primary)_20%,transparent)] transition active:scale-[0.97]"
          >
            Desbloquear los 52 Casos
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 flex items-start gap-3 rounded-[var(--radius-md)] bg-surface-secondary p-4"
        >
          <IconChip tone="sage" size={40}>
            <ShieldCheck size={20} color="var(--brand-secondary)" aria-hidden="true" />
          </IconChip>
          <div>
            <p className="text-[14px] font-bold text-txt-primary">La Garantía del Primer Caso Resuelto</p>
            <p className="mt-1 text-[13px] leading-relaxed text-txt-secondary">
              Si en tus primeros 7 días no sientes que valió la pena, escríbenos
              y te devolvemos todo.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-center"
        >
          <Link
            href="/app"
            className="min-h-11 text-[14px] font-medium text-txt-secondary underline decoration-border-strong underline-offset-4 transition hover:text-txt-primary"
          >
            Seguir con el Módulo 1 por ahora
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex items-center justify-center gap-1.5 pb-4 text-[12px] text-txt-tertiary"
        >
          <Lock size={13} aria-hidden="true" />
          Respaldada por la garantía Hotmart de 7 días
        </motion.p>
      </div>
    </main>
  );
}
