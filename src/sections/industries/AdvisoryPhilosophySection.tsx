"use client";

import { useState } from "react";
import { r } from "@/lib/breakpoints";
import { C, F, MAX_WIDTH, M_CURVE, M_DUR, PHILOSOPHY_CARDS } from "./data";

export default function AdvisoryPhilosophySection() {
  const isDesktop = r(true, false, false);
  const isTablet = r(false, true, false);
  const px = r("32px", "32px", "24px");

  return (
    <section style={{ backgroundColor: C.white }}>
      <div
        style={{
          maxWidth: MAX_WIDTH,
          margin: "0 auto",
          paddingTop: r("96px", "72px", "56px"),
          paddingBottom: r("96px", "72px", "56px"),
          paddingLeft: px,
          paddingRight: px,
        }}
      >
        <span
          style={{
            fontFamily: F,
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: C.n500,
            display: "block",
            marginBottom: "12px",
          }}
        >
          Advisory Philosophy
        </span>
        <h2
          style={{
            fontFamily: F,
            fontSize: "var(--text-h2)",
            fontWeight: 600,
            lineHeight: "var(--line-height-h2)",
            color: C.n900,
          }}
        >
          Industry context shapes execution.
        </h2>

        <p
          style={{
            fontFamily: F,
            fontSize: "var(--text-body-lg)",
            lineHeight: "1.65",
            color: C.n700,
            maxWidth: "62ch",
            marginTop: "16px",
          }}
        >
          Institutional advisory operates at the intersection of strategic intent and sector reality. Four
          dimensions define the calibration required for advisory to achieve measurable impact.
        </p>

        {isDesktop ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "48px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <PhilosophyMosaicCard {...PHILOSOPHY_CARDS[0]} height="200px" />
              <div style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: "20px" }}>
                <PhilosophyMosaicCard {...PHILOSOPHY_CARDS[1]} height="240px" />
                <PhilosophyMosaicCard {...PHILOSOPHY_CARDS[2]} height="240px" />
              </div>
            </div>
            <PhilosophyMosaicCard {...PHILOSOPHY_CARDS[3]} height="100%" />
          </div>
        ) : isTablet ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "40px" }}>
            {PHILOSOPHY_CARDS.map((card) => (
              <PhilosophyMosaicCard key={card.title} {...card} height="220px" />
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "32px" }}>
            {PHILOSOPHY_CARDS.map((card) => (
              <PhilosophyMosaicCard key={card.title} {...card} height="200px" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function PhilosophyMosaicCard({
  title,
  body,
  image,
  height,
}: {
  title: string;
  body: string;
  image: string;
  height: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        height,
        minHeight: "180px",
        borderRadius: "12px",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(30%) contrast(1.08)",
          transition: `opacity ${M_DUR} ${M_CURVE}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: C.a900,
          opacity: hovered ? 0.78 : 0.68,
          transition: `opacity ${M_DUR} ${M_CURVE}`,
        }}
      />
      <div
        style={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          paddingTop: "24px",
          paddingBottom: "24px",
          paddingLeft: "24px",
          paddingRight: "24px",
        }}
      >
        <h3
          style={{
            fontFamily: F,
            fontSize: "var(--text-body)",
            fontWeight: 600,
            lineHeight: "var(--line-height-body)",
            color: C.white,
            marginBottom: "6px",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: F,
            fontSize: "var(--text-caption)",
            lineHeight: "1.5",
            color: C.a200,
            maxWidth: "42ch",
            opacity: hovered ? 1 : 0.85,
            transition: `opacity ${M_DUR} ${M_CURVE}`,
          }}
        >
          {body}
        </p>
        <span
          style={{
            fontFamily: F,
            fontSize: "var(--text-caption)",
            fontWeight: 600,
            color: C.white,
            marginTop: "12px",
            opacity: hovered ? 1 : 0,
            transition: `opacity ${M_DUR} ${M_CURVE}`,
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span style={{ fontSize: "0.85em" }}>→</span>
        </span>
      </div>
    </div>
  );
}
