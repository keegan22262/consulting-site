"use client";

import { useState } from "react";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";
import { useScrollReveal } from "@/components-v2/foundation/useScrollReveal";

export default function StayInformedSection() {
  const [hovered, setHovered] = useState(false);
  const [revealRef, revealStyle] = useScrollReveal();

  const px = useResponsiveValue({ desktop: "32px", tablet: "32px", mobile: "24px" });
  const padV = useResponsiveValue({ desktop: "120px", tablet: "88px", mobile: "64px" });

  return (
    <section style={{ backgroundColor: "var(--a700)" }}>
      <div
        ref={revealRef}
        style={{
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingTop: padV,
          paddingBottom: padV,
          paddingLeft: px,
          paddingRight: px,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          ...revealStyle,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "0.6875rem",
            fontWeight: 600,
            color: "rgba(255,255,255,0.45)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            display: "block",
            marginBottom: "16px",
          }}
        >
          Stay Informed
        </span>

        <h2
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: useResponsiveValue({ desktop: "2rem", tablet: "1.75rem", mobile: "1.375rem" }),
            fontWeight: 600,
            lineHeight: "1.2",
            color: "#FFFFFF",
            maxWidth: "560px",
          }}
        >
          Stay ahead of institutional transformation.
        </h2>

        <p
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: useResponsiveValue({ desktop: "1rem", tablet: "0.9375rem", mobile: "0.875rem" }),
            lineHeight: "1.65",
            color: "var(--a200)",
            marginTop: "16px",
            maxWidth: "520px",
          }}
        >
          Receive our latest insights on strategy, digital transformation, financial systems, and infrastructure
          development.
        </p>

        <button
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "0.875rem",
            fontWeight: 600,
            color: hovered ? "var(--a700)" : "#FFFFFF",
            backgroundColor: hovered ? "#FFFFFF" : "transparent",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: hovered ? "#FFFFFF" : "rgba(255,255,255,0.4)",
            borderRadius: "8px",
            paddingTop: "14px",
            paddingBottom: "14px",
            paddingLeft: "40px",
            paddingRight: "40px",
            cursor: "pointer",
            marginTop: "36px",
            transition: "all 200ms ease",
          }}
        >
          Subscribe to Insights
        </button>
      </div>
    </section>
  );
}
