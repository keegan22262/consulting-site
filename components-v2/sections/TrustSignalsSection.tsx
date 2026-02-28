import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";

type TrustIndicator = {
  title: string;
  description: string;
};

const indicators: TrustIndicator[] = [
  {
    title: "Experienced",
    description:
      "Senior-led delivery with a bias for clarity, strong decisions, and pragmatic execution.",
  },
  {
    title: "Evidence-based",
    description:
      "Recommendations grounded in data, structured analysis, and transparent assumptions.",
  },
  {
    title: "Independent",
    description:
      "Vendor-neutral guidance focused on what works for your context—not what’s easiest to sell.",
  },
  {
    title: "Impact-focused",
    description:
      "Outcome-driven work aligned to measurable results, not slide decks or activity metrics.",
  },
];

interface TrustSignalsSectionProps {
  title?: string;
  intro?: string;
}

export default function TrustSignalsSection({
  title = "How We Work",
  intro = "A disciplined approach for high-stakes decisions: structured, independent, and accountable to measurable outcomes.",
}: TrustSignalsSectionProps) {
  return (
    <SectionWrapper background="white">
      <SectionHeader
        overline="Approach"
        title={title}
        description={intro}
      />

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {indicators.map((indicator) => (
          <article
            key={indicator.title}
            className="rounded-card border border-border-subtle bg-background-primary p-6 transition-fast ease-standard hover:border-border-strong hover:-translate-y-1 transform"
          >
            <h3 className="text-sm font-semibold text-text-primary">
              {indicator.title}
            </h3>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed">
              {indicator.description}
            </p>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
