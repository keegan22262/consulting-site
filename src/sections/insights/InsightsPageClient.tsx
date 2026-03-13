"use client";

import CTABlock from "@/components-v2/sections/CTABlock";
import InsightsCarouselSection from "@/components-v2/sections/InsightsCarouselSection";
import InsightsGridSection from "@/components-v2/sections/InsightsGridSection";
import InsightsHeroSection from "@/components-v2/sections/InsightsHeroSection";
import InsightsIntroSection from "@/components-v2/sections/InsightsIntroSection";
import { useInsights } from "@/lib/hooks/useInsights";
import { INSIGHTS } from "@/src/sections/insights/data";
import Link from "next/link";

export default function InsightsPageClient() {
  const { data: cmsInsights } = useInsights();
  const insights = cmsInsights ?? INSIGHTS;
  const featured = insights[0];

  return (
    <>
      <InsightsHeroSection />

      {featured ? <FeaturedInsightSection insight={featured} /> : null}

      <InsightsIntroSection />

      <InsightsGridSection insights={insights} />

      <FeaturedAnalysisSection />

      <InsightsCarouselSection />

      <CTABlock
        title="Research partnership and strategic translation"
        description="Bring a priority to our team and we will help convert insight into an execution-ready response architecture."
        primaryLabel="Contact"
        primaryHref="/contact"
      />
    </>
  );
}

function FeaturedInsightSection({
  insight,
}: {
  insight: { slug: string; category: string; title: string; excerpt: string; image?: string };
}) {
  const backgroundImage = insight.image || insightImageBySlug(insight.slug);

  return (
    <section className="bg-white pb-6 pt-12 md:pb-8 md:pt-16 lg:pb-10 lg:pt-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <span className="mb-5 block text-xs font-semibold uppercase tracking-widest text-neutral-500">Featured Insight</span>
        <Link
          href={`/insights/${insight.slug}`}
          className="group relative block min-h-80 overflow-hidden rounded-xl md:min-h-105 lg:min-h-120"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition duration-700 ease-out group-hover:scale-[1.03]"
            style={{ backgroundImage: `url('${backgroundImage}')` }}
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#0C1C2E]/90 via-[#0C1C2E]/65 to-[#0C1C2E]/20" />
          <div className="absolute inset-x-0 bottom-0 max-w-160 p-6 md:p-10 lg:p-12">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.08em] text-white/60">
              {insight.category}
            </span>
            <h2 className="text-[1.5rem] font-semibold leading-[1.22] text-white md:text-[1.875rem] lg:text-[2rem]">
              {insight.title}
            </h2>
            <p className="mt-3 max-w-[58ch] text-sm leading-[1.7] text-white/75 md:text-base">{insight.excerpt}</p>
            <span className="mt-5 inline-block border-b border-white/40 pb-0.5 text-sm font-semibold text-white transition group-hover:border-white">
              Read Full Insight
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

function insightImageBySlug(slug: string) {
  const IMAGE_MAP: Record<string, string> = {
    "operating-model-transformation": "/images/insights/insight-1.jpg",
    "ai-value-realization": "/images/insights/insight-2.jpg",
    "regulatory-velocity": "/images/insights/insight-3.jpg",
  };

  return IMAGE_MAP[slug] || "/images/insights/insight-1.jpg";
}

function FeaturedAnalysisSection() {
  return (
    <section className="bg-[#F8FAFC] py-14 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="relative overflow-hidden rounded-xl bg-[#1B3A5C] px-8 py-12 md:px-12 md:py-16">
          <div className="absolute inset-0 bg-[url('/images/insights/insight-3.jpg')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-linear-to-br from-[#0C1C2E]/85 via-[#1B3A5C]/75 to-[#0C1C2E]/85" />
          <div className="relative z-1 max-w-190">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-white/60">Featured Analysis</span>
            <h3 className="text-[1.5rem] font-semibold leading-[1.2] text-white md:text-[2rem]">
              Patterns across infrastructure, institutions, and economic transition.
            </h3>
            <p className="mt-4 max-w-[62ch] text-base leading-[1.7] text-[#CBD7E6]">
              Our research combines field observations, policy signals, and execution data to surface where leadership
              attention should move next.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
