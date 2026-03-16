"use client";

import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";
import InsightGridCard from "@/src/sections/insights/InsightGridCard";
import type { InsightEntry } from "@/src/sections/insights/data";

interface InsightCardsGridProps {
  insights: InsightEntry[];
}

export default function InsightCardsGrid({ insights }: InsightCardsGridProps) {
  const gridCols = useResponsiveValue({
    desktop: "repeat(3, 1fr)",
    tablet: "repeat(2, 1fr)",
    mobile: "1fr",
  });
  const gridGap = useResponsiveValue({ desktop: "40px 32px", tablet: "32px 24px", mobile: "24px" });

  return (
    <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: gridGap }}>
      {insights.map((insight) => (
        <InsightGridCard key={insight.slug} insight={insight} />
      ))}
    </div>
  );
}
