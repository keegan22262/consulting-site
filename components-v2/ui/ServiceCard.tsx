
"use client";

import { useState } from "react";
import Link from "next/link";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";

interface ServiceCardProps {
  index: number;
  name?: string;
  title?: string;
  description?: string;
  slug?: string;
  href?: string;
  focusAreas?: string;
  approach?: string;
  variant?: "default" | "industry";
  ctaLabel?: string;
  showCornerArrow?: boolean;
}

export default function ServiceCard({
  index,
  name,
  title,
  description,
  slug,
  href,
  focusAreas,
  approach,
  ctaLabel,
  showCornerArrow = true,
}: ServiceCardProps) {
  const [hovered, setHovered] = useState(false);
  const pad = useResponsiveValue({ desktop: "32px", tablet: "24px", mobile: "24px" });
  const resolvedTitle = name ?? title ?? "";
  const resolvedFocus = focusAreas ?? "";
  const resolvedApproach = approach ?? description ?? "";
  const resolvedHref = href ?? (slug ? `/services/${slug}` : "#");
  const resolvedCta = ctaLabel ?? "Explore Service";

  return (
    <Link
      href={resolvedHref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "#FFFFFF",
        border: `1px solid ${hovered ? "var(--n300)" : "var(--n200)"}`,
        borderRadius: "4px",
        padding: pad,
        transition: `border-color 120ms cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 120ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
        boxShadow: hovered ? "0 1px 4px rgba(0,0,0,0.06)" : "none",
        position: "relative",
        display: "block",
        textDecoration: "none",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "0.6875rem",
          fontWeight: 600,
          color: "var(--n400)",
          letterSpacing: "0.02em",
          display: "block",
          marginBottom: "16px",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <h3
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "var(--text-body)",
          fontWeight: 600,
          lineHeight: "var(--line-height-body)",
          color: hovered ? "var(--a700)" : "var(--n900)",
          transition: `color 120ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
        }}
      >
        {resolvedTitle}
      </h3>

      {resolvedFocus ? (
        <p
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "var(--text-caption)",
            lineHeight: "1.55",
            color: "var(--n600)",
            marginTop: "8px",
            maxWidth: "52ch",
          }}
        >
          <strong style={{ fontWeight: 600, color: "var(--n700)" }}>Focus:</strong>{" "}
          {resolvedFocus}
        </p>
      ) : null}

      {resolvedApproach ? (
        <p
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "var(--text-caption)",
            lineHeight: "1.55",
            color: "var(--n600)",
            marginTop: "8px",
            maxWidth: "52ch",
          }}
        >
          {resolvedApproach}
        </p>
      ) : null}

      <span
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "var(--text-caption)",
          fontWeight: 600,
          color: "var(--a700)",
          marginTop: "16px",
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        {resolvedCta}
        <span
          style={{
            color: hovered ? "var(--o500)" : "var(--a700)",
            transition: `color 120ms cubic-bezier(0.25, 0.1, 0.25, 1)`
          }}
        >
          {"->"}
        </span>
      </span>

      {showCornerArrow ? (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: pad,
            right: pad,
            fontFamily: "var(--font-primary)",
            fontSize: "var(--text-body)",
            fontWeight: 600,
            color: "var(--o500)",
            opacity: hovered ? 1 : 0,
            transition: `opacity 120ms cubic-bezier(0.25, 0.1, 0.25, 1)`
          }}
        >
          {"->"}
        </span>
      ) : null}
    </Link>
  );
}
