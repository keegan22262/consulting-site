"use client";

import { useRef } from "react";
import type { ServiceItem } from "./data";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";

// Short display labels for the sticky nav strip.
const SHORT_TITLES: Record<string, string> = {
  strategy: "Strategy",
  digital: "Digital & AI",
  finance: "Finance & Risk",
  people: "People & Org",
  esg: "ESG & Sustainability",
  public: "Public Sector",
  comms: "Digital Comms",
  tax: "Tax & Assets",
  legal: "Legal & Compliance",
  sme: "SME Growth",
};

interface Props {
  services: Pick<ServiceItem, "slug" | "title">[];
}

/**
 * ServicesNavStrip
 *
 * Sticky horizontal scrollable strip below the hero.
 * Clicking a pill smooth-scrolls to the matching service card (id="service-{slug}").
 * Layout: Figma reference - figma-reference/rslservices.tsx -> ServicesNavStrip
 * Spacing: py-3 pills, px-4 button padding (space-16), px-8 container
 */
export default function ServicesNavStrip({ services }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const px = useResponsiveValue({ desktop: "32px", tablet: "32px", mobile: "16px" });
  const gap = useResponsiveValue({ desktop: "8px", tablet: "8px", mobile: "4px" });

  const handleClick = (slug: string) => {
    const el = document.getElementById(`service-${slug}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section className="sticky top-0 z-8 border-b border-(--n200) bg-white">
      <div className="mx-auto max-w-[1280px]" style={{ paddingLeft: px, paddingRight: px }}>
        <div
          ref={scrollRef}
          className="flex items-stretch overflow-x-auto"
          style={{
            gap,
            paddingTop: "12px",
            paddingBottom: "12px",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          } as React.CSSProperties}
        >
          {services.map((svc) => (
            <button
              key={svc.slug}
              onClick={() => handleClick(svc.slug)}
              className="group inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-[4px] text-[0.8125rem] font-medium leading-none text-(--n700) transition-colors duration-[120ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
              style={{
                paddingTop: "10px",
                paddingBottom: "10px",
                paddingLeft: "16px",
                paddingRight: "16px",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(27, 58, 92, 0.06)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--a700)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--n700)";
              }}
            >
              {SHORT_TITLES[svc.slug] ?? svc.title}
              <span className="text-[0.75rem] opacity-40 transition-opacity duration-[120ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:opacity-100">
                {"->"}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}


