import SectionWrapper from "@/components-v2/sections/SectionWrapper";

interface InsightsContentSectionProps {
  children: React.ReactNode;
}

export default function InsightsContentSection({ children }: InsightsContentSectionProps) {
  return (
    <SectionWrapper background="white">
      <div className="mx-auto max-w-[720px] text-base leading-[1.65] text-text-secondary space-y-6">
        {children}
      </div>
    </SectionWrapper>
  );
}
