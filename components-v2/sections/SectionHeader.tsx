"use client";

// ═══════════════════════════════════════════════════════════════════════════════
// ALINABSS SectionHeader — Centralized Section Title Block
// Overline + H2 headline + optional description + optional accent rule.
// Supports left-aligned (default) and centered layout for dark bands.
// ═══════════════════════════════════════════════════════════════════════════════

import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";

interface SectionHeaderProps {
  /** Optional uppercase overline label above the title */
  overline?: string;
  /** Section heading — renders as H2 */
  title: string;
  /** Optional supporting paragraph below the title */
  description?: string;
  /** Text alignment — 'left' for standard sections, 'center' for dark bands */
  align?: "left" | "center";
  /** Show A-700 accent rule between title and description (default: true) */
  showAccentRule?: boolean;
  /** Max width constraint on the description paragraph (default: '65ch') */
  maxWidth?: string;
  /** Override overline color — useful for inverted (dark) backgrounds */
  overlineColor?: string;
  /** Override title color — useful for inverted (dark) backgrounds */
  titleColor?: string;
  /** Override description color — useful for inverted (dark) backgrounds */
  descriptionColor?: string;
}

export default function SectionHeader({
  overline,
  title,
  description,
  align = "left",
  showAccentRule = true,
  maxWidth = "65ch",
  overlineColor = "rgba(27, 58, 92, 0.88)",
  titleColor = "var(--n900)",
  descriptionColor = "var(--n600)",
}: SectionHeaderProps) {
  const h2Size = useResponsiveValue({
    desktop: "var(--text-h2)",
    tablet: "var(--text-h2)",
    mobile: "1.5rem",
  });
  const h2LineHeight = useResponsiveValue({
    desktop: "var(--line-height-h2)",
    tablet: "var(--line-height-h2)",
    mobile: "1.25",
  });
  const isCentered = align === "center";

  return (
    <div
      style={{
        textAlign: isCentered ? "center" : undefined,
        display: "flex",
        flexDirection: "column",
        alignItems: isCentered ? "center" : "flex-start",
      }}
    >
      {overline && (
        <span
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "var(--text-caption)",
            fontWeight: 600,
            color: overlineColor,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {overline}
        </span>
      )}

      <h2
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: h2Size,
          fontWeight: 600,
          lineHeight: h2LineHeight,
          color: titleColor,
          marginTop: overline ? "6px" : undefined,
        }}
      >
        {title}
      </h2>

      {showAccentRule ? (
        <div
          style={{
            width: "48px",
            height: "2px",
            backgroundColor: "var(--a700)",
            marginTop: "24px",
            marginBottom: description ? "24px" : undefined,
          }}
        />
      ) : null}

      {description && (
        <p
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "var(--text-body)",
            lineHeight: "var(--line-height-body)",
            color: descriptionColor,
            marginTop: showAccentRule ? undefined : "12px",
            maxWidth,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
