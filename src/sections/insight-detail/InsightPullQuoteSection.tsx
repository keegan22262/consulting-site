import SectionWrapper from "@/components-v2/sections/SectionWrapper";

export default function InsightPullQuoteSection({ pullQuote }: { pullQuote: string }) {
  if (!pullQuote) {
    return <div style={{ padding: "40px 0" }} />;
  }

  return (
    <SectionWrapper background="neutral50" padV={{ mobile: 32, tablet: 40, desktop: 48 }}>
      <div className="mx-auto max-w-[720px] rounded-card border-l-4 border-[var(--a700)] bg-[var(--n50)] p-8 text-text-primary">
        <p className="text-2xl font-semibold italic leading-[1.3]">{pullQuote}</p>
      </div>
    </SectionWrapper>
  );
}
