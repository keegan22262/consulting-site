"use client";

import { useState } from "react";
import Link from "next/link";
import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import { INSIGHT_CAROUSEL_EASING } from "@/components-v2/ui/InsightCarouselCard";
import { INDUSTRY_IMAGES } from "@/src/sections/industries/data";

export type InsightRelatedIndustry = {
  id: string;
  label: string;
};

const FALLBACK_IMAGE = "/images/industries/sectors/financial-services.jpg";

export default function InsightRelatedIndustriesSection({ industries }: { industries: InsightRelatedIndustry[] }) {
  if (industries.length === 0) return null;

  return (
    <SectionWrapper background="white" padV={{ mobile: 56, tablet: 72, desktop: 96 }}>
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-8">
          <div className="h-0.5 w-12 bg-[var(--a700)]" />
          <span className="mt-6 block text-xs font-semibold uppercase tracking-[0.06em] text-text-muted">
            Sectors
          </span>
          <h2 className="mt-3 text-[1.5rem] font-semibold leading-[1.2] text-text-primary md:text-[2rem]">
            Industries Where This Insight Applies
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industries.slice(0, 3).map((industry) => (
            <CinematicIndustryCard
              key={industry.id}
              id={industry.id}
              label={industry.label}
              image={INDUSTRY_IMAGES[industry.id] ?? FALLBACK_IMAGE}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function CinematicIndustryCard({ id, label, image }: { id: string; label: string; image: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/industries/${id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        position: "relative",
        overflow: "hidden",
        borderRadius: "12px",
        height: "280px",
        textDecoration: "none",
        cursor: "pointer",
        boxShadow: hovered ? "0 12px 32px rgba(0,0,0,0.18)" : "0 4px 16px rgba(0,0,0,0.08)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: `box-shadow 240ms ${INSIGHT_CAROUSEL_EASING}, transform 240ms ${INSIGHT_CAROUSEL_EASING}`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: `transform 600ms ${INSIGHT_CAROUSEL_EASING}`,
          transform: hovered ? "scale(1.05)" : "scale(1)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? "linear-gradient(180deg, rgba(12,28,46,0.2) 0%, rgba(12,28,46,0.85) 65%, rgba(12,28,46,0.95) 100%)"
            : "linear-gradient(180deg, rgba(12,28,46,0.1) 0%, rgba(12,28,46,0.7) 60%, rgba(12,28,46,0.9) 100%)",
          transition: `background 300ms ${INSIGHT_CAROUSEL_EASING}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingLeft: "24px",
          paddingRight: "24px",
          paddingBottom: "24px",
          paddingTop: "16px",
          zIndex: 2,
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "1.0625rem",
            fontWeight: 600,
            lineHeight: "1.3",
            color: "#FFFFFF",
            marginBottom: "12px",
          }}
        >
          {label}
        </h3>
        <span
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "0.8125rem",
            fontWeight: 600,
            color: "#FFFFFF",
            opacity: hovered ? 1 : 0,
            transition: `opacity 240ms ${INSIGHT_CAROUSEL_EASING}`,
            borderBottomWidth: "1px",
            borderBottomStyle: "solid",
            borderBottomColor: "rgba(255,255,255,0.5)",
            paddingBottom: "2px",
          }}
        >
          Explore Industry →
        </span>
      </div>
    </Link>
  );
}
