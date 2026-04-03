"use client";

import Link from "next/link";
import Image from "next/image";

// ─── Fallback insight data ──────────────────────────────────────────────────
const FALLBACK_INSIGHTS = [
  {
    category: "Technology",
    title: "AI Readiness Assessment for African Enterprises",
    excerpt:
      "Evaluating organizational, data, and infrastructure readiness for AI adoption across industries.",
    date: "January 2026",
    image: "/images/insights/insight-1.jpg",
    slug: "ai-readiness-assessment",
  },
  {
    category: "Finance",
    title: "Capital Structure Optimization in Volatile Currency Environments",
    excerpt:
      "Analytical methodology for managing multi-currency exposure and debt structuring in African markets.",
    date: "December 2025",
    image: "/images/insights/insight-2.jpg",
    slug: "capital-structure-optimization",
  },
  {
    category: "Infrastructure",
    title: "Corridor-Led Development: Unlocking Continental Trade Routes",
    excerpt:
      "How integrated transport and logistics corridors are reshaping intra-African trade.",
    date: "November 2025",
    image: "/images/insights/insight-3.jpg",
    slug: "corridor-led-development",
  },
  {
    category: "Strategy",
    title: "Scaling Advisory-Led Growth in Sub-Saharan Africa",
    excerpt:
      "A framework for enterprise advisory firms positioning against global incumbents.",
    date: "February 2026",
    image: "/images/insights/insight-5.jpg",
    slug: "scaling-advisory-led-growth",
  },
];

type InsightCardData = {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  slug: string;
};

interface InsightsCarouselSectionProps {
  insights?: Array<{
    slug: string;
    category?: string;
    title: string;
    excerpt?: string;
    summary?: string;
  }>;
  overline?: string;
  title?: string;
  description?: string;
  titleHref?: string | null;
  exploreHref?: string;
  exploreLabel?: string;
  hideFilters?: boolean;
  centered?: boolean;
}

export default function InsightsCarouselSection({
  insights,
  overline,
  title: customTitle,
  description: customDescription,
  exploreHref,
  exploreLabel,
  centered = false,
}: InsightsCarouselSectionProps) {
  const cards: InsightCardData[] =
    insights && insights.length > 0
      ? insights.map((item, idx) => ({
          category: item.category ?? "Insight",
          title: item.title,
          excerpt: item.excerpt ?? item.summary ?? "",
          date: FALLBACK_INSIGHTS[idx % FALLBACK_INSIGHTS.length]?.date ?? "2026",
          image: FALLBACK_INSIGHTS[idx % FALLBACK_INSIGHTS.length]?.image ?? "/images/insights/insight-1.jpg",
          slug: item.slug,
        }))
      : FALLBACK_INSIGHTS;

  // Show max 3 cards
  const displayCards = cards.slice(0, 3);

  return (
    <section
      style={{
        backgroundColor: "#FFFFFF",
        paddingTop: "80px",
        paddingBottom: "60px",
      }}
    >
      <div className="layout-container" style={centered ? { textAlign: "center" } : undefined}>
        {/* Header */}
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "4.5px",
            color: "#7DA0CA",
            display: "block",
          }}
        >
          {overline || "Insights"}
        </span>
        <h2
          className="mt-4"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(28px, 3.5vw, 38px)",
            fontWeight: 400,
            lineHeight: 1.2,
            color: "#021024",
            ...(centered ? { margin: "12px auto 8px" } : {}),
          }}
        >
          {customTitle || "Ideas shaping tomorrow\u2019s institutions."}
        </h2>
        <p
          className="mt-3"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "16px",
            color: "#6B7280",
            lineHeight: 1.7,
            maxWidth: "640px",
            ...(centered ? { margin: "0 auto 40px" } : {}),
          }}
        >
          {customDescription || "Explore perspectives drawn from advisory engagements, sector research, and institutional transformation across Africa\u2019s evolving economic landscape."}
        </p>

        {/* Insight Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {displayCards.map((card) => (
            <Link
              key={card.slug}
              href={`/insights/${card.slug}`}
              className="homepage-insight-card group"
            >
              <div className="homepage-insight-card__image">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  aria-hidden="true"
                />
              </div>
              <div className="homepage-insight-card__body">
                <span className="homepage-insight-card__category">
                  {card.category}
                </span>
                <h3 className="homepage-insight-card__title">
                  {card.title}
                </h3>
                <p className="homepage-insight-card__date">
                  {card.date}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Explore all link */}
        <div className={`mt-10 flex ${centered ? "justify-center" : "justify-end"}`}>
          <Link
            href={exploreHref || "/insights"}
            className="inline-flex items-center gap-1.5 transition-colors duration-300"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              fontWeight: 500,
              color: "#5483B3",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#7DA0CA"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#5483B3"; }}
          >
            {exploreLabel || "Explore All Insights"}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
