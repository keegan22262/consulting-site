import type { Metadata } from "next";
import groq from "groq";
import HeroSection from "@/components-v2/sections/HeroSection";
import FeaturedServicesSection from "@/components-v2/sections/FeaturedServicesSection";
import CapabilityPanelsSection from "@/components-v2/sections/CapabilityPanelsSection";
import DecisionGateway from "@/components-v2/sections/DecisionGateway";
import FeaturedIndustriesSection from "@/components-v2/sections/FeaturedIndustriesSection";
import InsightsCarouselSection from "@/components-v2/sections/InsightsCarouselSection";
import EngagementFrameworkSection from "@/components-v2/sections/EngagementFrameworkSection";
import PridePhilosophySection from "@/components-v2/sections/PridePhilosophySection";
import InstitutionalMetricsSection from "@/components-v2/sections/InstitutionalMetricsSection";
import InstitutionalCTA from "@/components-v2/sections/InstitutionalCTA";
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

const HOMEPAGE_SERVICES_QUERY = groq`*[_type == "service" && featured == true && (status == "published" || !defined(status))]
  | order(order asc)[0...3] {
    _id,
    title,
    "slug": coalesce(slug.current, slug),
    summary,
    description,
    focusAreas,
    approach
  }`;

const HOMEPAGE_INDUSTRIES_QUERY = groq`*[_type == "industry" && featured == true && (status == "published" || !defined(status))]
  | order(order asc)[0...3] {
    _id,
    title,
    "slug": coalesce(slug.current, slug),
    summary,
    description
  }`;

const HOMEPAGE_INSIGHTS_QUERY = groq`*[_type == "insight" && featured == true && (status == "published" || !defined(status))]
  | order(date desc)[0...3] {
    _id,
    title,
    "slug": coalesce(slug.current, slug),
    summary,
    "excerpt": coalesce(excerpt, summary, pt::text(coalesce(body, content))),
    "category": coalesce(theme->title, category)
  }`;

const DELIVERY_PHASES_QUERY = groq`*[_type == "delivery_phase"] | order(number asc) {
  _id,
  label,
  subtitle,
  body
}`;

const PRIDE_PRINCIPLES_QUERY = groq`*[_type == "pride_principle"] | order(letter asc) {
  _id,
  letter,
  title,
  body
}`;



type ServiceQueryResult = {
  _id: string;
  title?: string;
  slug?: string;
  summary?: string;
  description?: string;
  focusAreas?: string;
  approach?: string;
};

type IndustryQueryResult = {
  _id: string;
  title?: string;
  slug?: string;
  summary?: string;
  description?: string;
};

type InsightQueryResult = {
  _id: string;
  title?: string;
  slug?: string;
  summary?: string;
  excerpt?: string;
  category?: string;
};

type DeliveryPhaseResult = {
  _id: string;
  label?: string;
  subtitle?: string;
  body?: string;
};

type PridePrincipleResult = {
  _id: string;
  letter?: string;
  title?: string;
  body?: string;
};



export default async function Home() {
  const [servicesRaw, industriesRaw, insightsRaw, phasesRaw, principlesRaw] = await Promise.all([
    sanityClient.fetch<ServiceQueryResult[]>(HOMEPAGE_SERVICES_QUERY),
    sanityClient.fetch<IndustryQueryResult[]>(HOMEPAGE_INDUSTRIES_QUERY),
    sanityClient.fetch<InsightQueryResult[]>(HOMEPAGE_INSIGHTS_QUERY),
    sanityClient.fetch<DeliveryPhaseResult[]>(DELIVERY_PHASES_QUERY),
    sanityClient.fetch<PridePrincipleResult[]>(PRIDE_PRINCIPLES_QUERY),
  ]);

  const services = (servicesRaw ?? [])
    .filter((item): item is ServiceQueryResult & { slug: string; title: string; summary: string } =>
      Boolean(item.slug && item.title && item.summary)
    )
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      focusAreas: Array.isArray(item.focusAreas) ? item.focusAreas.join(", ") : item.focusAreas ?? item.summary,
      approach: item.description ?? item.approach ?? item.summary,
      summary: item.summary,
      description: item.description,
    }));

  const industries = (industriesRaw ?? [])
    .filter((item): item is IndustryQueryResult & { slug: string; title: string } =>
      Boolean(item.slug && item.title)
    )
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      description: item.summary ?? item.description ?? "",
    }));

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
  const deliveryPhases = (phasesRaw ?? [])
    .filter((item): item is DeliveryPhaseResult & { label: string; subtitle: string; body: string } =>
      Boolean(item?.label && item?.subtitle && item?.body)
    )
    .map((item) => ({
      label: item.label,
      subtitle: item.subtitle,
      body: item.body,
    }));

  const pridePrinciples = (principlesRaw ?? [])
    .filter((item): item is PridePrincipleResult & { letter: string; title: string; body: string } =>
      Boolean(item?.letter && item?.title && item?.body)
    )
    .map((item) => ({
      letter: item.letter,
      title: item.title,
      body: item.body,
    }));

  if (services.length === 0) {
    console.warn("[homepage] No featured services returned from CMS.");
  }
  if (industries.length === 0) {
    console.warn("[homepage] No featured industries returned from CMS.");
  }
  if (insights.length === 0) {
    console.warn("[homepage] No featured insights returned from CMS.");
  }
  if (deliveryPhases.length === 0) {
    console.warn("[homepage] No delivery phases returned from CMS.");
  }
  if (pridePrinciples.length === 0) {
    console.warn("[homepage] No PRIDE principles returned from CMS.");
  }
  return (
    <>
      <HeroSection
        overline="Pan-African Institutional Advisory"
        title="Institutional Advisory Built for Growth, Transformation, and Execution."
        description="We advise growth-stage companies, institutional operators, and public-sector leaders navigating structural complexity across strategy, technology, finance, and governance \u2014 delivering measurable outcomes with discipline."
        primaryCta={{ label: "See How We Deliver", href: "/services" }}
      />

      <SectionDivider />

      <FeaturedServicesSection />

      <SectionDivider />

      <div className="relative overflow-hidden">
        <AtmosphericLayer />
        <CapabilityPanelsSection />
      </div>

      <div className="relative overflow-hidden">
        <AtmosphericLayer />
        <DecisionGateway />
      </div>

      <SectionDivider />

      <div className="relative overflow-hidden">
        <AtmosphericLayer />
        <FeaturedIndustriesSection industries={industries} />
      </div>

      <div className="relative overflow-hidden">
        <AtmosphericLayer />
        <InsightsCarouselSection insights={insights} />
      </div>

      <div className="relative overflow-hidden">
        <AtmosphericLayer />
        <EngagementFrameworkSection phases={deliveryPhases} />
      </div>

      <div className="relative overflow-hidden">
        <AtmosphericLayer />
        <PridePhilosophySection
          principles={pridePrinciples}
          latestInsight={insights[0] ?? null}
        />
      </div>

      <SectionDivider />

      <div className="relative overflow-hidden">
        <AtmosphericLayer />
        <InstitutionalMetricsSection showCta={false} />
      </div>

      {/* CTA + CinematicVisualPanel grid, Figma style */}
      <section className="relative overflow-hidden" style={{ background: '#0B2239' }}>
        <div className="layout-container py-20 md:py-28 lg:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: CTA text/buttons */}
            <div className="flex flex-col justify-center h-full">
              <h2 className="text-4xl font-bold leading-tight text-white mb-6 lg:text-5xl">Begin a Conversation With Our Advisory Team.</h2>
              <p className="max-w-[52ch] text-lg leading-relaxed text-white/80 mb-10">Every engagement begins with a structured conversation. No obligations - simply an exchange of context to determine whether there is a basis for collaboration.</p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <a
                  href="/contact?from=cta&context=Begin%20a%20Conversation%20With%20Our%20Advisory%20Team."
                  className="inline-block rounded-card bg-white px-8 py-4 text-center text-base font-semibold text-[#071a2f] shadow transition-colors duration-200 hover:bg-slate-200"
                >
                  Schedule an Introduction
                </a>
                <a
                  href="/about"
                  className="inline-flex items-center gap-2 py-4 text-base font-medium text-white/80 transition-colors duration-200 hover:text-white"
                >
                  Download Firm Overview
                  <span aria-hidden="true" className="text-lg">→</span>
                </a>
              </div>
            </div>
            {/* Right: Static image, aspect ratio and rounded corners */}
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
