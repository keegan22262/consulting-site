"use client";

import { useState } from "react";
import Link from "next/link";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";
import { useScrollReveal } from "@/components-v2/foundation/useScrollReveal";
import { INSIGHT_CAROUSEL_EASING } from "@/components-v2/ui/InsightCarouselCard";
import type { InsightEntry } from "@/src/sections/insights/data";

interface FeaturedInsightsSectionProps {
  insight: InsightEntry;
}

export default function FeaturedInsightsSection({ insight }: FeaturedInsightsSectionProps) {
  const [hovered, setHovered] = useState(false);
  const [revealRef, revealStyle] = useScrollReveal();

  const px = useResponsiveValue({ desktop: "32px", tablet: "32px", mobile: "24px" });
  const cardH = useResponsiveValue({ desktop: "480px", tablet: "400px", mobile: "360px" });
  const padTop = useResponsiveValue({ desktop: "80px", tablet: "64px", mobile: "48px" });
  const padBottom = useResponsiveValue({ desktop: "24px", tablet: "16px", mobile: "16px" });

  return (
    <section style={{ backgroundColor: "#FFFFFF", paddingTop: padTop, paddingBottom: padBottom }}>
      <div
        ref={revealRef}
        style={{
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: px,
          paddingRight: px,
          ...revealStyle,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "0.6875rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "var(--n400)",
            display: "block",
            marginBottom: "20px",
          }}
        >
          Featured Insight
        </span>

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
              transform: hovered ? "scale(1.03)" : "scale(1)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(12,28,46,0.88) 0%, rgba(12,28,46,0.6) 50%, rgba(12,28,46,0.2) 100%)",
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              paddingLeft: useResponsiveValue({ desktop: "48px", tablet: "32px", mobile: "24px" }),
              paddingRight: useResponsiveValue({ desktop: "48px", tablet: "32px", mobile: "24px" }),
              paddingBottom: useResponsiveValue({ desktop: "48px", tablet: "36px", mobile: "28px" }),
              paddingTop: "24px",
              maxWidth: useResponsiveValue({ desktop: "600px", tablet: "500px", mobile: "100%" }),
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.6)",
                display: "block",
                marginBottom: "12px",
              }}
            >
              {insight.category}
            </span>

            <h2
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: useResponsiveValue({ desktop: "1.75rem", tablet: "1.5rem", mobile: "1.25rem" }),
                fontWeight: 600,
                lineHeight: "1.25",
                color: "#FFFFFF",
                marginBottom: "12px",
              }}
            >
              {insight.headline}
            </h2>

            <p
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "0.9375rem",
                lineHeight: "1.6",
                color: "rgba(255,255,255,0.72)",
                marginBottom: "20px",
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
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#FFFFFF",
                borderBottomWidth: "1px",
                borderBottomStyle: "solid",
                borderBottomColor: hovered ? "#FFFFFF" : "rgba(255,255,255,0.4)",
                paddingBottom: "2px",
                transition: "border-bottom-color 200ms ease",
              }}
            >
              Read Full Insight →
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
