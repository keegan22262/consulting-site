"use client";

import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";
import { useScrollReveal } from "@/components-v2/foundation/useScrollReveal";

interface ResearchAndAnalysisSectionProps {
  insightCount: number;
  activeFilter: string;
  children: React.ReactNode;
}

export default function ResearchAndAnalysisSection({
  insightCount,
  activeFilter,
  children,
}: ResearchAndAnalysisSectionProps) {
  const [revealRef, revealStyle] = useScrollReveal();
  const px = useResponsiveValue({ desktop: "32px", tablet: "32px", mobile: "24px" });
  const padTop = useResponsiveValue({ desktop: "80px", tablet: "64px", mobile: "48px" });
  const padBottom = useResponsiveValue({ desktop: "96px", tablet: "72px", mobile: "56px" });

  return (
    <section style={{ backgroundColor: "var(--n50)", paddingTop: padTop, paddingBottom: padBottom }}>
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
        <div style={{ marginBottom: "32px" }}>
          <div
            style={{
              width: "48px",
              height: "2px",
              backgroundColor: "var(--a700)",
              marginBottom: "24px",
            }}
          />
          <h2
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: useResponsiveValue({ desktop: "2rem", tablet: "1.75rem", mobile: "1.5rem" }),
              fontWeight: 600,
              lineHeight: "1.15",
              letterSpacing: "-0.015em",
              color: "var(--n900)",
            }}
          >
            All Research & Analysis
          </h2>
          <p
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "var(--text-body)",
              lineHeight: "1.6",
              color: "var(--n500)",
              marginTop: "8px",
            }}
          >
            {insightCount} insight{insightCount !== 1 ? "s" : ""}
            {activeFilter !== "All Insights" ? ` in ${activeFilter}` : ""}
          </p>
        </div>

        {children}
      </div>
    </section>
  );
}
