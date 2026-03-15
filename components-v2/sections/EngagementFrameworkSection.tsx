"use client";

import { useState } from "react";
import Image from "next/image";
import { useScrollReveal } from "@/components-v2/foundation/useScrollReveal";

/* Bluish-purple accent — per Figma DeliveryModelSection hover interactions */
const EF_ACCENT = "#5B6CFF";
const EF_HEADLINE_DEFAULT = "#0F172A";

// ─── Fallback stage data (matches Figma ENGAGEMENT_STAGES) ──────────────────
const STAGES_FALLBACK = [
  {
    number: "01",
    title: "Diagnose the real challenge.",
    description:
      "We begin by understanding the structural realities shaping your organization — market dynamics, operational constraints, governance structures, and growth ambitions.",
    image: "/images/framework/stage-1.jpg",
  },
  {
    number: "02",
    title: "Design a strategy built for execution.",
    description:
      "Our advisory teams develop integrated strategies spanning finance, technology, operations, and governance to position institutions for sustainable growth.",
    image: "/images/framework/stage-2.jpg",
  },
  {
    number: "03",
    title: "Turn strategy into transformation.",
    description:
      "We work alongside leadership teams to implement transformation programs, ensuring strategies translate into operational outcomes.",
    image: "/images/framework/stage-3.jpg",
  },
  {
    number: "04",
    title: "Build institutions that endure.",
    description:
      "Our role extends beyond implementation, supporting governance, capability development, and institutional resilience for long-term success.",
    image: "/images/framework/stage-4.jpg",
  },
];

// ─── Props ───────────────────────────────────────────────────────────────────
interface EngagementFrameworkSectionProps {
  phases?: { label: string; subtitle: string; body: string }[];
}

export default function EngagementFrameworkSection({
  phases,
}: EngagementFrameworkSectionProps) {
  const [headerRef, headerStyle] = useScrollReveal();

  // Merge CMS delivery_phase data with fallback
  const stages =
    phases && phases.length > 0
      ? STAGES_FALLBACK.map((fallback, i) => {
          const cms = phases[i];
          return cms
            ? {
                ...fallback,
                number: cms.label.replace(/\D/g, "").padStart(2, "0") || fallback.number,
                title: cms.subtitle,
                description: cms.body,
              }
            : fallback;
        })
      : STAGES_FALLBACK;

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "#F8FAFC" }}>
      {/* Subtle grid texture overlay — per Figma DeliveryModelSection */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(27, 58, 92, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(27, 58, 92, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="layout-container relative py-12 md:py-16 lg:py-24 xl:py-30">
        <div ref={headerRef} style={headerStyle} className="max-w-180">
          <p className="text-overline font-semibold uppercase tracking-widest text-accent-primary">
            Engagement Framework
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-text-primary lg:text-4xl">
            How we partner with institutions to deliver transformation.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-text-secondary lg:text-lg" style={{ maxWidth: "720px" }}>
            Every engagement follows a disciplined advisory framework designed to
            clarify complex challenges, design strategic pathways, and deliver
            measurable institutional outcomes.
          </p>
        </div>

        {/* Timeline + stage rows */}
        <div className="relative mt-12 md:mt-16 lg:mt-20">
          {stages.map((stage, i) => (
            <EngagementStageRow
              key={stage.number}
              stage={stage}
              index={i}
              isLast={i === stages.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Stage Row — timeline dot/line on left, 3-col grid: image | text | arrow
// Matches Figma DeliveryModelSection > EngagementStageRow exactly.
// ═══════════════════════════════════════════════════════════════════════════════

function EngagementStageRow({
  stage,
  index,
  isLast,
}: {
  stage: (typeof STAGES_FALLBACK)[number];
  index: number;
  isLast: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [rowRef, rowStyle] = useScrollReveal(index);

  return (
    <div ref={rowRef} style={rowStyle}>
      {/* Mobile rendering */}
      <div className="mb-12 border-b border-neutral-200 pb-12 last:mb-0 last:border-b-0 last:pb-0 md:hidden">
        <div className="relative mb-5 h-37.5 w-full max-w-60 overflow-hidden rounded-lg">
          <Image
            src={stage.image}
            alt={stage.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: EF_ACCENT }}>
          Stage {stage.number}
        </p>

        <h3
          className="mt-2 text-[32px] font-bold leading-[1.1]"
          style={{ color: EF_HEADLINE_DEFAULT }}
        >
          {stage.title}
        </h3>

        <p className="mt-3 max-w-160 text-base leading-relaxed text-text-secondary">
          {stage.description}
        </p>
      </div>

      {/* Tablet and desktop rendering */}
      <div
        className="relative hidden pl-10 md:block lg:pl-12"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* ── Timeline spine: dot + connector line ── */}
        <div className="pointer-events-none absolute left-0 top-0 flex h-full w-3 flex-col items-center">
          {/* Dot */}
          <div
            className="mt-11 h-3 w-3 shrink-0 rounded-full"
            style={{
              backgroundColor: hovered ? EF_ACCENT : "var(--a700)",
              boxShadow: hovered
                ? "0 0 0 4px rgba(91, 108, 255, 0.15)"
                : "0 0 0 4px transparent",
              transition: "background-color 250ms cubic-bezier(0.22,1,0.36,1), box-shadow 250ms cubic-bezier(0.22,1,0.36,1)",
            }}
          />
          {/* Connector line */}
          {!isLast && (
            <div className="mt-2 w-0.5 grow bg-neutral-200" />
          )}
        </div>

        {/* ── Row content: 3-col editorial grid (image | text | arrow) ── */}
        <div
          className="grid grid-cols-1 items-center gap-6 rounded-lg px-6 py-8 sm:grid-cols-[160px_1fr_80px] sm:gap-8 lg:grid-cols-[240px_1fr_120px] lg:gap-12"
          style={{
            cursor: "pointer",
            backgroundColor: hovered ? "rgba(91, 108, 255, 0.05)" : "transparent",
            transition: "background-color 250ms cubic-bezier(0.22,1,0.36,1)",
            borderBottom: isLast ? "none" : "1px solid var(--n200, #e5e7eb)",
          }}
        >
          {/* Column 1: Image */}
          <div className="shrink-0">
            <div className="relative overflow-hidden rounded-lg" style={{ height: "150px" }}>
              <Image
                src={stage.image}
                alt={stage.title}
                fill
                sizes="(max-width: 640px) 100vw, 240px"
                className="object-cover"
                style={{
                  filter: "grayscale(20%) contrast(1.05)",
                }}
              />
            </div>
          </div>

          {/* Column 2: Text */}
          <div className="min-w-0">
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: EF_ACCENT }}
            >
              Stage {stage.number}
            </p>
            <h3
              className="mt-3 text-[32px] font-bold leading-[1.05] sm:text-4xl lg:text-[56px]"
              style={{
                color: hovered ? EF_ACCENT : EF_HEADLINE_DEFAULT,
                transition: "color 250ms cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              {stage.title}
            </h3>
            <p className="mt-4 max-w-160 text-base leading-relaxed text-text-secondary lg:text-lg">
              {stage.description}
            </p>
          </div>

          {/* Column 3: Arrow */}
          <div className="hidden shrink-0 items-center justify-center sm:flex">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              style={{
                transform: hovered
                  ? "scale(1.15) translateX(8px)"
                  : "scale(1) translateX(0)",
                transition: "transform 250ms cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <path
                d="M10 24h28M30 14l10 10-10 10"
                stroke={EF_ACCENT}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
