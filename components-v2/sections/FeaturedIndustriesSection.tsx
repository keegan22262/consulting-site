"use client";

// ═══════════════════════════════════════════════════════════════════════════════
// FeaturedIndustriesSection — BCG-style 3-lane industry carousel
// Lane-based grid: left (prev), center (active), right (next).
// Center card dominates. Side cards recede with perspective rotation.
// ═══════════════════════════════════════════════════════════════════════════════

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useScrollReveal } from "@/components-v2/foundation/useScrollReveal";

// ─── Constants ───────────────────────────────────────────────────────────────
const AUTO_INTERVAL = 5000;
const TRANSITION = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };

// ─── Industry data ───────────────────────────────────────────────────────────
const FALLBACK_INDUSTRIES = [
  {
    title: "Financial Services",
    image: "/images/industries/industry-1.jpg",
    description:
      "Banking & Capital Markets, Insurance, Private Equity & Venture Capital, Microfinance & DFIs",
    href: "/industries/financial-services",
  },
  {
    title: "Technology & Digital",
    image: "/images/industries/industry-2.jpg",
    description:
      "Enterprise Software, Fintech & Payments, Telecommunications, Digital Infrastructure",
    href: "/industries/technology-digital",
  },
  {
    title: "Energy & Resources",
    image: "/images/industries/industry-3.jpg",
    description:
      "Oil & Gas, Power & Utilities, Mining & Minerals, Renewable Energy",
    href: "/industries/energy-resources",
  },
  {
    title: "Healthcare & Life Sciences",
    image: "/images/industries/industry-4.jpg",
    description:
      "Healthcare Providers & Payers, Pharma & Biotech, Life Sciences, MedTech",
    href: "/industries/healthcare",
  },
  {
    title: "Infrastructure & Real Estate",
    image: "/images/industries/industry-5.jpg",
    description:
      "Real Estate, Infrastructure, Construction, Capital Projects",
    href: "/industries/real-assets",
  },
  {
    title: "Public Sector & Government",
    image: "/images/industries/industry-6.jpg",
    description:
      "Government Advisory, Defense & Security, Public Service Delivery, Institutional Reform",
    href: "/industries/public-sector",
  },
] as const;

type IndustryCardData = {
  title: string;
  description: string;
  href: string;
  image: string;
};

interface FeaturedIndustriesSectionProps {
  industries?: Array<{
    slug: string;
    title: string;
    description?: string;
  }>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Main section
// ═══════════════════════════════════════════════════════════════════════════════
export default function FeaturedIndustriesSection({ industries }: FeaturedIndustriesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealRef, revealStyle] = useScrollReveal();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const wheelCooldown = useRef(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [cardOffset, setCardOffset] = useState(460);

  const runtimeIndustries: IndustryCardData[] =
    industries && industries.length > 0
      ? industries.map((item, idx) => ({
          title: item.title,
          description: item.description ?? "",
          href: `/industries/${item.slug}`,
          image:
            FALLBACK_INDUSTRIES[idx % FALLBACK_INDUSTRIES.length]?.image ??
            FALLBACK_INDUSTRIES[0].image,
        }))
      : FALLBACK_INDUSTRIES.map((item) => ({ ...item }));

  const total = runtimeIndustries.length;

  // ─── Responsive card offset (matches original grid spacing) ────────────────
  useEffect(() => {
    function updateOffset() {
      if (carouselRef.current) {
        setCardOffset(carouselRef.current.offsetWidth * 0.36);
      }
    }
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  // ─── Autoplay ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [isPaused, total]);

  // ─── Scoped wheel handler ─────────────────────────────────────────────────
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const handler = (e: WheelEvent) => {
      // Only intercept when cursor is inside this section
      if (!el.contains(e.target as Node)) return;

      // Allow normal vertical scrolling — only capture horizontal-dominant gestures
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) return;

      // Ignore tiny movements
      if (Math.abs(e.deltaX) < 10) return;

      // Debounce to prevent rapid multi-fire
      if (wheelCooldown.current) return;
      wheelCooldown.current = true;
      setTimeout(() => { wheelCooldown.current = false; }, 600);

      e.preventDefault();

      if (e.deltaX > 0) {
        setActiveIndex((prev) => (prev + 1) % total);
      } else {
        setActiveIndex((prev) => (prev - 1 + total) % total);
      }
      setIsPaused(true);
    };

    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [total]);

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
    setIsPaused(true);
  }, [total]);

  const retreat = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
    setIsPaused(true);
  }, [total]);

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

  return (
    <section
      ref={(el) => {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
        revealRef(el);
      }}
      className="relative overflow-hidden py-16 md:py-20 lg:py-24"
      style={{
        ...revealStyle,
        backgroundColor: "#FFFFFF",
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Atmospheric background layers ── */}
      {/* Radial glow behind cards */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(12,28,46,0.08) 0%, rgba(12,28,46,0.03) 35%, transparent 70%)",
        }}
      />
      {/* Blurred architectural texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url(/images/advisory/institutional-01.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "70% center",
          opacity: 0.03,
          filter: "blur(6px)",
          transform: "scale(1.06)",
        }}
      />
      {/* Gloss highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(120deg, rgba(12,28,46,0.05), transparent 40%)",
        }}
      />
      {/* Section header */}
      <div className="layout-container mb-10 md:mb-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Industry Coverage
        </span>
        <h2 className="mt-1.5 text-2xl font-bold text-text-primary">
          <Link href="/industries" className="cursor-pointer transition-colors hover:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-sm">
            Deep sector knowledge. Continental reach.
          </Link>
        </h2>
        <div className="my-5 h-0.5 w-12 bg-accent-primary" />
        <p className="max-w-[60ch] text-sm leading-relaxed text-neutral-600">
          Our advisory teams operate across the industries shaping Africa&apos;s next decade of economic transformation. From energy infrastructure and financial systems to digital ecosystems and public institutions, we combine sector expertise with execution discipline to guide complex transformation.
        </p>
      </div>

      {/* ── Carousel container ── */}
      <div
        ref={carouselRef}
        className="relative mx-auto max-w-7xl overflow-hidden px-4 md:px-6 lg:px-8"
        style={{ perspective: "1200px" }}
      >
        {/* Invisible spacer — drives container height to match center card */}
        <div aria-hidden="true" className="pointer-events-none mx-auto max-w-105">
          <div className="aspect-4/5" />
        </div>

        {runtimeIndustries.map((industry, i) => {
          const slot = computeSlot(i, activeIndex, total);
          return (
            <CarouselCard
              key={i}
              industry={industry}
              slot={slot}
              cardOffset={cardOffset}
              onClick={
                slot === "left" ? retreat : slot === "right" ? advance : undefined
              }
            />
          );
        })}
      </div>

      {/* ── Controls ── */}
      <div className="mt-10 flex items-center justify-center gap-3">
        <NavButton
          label={isPaused ? "Play" : "Pause"}
          onClick={() => setIsPaused((p) => !p)}
        >
          {isPaused ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 2L14 8L4 14V2Z" fill="currentColor" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="3" y="2" width="3.5" height="12" rx="1" fill="currentColor" />
              <rect x="9.5" y="2" width="3.5" height="12" rx="1" fill="currentColor" />
            </svg>
          )}
        </NavButton>

        <NavButton label="Previous" onClick={retreat}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 3L5 8L10 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </NavButton>

        <NavButton label="Next" onClick={advance}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 3L11 8L6 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </NavButton>
      </div>

      {/* ── Dot indicators ── */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {runtimeIndustries.map((ind, i) => (
          <button
            key={ind.title}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => {
              setActiveIndex(i);
              setIsPaused(true);
            }}
            className="transition-all duration-300"
            style={{
              width: activeIndex === i ? 24 : 8,
              height: 8,
              borderRadius: 4,
                backgroundColor:
                  activeIndex === i ? "var(--a700)" : "#D1D5DB",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Slot computation — determines each card's role via index rotation
// ═══════════════════════════════════════════════════════════════════════════════

type Slot = "left" | "center" | "right" | "hiddenLeft" | "hiddenRight";

function computeSlot(cardIndex: number, activeIndex: number, total: number): Slot {
  const diff = ((cardIndex - activeIndex) % total + total) % total;
  if (diff === 0) return "center";
  if (diff === 1) return "right";
  if (diff === total - 1) return "left";
  if (diff <= Math.floor(total / 2)) return "hiddenRight";
  return "hiddenLeft";
}

function getSlotStyle(slot: Slot, offset: number) {
  switch (slot) {
    case "center":
      return { x: 0, scale: 1, opacity: 1, rotateY: 0, zIndex: 3 };
    case "left":
      return { x: -offset, scale: 0.82, opacity: 0.5, rotateY: 8, zIndex: 1 };
    case "right":
      return { x: offset, scale: 0.82, opacity: 0.5, rotateY: -8, zIndex: 1 };
    case "hiddenLeft":
      return { x: -offset * 2, scale: 0.7, opacity: 0, rotateY: 8, zIndex: 0 };
    case "hiddenRight":
      return { x: offset * 2, scale: 0.7, opacity: 0, rotateY: -8, zIndex: 0 };
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// CarouselCard — absolutely positioned, strictly horizontal translate3d motion
// ═══════════════════════════════════════════════════════════════════════════════

function CarouselCard({
  industry,
  slot,
  cardOffset,
  onClick,
}: {
  industry: IndustryCardData;
  slot: Slot;
  cardOffset: number;
  onClick?: () => void;
}) {
  const isCenter = slot === "center";
  const isVisible = slot === "left" || slot === "center" || slot === "right";
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const target = getSlotStyle(slot, cardOffset);

  // ─── Cursor-reactive lighting (center card only) ───────────────────────────
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const lightX = useTransform(mouseX, (v) => `${v * 100}%`);
  const lightY = useTransform(mouseY, (v) => `${v * 100}%`);
  const lightBg = useTransform(
    [lightX, lightY],
    ([lx, ly]) =>
      `radial-gradient(circle at ${lx} ${ly}, rgba(255,255,255,${isHovered ? 0.18 : 0.08}), transparent 40%)`,
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isCenter) return;
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [isCenter, mouseX, mouseY],
  );

  return (
    <motion.div
      ref={cardRef}
      initial={false}
      animate={{
        x: target.x,
        scale: target.scale,
        opacity: target.opacity,
        rotateY: target.rotateY,
      }}
      transition={TRANSITION}
      onMouseEnter={() => isCenter && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className="absolute inset-x-0 top-0 mx-auto w-full max-w-105 cursor-pointer overflow-hidden rounded-lg shadow-xl"
      style={{
        zIndex: target.zIndex,
        transformStyle: "preserve-3d",
        willChange: "transform",
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      {/* Card image — tall 4:5 aspect */}
      <div className="relative aspect-4/5 w-full">
        <Image
          src={industry.image}
          alt={industry.title}
          fill
          sizes="(max-width: 768px) 80vw, 33vw"
          className="object-cover"
        />

        {/* Gradient overlay for text legibility */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-1"
          style={{
            background:
              "linear-gradient(to top, rgba(8,18,30,0.55) 0%, rgba(8,18,30,0.22) 45%, rgba(8,18,30,0.06) 100%)",
          }}
        />

        {/* Cursor-reactive radial light — center card only */}
        {isCenter && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-2"
            style={{
              background: lightBg,
              opacity: isHovered ? 1 : 0.5,
              transition: "opacity 120ms ease",
            }}
          />
        )}

        {/* Hover overlay — description + CTA, center card only */}
        {isCenter && (
          <motion.div
            className="absolute inset-0 z-3 flex flex-col justify-end p-6"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ backgroundColor: "rgba(8,18,30,0.55)" }}
          >
            <p className="mb-5 text-sm leading-relaxed text-white/90 md:text-[0.9375rem]">
              {industry.description}
            </p>
            <div className="flex justify-end">
              <Link
                href={industry.href}
                className="rounded-md border border-white/30 bg-white/15 px-5 py-2.5 text-[0.8125rem] font-semibold text-white transition-colors hover:bg-white/25"
              >
                Explore Industry
              </Link>
            </div>
          </motion.div>
        )}

        {/* Title label — always visible, fades on center hover */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-4 px-6 pb-6"
          animate={{ opacity: isHovered && isCenter ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-white drop-shadow-md md:text-xl">
            {industry.title}
          </h3>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// NavButton — minimal circular control
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
      className="flex size-11 items-center justify-center rounded-md border border-neutral-300 bg-white text-neutral-700 transition-colors hover:bg-neutral-100"
    >
      {children}
    </button>
  );
}
