"use client";

// ═══════════════════════════════════════════════════════════════════════════════
// FeaturedServicesSection — "Advisory Architecture"
// Dark navy (#0C1C2E) structural authority layout.
// 12-col grid: 6 editorial text / 6 video panel with play button.
// Scroll-reveal entrance. Responsive stacking on mobile/tablet.
// ═══════════════════════════════════════════════════════════════════════════════

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/components-v2/foundation";

// ─── Constants ───────────────────────────────────────────────────────────────
const AA_VIDEO_STILL =
  "https://images.unsplash.com/photo-1573166364839-1bfe9196c23e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBzdHJhdGVneSUyMG1lZXRpbmclMjBib2FyZHJvb20lMjBwcm9mZXNzaW9uYWwlMjBzY3JlZW5zfGVufDF8fHx8MTc3MjU4MjIyMHww&ixlib=rb-4.1.0&q=80&w=1080";

// Vimeo embed — replace with production video ID
const VIMEO_SRC =
  "https://player.vimeo.com/video/824804225?autoplay=1&title=0&byline=0&portrait=0";

// ─── Props ───────────────────────────────────────────────────────────────────
export interface FeaturedServicesSectionProps {
  /** CMS services data for the gateway link (optional override) */
  servicesHref?: string;
}

export default function FeaturedServicesSection({
  servicesHref = "/services",
}: FeaturedServicesSectionProps) {
  const [revealRef, revealStyle] = useScrollReveal();
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <section className="bg-[#0C1C2E] min-h-0 md:min-h-120 lg:min-h-120">
      <div
        ref={revealRef}
        style={revealStyle}
        className="layout-container py-14 md:py-18 lg:py-24"
      >
        {/* 12-col grid: stacked mobile/tablet → side-by-side desktop */}
        <div className="grid grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── Left: Editorial Text Block ── */}
          <div>
            {/* Institutional marker */}
            <span className="mb-4 block text-xs font-medium uppercase tracking-widest text-white/50">
              RSL Integrated Advisory
            </span>

            {/* Overline */}
            <span className="mb-4 block text-sm font-semibold uppercase tracking-wide text-white/70">
              Advisory Architecture
            </span>

            {/* Heading */}
            <h2 className="max-w-160 text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl lg:leading-none">
              <Link href="/services" className="cursor-pointer transition-colors hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm">
                Ten disciplines. One integrated practice.
              </Link>
            </h2>

            {/* Description */}
            <p className="mt-8 max-w-140 text-base leading-relaxed text-white/85 md:text-[17px] md:leading-relaxed">
              Ten advisory disciplines operate within a unified governance and
              delivery architecture - eliminating fragmentation, aligning
              strategic intent with execution mechanics, and ensuring
              institutional coherence across every engagement.
            </p>

            {/* Gateway link — light text for dark background */}
            <div className="mt-10">
              <Link
                href={servicesHref}
                className="group inline-flex items-center gap-2 text-base font-semibold text-white underline underline-offset-4 decoration-1 decoration-white/60 transition-all duration-200 hover:decoration-2 hover:decoration-white/90"
              >
                Explore all services
                <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* ── Right: Video Panel — 16:9 premium mockup ── */}
          <div className="relative w-full overflow-hidden rounded-md border border-white/10 shadow-2xl"
               style={{ paddingBottom: "56.25%" }}>
            {videoPlaying ? (
              <iframe
                src={VIMEO_SRC}
                className="absolute inset-0 h-full w-full border-none"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="RSL Advisory Overview"
              />
            ) : (
              <>
                {/* Still frame */}
                <Image
                  src={AA_VIDEO_STILL}
                  alt="Corporate strategy meeting — RSL advisory overview"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority={false}
                />

                {/* Subtle dark overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-black/20"
                />

                {/* Centered play button */}
                <button
                  onClick={() => setVideoPlaying(true)}
                  aria-label="Play video"
                  className="absolute inset-0 z-2 flex cursor-pointer items-center justify-center border-none bg-transparent p-0"
                >
                  <div
                    className="flex size-14 items-center justify-center rounded-full bg-white/95 shadow-lg transition-all duration-200 ease-out hover:scale-105 hover:shadow-2xl md:size-16 lg:size-18"
                  >
                    {/* Play triangle — accent fill, offset right for optical centering */}
                    <svg
                      width="20"
                      height="24"
                      viewBox="0 0 24 28"
                      fill="none"
                      className="ml-0.5"
                    >
                      <path
                        d="M2 1.5L22 14L2 26.5V1.5Z"
                        fill="var(--a700)"
                        stroke="var(--a700)"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
