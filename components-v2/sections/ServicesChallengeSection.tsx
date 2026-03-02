import SectionWrapper from "@/components-v2/sections/SectionWrapper";

interface ServicesChallengeSectionProps {
  focusAreas: string;
  targetClients: string;
  approach: string;
}

export default function ServicesChallengeSection({ focusAreas, targetClients, approach }: ServicesChallengeSectionProps) {
  return (
    <SectionWrapper background="white">
      <div className="max-w-[720px] space-y-8">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-text-muted">Focus Areas</h3>
          <p className="text-base leading-[1.7] text-text-secondary">{focusAreas}</p>
        </div>
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-text-muted">Target Clients</h3>
          <p className="text-base leading-[1.7] text-text-secondary">{targetClients}</p>
        </div>
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-text-muted">Our Approach</h3>
          <p className="text-base leading-[1.7] text-text-secondary">{approach}</p>
        </div>
      </div>
    </SectionWrapper>
  );
}
