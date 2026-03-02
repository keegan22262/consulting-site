import InsightsHeroSection from "@/components-v2/sections/InsightsHeroSection";
import InsightsIntroSection from "@/components-v2/sections/InsightsIntroSection";
import InsightsGridSection from "@/components-v2/sections/InsightsGridSection";
import CTABlock from "@/components-v2/sections/CTABlock";
import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";
import { sanityClient } from "@/lib/sanity/client";
import { getAllInsightsQuery } from "@/lib/sanity/queries";

export const dynamic = "force-dynamic";

type InsightResult = {
  _id: string;
  title?: string;
  slug?: string;
  summary?: string;
  category?: string;
  industry?: string;
};

type InsightItem = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  industry: string | undefined;
};

export default async function InsightsPage() {
  const insightsRaw = await sanityClient.fetch<InsightResult[]>(getAllInsightsQuery);

  const insights = (insightsRaw ?? [])
    .filter((item): item is InsightResult & { slug: string; title: string; summary: string } =>
      Boolean(item.slug && item.title && item.summary)
    )
    .map((item) => ({
      slug: item.slug,
      category: item.category ?? "Insight",
      title: item.title,
      excerpt: item.summary,
      industry: item.industry,
    } satisfies InsightItem));

  return (
    <>
      <InsightsHeroSection />
      <InsightsIntroSection />
      {insights.length > 0 ? (
        <InsightsGridSection insights={insights} />
      ) : (
        <SectionWrapper>
          <SectionHeader overline="Insights" title="Insights" description="No published insights are available." />
        </SectionWrapper>
      )}
      <CTABlock
        title="Talk to a partner"
        description="Let’s translate your challenges into actionable insights and delivery roadmaps."
        primaryLabel="Contact"
        primaryHref="/contact"
      />
    </>
  );
}