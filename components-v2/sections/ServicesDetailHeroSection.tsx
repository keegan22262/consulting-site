import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import Breadcrumb from "@/components-v2/ui/Breadcrumb";

interface ServicesDetailHeroSectionProps {
  number: string;
  title: string;
  approach: string;
}

export default function ServicesDetailHeroSection({ number, title, approach }: ServicesDetailHeroSectionProps) {
  return (
    <SectionWrapper background="white" padV={{ mobile: 56, tablet: 72, desktop: 96 }} className="min-h-[360px]">
      <div className="max-w-[720px] text-left">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: "RSL", href: "/" },
              { label: "Services", href: "/services" },
              { label: title },
            ]}
          />
        </div>
        <span className="block text-xs uppercase tracking-widest text-text-muted mb-4">
          Service {number} of 10
        </span>
        <h1 className="font-semibold leading-[1.12] tracking-[-0.02em] text-text-primary">
          {title}
        </h1>
        <p className="mt-6 text-lg font-medium leading-[1.5] text-text-secondary">
          {approach}
        </p>
      </div>
    </SectionWrapper>
  );
}
