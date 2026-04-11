"use client";

import Link from "next/link";
import { useScrollReveal } from "@/src/hooks/useScrollReveal";

export default function AboutCTASection() {
  const heading = useScrollReveal({ direction: "up", delay: 200, distance: 30, duration: 900 });
  const subtext = useScrollReveal({ direction: "up", delay: 400, distance: 25, duration: 800 });
  const buttons = useScrollReveal({ direction: "up", delay: 600, distance: 20, duration: 800 });

  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      <img
        src="/images/about/cta-bg.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: "linear-gradient(160deg, rgba(2,16,36,0.78) 0%, rgba(5,38,89,0.65) 50%, rgba(2,16,36,0.75) 100%)",
        }}
      />

      <div className="relative z-10 text-center px-6 md:px-10">
        <h2
          ref={heading.ref as React.RefObject<HTMLHeadingElement>}
          className="text-[34px] md:text-[42px] text-white"
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontWeight: 400,
            textShadow: "0 2px 12px rgba(0,0,0,0.4)",
            ...heading.style,
          }}
        >
          Begin a Conversation
        </h2>
        <p
          ref={subtext.ref as React.RefObject<HTMLParagraphElement>}
          className="text-[16px] max-w-[560px] mx-auto mt-3 mb-8"
          style={{
            fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
            color: "rgba(255,255,255,0.75)",
            textShadow: "0 1px 4px rgba(0,0,0,0.3)",
            ...subtext.style,
          }}
        >
          Engage with our advisory team to explore how we can support your
          institution&apos;s strategic transformation.
        </p>
        <div
          ref={buttons.ref as React.RefObject<HTMLDivElement>}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={buttons.style}
        >
          <Link
            href="/contact"
            className="inline-block px-9 py-3.5 rounded-[6px] text-white text-[14px] font-medium transition-all duration-300 hover:brightness-110"
            style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", backgroundColor: "#5483B3" }}
          >
            Schedule an Introduction
          </Link>
          <Link
            href="/services"
            className="inline-block px-9 py-3.5 rounded-[6px] text-white text-[14px] font-medium transition-all duration-300 hover:bg-white/10"
            style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", border: "1px solid rgba(255,255,255,0.3)" }}
          >
            Explore Our Services
          </Link>
        </div>
      </div>
    </section>
  );
}
