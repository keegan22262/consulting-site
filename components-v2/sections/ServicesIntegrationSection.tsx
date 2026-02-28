import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";
import React from "react";

export default function ServicesIntegrationSection() {
  return (
    <SectionWrapper>
      <SectionHeader
        overline="Integrated Delivery"
        title="One coordinated team."
      />
      <div className="mt-6 max-w-prose">
        <p className="text-base leading-relaxed text-text-secondary">
          Our ten disciplines are not isolated practices. They operate within a shared delivery framework — ensuring that strategic, digital, financial, people, and regulatory workstreams are coordinated from diagnostic through institutional handover. This reduces fragmentation, accelerates timelines, and ensures accountability across the full engagement lifecycle.
        </p>
      </div>
    </SectionWrapper>
  );
}
