import SectionWrapper from "@/components-v2/sections/SectionWrapper";

interface IndustrySummarySectionProps {
  summary: string;
}

export default function IndustrySummarySection({ summary }: IndustrySummarySectionProps) {
  return (
    <SectionWrapper background="white" padV={{ mobile: 40, tablet: 48, desktop: 64 }}>
      <div className="max-w-[720px] text-left space-y-4">
        <h2 className="text-2xl font-semibold leading-[1.2] text-text-primary">Overview</h2>
        <div className="mt-6 mb-6 h-0.5 w-12 bg-[var(--a700)]" />
        <p className="text-base leading-[1.7] text-text-secondary">
          {summary}
        </p>
      </div>
    </SectionWrapper>
  );
}
