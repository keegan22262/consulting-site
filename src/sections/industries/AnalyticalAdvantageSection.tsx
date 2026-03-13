"use client";

import { r } from "@/lib/breakpoints";
import { ANALYTICAL_BLOCKS, BORDER_RADIUS, C, F, MAX_WIDTH } from "./data";

export default function AnalyticalAdvantageSection() {
  return (
    <section style={{ backgroundColor: C.n50 }}>
      <div
        style={{
          maxWidth: MAX_WIDTH,
          margin: "0 auto",
          paddingTop: r("96px", "72px", "56px"),
          paddingBottom: r("96px", "72px", "56px"),
          paddingLeft: r("32px", "32px", "24px"),
          paddingRight: r("32px", "32px", "24px"),
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
          Analytical Advantage
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
          Patterns across markets.
        </h2>
        <p
          style={{
            fontFamily: F,
            fontSize: "var(--text-body-lg)",
            lineHeight: "1.65",
            color: C.n600,
            maxWidth: "62ch",
            marginTop: "12px",
          }}
        >
          Multi-sector presence generates compounding intelligence. Insights from one industry&apos;s
          regulatory, operational, or digital landscape systematically inform advisory quality across all
          others.
        </p>

        <div style={{ marginTop: r("64px", "48px", "40px") }}>
          {ANALYTICAL_BLOCKS.map((block, i) => (
            <AnalyticalEditorialBlock key={block.headline} {...block} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AnalyticalEditorialBlock({
  headline,
  body,
  image,
  index,
}: {
  headline: string;
  body: string;
  image: string;
  index: number;
}) {
  const isMobile = r(false, false, true);
  const imageOnRight = index % 2 === 0;

  const imageBlock = (
    <div
      style={{
        position: "relative",
        minHeight: isMobile ? "220px" : "320px",
        borderRadius: BORDER_RADIUS,
        overflow: "hidden",
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
          filter: "grayscale(25%) contrast(1.05)",
        }}
      />
    </div>
  );

  const textBlock = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: isMobile ? "0" : "16px",
        paddingBottom: isMobile ? "0" : "16px",
      }}
    >
      <span
        style={{
          fontFamily: F,
          fontSize: "0.6875rem",
          fontWeight: 600,
          color: C.n400,
          letterSpacing: "0.02em",
          fontVariantNumeric: "tabular-nums",
          display: "block",
          marginBottom: "12px",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3
        style={{
          fontFamily: F,
          fontSize: r("var(--text-h3)", "var(--text-body-lg)", "var(--text-body-lg)"),
          fontWeight: 600,
          lineHeight: r("var(--line-height-h3)", "1.3", "1.3"),
          color: C.n900,
        }}
      >
        {headline}
      </h3>
      <p
        style={{
          fontFamily: F,
          fontSize: "var(--text-body)",
          lineHeight: "var(--line-height-body)",
          color: C.n600,
          marginTop: "12px",
          maxWidth: "50ch",
        }}
      >
        {body}
      </p>
    </div>
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: r("64px", "40px", "24px"),
        marginBottom: index < ANALYTICAL_BLOCKS.length - 1 ? r("80px", "56px", "40px") : "0",
      }}
    >
      {isMobile || !imageOnRight ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </div>
  );
}
