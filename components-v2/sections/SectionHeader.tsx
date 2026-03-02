// ═══════════════════════════════════════════════════════════════════════════════
// ALINABSS SectionHeader — Centralized Section Title Block
// Overline + H2 headline + optional description + optional accent rule.
// Supports left-aligned (default) and centered layout for dark bands.
// ═══════════════════════════════════════════════════════════════════════════════

import type { ReactNode } from "react";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";

interface SectionHeaderProps {
  overline?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  overline,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  const isCentered = align === "center";

  return (
    <div
      className={[
        "flex flex-col",
        isCentered ? "items-center text-center" : "items-start text-left",
      ].join(" ")}
    >
      {/* Overline */}
      {overline && (
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          {overline}
        </span>
      )}

      {/* H2 Title */}
      <h2 className="mt-1.5 text-2xl font-bold text-text-primary">
        {title}
      </h2>

      {/* Accent rule */}
      {description && (
        <div className="my-6 w-12 h-0.5 bg-accent-primary" />
      )}

      {/* Description */}
      {description && (
        <p className="mt-2 text-neutral-600 max-w-prose text-sm leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
