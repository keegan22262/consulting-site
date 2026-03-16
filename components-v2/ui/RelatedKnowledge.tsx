"use client";

import { useState } from "react";
import Link from "next/link";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";

export interface KnowledgeLink {
  label: string;
  href: string;
  category?: string;
}

interface RelatedKnowledgeProps {
  industries?: KnowledgeLink[];
  services?: KnowledgeLink[];
  insights?: KnowledgeLink[];
  caseStudies?: KnowledgeLink[];
}

export function ExploreRelatedKnowledge({
  industries,
  services,
  insights,
  caseStudies,
}: RelatedKnowledgeProps) {
  const sections = [
    { label: "Related Industries", items: industries, icon: "*" },
    { label: "Related Services", items: services, icon: "#" },
    { label: "Related Insights", items: insights, icon: ">" },
    { label: "Related Engagements", items: caseStudies, icon: "+" },
  ].filter((section) => section.items && section.items.length > 0);

  if (sections.length === 0) return null;

  const px = useResponsiveValue({ desktop: "32px", tablet: "32px", mobile: "24px" });
  const padY = useResponsiveValue({ desktop: "72px", tablet: "56px", mobile: "40px" });
  const headerSize = useResponsiveValue({ desktop: "1.75rem", tablet: "1.5rem", mobile: "1.25rem" });
  const headerLineHeight = useResponsiveValue({ desktop: "1.12", tablet: "1.16", mobile: "1.2" });
  const descriptionMargin = useResponsiveValue({ desktop: "40px", tablet: "32px", mobile: "24px" });
  const gap = useResponsiveValue({ desktop: "32px", tablet: "24px", mobile: "20px" });
  const gridCols = useResponsiveValue({
    desktop: `repeat(${Math.min(sections.length, 4)}, 1fr)`,
    tablet: `repeat(${Math.min(sections.length, 2)}, 1fr)`,
    mobile: "1fr",
  });

  return (
    <section style={{ backgroundColor: "var(--n50)" }}>
      <div
        style={{
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingTop: padY,
          paddingBottom: padY,
          paddingLeft: px,
          paddingRight: px,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "0.6875rem",
            fontWeight: 600,
            color: "var(--a700)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            display: "block",
            marginBottom: "12px",
          }}
        >
          Knowledge Network
        </span>
        <h2
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: headerSize,
            fontWeight: 600,
            lineHeight: headerLineHeight,
            letterSpacing: "-0.02em",
            color: "var(--n900)",
            marginBottom: "8px",
          }}
        >
          Explore Related Knowledge.
        </h2>
        <p
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "var(--text-caption)",
            lineHeight: "1.55",
            color: "var(--n500)",
            maxWidth: "52ch",
            marginBottom: descriptionMargin,
          }}
        >
          Navigate across industries, services, insights, and engagements to discover connected expertise.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: gridCols,
            gap,
          }}
        >
          {sections.map((section) => (
            <div key={section.label}>
              <span
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "0.625rem",
                  fontWeight: 600,
                  color: "var(--a700)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  display: "block",
                  paddingBottom: "12px",
                  borderBottom: "1px solid var(--n200)",
                  marginBottom: "12px",
                }}
              >
                {section.label}
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {section.items?.map((item) => (
                  <KnowledgeNavItem key={`${item.href}-${item.label}`} item={item} icon={section.icon} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function KnowledgeNavItem({ item, icon }: { item: KnowledgeLink; icon: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={item.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "var(--font-primary)",
        fontSize: "var(--text-caption)",
        fontWeight: 400,
        color: hovered ? "var(--a700)" : "var(--n700)",
        textDecoration: "none",
        paddingTop: "8px",
        paddingBottom: "8px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        transition: "color 120ms cubic-bezier(0.25, 0.1, 0.25, 1)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "0.6rem",
          fontWeight: 600,
          color: hovered ? "var(--a700)" : "var(--n400)",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          flexShrink: 0,
          transition: "color 120ms cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
      >
        {item.category ?? icon}
      </span>
      <span>{item.label}</span>
      <span
        style={{
          marginLeft: "auto",
          fontSize: "0.75rem",
          color: hovered ? "var(--a700)" : "var(--n300)",
          transition: "color 120ms cubic-bezier(0.25, 0.1, 0.25, 1)",
          flexShrink: 0,
        }}
      >
        -&gt;
      </span>
    </Link>
  );
}

export interface CaseStudyCardData {
  slug: string;
  title: string;
  image: string;
  category?: string;
  summary?: string;
  excerpt?: string;
  metrics?: Array<{ value: string; label: string }>;
}

export function CaseStudyCard({ cs }: { cs: CaseStudyCardData }) {
  const [hovered, setHovered] = useState(false);
  const metrics = cs.metrics ?? [];

  return (
    <Link
      href={`/case-studies/${cs.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: "none",
        display: "block",
        backgroundColor: "#FFFFFF",
        border: `1px solid ${hovered ? "var(--n300)" : "var(--n200)"}`,
        borderRadius: "4px",
        overflow: "hidden",
        transition:
          "border-color 120ms cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 120ms cubic-bezier(0.25, 0.1, 0.25, 1)",
        boxShadow: hovered ? "0 1px 4px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div style={{ position: "relative", width: "100%", paddingBottom: "50%", overflow: "hidden" }}>
        <div
          role="img"
          aria-label={cs.title}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${cs.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>
      <div style={{ padding: "20px" }}>
        <span
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "0.625rem",
            fontWeight: 600,
            color: "var(--a700)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {cs.category ?? "Client Impact"}
        </span>
        <h3
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "var(--text-body)",
            fontWeight: 600,
            lineHeight: "1.4",
            color: hovered ? "var(--a700)" : "var(--n900)",
            marginTop: "10px",
            transition: "color 120ms cubic-bezier(0.25, 0.1, 0.25, 1)",
          }}
        >
          {cs.title}
        </h3>
        {(cs.summary ?? cs.excerpt) ? (
          <p
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "var(--text-caption)",
              lineHeight: "1.55",
              color: "var(--n500)",
              marginTop: "8px",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {cs.summary ?? cs.excerpt}
          </p>
        ) : null}

        {metrics.length > 0 ? (
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "16px",
              paddingTop: "12px",
              borderTop: "1px solid var(--n100)",
            }}
          >
            {metrics.slice(0, 2).map((metric) => (
              <div key={metric.label}>
                <span
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "var(--a700)",
                    display: "block",
                  }}
                >
                  {metric.value}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "0.625rem",
                    fontWeight: 500,
                    color: "var(--n500)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
