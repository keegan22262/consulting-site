"use client";

// ═══════════════════════════════════════════════════════════════════════════════
// CapabilityPanelsSection — Three alternating editorial image+text panels.
// White background. 6/6 grid alternating image-first / text-first.
// Mobile: single-column stack, image always above text.
// Scroll-reveal with stagger per panel.
// ═══════════════════════════════════════════════════════════════════════════════

import Image from "next/image";
import { useScrollReveal } from "@/components-v2/foundation";

// ─── Panel data ──────────────────────────────────────────────────────────────
const PANELS = [
  {
    title: "Strategy & Corporate Transformation",
    body: "End-to-end strategic advisory from market assessment through execution architecture, designed for boards and C-suites navigating complex transitions.",
    image: "/images/capabilities/strategy.jpg",
    imageFirst: true,
  },
  {
    title: "Digital & AI Transformation",
    body: "Enterprise technology strategy, AI readiness assessment, and digital operating model design for organizations building future-state capability.",
    image: "/images/capabilities/digital-ai.jpg",
    imageFirst: false,
  },
  {
    title: "Financial Advisory, Audit & Risk",
    body: "Transaction advisory, financial due diligence, risk governance, and internal audit frameworks aligned to institutional-grade standards.",
    image: "/images/capabilities/financial.jpg",
    imageFirst: true,
  },
] as const;

// ─── Section ─────────────────────────────────────────────────────────────────
export default function CapabilityPanelsSection() {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-24">
      <div className="flex flex-col gap-12 md:gap-16 lg:gap-24">
        {PANELS.map((panel, i) => (
          <CapabilityPanel
            key={panel.title}
            {...panel}
            index={i}
            isLast={i === PANELS.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

// ─── Single Panel ────────────────────────────────────────────────────────────
function CapabilityPanel({
  title,
  body,
  image,
  imageFirst,
  index,
  isLast,
}: (typeof PANELS)[number] & { index: number; isLast: boolean }) {
  const [revealRef, revealStyle] = useScrollReveal(index);

  const imageBlock = (
    <div className="relative min-h-70 overflow-hidden rounded-card md:min-h-85 lg:min-h-105">
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
    </div>
  );

  const textBlock = (
    <div className="flex flex-col justify-center px-0 py-6 md:px-8 md:py-8 lg:px-12 lg:py-12">
      {/* Accent rule */}
      <div className="mb-5 h-0.75 w-12 bg-accent-primary md:mb-6" />

      {/* Heading */}
      <h3 className="text-2xl font-semibold leading-tight tracking-tight text-text-primary md:text-[28px] md:leading-tight lg:text-[32px] lg:leading-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-3 max-w-prose text-base leading-relaxed text-text-secondary md:mt-4">
        {body}
      </p>
    </div>
  );

  return (
    <div
      ref={revealRef}
      style={revealStyle}
      className="layout-container"
    >
      {/* Desktop: alternating 2-col grid. Mobile: single col, image first */}
      <div className="grid grid-cols-1 gap-0 border-b border-neutral-200 pb-12 lg:grid-cols-2 lg:min-h-85 lg:pb-8" style={{ borderBottom: isLast ? "none" : undefined, paddingBottom: isLast ? 0 : undefined }}>
        {/* Mobile/tablet: image always first */}
        <div className={`${imageFirst ? "lg:order-1" : "lg:order-2"}`}>
          {imageBlock}
        </div>
        <div className={`${imageFirst ? "lg:order-2" : "lg:order-1"}`}>
          {textBlock}
        </div>
      </div>
    </div>
  );
}
