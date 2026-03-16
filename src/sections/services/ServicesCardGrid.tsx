"use client";

import { useState } from "react";
import Link from "next/link";
import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";
import { useScrollReveal } from "@/components-v2/foundation/useScrollReveal";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";
import type { ServiceItem } from "./data";

interface Props {
  services: ServiceItem[];
  overline?: string;
  title?: string;
  description?: string;
}

/**
 * ServicesCardGrid
 *
 * Dark navy grid of service cards. 3-col desktop / 2-col tablet / 1-col mobile.
 * Each card links to /services/[slug].
 * IDs are set on each card anchor so ServicesNavStrip can scroll to them.
 *
 * Layout: Figma reference — figma-reference/rslservices.tsx → ServiceGridSection
 * Background: --a900 (deep navy, #0C1C2E)
 * Card style: translucent navy, orange top accent, white text, hover lightens bg.
 * Spacing: section py-24 (96px); card p-7 (28px); grid gap-6 (24px); mt-12 after header
 * Typography: overline caption, H2 title, H3 card title, 14px body, 13px CTA
 */
export default function ServicesCardGrid({
  services,
  overline = "Professional Services",
  title = "Advisory Disciplines",
  description,
}: Props) {
  const gridCols = useResponsiveValue({
    desktop: "repeat(3, 1fr)",
    tablet: "repeat(2, 1fr)",
    mobile: "1fr",
  });
  const gridGap = useResponsiveValue({ desktop: "24px", tablet: "20px", mobile: "16px" });
  const gridMarginTop = useResponsiveValue({ desktop: "48px", tablet: "40px", mobile: "32px" });

  return (
    <SectionWrapper background="primary" padV={{ mobile: 48, tablet: 64, desktop: 80 }}>
      <SectionHeader
        overline={overline}
        title={title}
        description={description}
        showAccentRule={false}
        overlineColor="rgba(255, 255, 255, 0.6)"
        titleColor="#FFFFFF"
        descriptionColor="rgba(255, 255, 255, 0.72)"
        maxWidth="60ch"
      />

      <div
        style={{
          maxWidth: "1200px",
          marginLeft: "auto",
          marginRight: "auto",
          display: "grid",
          gridTemplateColumns: gridCols,
          gap: gridGap,
          marginTop: gridMarginTop,
        }}
      >
        {services.map((svc, index) => (
          <ServiceDarkCard key={svc.slug} service={svc} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}

function ServiceDarkCard({ service, index }: { service: ServiceItem; index: number }) {
  const [revealRef, revealStyle] = useScrollReveal(index % 3);
  const [hovered, setHovered] = useState(false);
  const padding = useResponsiveValue({ desktop: "28px", tablet: "24px", mobile: "20px" });
  const minHeight = useResponsiveValue({ desktop: "280px", tablet: "260px", mobile: "auto" });
  const titleSize = useResponsiveValue({ desktop: "1.25rem", tablet: "1.125rem", mobile: "1.0625rem" });
  const bodySize = useResponsiveValue({ desktop: "0.875rem", tablet: "0.8125rem", mobile: "0.8125rem" });
  const cardBg = hovered ? "rgba(27, 58, 92, 0.55)" : "rgba(27, 58, 92, 0.35)";
  const titleColor = hovered ? "var(--o500)" : "#FFFFFF";
  const ctaColor = hovered ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)";
  const description = service.approach || service.focusAreas;

  return (
    <div
      id={`service-${service.slug}`}
      ref={revealRef}
      style={revealStyle}
    >
      <Link
        href={`/services/${service.slug}`}
        className="flex flex-col rounded-(--radius-card) border-t-[3px] border-t-(--o500) no-underline transition-colors duration-[120ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
        style={{
          backgroundColor: cardBg,
          padding,
          minHeight,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Card title */}
        <h3
          className="font-semibold transition-colors duration-[120ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
          style={{ fontSize: titleSize, lineHeight: "1.3", color: titleColor }}
        >
          {service.title}
        </h3>

        {/* Card body — approach copy */}
        {description ? (
          <p
            className="mt-3 grow leading-[1.6]"
            style={{ fontSize: bodySize, color: "rgba(255, 255, 255, 0.72)" }}
          >
            {description}
          </p>
        ) : null}

        {/* Explore CTA */}
        <span
          className="mt-5 inline-block text-[0.8125rem] font-semibold transition-colors duration-[120ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
          style={{ color: ctaColor }}
        >
          Explore
        </span>
      </Link>
    </div>
  );
}
