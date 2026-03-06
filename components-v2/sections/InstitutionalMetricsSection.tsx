"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/components-v2/foundation/useScrollReveal";

// ═══════════════════════════════════════════════════════════════════════════════
// CountUp — IntersectionObserver + requestAnimationFrame animated counter
// Triggers once on viewport entry. Respects prefers-reduced-motion.
// ═══════════════════════════════════════════════════════════════════════════════

function CountUp({ value, duration = 1200 }: { value: number; duration?: number }) {
  // Check reduced motion once at mount — skip animation entirely
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [display, setDisplay] = useState(prefersReduced ? value : 0);
  const hasAnimatedRef = useRef(prefersReduced);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimatedRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        hasAnimatedRef.current = true;

        const start = performance.now();
        let rafId: number;

        function tick(now: number) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(eased * value));

          if (progress < 1) {
            rafId = requestAnimationFrame(tick);
          }
        }

        rafId = requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}

/** Parses a metric value string and applies CountUp to the numeric portion.
 *  "10" → <CountUp value={10} />
 *  "100%" → <CountUp value={100} />%
 *  "4-Phase" → <CountUp value={4} />-Phase
 *  Non-numeric → rendered as-is. */
function AnimatedMetricValue({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)/);
  if (!match) return <>{value}</>;
  const num = parseInt(match[1], 10);
  const suffix = match[2]; // e.g. "%", "-Phase", ""
  return (
    <>
      <CountUp value={num} />
      {suffix}
    </>
  );
}

// ─── Static metric data (matches Figma IA_METRICS) ─────────────────────────
const DEFAULT_METRICS = [
  {
    value: "10",
    label: "Integrated Advisory Disciplines",
    description:
      "From strategy and technology to finance, people, risk, compliance, operations, transformation, ESG, and data — all disciplines converge under one advisory architecture.",
  },
  {
    value: "11",
    label: "Industry Sectors Served",
    description:
      "Spanning financial services, healthcare, technology, energy, government, real estate, education, manufacturing, logistics, professional services, and media.",
  },
  {
    value: "4-Phase",
    label: "Delivery Methodology",
    description:
      "Diagnostic, Design, Deliver, Sustain — a structured engagement lifecycle that ensures every workstream moves from insight to institutional impact.",
  },
  {
    value: "100%",
    label: "Senior-Led Engagement Teams",
    description:
      "Every client engagement is directed by senior principals. No delegation to junior analysts. The people you meet are the people who deliver.",
  },
];

// ─── Institutional cinematic image sequence ─────────────────────────────────
// Local paths preferred; Unsplash URLs used as fallback when local assets
// are not yet present. Same pattern used across hero, framework, etc.
const INSTITUTIONAL_SEQUENCE = [
  "/images/advisory/institutional-01.jpg",
  "/images/advisory/institutional-02.jpg",
  "/images/advisory/institutional-03.jpg",
];

const INSTITUTIONAL_FALLBACK = [
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1556761175-4b46a572b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
];

// ─── CTA conversation image ────────────────────────────────────────────────
const CTA_LOCAL_IMAGE = "/images/advisory/conversation.jpg";
const CTA_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1758518727707-b023e285b709?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

// ─── Props ──────────────────────────────────────────────────────────────────
interface MetricItem {
  value: string;
  label: string;
  description: string;
}

interface InstitutionalMetricsSectionProps {
  metrics?: MetricItem[];
  ctaTitle?: string;
  ctaDescription?: string;
}

export default function InstitutionalMetricsSection({
  metrics,
  ctaTitle,
  ctaDescription,
}: InstitutionalMetricsSectionProps) {
  const [headerRef, headerStyle] = useScrollReveal();
  const displayMetrics = metrics && metrics.length > 0 ? metrics : DEFAULT_METRICS;

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#071a2f] via-[#0c2744] to-[#0e2f52] py-32">
      {/* ── Diagonal navy geometric ribbon — 10–15% opacity ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          top: "-20%",
          right: "-10%",
          width: "120%",
          height: "140%",
          background: `linear-gradient(
            -35deg,
            transparent 0%,
            transparent 30%,
            rgba(27,58,92,0.12) 30%,
            rgba(27,58,92,0.12) 45%,
            transparent 45%,
            transparent 55%,
            rgba(27,58,92,0.10) 55%,
            rgba(27,58,92,0.10) 65%,
            transparent 65%,
            transparent 100%
          )`,
        }}
      />

      <div className="layout-container relative z-10">
        {/* ════════════ BLOCK 1: METRICS ════════════ */}
        <div ref={headerRef} style={headerStyle} className="mb-16 max-w-4xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-indigo-300/70">
            INSTITUTIONAL ADVISORY. MEASURABLE OUTCOMES.
          </p>
          <h2 className="text-3xl font-semibold leading-tight text-white lg:text-4xl">
            Institutional Advisory. Measurable Outcomes.
          </h2>
        </div>

        {/* Metrics card grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {displayMetrics.map((m, i) => (
            <MetricCard key={m.label} {...m} staggerIndex={i + 1} />
          ))}
        </div>

        {/* ════════════ BLOCK 2: CTA PANEL ════════════ */}
        <div className="mt-24 grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          {/* Left column — copy + buttons */}
          <div className="lg:col-span-6">
            <h2 className="text-3xl font-semibold leading-tight text-white lg:text-4xl">
              {ctaTitle ?? "Begin a Conversation With Our Advisory Team."}
            </h2>
            <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-white/70 lg:text-lg">
              {ctaDescription ??
                "Every engagement begins with a structured conversation. No obligations — simply an exchange of context to determine whether there is a basis for collaboration."}
            </p>

            <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="inline-block rounded-card bg-white px-8 py-3.5 text-center text-sm font-semibold text-[#071a2f] transition-colors duration-200 hover:bg-slate-200"
              >
                Schedule an Introduction
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 py-3.5 text-sm font-medium text-white/70 transition-colors duration-200 hover:text-white"
              >
                Download Firm Overview
                <span aria-hidden="true" className="text-base">→</span>
              </Link>
            </div>
          </div>

          {/* Right column — cinematic image crossfade */}
          <div className="lg:col-span-6">
            <CinematicVisualPanel />
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Metric Card — glass panel with hover-reveal description
// ═══════════════════════════════════════════════════════════════════════════════

function MetricCard({
  value,
  label,
  description,
  staggerIndex = 0,
}: MetricItem & { staggerIndex?: number }) {
  const [hovered, setHovered] = useState(false);
  const [ref, style] = useScrollReveal(staggerIndex);

  return (
    <div ref={ref} style={style}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="rounded-card border bg-white/5 p-8 backdrop-blur-sm"
        style={{
          minHeight: "200px",
          cursor: "pointer",
          borderColor: hovered ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.10)",
          backgroundColor: hovered ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.05)",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hovered
            ? "0 16px 40px rgba(0,0,0,0.25)"
            : "0 4px 16px rgba(0,0,0,0.15)",
          transition: "transform 260ms cubic-bezier(0.22,1,0.36,1), box-shadow 260ms cubic-bezier(0.22,1,0.36,1), border-color 260ms cubic-bezier(0.22,1,0.36,1), background-color 260ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Metric value — animated count-up for numeric values */}
        <span
          className="mb-3 block text-[42px] font-bold leading-none text-white"
          style={{
            transform: hovered ? "scale(1.03)" : "scale(1)",
            transformOrigin: "left bottom",
            transition: "transform 260ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <AnimatedMetricValue value={value} />
        </span>

        {/* Label */}
        <span
          className="block text-sm font-medium tracking-wide text-indigo-300/90"
          style={{
            marginBottom: hovered ? "16px" : "0",
            transition: "margin-bottom 350ms ease",
          }}
        >
          {label}
        </span>

        {/* Description — revealed on hover */}
        <p
          className="text-[13px] leading-relaxed text-white/60"
          style={{
            maxHeight: hovered ? "120px" : "0",
            opacity: hovered ? 1 : 0,
            overflow: "hidden",
            transition: "opacity 250ms ease, max-height 350ms ease",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Cinematic Visual Panel — Looping crossfade of 3 atmospheric images
// Uses local paths when available, falls back to Unsplash URLs.
// ═══════════════════════════════════════════════════════════════════════════════

/** Probe whether a local image path exists by attempting a HEAD fetch.
 *  Returns resolved URL array (local or fallback). */
function useImageSequence(
  localPaths: string[],
  fallbackPaths: string[]
): string[] {
  const [resolved, setResolved] = useState<string[]>(fallbackPaths);

  useEffect(() => {
    let cancelled = false;

    async function probe() {
      try {
        // Check one local path to decide if the whole set is present
        const res = await fetch(localPaths[0], { method: "HEAD" });
        if (!cancelled && res.ok) {
          setResolved(localPaths);
        }
      } catch {
        // Local images not present — keep fallback
      }
    }

    probe();
    return () => { cancelled = true; };
  }, [localPaths, fallbackPaths]);

  return resolved;
}

function CinematicVisualPanel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = useImageSequence(INSTITUTIONAL_SEQUENCE, INSTITUTIONAL_FALLBACK);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative aspect-4/3 overflow-hidden rounded-card">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          style={{
            opacity: i === activeIndex ? 1 : 0,
            transition: "opacity 1.2s ease",
          }}
          priority={false}
        />
      ))}

      {/* Dark gradient overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(12,28,46,0.45) 0%, rgba(12,28,46,0.25) 50%, rgba(12,28,46,0.55) 100%)",
        }}
      />
    </div>
  );
}
