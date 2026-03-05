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
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";

// ─── Constants ───────────────────────────────────────────────────────────────
const AUTO_INTERVAL = 5000;
const SPRING = { type: "spring" as const, stiffness: 120, damping: 20, mass: 0.6 };

// ─── Industry data ───────────────────────────────────────────────────────────
const INDUSTRIES = [
  {
    title: "Financial Services",
    image: "/images/industries/industry-1.jpg",
    description:
      "Transforming financial institutions through digital modernization and regulatory strategy.",
    href: "/industries/financial-services",
  },
  {
    title: "Energy & Infrastructure",
    image: "/images/industries/industry-2.jpg",
    description:
      "Advising energy leaders navigating the global transition toward sustainable systems.",
    href: "/industries/energy-resources",
  },
  {
    title: "Healthcare",
    image: "/images/industries/industry-3.jpg",
    description:
      "Driving healthcare innovation through operational transformation and policy insight.",
    href: "/industries/healthcare",
  },
  {
    title: "Technology",
    image: "/images/industries/industry-4.jpg",
    description:
      "Accelerating digital transformation and AI-enabled enterprise platforms.",
    href: "/industries/technology-digital",
  },
  {
    title: "Public Sector",
    image: "/images/industries/industry-5.jpg",
    description:
      "Partnering with governments to modernize institutions and strengthen public services.",
    href: "/industries/public-sector",
  },
  {
    title: "Consumer Markets",
    image: "/images/industries/industry-6.jpg",
    description:
      "Supporting global brands navigating evolving consumer behavior and supply chains.",
    href: "/industries/consumer-markets",
  },
] as const;

const TOTAL = INDUSTRIES.length;

// ═══════════════════════════════════════════════════════════════════════════════
// Main section
// ═══════════════════════════════════════════════════════════════════════════════
export default function FeaturedIndustriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const wheelCooldown = useRef(false);

  const prevIndex = (activeIndex - 1 + TOTAL) % TOTAL;
  const nextIndex = (activeIndex + 1) % TOTAL;

  // ─── Autoplay ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TOTAL);
    }, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [isPaused]);

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

      // Smooth exit: at boundaries, let page scroll naturally
      if (e.deltaX > 0 && activeIndex >= TOTAL - 1) return;
      if (e.deltaX < 0 && activeIndex <= 0) return;

      // Debounce to prevent rapid multi-fire
      if (wheelCooldown.current) return;
      wheelCooldown.current = true;
      setTimeout(() => { wheelCooldown.current = false; }, 600);

      e.preventDefault();

      if (e.deltaX > 0) {
        setActiveIndex((prev) => Math.min(prev + 1, TOTAL - 1));
      } else {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
      setIsPaused(true);
    };

    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [activeIndex]);

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % TOTAL);
    setIsPaused(true);
  }, []);

  const retreat = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + TOTAL) % TOTAL);
    setIsPaused(true);
  }, []);

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
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0A0A0A] py-16 md:py-20 lg:py-24"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Section header */}
      <div className="layout-container mb-10 md:mb-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Industries
        </span>
        <h2 className="mt-1.5 text-2xl font-bold text-white">Industries</h2>
        <div className="my-5 h-0.5 w-12 bg-accent-primary" />
        <p className="max-w-prose text-sm leading-relaxed text-neutral-400">
          Advisory expertise across the sectors shaping global economic
          transformation.
        </p>
      </div>

      {/* ── 3-lane carousel grid ── */}
      <div
        className="mx-auto grid max-w-7xl grid-cols-[1fr_1.4fr_1fr] items-center gap-4 px-4 md:gap-6 lg:gap-8"
        style={{ perspective: "1200px" }}
      >
        <AnimatePresence mode="popLayout">
          {([
            { idx: prevIndex, lane: "left" as Lane, onClick: retreat },
            { idx: activeIndex, lane: "center" as Lane, onClick: undefined },
            { idx: nextIndex, lane: "right" as Lane, onClick: advance },
          ] as const).map(({ idx, lane, onClick }) => (
            <LaneCard
              key={idx}
              industry={INDUSTRIES[idx]}
              lane={lane}
              onClick={onClick}
            />
          ))}
        </AnimatePresence>
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
        {INDUSTRIES.map((ind, i) => (
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
                activeIndex === i ? "#FFFFFF" : "rgba(255,255,255,0.3)",
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
// LaneCard — sits inside its grid lane, animated with Framer Motion
// ═══════════════════════════════════════════════════════════════════════════════

type Lane = "left" | "center" | "right";

const laneVariants = {
  left: { scale: 0.82, opacity: 0.5, rotateY: 8, zIndex: 1 },
  center: { scale: 1, opacity: 1, rotateY: 0, zIndex: 3 },
  right: { scale: 0.82, opacity: 0.5, rotateY: -8, zIndex: 1 },
};

function LaneCard({
  industry,
  lane,
  onClick,
}: {
  industry: (typeof INDUSTRIES)[number];
  lane: Lane;
  onClick?: () => void;
}) {
  const isCenter = lane === "center";
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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
      layout
      initial={{ opacity: 0.8, scale: 0.92 }}
      animate={laneVariants[lane]}
      exit={{ opacity: 0.8, scale: 0.92 }}
      transition={SPRING}
      onMouseEnter={() => isCenter && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className="relative mx-auto w-full max-w-105 cursor-pointer overflow-hidden rounded-lg shadow-xl"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Card image — tall 4:5 aspect like BCG cards */}
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
              "linear-gradient(to top, rgba(12,28,46,0.7) 0%, rgba(12,28,46,0.2) 45%, rgba(12,28,46,0.05) 100%)",
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
            style={{ backgroundColor: "rgba(12,28,46,0.75)" }}
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
      className="flex size-11 items-center justify-center rounded-full border border-neutral-700 bg-transparent text-neutral-300 transition-colors hover:bg-neutral-800"
    >
      {children}
    </button>
  );
}
