"use client";

import { useState } from "react";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";
import { useScrollReveal } from "@/components-v2/foundation/useScrollReveal";
import { INSIGHT_CAROUSEL_EASING } from "@/components-v2/ui/InsightCarouselCard";
import { ANALYSIS_BG } from "@/src/sections/insights/data";

export default function SpecialAnalysisSection() {
  const [hovered, setHovered] = useState(false);
  const [revealRef, revealStyle] = useScrollReveal();

  const px = useResponsiveValue({ desktop: "32px", tablet: "32px", mobile: "24px" });
  const cardH = useResponsiveValue({ desktop: "360px", tablet: "300px", mobile: "280px" });
  const padTop = useResponsiveValue({ desktop: "96px", tablet: "72px", mobile: "56px" });
  const padBottom = useResponsiveValue({ desktop: "96px", tablet: "72px", mobile: "56px" });

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
          Special Analysis
        </span>

        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "12px",
            height: cardH,
            cursor: "pointer",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${ANALYSIS_BG})`,
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
                "linear-gradient(to right, rgba(12,28,46,0.92) 0%, rgba(12,28,46,0.7) 40%, rgba(12,28,46,0.3) 100%)",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
              paddingLeft: useResponsiveValue({ desktop: "56px", tablet: "36px", mobile: "24px" }),
              paddingRight: useResponsiveValue({ desktop: "56px", tablet: "36px", mobile: "24px" }),
              maxWidth: useResponsiveValue({ desktop: "640px", tablet: "520px", mobile: "100%" }),
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.5)",
                display: "block",
                marginBottom: "16px",
              }}
            >
              RSL Strategic Report
            </span>

            <h2
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: useResponsiveValue({ desktop: "2rem", tablet: "1.75rem", mobile: "1.375rem" }),
                fontWeight: 600,
                lineHeight: "1.2",
                color: "#FFFFFF",
                marginBottom: "16px",
              }}
            >
              The Future of Infrastructure Finance in Africa
            </h2>

            <p
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "0.9375rem",
                lineHeight: "1.65",
                color: "rgba(255,255,255,0.72)",
                marginBottom: "24px",
                maxWidth: "480px",
              }}
            >
              A strategic examination of how infrastructure investment, public-private partnerships, and innovative
              financing mechanisms are reshaping economic development across the continent.
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
                width: "fit-content",
              }}
            >
              Explore Analysis →
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
