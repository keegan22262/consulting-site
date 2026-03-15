"use client";

import { useState } from "react";
import Link from "next/link";

interface GatewayLinkProps {
  label: string;
  href: string;
  dark?: boolean;
}

export default function GatewayLink({ label, href, dark = false }: GatewayLinkProps) {
  const [hovered, setHovered] = useState(false);
  const colors = dark
    ? {
        color: hovered ? "#FFFFFF" : "rgba(255, 255, 255, 0.85)",
        decorationColor: hovered ? "rgba(255, 255, 255, 0.6)" : "rgba(255, 255, 255, 0.4)",
      }
    : {
        color: hovered ? "var(--a800)" : "var(--a700)",
        decorationColor: hovered ? "var(--a200)" : "var(--a700)",
      };

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "var(--font-primary)",
        fontSize: "var(--text-body)",
        fontWeight: 600,
        color: colors.color,
        textDecoration: "underline",
        textUnderlineOffset: "4px",
        textDecorationThickness: hovered ? "2px" : "1px",
        textDecorationColor: colors.decorationColor,
        cursor: "pointer",
        transition:
          "color 120ms cubic-bezier(0.25, 0.1, 0.25, 1), text-decoration-thickness 120ms cubic-bezier(0.25, 0.1, 0.25, 1), text-decoration-color 120ms cubic-bezier(0.25, 0.1, 0.25, 1)",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      {label}
      <span
        style={{
          fontSize: "1em",
          transform: hovered ? "translateX(3px)" : "translateX(0)",
          transition: "transform 120ms cubic-bezier(0.25, 0.1, 0.25, 1)",
          color: hovered && !dark ? "var(--a700)" : undefined,
        }}
      >
        -&gt;
      </span>
    </Link>
  );
}
