import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import type { CaseStudyRecord } from "./data";

export default function CaseStudyBody({ study }: { study: CaseStudyRecord }) {
  return (
    <>
      <SectionWrapper background="white" padV={{ mobile: 48, tablet: 64, desktop: 96 }}>
        <div className="mx-auto max-w-4xl space-y-12">
          <section>
            <span className="block text-xs font-semibold uppercase tracking-widest text-[#1B3A5C]">The Challenge</span>
            <h2 className="mt-2 text-2xl font-semibold leading-tight text-[#0F1720] md:text-[1.75rem]">
              Context & Complexity.
            </h2>
            <div className="mt-6 h-0.5 w-12 bg-[#1B3A5C]" />
            <p className="mt-6 text-(--n700) leading-[1.7]">{study.challenge}</p>
          </section>
          <section>
            <span className="block text-xs font-semibold uppercase tracking-widest text-[#1B3A5C]">Our Approach</span>
            <h2 className="mt-2 text-2xl font-semibold leading-tight text-[#0F1720] md:text-[1.75rem]">
              Advisory Architecture.
            </h2>
            <div className="mt-6 h-0.5 w-12 bg-[#1B3A5C]" />
            <p className="mt-6 text-(--n700) leading-[1.7]">{study.approach}</p>
          </section>
        </div>
      </SectionWrapper>

      <SectionWrapper background="neutral50" padV={{ mobile: 48, tablet: 64, desktop: 88 }}>
        <div className="mx-auto max-w-7xl">
          <span className="block text-xs font-semibold uppercase tracking-widest text-[#1B3A5C]">Outcome</span>
          <h2 className="mt-2 text-2xl font-semibold leading-tight text-[#0F1720] md:text-[1.75rem]">
            Measurable Impact.
          </h2>
          <div className="mt-6 h-0.5 w-12 bg-[#1B3A5C]" />
          <p className="mt-6 max-w-[68ch] text-(--n700) leading-[1.7]">{study.outcome}</p>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {study.metrics.map((metric) => (
              <div key={metric.label} className="border-t-2 border-[#1B3A5C] pt-6">
                <p className="text-[2rem] font-semibold leading-none text-[#1B3A5C] md:text-[2.5rem]">{metric.value}</p>
                <p className="mt-2 text-sm font-medium text-[#475569]">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
