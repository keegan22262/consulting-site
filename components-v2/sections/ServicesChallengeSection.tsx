import SectionWrapper from "@/components-v2/sections/SectionWrapper";

interface ServicesChallengeSectionProps {
  focusAreas: string;
  targetClients: string;
  approach: string;
}

export default function ServicesChallengeSection({ focusAreas, targetClients, approach }: ServicesChallengeSectionProps) {
  return (
    <SectionWrapper>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="border-l-4 border-accent-primary pl-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-text-muted mb-4">
            Focus Areas
          </h3>
          <p className="text-base leading-relaxed text-text-secondary">
            {focusAreas}
          </p>
        </div>
        <div className="border-l-4 border-accent-primary pl-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-text-muted mb-4">
            Target Clients
          </h3>
          <p className="text-base leading-relaxed text-text-secondary">
            {targetClients}
          </p>
        </div>
        <div className="border-l-4 border-accent-primary pl-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-text-muted mb-4">
            Our Approach
          </h3>
          <p className="text-base leading-relaxed text-text-secondary">
            {approach}
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
