import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import Breadcrumb from "@/components-v2/ui/Breadcrumb";

interface IndustryDetailHeroSectionProps {
  title: string;
  description: string;
}

export default function IndustryDetailHeroSection({ title, description }: IndustryDetailHeroSectionProps) {
  return (
    <SectionWrapper background="white" padV={{ mobile: 56, tablet: 72, desktop: 96 }} className="min-h-[360px]">
      <div className="max-w-[720px] text-left">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: "RSL", href: "/" },
              { label: "Industries", href: "/industries" },
              { label: title },
            ]}
          />
        </div>
        <h1 className="font-semibold leading-[1.12] tracking-[-0.02em] text-text-primary">
          {title}
        </h1>
        <p className="mt-6 text-lg font-medium leading-[1.5] text-text-secondary">
          {description}
        </p>
      </div>
    </SectionWrapper>
  );
}
