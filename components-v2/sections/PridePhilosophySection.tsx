"use client";

// ═══════════════════════════════════════════════════════════════════════════════
// PridePhilosophySection — "Trust Reinforcement" from Figma reference.
// Navy background (#0F172A) + subtle grid texture.
// Master 2-column grid: LEFT (header + 2×2 PRIDE cards) + RIGHT (Execution hero card + Insights placeholder).
// ═══════════════════════════════════════════════════════════════════════════════

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/components-v2/foundation/useScrollReveal";

// ─── PRIDE data ──────────────────────────────────────────────────────────────
const PRIDE_FALLBACK = [
  {
    letter: "P",
    title: "Precision",
    body: "Every analysis is structured. Every recommendation is quantified. Every deliverable is calibrated to the specific context of the engagement.",
    image: "/images/pride/pride-p.jpg",
  },
  {
    letter: "R",
    title: "Resilience",
    body: "Operating across complex and volatile environments demands adaptive methodology. We build frameworks that endure institutional, regulatory, and market disruption.",
    image: "/images/pride/pride-r.jpg",
  },
  {
    letter: "I",
    title: "Integrity",
    body: "Institutional trust is earned through consistent transparency, analytical honesty, and the willingness to deliver difficult findings with clarity.",
    image: "/images/pride/pride-i.jpg",
  },
  {
    letter: "D",
    title: "Discipline",
    body: "Methodological rigor governs every workstream. Timelines are commitments, not aspirations. Governance is embedded, not appended.",
    image: "/images/pride/pride-d.jpg",
  },
  {
    letter: "E",
    title: "Execution",
    body: "Strategy without implementation is academic. We operate at the intersection of advisory insight and delivery accountability.",
    image: "/images/pride/pride-e.jpg",
  },
];

// ─── Subtle grid texture SVG ─────────────────────────────────────────────────
const GRID_TEXTURE = `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 0H0v60' fill='none' stroke='%23ffffff' stroke-opacity='0.03' stroke-width='0.5'/%3E%3C/svg%3E")`;

// ═══════════════════════════════════════════════════════════════════════════════
// Props — accepts optional CMS data
// ═══════════════════════════════════════════════════════════════════════════════
interface PridePhilosophySectionProps {
  principles?: { letter: string; title: string; body: string }[];
  latestInsight?: {
    slug: string;
    category?: string;
    title: string;
    excerpt?: string;
    image?: string;
  } | null;
}

export default function PridePhilosophySection({
  principles,
  latestInsight,
}: PridePhilosophySectionProps) {
  const [sectionRef, sectionStyle] = useScrollReveal();

  // Merge CMS data with fallback (CMS doesn't have images, fallback does)
  const cards =
    principles && principles.length > 0
      ? PRIDE_FALLBACK.map((fallback) => {
          const cms = principles.find((p) => p.letter === fallback.letter);
          return cms
            ? { ...fallback, title: cms.title, body: cms.body }
            : fallback;
        })
      : PRIDE_FALLBACK;

  // P, R, I, D go to the left 2×2 grid. E goes to the right hero card.
  const leftCards = cards.slice(0, 4);
  const executionCard = cards[4];

  return (
    <section
      className="relative overflow-hidden py-28"
      style={{
        backgroundColor: "#0F172A",
        backgroundImage: GRID_TEXTURE,
        backgroundRepeat: "repeat",
      }}
    >
      <div
        ref={sectionRef}
        className="layout-container"
        style={sectionStyle}
      >
        {/* ── Master 2-column grid ── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[7fr_5fr]">
          {/* ════════════ LEFT COLUMN ════════════ */}
          <div>
            {/* Editorial header — custom for dark bg */}
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
              Our Philosophy
            </span>
            <h2 className="mt-1.5 text-3xl font-bold text-white lg:text-4xl">
              <Link href="/about" className="cursor-pointer transition-colors hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm">
                Built for Execution.
              </Link>
            </h2>
            <p className="mt-5 max-w-[60ch] text-sm leading-relaxed text-[#CBD5F5] lg:text-base">
              PRIDE is not a slogan. It is an operating principle — the
              behavioral architecture that governs how we engage, deliver, and
              sustain client outcomes.
            </p>

            {/* ── Row 1: [Wide P] [Narrow R] — 7fr 5fr ── */}
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-[7fr_5fr]">
              <PRIDECard card={leftCards[0]} staggerIndex={1} />
              <PRIDECard card={leftCards[1]} staggerIndex={2} />
            </div>

            {/* ── Row 2: [Narrow I] [Wide D] — 5fr 7fr ── */}
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-[5fr_7fr]">
              <PRIDECard card={leftCards[2]} staggerIndex={3} />
              <PRIDECard card={leftCards[3]} staggerIndex={4} />
            </div>
          </div>

          {/* ════════════ RIGHT COLUMN ════════════ */}
          <div className="flex flex-col gap-8">
            {/* Execution hero card — tallest and most prominent */}
            <ExecutionCard card={executionCard} staggerIndex={5} />

            {/* Strategic Insights placeholder card */}
            <InsightsPlaceholderCard
              staggerIndex={6}
              insight={latestInsight ?? null}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PRIDE Card — Cinematic image with gradient overlay, large letter, hover lift
// ═══════════════════════════════════════════════════════════════════════════════

function PRIDECard({
  card,
  staggerIndex,
}: {
  card: (typeof PRIDE_FALLBACK)[number];
  staggerIndex: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [cardRef, cardStyle] = useScrollReveal(staggerIndex);

  return (
    <div ref={cardRef} style={cardStyle}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative cursor-pointer overflow-hidden rounded-xl transition-shadow duration-350"
        style={{
          minHeight: "420px",
          height: "460px",
          boxShadow: hovered
            ? "0 24px 60px rgba(0,0,0,0.4)"
            : "0 4px 20px rgba(0,0,0,0.2)",
        }}
      >
        {/* Background image */}
        <Image
          src={card.image}
          alt={card.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-350"
          style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
        />

        {/* Gradient overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,23,42,0.15) 0%, rgba(15,23,42,0.85) 100%)",
          }}
        />

        {/* Large translucent letter */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-7 top-4 text-[120px] font-bold leading-none text-white/8"
        >
          {card.letter}
        </span>

        {/* Card content */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-7">
          <h3 className="text-lg font-semibold text-white">{card.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#A5B4FC]">
            {card.body}
          </p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Execution Feature Card — Right column hero, visually dominant
// ═══════════════════════════════════════════════════════════════════════════════

function ExecutionCard({
  card,
  staggerIndex,
}: {
  card: (typeof PRIDE_FALLBACK)[number];
  staggerIndex: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [cardRef, cardStyle] = useScrollReveal(staggerIndex);

  return (
    <div ref={cardRef} style={{ ...cardStyle, flex: "1 1 0%" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative cursor-pointer overflow-hidden rounded-xl transition-shadow duration-350"
        style={{
          minHeight: "620px",
          height: "100%",
          boxShadow: hovered
            ? "0 24px 60px rgba(0,0,0,0.4)"
            : "0 4px 20px rgba(0,0,0,0.2)",
        }}
      >
        {/* Background image */}
        <Image
          src={card.image}
          alt={card.title}
          fill
          sizes="(max-width: 1024px) 100vw, 42vw"
          className="object-cover transition-transform duration-350"
          style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
        />

        {/* Dark gradient overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.1))",
          }}
        />

        {/* Large translucent letter */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-7 top-4 text-[180px] font-bold leading-none text-white/10"
        >
          {card.letter}
        </span>

        {/* Card content — bottom-aligned */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-7">
          <h3 className="text-xl font-semibold text-white">{card.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#A5B4FC]">
            {card.body}
          </p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Insights Placeholder Card — Dark tint, icon, no background image
// ═══════════════════════════════════════════════════════════════════════════════

function InsightsPlaceholderCard({
  staggerIndex,
  insight,
}: {
  staggerIndex: number;
  insight?: {
    slug: string;
    category?: string;
    title: string;
    excerpt?: string;
    image?: string;
  } | null;
}) {
  const [hovered, setHovered] = useState(false);
  const [cardRef, cardStyle] = useScrollReveal(staggerIndex);

  if (insight) {
    return (
      <div ref={cardRef} style={cardStyle}>
        <Link href={`/insights/${insight.slug}`} className="block">
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative cursor-pointer overflow-hidden rounded-xl transition-shadow duration-350"
            style={{
              minHeight: "300px",
              backgroundColor: "#1E293B",
              boxShadow: hovered
                ? "0 24px 60px rgba(0,0,0,0.4)"
                : "0 4px 20px rgba(0,0,0,0.2)",
              transform: hovered ? "translateY(-6px)" : "translateY(0)",
              transition: "transform 350ms ease, box-shadow 350ms ease",
            }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-cover bg-center transition-transform duration-350"
              style={{
                backgroundImage: `url(${insight.image ?? "/images/insights/insight-1.jpg"})`,
                opacity: hovered ? 0.35 : 0.25,
                transform: hovered ? "scale(1.05)" : "scale(1)",
              }}
            />

            <div className="relative z-10 flex h-full min-h-75 flex-col justify-end p-7">
              <span className="mb-3 block text-[11px] font-semibold uppercase tracking-widest text-[#A5B4FC]">
                {insight.category ?? "Insight"}
              </span>
              <h3 className="text-lg font-semibold text-white">{insight.title}</h3>
              <p className="mt-2 max-w-[40ch] text-sm leading-relaxed text-[#A5B4FC]">
                {insight.excerpt ?? "Read our latest perspective from active advisory engagements."}
              </p>
              <span
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#A5B4FC]"
                style={{ opacity: hovered ? 1 : 0.8, transition: "opacity 250ms ease" }}
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
      </div>
    );
  }

  return (
    <div ref={cardRef} style={cardStyle}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative cursor-pointer overflow-hidden rounded-xl transition-shadow duration-350"
        style={{
          minHeight: "300px",
          backgroundColor: "#1E293B",
          boxShadow: hovered
            ? "0 24px 60px rgba(0,0,0,0.4)"
            : "0 4px 20px rgba(0,0,0,0.2)",
        }}
      >
        {/* Subtle atmospheric overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center transition-transform duration-350"
          style={{
            backgroundImage: "url(/images/insights/insight-1.jpg)",
            opacity: 0.15,
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />

        {/* Card content */}
        <div className="relative z-10 flex h-full min-h-75 flex-col justify-end p-7">
          {/* Icon */}
          <svg
            width="40"
            height="40"
            viewBox="0 0 48 48"
            fill="none"
            className="mb-4 opacity-50"
          >
            <path
              d="M8 36V12a4 4 0 014-4h24a4 4 0 014 4v24a4 4 0 01-4 4H12a4 4 0 01-4-4z"
              stroke="#A5B4FC"
              strokeWidth="2"
            />
            <path
              d="M16 28l6-8 4 5 4-3 6 6"
              stroke="#A5B4FC"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="32" cy="18" r="3" stroke="#A5B4FC" strokeWidth="2" />
          </svg>

          <h3 className="text-lg font-semibold text-white">
            Strategic Insights & Research
          </h3>
          <p className="mt-2 max-w-[40ch] text-sm leading-relaxed text-[#A5B4FC]">
            This space will host future reports, advisory insights, and
            institutional research publications.
          </p>
        </div>
      </div>
    </div>
  );
}
