import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";

const DELIVERY_MODEL = [
  {
    label: "Diagnose",
    subtitle: "Clarify strategic position",
    body: "Structured assessment of market position, financial architecture, governance structures, and operational maturity."
  },
  {
    label: "Design",
    subtitle: "Architect institutional pathways",
    body: "Blueprinting transformation initiatives, capital programs, operating models, and governance enhancements."
  },
  {
    label: "Deliver",
    subtitle: "Execute with discipline",
    body: "Hands-on execution support, milestone tracking, performance oversight, and board-level reporting."
  },
  {
    label: "Institutionalize",
    subtitle: "Embed sustainable capability",
    body: "Capability transfer, governance integration, KPI frameworks, and long-term resilience architecture."
  }
];

export default function ServicesDeliveryModelSection() {
  return (
    <SectionWrapper>
      <SectionHeader
        overline="Methodology"
        title="How We Deliver."
      />
      <div className="w-12 h-0.5 bg-accent-primary mt-6 mb-12" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {DELIVERY_MODEL.map((phase, index) => (
          <div
            key={phase.label}
            className="border-t-2 border-accent-primary pt-6"
          >
            <span className="block text-xs uppercase tracking-widest text-text-muted mb-2">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h4 className="text-sm font-medium text-accent-primary mb-2">
              {phase.label}
            </h4>
            <h3 className="text-lg font-semibold text-text-primary mb-3">
              {phase.subtitle}
            </h3>
            <p className="text-base leading-relaxed text-text-secondary">
              {phase.body}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
