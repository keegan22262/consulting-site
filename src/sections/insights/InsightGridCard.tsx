"use client";

import { useState } from "react";
import Link from "next/link";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";
import { INSIGHT_CAROUSEL_EASING } from "@/components-v2/ui/InsightCarouselCard";
import type { InsightEntry } from "@/src/sections/insights/data";

interface InsightGridCardProps {
  insight: InsightEntry;
}

export default function InsightGridCard({ insight }: InsightGridCardProps) {
  const [hovered, setHovered] = useState(false);
  const cardH = useResponsiveValue({ desktop: "420px", tablet: "380px", mobile: "360px" });

  return (
    <Link
      href={`/insights/${insight.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        position: "relative",
        overflow: "hidden",
        borderRadius: "12px",
        height: cardH,
        textDecoration: "none",
        cursor: "pointer",
        boxShadow: hovered
          ? "0 12px 32px rgba(0,0,0,0.18)"
          : "0 4px 16px rgba(0,0,0,0.08)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: `box-shadow 240ms ${INSIGHT_CAROUSEL_EASING}, transform 240ms ${INSIGHT_CAROUSEL_EASING}`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${insight.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: `transform 600ms ${INSIGHT_CAROUSEL_EASING}`,
          transform: hovered ? "scale(1.05)" : "scale(1)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? "linear-gradient(180deg, rgba(12,28,46,0.25) 0%, rgba(12,28,46,0.88) 65%, rgba(12,28,46,0.95) 100%)"
            : "linear-gradient(180deg, rgba(12,28,46,0.15) 0%, rgba(12,28,46,0.75) 60%, rgba(12,28,46,0.92) 100%)",
          transition: `background 300ms ${INSIGHT_CAROUSEL_EASING}`,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          paddingTop: "20px",
          paddingLeft: "24px",
          paddingRight: "24px",
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "0.6875rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          {insight.category}
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingLeft: "24px",
          paddingRight: "24px",
          paddingBottom: "24px",
          paddingTop: "16px",
          zIndex: 2,
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: hovered ? "1.125rem" : "1.0625rem",
            fontWeight: 600,
            lineHeight: "1.3",
            color: "#FFFFFF",
            marginBottom: "8px",
            transition: `font-size 240ms ${INSIGHT_CAROUSEL_EASING}`,
          }}
        >
          {insight.headline}
        </h3>

        <p
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "0.8125rem",
            lineHeight: "1.55",
            color: "rgba(255,255,255,0.68)",
            marginBottom: "12px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {insight.whatItMeans}
        </p>

        <span
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "0.6875rem",
            color: "rgba(255,255,255,0.45)",
            display: "block",
            marginBottom: "12px",
          }}
        >
          RSL Perspectives • {formatDate(insight.date)} • {insight.readTime}
        </span>

        <span
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "0.8125rem",
            fontWeight: 600,
            color: "#FFFFFF",
            opacity: hovered ? 1 : 0,
            transition: `opacity 240ms ${INSIGHT_CAROUSEL_EASING}`,
            borderBottomWidth: "1px",
            borderBottomStyle: "solid",
            borderBottomColor: "rgba(255,255,255,0.5)",
            paddingBottom: "2px",
          }}
        >
          Read Insight →
        </span>
      </div>
    </Link>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}
