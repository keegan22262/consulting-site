import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CTABlock from "@/components-v2/sections/CTABlock";
import Link from "next/link";
import CaseStudyBody from "@/src/sections/case-study/CaseStudyBody";
import CaseStudyHero from "@/src/sections/case-study/CaseStudyHero";
import { CASE_STUDIES } from "@/src/sections/case-study/data";
import { INSIGHTS_DATA } from "@/src/sections/insights/data";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = CASE_STUDIES.find((item) => item.slug === slug);

  if (!study) {
    return { title: "Case Study | Rill Singh Limited" };
  }

  return {
    title: `${study.title} | Case Study | Rill Singh Limited`,
    description: study.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = CASE_STUDIES.find((item) => item.slug === slug);

  if (!study) {
    notFound();
  }

  return (
    <>
      <CaseStudyHero study={study} />
      <CaseStudyBody study={study} />
      <RelatedInsightsSection />
      <RelatedEngagementsSection currentSlug={study.slug} />
      <RelatedKnowledgeSection
        industryIds={study.industryIds}
        serviceIds={study.serviceIds}
      />
      <CTABlock
        title="Ready to discuss a similar challenge?"
        description="We can map a practical delivery pathway based on your institutional context."
        primaryLabel="Schedule an Introduction"
        primaryHref="/contact"
      />
    </>
  );
}

function RelatedInsightsSection() {
  const items = INSIGHTS_DATA.slice(0, 3);

  return (
    <section className="bg-[#F8FAFC] py-14 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <span className="block text-xs font-semibold uppercase tracking-widest text-[#1B3A5C]">Related Insights</span>
        <h2 className="mt-3 text-[1.5rem] font-semibold leading-[1.2] text-[#0F1720] md:text-[2rem]">
          Research connected to this engagement context.
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/insights/${item.slug}`}
              className="rounded-xl border border-[#E2E8F0] bg-white p-6 transition hover:border-[#94A3B8]"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-[#1B3A5C]">{item.category}</p>
              <h3 className="mt-2 text-base font-semibold leading-[1.4] text-[#0F1720]">{item.headline}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedEngagementsSection({ currentSlug }: { currentSlug: string }) {
  const related = CASE_STUDIES.filter((study) => study.slug !== currentSlug).slice(0, 2);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-14 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <span className="block text-xs font-semibold uppercase tracking-widest text-[#1B3A5C]">Client Impact</span>
        <h2 className="mt-3 text-[1.5rem] font-semibold leading-[1.2] text-[#0F1720] md:text-[2rem]">
          Related engagements.
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {related.map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 transition hover:border-[#94A3B8]"
            >
              <h3 className="text-base font-semibold text-[#0F1720]">{study.title}</h3>
              <p className="mt-2 text-sm leading-[1.6] text-[#475569]">{study.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const INDUSTRY_LABELS: Record<string, string> = {
  "financial-services": "Financial Services",
  "technology-digital": "Technology, Media & Telecommunications",
  "energy-resources": "Energy & Natural Resources",
  "healthcare-life-sciences": "Healthcare & Life Sciences",
  "public-sector-government": "Public Sector & Government",
  "industrials-manufacturing": "Industrials & Manufacturing",
  "consumer-retail": "Consumer & Retail",
  "transport-logistics": "Transportation & Logistics",
  "real-estate-infrastructure": "Real Estate & Infrastructure",
  "private-capital": "Private Capital",
  education: "Education & Social Impact",
};

const SERVICE_LABELS: Record<string, string> = {
  strategy: "Strategy & Corporate Transformation",
  digital: "Digital & AI Transformation",
  finance: "Financial Advisory, Audit & Risk",
  people: "People & Organization",
  esg: "Sustainability & ESG",
  public: "Public Sector Advisory",
  comms: "Digital Communication",
  tax: "Tax & Asset Management",
  legal: "Legal & Regulatory",
  sme: "SME Development",
};

function RelatedKnowledgeSection({
  industryIds,
  serviceIds,
}: {
  industryIds: string[];
  serviceIds: string[];
}) {
  return (
    <section className="bg-white py-14 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <span className="block text-xs font-semibold uppercase tracking-widest text-[#1B3A5C]">Related Knowledge</span>
        <h2 className="mt-3 text-[1.5rem] font-semibold leading-[1.2] text-[#0F1720] md:text-[2rem]">
          Explore adjacent context.
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-base font-semibold text-[#0F1720]">Industries</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {industryIds.map((industryId) => (
                <Link
                  key={industryId}
                  href={`/industries/${industryId}`}
                  className="rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm text-[#334155] transition hover:border-[#94A3B8]"
                >
                  {INDUSTRY_LABELS[industryId] || industryId}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#0F1720]">Services</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {serviceIds.map((serviceId) => (
                <Link
                  key={serviceId}
                  href={`/services/${serviceId}`}
                  className="rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm text-[#334155] transition hover:border-[#94A3B8]"
                >
                  {SERVICE_LABELS[serviceId] || serviceId}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
