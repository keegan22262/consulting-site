import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";

interface IndustryContextSectionProps {
  pressures: string;
  transformationFocus: string;
  institutionalShift: string;
}

export default function IndustryContextSection({ pressures, transformationFocus, institutionalShift }: IndustryContextSectionProps) {
  return (
    <SectionWrapper>
      <SectionHeader
        overline="Sector Context"
        title="Structural Realities."
      />
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-sm font-semibold text-accent-primary mb-3">
            Market Pressures
          </h3>
          <p className="text-base text-text-secondary leading-relaxed">
            {pressures}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-accent-primary mb-3">
            Transformation Focus
          </h3>
          <p className="text-base text-text-secondary leading-relaxed">
            {transformationFocus}
          </p>
        </div>
      </div>
      <div className="mt-16 border-t border-border-subtle pt-12">
        <h3 className="text-sm font-semibold text-accent-primary mb-3">
          Institutional Shift
        </h3>
        <p className="text-base text-text-secondary leading-relaxed max-w-3xl">
          {institutionalShift}
        </p>
      </div>
    </SectionWrapper>
  );
}
