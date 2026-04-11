"use client";

import { useEffect, useRef, useState } from "react";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";

interface SectionHeaderProps {
  overline?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  showAccentRule?: boolean;
  maxWidth?: string;
  overlineColor?: string;
  titleColor?: string;
  descriptionColor?: string;
}

export default function SectionHeader({
  overline,
  title,
  description,
  align = "left",
  showAccentRule = true,
  maxWidth = "65ch",
  overlineColor = "rgba(27, 58, 92, 0.88)",
  titleColor = "var(--n900)",
  descriptionColor = "var(--n600)",
}: SectionHeaderProps) {
  const h2Size = useResponsiveValue({
    desktop: "var(--text-h2)",
    tablet: "var(--text-h2)",
    mobile: "1.5rem",
  });
  const h2LineHeight = useResponsiveValue({
    desktop: "var(--line-height-h2)",
    tablet: "var(--line-height-h2)",
    mobile: "1.25",
  });
  const isCentered = align === "center";

  // Scroll reveal for header elements
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -30px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const revealBase = (delay: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 20px, 0)",
    transition: `opacity 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms, transform 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
  });

  return (
    <div
      ref={containerRef}
      style={{
        textAlign: isCentered ? "center" : undefined,
        display: "flex",
        flexDirection: "column",
        alignItems: isCentered ? "center" : "flex-start",
      }}
    >
      {overline && (
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-caption)",
            fontWeight: 600,
            color: overlineColor,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            ...revealBase(0),
          }}
        >
          {overline}
        </span>
      )}

      <h2
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: h2Size,
          fontWeight: 600,
          lineHeight: h2LineHeight,
          color: titleColor,
          marginTop: overline ? "6px" : undefined,
          ...revealBase(120),
        }}
      >
        {title}
      </h2>

      {showAccentRule ? (
        <div
          style={{
            width: "48px",
            height: "2px",
            backgroundColor: "var(--a700)",
            marginTop: "24px",
            marginBottom: description ? "24px" : undefined,
            ...revealBase(240),
          }}
        />
      ) : null}

      {description && (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-body)",
            lineHeight: "var(--line-height-body)",
            color: descriptionColor,
            marginTop: showAccentRule ? undefined : "12px",
            maxWidth,
            ...revealBase(300),
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
