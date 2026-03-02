"use client";
import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import Button from "@/components-v2/ui/Button";

interface CTABlockProps {
  title: string;
  description?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  secondaryVariant?: "primary" | "secondary" | "ghost" | "text" | "arrow";
}

export default function CTABlock({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  secondaryVariant = "ghost",
}: CTABlockProps) {
  return (
    <SectionWrapper background="accent700" className="text-white">
      <div className="mx-auto flex max-w-[720px] flex-col items-center text-center">
        <h2 className="text-3xl font-semibold leading-[1.2] tracking-[-0.02em] text-white mb-4">
          {title}
        </h2>
        {description ? (
          <p className="text-base leading-[1.7] text-white/85 mb-8">
            {description}
          </p>
        ) : null}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href={primaryHref} variant="secondary" className="border-white bg-white text-[var(--a800)] hover:bg-white/90">
            {primaryLabel}
          </Button>
          {secondaryLabel && secondaryHref ? (
            <Button
              href={secondaryHref}
              variant={secondaryVariant}
              className={
                secondaryVariant === "ghost"
                  ? "text-white hover:text-white hover:bg-white/10"
                  : secondaryVariant === "secondary"
                  ? "border-white text-white hover:border-white/80 hover:bg-white/10"
                  : undefined
              }
            >
              {secondaryLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </SectionWrapper>
  );
}
