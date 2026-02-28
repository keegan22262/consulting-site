import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import React from "react";

export default function ServicesIntroSection() {
  return (
    <SectionWrapper>
      <div className="w-12 h-0.5 bg-accent-primary mb-8" />
      <p className="text-lg leading-relaxed text-text-secondary max-w-prose">
        Each capability operates within a shared delivery framework, ensuring methodological consistency across engagement types, industry contexts, and client maturity levels. Services are deployable independently or as part of a coordinated, multi-disciplinary engagement.
      </p>
    </SectionWrapper>
  );
}
