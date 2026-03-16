"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import InsightsCarouselSection from "@/components-v2/sections/InsightsCarouselSection";
import SectionHeader from "@/components-v2/sections/SectionHeader";
import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import Breadcrumb from "@/components-v2/ui/Breadcrumb";
import EditorialIndustryCard from "@/components-v2/ui/EditorialIndustryCard";
import GatewayLink from "@/components-v2/ui/GateWayLink";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";
import { CaseStudyCard, ExploreRelatedKnowledge, type KnowledgeLink } from "@/components-v2/ui/RelatedKnowledge";
import { CASE_STUDIES } from "@/src/sections/case-study/data";
import { INSIGHTS_DATA } from "@/src/sections/insights/data";
import { CAPABILITIES } from "@/src/sections/service-detail/capabilities";
import { CAPABILITY_CARD_IMAGES } from "@/src/sections/service-detail/capabilityCardImages";
import {
  FINAL_CTA_IMAGES,
  IMG_CTA_PATTERN,
  IMG_FINAL_CTA_FALLBACK,
  SERVICE_IMAGES,
} from "@/src/sections/service-detail/images";
import { INDUSTRY_IMAGES_REF, INDUSTRY_REF } from "@/src/sections/service-detail/industryRefs";
import {
  METHODOLOGY_STAGE_IMAGES,
  METHODOLOGY_STAGES,
} from "@/src/sections/service-detail/methodologyImages";

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
  summary?: string;
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

  const capabilityFallback = slug ? CAPABILITIES[slug] : undefined;
  const safeDeliverables = Array.isArray(deliverables) && deliverables.length > 0
    ? deliverables
    : capabilityFallback?.deliverables ?? [];
  const safeRelatedIndustries = Array.isArray(relatedIndustries) && relatedIndustries.length > 0
    ? relatedIndustries
    : (capabilityFallback?.relatedIndustries ?? []).map((id) => ({
        slug: id,
        title: INDUSTRY_REF[id]?.title ?? id,
        description: INDUSTRY_REF[id]?.description ?? "",
      }));
  const safeRelatedInsights = Array.isArray(relatedInsights) && relatedInsights.length > 0
    ? relatedInsights
    : INSIGHTS_DATA.slice(0, 5).map((insight) => ({
        slug: insight.slug,
        title: insight.headline,
        category: insight.category,
        summary: insight.whatItMeans,
      }));

  const effectiveTitle = title || capabilityFallback?.title || "";
  const effectiveNumber = number || capabilityFallback?.number || "";
  const effectiveApproach = approach || capabilityFallback?.approach || summary;
  const effectiveSummary = summary || capabilityFallback?.approach || "";
  const effectiveTargetClients = targetClients || capabilityFallback?.targetClients || "";
  const effectiveFocusAreas = focusAreas || capabilityFallback?.focusAreas || "";

  const effectiveHeroImage =
    heroImage || (slug ? SERVICE_IMAGES[slug] : undefined) || SERVICE_IMAGES.strategy;
  const effectiveFinalCtaImage =
    finalCtaImage || (slug ? FINAL_CTA_IMAGES[slug] : undefined) || IMG_FINAL_CTA_FALLBACK;
  const capabilityImages = (slug ? CAPABILITY_CARD_IMAGES[slug] : undefined) || CAPABILITY_CARD_IMAGES.strategy;
  const methodologyImages =
    (slug ? METHODOLOGY_STAGE_IMAGES[slug] : undefined) || METHODOLOGY_STAGE_IMAGES.strategy;
  const relatedCaseStudies = CASE_STUDIES.filter((cs) => cs.serviceIds.includes(slug)).slice(0, 2);
  const knowledgeIndustries: KnowledgeLink[] = safeRelatedIndustries.map((industry) => ({
    label: industry.title,
    href: `/industries/${industry.slug}`,
  }));
  const knowledgeInsights: KnowledgeLink[] = safeRelatedInsights.map((insight) => ({
    label: insight.title,
    href: `/insights/${insight.slug}`,
    category: insight.category,
  }));
  const knowledgeCaseStudies: KnowledgeLink[] = relatedCaseStudies.map((cs) => ({
    label: cs.title,
    href: `/case-studies/${cs.slug}`,
  }));

  return (
    <>
      <ServiceTextHero number={effectiveNumber} title={effectiveTitle} approach={effectiveApproach} />

      <CinematicServiceImage image={effectiveHeroImage} title={effectiveTitle} />

      <FocusAreasSection
        focusAreas={effectiveFocusAreas || effectiveSummary}
        targetClients={effectiveTargetClients}
        approach={effectiveApproach || effectiveSummary}
      />

      {safeDeliverables.length > 0 ? (
        <CapabilityCardsSection deliverables={safeDeliverables} images={capabilityImages} />
      ) : (
        <Spacer />
      )}

      <StrategicEngagementCta title={effectiveTitle} />

      <MethodologySection images={methodologyImages} />

      {safeRelatedInsights.length > 0 ? (
        <InsightsCarouselSection
          insights={safeRelatedInsights}
          overline="Related Perspectives"
          title="Insights for this service."
          description="Explore perspectives drawn from advisory engagements, sector research, and institutional transformation."
          titleHref={null}
          exploreHref="/insights"
          exploreLabel="Explore all insights"
          hideFilters
        />
      ) : (
        <Spacer />
      )}

      {safeRelatedIndustries.length > 0 ? (
        <IndustryApplicationSection industryIds={safeRelatedIndustries.map((industry) => industry.slug)} />
      ) : (
        <Spacer />
      )}

      {relatedCaseStudies.length > 0 ? (
        <ServiceCaseStudiesSection caseStudies={relatedCaseStudies} />
      ) : (
        <Spacer />
      )}

      <ExploreRelatedKnowledge
        industries={knowledgeIndustries}
        insights={knowledgeInsights}
        caseStudies={knowledgeCaseStudies}
      />

      <FinalCapabilityCta title={effectiveTitle} image={effectiveFinalCtaImage} />
    </>
  );
}

function ServiceCaseStudiesSection({ caseStudies }: { caseStudies: typeof CASE_STUDIES }) {
  return (
    <SectionWrapper background="neutral50" padV={{ mobile: 56, tablet: 72, desktop: 96 }}>
      <SectionHeader
        overline="Client Impact"
        title="Related Engagements."
        description="Selected case studies demonstrating this service in practice."
        showAccentRule={false}
        maxWidth="52ch"
      />
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {caseStudies.map((cs) => (
          <CaseStudyCard
            key={cs.slug}
            cs={{
              slug: cs.slug,
              title: cs.title,
              image: cs.image,
              summary: cs.summary,
              metrics: cs.metrics,
            }}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}

function Spacer() {
  return <div className="py-10" />;
}

function ServiceTextHero({
  number,
  title,
  approach,
}: {
  number: string;
  title: string;
  approach: string;
}) {
  return (
    <section className="bg-white">
      <div className="layout-container pb-10 pt-20 md:pb-12 md:pt-24 lg:pb-16 lg:pt-32">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: "RSL", href: "/" },
              { label: "Services", href: "/services" },
              { label: title },
            ]}
          />
        </div>
        <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[#64748B]">
          Service {number} of 10
        </span>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.02em] text-[#0F1720] md:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-[1.65] text-[#475569] md:text-lg">
          {approach}
        </p>
      </div>
    </section>
  );
}

function CinematicServiceImage({ image, title }: { image: string; title: string }) {
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

function FocusAreasSection({
  focusAreas,
  targetClients,
  approach,
}: {
  focusAreas: string;
  targetClients: string;
  approach: string;
}) {
  return (
    <section className="bg-(--n50) py-14 md:py-16 lg:py-20">
      <div className="layout-container">
        <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#64748B]">
          Service Profile
        </span>
        <h2 className="mt-2 text-2xl font-semibold text-[#0F1720] md:text-3xl lg:text-4xl">
          Scope & Approach.
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
          <FocusBlock label="Focus Areas" text={focusAreas} />
          <FocusBlock label="Target Clients" text={targetClients} />
          <FocusBlock label="Our Approach" text={approach} />
        </div>
      </div>
    </section>
  );
}

function FocusBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="border-l-2 border-[#1B3A5C] pl-6">
      <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[#1B3A5C]">
        {label}
      </span>
      <p className="mt-3 text-sm leading-[1.55] text-[#64748B]">
        {text}
      </p>
    </div>
  );
}

function CapabilityCardsSection({
  deliverables,
  images,
}: {
  deliverables: ServiceDeliverable[];
  images: string[];
}) {
  return (
    <SectionWrapper background="white" padV={{ mobile: 56, tablet: 72, desktop: 96 }}>
      <SectionHeader overline="What We Deliver" title="Structured Capabilities." showAccentRule={false} />
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {deliverables.map((deliverable, index) => (
          <CapabilityCard
            key={deliverable.title}
            deliverable={deliverable}
            image={images[index % images.length]}
            index={index}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}

function CapabilityCard({
  deliverable,
  image,
  index,
}: {
  deliverable: ServiceDeliverable;
  image: string;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const isMobile = useResponsiveValue({ desktop: false, tablet: false, mobile: true });
  const miniCardMaxHeight = isMobile ? "none" : "240px";
  const miniCardCollapsedHeight = isMobile ? "none" : "140px";

  return (
    <div
      className="group relative h-80 overflow-hidden rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] md:h-90 lg:h-100"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={image}
        alt={deliverable.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        sizes="(max-width: 768px) 100vw, 520px"
      />
      <div className="absolute inset-0 bg-linear-to-br from-[#1B3A5C]/30 to-black/15 transition-colors duration-300 group-hover:from-[#1B3A5C]/45 group-hover:to-black/25" />

      <div className="absolute left-6 top-6 z-10">
        <span className="rounded-full bg-[#1B3A5C]/65 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur">
          {deliverable.overline}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 md:bottom-6 md:left-auto md:right-6 md:top-6 md:w-[52%]">
        <div
          className="h-full bg-white/95 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] backdrop-blur md:rounded-lg"
          style={{
            maxHeight: hovered ? miniCardMaxHeight : miniCardCollapsedHeight,
            overflow: isMobile ? "visible" : "hidden",
            transform: hovered && !isMobile ? "translateY(-2px)" : "translateY(0)",
            transition: "max-height 260ms cubic-bezier(0.25, 0.1, 0.25, 1), transform 260ms cubic-bezier(0.25, 0.1, 0.25, 1)",
          }}
        >
          <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[#94A3B8]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-2 text-lg font-semibold text-[#0F1720] transition-colors duration-300 group-hover:text-[#1B3A5C]">
            {deliverable.title}
          </h3>
          <div className="mt-3 max-h-48 overflow-hidden opacity-100 transition-all duration-300 md:max-h-0 md:opacity-0 md:group-hover:max-h-48 md:group-hover:opacity-100">
            <p className="text-sm leading-[1.6] text-[#64748B]">
              {deliverable.body}
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[#1B3A5C]">
              Explore more <span className="text-[#F59E0B]">-&gt;</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StrategicEngagementCta({ title }: { title: string }) {
  return (
    <section className="bg-[#F8FAFC] pb-20 md:pb-24">
      <div className="layout-container">
        <div className="relative overflow-hidden rounded-xl bg-[#1B3A5C]">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15 grayscale"
            style={{ backgroundImage: `url(${IMG_CTA_PATTERN})` }}
          />
          <div className="absolute inset-0 bg-linear-to-br from-[#0C1C2E]/90 via-[#1B3A5C]/80 to-[#0C1C2E]/90" />
          <div className="relative flex flex-col items-start px-8 py-12 text-left md:px-14 md:py-16">
            <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-white/60">
              Strategic Engagement
            </span>
            <h2 className="mt-3 max-w-[48ch] text-[1.5rem] font-semibold leading-[1.2] text-white md:text-[2rem]">
              Engage with our {title} team.
            </h2>
            <p className="mt-4 max-w-[60ch] text-base leading-[1.7] text-[#CBD7E6]">
              Every engagement begins with a structured conversation to determine whether there is a basis for
              collaboration and to scope the appropriate response architecture.
            </p>
            <div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
              <Link
                href="/contact"
                className="rounded-lg bg-white px-8 py-4 text-center text-sm font-semibold text-[#1B3A5C] transition hover:bg-[#F1F5F9]"
              >
                Schedule an Introduction
              </Link>
              <Link
                href="/industries"
                className="rounded-lg border border-white/30 px-8 py-4 text-center text-sm font-semibold text-white/85 transition hover:border-white/60 hover:text-white"
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

function MethodologySection({ images }: { images: string[] }) {
  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] py-16 md:py-20 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(27, 58, 92, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(27, 58, 92, 0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="layout-container relative">
        <div className="max-w-180">
          <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#64748B]">
            Engagement Framework
          </span>
          <h2 className="mt-3 text-2xl font-semibold text-[#0F1720] md:text-3xl lg:text-4xl">
            How we partner with institutions to deliver transformation.
          </h2>
          <p className="mt-4 text-base leading-[1.7] text-[#475569]">
            Every engagement follows a disciplined advisory framework designed to clarify complex challenges, design
            strategic pathways, and deliver measurable institutional outcomes.
          </p>
        </div>
        <div className="mt-12 space-y-10 md:mt-16 md:space-y-6">
          {METHODOLOGY_STAGES.map((stage, index) => (
            <MethodologyStageRow
              key={stage.number}
              number={stage.number}
              title={stage.title}
              description={stage.description}
              image={images[index % images.length]}
              isLast={index === METHODOLOGY_STAGES.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MethodologyStageRow({
  number,
  title,
  description,
  image,
  isLast,
}: {
  number: string;
  title: string;
  description: string;
  image: string;
  isLast: boolean;
}) {
  return (
    <div className="group relative">
      <div className="md:hidden">
        <div className="relative mb-5 h-37.5 w-full max-w-60 overflow-hidden rounded-lg">
          <Image src={image} alt={title} fill className="object-cover" sizes="240px" />
        </div>
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#1B3A5C]">
          Stage {number}
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-[#0F1720]">{title}</h3>
        <p className="mt-3 text-sm leading-[1.6] text-[#64748B]">{description}</p>
        {!isLast && <div className="mt-8 h-px w-full bg-[#E2E8F0]" />}
      </div>

      <div className="relative hidden md:block md:pl-10">
        <div className="absolute left-0 top-0 flex h-full w-3 flex-col items-center">
          <div className="mt-10 h-3 w-3 rounded-full bg-[#1B3A5C] transition-shadow duration-300 group-hover:bg-[#5B6CFF] group-hover:shadow-[0_0_0_4px_rgba(91,108,255,0.15)]" />
          {!isLast && <div className="mt-2 w-0.5 flex-1 bg-[#E2E8F0]" />}
        </div>
        <div
          className={`grid grid-cols-[240px_1fr_120px] items-center gap-12 px-6 py-8 transition-colors duration-300 group-hover:bg-[#5B6CFF]/5 ${
            isLast ? "border-b-0" : "border-b border-[#E2E8F0]"
          }`}
        >
          <div className="relative h-37.5 w-60 overflow-hidden rounded-lg">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="240px"
              style={{ filter: "grayscale(20%) contrast(1.05)" }}
            />
          </div>
          <div>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#5B6CFF]">
              Stage {number}
            </p>
            <h3 className="mt-3 text-4xl font-semibold leading-[1.05] text-[#0F1720] transition-colors duration-300 group-hover:text-[#5B6CFF]">
              {title}
            </h3>
            <p className="mt-4 text-base leading-[1.6] text-[#64748B]">{description}</p>
          </div>
          <div className="flex items-center justify-center">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              className="transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-110"
            >
              <path
                d="M10 24h28M30 14l10 10-10 10"
                stroke="#5B6CFF"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function IndustryApplicationSection({ industryIds }: { industryIds: string[] }) {
  return (
    <SectionWrapper background="white" padV={{ mobile: 56, tablet: 72, desktop: 96 }}>
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          overline="Industry Application"
          title="Industries Served by This Capability."
          showAccentRule={false}
        />
        <GatewayLink label="Explore all industries" href="/industries" />
      </div>
      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {industryIds.map((industryId) => {
          const industry = INDUSTRY_REF[industryId];
          const image = INDUSTRY_IMAGES_REF[industryId];
          if (!industry || !image) return null;
          return (
            <EditorialIndustryCard
              key={industryId}
              slug={industryId}
              title={industry.title}
              description={industry.description}
              image={image}
              height="280px"
            />
          );
        })}
      </div>
    </SectionWrapper>
  );
}

function FinalCapabilityCta({ title, image }: { title: string; image: string }) {
  return (
    <section className="bg-[#F8FAFC] py-16 md:py-20">
      <div className="layout-container grid gap-10 md:grid-cols-2 md:items-center">
        <div className="relative overflow-hidden rounded-xl pt-[75%] shadow-[0_8px_32px_rgba(0,0,0,0.08)] md:pt-[75%]">
          <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 640px" />
          <div className="absolute inset-0 bg-linear-to-t from-[#0C1C2E]/20 to-transparent" />
        </div>
        <div>
          <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[#64748B]">
            Next Step
          </span>
          <h2 className="mt-3 text-[1.5rem] font-semibold leading-[1.2] text-[#0F1720] md:text-[2rem]">
            Ready to activate this capability?
          </h2>
          <p className="mt-4 max-w-[44ch] text-base leading-[1.7] text-[#475569]">
            Every engagement begins with a structured introduction to explore alignment, define scope, and establish
            a shared understanding of the challenge.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex rounded-lg bg-[#1B3A5C] px-10 py-4 text-center text-sm font-semibold text-white transition hover:bg-[#142B45]"
            >
              Schedule an Introduction
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function getCapabilityCardImages(slug: string) {
  switch (slug) {
    case "strategy":
      return [
        "/images/services/capability-strategy-1.jpg",
        "/images/services/capability-strategy-2.jpg",
        "/images/services/capability-strategy-3.jpg",
      ];
    case "digital":
      return [
        "/images/services/capability-digital-1.jpg",
        "/images/services/capability-digital-2.jpg",
        "/images/services/capability-digital-3.jpg",
      ];
    case "finance":
      return [
        "/images/services/capability-finance-1.jpg",
        "/images/services/capability-finance-2.jpg",
        "/images/services/capability-finance-3.jpg",
      ];
    case "people":
      return [
        "/images/services/capability-people-1.jpg",
        "/images/services/capability-people-2.jpg",
        "/images/services/capability-people-3.jpg",
      ];
    case "esg":
      return [
        "/images/services/capability-esg-1.jpg",
        "/images/services/capability-esg-2.jpg",
        "/images/services/capability-esg-3.jpg",
      ];
    case "public":
      return [
        "/images/services/capability-public-1.jpg",
        "/images/services/capability-public-2.jpg",
        "/images/services/capability-public-3.jpg",
      ];
    case "comms":
      return [
        "/images/services/capability-comms-1.jpg",
        "/images/services/capability-comms-2.jpg",
        "/images/services/capability-comms-3.jpg",
      ];
    case "tax":
      return [
        "/images/services/capability-tax-1.jpg",
        "/images/services/capability-tax-2.jpg",
        "/images/services/capability-tax-3.jpg",
      ];
    case "legal":
      return [
        "/images/services/capability-legal-1.jpg",
        "/images/services/capability-legal-2.jpg",
        "/images/services/capability-legal-3.jpg",
      ];
    case "sme":
      return [
        "/images/services/capability-sme-1.jpg",
        "/images/services/capability-sme-2.jpg",
        "/images/services/capability-sme-3.jpg",
      ];
    default:
      return [
        "/images/services/capability-default-1.jpg",
        "/images/services/capability-default-2.jpg",
        "/images/services/capability-default-3.jpg",
      ];
  }
}
