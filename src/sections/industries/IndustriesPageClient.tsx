"use client";

import { BpCtx, useBreakpoint } from "@/lib/breakpoints";
import SiteFooter from "@/components-v2/layout/SiteFooter";
import SiteHeader from "@/components-v2/layout/SiteHeader";
import { useFeaturedInsights } from "@/lib/hooks/useFeaturedInsights";
import { useIndustries } from "@/lib/hooks/useIndustries";
import AdvisoryPhilosophySection from "@/src/sections/industries/AdvisoryPhilosophySection";
import AnalyticalAdvantageSection from "@/src/sections/industries/AnalyticalAdvantageSection";
import IndustriesHero from "@/src/sections/industries/IndustriesHero";
import OperatingPrincipleEngagement from "@/src/sections/industries/OperatingPrincipleEngagement";
import SectorCoverageSection from "@/src/sections/industries/SectorCoverageSection";
import SectorInsightsSection from "@/src/sections/industries/SectorInsightsSection";
import TransformationForcesSection from "@/src/sections/industries/TransformationForcesSection";
import { F, INDUSTRIES, SECTOR_INSIGHTS } from "@/src/sections/industries/data";

export default function IndustriesPageClient() {
  const bp = useBreakpoint();

  const { data: cmsIndustries } = useIndustries(INDUSTRIES);
  const industries = INDUSTRIES.map((fallbackIndustry) => {
    const cmsMatch = cmsIndustries?.find((item) => item.id === fallbackIndustry.id);
    return cmsMatch ? { ...fallbackIndustry, ...cmsMatch } : fallbackIndustry;
  });

  const { data: cmsSectorInsights } = useFeaturedInsights(SECTOR_INSIGHTS);
  const sectorInsights = cmsSectorInsights ?? SECTOR_INSIGHTS;

  return (
    <BpCtx.Provider value={bp}>
      <div style={{ fontFamily: F }}>
        <SiteHeader />
        <IndustriesHero />
        <AdvisoryPhilosophySection />
        <SectorCoverageSection industries={industries} />
        <SectorInsightsSection insights={sectorInsights} />
        <AnalyticalAdvantageSection />
        <TransformationForcesSection />
        <OperatingPrincipleEngagement />
        <SiteFooter />
      </div>
    </BpCtx.Provider>
  );
}
