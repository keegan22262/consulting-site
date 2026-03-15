
"use client";

import { useState } from "react";
import Link from "next/link";

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
}: ServiceCardProps) {
  const [hovered, setHovered] = useState(false);
  const resolvedTitle = name ?? title ?? "";
  const resolvedDescription = description ?? focusAreas ?? approach ?? "";
  const resolvedHref = href ?? (slug ? `/services/${slug}` : "#");

  return (
    <Link
      href={resolvedHref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "#FFFFFF",
        border: `1px solid ${hovered ? "var(--n300)" : "var(--n200)"}`,
        borderRadius: "4px",
        padding: "32px",
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
          letterSpacing: "0.04em",
          display: "block",
          marginBottom: "16px",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {String.fromCharCode(65 + index)}
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

      {resolvedDescription ? (
        <p
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "var(--text-caption)",
            lineHeight: "1.55",
            color: "var(--n600)",
            marginTop: "8px",
            maxWidth: "48ch",
          }}
        >
          {resolvedDescription}
        </p>
      ) : null}

      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "32px",
          right: "32px",
          fontFamily: "var(--font-primary)",
          fontSize: "var(--text-body)",
          fontWeight: 600,
          color: "var(--o500)",
          opacity: hovered ? 1 : 0,
          transition: `opacity 120ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
        }}
      >
        -&gt;
      </span>
    </Link>
  );
}
