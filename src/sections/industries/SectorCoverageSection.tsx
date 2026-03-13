"use client";

import { useState } from "react";
import Link from "next/link";
import { useBp } from "@/lib/breakpoints";
import { C, F, FILTER_CATEGORIES, INDUSTRY_IMAGES, MAX_WIDTH, type IndustryData } from "./data";

export default function SectorCoverageSection({ industries }: { industries: IndustryData[] }) {
  const bp = useBp();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const headerGap = isMobile ? "32px" : isTablet ? "40px" : "52px";
  const gridCols = isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)";
  const gridGap = isMobile ? "20px" : isTablet ? "20px" : "24px";
  const cardHeight = isMobile ? "320px" : isTablet ? "360px" : "400px";

  const [activeFilter, setActiveFilter] = useState("All Industries");
  const [animating, setAnimating] = useState(false);

  const filtered =
    activeFilter === "All Industries"
      ? industries
      : industries.filter((ind) => {
          const cat = FILTER_CATEGORIES.find((c) => c.label === activeFilter);
          return cat ? (cat.ids as readonly string[]).includes(ind.id) : true;
        });

  const handleFilterChange = (label: string) => {
    if (label === activeFilter) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveFilter(label);
      requestAnimationFrame(() => setAnimating(false));
    }, 200);
  };

  return (
    <section id="sector-coverage" style={{ backgroundColor: C.n50 }}>
      <div
        style={{
          maxWidth: MAX_WIDTH,
          margin: "0 auto",
          paddingTop: isMobile ? "56px" : isTablet ? "72px" : "96px",
          paddingBottom: isMobile ? "56px" : isTablet ? "72px" : "96px",
          paddingLeft: isMobile ? "24px" : "32px",
          paddingRight: isMobile ? "24px" : "32px",
        }}
      >
        <span
          style={{
            fontFamily: F,
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: C.n500,
            display: "block",
            marginBottom: "12px",
          }}
        >
          Sector Coverage
        </span>
        <h2
          style={{
            fontFamily: F,
            fontSize: "var(--text-h2)",
            fontWeight: 600,
            lineHeight: "var(--line-height-h2)",
            color: C.n900,
          }}
        >
          Eleven industries. One standard.
        </h2>
        <p
          style={{
            fontFamily: F,
            fontSize: "var(--text-body-lg)",
            lineHeight: "1.65",
            color: C.n600,
            maxWidth: "62ch",
            marginTop: "12px",
          }}
        >
          Each industry practice is staffed with sector-specific expertise and supported by the full breadth
          of RSL&apos;s advisory capability architecture.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: isMobile ? "8px" : "10px",
            marginTop: isMobile ? "28px" : "36px",
          }}
        >
          {FILTER_CATEGORIES.map((cat) => (
            <FilterPill
              key={cat.label}
              label={cat.label}
              isActive={activeFilter === cat.label}
              onClick={() => handleFilterChange(cat.label)}
            />
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: gridCols,
            gap: gridGap,
            marginTop: headerGap,
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(8px)" : "translateY(0)",
            transition: "opacity 200ms ease, transform 200ms ease",
          }}
        >
          {filtered.map((ind) => (
            <EditorialIndustryCard
              key={ind.id}
              title={ind.title}
              description={ind.description}
              slug={ind.id}
              image={INDUSTRY_IMAGES[ind.id]}
              height={cardHeight}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FilterPill({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: F,
        fontSize: "0.8125rem",
        fontWeight: isActive ? 600 : 500,
        lineHeight: "1",
        color: isActive ? C.white : hovered ? C.a700 : C.n700,
        backgroundColor: isActive ? C.a700 : hovered ? "rgba(27, 58, 92, 0.06)" : C.white,
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: isActive ? C.a700 : hovered ? "rgba(27, 58, 92, 0.2)" : C.n200,
        borderRadius: "20px",
        paddingTop: "8px",
        paddingBottom: "8px",
        paddingLeft: "16px",
        paddingRight: "16px",
        cursor: "pointer",
        whiteSpace: "nowrap",
        boxShadow: isActive ? "0 2px 8px rgba(27, 58, 92, 0.18)" : "none",
        transition: "color 200ms ease, background-color 200ms ease, border-color 200ms ease, box-shadow 200ms ease",
      }}
    >
      {label}
    </button>
  );
}

function EditorialIndustryCard({
  title,
  description,
  slug,
  image,
  height,
}: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  height: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/industries/${slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        height,
        borderRadius: "12px",
        overflow: "hidden",
        display: "block",
        textDecoration: "none",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "transform 240ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${image ?? "/images/industries/sectors/financial-services.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(32%) contrast(1.06)",
          transform: hovered ? "scale(1.03)" : "scale(1)",
          transition: "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(180deg, rgba(12,28,46,0.28) 0%, rgba(12,28,46,0.86) 100%)",
        }}
      />
      <div
        style={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "22px",
        }}
      >
        <h3
          style={{
            fontFamily: F,
            fontSize: "1.125rem",
            fontWeight: 600,
            lineHeight: "1.35",
            color: C.white,
            marginBottom: "8px",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: F,
            fontSize: "0.875rem",
            lineHeight: "1.6",
            color: C.a200,
            maxWidth: "44ch",
          }}
        >
          {description}
        </p>
      </div>
    </Link>
  );
}
