"use client";

import SectionWrapper from "@/components-v2/sections/SectionWrapper";

export default function CoverageContextLine() {
  return (
    <SectionWrapper background="white" padV={{ desktop: 32, tablet: 24, mobile: 20 }}>
      <p
        style={{
          textAlign: "center",
          fontSize: "var(--text-body)",
          fontWeight: 600,
          color: "var(--n500)",
        }}
      >
        Identify where your priorities intersect.
      </p>
    </SectionWrapper>
  );
}
