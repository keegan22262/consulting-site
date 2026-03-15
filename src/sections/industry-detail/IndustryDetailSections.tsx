import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components-v2/ui/Breadcrumb";
import { ExploreRelatedKnowledge, type KnowledgeLink } from "@/components-v2/ui/RelatedKnowledge";
import ServiceCard from "@/components-v2/ui/ServiceCard";
import { SERVICES, type ServiceItem } from "@/src/sections/services/data";
import { INDUSTRY_IMAGES } from "@/src/sections/industries/data";
import { CASE_STUDIES } from "@/src/sections/case-study/data";

export type IndustryRelatedService = {
  slug: string;
  title: string;
  description: string;
};

export type IndustryRelatedInsight = {
  slug: string;
  title: string;
  category: string;
  summary?: string;
  readingTime?: string | number;
};

interface Props {
  slug: string;
  title: string;
  summary: string;
  description: string;
  challenge: string;
  regulatoryContext: string;
  relatedServices: IndustryRelatedService[];
  relatedInsights: IndustryRelatedInsight[];
  heroImage?: string;
}

const INSIGHT_IMAGES = [
  "/images/insights/insight-1.jpg",
  "/images/insights/insight-2.jpg",
  "/images/insights/insight-3.jpg",
  "/images/insights/insight-4.jpg",
  "/images/insights/insight-5.jpg",
];

const FUTURE_APPROACH_IMAGES = [
  "/images/industries/hero/hero-boardroom.jpg",
  "/images/industries/hero/hero-bridge-infrastructure.jpg",
  "/images/industries/hero/hero-digital-command-center.jpg",
  "/images/industries/hero/hero-city-skyline.jpg",
];

const ADVISORY_CTA_IMAGES = [
  "/images/advisory/institutional-01.jpg",
  "/images/advisory/institutional-02.jpg",
  "/images/advisory/institutional-03.jpg",
];

export default function IndustryDetailSections(props: Props) {
  const {
    slug,
    title,
    summary,
    description,
    regulatoryContext,
    relatedServices,
    relatedInsights,
    heroImage,
  } = props;

  const positioning = summary || description;
  const body = description || summary;
  const includes = regulatoryContext;

  const effectiveHeroImage =
    heroImage || INDUSTRY_IMAGES[slug] || "/images/industries/hero/hero-boardroom.jpg";

  const futureImage = getRotatedImage(slug, FUTURE_APPROACH_IMAGES);
  const advisoryImage = getRotatedImage(slug, ADVISORY_CTA_IMAGES);
  const serviceItems = buildServiceItems(relatedServices);
  const caseStudies = CASE_STUDIES.filter((cs) => cs.industryIds.includes(slug)).slice(0, 2);

  return (
    <>
      <IndustryEditorialHero title={title} positioning={positioning} />

      <IndustryCinematicImage image={effectiveHeroImage} title={title} />

      <IndustryNarrativeSection body={body} includes={includes} />

      {serviceItems.length > 0 ? (
        <ServicesSupportingSection services={serviceItems} />
      ) : (
        <Spacer />
      )}

      <FutureApproachSection title={title} image={futureImage} />

      <SectorAdvisoryCta title={title} image={advisoryImage} />

      <OutcomeSignalsSection signals={OUTCOME_SIGNALS[slug] || DEFAULT_OUTCOME_SIGNALS} />

      {relatedInsights.length > 0 ? (
        <IndustryRelatedInsights insights={relatedInsights} />
      ) : (
        <Spacer />
      )}

      {caseStudies.length > 0 ? (
        <IndustryRelatedCaseStudies caseStudies={caseStudies} />
      ) : (
        <Spacer />
      )}

      <IndustryKnowledgeNav
        services={serviceItems}
        insights={relatedInsights}
        caseStudies={caseStudies}
      />

      <IndustryPreFooterCta />
    </>
  );
}

function Spacer() {
  return <div className="py-10" />;
}

function IndustryEditorialHero({
  title,
  positioning,
}: {
  title: string;
  positioning: string;
}) {
  return (
    <section className="bg-white">
      <div className="layout-container pb-10 pt-20 md:pb-12 md:pt-24 lg:pb-16 lg:pt-32">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: "RSL", href: "/" },
              { label: "Industries", href: "/industries" },
              { label: title },
            ]}
          />
        </div>
        <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[#64748B]">
          Industry
        </span>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.02em] text-[#0F1720] md:text-4xl lg:text-5xl">
          {title}.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-[1.65] text-[#475569] md:text-lg">
          {positioning}
        </p>
      </div>
    </section>
  );
}

function IndustryCinematicImage({ image, title }: { image: string; title: string }) {
  return (
    <section className="bg-white pb-12 md:pb-16 lg:pb-20">
      <div className="layout-container">
        <div className="relative w-full overflow-hidden rounded-xl pt-[45%] shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            style={{ filter: "contrast(1.05)" }}
            sizes="(max-width: 1024px) 100vw, 1120px"
          />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-black/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}

function IndustryNarrativeSection({ body, includes }: { body: string; includes: string }) {
  return (
    <section className="bg-white py-14 md:py-16 lg:py-20">
      <div className="layout-container">
        <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#64748B]">
          Sector Overview
        </span>
        <h2 className="mt-2 text-2xl font-semibold text-[#0F1720] md:text-3xl lg:text-4xl">
          Sector Landscape.
        </h2>
        <div className="mt-8 h-0.5 w-12 bg-[#1B3A5C]" />

        <div className="mt-8 grid gap-8 md:grid-cols-[7fr_5fr] md:gap-16">
          <div>
            <p className="text-base leading-[1.65] text-[#475569] md:text-lg">
              {body}
            </p>
          </div>
          <div>
            <div className="border-l-2 border-[#1B3A5C] pl-6">
              <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[#1B3A5C]">
                Includes
              </span>
              <p className="mt-3 text-sm leading-[1.55] text-[#64748B]">
                {includes}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSupportingSection({ services }: { services: ServiceItem[] }) {
  return (
    <section className="bg-[#F8FAFC] py-14 md:py-16 lg:py-20">
      <div className="layout-container">
        <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#64748B]">
          Advisory Architecture
        </span>
        <h2 className="mt-2 text-2xl font-semibold text-[#0F1720] md:text-3xl lg:text-4xl">
          Services Supporting This Industry.
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
          {services.map((svc, index) => (
            <ServiceCard
              key={svc.slug}
              slug={svc.slug}
              title={svc.title}
              focusAreas={svc.focusAreas}
              approach={svc.approach}
              index={index}
              variant="industry"
              ctaLabel="Explore Service"
              showCornerArrow
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FutureApproachSection({ title, image }: { title: string; image: string }) {
  return (
    <section className="bg-white py-14 md:py-16 lg:py-20">
      <div className="layout-container">
        <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#64748B]">
          Industry Foresight
        </span>
        <h2 className="mt-2 text-2xl font-semibold text-[#0F1720] md:text-3xl lg:text-4xl">
          Our Approach to the Future of {title}.
        </h2>
        <div className="mt-8 h-0.5 w-12 bg-[#1B3A5C]" />

        <p className="mt-8 max-w-[68ch] text-base leading-[1.65] text-[#475569] md:text-lg">
          The future of the {title.toLowerCase()} sector will be shaped by accelerating technological change, evolving
          regulatory environments, and rising expectations from stakeholders. Institutions operating in this space must
          navigate complex structural shifts while maintaining operational resilience and long-term strategic clarity.
          Success will increasingly depend on the ability to anticipate disruption rather than merely respond to it.
        </p>

        <div className="relative my-10 w-full overflow-hidden rounded-xl pt-[52%] shadow-[0_8px_32px_rgba(0,0,0,0.08)] md:my-12 md:pt-[45%]">
          <Image
            src={image}
            alt={`The future of ${title}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1120px"
          />
        </div>

        <p className="max-w-[68ch] text-base leading-[1.65] text-[#475569] md:text-lg">
          Our advisory approach focuses on helping institutions anticipate disruption, redesign strategic operating
          models, and implement transformation initiatives that align long-term institutional capabilities with
          emerging market realities. We combine deep sector knowledge with rigorous analytical frameworks to develop
          perspectives that are both forward-looking and actionable - enabling leaders to make confident decisions in
          the face of uncertainty.
        </p>
      </div>
    </section>
  );
}

function SectorAdvisoryCta({ title, image }: { title: string; image: string }) {
  return (
    <section className="bg-[#0C1C2E]">
      <div className="layout-container grid lg:min-h-120 lg:grid-cols-2">
        <div className="relative min-h-70 overflow-hidden lg:min-h-full">
          <Image
            src={image}
            alt={`${title} advisory context`}
            fill
            className="object-cover"
            style={{ filter: "grayscale(30%) contrast(1.08)" }}
            sizes="(max-width: 1024px) 100vw, 720px"
          />
          <div className="absolute inset-y-0 right-0 hidden w-28 bg-linear-to-r from-transparent to-[#0C1C2E] lg:block" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-[#0C1C2E] to-transparent lg:hidden" />
        </div>
        <div className="flex flex-col justify-center py-12 md:py-16 lg:py-20 lg:pl-16">
          <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-white/60">
            Sector Advisory
          </span>
          <h2 className="mt-4 text-[1.5rem] font-semibold leading-[1.2] text-white md:text-[2rem]">
            How we support leaders in {title.toLowerCase()}.
          </h2>
          <p className="mt-4 max-w-[46ch] text-base leading-[1.7] text-[#CBD7E6]">
            Our industry team brings deep sector experience across strategy, operations, digital, risk, and
            organizational transformation. Every engagement is structured around your specific context and
            objectives.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-lg bg-white px-7 py-3 text-center text-sm font-semibold text-[#0C1C2E] transition hover:bg-[#F1F5F9]"
            >
              Schedule an Introduction
            </Link>
            <Link
              href="/services"
              className="rounded-lg border border-white/30 px-7 py-3 text-center text-sm font-semibold text-white/85 transition hover:border-white/60 hover:text-white"
            >
              Explore Related Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function OutcomeSignalsSection({ signals }: { signals: OutcomeSignal[] }) {
  return (
    <section className="bg-white py-14 md:py-16 lg:py-20">
      <div className="layout-container">
        <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#1B3A5C]">Outcome Signals</span>
        <h3 className="mt-3 text-[1.5rem] font-semibold leading-[1.2] text-[#0F1720] md:text-[2rem]">
          Measurable Impact.
        </h3>
        <p className="mt-4 max-w-[60ch] text-base leading-[1.7] text-[#475569]">
          Outcome metrics are calibrated to each engagement. The following represent typical measurement dimensions
          across our industry advisory work.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {signals.map((signal, index) => (
            <div key={`${signal.label}-${index}`} className="border-t-2 border-[#1B3A5C] pt-6">
              <p className="text-[1.875rem] font-semibold leading-none text-[#1B3A5C] md:text-[2.25rem]">
                {signal.value}
              </p>
              <h4 className="mt-3 text-base font-semibold text-[#0F1720]">{signal.label}</h4>
              <p className="mt-2 text-sm leading-[1.6] text-[#64748B]">{signal.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IndustryRelatedInsights({ insights }: { insights: IndustryRelatedInsight[] }) {
  return (
    <section className="bg-[#F8FAFC] py-14 md:py-16 lg:py-20">
      <div className="layout-container">
        <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#64748B]">
          Related Perspectives
        </span>
        <h3 className="mt-3 text-[1.5rem] font-semibold leading-[1.2] text-[#0F1720] md:text-[2rem]">
          Industry Insights.
        </h3>
        <p className="mt-4 max-w-[56ch] text-base leading-[1.7] text-[#475569]">
          Research and analysis relevant to this sector, drawn from our institutional knowledge base.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {insights.map((insight, index) => (
            <InsightMiniCard
              key={insight.slug}
              insight={insight}
              image={INSIGHT_IMAGES[index % INSIGHT_IMAGES.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function InsightMiniCard({
  insight,
  image,
}: {
  insight: IndustryRelatedInsight;
  image: string;
}) {
  const readTime =
    typeof insight.readingTime === "number"
      ? `${insight.readingTime} min read`
      : insight.readingTime ?? "";

  return (
    <Link
      href={`/insights/${insight.slug}`}
      className="group block overflow-hidden rounded-xl border border-[#E2E8F0] bg-white transition duration-200 ease-out hover:border-[#CBD5E1] hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)]"
    >
      <div className="relative w-full pt-[50%]">
        <Image src={image} alt={insight.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 420px" />
      </div>
      <div className="px-4 py-4">
        <div className="mb-2 flex items-center justify-between text-[0.625rem] uppercase tracking-[0.06em] text-[#1B3A5C]">
          <span className="font-semibold">{insight.category}</span>
          {readTime ? <span className="text-[#94A3B8]">{readTime}</span> : null}
        </div>
        <h4 className="text-sm font-semibold leading-[1.4] text-[#0F1720] transition-colors duration-200 group-hover:text-[#1B3A5C] line-clamp-3">
          {insight.title}
        </h4>
      </div>
    </Link>
  );
}

function IndustryRelatedCaseStudies({ caseStudies }: { caseStudies: typeof CASE_STUDIES }) {
  return (
    <section className="bg-white py-14 md:py-16 lg:py-20">
      <div className="layout-container">
        <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#64748B]">Client Impact</span>
        <h3 className="mt-3 text-[1.5rem] font-semibold leading-[1.2] text-[#0F1720] md:text-[2rem]">
          Related Engagements.
        </h3>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {caseStudies.map((cs) => (
            <CaseStudyCard key={cs.slug} cs={cs} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudyCard({ cs }: { cs: (typeof CASE_STUDIES)[number] }) {
  return (
    <Link
      href={`/case-studies/${cs.slug}`}
      className="group block overflow-hidden rounded-xl border border-[#E2E8F0] bg-white transition duration-200 ease-out hover:border-[#CBD5E1] hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)]"
    >
      <div className="relative w-full pt-[50%]">
        <Image src={cs.image} alt={cs.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 520px" />
      </div>
      <div className="px-5 py-5">
        <span className="block text-[0.625rem] font-semibold uppercase tracking-[0.06em] text-[#1B3A5C]">
          Client Impact
        </span>
        <h4 className="mt-2 text-base font-semibold text-[#0F1720] transition-colors duration-200 group-hover:text-[#1B3A5C]">
          {cs.title}
        </h4>
        <p className="mt-2 text-sm leading-[1.55] text-[#64748B] line-clamp-3">
          {cs.summary}
        </p>
        <div className="mt-4 flex gap-4 border-t border-[#F1F5F9] pt-3">
          {cs.metrics.slice(0, 2).map((metric) => (
            <div key={metric.label}>
              <span className="block text-sm font-semibold text-[#1B3A5C]">{metric.value}</span>
              <span className="text-[0.625rem] uppercase tracking-[0.02em] text-[#94A3B8]">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}

function IndustryKnowledgeNav({
  services,
  insights,
  caseStudies,
}: {
  services: ServiceItem[];
  insights: IndustryRelatedInsight[];
  caseStudies: typeof CASE_STUDIES;
}) {
  const serviceLinks: KnowledgeLink[] = services.map((svc) => ({
    label: svc.title,
    href: `/services/${svc.slug}`,
  }));
  const insightLinks: KnowledgeLink[] = insights.map((ins) => ({
    label: ins.title,
    href: `/insights/${ins.slug}`,
    category: ins.category,
  }));
  const caseStudyLinks: KnowledgeLink[] = caseStudies.map((cs) => ({
    label: cs.title,
    href: `/case-studies/${cs.slug}`,
  }));

  return (
    <ExploreRelatedKnowledge
      services={serviceLinks}
      insights={insightLinks}
      caseStudies={caseStudyLinks}
    />
  );
}

function IndustryPreFooterCta() {
  return (
    <section className="bg-[#1B3A5C] py-16 md:py-20">
      <div className="layout-container">
        <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-white/60">
          Next Step
        </span>
        <h3 className="mt-3 max-w-[32ch] text-[1.5rem] font-semibold leading-[1.2] text-white md:text-[2rem]">
          Discuss your sector-specific advisory needs.
        </h3>
        <p className="mt-4 max-w-[60ch] text-base leading-[1.7] text-white/75">
          Every engagement begins with a structured conversation. No obligations - an exchange of context to determine
          whether there is a basis for collaboration.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-lg bg-white px-7 py-3 text-center text-sm font-semibold text-[#1B3A5C] transition hover:bg-[#F1F5F9]"
          >
            Speak with our industry team
          </Link>
          <Link
            href="/coverage"
            className="rounded-lg border border-white/40 px-7 py-3 text-center text-sm font-semibold text-white/85 transition hover:border-white/60 hover:text-white"
          >
            View full coverage matrix
          </Link>
        </div>
      </div>
    </section>
  );
}

function buildServiceItems(relatedServices: IndustryRelatedService[]) {
  if (!relatedServices || relatedServices.length === 0) {
    return SERVICES.slice(0, 4);
  }

  const serviceMap = new Map(SERVICES.map((svc) => [svc.slug, svc]));
  const items = relatedServices.map((svc) => {
    const match = serviceMap.get(svc.slug);
    return match
      ? match
      : {
          slug: svc.slug,
          title: svc.title,
          focusAreas: svc.description,
          approach: svc.description,
        };
  });

  return items.length > 0 ? items : SERVICES.slice(0, 4);
}

function getRotatedImage(slug: string, images: string[]) {
  if (images.length === 0) return "/images/industries/hero/hero-boardroom.jpg";
  const offset = getSlugOffset(slug, images.length);
  return images[offset];
}

function getSlugOffset(slug: string, modulo: number) {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash + slug.charCodeAt(i)) % modulo;
  }
  return hash;
}

type OutcomeSignal = {
  value: string;
  label: string;
  note: string;
};

const DEFAULT_OUTCOME_SIGNALS: OutcomeSignal[] = [
  {
    value: "-",
    label: "Revenue / Growth Impact",
    note: "Engagement-specific metrics available upon request",
  },
  {
    value: "-",
    label: "Operational Efficiency",
    note: "Measured across delivery timelines and cost baselines",
  },
  {
    value: "-",
    label: "Risk Reduction",
    note: "Compliance, governance, and control environment improvements",
  },
];

const OUTCOME_SIGNALS: Record<string, OutcomeSignal[]> = {
  "financial-services": [
    {
      value: "30-50%",
      label: "Compliance Cost Reduction",
      note: "Through regulatory framework modernization and automation of control environments",
    },
    {
      value: "2-4x",
      label: "Digital Channel Adoption",
      note: "Accelerated customer migration to digital platforms via UX-led transformation",
    },
    {
      value: "15-25%",
      label: "Operational Cost Efficiency",
      note: "Process optimization across middle and back office operations",
    },
  ],
  "healthcare-life-sciences": [
    {
      value: "20-35%",
      label: "Clinical Workflow Efficiency",
      note: "Through digital enablement and care pathway redesign",
    },
    {
      value: "10-20%",
      label: "Cost-to-Serve Reduction",
      note: "Operational excellence programs across administrative and clinical functions",
    },
    {
      value: "40%+",
      label: "Digital Engagement Uplift",
      note: "Patient and member digital adoption through platform transformation",
    },
  ],
  "energy-resources": [
    {
      value: "15-30%",
      label: "Asset Performance Improvement",
      note: "Analytics-enabled maintenance and reliability-centered optimization",
    },
    {
      value: "20-40%",
      label: "Capital Delivery Efficiency",
      note: "Project governance and procurement assurance across major programs",
    },
    {
      value: "25%+",
      label: "Safety Incident Reduction",
      note: "Systematic safety culture transformation and process redesign",
    },
  ],
  "industrials-manufacturing": [
    {
      value: "10-25%",
      label: "Throughput Improvement",
      note: "Lean transformation and plant network optimization programs",
    },
    {
      value: "15-30%",
      label: "Procurement Savings",
      note: "Strategic sourcing, supplier consolidation, and demand-supply alignment",
    },
    {
      value: "20-35%",
      label: "Quality Cost Reduction",
      note: "Root cause analysis and quality management system modernization",
    },
  ],
  "consumer-retail": [
    {
      value: "5-12%",
      label: "Revenue Growth Acceleration",
      note: "Pricing optimization, promotion effectiveness, and channel mix strategy",
    },
    {
      value: "15-25%",
      label: "Supply Chain Cost Reduction",
      note: "Demand forecasting, inventory optimization, and logistics redesign",
    },
    {
      value: "2-3x",
      label: "Digital Conversion Uplift",
      note: "Omnichannel experience redesign and personalization programs",
    },
  ],
  "technology-digital": [
    {
      value: "20-40%",
      label: "Time-to-Market Acceleration",
      note: "Product development process redesign and platform modernization",
    },
    {
      value: "15-30%",
      label: "Unit Economics Improvement",
      note: "Operating model optimization and cloud infrastructure rationalization",
    },
    {
      value: "25%+",
      label: "Customer Retention Uplift",
      note: "Customer lifecycle optimization and engagement architecture redesign",
    },
  ],
  "transport-logistics": [
    {
      value: "10-20%",
      label: "Network Utilization Improvement",
      note: "Capacity planning, route optimization, and asset deployment strategy",
    },
    {
      value: "15-30%",
      label: "Operational Cost Reduction",
      note: "Warehouse efficiency, fulfillment redesign, and automation programs",
    },
    {
      value: "20%+",
      label: "Service Reliability Enhancement",
      note: "Disruption management and real-time visibility infrastructure",
    },
  ],
  "public-sector-government": [
    {
      value: "30-50%",
      label: "Service Delivery Improvement",
      note: "Citizen experience redesign and digital service channel modernization",
    },
    {
      value: "20-35%",
      label: "Administrative Cost Reduction",
      note: "Process optimization, shared services, and governance modernization",
    },
    {
      value: "40%+",
      label: "Digital Citizen Engagement",
      note: "GovTech maturity improvement and digital-first service architecture",
    },
  ],
  "real-estate-infrastructure": [
    {
      value: "10-25%",
      label: "Portfolio Return Improvement",
      note: "Asset management optimization and portfolio rationalization strategy",
    },
    {
      value: "15-30%",
      label: "Project Delivery Efficiency",
      note: "Governance, procurement assurance, and delivery risk management",
    },
    {
      value: "20%+",
      label: "Sustainability Performance",
      note: "ESG integration, energy efficiency programs, and green certification",
    },
  ],
  "private-capital": [
    {
      value: "2-5x",
      label: "Value Creation Multiple",
      note: "Full-potential plans combining growth strategy with operational improvement",
    },
    {
      value: "30-50%",
      label: "Integration Timeline Reduction",
      note: "Post-merger integration acceleration through structured methodology",
    },
    {
      value: "15-25%",
      label: "EBITDA Margin Expansion",
      note: "Cost optimization, pricing strategy, and operating model redesign across portfolio",
    },
  ],
  education: [
    {
      value: "20-35%",
      label: "Operational Efficiency Gain",
      note: "Administrative process optimization and digital enablement programs",
    },
    {
      value: "15-30%",
      label: "Outcome Measurement Improvement",
      note: "Performance management frameworks and impact evaluation methodology",
    },
    {
      value: "25%+",
      label: "Funding Effectiveness",
      note: "Grant management optimization, donor strategy, and resource allocation",
    },
  ],
};
