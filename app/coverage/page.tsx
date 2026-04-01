import type { Metadata } from "next";
import CoverageHero from "@/src/sections/coverage/CoverageHero";
import CoverageContextLine from "@/src/sections/coverage/CoverageContextLine";
import CoverageMatrixSection from "@/src/sections/coverage/CoverageMatrixSection";
import CoverageCTASection from "@/src/sections/coverage/CoverageCTASection";
import CoveragePainPointsSection from "@/src/sections/coverage/CoveragePainPointsSection";
import CoverageDifferentiatorsSection from "@/src/sections/coverage/CoverageDifferentiatorsSection";
import CoverageProgressiveIntelligenceSection from "@/src/sections/coverage/CoverageProgressiveIntelligenceSection";

export const metadata: Metadata = {
  title: "Coverage Matrix",
  description:
    "RSL service and industry coverage matrix.",
  alternates: {
    canonical: "/coverage",
  },
};

export default function CoveragePage() {
  return (
    <main>
      <CoverageHero />
      <CoverageContextLine />
      <CoverageMatrixSection />
      <CoverageCTASection />
      <CoveragePainPointsSection />
      <CoverageDifferentiatorsSection />
      <CoverageProgressiveIntelligenceSection />
    </main>
  );
}
