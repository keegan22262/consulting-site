import SectionWrapper from "@/components-v2/sections/SectionWrapper";

export default function InsightsHeroSection() {
  return (
    <SectionWrapper background="white" padV={{ mobile: 56, tablet: 72, desktop: 96 }}>
      <div className="max-w-[720px] text-left">
        <nav className="mb-8 text-sm text-text-muted">
          <span className="text-text-secondary">RSL</span>
          <span className="mx-2">/</span>
          <span className="text-text-primary font-medium">Insights</span>
        </nav>
        <h1 className="font-semibold leading-[1.12] tracking-[-0.02em] text-text-primary">
          Research & Perspectives.
        </h1>
        <p className="mt-6 text-lg font-medium leading-[1.5] text-text-secondary">
          Institutional analysis across capital strategy, governance, digital architecture, and sector transformation.
        </p>
        <p className="mt-8 text-base leading-[1.7] text-text-secondary">
          We translate complex change into clear decisions, grounded in evidence and delivered with accountable execution.
        </p>
      </div>
    </SectionWrapper>
  );
}
