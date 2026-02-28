import SectionWrapper from "@/components-v2/sections/SectionWrapper";

interface InsightsContentSectionProps {
  children: React.ReactNode;
}

export default function InsightsContentSection({ children }: InsightsContentSectionProps) {
  return (
    <SectionWrapper>
      <div className="mx-auto max-w-3xl prose prose-neutral">
        {children}
      </div>
    </SectionWrapper>
  );
}
