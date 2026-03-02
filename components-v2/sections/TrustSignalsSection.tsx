import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";

type TrustIndicator = {
  title: string;
  description: string;
};

interface TrustSignalsSectionProps {
  title?: string;
  intro?: string;
  indicators: TrustIndicator[];
}

export default function TrustSignalsSection({
  title,
  intro,
  indicators,
}: TrustSignalsSectionProps) {
  return (
    <SectionWrapper background="accent50" padV={{ mobile: 36, tablet: 44, desktop: 56 }}>
      <div className="mx-auto max-w-[900px] text-center">
        <SectionHeader
          overline="Proof"
          title={title ?? "Insight-backed approach"}
          description={intro}
          align="center"
        />

        <div className="rhythm-heading-grid grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {indicators.map((indicator) => (
            <article
              key={indicator.title}
              className="rounded-card border border-border-subtle bg-white p-6 text-left shadow-sm transition duration-[200ms] ease hover:border-border-strong hover:shadow-[0_8px_22px_rgba(0,0,0,0.08)]"
            >
              <h3 className="text-base font-semibold text-text-primary">
                {indicator.title}
              </h3>
              <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                {indicator.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
