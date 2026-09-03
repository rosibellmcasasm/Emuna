import type { ReactNode } from "react";

export function GradientBorderCard({
  children,
  className = "",
  hue = "var(--brand-primary)",
  thickness = 1,
}: {
  children: ReactNode;
  className?: string;
  hue?: string;
  thickness?: 1 | 2;
}) {
  return (
    <div
      className={`rounded-[var(--radius-lg)] ${className}`}
      style={{
        border: `${thickness}px solid transparent`,
        backgroundImage: `linear-gradient(var(--surface-primary), var(--surface-primary)), linear-gradient(135deg, color-mix(in oklab, ${hue} 55%, transparent), transparent 60%)`,
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
      }}
    >
      {children}
    </div>
  );
}
