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
import AtmosphericLayer from "@/components-v2/sections/AtmosphericLayer";
import SectionDivider from "@/components-v2/sections/SectionDivider";
import { sanityClient } from "@/lib/sanity/client";

export const dynamic = "force-dynamic";
export const revalidate = 120;

export const metadata: Metadata = {
  title: "Home",
  description: "Home",
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
        title={insights[0]?.title ?? "Precision-led consulting for growth, transformation, and execution."}
        subtitle={services[0]?.title ?? "Ten disciplines. One integrated practice."}
        description={
          insights[0]?.summary ??
          "We help startups, SMEs, and enterprises execute complex change with disciplined delivery, measurable outcomes, and accountable teams."
        }
        primaryCta={{ label: "See How We Deliver", href: "/services" }}
      />

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
        <FeaturedIndustriesSection />
      </div>

      <div className="relative overflow-hidden">
        <AtmosphericLayer />
        <InsightsCarouselSection />
      </div>

      <SectionDivider />

      <div className="relative overflow-hidden">
        <AtmosphericLayer />
        <EngagementFrameworkSection phases={deliveryPhases} />
      </div>

      <div className="relative overflow-hidden">
        <AtmosphericLayer />
        <PridePhilosophySection principles={pridePrinciples} />
      </div>

      <SectionDivider />

      <div className="relative overflow-hidden">
        <AtmosphericLayer />
        <InstitutionalMetricsSection />
      </div>
    </>
  );
}
