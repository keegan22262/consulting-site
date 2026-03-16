import SectionHeader from "@/components-v2/sections/SectionHeader";
import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import { CaseStudyCard } from "@/components-v2/ui/RelatedKnowledge";
import type { CaseStudyRecord } from "@/src/sections/case-study/data";

export default function InsightRelatedEngagementsSection({
  caseStudies,
}: {
  caseStudies: CaseStudyRecord[];
}) {
  if (caseStudies.length === 0) return null;

  return (
    <SectionWrapper background="neutral50" padV={{ mobile: 56, tablet: 72, desktop: 96 }}>
      <SectionHeader overline="Client Impact" title="Related Engagements." showAccentRule={false} />
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {caseStudies.slice(0, 2).map((cs) => (
          <CaseStudyCard
            key={cs.slug}
            cs={{
              slug: cs.slug,
              title: cs.title,
              image: cs.image,
              category: "Client Impact",
              summary: cs.summary,
              metrics: cs.metrics,
            }}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
