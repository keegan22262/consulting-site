import SectionWrapper from "@/components-v2/sections/SectionWrapper";

export type InsightDataHighlight = {
  title: string;
  value: string;
  detail: string;
};

export default function InsightDataHighlightsSection({
  dataHighlights,
}: {
  dataHighlights: InsightDataHighlight[];
}) {
  if (dataHighlights.length === 0) {
    return <div style={{ padding: "40px 0" }} />;
  }

  return (
    <SectionWrapper background="white">
      <div className="rhythm-heading-grid grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
        {dataHighlights.map((item, index) => (
          <div key={item.title + index} className="rounded-card border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-text-muted">{item.title}</div>
            <div className="mt-3 text-2xl font-semibold text-text-primary">{item.value}</div>
            {item.detail ? <p className="mt-3 text-sm leading-[1.6] text-text-secondary">{item.detail}</p> : null}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
