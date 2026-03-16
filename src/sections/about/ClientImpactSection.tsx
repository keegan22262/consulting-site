"use client";

import { useState } from "react";
import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";

const CLIENT_IMPACT_ENGAGEMENTS = [
  {
    id: "public-sector",
    industry: "Public Sector",
    title: "Digital Government Modernization",
    description: "Supporting a national agency in redesigning service delivery systems and digital infrastructure.",
    image:
      "https://images.unsplash.com/photo-1649855815366-290064ca5602?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwaW5zdGl0dXRpb24lMjBkaWdpdGFsJTIwbW9kZXJuaXphdGlvbnxlbnwxfHx8fDE3NzMzMjc0NDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    imageAlt: "Government institution digital modernization - public sector transformation",
  },
  {
    id: "infrastructure",
    industry: "Infrastructure",
    title: "National Infrastructure Investment Strategy",
    description: "Advising stakeholders on long-term infrastructure planning and investment prioritization.",
    image:
      "https://images.unsplash.com/photo-1762944083245-2ae7b80ce5f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmZyYXN0cnVjdHVyZSUyMGRldmVsb3BtZW50JTIwcGxhbm5pbmclMjBhZXJpYWx8ZW58MXx8fHwxNzczMzI3NDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    imageAlt: "Infrastructure development and investment planning - aerial view",
  },
  {
    id: "enterprise",
    industry: "Enterprise",
    title: "Enterprise AI Readiness Transformation",
    description: "Helping organizations assess data, systems, and governance readiness for AI adoption.",
    image:
      "https://images.unsplash.com/photo-1739054730144-7d1b922d0ede?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwZGF0YSUyMGNlbnRlciUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzczMzI3NDUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    imageAlt: "AI and technology transformation - enterprise data systems",
  },
];

export default function ClientImpactSection() {
  const gridCols = useResponsiveValue({ desktop: "repeat(3, 1fr)", tablet: "repeat(2, 1fr)", mobile: "1fr" });
  const gap = useResponsiveValue({ desktop: "28px", tablet: "24px", mobile: "20px" });
  const cardHeight = useResponsiveValue({ desktop: "420px", tablet: "380px", mobile: "340px" });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <SectionWrapper background="white" padV={{ desktop: 96, tablet: 72, mobile: 56 }}>
      <SectionHeader
        overline="Client Impact"
        title="Client Impact."
        description="Our advisory engagements help institutions navigate complex challenges, deliver transformation at scale, and create lasting strategic value."
        showAccentRule={false}
        maxWidth="60ch"
      />

      <div
        style={{
          marginTop: "56px",
          display: "grid",
          gridTemplateColumns: gridCols,
          gap,
        }}
      >
        {CLIENT_IMPACT_ENGAGEMENTS.map((eng) => {
          const isHovered = hoveredCard === eng.id;
          return (
            <div
              key={eng.id}
              onMouseEnter={() => setHoveredCard(eng.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                position: "relative",
                borderRadius: "12px",
                overflow: "hidden",
                cursor: "pointer",
                height: cardHeight,
              }}
            >
              <img
                src={eng.image}
                alt={eng.imageAlt}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: isHovered
                    ? "linear-gradient(to top, rgba(10, 10, 10, 0.88) 0%, rgba(10, 10, 10, 0.55) 50%, rgba(10, 10, 10, 0.3) 100%)"
                    : "linear-gradient(to top, rgba(10, 10, 10, 0.8) 0%, rgba(10, 10, 10, 0.4) 50%, rgba(10, 10, 10, 0.15) 100%)",
                  transition: "background 200ms ease",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "24px",
                }}
              >
                <span
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "#F59E0B",
                    marginBottom: "12px",
                  }}
                >
                  {eng.industry}
                </span>
                <h3 style={{ fontSize: "1.1875rem", fontWeight: 600, color: "#FFFFFF", marginBottom: "8px" }}>
                  {eng.title}
                </h3>
                <p style={{ fontSize: "0.8125rem", lineHeight: "1.6", color: "rgba(255, 255, 255, 0.78)", maxWidth: "36ch" }}>
                  {eng.description}
                </p>
                <span
                  style={{
                    marginTop: "16px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    color: isHovered ? "#F59E0B" : "rgba(255, 255, 255, 0.9)",
                    letterSpacing: "0.02em",
                    transition: "color 200ms ease",
                  }}
                >
                  Explore Case
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12H19M19 12L13 6M19 12L13 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
