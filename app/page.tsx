import type { Metadata } from "next";
import Link from "next/link";
import groq from "groq";
import HeroSection from "@/components-v2/sections/HeroSection";
import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";
import ServiceCard from "@/components-v2/ui/ServiceCard";
import IndustryCard from "@/components-v2/ui/IndustryCard";
import InsightsGridSection from "@/components-v2/sections/InsightsGridSection";
import ServicesDeliveryModelSection from "@/components-v2/sections/ServicesDeliveryModelSection";
import TrustSignalsSection from "@/components-v2/sections/TrustSignalsSection";
import CTABlock from "@/components-v2/sections/CTABlock";
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

const TRUST_SIGNALS_QUERY = groq`*[_type == "trust_signal"] | order(coalesce(order, _createdAt) asc) {
  _id,
  title,
  description
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

type TrustSignalResult = {
  _id: string;
  title?: string;
  description?: string;
};

export default async function Home() {
  const [servicesRaw, industriesRaw, insightsRaw, phasesRaw, principlesRaw, trustRaw] = await Promise.all([
    sanityClient.fetch<ServiceQueryResult[]>(HOMEPAGE_SERVICES_QUERY),
    sanityClient.fetch<IndustryQueryResult[]>(HOMEPAGE_INDUSTRIES_QUERY),
    sanityClient.fetch<InsightQueryResult[]>(HOMEPAGE_INSIGHTS_QUERY),
    sanityClient.fetch<DeliveryPhaseResult[]>(DELIVERY_PHASES_QUERY),
    sanityClient.fetch<PridePrincipleResult[]>(PRIDE_PRINCIPLES_QUERY),
    sanityClient.fetch<TrustSignalResult[]>(TRUST_SIGNALS_QUERY),
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

  const trustIndicators = (trustRaw ?? [])
    .filter((item): item is TrustSignalResult & { title: string; description: string } =>
      Boolean(item?.title && item?.description)
    )
    .map((item) => ({
      title: item.title,
      description: item.description,
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
  if (trustIndicators.length === 0) {
    console.warn("[homepage] No trust signals returned from CMS.");
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

      <SectionWrapper background="neutral50">
        <SectionHeader
          overline="Advisory Architecture"
          title="Ten disciplines. One integrated practice."
          description="Each capability operates within a shared delivery framework — ensuring strategy, digital, financial, and governance workstreams are coordinated from diagnostic through handover."
        />
        <div className="rhythm-heading-grid grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
          {services.map((svc, index) => (
            <ServiceCard
              key={svc.slug ?? index}
              slug={svc.slug ?? ""}
              title={svc.title ?? "Advisory Service"}
              focusAreas={svc.focusAreas ?? svc.summary ?? ""}
              approach={svc.approach ?? svc.description ?? "Learn how we deliver outcomes."}
              index={index}
            />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper background="neutral50" padV={{ mobile: 48, tablet: 56, desktop: 64 }}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-semibold text-text-primary">Not sure where to start?</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/services" className="rounded-card border border-neutral-300 px-4 py-2 text-sm font-semibold text-accent-primary hover:border-neutral-400">
              Explore by Service
            </Link>
            <Link href="/industries" className="rounded-card border border-neutral-300 px-4 py-2 text-sm font-semibold text-accent-primary hover:border-neutral-400">
              Explore by Industry
            </Link>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper background="white">
        <SectionHeader
          overline="Industry Coverage"
          title="Deep sector knowledge. Continental reach."
          description="Sector fluency calibrated to regulatory, capital, and digital realities."
        />
        <div className="rhythm-heading-grid grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
          {industries.map((industry) => (
            <IndustryCard
              key={industry.slug}
              title={industry.title}
              description={industry.description}
              href={`/industries/${industry.slug}`}
            />
          ))}
        </div>
      </SectionWrapper>

      <InsightsGridSection
        insights={insights}
        background="neutral50"
        showFilters={false}
        overline="Perspectives"
        title="Institutional analysis. Applied insight."
      />

      <ServicesDeliveryModelSection phases={deliveryPhases} />

      <SectionWrapper background="neutral50">
        <SectionHeader overline="Our Philosophy" title="Built for Execution." />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {pridePrinciples.map((item) => (
            <div key={item.letter} className="border-t-2 border-[var(--a700)] pt-6">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted mb-2">{item.letter}</div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">{item.title}</h3>
              <p className="text-base leading-[1.6] text-text-secondary">{item.body}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <TrustSignalsSection indicators={trustIndicators} title="Institutional advisory. Measurable outcomes." intro={undefined} />

      <CTABlock
        title="Begin a conversation with our advisory team."
        description="Every engagement begins with a structured conversation to clarify objectives, constraints, and delivery expectations."
        primaryLabel="Schedule an Introduction"
        primaryHref="/contact"
        secondaryLabel="Explore Services"
        secondaryHref="/services"
      />
    </>
  );
}
