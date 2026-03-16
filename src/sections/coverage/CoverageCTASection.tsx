"use client";

import CTABlock from "@/components-v2/sections/CTABlock";

export default function CoverageCTASection() {
  return (
    <CTABlock
      heading="Discuss your strategic priorities"
      body="Every engagement begins with a structured conversation. No obligations — an exchange of context to determine whether there is a basis for collaboration."
      primary={{ label: "Discuss your strategic priorities", href: "/contact" }}
      secondary={{ label: "Explore services", href: "/services" }}
      variant="dark"
      align="center"
    />
  );
}
