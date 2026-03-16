"use client";

import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";

export default function CoverageProgressiveIntelligenceSection() {
  const isDesktop = useResponsiveValue({ desktop: true, tablet: false, mobile: false });

  const timeline = [
    {
      label: "Market Shift",
      body: "External change triggers recalibration — regulatory evolution, technology disruption, competitive entry, or macroeconomic pressure.",
    },
    {
      label: "Strategic Response",
      body: "Advisory frameworks activate cross-functional assessment — mapping impact on client operations, governance, and growth trajectory.",
    },
    {
      label: "Service Deployment",
      body: "Relevant capabilities mobilize in integrated formation — strategy, technology, finance, and people disciplines align to client need.",
    },
    {
      label: "Industry Impact",
      body: "Sector-specific intelligence compounds — each engagement informs coverage depth, staffing models, and methodology refinement.",
    },
  ];

  return (
    <SectionWrapper background="neutral50">
      <div className="grid items-start gap-8 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div>
          <span
            style={{
              fontSize: "var(--text-caption)",
              fontWeight: 600,
              color: "var(--a700)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              display: "block",
              marginBottom: "6px",
            }}
          >
            Adaptive Coverage
          </span>
          <h2
            style={{
              fontSize: "var(--text-h2)",
              fontWeight: 600,
              lineHeight: "var(--line-height-h2)",
              color: "var(--n900)",
            }}
          >
            How Our Coverage Evolves
          </h2>
          <div style={{ width: "48px", height: "2px", backgroundColor: "var(--a700)", marginTop: "24px", marginBottom: "24px" }} />
          <p style={{ fontSize: "var(--text-body)", lineHeight: "var(--line-height-body)", color: "var(--n700)", maxWidth: "50ch" }}>
            Coverage is not static. As industries evolve and new challenges emerge, our service deployment adapts — informed by cross-sector intelligence and engagement-level learning.
          </p>
          <p style={{ fontSize: "var(--text-body)", lineHeight: "var(--line-height-body)", color: "var(--n700)", marginTop: "16px", maxWidth: "50ch" }}>
            Each engagement generates institutional knowledge that strengthens subsequent advisory quality — creating compounding returns on sector expertise.
          </p>
        </div>

        <div style={{ position: "relative", paddingLeft: "28px" }}>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "6px",
              top: "6px",
              bottom: "6px",
              width: "1px",
              backgroundColor: "var(--n200)",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {timeline.map((step, index) => (
              <div key={step.label} style={{ display: "grid", gridTemplateColumns: "16px 1fr", gap: "20px" }}>
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "2px",
                    backgroundColor: index === 0 ? "var(--a700)" : "transparent",
                    border: "2px solid var(--a700)",
                    marginTop: "6px",
                  }}
                />
                <div>
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      color: "var(--n400)",
                      letterSpacing: "0.02em",
                      fontVariantNumeric: "tabular-nums",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 style={{ fontSize: "var(--text-body)", fontWeight: 600, color: "var(--n900)" }}>{step.label}</h3>
                  <p style={{ fontSize: "var(--text-caption)", lineHeight: "1.55", color: "var(--n600)", marginTop: "6px", maxWidth: "48ch" }}>
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
