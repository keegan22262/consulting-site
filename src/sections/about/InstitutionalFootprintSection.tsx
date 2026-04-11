"use client";

import ScrollReveal from "@/src/components/ScrollReveal";
import { useScrollReveal } from "@/src/hooks/useScrollReveal";

const INDUSTRIES = [
  "Financial Services", "Technology", "Energy", "Healthcare", "Public Sector",
  "Real Estate", "Manufacturing", "Education", "Media", "Logistics", "Professional Services",
];

export default function InstitutionalFootprintSection() {
  const labelReveal = useScrollReveal({ direction: "left", delay: 100, distance: 30, duration: 800 });
  const headingReveal = useScrollReveal({ direction: "left", delay: 200, distance: 30, duration: 800 });
  const bodyReveal = useScrollReveal({ direction: "up", delay: 300, distance: 25, duration: 800 });
  const imageReveal = useScrollReveal({ direction: "right", delay: 200, distance: 50, duration: 900 });

  return (
    <section className="bg-white py-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-1/2">
            <span
              ref={labelReveal.ref as React.RefObject<HTMLSpanElement>}
              className="block text-[12px] uppercase tracking-[4px] mb-3"
              style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", color: "#5483B3", ...labelReveal.style }}
            >
              INSTITUTIONAL REACH
            </span>
            <h2
              ref={headingReveal.ref as React.RefObject<HTMLHeadingElement>}
              className="text-[34px] mb-5"
              style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontWeight: 400, color: "#021024", ...headingReveal.style }}
            >
              Institutional Footprint.
            </h2>
            <p
              ref={bodyReveal.ref as React.RefObject<HTMLParagraphElement>}
              className="text-[15px] leading-[1.75]"
              style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", color: "#4A4A4A", ...bodyReveal.style }}
            >
              Global and regional advisory engagements across emerging and
              established markets. Our teams operate on the ground in key African
              economic hubs, with connectivity to international advisory networks.
              Our advisory work spans industries, institutions, and geographies —
              helping organizations navigate complex transformation challenges.
            </p>

            <div className="flex flex-wrap gap-2.5 mt-8">
              {INDUSTRIES.map((industry, i) => (
                <ScrollReveal key={industry} direction="up" delay={400 + i * 60} distance={15} duration={500} as="span">
                  <span
                    className="inline-block text-[12px] px-4 py-1.5 rounded-[20px]"
                    style={{
                      fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                      backgroundColor: "#F8FBFF",
                      border: "1px solid rgba(84,131,179,0.15)",
                      color: "#052659",
                    }}
                  >
                    {industry}
                  </span>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div
            className="w-full lg:w-1/2"
            ref={imageReveal.ref as React.RefObject<HTMLDivElement>}
            style={imageReveal.style}
          >
            <div className="relative overflow-hidden rounded-xl shadow-2xl">
              <img
                src="/images/about/footprint-map.jpg"
                alt="Global advisory presence - world and Africa map"
                className="w-full h-[300px] md:h-[400px] lg:h-[460px] object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
