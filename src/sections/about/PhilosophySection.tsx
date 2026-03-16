"use client";

import { useState } from "react";
import Link from "next/link";
import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";

const GRID_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 0H0v60' fill='none' stroke='%23ffffff' stroke-opacity='0.03' stroke-width='0.5'/%3E%3C/svg%3E\")";

const PRIDE_PRINCIPLES = [
  {
    letter: "P",
    name: "Precision",
    body:
      "Every analysis is structured. Every recommendation is quantified. Every deliverable is calibrated to the specific context of the engagement.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVjaXNpb24lMjBhbmFseXRpY3MlMjBkYXRhJTIwdmlzdWFsaXphdGlvbnxlbnwxfHx8fDE3NzI2NjM4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    letter: "R",
    name: "Resilience",
    body:
      "Operating across complex and volatile environments demands adaptive methodology. We build frameworks that endure institutional, regulatory, and market disruption.",
    image:
      "https://images.unsplash.com/photo-1552423762-335fee0fb833?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWdodGhvdXNlJTIwb2NlYW4lMjBzdG9ybSUyMGRyYW1hdGljfGVufDF8fHx8MTc3MjY2NTM5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    letter: "I",
    name: "Integrity",
    body:
      "Institutional trust is earned through consistent transparency, analytical honesty, and the willingness to deliver difficult findings with clarity.",
    image:
      "https://images.unsplash.com/photo-1609367946896-35a3e6ccf772?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0aXR1dGlvbmFsJTIwYXJjaGl0ZWN0dXJlJTIwY29sdW1ucyUyMG1hcmJsZXxlbnwxfHx8fDE3NzI2NjUzOTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    letter: "D",
    name: "Discipline",
    body:
      "Methodological rigor governs every workstream. Timelines are commitments, not aspirations. Governance is embedded, not appended.",
    image:
      "https://images.unsplash.com/photo-1765872396322-2d0597b4b9fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxkaXNjaXBsaW5lJTIwc3RydWN0dXJlJTIwbWluaW1hbGlzdCUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzI2NjM4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    letter: "E",
    name: "Execution",
    body:
      "Strategy without implementation is academic. We operate at the intersection of advisory insight and delivery accountability.",
    image:
      "https://images.unsplash.com/photo-1758691737182-d42aefd6dee8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxleGVjdXRpb24lMjBzdHJhdGVneSUyMGJvYXJkcm9vbSUyMGNvcnBvcmF0ZXxlbnwxfHx8fDE3NzI2NjM4Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

const PHIL_INSIGHTS_IMG =
  "https://images.unsplash.com/photo-1718217213243-432ae99bfcdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGF0bW9zcGhlcmljJTIwcmVzZWFyY2glMjBsaWJyYXJ5JTIwZGFya3xlbnwxfHx8fDE3NzI2NjUzOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export default function PhilosophySection() {
  const masterCols = useResponsiveValue({ desktop: "7fr 5fr", tablet: "1fr", mobile: "1fr" });
  const leftRow1Cols = useResponsiveValue({ desktop: "7fr 5fr", tablet: "1fr 1fr", mobile: "1fr" });
  const leftRow2Cols = useResponsiveValue({ desktop: "5fr 7fr", tablet: "1fr 1fr", mobile: "1fr" });
  const gap = useResponsiveValue({ desktop: "32px", tablet: "24px", mobile: "20px" });
  const headerGap = useResponsiveValue({ desktop: "56px", tablet: "40px", mobile: "32px" });

  return (
    <SectionWrapper
      background="#0F172A"
      style={{ backgroundImage: GRID_TEXTURE, backgroundRepeat: "repeat" }}
    >
      <div style={{ display: "grid", gridTemplateColumns: masterCols, gap }}>
        <div>
          <SectionHeader
            overline="Our Philosophy"
            title="Built for Execution."
            description="PRIDE is not a slogan. It is an operating principle - the behavioral architecture that governs how we engage, deliver, and sustain client outcomes."
            showAccentRule={false}
            maxWidth="60ch"
            overlineColor="#A5B4FC"
            titleColor="#FFFFFF"
            descriptionColor="#CBD5F5"
          />

          <div style={{ display: "grid", gridTemplateColumns: leftRow1Cols, gap, marginTop: headerGap }}>
            <PrideCard card={PRIDE_PRINCIPLES[0]} />
            <PrideCard card={PRIDE_PRINCIPLES[1]} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: leftRow2Cols, gap, marginTop: "32px" }}>
            <PrideCard card={PRIDE_PRINCIPLES[2]} />
            <PrideCard card={PRIDE_PRINCIPLES[3]} />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap }}>
          <ExecutionFeatureCard card={PRIDE_PRINCIPLES[4]} />
          <InsightsPlaceholderCard />
        </div>
      </div>
    </SectionWrapper>
  );
}

function PrideCard({
  card,
}: {
  card: { letter: string; name: string; body: string; image: string };
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        minHeight: "420px",
        height: "460px",
        cursor: "pointer",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 24px 60px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.2)",
        transition: "transform 350ms ease, box-shadow 350ms ease",
      }}
    >
      <img
        src={card.image}
        alt={card.name}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 350ms ease",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(15,23,42,0.15) 0%, rgba(15,23,42,0.85) 100%)",
        }}
      />
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "16px",
          left: "28px",
          fontSize: "120px",
          fontWeight: 700,
          lineHeight: "1",
          color: "rgba(255,255,255,0.08)",
          pointerEvents: "none",
        }}
      >
        {card.letter}
      </span>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "28px" }}>
        <h3 style={{ fontSize: "1.375rem", fontWeight: 600, color: "#FFFFFF", marginBottom: "8px" }}>
          {card.name}
        </h3>
        <p style={{ fontSize: "0.875rem", lineHeight: "1.6", color: "#A5B4FC" }}>{card.body}</p>
      </div>
    </div>
  );
}

function ExecutionFeatureCard({
  card,
}: {
  card: { letter: string; name: string; body: string; image: string };
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        minHeight: "620px",
        height: "680px",
        cursor: "pointer",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 24px 60px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.2)",
        transition: "transform 350ms ease, box-shadow 350ms ease",
      }}
    >
      <img
        src={card.image}
        alt={card.name}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 350ms ease",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.1))",
        }}
      />
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "24px",
          left: "36px",
          fontSize: "120px",
          fontWeight: 700,
          lineHeight: "1",
          color: "rgba(255,255,255,0.08)",
          pointerEvents: "none",
        }}
      >
        {card.letter}
      </span>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "36px" }}>
        <h3 style={{ fontSize: "2rem", fontWeight: 600, color: "#FFFFFF", marginBottom: "16px" }}>
          {card.name}
        </h3>
        <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "#A5B4FC", maxWidth: "48ch" }}>
          {card.body}
        </p>
      </div>
    </div>
  );
}

function InsightsPlaceholderCard() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href="/insights" className="block" style={{ textDecoration: "none" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          borderRadius: "12px",
          overflow: "hidden",
          minHeight: "300px",
          cursor: "pointer",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hovered ? "0 24px 60px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.2)",
          transition: "transform 350ms ease, box-shadow 350ms ease",
          backgroundColor: "#1E293B",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${PHIL_INSIGHTS_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: hovered ? 0.35 : 0.25,
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 350ms ease, opacity 350ms ease",
          }}
        />

        <div style={{ position: "relative", zIndex: 2, padding: "28px" }}>
          <span
            style={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#A5B4FC",
              display: "block",
              marginBottom: "12px",
            }}
          >
            Strategic Insights
          </span>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#FFFFFF", marginBottom: "8px" }}>
            Strategic Insights & Research
          </h3>
          <p style={{ fontSize: "0.875rem", lineHeight: "1.55", color: "#A5B4FC", maxWidth: "40ch" }}>
            This space will host future reports, advisory insights, and institutional research publications.
          </p>
          <span
            style={{
              marginTop: "16px",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "0.8125rem",
              fontWeight: 500,
              color: "#A5B4FC",
              opacity: hovered ? 1 : 0.7,
              transition: "opacity 250ms ease",
            }}
          >
            Read insight
            <span
              aria-hidden="true"
              style={{
                transform: hovered ? "translateX(3px)" : "translateX(0)",
                transition: "transform 250ms ease",
              }}
            >
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
