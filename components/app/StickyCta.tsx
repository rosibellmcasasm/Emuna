"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";

export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-cta");
    const oferta = document.getElementById("oferta");
    const ctaFinal = document.getElementById("cta-final");
    if (!hero) return;

    const heroObserver = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    heroObserver.observe(hero);

    let hideForOffer = false;
    const hideObserver = new IntersectionObserver(
      (entries) => {
        hideForOffer = entries.some((entry) => entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    if (oferta) hideObserver.observe(oferta);
    if (ctaFinal) hideObserver.observe(ctaFinal);

    const interval = setInterval(() => {
      if (hideForOffer) setVisible(false);
    }, 150);

    return () => {
      heroObserver.disconnect();
      hideObserver.disconnect();
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border-default bg-surface-elevated/95 px-4 pt-2 backdrop-blur md:hidden"
          style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
        >
          <Link
            href="/onboarding"
            className="flex h-12 w-full items-center justify-center rounded-[var(--radius-md)] bg-brand-primary text-[15px] font-semibold text-txt-inverse active:scale-[0.97] transition"
          >
            Resolver el Caso 01 gratis
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
