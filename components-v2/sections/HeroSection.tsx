"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useHeroSequence } from "@/components-v2/foundation/useHeroSequence";
import { useHeroEntrance } from "@/components-v2/foundation/useHeroEntrance";
import { useReducedMotionPreference } from "@/src/lib/motion/useReducedMotionPreference";

// ═══════════════════════════════════════════════════════════════════════════════
// Cinematic Hero — 4-image crossfade sequence with dark institutional overlay.
// Scale 1 → 1.12, 10 s zoom cubic-bezier(0.22,1,0.36,1), 1.4 s crossfade.
// Mobile: static first image, no zoom / crossfade.
// Reduced-motion: fully static single image.
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Hero image sequence ─────────────────────────────────────────────────────
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1717256770124-e053bebb13b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjaXR5JTIwc2t5bGluZSUyMG5pZ2h0JTIwZmluYW5jaWFsJTIwdG93ZXJzJTIwZHVza3xlbnwxfHx8fDE3NzI1NzY1NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1709803857154-d20ee16ff763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGVjdXRpdmUlMjBib2FyZHJvb20lMjBBZnJpY2FuJTIwbGVhZGVyc2hpcCUyMHNlcmlvdXMlMjBtZWV0aW5nfGVufDF8fHx8MTc3MjU3NjU2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1599923142561-ee85cfb5550d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwY2VudGVyJTIwZ2l0YWwlMjMinZnJhc3RydWN0dXJlJTIwbmV0d29yayUyMGZ1dHVyaXN0aWN8ZW58MXx8fHwxNzcyNTc2NTY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1761926002909-781a45b71030?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjBzaGlwcGluZyUyMHBvcnQlMjBpbmR1c3RyaWFsJTIwaW5mcmFzdHJ1Y3R1cmUlMjBjb3JyaWRvcnxlbnwxfHx8fDE3NzI1NzY1NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
];

// ─── Timing constants ────────────────────────────────────────────────────────
const SLIDE_DURATION = 10_000; // 10 s per slide
const CROSSFADE_MS = 1_400; // 1.4 s crossfade

// ─── Per-image overlay brightness tuning ─────────────────────────────────────
// Image 1 (boardroom) is brighter — boost midpoint to 0.88
const OVERLAY_DESKTOP: Record<number, string> = {
  0: "linear-gradient(to bottom, rgba(8,18,30,0.35) 0%, rgba(8,18,30,0.48) 55%, rgba(8,18,30,0.62) 100%)",
  1: "linear-gradient(to bottom, rgba(8,18,30,0.35) 0%, rgba(8,18,30,0.52) 55%, rgba(8,18,30,0.62) 100%)",
  2: "linear-gradient(to bottom, rgba(8,18,30,0.35) 0%, rgba(8,18,30,0.48) 55%, rgba(8,18,30,0.62) 100%)",
  3: "linear-gradient(to bottom, rgba(8,18,30,0.35) 0%, rgba(8,18,30,0.48) 55%, rgba(8,18,30,0.62) 100%)",
};
const OVERLAY_MOBILE =
  "linear-gradient(to bottom, rgba(8,18,30,0.55) 0%, rgba(8,18,30,0.68) 55%, rgba(8,18,30,0.8) 100%)";

// ═══════════════════════════════════════════════════════════════════════════════
// Props
// ═══════════════════════════════════════════════════════════════════════════════

export interface HeroSectionProps {
  /** Overline eyebrow above the headline */
  overline?: string;
  /** Main H1 headline */
  title?: string;
  /** Optional subtitle shown below the overline (currently unused in Figma spec) */
  subtitle?: string;
  /** Body paragraph beneath the headline */
  description?: string;
  /** Primary "white pill" CTA button */
  primaryCta?: { label?: string; href?: string };
  /** Secondary inline underlined link */
  secondaryCta?: { label?: string; href?: string };
}

// ═══════════════════════════════════════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════════════════════════════════════

export default function HeroSection({
  overline = "Pan-African Institutional Advisory",
  title = "Institutional Advisory Built for Growth, Transformation, and Execution.",
  subtitle,
  description = "We advise growth-stage companies, institutional operators, and public-sector leaders navigating structural complexity across strategy, technology, finance, and governance - delivering measurable outcomes with discipline.",
  primaryCta = { label: "See How We Deliver", href: "/services" },
  secondaryCta = { label: "Explore Our Services", href: "/services" },
}: HeroSectionProps) {
  // ─── Hooks ───────────────────────────────────────────────────────────────
  const prefersReducedMotion = useReducedMotionPreference();

  // Track viewport width for mobile detection (SSR-safe: start with false)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const sequenceDisabled = isMobile || prefersReducedMotion;
  const activeSlide = useHeroSequence(
    HERO_IMAGES.length,
    SLIDE_DURATION,
    sequenceDisabled,
  );
  const entrance = useHeroEntrance(prefersReducedMotion);

  // ─── Secondary CTA hover state ──────────────────────────────────────────
  const [primaryHover, setPrimaryHover] = useState(false);
  const [secondaryHover, setSecondaryHover] = useState(false);

  const trackHeroCtaClick = () => {
    if (typeof window === "undefined") return;
    const payload = {
      event: "cta_click",
      ctaLabel: primaryCta?.label ?? "See How We Deliver",
      location: "homepage-hero",
      href: primaryCta?.href ?? "/services",
    };

    const w = window as typeof window & {
      dataLayer?: Array<Record<string, unknown>>;
    };

    if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push(payload);
      return;
    }

    w.dataLayer = [payload];
  };

  // ─── Explicitly preload first hero image for parity with reference ──────
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = HERO_IMAGES[0];
    link.setAttribute("fetchpriority", "high");
    document.head.appendChild(link);

    return () => {
      if (link.parentNode) link.parentNode.removeChild(link);
    };
  }, []);

  // ─── Preload remaining hero images after first paint ────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      HERO_IMAGES.slice(1).forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    }, 2_000);
    return () => clearTimeout(timer);
  }, []);

  // ─── Overlay gradient ──────────────────────────────────────────────────
  const overlayGradient = isMobile
    ? OVERLAY_MOBILE
    : (OVERLAY_DESKTOP[activeSlide] ?? OVERLAY_DESKTOP[0]);

  return (
    <section className="relative overflow-hidden min-h-[70vh] md:min-h-[75vh] lg:min-h-[85vh]">
      {/* ─── Background image stack ─────────────────────────────────── */}
      {prefersReducedMotion ? (
        /* Reduced-motion: single static image, no animation */
        <Image
          src={HERO_IMAGES[0]}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden="true"
        />
      ) : (
        HERO_IMAGES.map((src, i) => {
          const isActive = i === activeSlide;
          return (
            <Image
              key={src}
              src={src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              aria-hidden="true"
              className="object-cover object-center"
              style={{
                opacity: isActive ? 1 : 0,
                // Mobile: no scale zoom, just crossfade.
                // Desktop: active slides zoom from scale(1) → scale(1.12).
                transform: isMobile
                  ? "none"
                  : isActive
                    ? "scale(1.12)"
                    : "scale(1)",
                transition: isMobile
                  ? "opacity 6000ms ease-in-out"
                  : `opacity ${CROSSFADE_MS}ms ease-in-out, transform ${SLIDE_DURATION}ms cubic-bezier(0.22,1,0.36,1)`,
                willChange: isMobile ? undefined : "opacity, transform",
              }}
            />
          );
        })
      )}

      {/* ─── Dark institutional overlay gradient ────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-1"
        style={{
          background: overlayGradient,
          transition: prefersReducedMotion
            ? "none"
            : `background ${CROSSFADE_MS}ms ease-in-out`,
        }}
      />

      {/* ─── Text content ───────────────────────────────────────────── */}
      <div className="relative z-2 pt-20 pb-12 md:pt-28 md:pb-16 lg:pt-36 lg:pb-24">
        <div className="layout-container">
          <div className="max-w-195">
            {/* Overline */}
            {overline && (
              <span
                className="block text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-white/70 mb-1.5"
                style={{
                  textShadow: "0 1px 3px rgba(0,0,0,0.2)",
                  ...entrance.overline,
                }}
              >
                {overline}
              </span>
            )}

            {/* Headline */}
            {title && (
              <h1
                className="text-[2.5rem] md:text-[3rem] lg:text-[4rem] font-semibold leading-[1.15] md:leading-[1.12] lg:leading-[1.08] tracking-[-0.005em] md:tracking-[-0.015em] lg:tracking-[-0.02em] text-white max-w-195"
                style={{
                  textShadow: "0 2px 6px rgba(0,0,0,0.25)",
                  ...entrance.heading,
                }}
              >
                {title}
              </h1>
            )}

            {/* Optional subtitle */}
            {subtitle && (
              <h2
                className="mt-3 text-lg md:text-xl text-white/80"
                style={entrance.paragraph}
              >
                {subtitle}
              </h2>
            )}

            {/* Body paragraph */}
            {description && (
              <p
                className="mt-6 text-xl leading-[1.55] text-white/92 max-w-[60ch]"
                style={{
                  textShadow: "0 1px 3px rgba(0,0,0,0.2)",
                  ...entrance.paragraph,
                }}
              >
                {description}
              </p>
            )}

            {/* ─── Dual CTA ─────────────────────────────────────────── */}
            <div
              className="mt-12 flex flex-col items-stretch gap-6 md:flex-row md:items-center"
              style={entrance.cta}
            >
              {/* Primary CTA — white pill on dark hero */}
              {primaryCta?.label && primaryCta?.href && (
                <Link
                  href={primaryCta.href}
                  className="inline-block rounded-md px-6 py-4 text-center text-base font-semibold text-(--a700) transition-[background-color,transform,box-shadow] duration-200 ease-in-out md:w-auto"
                  onMouseEnter={() => setPrimaryHover(true)}
                  onMouseLeave={() => setPrimaryHover(false)}
                  onClick={trackHeroCtaClick}
                  style={{
                    backgroundColor: primaryHover ? "#F0F0F0" : "#FFFFFF",
                    transform: primaryHover ? "translateY(-2px)" : "translateY(0)",
                    boxShadow: primaryHover
                      ? "0 14px 30px rgba(0, 0, 0, 0.20)"
                      : "0 6px 16px rgba(0, 0, 0, 0.14)",
                  }}
                >
                  {primaryCta.label}
                </Link>
              )}

              {/* Secondary CTA — underlined inline link */}
              {secondaryCta?.label && secondaryCta?.href && (
                <Link
                  href={secondaryCta.href}
                  className="text-center md:text-left"
                  onMouseEnter={() => setSecondaryHover(true)}
                  onMouseLeave={() => setSecondaryHover(false)}
                  style={{
                    fontSize: "var(--text-body, 1rem)",
                    fontWeight: 400,
                    lineHeight: "1",
                    color: secondaryHover
                      ? "#FFFFFF"
                      : "rgba(255, 255, 255, 0.7)",
                    textDecoration: "underline",
                    textUnderlineOffset: "4px",
                    textDecorationColor: secondaryHover
                      ? "#FFFFFF"
                      : "rgba(255, 255, 255, 0.4)",
                    textDecorationThickness: secondaryHover ? "2px" : "1px",
                    transition:
                      "color 200ms ease, text-decoration-thickness 200ms ease, text-decoration-color 200ms ease",
                  }}
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
