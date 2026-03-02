import SectionWrapper from "@/components-v2/sections/SectionWrapper";

interface ServicesDetailHeroSectionProps {
  number: string;
  title: string;
  approach: string;
}

export default function ServicesDetailHeroSection({ number, title, approach }: ServicesDetailHeroSectionProps) {
  return (
    <SectionWrapper background="white" padV={{ mobile: 56, tablet: 72, desktop: 96 }} className="min-h-[360px]">
      <div className="max-w-[720px] text-left">
        <nav className="mb-8 text-sm text-text-muted">
          <span>RSL</span>
          <span className="mx-2">/</span>
          <span>Services</span>
          <span className="mx-2">/</span>
          <span className="font-medium text-text-primary">{title}</span>
        </nav>
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
