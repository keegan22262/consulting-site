"use client";

import { useState } from "react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  light?: boolean;
}

export default function Breadcrumb({ items, light = false }: BreadcrumbProps) {
  const colors = light
    ? {
        base: "rgba(255,255,255,0.5)",
        hover: "rgba(255,255,255,0.85)",
        active: "rgba(255,255,255,0.9)",
        sep: "rgba(255,255,255,0.3)",
      }
    : {
        base: "var(--n500)",
        hover: "var(--n800)",
        active: "var(--n800)",
        sep: "var(--n300)",
      };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={`${item.label}-${index}`} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {isLast ? (
              <span
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "var(--text-caption)",
                  fontWeight: 600,
                  color: colors.active,
                }}
              >
                {item.label}
              </span>
            ) : (
              <>
                <BreadcrumbLink href={item.href || "#"} label={item.label} colors={colors} />
                <span
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "var(--text-caption)",
                    color: colors.sep,
                  }}
                >
                  /
                </span>
              </>
            )}
          </span>
        );
      })}
    </div>
  );
}

function BreadcrumbLink({
  href,
  label,
  colors,
}: {
  href: string;
  label: string;
  colors: { base: string; hover: string };
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "var(--font-primary)",
        fontSize: "var(--text-caption)",
        fontWeight: 400,
        color: hovered ? colors.hover : colors.base,
        textDecoration: "none",
        transition: "color 120ms cubic-bezier(0.25, 0.1, 0.25, 1)",
      }}
    >
      {label}
    </Link>
  );
}
