"use client";

import Link from "next/link";

export const INSIGHT_CAROUSEL_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
export const INSIGHT_CARD_H = 520;

export interface InsightCardData {
  category: string;
  title: string;
  excerpt: string;
  source: string;
  image: string;
  slug: string;
}

export interface InsightCarouselCardProps {
  insight: InsightCardData;
  isActive: boolean;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
  cardWidthPercent: number;
  isMobile: boolean;
  cardHeight?: number;
}

export default function InsightCarouselCard({
  insight,
  isActive,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onClick,
  cardWidthPercent,
  isMobile,
  cardHeight,
}: InsightCarouselCardProps) {
  const cardH = cardHeight ?? (isMobile ? 400 : INSIGHT_CARD_H);

  return (
    <div
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={onClick}
      style={{
        flexShrink: 0,
        width: `${cardWidthPercent}vw`,
        height: `${cardH}px`,
        marginRight: "64px",
        borderRadius: "16px",
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        backgroundColor: "rgba(8,18,30,0.12)",
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
        boxShadow: isHovered
          ? "0px 24px 48px rgba(0,0,0,0.35)"
          : "0px 18px 36px rgba(0,0,0,0.28)",
        opacity: isActive ? 1 : 0.7,
        transform: isActive ? "scale(1)" : "scale(0.92)",
        transition: `opacity 700ms ${INSIGHT_CAROUSEL_EASING}, transform 700ms ${INSIGHT_CAROUSEL_EASING}, box-shadow 240ms ${INSIGHT_CAROUSEL_EASING}`,
        willChange: "transform, opacity",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${insight.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: isHovered ? "scale(1.02)" : "scale(1)",
          transition: `transform 600ms ${INSIGHT_CAROUSEL_EASING}`,
          willChange: "transform",
          zIndex: 0,
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(to right, rgba(8,18,30,0.55), rgba(8,18,30,0.28), rgba(8,18,30,0.06))",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          height: "100%",
          paddingLeft: isMobile ? "24px" : "56px",
          paddingRight: isMobile ? "24px" : "56px",
          paddingBottom: isMobile ? "32px" : "48px",
          paddingTop: "48px",
          maxWidth: isMobile ? "100%" : "520px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "rgba(255,255,255,0.65)",
            marginBottom: "12px",
          }}
        >
          {insight.category}
        </span>

        <h3
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: isMobile ? "1.375rem" : "1.75rem",
            fontWeight: 600,
            lineHeight: "1.25",
            color: "#FFFFFF",
            marginBottom: "16px",
          }}
        >
          {insight.title}
        </h3>

        <p
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "0.9375rem",
            lineHeight: "1.65",
            color: "rgba(255,255,255,0.78)",
            marginBottom: "20px",
            maxWidth: "480px",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {insight.excerpt}
        </p>

        <span
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "0.75rem",
            fontWeight: 400,
            color: "rgba(255,255,255,0.5)",
            marginBottom: "20px",
          }}
        >
          {insight.source}
        </span>

        <Link
          href={`/insights/${insight.slug}`}
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "#FFFFFF",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            position: "relative",
            paddingBottom: "2px",
            borderBottom: isHovered ? "2px solid #FFFFFF" : "1px solid rgba(255,255,255,0.4)",
            transition: `border-bottom-width 300ms ${INSIGHT_CAROUSEL_EASING}, border-bottom-color 300ms ${INSIGHT_CAROUSEL_EASING}`,
            width: "fit-content",
          }}
          onClick={(event) => event.stopPropagation()}
        >
          Read Full Insight
          <span
            style={{
              fontSize: "0.9em",
              transition: `transform 300ms ${INSIGHT_CAROUSEL_EASING}`,
              transform: isHovered ? "translateX(4px)" : "translateX(0px)",
              display: "inline-block",
            }}
          >
            -&gt;
          </span>
        </Link>
      </div>
    </div>
  );
}
