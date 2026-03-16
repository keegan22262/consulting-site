"use client";

import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";

const DELIVERY_PHASES = [
  {
    title: "Discover (Fast Diagnostic)",
    description: "Diagnostic summary, opportunity map, quick wins, and a 30/60/90 plan.",
  },
  {
    title: "Design (Co-create the Plan)",
    description: "Roadmap, business case, KPI dashboard, and governance model.",
  },
  {
    title: "Deliver (Implementation Sprints)",
    description: "Execution in sprints with owners, weekly reviews, and shipped deliverables.",
  },
  {
    title: "Sustain (Capability Transfer)",
    description: "Playbooks, SOPs, training, and handover pack so results last.",
  },
];

export default function DeliveryArchitectureSection() {
  const numberWidth = useResponsiveValue({ desktop: "48px", tablet: "48px", mobile: "auto" });
  const gridCols = useResponsiveValue({ desktop: `${numberWidth} 1fr`, tablet: `${numberWidth} 1fr`, mobile: "1fr" });

  return (
    <SectionWrapper background="white">
      <SectionHeader
        overline="Delivery Architecture"
        title="How the Firm Delivers."
        description="A four-phase framework designed for speed, governance, and lasting capability transfer."
        showAccentRule={false}
        maxWidth="65ch"
      />

      <div style={{ marginTop: "48px" }}>
        {DELIVERY_PHASES.map((phase, index) => (
          <div
            key={phase.title}
            style={{
              display: "grid",
              gridTemplateColumns: gridCols,
              gap: "16px",
              alignItems: "baseline",
              padding: "24px 0",
              borderBottom: index === DELIVERY_PHASES.length - 1 ? "0" : "1px solid #E2E8F0",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "0.6875rem",
                fontWeight: 600,
                color: "#1B3A5C",
                letterSpacing: "0.02em",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 style={{ fontSize: "var(--text-body)", fontWeight: 600, color: "#0F172A" }}>
                {phase.title}
              </h3>
              <p
                style={{
                  marginTop: "4px",
                  fontSize: "var(--text-caption)",
                  lineHeight: "1.55",
                  color: "#64748B",
                  maxWidth: "56ch",
                }}
              >
                {phase.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
