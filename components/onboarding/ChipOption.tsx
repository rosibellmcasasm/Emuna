"use client";

import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { motion } from "motion/react";

export function ChipOption({
  label,
  icon,
  selected,
  onSelect,
}: {
  label: string;
  icon?: ReactNode;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileTap={{ scale: 0.97 }}
      className={`flex min-h-14 w-full items-center gap-3 rounded-[var(--radius-md)] border px-4 py-3.5 text-left transition-colors ${
        selected
          ? "border-[1.5px] border-brand-primary bg-brand-primary-soft"
          : "border-border-default bg-surface-elevated hover:bg-surface-secondary"
      }`}
    >
      {icon}
      <span className="flex-1 text-[16px] font-medium leading-snug text-txt-primary">
        {label}
      </span>
      {selected && (
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-primary"
        >
          <Check size={14} strokeWidth={3} color="var(--text-inverse)" aria-hidden="true" />
        </motion.span>
      )}
    </motion.button>
  );
}
