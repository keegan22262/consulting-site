import Link from "next/link";
import SectionWrapper from "@/components-v2/sections/SectionWrapper";

interface IndustryDetailHeroSectionProps {
  title: string;
  description: string;
}

export default function IndustryDetailHeroSection({ title, description }: IndustryDetailHeroSectionProps) {
  return (
    <SectionWrapper background="white" padV={{ mobile: 56, tablet: 72, desktop: 96 }} className="min-h-[360px]">
      <div className="max-w-[720px] text-left">
        <nav className="mb-8 text-sm text-text-muted">
          <Link href="/" className="text-text-secondary">RSL</Link>
          <span className="mx-2">/</span>
          <Link href="/industries" className="text-text-secondary">Industries</Link>
          <span className="mx-2">/</span>
          <span className="text-text-primary font-medium">{title}</span>
        </nav>
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
