"use client";

import { useState } from "react";
import Link from "next/link";
import { useScrollReveal } from "@/components-v2/foundation/useScrollReveal";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";
import { useReducedMotionPreference } from "@/src/lib/motion/useReducedMotionPreference";

export interface IndustryCardProps {
  title: string;
  description: string;
  slug?: string;
  image?: string;
  routePrefix?: string;
  variant?: "compact" | "detailed";
  staggerIndex?: number;
  href?: string;
}

export default function IndustryCard({
  title,
  description,
  slug,
  image,
  routePrefix = "/industries/",
  variant,
  staggerIndex = 0,
  href,
}: IndustryCardProps) {
  const resolvedVariant = variant ?? (image ? "compact" : "detailed");

  if (resolvedVariant === "detailed") {
    return (
      <DetailedIndustryCard
        title={title}
        description={description}
        slug={slug}
        image={image}
        routePrefix={routePrefix}
        href={href}
      />
    );
  }

  return (
    <CompactIndustryCard
      title={title}
      description={description}
      slug={slug}
      image={image}
      routePrefix={routePrefix}
      staggerIndex={staggerIndex}
      href={href}
    />
  );
}

function CompactIndustryCard({
  title,
  description,
  slug,
  image,
  routePrefix,
  staggerIndex,
  href,
}: Omit<IndustryCardProps, "variant">) {
  const [hovered, setHovered] = useState(false);
  const [revealRef, revealStyle] = useScrollReveal(staggerIndex ?? 0);
  const reducedMotion = useReducedMotionPreference();
  const contentPadding = useResponsiveValue({ desktop: "24px", tablet: "24px", mobile: "24px" });
  const resolvedHref = href ?? `${routePrefix ?? "/industries/"}${slug ?? ""}`;

  return (
    <div
      ref={revealRef}
      style={{
        opacity: revealStyle.opacity,
        transform: revealStyle.transform,
        transition: revealStyle.transition,
        willChange: revealStyle.willChange,
      }}
    >
      <Link
        href={resolvedHref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          border: "1px solid var(--n200)",
          borderRadius: "4px",
          backgroundColor: "#FFFFFF",
          overflow: "hidden",
          transition: "transform 240ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 240ms cubic-bezier(0.22, 1, 0.36, 1)",
          textDecoration: "none",
          display: "block",
          transform: reducedMotion ? "none" : hovered ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.06)" : "none",
        }}
      >
        {image ? (
          <div style={{ position: "relative", height: "120px", overflow: "hidden" }}>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "grayscale(15%) contrast(1.02)",
                opacity: hovered ? 0.9 : 0.75,
                transition: "opacity 120ms cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "32px",
                background: "linear-gradient(to top, #FFFFFF, transparent)",
              }}
            />
          </div>
        ) : null}
        <div style={{ padding: contentPadding }}>
          <h3
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "var(--text-h3)",
              fontWeight: 600,
              lineHeight: "var(--line-height-h3)",
              color: "var(--n900)",
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "var(--text-caption)",
              lineHeight: "1.5",
              color: "var(--n600)",
              marginTop: "8px",
            }}
          >
            {description}
          </p>
        </div>
      </Link>
    </div>
  );
}

function DetailedIndustryCard({
  title,
  description,
  slug,
  image,
  routePrefix,
  href,
}: Omit<IndustryCardProps, "variant" | "staggerIndex">) {
  const [hovered, setHovered] = useState(false);
  const contentPadding = useResponsiveValue({ desktop: "28px", tablet: "24px", mobile: "20px" });
  const resolvedHref = href ?? `${routePrefix ?? "/industries/"}${slug ?? ""}`;

  return (
    <Link
      href={resolvedHref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: "none",
        color: "inherit",
        backgroundColor: "#FFFFFF",
        border: `1px solid ${hovered ? "var(--n300)" : "var(--n200)"}`,
        borderRadius: "4px",
        overflow: "hidden",
        transition: "border-color 120ms cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 120ms cubic-bezier(0.25, 0.1, 0.25, 1)",
        boxShadow: hovered ? "0 1px 4px rgba(0,0,0,0.06)" : "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {image ? (
        <div style={{ position: "relative", height: "140px", overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "grayscale(12%) contrast(1.02)",
              opacity: hovered ? 0.9 : 0.75,
              transition: "opacity 120ms cubic-bezier(0.25, 0.1, 0.25, 1)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "40px",
              background: "linear-gradient(to top, #FFFFFF, transparent)",
            }}
          />
        </div>
      ) : null}

      <div
        style={{
          padding: contentPadding,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "var(--text-h3)",
            fontWeight: 600,
            lineHeight: "var(--line-height-h3)",
            color: hovered ? "var(--a700)" : "var(--n900)",
            transition: "color 120ms cubic-bezier(0.25, 0.1, 0.25, 1)",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "var(--text-caption)",
            lineHeight: "1.55",
            color: "var(--n600)",
            marginTop: "8px",
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description}
        </p>
        <div
          style={{
            marginTop: "16px",
            paddingTop: "16px",
            borderTop: "1px solid var(--n100)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "0.6875rem",
              fontWeight: 600,
              color: "var(--a700)",
              letterSpacing: "0.02em",
            }}
          >
            Explore industry
          </span>
          <span
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "var(--text-body)",
              color: hovered ? "var(--o500)" : "var(--n300)",
              transition: "color 120ms cubic-bezier(0.25, 0.1, 0.25, 1)",
              lineHeight: "1",
            }}
          >
            -&gt;
          </span>
        </div>
      </div>
    </Link>
  );
}
