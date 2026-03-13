import SectionWrapper from "@/components-v2/sections/SectionWrapper";

export default function InsightMetaStrip({ metaItems }: { metaItems: string[] }) {
  if (metaItems.length === 0) {
    return <div style={{ padding: "40px 0" }} />;
  }

  return (
    <SectionWrapper background="white" padV={{ mobile: 24, tablet: 28, desktop: 32 }}>
      <div className="mx-auto flex max-w-[720px] flex-wrap items-center gap-3 text-sm text-text-secondary">
        {metaItems.map((item, index) => (
          <span key={item + index} className="flex items-center gap-3">
            {index > 0 ? <span className="text-text-muted">•</span> : null}
            <span>{item}</span>
          </span>
        ))}
      </div>
    </SectionWrapper>
  );
}
