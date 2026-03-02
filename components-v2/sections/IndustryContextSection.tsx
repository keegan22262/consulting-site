import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";

interface IndustryContextSectionProps {
  pressures: string;
  transformationFocus: string;
  institutionalShift: string;
}

export default function IndustryContextSection({ pressures, transformationFocus, institutionalShift }: IndustryContextSectionProps) {
  return (
    <SectionWrapper background="neutral50" padV={{ mobile: 48, tablet: 56, desktop: 72 }}>
      <div className="mx-auto max-w-[900px]">
        <SectionHeader overline="Sector Context" title="Structural Realities." />

        <div className="rhythm-heading-grid grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-accent-primary">Market Pressures</h3>
            <p className="text-base text-text-secondary leading-[1.7]">{pressures}</p>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-accent-primary">Transformation Focus</h3>
            <p className="text-base text-text-secondary leading-[1.7]">{transformationFocus}</p>
          </div>
        </div>

        <div className="mt-12 border-t border-border-subtle pt-10 space-y-3">
          <h3 className="text-sm font-semibold text-accent-primary">Institutional Shift</h3>
          <p className="text-base text-text-secondary leading-[1.7] max-w-[900px]">{institutionalShift}</p>
        </div>
      </div>
    </SectionWrapper>
  );
}
