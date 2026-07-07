"use client";

import Link from "next/link";
import Image from "next/image";

const FALLBACK_INSIGHTS = [
  {
    category: "Technology",
    title: "AI Governance as a Competitive Differentiator",
    excerpt: "How institutional AI governance frameworks are becoming the defining capability separating leading organizations.",
    date: "January 2026",
    image: "/images/insights/insight-1.jpg",
    slug: "ai-governance-competitive-differentiator",
  },
  {
    category: "Strategy",
    title: "Africa's Growth Outlook: Execution Determines Trajectory",
    excerpt: "Structural tailwinds are real — but execution discipline separates institutions that compound from those that stagnate.",
    date: "December 2025",
    image: "/images/insights/insight-2.jpg",
    slug: "africa-growth-outlook-execution-determines",
  },
  {
    category: "Technology",
    title: "Connectivity, Digital Identity, and Payment Rails Form a Growth Stack",
    excerpt: "The convergence of mobile connectivity, digital ID, and payment infrastructure is creating Africa's most consequential economic layer.",
    date: "November 2025",
    image: "/images/insights/insight-3.jpg",
    slug: "connectivity-digital-identity-payments-rails",
  },
];

interface InsightsCarouselSectionProps {
  insights?: Array<{ slug: string; category?: string; title: string; excerpt?: string; summary?: string; }>;
  overline?: string;
  title?: string;
  description?: string;
  exploreHref?: string;
  exploreLabel?: string;
  centered?: boolean;
}

export default function InsightsCarouselSection({
  insights,
  overline,
  title: customTitle,
  exploreHref,
  exploreLabel,
}: InsightsCarouselSectionProps) {
  const cards =
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

  const displayCards = cards.slice(0, 3);

  return (
    <section style={{ backgroundColor: "#021024", padding: "100px 0 80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "48px", gap: "24px" }}>
          <div>
            <p style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "var(--text-overline)",
              textTransform: "uppercase",
              letterSpacing: "6px",
              color: "rgba(125,160,202,0.5)",
              marginBottom: "16px",
            }}>
              {overline || "LATEST THINKING"}
            </p>
            <h2 style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(30px, 3.5vw, 44px)",
              fontWeight: 400,
              color: "#FFFFFF",
              lineHeight: 1.15,
              margin: 0,
              maxWidth: "700px",
            }}>
              {customTitle || "Ideas shaping tomorrow\u2019s institutions."}
            </h2>
          </div>
          <Link
            href={exploreHref || "/insights"}
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "var(--text-caption)",
              fontWeight: 500,
              color: "#5483B3",
              textDecoration: "none",
              whiteSpace: "nowrap",
              flexShrink: 0,
              marginBottom: "4px",
              transition: "color 0.25s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#7DA0CA"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#5483B3"; }}
          >
            {exploreLabel || "Explore All Insights"} →
          </Link>
        </div>

        {/* Cards grid — hairline separators, no border-radius */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          backgroundColor: "rgba(255,255,255,0.06)",
        }}>
          {displayCards.map((card) => (
            <Link
              key={card.slug}
              href={`/insights/${card.slug}`}
              style={{
                display: "block",
                textDecoration: "none",
                backgroundColor: "#021024",
                transition: "background 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#031629";
                const title = e.currentTarget.querySelector(".ins-title") as HTMLElement;
                const read = e.currentTarget.querySelector(".ins-read") as HTMLElement;
                const overlay = e.currentTarget.querySelector(".ins-overlay") as HTMLElement;
                if (title) title.style.color = "#7DA0CA";
                if (read) read.style.color = "#7DA0CA";
                if (overlay) overlay.style.opacity = "0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#021024";
                const title = e.currentTarget.querySelector(".ins-title") as HTMLElement;
                const read = e.currentTarget.querySelector(".ins-read") as HTMLElement;
                const overlay = e.currentTarget.querySelector(".ins-overlay") as HTMLElement;
                if (title) title.style.color = "#FFFFFF";
                if (read) read.style.color = "rgba(255,255,255,0.35)";
                if (overlay) overlay.style.opacity = "1";
              }}
            >
              {/* Image */}
              <div style={{ position: "relative", height: "240px", overflow: "hidden" }}>
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                  aria-hidden
                  quality={85}
                />
                <div
                  className="ins-overlay"
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(2,16,36,0.3)",
                    transition: "opacity 0.3s ease",
                  }}
                />
              </div>

              {/* Body */}
              <div style={{ padding: "28px 0" }}>
                <span style={{
                  display: "block",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "var(--text-overline)",
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  color: "#5483B3",
                  marginBottom: "12px",
                }}>
                  {card.category}
                </span>
                <h3
                  className="ins-title"
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontSize: "20px",
                    fontWeight: 400,
                    color: "#FFFFFF",
                    lineHeight: 1.3,
                    margin: "0 0 12px",
                    transition: "color 0.3s ease",
                  }}
                >
                  {card.title}
                </h3>
                <p style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.25)",
                  marginBottom: "20px",
                }}>
                  {card.date}
                </p>
                <span
                  className="ins-read"
                  style={{
                    display: "block",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "var(--text-caption)",
                    color: "rgba(255,255,255,0.35)",
                    transition: "color 0.3s ease",
                  }}
                >
                  Read Article →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
