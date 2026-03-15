"use client";

// ═══════════════════════════════════════════════════════════════════════════════
// InsightsCarouselSection — Dark-navy editorial slider track
// Per Figma RSL-Homepage.tsx: single flex row, 80vw card centered,
// neighbours peeking. Horizontal translateX sliding.
// ═══════════════════════════════════════════════════════════════════════════════

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/components-v2/foundation/useScrollReveal";
import InsightCarouselCard, {
  INSIGHT_CARD_H,
  INSIGHT_CAROUSEL_EASING,
} from "@/components-v2/ui/InsightCarouselCard";

// ─── Constants ───────────────────────────────────────────────────────────────
const AUTO_INTERVAL = 7000;
const EASING = INSIGHT_CAROUSEL_EASING;

// ─── Placeholder data — 5 cards per Figma spec ──────────────────────────────
const FALLBACK_INSIGHTS = [
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

type InsightCardData = {
  category: string;
  title: string;
  excerpt: string;
  source: string;
  image: string;
  slug: string;
};

interface InsightsCarouselSectionProps {
  insights?: Array<{
    slug: string;
    category?: string;
    title: string;
    excerpt?: string;
    summary?: string;
  }>;
  overline?: string;
  title?: string;
  description?: string;
  titleHref?: string | null;
  exploreHref?: string;
  exploreLabel?: string;
  hideFilters?: boolean;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Main section
// ═══════════════════════════════════════════════════════════════════════════════
export default function InsightsCarouselSection({
  insights,
  overline = "Insights",
  title = "Ideas shaping tomorrow's institutions.",
  description =
    "Explore perspectives drawn from advisory engagements, sector research, and institutional transformation across Africa's evolving economic landscape.",
  titleHref = "/insights",
  exploreHref = "/insights",
  exploreLabel = "Explore all insights",
  hideFilters = false,
}: InsightsCarouselSectionProps) {
  const [revealRef, revealStyle] = useScrollReveal();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("All Insights");
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [trackOpacity, setTrackOpacity] = useState(1);
  const [trackScale, setTrackScale] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  const wheelCooldown = useRef(false);
  const filterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mobileMq = window.matchMedia("(max-width: 767px)");
    const tabletMq = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");
    const update = () => {
      setIsMobile(mobileMq.matches);
      setIsTablet(tabletMq.matches);
    };
    update();
    mobileMq.addEventListener("change", update);
    tabletMq.addEventListener("change", update);
    return () => {
      mobileMq.removeEventListener("change", update);
      tabletMq.removeEventListener("change", update);
    };
  }, []);

  const runtimeInsights: InsightCardData[] =
    insights && insights.length > 0
      ? insights.map((item, idx) => ({
          category: item.category ?? "Insight",
          title: item.title,
          excerpt: item.excerpt ?? item.summary ?? "",
          source:
            FALLBACK_INSIGHTS[idx % FALLBACK_INSIGHTS.length]?.source ??
            "RSL Perspectives",
          image:
            FALLBACK_INSIGHTS[idx % FALLBACK_INSIGHTS.length]?.image ??
            FALLBACK_INSIGHTS[0].image,
          slug: item.slug,
        }))
      : FALLBACK_INSIGHTS.map((item) => ({ ...item }));

  const categories = [
    "All Insights",
    ...Array.from(new Set(runtimeInsights.map((item) => item.category))),
  ];

  const filteredInsights = hideFilters
    ? runtimeInsights
    : activeFilter === "All Insights"
      ? runtimeInsights
      : runtimeInsights.filter((item) => item.category === activeFilter);
  const currentTotal = filteredInsights.length;
  const cardWidthPercent = isMobile ? 92 : isTablet ? 90 : 80;
  const shouldShowFilters = !hideFilters && categories.length > 1;

  const handleFilterChange = useCallback(
    (nextFilter: string) => {
      if (!shouldShowFilters) return;
      if (nextFilter === activeFilter) return;
      if (filterTimeoutRef.current) clearTimeout(filterTimeoutRef.current);
      setTrackOpacity(0);
      setTrackScale(0.98);
      filterTimeoutRef.current = setTimeout(() => {
        setActiveFilter(nextFilter);
        setActiveIndex(0);
        setHoveredIndex(null);
        requestAnimationFrame(() => {
          setTrackOpacity(1);
          setTrackScale(1);
        });
      }, 250);
    },
    [activeFilter, shouldShowFilters],
  );

  useEffect(() => {
    return () => {
      if (filterTimeoutRef.current) clearTimeout(filterTimeoutRef.current);
    };
  }, []);

  // ─── Autoplay — 7s, pauses on hover ───────────────────────────────────────
  useEffect(() => {
    if (isHovered || currentTotal <= 1) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % currentTotal);
    }, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [isHovered, currentTotal]);

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % currentTotal);
  }, [currentTotal]);

  const retreat = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + currentTotal) % currentTotal);
  }, [currentTotal]);

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

      // Debounce rapid fire
      if (wheelCooldown.current) return;
      wheelCooldown.current = true;
      setTimeout(() => { wheelCooldown.current = false; }, 600);

      e.preventDefault();

      if (e.deltaX > 0) {
        setActiveIndex((prev) => (prev + 1) % currentTotal);
      } else {
        setActiveIndex((prev) => (prev - 1 + currentTotal) % currentTotal);
      }
    };

    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [currentTotal]);

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
          {overline}
        </span>
        <h2 className="mb-4 max-w-190 text-[1.75rem] font-semibold leading-tight text-white md:text-4xl">
          {titleHref ? (
            <Link
              href={titleHref}
              className="cursor-pointer transition-colors hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="max-w-170 text-[1.0625rem] leading-relaxed text-white/90">
          {description}
        </p>

        {shouldShowFilters && (
          <div className="mt-9 flex flex-wrap gap-7">
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleFilterChange(cat)}
                  className="border-none bg-transparent p-0 text-sm tracking-[0.04em] transition-colors"
                  style={{
                    fontWeight: 500,
                    color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.65)",
                    borderBottom: isActive ? "2px solid #FFFFFF" : "2px solid transparent",
                    paddingBottom: "6px",
                    paddingTop: "4px",
                    cursor: "pointer",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ─── Horizontal Slider Track ─── */}
      <div className="relative z-1 w-full overflow-visible" style={{ opacity: trackOpacity, transform: `scale(${trackScale})`, transition: "opacity 250ms ease, transform 250ms ease" }}>
        <motion.div
          className="flex gap-16"
          animate={{
            x: `calc(${(100 - cardWidthPercent) / 2}vw - ${activeIndex * cardWidthPercent}vw - ${activeIndex * 64}px)`,
          }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {filteredInsights.map((ins, idx) => (
            <InsightCarouselCard
              key={ins.slug}
              insight={ins}
              isActive={idx === activeIndex}
              isHovered={hoveredIndex === idx}
              onHoverStart={() => setHoveredIndex(idx)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => setActiveIndex(idx)}
              cardWidthPercent={cardWidthPercent}
              isMobile={isMobile}
              cardHeight={isMobile ? 400 : INSIGHT_CARD_H}
            />
          ))}
        </motion.div>
      </div>

      {/* ─── Navigation Controls ─── */}
      <div className="relative z-1 mt-10 flex items-center justify-center gap-5">
        <NavButton label="Previous insight" onClick={retreat}>
          {"<-"}
        </NavButton>

        <div className="flex items-center gap-3">
          {filteredInsights.map((ins, idx) => (
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
          {"->"}
        </NavButton>
      </div>

      {/* ─── "Explore all insights →" ─── */}
      <div className="relative z-1 mx-auto mt-8 flex max-w-7xl justify-end px-8">
        <Link
          href={exploreHref}
          className="group inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-white/85 transition-colors hover:text-white"
        >
          {exploreLabel}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            {"->"}
          </span>
        </Link>
      </div>
    </section>
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
