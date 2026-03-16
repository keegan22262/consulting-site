"use client";

import { useState } from "react";
import Link from "next/link";
import SectionHeader from "@/components-v2/sections/SectionHeader";
import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import { INSIGHT_CAROUSEL_EASING } from "@/components-v2/ui/InsightCarouselCard";
import { SERVICE_IMAGES } from "@/src/sections/service-detail/images";

export type InsightRelatedService = {
  slug: string;
  title: string;
  description: string;
};

export default function InsightRelatedServicesSection({ relatedServices }: { relatedServices: InsightRelatedService[] }) {
  if (relatedServices.length === 0) return null;

  return (
    <SectionWrapper background="neutral50" padV={{ mobile: 56, tablet: 72, desktop: 96 }}>
      <div className="flex items-center justify-between">
        <SectionHeader overline="Advisory" title="Relevant Advisory Services" showAccentRule={false} />
        <Link href="/services" className="text-sm font-medium text-accent-primary hover:underline">
          Explore all services →
        </Link>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedServices.slice(0, 3).map((service) => (
          <CinematicServiceCard
            key={service.slug}
            slug={service.slug}
            title={service.title}
            description={service.description}
            image={SERVICE_IMAGES[service.slug] ?? SERVICE_IMAGES.strategy}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}

function CinematicServiceCard({
  slug,
  title,
  description,
  image,
}: {
  slug: string;
  title: string;
  description: string;
  image: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/services/${slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        position: "relative",
        overflow: "hidden",
        borderRadius: "12px",
        height: "340px",
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
          {title}
        </h3>

        {description ? (
          <p
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "0.875rem",
              lineHeight: "1.55",
              color: "rgba(255,255,255,0.75)",
              marginBottom: "12px",
              maxHeight: hovered ? "60px" : "0px",
              overflow: "hidden",
              opacity: hovered ? 1 : 0,
              transition: `max-height 300ms ${INSIGHT_CAROUSEL_EASING}, opacity 240ms ${INSIGHT_CAROUSEL_EASING}`,
            }}
          >
            {description}
          </p>
        ) : null}

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
          Explore Service →
        </span>
      </div>
    </Link>
  );
}
