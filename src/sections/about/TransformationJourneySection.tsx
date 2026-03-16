"use client";

import { useState } from "react";
import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";

const JOURNEY_STAGES = [
  {
    id: "challenge",
    title: "Challenge",
    description:
      "We begin by understanding the structural realities shaping your organization, from market dynamics to operational constraints.",
    image:
      "https://images.unsplash.com/photo-1656646424292-cf207f3f1749?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGVjdXRpdmUlMjBkaWFnbm9zdGljJTIwbWVldGluZyUyMGJvYXJkcm9vbXxlbnwxfHx8fDE3NzMzMjQ5OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    imageAlt: "Executive diagnostic meeting in a boardroom",
  },
  {
    id: "strategy",
    title: "Strategy",
    description:
      "Our advisory teams design integrated strategies aligned with institutional goals and long-term growth ambitions.",
    image:
      "https://images.unsplash.com/photo-1765438868883-43efce4fd145?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhdGVneSUyMHBsYW5uaW5nJTIwd2hpdGVib2FyZCUyMHNlc3Npb258ZW58MXx8fHwxNzczMzI0OTkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    imageAlt: "Strategy planning session with whiteboard",
  },
  {
    id: "execution",
    title: "Execution",
    description:
      "We work alongside leadership teams to implement transformation programs and ensure strategies translate into operational outcomes.",
    image:
      "https://images.unsplash.com/photo-1565688527174-775059ac429c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjB0ZWFtJTIwb3BlcmF0aW9uYWwlMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc3MzMyNDk5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    imageAlt: "Corporate team collaborating on operational implementation",
  },
  {
    id: "impact",
    title: "Impact",
    description:
      "Our approach delivers measurable improvements in institutional resilience, performance, and long-term value creation.",
    image:
      "https://images.unsplash.com/photo-1740313498441-68da0e01df37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjZXNzZnVsJTIwYnVzaW5lc3MlMjB0cmFuc2Zvcm1hdGlvbiUyMGFjaGlldmVtZW50fGVufDF8fHx8MTc3MzMyNDk5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    imageAlt: "Successful organizational transformation and achievement",
  },
];

export default function TransformationJourneySection() {
  const gridColumns = useResponsiveValue({
    desktop: "repeat(4, 1fr)",
    tablet: "repeat(2, 1fr)",
    mobile: "1fr",
  });
  const isMobile = useResponsiveValue({ desktop: false, tablet: false, mobile: true });
  const isTablet = useResponsiveValue({ desktop: false, tablet: true, mobile: false });
  const gap = useResponsiveValue({ desktop: "0", tablet: "24px", mobile: "32px" });
  const imageHeight = useResponsiveValue({ desktop: "160px", tablet: "160px", mobile: "180px" });
  const padding = useResponsiveValue({ desktop: "20px", tablet: "20px", mobile: "20px" });
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);

  return (
    <SectionWrapper background="white" padV={{ desktop: 96, tablet: 72, mobile: 56 }}>
      <SectionHeader
        overline="Methodology"
        title="The Transformation Journey"
        description="We partner with institutions to diagnose challenges, design strategic pathways, execute transformation programs, and deliver measurable long-term impact."
        showAccentRule={false}
        maxWidth="60ch"
      />

      <div
        style={{
          marginTop: "56px",
          display: "grid",
          gridTemplateColumns: gridColumns,
          gap,
          position: "relative",
        }}
      >
        {JOURNEY_STAGES.map((stage, index) => {
          const isHovered = hoveredStage === stage.id;
          const isLast = index === JOURNEY_STAGES.length - 1;

          return (
            <div key={stage.id} style={{ position: "relative" }}>
              <div
                onMouseEnter={() => setHoveredStage(stage.id)}
                onMouseLeave={() => setHoveredStage(null)}
                style={{
                  backgroundColor: isHovered ? "#FFFFFF" : "#F8FAFC",
                  borderRadius: "12px",
                  border: `1px solid ${isHovered ? "#93C5FD" : "#E2E8F0"}`,
                  overflow: "hidden",
                  boxShadow: isHovered
                    ? "0 4px 20px rgba(0,0,0,0.08)"
                    : "0 1px 3px rgba(0,0,0,0.03)",
                  transition: "background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease",
                  marginLeft: index > 0 ? "-1px" : "0",
                }}
              >
                <div style={{ position: "relative", width: "100%", height: imageHeight }}>
                  <img
                    src={stage.image}
                    alt={stage.imageAlt}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      display: "block",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      width: "28px",
                      height: "28px",
                      borderRadius: "999px",
                      backgroundColor: "#1B3A5C",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FFFFFF",
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
                <div style={{ padding }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "1.0625rem",
                      fontWeight: 600,
                      lineHeight: "1.3",
                      color: isHovered ? "#1B3A5C" : "#0F172A",
                      transition: "color 200ms ease",
                    }}
                  >
                    {stage.title}
                  </h3>
                  <p
                    style={{
                      marginTop: "8px",
                      fontFamily: "var(--font-primary)",
                      fontSize: "0.8125rem",
                      lineHeight: "1.6",
                      color: "#475569",
                    }}
                  >
                    {stage.description}
                  </p>
                </div>
              </div>

              {!isLast && !isMobile && (!isTablet || index % 2 === 0) ? (
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "-12px",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12H19M19 12L13 6M19 12L13 18"
                      stroke="#1B3A5C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              ) : null}

              {!isLast && isMobile ? (
                <div
                  aria-hidden="true"
                  style={{ display: "flex", justifyContent: "center", marginTop: "8px" }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 5V19M12 19L6 13M12 19L18 13"
                      stroke="#1B3A5C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
