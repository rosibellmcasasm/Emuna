import Link from "next/link";
import { Mark } from "@/components/brand/Mark";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border-default/60 bg-surface-base/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Mark size={42} title="Emuná" />
          <span className="text-lg font-bold tracking-tight text-txt-primary">
            Emuná
          </span>
        </Link>
        <Link
          href="/onboarding"
          className="text-sm font-medium text-txt-secondary hover:text-txt-primary transition-colors"
        >
          Entrar
        </Link>
      </div>
    </header>
  );
}
