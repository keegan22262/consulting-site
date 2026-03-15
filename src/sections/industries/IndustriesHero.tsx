"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Breadcrumb from "@/components-v2/ui/Breadcrumb";
import { useHeroEntrance } from "@/components-v2/foundation/useHeroEntrance";
import { useResponsiveValue } from "@/lib/breakpoints";
import { BORDER_RADIUS, C, F, HERO_BACKGROUNDS, M_CURVE, M_DUR, MAX_WIDTH } from "./data";

export default function IndustriesHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const heroEntrance = useHeroEntrance();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const px = useResponsiveValue("32px", "32px", "24px");
  const padTop = useResponsiveValue("136px", "104px", "80px");
  const padBot = useResponsiveValue("104px", "80px", "64px");

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
    }, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      {HERO_BACKGROUNDS.map((img, i) => (
        <div
          key={img}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "grayscale(40%) contrast(1.1)",
            opacity: i === activeIndex ? 1 : 0,
            transition: "opacity 1200ms ease-in-out",
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          background: `linear-gradient(to bottom, ${C.a900}B3 0%, ${C.a900}D9 50%, ${C.a900}F2 100%)`,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: padTop,
          paddingBottom: padBot,
          paddingLeft: "0",
          paddingRight: "0",
        }}
      >
        <div
          style={{
            maxWidth: MAX_WIDTH,
            margin: "0 auto",
            paddingTop: "0",
            paddingBottom: "0",
            paddingLeft: px,
            paddingRight: px,
          }}
        >
          <div style={{ marginBottom: "32px", ...heroEntrance.overline }}>
            <Breadcrumb
              items={[
                { label: "RSL", href: "/" },
                { label: "Industries" },
              ]}
              light
            />
          </div>

          <div style={{ maxWidth: useResponsiveValue("720px", "100%", "100%") as string }}>
            <span
              style={{
                fontFamily: F,
                fontSize: "var(--text-caption)",
                fontWeight: 600,
                color: "rgba(255,255,255,0.65)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                display: "block",
                marginBottom: "16px",
                ...heroEntrance.overline,
              }}
            >
              Industry
            </span>

            <h1
              style={{
                fontFamily: F,
                fontSize: useResponsiveValue("3.5rem", "2.75rem", "2.25rem"),
                fontWeight: 600,
                lineHeight: useResponsiveValue("1.06", "1.1", "1.15"),
                letterSpacing: useResponsiveValue("-0.025em", "-0.015em", "-0.005em"),
                color: C.white,
                ...heroEntrance.heading,
              }}
            >
              Sector expertise grounded in institutional execution.
            </h1>

            <p
              style={{
                fontFamily: F,
                fontSize: "var(--text-body-lg)",
                lineHeight: "var(--line-height-body-lg)",
                color: C.a200,
                marginTop: "16px",
                maxWidth: "62ch",
                ...heroEntrance.paragraph,
              }}
            >
              Advisory strategy that lacks sector calibration produces generic recommendations. Rill Singh
              Limited operates with embedded understanding of regulatory environments, capital structures,
              market dynamics, and digital maturity across every industry we serve.
            </p>

            <div
              style={{ marginTop: useResponsiveValue("48px", "40px", "32px"), ...heroEntrance.cta }}
            >
              <a
                href="#sector-coverage"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = C.n100;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = C.white;
                }}
                style={{
                  display: "inline-block",
                  textAlign: "center",
                  fontFamily: F,
                  fontSize: "var(--text-body)",
                  fontWeight: 600,
                  lineHeight: "1",
                  color: C.a700,
                  backgroundColor: C.white,
                  borderRadius: BORDER_RADIUS,
                  paddingTop: "16px",
                  paddingBottom: "16px",
                  paddingLeft: "28px",
                  paddingRight: "28px",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: `background-color ${M_DUR} ${M_CURVE}`,
                }}
              >
                Explore our industry expertise
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
