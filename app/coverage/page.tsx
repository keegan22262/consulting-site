import type { Metadata } from "next";
import CTABlock from "@/components-v2/sections/CTABlock";
import CoverageHero from "@/src/sections/coverage/CoverageHero";
import CoverageMatrixSection from "@/src/sections/coverage/CoverageMatrixSection";

export const metadata: Metadata = {
  title: "Coverage | Rill Singh Limited",
  description:
    "Explore our advisory coverage across sectors, institutions, and transformation contexts.",
};

export default function CoveragePage() {
  return (
    <>
      <CoverageHero />
      <CoverageMatrixSection />
      <PainPointsSection />
      <DifferentiatorsSection />
      <ProgressiveIntelligenceSection />
      <CoverageNavigationSection />
      <CTABlock
        title="Discuss your sector context"
        description="We tailor delivery models to sector dynamics, institutional constraints, and stakeholder expectations."
        primaryLabel="Contact"
        primaryHref="/contact"
      />
    </>
  );
}

function PainPointsSection() {
  const points = [
    "Lack of strategic clarity and execution alignment.",
    "Technological lag and transformation complexity.",
    "Financial and regulatory compliance pressure.",
    "Talent and organizational design inefficiency.",
    "Sustainability and ESG integration gaps.",
    "Public sector modernization constraints.",
  ];

  return (
    <section className="bg-white py-14 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <span className="block text-xs font-semibold uppercase tracking-widest text-[#1B3A5C]">Priority Challenges</span>
        <h2 className="mt-3 text-[1.5rem] font-semibold leading-[1.2] text-[#0F1720] md:text-[2rem]">
          Pressure points institutions bring to us.
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {points.map((point) => (
            <div key={point} className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 text-sm leading-[1.6] text-[#334155]">
              {point}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DifferentiatorsSection() {
  const differentiators = [
    "Tailored engagement design, not generic playbooks.",
    "Integrated delivery across strategy, digital, finance, and people.",
    "Speed to mobilization with execution-first governance.",
    "Transparent scope, cadence, and accountability models.",
  ];

  return (
    <section className="bg-[#F8FAFC] py-14 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <span className="block text-xs font-semibold uppercase tracking-widest text-[#1B3A5C]">Why RSL</span>
        <h2 className="mt-3 text-[1.5rem] font-semibold leading-[1.2] text-[#0F1720] md:text-[2rem]">
          Institutional differentiators.
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {differentiators.map((item) => (
            <div key={item} className="border-t-2 border-[#1B3A5C] bg-white p-6 text-sm leading-[1.6] text-[#334155]">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoverageNavigationSection() {
  return (
    <section className="bg-white py-14 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <span className="block text-xs font-semibold uppercase tracking-widest text-[#1B3A5C]">Related Pathways</span>
        <h2 className="mt-3 text-[1.5rem] font-semibold leading-[1.2] text-[#0F1720] md:text-[2rem]">
          Continue by service, sector, or case application.
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <a
            href="/services"
            className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 text-sm font-medium text-[#334155] transition hover:border-[#94A3B8]"
          >
            Explore Services
          </a>
          <a
            href="/industries"
            className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 text-sm font-medium text-[#334155] transition hover:border-[#94A3B8]"
          >
            Browse Industries
          </a>
          <a
            href="/case-studies"
            className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 text-sm font-medium text-[#334155] transition hover:border-[#94A3B8]"
          >
            Review Case Studies
          </a>
        </div>
      </div>
    </section>
  );
}

function ProgressiveIntelligenceSection() {
  const pillars = [
    ["Context", "Sector and institutional baselines frame the problem before solution design."],
    ["Signal", "Market, policy, and operating signals are synthesized into decision-ready insight."],
    ["Action", "Priorities are translated into scoped initiatives, ownership, and execution rhythm."],
  ];

  return (
    <section className="bg-[#F8FAFC] py-14 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <span className="block text-xs font-semibold uppercase tracking-widest text-[#1B3A5C]">Progressive Intelligence</span>
        <h2 className="mt-3 text-[1.5rem] font-semibold leading-[1.2] text-[#0F1720] md:text-[2rem]">
          A structured path from context to execution.
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {pillars.map(([title, body]) => (
            <div key={title} className="rounded-xl border border-[#E2E8F0] bg-white p-6">
              <h3 className="text-base font-semibold text-[#0F1720]">{title}</h3>
              <p className="mt-2 text-sm leading-[1.6] text-[#475569]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
