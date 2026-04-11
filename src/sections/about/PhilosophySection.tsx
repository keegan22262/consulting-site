"use client";

import { useState } from "react";

const PRIDE_VALUES = [
  {
    letter: "P",
    name: "Precision",
    body: "Every analysis is structured. Every recommendation is quantified. Every deliverable is calibrated to the specific context of the engagement.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#052659" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    letter: "R",
    name: "Resilience",
    body: "Operating across complex and volatile environments demands adaptive methodology. We build frameworks that endure institutional, regulatory, and market disruption.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#052659" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    letter: "I",
    name: "Integrity",
    body: "Institutional trust is earned through consistent transparency, analytical honesty, and the willingness to deliver difficult findings with clarity.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#052659" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    letter: "D",
    name: "Discipline",
    body: "Methodological rigor governs every workstream. Timelines are commitments, not aspirations. Governance is embedded, not appended.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#052659" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    letter: "E",
    name: "Execution",
    body: "Strategy without implementation is academic. We operate at the intersection of advisory insight and delivery accountability.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#052659" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L15 22l-4-9-9-4z" />
      </svg>
    ),
  },
];

function PrideCard({
  card,
}: {
  card: (typeof PRIDE_VALUES)[number];
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white rounded-xl px-7 py-8 transition-all duration-300 cursor-pointer"
      style={{
        boxShadow: hovered
          ? "0 12px 32px rgba(2,16,36,0.1)"
          : "0 4px 20px rgba(2,16,36,0.06)",
        borderTop: "3px solid #5483B3",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* Icon circle */}
      <div
        className="w-[52px] h-[52px] rounded-full flex items-center justify-center mx-auto"
        style={{ backgroundColor: "#C1E8FF" }}
      >
        {card.icon}
      </div>

      {/* Letter */}
      <div
        className="text-center mt-4 text-[28px]"
        style={{
          fontFamily: "var(--font-playfair), 'Playfair Display', serif",
          fontWeight: 600,
          color: "#052659",
        }}
      >
        {card.letter}
      </div>

      {/* Title */}
      <h3
        className="text-center mt-2 text-[18px] font-semibold"
        style={{
          fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
          color: "#021024",
        }}
      >
        {card.name}
      </h3>

      {/* Description */}
      <p
        className="text-center mt-2 text-[13px] leading-[1.6]"
        style={{
          fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
          color: "#6B7280",
        }}
      >
        {card.body}
      </p>
    </div>
  );
}

export default function PhilosophySection() {
  return (
    <section className="py-20" style={{ backgroundColor: "#F8FBFF" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center">
          <span
            className="block text-[12px] uppercase tracking-[4px] mb-3"
            style={{
              fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
              color: "#5483B3",
            }}
          >
            OUR PHILOSOPHY
          </span>
          <h2
            className="text-[36px] mb-2"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              fontWeight: 400,
              color: "#021024",
            }}
          >
            Built for Execution.
          </h2>
          <p
            className="text-[15px] leading-[1.7] max-w-[640px] mx-auto mb-12"
            style={{
              fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
              color: "#6B7280",
            }}
          >
            PRIDE is not a slogan. It is an operating principle — the behavioral
            architecture that governs how we engage, deliver, and sustain client
            outcomes.
          </p>
        </div>

        {/* Cards grid: 3 on top, 2 centered below */}
        <div className="hidden md:block">
          <div className="grid grid-cols-3 gap-6">
            {PRIDE_VALUES.slice(0, 3).map((card) => (
              <PrideCard key={card.letter} card={card} />
            ))}
          </div>
          <div className="flex justify-center gap-6 mt-6">
            <div className="w-[calc(33.333%-8px)]">
              <PrideCard card={PRIDE_VALUES[3]} />
            </div>
            <div className="w-[calc(33.333%-8px)]">
              <PrideCard card={PRIDE_VALUES[4]} />
            </div>
          </div>
        </div>

        {/* Mobile: single column */}
        <div className="flex flex-col gap-6 md:hidden">
          {PRIDE_VALUES.map((card) => (
            <PrideCard key={card.letter} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
