import SectionWrapper from "@/components-v2/sections/SectionWrapper";

export default function InsightSummarySection({ summaryPoints }: { summaryPoints: string[] }) {
  if (summaryPoints.length === 0) {
    return <div style={{ padding: "40px 0" }} />;
  }

  return (
    <SectionWrapper background="white" padV={{ mobile: 32, tablet: 40, desktop: 48 }}>
      <div className="mx-auto max-w-[720px]">
        <h2 className="text-2xl font-semibold leading-[1.2] text-text-primary">Summary</h2>
        <div className="mt-4 h-0.5 w-8 bg-[var(--a700)]" />
        <ul className="mt-6 space-y-4 text-base leading-[1.65] text-text-secondary list-disc pl-5">
          {summaryPoints.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
}
