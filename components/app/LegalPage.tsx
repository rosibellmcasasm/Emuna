import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main className="flex-1 bg-surface-base">
      <div className="mx-auto max-w-[680px] px-4 py-14 sm:px-6 sm:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[14px] font-medium text-txt-secondary hover:text-txt-primary"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Volver al inicio
        </Link>
        <h1 className="mt-6 text-[28px] font-bold text-txt-primary sm:text-[32px]">
          {title}
        </h1>
        <p className="mt-1 text-[13px] text-txt-tertiary">
          Última actualización: {updated}
        </p>
        <div className="prose-legal mt-8 flex flex-col gap-5 text-[15px] leading-relaxed text-txt-secondary">
          {children}
        </div>
      </div>
    </main>
  );
}
