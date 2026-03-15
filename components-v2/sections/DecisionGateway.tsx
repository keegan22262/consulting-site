"use client";

// ═══════════════════════════════════════════════════════════════════════════════
// DecisionGateway — "Where should we begin?"
// Atmospheric #F7F8F9 background with blurred texture overlay.
// 6/6 grid: text left, executive image right.
// Floating guidance panel overlapping section bottom by ~40px.
// ═══════════════════════════════════════════════════════════════════════════════

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/components-v2/foundation";

// ─── Guidance card data ──────────────────────────────────────────────────────
const GUIDANCE_ITEMS = [
  {
    title: "Explore by Service",
    description:
      "Navigate the firm\u2019s advisory capabilities and the specific expertise required to address your challenge.",
    href: "/services",
  },
  {
    title: "Explore by Industry",
    description:
      "Discover how our advisory disciplines apply within the regulatory, operational, and market dynamics of your sector.",
    href: "/industries",
  },
] as const;

// ─── Component ───────────────────────────────────────────────────────────────
export default function DecisionGateway() {
  const [sectionRef, sectionStyle] = useScrollReveal();
  const [panelRef, panelStyle] = useScrollReveal(1);

  return (
    <section className="relative overflow-hidden bg-[#F7F8F9] pb-10 lg:pb-0">
      {/* ── Background layers ── */}
      {/* Layer 1: Gradient atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(12,28,46,0.05) 0%, rgba(12,28,46,0.02) 40%, rgba(12,28,46,0) 100%)",
        }}
      />
      {/* Layer 2: Blurred texture — right-aligned, 8% opacity */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[5%] -top-[5%] -bottom-[5%] z-0 w-3/5"
        style={{
          backgroundImage: "url(/images/gateway/bg-texture.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.08,
          filter: "blur(40px)",
          transform: "scale(1.1)",
        }}
      />

      {/* ── Main content ── */}
      <div
        ref={sectionRef}
        style={sectionStyle}
        className="layout-container relative z-1 py-12 md:py-16 lg:pb-20 lg:pt-24"
      >
        {/* 6/6 grid — stacked on mobile, side-by-side desktop */}
        <div className="grid grid-cols-1 items-center gap-8 md:gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Text block — second on mobile (image first), first on desktop */}
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl font-semibold leading-snug tracking-tight text-text-primary md:text-3xl lg:text-4xl lg:leading-tight">
              Where should we begin?
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-text-secondary md:text-lg md:leading-relaxed">
              Every engagement begins with context. You can explore our
              capabilities through the advisory discipline that addresses your
              challenge — or through the industry environment in which your
              organization operates.
            </p>
          </div>

          {/* Executive image — first on mobile, second on desktop */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-4/3 overflow-hidden rounded-card">
              <Image
                src="/images/gateway/executive.jpg"
                alt="Executive professional — strategic advisory context"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile guidance panel (stacked cards) ── */}
      <div
        ref={panelRef}
        style={panelStyle}
        className="layout-container relative z-2 pb-12 lg:hidden"
      >
        <div className="flex flex-col gap-4">
          {GUIDANCE_ITEMS.map((item) => (
            <div
              key={item.href}
              className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm"
            >
              <GuidanceCard {...item} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Desktop floating guidance panel ── */}
      <div className="relative z-2 mx-auto hidden w-full max-w-3xl px-6 lg:-mt-10 lg:block">
        <div className="grid overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg lg:grid-cols-[1fr_1px_1fr]">
          <GuidanceCard {...GUIDANCE_ITEMS[0]} />
          <div className="bg-neutral-200" />
          <GuidanceCard {...GUIDANCE_ITEMS[1]} />
        </div>
      </div>
    </section>
  );
}

// ─── Guidance Card ───────────────────────────────────────────────────────────
function GuidanceCard({
  title,
  description,
  href,
}: (typeof GUIDANCE_ITEMS)[number]) {
  return (
    <Link
      href={href}
      className="group block p-6 transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-50 hover:shadow-md md:p-7"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        <span className="shrink-0 text-xl text-neutral-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent-primary">
          →
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
        {description}
      </p>
    </Link>
  );
}
