"use client";

import { useState } from "react";
import Link from "next/link";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";

type CTABlockProps = {
  overline?: string;
  heading?: string;
  title?: string;
  body?: string;
  description?: string;
  primary?: { label: string; href: string };
  primaryLabel?: string;
  primaryHref?: string;
  secondary?: { label: string; href: string; scaffold?: boolean };
  secondaryLabel?: string;
  secondaryHref?: string;
  secondaryVariant?: "primary" | "secondary" | "ghost" | "text" | "arrow";
  variant?: "dark" | "light" | "inline";
  align?: "left" | "center";
};

export default function CTABlock({
  overline,
  heading,
  title,
  body,
  description,
  primary,
  primaryLabel,
  primaryHref,
  secondary,
  secondaryLabel,
  secondaryHref,
  variant = "dark",
  align = "left",
}: CTABlockProps) {
  const [primaryHover, setPrimaryHover] = useState(false);
  const [secondaryHover, setSecondaryHover] = useState(false);
  const isMobile = useResponsiveValue({ desktop: false, tablet: false, mobile: true });
  const px = useResponsiveValue({ desktop: "32px", tablet: "32px", mobile: "24px" });
  const verticalPad = useResponsiveValue({ desktop: "96px", tablet: "72px", mobile: "56px" });
  const h2Size = useResponsiveValue({ desktop: "2rem", tablet: "1.75rem", mobile: "1.5rem" });
  const gapTop = useResponsiveValue({ desktop: "48px", tablet: "40px", mobile: "32px" });

  const isDark = variant === "dark";
  const isLight = variant === "light";
  const isCentered = align === "center";

  const resolvedHeading = heading ?? title ?? "";
  const resolvedBody = body ?? description;
  const resolvedPrimary = primary ?? (primaryLabel && primaryHref
    ? { label: primaryLabel, href: primaryHref }
    : undefined);
  const resolvedSecondary = secondary ?? (secondaryLabel && secondaryHref
    ? { label: secondaryLabel, href: secondaryHref }
    : undefined);

  const backgroundColor = isDark
    ? "var(--a700)"
    : isLight
    ? "var(--n50)"
    : "#FFFFFF";

  return (
    <section style={{ backgroundColor }}>
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: `${verticalPad} ${px}`,
          textAlign: isCentered ? "center" : undefined,
          display: isCentered ? "flex" : undefined,
          flexDirection: isCentered ? "column" : undefined,
          alignItems: isCentered ? "center" : undefined,
        }}
      >
        {overline && (
          <span
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "var(--text-caption)",
              fontWeight: 600,
              color: isDark ? "rgba(255,255,255,0.5)" : "var(--a700)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              display: "block",
              marginBottom: "8px",
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
            lineHeight: "1.2",
            letterSpacing: "-0.015em",
            color: isDark ? "#FFFFFF" : "var(--n900)",
            maxWidth: "65ch",
          }}
        >
          {resolvedHeading}
        </h2>

        {resolvedBody && (
          <p
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: isMobile ? "var(--text-body)" : "var(--text-body-lg)",
              lineHeight: isMobile ? "var(--line-height-body)" : "var(--line-height-body-lg)",
              color: isDark ? "var(--a200)" : "var(--n600)",
              marginTop: "12px",
              maxWidth: "560px",
            }}
          >
            {resolvedBody}
          </p>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : isCentered ? "column" : "row",
            alignItems: isMobile ? "stretch" : isCentered ? "center" : "center",
            gap: isMobile ? "16px" : "24px",
            marginTop: gapTop,
          }}
        >
          {resolvedPrimary ? (
            <Link
              href={resolvedPrimary.href}
              onMouseEnter={() => setPrimaryHover(true)}
              onMouseLeave={() => setPrimaryHover(false)}
              style={{
                display: "inline-block",
                fontFamily: "var(--font-primary)",
                fontSize: "var(--text-body)",
                fontWeight: 600,
                lineHeight: "1",
                color: isDark ? "var(--a700)" : "#FFFFFF",
                backgroundColor: isDark
                  ? primaryHover
                    ? "var(--n100)"
                    : "#FFFFFF"
                  : primaryHover
                  ? "var(--a800)"
                  : "var(--a700)",
                borderRadius: "4px",
                padding: "16px 24px",
                cursor: "pointer",
                textDecoration: "none",
                transition: "background-color 120ms cubic-bezier(0.25, 0.1, 0.25, 1)",
                textAlign: "center",
                width: isMobile ? "100%" : "auto",
              }}
            >
              {resolvedPrimary.label}
            </Link>
          ) : null}

          {resolvedSecondary ? (
            <Link
              href={resolvedSecondary.href}
              onMouseEnter={() => setSecondaryHover(true)}
              onMouseLeave={() => setSecondaryHover(false)}
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "var(--text-caption)",
                fontWeight: 400,
                lineHeight: "1",
                color: isDark
                  ? secondaryHover
                    ? "rgba(255,255,255,0.95)"
                    : "rgba(255,255,255,0.6)"
                  : secondaryHover
                  ? "var(--a800)"
                  : "var(--a700)",
                cursor: "pointer",
                transition: "color 120ms cubic-bezier(0.25, 0.1, 0.25, 1)",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                textDecorationColor: isDark
                  ? secondaryHover
                    ? "rgba(255,255,255,0.5)"
                    : "rgba(255,255,255,0.3)"
                  : secondaryHover
                  ? "var(--a200)"
                  : "var(--a700)",
                textAlign: isMobile ? "center" : undefined,
              }}
            >
              {resolvedSecondary.label}
              {resolvedSecondary.scaffold ? " ↓" : ""}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
