"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useBp } from "@/lib/breakpoints";
import {
  C,
  F,
  INSIGHT_CARD_H,
  INSIGHT_CAROUSEL_EASING,
  MAX_WIDTH,
  type SectorInsightData,
} from "./data";

export default function SectorInsightsSection({ insights }: { insights: SectorInsightData[] }) {
  const bp = useBp();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const cardWidthPercent = isMobile ? 92 : isTablet ? 90 : 80;
  const cardH = isMobile ? 400 : INSIGHT_CARD_H;
  const sectionPadTop = isMobile ? "64px" : "96px";
  const sectionPadBot = isMobile ? "64px" : "96px";

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [carouselHovered, setCarouselHovered] = useState(false);
  const [exploreHovered, setExploreHovered] = useState(false);
  const total = insights.length;
  const sectionRef = useRef<HTMLElement>(null);
  const autoRotateRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const retreat = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        !sectionRef.current?.contains(document.activeElement) &&
        document.activeElement !== sectionRef.current
      )
        return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        advance();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        retreat();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [advance, retreat]);

  useEffect(() => {
    if (carouselHovered || total <= 1) {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
        autoRotateRef.current = null;
      }
      return;
    }
    autoRotateRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 7000);
    return () => {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    };
  }, [carouselHovered, total]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) advance();
        else retreat();
      }
    },
    [advance, retreat],
  );

  return (
    <section
      ref={sectionRef}
      tabIndex={-1}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setCarouselHovered(true)}
      onMouseLeave={() => setCarouselHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg, #0C1C2E 0%, #0E223A 100%)",
        paddingTop: sectionPadTop,
        paddingBottom: sectionPadBot,
        outline: "none",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          backgroundRepeat: "repeat",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            maxWidth: MAX_WIDTH,
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "32px",
            paddingRight: "32px",
            marginBottom: "64px",
          }}
        >
          <span
            style={{
              fontFamily: F,
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.55)",
              display: "block",
              marginBottom: "12px",
            }}
          >
            SECTOR INSIGHTS
          </span>
          <h2
            style={{
              fontFamily: F,
              fontSize: isMobile ? "1.75rem" : "2.25rem",
              fontWeight: 600,
              lineHeight: "1.2",
              color: "#FFFFFF",
              marginBottom: "16px",
              maxWidth: "760px",
            }}
          >
            Industry perspectives.
          </h2>
          <p
            style={{
              fontFamily: F,
              fontSize: "1.0625rem",
              lineHeight: "1.7",
              color: "rgba(255,255,255,0.9)",
              maxWidth: "680px",
            }}
          >
            Explore perspectives drawn from advisory engagements, sector research, and institutional
            transformation across Africa&apos;s evolving economic landscape.
          </p>
        </div>

        <div style={{ position: "relative", width: "100%", overflow: "visible" }}>
          <div
            style={{
              display: "flex",
              transition: `transform 900ms ${INSIGHT_CAROUSEL_EASING}`,
              transform: `translateX(calc(${(100 - cardWidthPercent) / 2}vw - ${activeIndex * cardWidthPercent}vw - ${activeIndex * 64}px))`,
            }}
          >
            {insights.map((ins, idx) => (
              <InsightCarouselCard
                key={ins.slug}
                insight={ins}
                isActive={idx === activeIndex}
                isHovered={hoveredIndex === idx}
                onHoverStart={() => setHoveredIndex(idx)}
                onHoverEnd={() => setHoveredIndex(null)}
                onClick={() => setActiveIndex(idx)}
                cardWidthPercent={cardWidthPercent}
                cardHeight={cardH}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          <button
            onClick={retreat}
            aria-label="Previous insight"
            style={navButtonStyle}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.18)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.08)";
            }}
          >
            ←
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {insights.map((ins, idx) => (
              <button
                key={ins.slug}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to insight ${idx + 1}`}
                style={{
                  width: idx === activeIndex ? "12px" : "8px",
                  height: idx === activeIndex ? "12px" : "8px",
                  borderRadius: "50%",
                  backgroundColor: idx === activeIndex ? "#FFFFFF" : "rgba(255,255,255,0.35)",
                  borderWidth: 0,
                  borderStyle: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: `width 300ms ${INSIGHT_CAROUSEL_EASING}, height 300ms ${INSIGHT_CAROUSEL_EASING}, background-color 300ms ${INSIGHT_CAROUSEL_EASING}`,
                }}
              />
            ))}
          </div>

          <button
            onClick={advance}
            aria-label="Next insight"
            style={navButtonStyle}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.18)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.08)";
            }}
          >
            →
          </button>
        </div>

        <div
          style={{
            maxWidth: MAX_WIDTH,
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "32px",
            paddingRight: "32px",
            marginTop: "32px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Link
            href="/insights"
            onMouseEnter={() => setExploreHovered(true)}
            onMouseLeave={() => setExploreHovered(false)}
            style={{
              fontFamily: F,
              fontSize: "15px",
              fontWeight: 500,
              color: "rgba(255,255,255,0.85)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              transition: "color 200ms ease",
            }}
          >
            Explore all insights
            <span
              style={{
                display: "inline-block",
                transition: `transform 300ms ${INSIGHT_CAROUSEL_EASING}`,
                transform: exploreHovered ? "translateX(4px)" : "translateX(0px)",
              }}
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

const navButtonStyle: CSSProperties = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  borderWidth: 0,
  borderStyle: "none",
  backgroundColor: "rgba(255,255,255,0.08)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 200ms ease",
  color: "#FFFFFF",
  fontSize: "1rem",
  padding: 0,
};

function InsightCarouselCard({
  insight,
  isActive,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onClick,
  cardWidthPercent,
  cardHeight,
  isMobile,
}: {
  insight: SectorInsightData;
  isActive: boolean;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
  cardWidthPercent: number;
  cardHeight: number;
  isMobile: boolean;
}) {
  return (
    <div
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={onClick}
      style={{
        position: "relative",
        width: `calc(${cardWidthPercent}vw - 64px)`,
        minWidth: `calc(${cardWidthPercent}vw - 64px)`,
        height: `${cardHeight}px`,
        marginRight: "64px",
        borderRadius: "12px",
        overflow: "hidden",
        cursor: "pointer",
        opacity: isActive ? 1 : 0.62,
        transform: isActive ? "scale(1)" : "scale(0.94)",
        transition: `opacity 900ms ${INSIGHT_CAROUSEL_EASING}, transform 900ms ${INSIGHT_CAROUSEL_EASING}, box-shadow 300ms ${INSIGHT_CAROUSEL_EASING}`,
        boxShadow: isActive ? "0 14px 48px rgba(0,0,0,0.34)" : "none",
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
          filter: "grayscale(24%) contrast(1.06)",
          transform: isHovered ? "scale(1.03)" : "scale(1)",
          transition: `transform 900ms ${INSIGHT_CAROUSEL_EASING}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(180deg, rgba(5,15,28,0.22) 0%, rgba(7,21,39,0.90) 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          height: "100%",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "7fr 5fr",
          alignItems: "end",
          paddingLeft: isMobile ? "24px" : "40px",
          paddingRight: isMobile ? "24px" : "40px",
          paddingBottom: isMobile ? "28px" : "36px",
          paddingTop: isMobile ? "28px" : "36px",
        }}
      >
        <div style={{ maxWidth: isMobile ? "100%" : "50ch" }}>
          <span
            style={{
              fontFamily: F,
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.65)",
              display: "block",
              marginBottom: "12px",
            }}
          >
            {insight.category}
          </span>
          <h3
            style={{
              fontFamily: F,
              fontSize: isMobile ? "1.5rem" : "2rem",
              fontWeight: 600,
              lineHeight: isMobile ? "1.3" : "1.2",
              color: C.white,
            }}
          >
            {insight.title}
          </h3>
          <p
            style={{
              fontFamily: F,
              fontSize: "0.9375rem",
              lineHeight: "1.7",
              color: "rgba(255,255,255,0.82)",
              marginTop: "14px",
              maxWidth: "60ch",
            }}
          >
            {insight.excerpt}
          </p>
          <p
            style={{
              fontFamily: F,
              fontSize: "0.8125rem",
              lineHeight: "1.4",
              color: "rgba(255,255,255,0.60)",
              marginTop: "16px",
            }}
          >
            {insight.source}
          </p>
        </div>
        {!isMobile && (
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
            <Link
              href={`/insights/${insight.slug}`}
              style={{
                fontFamily: F,
                fontSize: "0.9rem",
                fontWeight: 600,
                color: C.white,
                textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.45)",
                paddingBottom: "4px",
              }}
            >
              Read perspective →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
