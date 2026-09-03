"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenText, MessageCircleQuestion, UserRound } from "lucide-react";

const DESTINOS = [
  { href: "/app", label: "Casos", icon: BookOpenText, match: (p: string) => p === "/app" || p.startsWith("/app/caso") },
  { href: "/app/guia", label: "Guía", icon: MessageCircleQuestion, match: (p: string) => p.startsWith("/app/guia") },
  { href: "/app/perfil", label: "Perfil", icon: UserRound, match: (p: string) => p.startsWith("/app/perfil") },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegación principal"
      className="sticky bottom-0 z-20 border-t border-border-default bg-surface-elevated/95 backdrop-blur"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex w-full max-w-[440px] items-stretch justify-around px-2">
        {DESTINOS.map(({ href, label, icon: Icon, match }) => {
          const activo = match(pathname);
          return (
            <Link
              key={href}
              href={href}
              className="flex min-h-14 flex-1 flex-col items-center justify-center gap-1 py-2"
              aria-current={activo ? "page" : undefined}
            >
              <span
                className={`flex h-8 w-12 items-center justify-center rounded-full transition ${
                  activo ? "bg-brand-primary-soft" : ""
                }`}
              >
                <Icon
                  size={20}
                  strokeWidth={activo ? 2.4 : 2}
                  color={activo ? "var(--brand-primary)" : "var(--text-tertiary)"}
                  aria-hidden="true"
                />
              </span>
              <span
                className={`text-[11px] font-semibold ${
                  activo ? "text-brand-primary" : "text-txt-tertiary"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
