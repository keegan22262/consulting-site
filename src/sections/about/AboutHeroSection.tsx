"use client";

import Link from "next/link";
import ScrollReveal from "@/src/components/ScrollReveal";
import { useScrollReveal } from "@/src/hooks/useScrollReveal";

const STATS = [
  { value: "10", label: "Integrated Advisory Disciplines" },
  { value: "11", label: "Industry Sectors Served" },
  { value: "4", label: "Phase Delivery Methodology" },
  { value: "100%", label: "Senior-Led Engagement Teams" },
];

export default function AboutHeroSection() {
  const heading = useScrollReveal({ direction: "up", delay: 200, distance: 30, duration: 900 });
  const subtext = useScrollReveal({ direction: "up", delay: 400, distance: 25, duration: 900 });
  const cta = useScrollReveal({ direction: "up", delay: 600, distance: 20, duration: 800 });
  const statsCard = useScrollReveal({ direction: "up", delay: 300, distance: 50, duration: 1000, threshold: 0.05 });

  return (
    <section aria-labelledby="about-hero-title" className="relative w-full">
      <div className="relative h-[420px] md:h-[540px] lg:h-[600px] overflow-hidden">
        <img
          src="/images/about/about-hero.jpg"
          alt="Corporate skyline - institutional presence of Rill Singh Limited"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(2,16,36,0.35) 0%, rgba(5,38,89,0.55) 60%, rgba(5,38,89,0.7) 100%)" }}
        />

        <div className="relative h-full flex items-center">
          <div className="max-w-[1200px] mx-auto w-full px-6 md:px-10">
            <h1
              id="about-hero-title"
              ref={heading.ref as React.RefObject<HTMLHeadingElement>}
              className="text-[32px] md:text-[46px] lg:text-[52px] text-white leading-tight"
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                fontWeight: 400,
                textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                ...heading.style,
              }}
            >
              About Rill Singh Limited
            </h1>
            <p
              ref={subtext.ref as React.RefObject<HTMLParagraphElement>}
              className="mt-4 max-w-[560px] text-[15px] md:text-[17px] leading-[1.7]"
              style={{
                fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                color: "rgba(255,255,255,0.85)",
                textShadow: "0 1px 3px rgba(0,0,0,0.3)",
                ...subtext.style,
              }}
            >
              We partner with institutions to solve complex strategic challenges,
              build resilient organizations, and deliver long-term value.
            </p>
            <div ref={cta.ref as React.RefObject<HTMLDivElement>} style={cta.style}>
              <Link
                href="/contact"
                className="inline-block mt-6 px-8 py-3 rounded-[6px] text-[13px] uppercase tracking-[1.5px] text-white transition-all duration-300 hover:brightness-110"
                style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", backgroundColor: "#5483B3", fontWeight: 500 }}
              >
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Overlapping stats card */}
      <div
        ref={statsCard.ref as React.RefObject<HTMLDivElement>}
        className="relative z-10 -mt-[60px] max-w-[1000px] mx-auto px-4 md:px-6"
        style={statsCard.style}
      >
        <div className="bg-white rounded-2xl px-6 py-8 md:px-12 md:py-10" style={{ boxShadow: "0 20px 60px rgba(2,16,36,0.1)" }}>
          {/* Desktop: row layout */}
          <div className="hidden md:flex items-stretch justify-between">
            {STATS.map((stat, i) => (
              <ScrollReveal key={stat.label} direction="up" delay={500 + i * 150} distance={20} duration={700} className="flex items-stretch flex-1">
                <div className="flex-1 text-center px-5">
                  <div className="text-[40px] leading-none" style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontWeight: 600, color: "#052659" }}>
                    {stat.value}
                  </div>
                  <div className="mt-2 text-[13px]" style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", color: "#6B7280" }}>
                    {stat.label}
                  </div>
                </div>
                {i < STATS.length - 1 && <div className="w-px self-stretch" style={{ backgroundColor: "#C1E8FF" }} />}
              </ScrollReveal>
            ))}
          </div>

          {/* Mobile: 2x2 grid */}
          <div className="grid grid-cols-2 gap-6 md:hidden">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="text-center" style={{ paddingBottom: i < 2 ? "24px" : "0", borderBottom: i < 2 ? "1px solid #C1E8FF" : "none" }}>
                <div className="text-[32px] leading-none" style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontWeight: 600, color: "#052659" }}>
                  {stat.value}
                </div>
                <div className="mt-2 text-[12px]" style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", color: "#6B7280" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
