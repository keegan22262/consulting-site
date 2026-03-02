import SectionWrapper from "@/components-v2/sections/SectionWrapper";

export default function InsightsIntroSection() {
  return (
    <SectionWrapper padV={{ mobile: 40, tablet: 48, desktop: 64 }} background="white">
      <div className="max-w-[720px]">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--SECTION_OVERLINE_COLOR)]">
          Insights
        </span>
        <h2 className="mt-3 text-3xl font-semibold leading-[1.15] text-text-primary">
          Evidence-led perspectives
        </h2>
        <div className="mt-4 h-0.5 w-6 bg-[var(--a700)]" />
        <p className="mt-6 text-base leading-[1.7] text-text-secondary">
          Analysis across strategy, risk, and delivery that stays practical—grounded in implementation detail and measurable outcomes.
        </p>
      </div>
    </SectionWrapper>
  );
}
