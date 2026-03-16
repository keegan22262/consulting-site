"use client";

import { useState } from "react";
import Link from "next/link";
import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import { INSIGHT_CAROUSEL_EASING } from "@/components-v2/ui/InsightCarouselCard";
import { INSIGHTS_DATA } from "@/src/sections/insights/data";

interface RelatedInsight {
  slug: string;
  title: string;
  category: string;
}

interface InsightsRelatedSectionProps {
  insights: RelatedInsight[];
}

const FALLBACK_IMAGES = [
  "/images/insights/insight-1.jpg",
  "/images/insights/insight-2.jpg",
  "/images/insights/insight-3.jpg",
  "/images/insights/insight-4.jpg",
  "/images/insights/insight-5.jpg",
];

export default function InsightsRelatedSection({ insights }: InsightsRelatedSectionProps) {
  return (
    <SectionWrapper background="white" padV={{ mobile: 56, tablet: 72, desktop: 96 }}>
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-8">
          <div className="h-0.5 w-12 bg-[var(--a700)]" />
          <span className="mt-6 block text-xs font-semibold uppercase tracking-[0.06em] text-text-muted">
            Continue Exploring
          </span>
          <h2 className="mt-3 text-[1.5rem] font-semibold leading-[1.2] text-text-primary md:text-[2rem]">
            Related Insights
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {insights.slice(0, 3).map((item, index) => {
            const match = INSIGHTS_DATA.find((entry) => entry.slug === item.slug);
            const image = match?.image ?? FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
            const title = match?.headline ?? item.title;
            const category = match?.category ?? item.category;
            const date = match?.date ?? "";
            const readTime = match?.readTime ?? "";

            return (
              <CinematicInsightCard
                key={item.slug}
                slug={item.slug}
                title={title}
                category={category}
                image={image}
                date={date}
                readTime={readTime}
              />
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}

function CinematicInsightCard({
  slug,
  title,
  category,
  image,
  date,
  readTime,
}: {
  slug: string;
  title: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
}) {
  const [hovered, setHovered] = useState(false);
  const meta = [formatDate(date), readTime].filter(Boolean).join(" • ");

  return (
    <Link
      href={`/insights/${slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        position: "relative",
        overflow: "hidden",
        borderRadius: "12px",
        height: "380px",
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
            ? "linear-gradient(180deg, rgba(12,28,46,0.25) 0%, rgba(12,28,46,0.88) 65%, rgba(12,28,46,0.95) 100%)"
            : "linear-gradient(180deg, rgba(12,28,46,0.15) 0%, rgba(12,28,46,0.75) 60%, rgba(12,28,46,0.92) 100%)",
          transition: `background 300ms ${INSIGHT_CAROUSEL_EASING}`,
        }}
      />

      <div style={{ position: "absolute", top: 0, left: 0, paddingTop: "20px", paddingLeft: "24px", zIndex: 2 }}>
        <span
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "0.6875rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          {category}
        </span>
      </div>

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
            fontSize: hovered ? "1.125rem" : "1.0625rem",
            fontWeight: 600,
            lineHeight: "1.3",
            color: "#FFFFFF",
            marginBottom: "8px",
            transition: `font-size 240ms ${INSIGHT_CAROUSEL_EASING}`,
          }}
        >
          {title}
        </h3>

        {meta ? (
          <span
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "0.6875rem",
              color: "rgba(255,255,255,0.45)",
              display: "block",
              marginBottom: "12px",
            }}
          >
            RSL Perspectives • {meta}
          </span>
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
          Read Insight →
        </span>
      </div>
    </Link>
  );
}

function formatDate(dateStr: string): string | null {
  if (!dateStr) return null;
  const date = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}
