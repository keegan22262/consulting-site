"use client";

import { useMemo, useState } from "react";
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

export default function InsightsPageClient() {
  const [activeFilter, setActiveFilter] = useState("All Insights");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const loadMoreMargin = useResponsiveValue({ desktop: "56px", tablet: "48px", mobile: "40px" });

  const handleFilterChange = (nextFilter: string) => {
    setActiveFilter(nextFilter);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const filtered = useMemo(() => {
    const topic = TOPIC_FILTERS.find((item) => item.label === activeFilter);
    if (!topic || topic.categories.length === 0) return INSIGHTS_DATA;
    return INSIGHTS_DATA.filter((insight) => topic.categories.includes(insight.category));
  }, [activeFilter]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const featured = INSIGHTS_DATA[0];

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

      <MorePerspectivesSection insights={INSIGHTS_DATA} />

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
