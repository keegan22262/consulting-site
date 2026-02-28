"use client";
import { useState } from "react";

interface CTABlockProps {
  title: string;
  description?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTABlock({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CTABlockProps) {
  const [primaryHover, setPrimaryHover] = useState(false);
  const [secondaryHover, setSecondaryHover] = useState(false);

  return (
    <section className="bg-accent-primary rounded-card border-subtle p-12 transition-fast ease-standard">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">{title}</h2>
        {description && (
          <p className="text-neutral-600 mb-6">{description}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <a
            href={primaryHref}
            onMouseEnter={() => setPrimaryHover(true)}
            onMouseLeave={() => setPrimaryHover(false)}
            className={`bg-accent-primary text-white font-semibold py-3 px-6 rounded-card border-subtle transition-fast ease-standard ${primaryHover ? "bg-accent-hover" : ""}`}
          >
            {primaryLabel}
          </a>
          {secondaryLabel && secondaryHref && (
            <a
              href={secondaryHref}
              onMouseEnter={() => setSecondaryHover(true)}
              onMouseLeave={() => setSecondaryHover(false)}
              className={`text-accent-primary underline underline-offset-2 transition-fast ease-standard ${secondaryHover ? "text-accent-hover" : ""}`}
            >
              {secondaryLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
