import type { ReactNode } from "react";

type IconChipTone = "gold" | "sage" | "rust" | "neutral";

const TONE_STYLES: Record<IconChipTone, { bg: string; border: string }> = {
  gold: {
    bg: "bg-brand-primary-soft",
    border: "border-[color-mix(in_oklab,var(--brand-primary)_25%,transparent)]",
  },
  sage: {
    bg: "bg-brand-secondary-soft",
    border: "border-[color-mix(in_oklab,var(--brand-secondary)_25%,transparent)]",
  },
  rust: {
    bg: "bg-brand-detail-soft",
    border: "border-[color-mix(in_oklab,var(--brand-detail)_25%,transparent)]",
  },
  neutral: {
    bg: "bg-surface-tertiary",
    border: "border-border-default",
  },
};

export function IconChip({
  children,
  tone = "gold",
  size = 44,
  shape = "square",
}: {
  children: ReactNode;
  tone?: IconChipTone;
  size?: number;
  shape?: "square" | "circle";
}) {
  const styles = TONE_STYLES[tone];
  return (
    <div
      className={`flex shrink-0 items-center justify-center border ${styles.bg} ${styles.border} ${
        shape === "circle" ? "rounded-full" : "rounded-[var(--radius-md)]"
      }`}
      style={{ width: size, height: size }}
    >
      {children}
    </div>
  );
}
