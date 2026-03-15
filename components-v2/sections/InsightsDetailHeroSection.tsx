import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import Breadcrumb from "@/components-v2/ui/Breadcrumb";

interface InsightsDetailHeroSectionProps {
  category: string;
  title: string;
  excerpt: string;
}

export default function InsightsDetailHeroSection({ category, title, excerpt }: InsightsDetailHeroSectionProps) {
  return (
    <SectionWrapper background="white" padV={{ mobile: 56, tablet: 72, desktop: 96 }} className="min-h-[360px]">
      <div className="max-w-[720px] text-left">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: "RSL", href: "/" },
              { label: "Insights", href: "/insights" },
              { label: title },
            ]}
          />
        </div>
        <span className="block text-xs uppercase tracking-[0.14em] text-text-muted mb-4">
          {category}
        </span>
        <h1 className="text-[var(--text-display-xl)] leading-[var(--line-height-display-xl)] font-[var(--weight-display-xl)] tracking-[-0.02em] text-text-primary">
          {title}
        </h1>
        <p className="mt-6 text-lg font-medium leading-[1.5] text-text-secondary">
          {excerpt}
        </p>
      </div>
    </SectionWrapper>
  );
}
