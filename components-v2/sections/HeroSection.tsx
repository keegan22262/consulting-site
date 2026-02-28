import React from "react";

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
  secondaryCta,
}) => (
  <section className="py-16 md:py-24 bg-white border-b border-slate-100">
    <div className="max-w-3xl mx-auto text-center px-4">
      {title && <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">{title}</h1>}
      {subtitle && <h2 className="text-lg md:text-2xl text-slate-700 mb-2">{subtitle}</h2>}
      {description && <p className="text-base md:text-lg text-slate-600 mb-6">{description}</p>}
      <div className="flex flex-col md:flex-row gap-3 justify-center mt-6">
        {primaryCta?.label && primaryCta?.href && (
          <a
            href={primaryCta.href}
            className="inline-block px-6 py-3 rounded-card bg-accentSemantic-primary text-white font-semibold hover:bg-accentSemantic-hover transition-colors"
          >
            {primaryCta.label}
          </a>
        )}
        {secondaryCta?.label && secondaryCta?.href && (
          <a
            href={secondaryCta.href}
            className="inline-block px-6 py-3 rounded-card border border-accentSemantic-primary text-accentSemantic-primary font-semibold hover:bg-accentSemantic-primary hover:text-white transition-colors"
          >
            {secondaryCta.label}
          </a>
        )}
      </div>
    </div>
  </section>
);

export default HeroSection;
