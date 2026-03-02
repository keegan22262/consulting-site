import React from "react";
import Button from "@/components-v2/ui/Button";

export interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryCta?: { label?: string; href?: string };
  secondaryCta?: { label?: string; href?: string };
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  primaryCta,
}) => (
  <section
    className="hero-home relative overflow-hidden"
    style={{
      backgroundImage:
        "linear-gradient(120deg, rgba(3,47,80,0.78) 0%, rgba(3,47,80,0.6) 60%), url('/hero-consulting.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0C1C2E80] to-[#0C1C2EB3]" aria-hidden />
    <div className="layout-container relative flex min-h-[640px] items-center md:min-h-[720px]">
      <div className="max-w-2xl text-left text-white">
        {title && (
          <h1 className="text-4xl md:text-6xl font-semibold leading-[1.1] tracking-[-0.03em] text-white mb-4">
            {title}
          </h1>
        )}
        {subtitle && (
          <h2 className="text-lg md:text-xl text-white/80 mb-3">
            {subtitle}
          </h2>
        )}
        {description && (
          <p className="text-base md:text-lg text-white/75 max-w-2xl">
            {description}
          </p>
        )}
        {primaryCta?.label && primaryCta?.href ? (
          <div className="mt-6 md:mt-8">
            <Button href={primaryCta.href} variant="primary">
              {primaryCta.label}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  </section>
);

export default HeroSection;
