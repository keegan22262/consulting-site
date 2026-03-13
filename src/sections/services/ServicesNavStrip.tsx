"use client";

import { useRef } from "react";
import type { ServiceItem } from "./data";

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
 * Layout: Figma reference â€” figma-reference/rslservices.tsx â†’ ServicesNavStrip
 * Spacing: py-3 pills, px-4 button padding (space-16), px-8 container
 */
export default function ServicesNavStrip({ services }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleClick = (slug: string) => {
    const el = document.getElementById(`service-${slug}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="sticky top-0 z-10 border-b border-(--n200) bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div
          ref={scrollRef}
          className="flex items-stretch gap-1 overflow-x-auto py-3"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {services.map((svc) => (
            <button
              key={svc.slug}
              onClick={() => handleClick(svc.slug)}
              className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded px-4 py-2.5 text-[13px] font-medium leading-none text-(--n700) transition-colors duration-150 hover:bg-[rgba(27,58,92,0.06)] hover:text-(--a700)"
            >
              {SHORT_TITLES[svc.slug] ?? svc.title}
              <span className="text-xs opacity-40">â†’</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


