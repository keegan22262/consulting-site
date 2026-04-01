import type { Metadata } from "next";
import groq from "groq";
import HeroSection from "@/components-v2/sections/HeroSection";
import FeaturedServicesSection from "@/components-v2/sections/FeaturedServicesSection";
import InsightsCarouselSection from "@/components-v2/sections/InsightsCarouselSection";
import CapabilityNavigator from "@/components-v2/sections/CapabilityNavigator";
import { CinematicVisualPanel } from "@/components-v2/sections/InstitutionalMetricsSection";
import AtmosphericLayer from "@/components-v2/sections/AtmosphericLayer";
import SectionDivider from "@/components-v2/sections/SectionDivider";
import { sanityClient } from "@/lib/sanity/client";

export const dynamic = "force-dynamic";
export const revalidate = 120;

export const metadata: Metadata = {
  title: "Institutional Advisory Built for Growth, Transformation, and Execution",
  description:
    "Rill Singh Limited advises growth-stage companies, public institutions, and sovereign entities across Africa on strategy, capital, digital transformation, and governance.",
  alternates: {
    canonical: "/",
  },
};

const HOMEPAGE_INSIGHTS_QUERY = groq`*[_type == "insight" && featured == true && (status == "published" || !defined(status))]
  | order(date desc)[0...3] {
    _id,
    title,
    "slug": coalesce(slug.current, slug),
    summary,
    "excerpt": coalesce(excerpt, summary, pt::text(coalesce(body, content))),
    "category": coalesce(theme->title, category)
  }`;

type InsightQueryResult = {
  _id: string;
  title?: string;
  slug?: string;
  summary?: string;
  excerpt?: string;
  category?: string;
};

export default async function Home() {
  const insightsRaw = await sanityClient.fetch<InsightQueryResult[]>(HOMEPAGE_INSIGHTS_QUERY);

  const insights = (insightsRaw ?? [])
    .filter((item): item is InsightQueryResult & { slug: string; title: string; summary: string } =>
      Boolean(item.slug && item.title && item.summary)
    )
    .map((item) => ({
      slug: item.slug,
      category: item.category ?? "Insight",
      title: item.title,
      excerpt: item.excerpt ?? item.summary,
      summary: item.summary,
    }));

  return (
    <>
      <HeroSection
        overline="Pan-African Institutional Advisory"
        title="Institutional Advisory Built for Growth, Transformation, and Execution."
        description="We advise growth-stage companies, institutional operators, and public-sector leaders navigating structural complexity across strategy, technology, finance, and governance — delivering measurable outcomes with discipline."
        primaryCta={{ label: "Explore Our Services", href: "/services" }}
        secondaryCta={{ label: "Read Our Latest Thinking", href: "/insights" }}
      />

      <SectionDivider />

      <FeaturedServicesSection />

      <SectionDivider />

      <div className="relative overflow-hidden">
        <AtmosphericLayer />
        <InsightsCarouselSection insights={insights} />
      </div>

      <CapabilityNavigator background="#F8F9FA" />

      {/* CTA */}
      <section className="relative overflow-hidden" style={{ background: '#0B2239' }}>
        <div className="layout-container py-10 md:py-12 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="flex flex-col justify-center h-full">
              <h2 className="text-4xl font-bold leading-tight text-white mb-6 lg:text-5xl">Begin a Conversation With Our Advisory Team.</h2>
              <p className="max-w-[52ch] text-lg leading-relaxed text-white/80 mb-10">Every engagement begins with a structured conversation. No obligations - simply an exchange of context to determine whether there is a basis for collaboration.</p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <a
                  href="/contact"
                  className="inline-block rounded-card bg-white px-8 py-4 text-center text-base font-semibold text-[#071a2f] shadow transition-colors duration-200 hover:bg-slate-200"
                >
                  Schedule an Introduction
                </a>
                <a
                  href="/about"
                  className="inline-flex items-center gap-2 py-4 text-base font-medium text-white/80 transition-colors duration-200 hover:text-white"
                >
                  Learn About Our Firm
                  <span aria-hidden="true" className="text-lg">→</span>
                </a>
              </div>
            </div>
            <div className="flex justify-center items-center w-full h-full">
              <div className="w-full max-w-xl">
                <CinematicVisualPanel />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
