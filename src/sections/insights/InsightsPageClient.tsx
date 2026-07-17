"use client";

import { useMemo, useState } from "react";
import { useInsights } from "@/lib/hooks/useInsights";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";
import InsightsHeroSection from "@/src/sections/insights/InsightsHeroSection";
import FeaturedInsightsSection from "@/src/sections/insights/FeaturedInsightsSection";
import ResearchAndAnalysisSection from "@/src/sections/insights/ResearchAndAnalysisSection";
import InsightFilterBar from "@/src/sections/insights/InsightFilterBar";
import InsightCardsGrid from "@/src/sections/insights/InsightCardsGrid";
import LoadMoreInsights from "@/src/sections/insights/LoadMoreInsights";
import SpecialAnalysisSection from "@/src/sections/insights/SpecialAnalysisSection";
import MorePerspectivesSection from "@/src/sections/insights/MorePerspectivesSection";
import StayInformedSection from "@/src/sections/insights/StayInformedSection";
import { INSIGHTS_DATA, TOPIC_FILTERS } from "@/src/sections/insights/data";

const ITEMS_PER_PAGE = 6;

const SECTOR_IMAGE_BY_CATEGORY: Record<string, string> = {
  Technology: "/images/insights/sectors/technology.jpg",
  Finance: "/images/insights/sectors/finance.jpg",
  "Public Sector": "/images/insights/sectors/public-policy.jpg",
  Strategy: "/images/insights/sectors/strategy.jpg",
  Sustainability: "/images/insights/sectors/infrastructure.jpg",
};

const FALLBACK_SECTOR_IMAGE = "/images/insights/sectors/strategy.jpg";

const estimateReadTime = (text: string) => {
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(3, Math.round(wordCount / 200));
  return `${minutes} min`;
};

export default function InsightsPageClient() {
  const { data: cmsInsights } = useInsights();
  const [activeFilter, setActiveFilter] = useState("All Insights");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const loadMoreMargin = useResponsiveValue({ desktop: "56px", tablet: "48px", mobile: "40px" });

  const handleFilterChange = (nextFilter: string) => {
    setActiveFilter(nextFilter);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const insightsSource = useMemo(() => {
    if (!cmsInsights || cmsInsights.length === 0) return INSIGHTS_DATA;

    const mapped = cmsInsights
      .filter((item) => Boolean(item?.slug && item?.title && item?.excerpt && item?.publishedAt))
      .map((item) => ({
        slug: item.slug,
        headline: item.title,
        whatItMeans: item.excerpt,
        source: item.sourceUrl || "https://rillsingh.com",
        category: item.category ?? "Insight",
        date: item.publishedAt.split("T")[0],
        readTime: item.readingTime || estimateReadTime(item.excerpt ?? ""),
        image:
          item.mainImage ||
          SECTOR_IMAGE_BY_CATEGORY[item.category ?? ""] ||
          FALLBACK_SECTOR_IMAGE,
      }));

    return mapped.length > 0 ? mapped : INSIGHTS_DATA;
  }, [cmsInsights]);

  const filtered = useMemo(() => {
    const topic = TOPIC_FILTERS.find((item) => item.label === activeFilter);
    if (!topic || topic.categories.length === 0) return insightsSource;
    return insightsSource.filter((insight) => topic.categories.includes(insight.category));
  }, [activeFilter, insightsSource]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const featured = insightsSource[0];

  return (
    <>
      <InsightsHeroSection />

      {featured ? <FeaturedInsightsSection insight={featured} /> : null}

      <ResearchAndAnalysisSection insightCount={filtered.length} activeFilter={activeFilter}>
        <InsightFilterBar
          filters={TOPIC_FILTERS}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />

        {filtered.length > 0 ? (
          <>
            <InsightCardsGrid insights={visible} />
            {hasMore ? (
              <div style={{ display: "flex", justifyContent: "center", marginTop: loadMoreMargin }}>
                <LoadMoreInsights onClick={() => setVisibleCount((count) => count + ITEMS_PER_PAGE)} />
              </div>
            ) : null}
          </>
        ) : (
          <NoInsightsState onReset={() => setActiveFilter("All Insights")} />
        )}
      </ResearchAndAnalysisSection>

      <SpecialAnalysisSection />

      <MorePerspectivesSection insights={insightsSource} />

      <StayInformedSection />
    </>
  );
}

function NoInsightsState({ onReset }: { onReset: () => void }) {
  return (
    <div style={{ paddingTop: "64px", paddingBottom: "64px", textAlign: "center" }}>
      <p style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-body)", color: "var(--n400)" }}>
        No insights match this topic.
      </p>
      <button
        onClick={onReset}
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "var(--text-caption)",
          fontWeight: 600,
          color: "var(--a700)",
          background: "none",
          border: "none",
          cursor: "pointer",
          marginTop: "12px",
          textDecoration: "underline",
          textUnderlineOffset: "3px",
        }}
      >
        View all insights
      </button>
    </div>
  );
}
