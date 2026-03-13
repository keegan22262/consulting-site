import CTABlock from "@/components-v2/sections/CTABlock";
import ServicesChallengeSection from "@/components-v2/sections/ServicesChallengeSection";
import ServicesDeliverablesSection from "@/components-v2/sections/ServicesDeliverablesSection";
import ServicesDetailHeroSection from "@/components-v2/sections/ServicesDetailHeroSection";
import ServicesDeliveryModelSection from "@/components-v2/sections/ServicesDeliveryModelSection";
import ServicesRelatedIndustriesSection from "@/components-v2/sections/ServicesRelatedIndustriesSection";
import ServicesRelatedInsightsSection from "@/components-v2/sections/ServicesRelatedInsightsSection";
import Image from "next/image";
import Link from "next/link";

export type ServiceDeliverable = {
  overline: string;
  title: string;
  body: string;
};

export type ServiceRelatedIndustry = {
  slug: string;
  title: string;
  description: string;
};

export type ServiceRelatedInsight = {
  slug: string;
  title: string;
  category: string;
};

interface Props {
  slug: string;
  number: string;
  title: string;
  summary: string;
  approach: string;
  targetClients: string;
  focusAreas: string;
  deliverables: ServiceDeliverable[];
  relatedIndustries: ServiceRelatedIndustry[];
  relatedInsights: ServiceRelatedInsight[];
  heroImage?: string;
  finalCtaImage?: string;
}

export default function ServiceDetailSections(props: Props) {
  const {
    slug,
    number,
    title,
    summary,
    approach,
    targetClients,
    focusAreas,
    deliverables,
    relatedIndustries,
    relatedInsights,
    heroImage,
    finalCtaImage,
  } = props;

  const effectiveHeroImage = heroImage || "/images/services/hero-services.jpg";
  const effectiveFinalCtaImage = finalCtaImage || "/images/services/advisory-video-still.jpg";

  return (
    <>
      <ServicesDetailHeroSection number={number} title={title} approach={approach || summary} />

      <CinematicServiceImage image={effectiveHeroImage} title={title} />

      <ServicesChallengeSection
        focusAreas={focusAreas || summary}
        targetClients={targetClients}
        approach={approach || summary}
      />

      {deliverables.length > 0 ? <ServicesDeliverablesSection deliverables={deliverables} /> : <Spacer />}

      <StrategicEngagementCta title={title} />

      <ServicesDeliveryModelSection phases={getMethodologyPhases(title)} />

      {relatedInsights.length > 0 ? (
        <ServicesRelatedInsightsSection insights={relatedInsights} />
      ) : (
        <Spacer />
      )}

      {relatedIndustries.length > 0 ? (
        <ServicesRelatedIndustriesSection industries={relatedIndustries} />
      ) : (
        <Spacer />
      )}

      <RelatedCapabilityCaseStudies slug={slug} title={title} />

      <RelatedKnowledgeNavigation title={title} />

      <FinalCapabilityCta title={title} image={effectiveFinalCtaImage} />

      <CTABlock
        title={title || "Talk to a partner"}
        description={summary || approach || "Let’s align on your priorities and delivery approach."}
        primaryLabel="Contact"
        primaryHref="/contact"
      />
    </>
  );
}

function Spacer() {
  return <div style={{ padding: "40px 0" }} />;
}

function CinematicServiceImage({ image, title }: { image: string; title: string }) {
  return (
    <section className="bg-white pb-12 md:pb-16 lg:pb-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="relative w-full overflow-hidden rounded-xl pt-[45%] shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
          <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 1120px" />
          <div className="bg-linear-to-t absolute inset-x-0 bottom-0 h-28 from-black/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}

function StrategicEngagementCta({ title }: { title: string }) {
  return (
    <section className="bg-[#F8FAFC] pb-14 md:pb-16 lg:pb-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="relative overflow-hidden rounded-xl bg-[#1B3A5C] px-8 py-12 md:px-12 md:py-16">
          <div className="bg-linear-to-br absolute inset-0 from-[#0C1C2E]/85 via-[#1B3A5C]/70 to-[#0C1C2E]/85" />
          <div className="relative z-1 max-w-170">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.12em] text-white/65">
              Strategic Engagement
            </span>
            <h2 className="text-[1.5rem] font-semibold leading-[1.2] text-white md:text-[1.875rem]">
              Engage with our {title} team.
            </h2>
            <p className="mt-4 max-w-[56ch] text-sm leading-[1.7] text-[#CBD7E6] md:text-base">
              Every engagement begins with a structured conversation to determine whether there is a basis for
              collaboration and to scope the appropriate response architecture.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-lg bg-white px-8 py-4 text-center text-sm font-semibold text-[#1B3A5C] transition hover:bg-[#F1F5F9]"
              >
                Schedule an Introduction
              </Link>
              <Link
                href="/industries"
                className="rounded-lg border border-white/35 px-8 py-4 text-center text-sm font-semibold text-white/90 transition hover:border-white/60 hover:text-white"
              >
                Explore Related Industries
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCapabilityCta({ title, image }: { title: string; image: string }) {
  return (
    <section className="bg-[#F8FAFC] py-14 md:py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 md:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="relative overflow-hidden rounded-xl pt-[65%] shadow-[0_8px_32px_rgba(0,0,0,0.08)] lg:pt-[75%]">
          <Image
            src={image}
            alt="Strategic transformation"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 560px"
          />
          <div className="bg-linear-to-t absolute inset-0 from-[#0C1C2E]/25 to-transparent" />
        </div>
        <div>
          <span className="mb-4 block text-xs font-semibold uppercase tracking-widest text-[#1B3A5C]">Next Step</span>
          <h3 className="text-[1.5rem] font-semibold leading-[1.2] text-[#0F1720] md:text-[2rem]">
            Ready to activate this capability?
          </h3>
          <p className="mt-4 max-w-[46ch] text-base leading-[1.7] text-[#475569]">
            Every engagement begins with a structured introduction to explore alignment, define scope, and establish a
            shared understanding of the challenge across {title} priorities.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-lg bg-[#1B3A5C] px-10 py-4 text-sm font-semibold text-white transition hover:bg-[#0C1C2E]"
          >
            Schedule an Introduction
          </Link>
        </div>
      </div>
    </section>
  );
}

function RelatedCapabilityCaseStudies({ slug, title }: { slug: string; title: string }) {
  return (
    <section className="bg-white py-14 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <span className="block text-xs font-semibold uppercase tracking-widest text-[#1B3A5C]">Case Applications</span>
        <h3 className="mt-3 text-[1.5rem] font-semibold leading-[1.2] text-[#0F1720] md:text-[2rem]">
          How this capability is applied in live engagements.
        </h3>
        <p className="mt-4 max-w-[62ch] text-base leading-[1.7] text-[#475569]">
          Explore anonymized examples where advisory design and execution governance translated {title.toLowerCase()} objectives into measurable progress.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/case-studies/institutional-transformation-program"
            className="rounded-lg bg-[#1B3A5C] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#0C1C2E]"
          >
            View Case Study
          </Link>
          <Link
            href={`/services/${slug}`}
            className="rounded-lg border border-[#CBD5E1] px-7 py-3 text-sm font-semibold text-[#1B3A5C] transition hover:border-[#94A3B8]"
          >
            Revisit Capability Scope
          </Link>
        </div>
      </div>
    </section>
  );
}

function RelatedKnowledgeNavigation({ title }: { title: string }) {
  return (
    <section className="bg-[#F8FAFC] py-14 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <span className="block text-xs font-semibold uppercase tracking-widest text-[#1B3A5C]">Explore Related Knowledge</span>
        <h3 className="mt-3 text-[1.5rem] font-semibold leading-[1.2] text-[#0F1720] md:text-[2rem]">
          Extend your view beyond {title.toLowerCase()}.
        </h3>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Link
            href="/insights"
            className="rounded-xl border border-[#E2E8F0] bg-white p-6 text-sm font-medium text-[#334155] transition hover:border-[#94A3B8]"
          >
            Related Insights
          </Link>
          <Link
            href="/industries"
            className="rounded-xl border border-[#E2E8F0] bg-white p-6 text-sm font-medium text-[#334155] transition hover:border-[#94A3B8]"
          >
            Sector Context
          </Link>
          <Link
            href="/services"
            className="rounded-xl border border-[#E2E8F0] bg-white p-6 text-sm font-medium text-[#334155] transition hover:border-[#94A3B8]"
          >
            Capability Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}

function getMethodologyPhases(title: string) {
  return [
    {
      label: "01",
      subtitle: "Diagnose the real challenge.",
      body: "We begin by understanding the structural realities shaping your organization, from market dynamics to governance constraints and growth ambitions.",
    },
    {
      label: "02",
      subtitle: "Design a strategy built for execution.",
      body: `Our advisory team translates ${title} priorities into a practical strategy that integrates finance, technology, operations, and governance decisions.`,
    },
    {
      label: "03",
      subtitle: "Turn strategy into transformation.",
      body: "We work alongside leadership teams to execute transformation programs and convert strategic intent into measurable institutional outcomes.",
    },
    {
      label: "04",
      subtitle: "Build institutions that endure.",
      body: "Beyond implementation, we support capability transfer, governance reinforcement, and operating discipline to sustain momentum over time.",
    },
  ];
}
