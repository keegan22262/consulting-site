import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import React from "react";

export default function ServicesIntroSection() {
  return (
    <SectionWrapper padV={{ mobile: 40, tablet: 48, desktop: 64 }} background="white">
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--SECTION_OVERLINE_COLOR)]">
          Services
        </span>
        <h2 className="mt-3 text-3xl font-semibold leading-[1.15] text-text-primary">
          Advisory disciplines
        </h2>
        <div className="mt-6 mb-6 h-0.5 w-12 bg-[var(--a700)]" />
        <p className="text-base leading-[1.7] text-text-secondary max-w-[720px]">
          Each capability operates within a shared delivery framework, ensuring methodological consistency across engagement types, industry contexts, and client maturity levels. Services are deployable independently or as part of a coordinated, multi-disciplinary engagement.
        </p>
      </div>
    </SectionWrapper>
  );
}
