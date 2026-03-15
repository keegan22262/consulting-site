"use client";

import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";

interface PhaseBlockProps {
  index: number;
  total: number;
  phase: string;
  body: string;
}

export default function PhaseBlock({ index, total, phase, body }: PhaseBlockProps) {
  const isDesktop = useResponsiveValue({ desktop: true, tablet: false, mobile: false });
  const isLast = index === total - 1;

  return (
    <div
      style={{
        display: isDesktop ? "grid" : "block",
        gridTemplateColumns: isDesktop ? "80px 1fr" : undefined,
        gap: isDesktop ? "32px" : "0",
        padding: "40px 0",
        borderBottom: isLast ? "none" : "1px solid var(--n200)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "var(--text-h2)",
          fontWeight: 600,
          lineHeight: "var(--line-height-h2)",
          color: "var(--n400)",
          fontVariantNumeric: "tabular-nums",
          marginBottom: isDesktop ? "0" : "8px",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      <div>
        <h3
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "var(--text-h3)",
            fontWeight: 600,
            lineHeight: "var(--line-height-h3)",
            color: "var(--n900)",
            paddingTop: isDesktop ? "4px" : "0",
          }}
        >
          {phase}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "var(--text-body)",
            lineHeight: "var(--line-height-body)",
            color: "var(--n700)",
            marginTop: "8px",
            maxWidth: "58ch",
          }}
        >
          {body}
        </p>
      </div>
    </div>
  );
}
