"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";
import { useScrollReveal } from "@/components-v2/foundation/useScrollReveal";
import InsightCarouselCard, {
  INSIGHT_CAROUSEL_EASING,
  type InsightCardData,
} from "@/components-v2/ui/InsightCarouselCard";
import type { InsightEntry } from "@/src/sections/insights/data";

interface MorePerspectivesSectionProps {
  insights: InsightEntry[];
}

export default function MorePerspectivesSection({ insights }: MorePerspectivesSectionProps) {
  const carouselData: InsightCardData[] = useMemo(() => {
    return insights.slice(1, 8).map((insight) => ({
      category: insight.category,
      title: insight.headline,
      excerpt: insight.whatItMeans,
      source: formatSource(insight.source),
      image: insight.image,
      slug: insight.slug,
    }));
  }, [insights]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const trackRef = useRef<HTMLDivElement>(null);
  const [revealRef, revealStyle] = useScrollReveal();

  const isMobile = useResponsiveValue({ desktop: false, tablet: false, mobile: true });
  const cardWidthPercent = useResponsiveValue({ desktop: 60, tablet: 70, mobile: 85 });
  const px = useResponsiveValue({ desktop: "32px", tablet: "32px", mobile: "24px" });

  const goTo = useCallback(
    (idx: number) => {
      const clamped = Math.max(0, Math.min(idx, carouselData.length - 1));
      setActiveIndex(clamped);
    },
    [carouselData.length],
  );

  useEffect(() => {
    if (!trackRef.current) return;
    const cardW = (cardWidthPercent / 100) * window.innerWidth;
    const gap = 64;
    const scrollTarget = activeIndex * (cardW + gap) - (window.innerWidth - cardW) / 2;
    trackRef.current.scrollTo({ left: Math.max(0, scrollTarget), behavior: "smooth" });
  }, [activeIndex, cardWidthPercent]);

  return (
    <section
      style={{
        backgroundColor: "var(--a900)",
        paddingTop: useResponsiveValue({ desktop: "96px", tablet: "72px", mobile: "56px" }),
        paddingBottom: useResponsiveValue({ desktop: "96px", tablet: "72px", mobile: "56px" }),
        overflow: "hidden",
      }}
    >
      <div
        ref={revealRef}
        style={{
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: px,
          paddingRight: px,
          marginBottom: useResponsiveValue({ desktop: "40px", tablet: "32px", mobile: "24px" }),
          ...revealStyle,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "0.6875rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "rgba(255,255,255,0.45)",
            display: "block",
            marginBottom: "12px",
          }}
        >
          More Perspectives
        </span>
        <h2
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: useResponsiveValue({ desktop: "2rem", tablet: "1.75rem", mobile: "1.5rem" }),
            fontWeight: 600,
            lineHeight: "1.15",
            letterSpacing: "-0.015em",
            color: "#FFFFFF",
          }}
        >
          Explore Our Latest Thinking
        </h2>
      </div>

      <div
        ref={trackRef}
        style={{
          display: "flex",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          paddingLeft: useResponsiveValue({ desktop: "80px", tablet: "40px", mobile: "24px" }),
          paddingRight: useResponsiveValue({ desktop: "80px", tablet: "40px", mobile: "24px" }),
          paddingBottom: "8px",
        }}
      >
        {carouselData.map((insight, index) => (
          <div key={insight.slug} style={{ scrollSnapAlign: "center" }}>
            <InsightCarouselCard
              insight={insight}
              isActive={index === activeIndex}
              isHovered={index === hoveredIndex}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(-1)}
              onClick={() => goTo(index)}
              cardWidthPercent={cardWidthPercent}
              isMobile={isMobile}
              cardHeight={isMobile ? 380 : 460}
            />
          </div>
        ))}
      </div>

      <div
        style={{
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: px,
          paddingRight: px,
          marginTop: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
        }}
      >
        <CarouselArrow
          direction="left"
          disabled={activeIndex === 0}
          onClick={() => goTo(activeIndex - 1)}
        />
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {carouselData.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              style={{
                width: index === activeIndex ? "24px" : "8px",
                height: "8px",
                borderRadius: "100px",
                backgroundColor: index === activeIndex ? "#FFFFFF" : "rgba(255,255,255,0.3)",
                border: "none",
                cursor: "pointer",
                transition: `width 300ms ${INSIGHT_CAROUSEL_EASING}, background-color 300ms ${INSIGHT_CAROUSEL_EASING}`,
                padding: 0,
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <CarouselArrow
          direction="right"
          disabled={activeIndex === carouselData.length - 1}
          onClick={() => goTo(activeIndex + 1)}
        />
      </div>
    </section>
  );
}

function CarouselArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={disabled}
      style={{
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: disabled
          ? "rgba(255,255,255,0.15)"
          : hovered
            ? "#FFFFFF"
            : "rgba(255,255,255,0.3)",
        backgroundColor: hovered && !disabled ? "rgba(255,255,255,0.1)" : "transparent",
        color: disabled ? "rgba(255,255,255,0.2)" : "#FFFFFF",
        cursor: disabled ? "default" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.125rem",
        transition: "all 200ms ease",
        padding: 0,
      }}
      aria-label={direction === "left" ? "Previous slide" : "Next slide"}
    >
      {direction === "left" ? "←" : "→"}
    </button>
  );
}

function formatSource(source: string) {
  try {
    return new URL(source).hostname.replace("www.", "");
  } catch {
    return "Source";
  }
}
