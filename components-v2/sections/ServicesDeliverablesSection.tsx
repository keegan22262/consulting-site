import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";

interface Deliverable {
  overline: string;
  title: string;
  body: string;
}

interface ServicesDeliverablesSectionProps {
  deliverables: Deliverable[];
}

function DeliverableBlock({
  index,
  overline,
  title,
  body
}: Deliverable & { index: number }) {
  return (
    <div className="border border-border-subtle rounded-card p-8 bg-background-primary">
      <span className="block text-xs uppercase tracking-widest text-text-muted mb-2">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="block text-sm font-medium text-accent-primary mb-2">
        {overline}
      </span>
      <h3 className="text-lg font-semibold text-text-primary mb-3">
        {title}
      </h3>
      <p className="text-base leading-relaxed text-text-secondary">
        {body}
      </p>
    </div>
  );
}

export default function ServicesDeliverablesSection({ deliverables }: ServicesDeliverablesSectionProps) {
  return (
    <SectionWrapper>
      <SectionHeader
        overline="What We Deliver"
        title="Structured Capabilities."
      />
      <div className="rhythm-heading-grid grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        {deliverables.map((item, index) => (
          <DeliverableBlock
            key={index}
            index={index}
            overline={item.overline}
            title={item.title}
            body={item.body}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
