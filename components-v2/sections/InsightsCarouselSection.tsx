"use client";

// ═══════════════════════════════════════════════════════════════════════════════
// InsightsCarouselSection — Dark-navy editorial slider track
// Per Figma RSL-Homepage.tsx: single flex row, 80vw card centered,
// neighbours peeking. Horizontal translateX sliding.
// ═══════════════════════════════════════════════════════════════════════════════

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/components-v2/foundation/useScrollReveal";

// ─── Constants ───────────────────────────────────────────────────────────────
const AUTO_INTERVAL = 7000;
const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
const CARD_HEIGHT_DESKTOP = 520;
const CARD_HEIGHT_MOBILE = 400;

// ─── Placeholder data — 5 cards per Figma spec ──────────────────────────────
const INSIGHTS = [
  {
    category: "Technology",
    title: "AI Readiness Assessment for African Enterprises",
    excerpt:
      "Evaluating organizational, data, and infrastructure readiness for AI adoption across industries with varying levels of digital maturity.",
    source: "RSL Perspectives · January 2026",
    image: "/images/insights/insight-1.jpg",
    slug: "ai-readiness-assessment",
  },
  {
    category: "Finance",
    title: "Capital Structure Optimization in Volatile Currency Environments",
    excerpt:
      "Analytical methodology for managing multi-currency exposure and debt structuring in African markets subject to exchange rate instability.",
    source: "RSL Perspectives · December 2025",
    image: "/images/insights/insight-2.jpg",
    slug: "capital-structure-optimization",
  },
  {
    category: "Infrastructure",
    title: "Corridor-Led Development: Unlocking Continental Trade Routes",
    excerpt:
      "How integrated transport and logistics corridors are reshaping intra-African trade, enabling scale economics and catalysing industrial zones.",
    source: "RSL Perspectives · November 2025",
    image: "/images/insights/insight-3.jpg",
    slug: "corridor-led-development",
  },
  {
    category: "Public Policy",
    title: "Renewable Energy Transition and Institutional Readiness",
    excerpt:
      "Assessing the regulatory, financial, and operational architectures required for governments and utilities to accelerate just energy transitions.",
    source: "RSL Perspectives · October 2025",
    image: "/images/insights/insight-4.jpg",
    slug: "renewable-energy-transition",
  },
  {
    category: "Strategy",
    title: "Scaling Advisory-Led Growth in Sub-Saharan Africa",
    excerpt:
      "A framework for enterprise advisory firms positioning against global incumbents while maintaining boutique delivery quality and cultural relevance.",
    source: "RSL Perspectives · February 2026",
    image: "/images/insights/insight-5.jpg",
    slug: "scaling-advisory-led-growth",
  },
] as const;

const TOTAL = INSIGHTS.length;

// ═══════════════════════════════════════════════════════════════════════════════
// Main section
// ═══════════════════════════════════════════════════════════════════════════════
export default function InsightsCarouselSection() {
  const [revealRef, revealStyle] = useScrollReveal();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const wheelCooldown = useRef(false);

  // ─── Autoplay — 7s, pauses on hover ───────────────────────────────────────
  useEffect(() => {
    if (isHovered || TOTAL <= 1) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TOTAL);
    }, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [isHovered]);

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % TOTAL);
  }, []);

  const retreat = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + TOTAL) % TOTAL);
  }, []);

  // ─── Scoped wheel handler ─────────────────────────────────────────────────
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const handler = (e: WheelEvent) => {
      if (!el.contains(e.target as Node)) return;

      // Allow normal vertical scrolling
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) return;

      // Ignore tiny movements
      if (Math.abs(e.deltaX) < 10) return;

      // Smooth exit at boundaries — let page scroll naturally
      if (e.deltaX > 0 && activeIndex >= TOTAL - 1) return;
      if (e.deltaX < 0 && activeIndex <= 0) return;

      // Debounce rapid fire
      if (wheelCooldown.current) return;
      wheelCooldown.current = true;
      setTimeout(() => { wheelCooldown.current = false; }, 600);

      e.preventDefault();

      if (e.deltaX > 0) {
        setActiveIndex((prev) => Math.min(prev + 1, TOTAL - 1));
      } else {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [activeIndex]);

  // ─── Keyboard nav ─────────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        !sectionRef.current?.contains(document.activeElement) &&
        document.activeElement !== sectionRef.current
      )
        return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        advance();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        retreat();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [advance, retreat]);

  // ─── Touch / swipe ────────────────────────────────────────────────────────
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(dx) > 50) {
        if (dx < 0) advance();
        else retreat();
      }
      touchStartX.current = null;
    },
    [advance, retreat],
  );

  // Card width: 80vw desktop, 90vw tablet, 92vw mobile — via CSS variable
  // Track translateX: center the active card then subtract its accumulated offset
  // Formula: translateX( (100 - cardWidth)/2 vw  -  activeIndex * (cardWidthVw + gapPx) )

  return (
    <section
      ref={(el) => {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
        revealRef(el);
      }}
      tabIndex={-1}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden py-16 md:py-24"
      style={{
        background: "linear-gradient(180deg, #0C1C2E 0%, #0E223A 100%)",
        outline: "none",
        ...revealStyle,
      }}
    >
      {/* Noise texture overlay — 3% opacity */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* ─── Section Header ─── */}
      <div className="relative z-1 mx-auto mb-16 max-w-7xl px-8">
        <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
          Insights
        </span>
        <h2 className="mb-4 max-w-190 text-[1.75rem] font-semibold leading-tight text-white md:text-4xl">
          Ideas shaping tomorrow&apos;s institutions.
        </h2>
        <p className="max-w-170 text-[1.0625rem] leading-relaxed text-white/90">
          Explore perspectives drawn from advisory engagements, sector research,
          and institutional transformation across Africa&apos;s evolving economic
          landscape.
        </p>
      </div>

      {/* ─── Horizontal Slider Track ─── */}
      <div className="relative z-1 w-full overflow-hidden px-[calc((100vw-900px)/2)] max-lg:px-6">
        <motion.div
          className="flex gap-8"
          animate={{
            x: `calc(-${activeIndex} * (min(85vw, 900px) + 2rem))`,
          }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {INSIGHTS.map((ins, idx) => (
            <InsightCard
              key={ins.slug}
              insight={ins}
              isActive={idx === activeIndex}
              isHovered={hoveredIndex === idx}
              onHoverStart={() => setHoveredIndex(idx)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => setActiveIndex(idx)}
            />
          ))}
        </motion.div>
      </div>

      {/* ─── Navigation Controls ─── */}
      <div className="relative z-1 mt-10 flex items-center justify-center gap-5">
        <NavButton label="Previous insight" onClick={retreat}>
          ←
        </NavButton>

        <div className="flex items-center gap-3">
          {INSIGHTS.map((ins, idx) => (
            <button
              key={ins.slug}
              type="button"
              aria-label={`Go to insight ${idx + 1}`}
              onClick={() => setActiveIndex(idx)}
              className="border-none p-0 transition-all"
              style={{
                width: idx === activeIndex ? 12 : 8,
                height: idx === activeIndex ? 12 : 8,
                borderRadius: "50%",
                backgroundColor:
                  idx === activeIndex ? "#FFFFFF" : "rgba(255,255,255,0.35)",
                cursor: "pointer",
                transition: `width 300ms ${EASING}, height 300ms ${EASING}, background-color 300ms ${EASING}`,
              }}
            />
          ))}
        </div>

        <NavButton label="Next insight" onClick={advance}>
          →
        </NavButton>
      </div>

      {/* ─── "Explore all insights →" ─── */}
      <div className="relative z-1 mx-auto mt-8 flex max-w-7xl justify-end px-8">
        <Link
          href="/insights"
          className="group inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-white/85 transition-colors hover:text-white"
        >
          Explore all insights
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// InsightCard — dark glass editorial card, text-left / image-right
// 80vw wide, 520px tall (desktop). Inactive: 70% opacity, scale(0.92).
// ═══════════════════════════════════════════════════════════════════════════════

function InsightCard({
  insight,
  isActive,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onClick,
}: {
  insight: (typeof INSIGHTS)[number];
  isActive: boolean;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
}) {
  return (
    <div
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={onClick}
      className="relative shrink-0 cursor-pointer overflow-hidden rounded-2xl"
      style={{
        width: "min(85vw, 900px)",
        height: `${CARD_HEIGHT_DESKTOP}px`,
        backgroundColor: "rgba(12,28,46,0.65)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: isHovered
          ? "0px 40px 80px rgba(0,0,0,0.45)"
          : "0px 30px 60px rgba(0,0,0,0.35)",
        opacity: isActive ? 1 : 0.7,
        transform: isActive ? "scale(1)" : "scale(0.92)",
        transition: `opacity 900ms ${EASING}, transform 900ms ${EASING}, box-shadow 300ms ${EASING}`,
      }}
    >
      {/* Full-bleed background image */}
      <Image
        src={insight.image}
        alt={insight.title}
        fill
        sizes="(max-width: 1024px) 85vw, 900px"
        className="object-cover"
        style={{
          transform: isHovered ? "scale(1.04)" : "scale(1)",
          transition: `transform 900ms ${EASING}`,
        }}
      />

      {/* Gradient overlay — left-heavy for text legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-1"
        style={{
          background:
            "linear-gradient(to right, rgba(12,28,46,0.85), rgba(12,28,46,0.55), rgba(12,28,46,0.1))",
        }}
      />

      {/* Text content — left side */}
      <div className="relative z-2 flex h-full max-w-130 flex-col justify-end px-6 pb-8 pt-12 md:px-14 md:pb-12">
        {/* Category overline */}
        <span className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-white/65">
          {insight.category}
        </span>

        {/* Title */}
        <h3 className="mb-4 text-[1.375rem] font-semibold leading-tight text-white md:text-[1.75rem]">
          {insight.title}
        </h3>

        {/* Excerpt */}
        <p
          className="mb-5 text-[0.9375rem] leading-relaxed text-white/78"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical" as const,
            overflow: "hidden",
          }}
        >
          {insight.excerpt}
        </p>

        {/* Source line */}
        <span className="mb-5 text-xs text-white/50">{insight.source}</span>

        {/* CTA link */}
        <Link
          href={`/insights/${insight.slug}`}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex w-fit items-center gap-1.5 border-b border-white/40 pb-0.5 text-sm font-semibold text-white transition-colors hover:border-white"
        >
          Read Full Insight
          <span
            className="inline-block text-[0.9em]"
            style={{
              transition: `transform 300ms ${EASING}`,
              transform: isHovered ? "translateX(4px)" : "translateX(0px)",
            }}
          >
            →
          </span>
        </Link>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// NavButton — circular dark-glass arrow
// ═══════════════════════════════════════════════════════════════════════════════

function NavButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-10 items-center justify-center rounded-full text-white transition-colors"
      style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor =
          "rgba(255,255,255,0.18)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor =
          "rgba(255,255,255,0.08)";
      }}
    >
      {children}
    </button>
  );
}
