"use client";

import { useState } from "react";

const PHASES = [
  {
    number: "01",
    name: "Discover",
    subtitle: "Fast Diagnostic",
    description:
      "Diagnostic summary, opportunity map, quick wins, and a 30/60/90 plan.",
  },
  {
    number: "02",
    name: "Design",
    subtitle: "Co-create the Plan",
    description:
      "Roadmap, business case, KPI dashboard, and governance model.",
  },
  {
    number: "03",
    name: "Deliver",
    subtitle: "Implementation Sprints",
    description:
      "Execution in sprints with owners, weekly reviews, and shipped deliverables.",
  },
  {
    number: "04",
    name: "Sustain",
    subtitle: "Capability Transfer",
    description:
      "Playbooks, SOPs, training, and handover pack so results last.",
  },
];

function PhaseCard({
  phase,
}: {
  phase: (typeof PHASES)[number];
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-xl px-6 py-8 text-center transition-all duration-300"
      style={{
        background: hovered
          ? "rgba(255,255,255,0.1)"
          : "rgba(255,255,255,0.06)",
        border: hovered
          ? "1px solid rgba(125,160,202,0.3)"
          : "1px solid rgba(125,160,202,0.15)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <div
        className="text-[36px]"
        style={{
          fontFamily: "var(--font-playfair), 'Playfair Display', serif",
          fontWeight: 600,
          color: "#5483B3",
        }}
      >
        {phase.number}
      </div>
      <h3
        className="text-[18px] font-semibold text-white mt-3"
        style={{
          fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
        }}
      >
        {phase.name}
      </h3>
      <p
        className="text-[13px] leading-[1.6] mt-2"
        style={{
          fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
          color: "rgba(255,255,255,0.55)",
        }}
      >
        {phase.description}
      </p>
    </div>
  );
}

export default function DeliveryArchitectureSection() {
  return (
    <section className="py-20" style={{ backgroundColor: "#052659" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center">
          <span
            className="block text-[12px] uppercase tracking-[4px] mb-3"
            style={{
              fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
              color: "#7DA0CA",
            }}
          >
            METHODOLOGY
          </span>
          <h2
            className="text-[36px] text-white"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              fontWeight: 400,
            }}
          >
            How the Firm Delivers.
          </h2>
          <p
            className="text-[15px] max-w-[560px] mx-auto mt-3 mb-12"
            style={{
              fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            A four-phase framework designed for speed, governance, and lasting
            capability transfer.
          </p>
        </div>

        {/* Desktop: 4 cards with arrows */}
        <div className="hidden md:flex items-stretch gap-0">
          {PHASES.map((phase, i) => (
            <div key={phase.number} className="flex items-center flex-1">
              <div className="flex-1">
                <PhaseCard phase={phase} />
              </div>
              {i < PHASES.length - 1 && (
                <div className="flex-shrink-0 px-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M5 12H19M19 12L13 6M19 12L13 18"
                      stroke="#5483B3"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: stacked */}
        <div className="flex flex-col gap-4 md:hidden">
          {PHASES.map((phase) => (
            <PhaseCard key={phase.number} phase={phase} />
          ))}
        </div>
      </div>
    </section>
  );
}
