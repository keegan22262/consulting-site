"use client";

import Breadcrumb from "@/components-v2/ui/Breadcrumb";
import { useHeroEntrance } from "@/components-v2/foundation/useHeroEntrance";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";
import { HERO_BG } from "@/src/sections/insights/data";

export default function InsightsHeroSection() {
  const entrance = useHeroEntrance(true);
  const px = useResponsiveValue({ desktop: "48px", tablet: "32px", mobile: "24px" });
  const padTop = useResponsiveValue({ desktop: "160px", tablet: "120px", mobile: "96px" });
  const padBot = useResponsiveValue({ desktop: "120px", tablet: "88px", mobile: "72px" });

  return (
    <section style={{ position: "relative", overflow: "hidden", backgroundColor: "var(--a900)" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.55,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(8,18,30,0.35) 0%, rgba(8,18,30,0.55) 55%, rgba(8,18,30,0.7) 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingTop: padTop,
          paddingBottom: padBot,
          paddingLeft: px,
          paddingRight: px,
        }}
      >
        <div style={{ marginBottom: "32px", ...entrance.overline }}>
          <Breadcrumb
            items={[
              { label: "RSL", href: "/" },
              { label: "Insights" },
            ]}
            light
          />
        </div>

        <span
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.5)",
            display: "block",
            marginBottom: "16px",
            ...entrance.overline,
          }}
        >
          Research & Strategic Analysis
        </span>

        <h1
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: useResponsiveValue({ desktop: "3.5rem", tablet: "2.75rem", mobile: "2rem" }),
            fontWeight: 600,
            lineHeight: useResponsiveValue({ desktop: "1.08", tablet: "1.1", mobile: "1.2" }),
            letterSpacing: useResponsiveValue({ desktop: "-0.03em", tablet: "-0.02em", mobile: "-0.01em" }),
            color: "#FFFFFF",
            maxWidth: "720px",
            ...entrance.heading,
          }}
        >
          Insights & Perspectives
        </h1>

        <p
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: useResponsiveValue({ desktop: "1.25rem", tablet: "1.125rem", mobile: "1rem" }),
            lineHeight: "1.65",
            color: "rgba(255,255,255,0.72)",
            marginTop: "20px",
            maxWidth: "580px",
            ...entrance.paragraph,
          }}
        >
          Strategic analysis on the forces shaping institutions, markets, and transformation across Africa.
        </p>
      </div>
    </section>
  );
}
