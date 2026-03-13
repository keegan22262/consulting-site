import CTABlock from "@/components-v2/sections/CTABlock";
import IndustryContextSection from "@/components-v2/sections/IndustryContextSection";
import IndustryDetailHeroSection from "@/components-v2/sections/IndustryDetailHeroSection";
import IndustryRelatedInsightsSection from "@/components-v2/sections/IndustryRelatedInsightsSection";
import IndustryRelatedServicesSection from "@/components-v2/sections/IndustryRelatedServicesSection";
import IndustrySummarySection from "@/components-v2/sections/IndustrySummarySection";
import Image from "next/image";
import Link from "next/link";

export type IndustryRelatedService = {
  slug: string;
  title: string;
  description: string;
};

export type IndustryRelatedInsight = {
  slug: string;
  title: string;
  category: string;
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

export default function IndustryDetailSections(props: Props) {
  const {
    slug,
    title,
    summary,
    description,
    challenge,
    regulatoryContext,
    relatedServices,
    relatedInsights,
    heroImage,
  } = props;

  const effectiveHeroImage = heroImage || `/images/industries/sectors/${slug}.jpg`;
  const futureImage = "/images/industries/hero/hero-digital-command-center.jpg";
  const outcomeSignals = OUTCOME_SIGNALS[slug] || DEFAULT_OUTCOME_SIGNALS;

  return (
    <>
      <IndustryDetailHeroSection title={title} description={description || summary} />

      <IndustryCinematicImage image={effectiveHeroImage} title={title} />

      <IndustrySummarySection summary={summary || description} />

      <IndustryContextSection
        pressures={challenge}
        transformationFocus={regulatoryContext}
        institutionalShift={description || summary}
      />

      <FutureApproachSection title={title} image={futureImage} />

      {relatedServices.length > 0 ? <IndustryRelatedServicesSection services={relatedServices} /> : <Spacer />}

      <SectorAdvisoryCta title={title} image={effectiveHeroImage} />

      <OutcomeSignalsSection signals={outcomeSignals} />

      {relatedInsights.length > 0 ? <IndustryRelatedInsightsSection insights={relatedInsights} /> : <Spacer />}

      <IndustryRelatedCaseStudiesSection />

      <IndustryKnowledgeNavigation title={title} />

      <CTABlock
        title={title || "Talk to a partner"}
        description={summary || description || "Discuss how we can support your industry transformation."}
        primaryLabel="Contact"
        primaryHref="/contact"
      />
    </>
  );
}

function Spacer() {
  return <div style={{ padding: "40px 0" }} />;
}

function IndustryCinematicImage({ image, title }: { image: string; title: string }) {
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

function FutureApproachSection({ title, image }: { title: string; image: string }) {
  return (
    <section className="bg-white py-14 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <span className="block text-xs font-semibold uppercase tracking-widest text-[#1B3A5C]">Industry Foresight</span>
        <h2 className="mt-3 text-[1.5rem] font-semibold leading-[1.2] text-[#0F1720] md:text-[2rem]">
          Our Approach to the Future of {title}.
        </h2>
        <div className="mt-8 h-0.5 w-12 bg-[#1B3A5C]" />
        <p className="mt-8 max-w-[68ch] text-base leading-[1.7] text-[#334155] md:text-[1.0625rem]">
          The future of this sector will be shaped by accelerating technological change, evolving regulatory
          environments, and rising stakeholder expectations. Institutions operating in this space must navigate
          structural shifts while maintaining operational resilience and strategic clarity.
        </p>
        <div className="relative my-10 w-full overflow-hidden rounded-xl pt-[52%] shadow-[0_8px_32px_rgba(0,0,0,0.08)] md:my-12 md:pt-[45%]">
          <Image
            src={image}
            alt={`Future outlook for ${title}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1120px"
          />
        </div>
        <p className="max-w-[68ch] text-base leading-[1.7] text-[#334155] md:text-[1.0625rem]">
          Our advisory model combines sector knowledge with analytical rigor to build practical pathways from strategy
          to execution, helping leadership teams make high-confidence decisions in uncertain environments.
        </p>
      </div>
    </section>
  );
}

function SectorAdvisoryCta({ title, image }: { title: string; image: string }) {
  return (
    <section className="bg-[#0C1C2E]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-70 overflow-hidden lg:min-h-120">
          <Image
            src={image}
            alt={`${title} advisory context`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 560px"
          />
          <div className="bg-linear-to-r absolute inset-y-0 right-0 w-24 from-transparent to-[#0C1C2E]" />
        </div>
        <div className="px-6 py-12 md:px-8 md:py-16 lg:px-12 lg:py-20">
          <span className="block text-xs font-semibold uppercase tracking-widest text-white/60">Sector Advisory</span>
          <h3 className="mt-4 text-[1.5rem] font-semibold leading-[1.2] text-white md:text-[2rem]">
            How we support leaders in {title.toLowerCase()}.
          </h3>
          <p className="mt-4 max-w-[46ch] text-base leading-[1.7] text-[#CBD7E6]">
            Our industry team brings integrated capability across strategy, operations, digital, risk, and
            organizational transformation, calibrated to your sector context and objectives.
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

function IndustryKnowledgeNavigation({ title }: { title: string }) {
  return (
    <section className="bg-[#F8FAFC] py-14 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <span className="block text-xs font-semibold uppercase tracking-widest text-[#1B3A5C]">Explore Related Knowledge</span>
        <h3 className="mt-3 text-[1.5rem] font-semibold leading-[1.2] text-[#0F1720] md:text-[2rem]">
          Continue your {title.toLowerCase()} perspective.
        </h3>
        <p className="mt-4 max-w-[62ch] text-base leading-[1.7] text-[#475569]">
          Extend this sector view through adjacent services, case studies, and research relevant to your operating context.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Link
            href="/services"
            className="rounded-xl border border-[#E2E8F0] bg-white p-6 text-sm font-medium text-[#334155] transition hover:border-[#94A3B8]"
          >
            Related Services
          </Link>
          <Link
            href="/case-studies"
            className="rounded-xl border border-[#E2E8F0] bg-white p-6 text-sm font-medium text-[#334155] transition hover:border-[#94A3B8]"
          >
            Case Studies
          </Link>
          <Link
            href="/insights"
            className="rounded-xl border border-[#E2E8F0] bg-white p-6 text-sm font-medium text-[#334155] transition hover:border-[#94A3B8]"
          >
            Sector Insights
          </Link>
        </div>
      </div>
    </section>
  );
}

function IndustryRelatedCaseStudiesSection() {
  return (
    <section className="bg-white py-14 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <span className="block text-xs font-semibold uppercase tracking-widest text-[#1B3A5C]">Related Engagements</span>
        <h3 className="mt-3 text-[1.5rem] font-semibold leading-[1.2] text-[#0F1720] md:text-[2rem]">
          Case studies from adjacent sector priorities.
        </h3>
        <p className="mt-4 max-w-[62ch] text-base leading-[1.7] text-[#475569]">
          Review applied delivery examples that illustrate how strategy and execution were integrated in comparable settings.
        </p>
        <Link
          href="/case-studies/institutional-transformation-program"
          className="mt-8 inline-block rounded-lg bg-[#1B3A5C] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#0C1C2E]"
        >
          View Related Case Study
        </Link>
      </div>
    </section>
  );
}

function OutcomeSignalsSection({ signals }: { signals: OutcomeSignal[] }) {
  return (
    <section className="bg-white py-14 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <span className="block text-xs font-semibold uppercase tracking-widest text-[#1B3A5C]">Outcome Signals</span>
        <h3 className="mt-3 text-[1.5rem] font-semibold leading-[1.2] text-[#0F1720] md:text-[2rem]">Measurable Impact.</h3>
        <p className="mt-4 max-w-[60ch] text-base leading-[1.7] text-[#475569]">
          Outcome metrics are calibrated to each engagement and measured against sector-specific baselines.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {signals.map((signal, index) => (
            <div key={`${signal.label}-${index}`} className="border-t-2 border-[#1B3A5C] pt-6">
              <p className="text-[1.875rem] font-semibold leading-none text-[#1B3A5C] md:text-[2.25rem]">{signal.value}</p>
              <h4 className="mt-3 text-base font-semibold text-[#0F1720]">{signal.label}</h4>
              <p className="mt-2 text-sm leading-[1.6] text-[#64748B]">{signal.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type OutcomeSignal = {
  value: string;
  label: string;
  note: string;
};

const DEFAULT_OUTCOME_SIGNALS: OutcomeSignal[] = [
  {
    value: "-",
    label: "Operational Efficiency",
    note: "Measured across delivery timelines, cost baselines, and operating consistency.",
  },
  {
    value: "-",
    label: "Growth Impact",
    note: "Tracked through demand expansion, channel productivity, and value creation velocity.",
  },
  {
    value: "-",
    label: "Risk Reduction",
    note: "Validated through governance, compliance, and control environment improvements.",
  },
];

const OUTCOME_SIGNALS: Record<string, OutcomeSignal[]> = {
  "financial-services": [
    { value: "30-50%", label: "Compliance Cost Reduction", note: "Through modernization of control environments and automation." },
    { value: "2-4x", label: "Digital Channel Adoption", note: "Via platform and customer experience transformation." },
    { value: "15-25%", label: "Operational Efficiency", note: "Across middle and back-office operating models." },
  ],
  "technology-digital": [
    { value: "20-40%", label: "Time-to-Market Acceleration", note: "Through product and delivery redesign." },
    { value: "15-30%", label: "Unit Economics Improvement", note: "Via platform simplification and cloud optimization." },
    { value: "25%+", label: "Retention Uplift", note: "With lifecycle strategy and engagement architecture." },
  ],
  "public-sector-government": [
    { value: "30-50%", label: "Service Delivery Improvement", note: "From citizen journey redesign and channel modernization." },
    { value: "20-35%", label: "Administrative Cost Reduction", note: "Through governance and process transformation." },
    { value: "40%+", label: "Digital Citizen Engagement", note: "Enabled by government platform and service strategy." },
  ],
};
