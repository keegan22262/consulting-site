import type { Metadata } from "next";

import AboutHeroSection from "@/src/sections/about/AboutHeroSection";
import TransformationJourneySection from "@/src/sections/about/TransformationJourneySection";
import InstitutionalContextSection from "@/src/sections/about/InstitutionalContextSection";
import PhilosophySection from "@/src/sections/about/PhilosophySection";
import LeadershipSection from "@/src/sections/about/LeadershipSection";
import DeliveryArchitectureSection from "@/src/sections/about/DeliveryArchitectureSection";
import InstitutionalFootprintSection from "@/src/sections/about/InstitutionalFootprintSection";
import InstitutionalMetricsSection from "@/components-v2/sections/InstitutionalMetricsSection";
import AboutCTASection from "@/src/sections/about/AboutCTASection";

export const metadata: Metadata = {
  title: "About Rill Singh Limited",
  description:
    "Rill Singh Limited (RSL) is a pan-African advisory firm delivering integrated consulting across strategy, technology, finance, people, and sustainability - with institutional discipline and measurable accountability.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Rill Singh Limited",
    description:
      "Rill Singh Limited (RSL) is a pan-African advisory firm delivering integrated consulting across strategy, technology, finance, people, and sustainability - with institutional discipline and measurable accountability.",
  },
};

export default function AboutPage() {
  return (
    <main>
      <AboutHeroSection />
      <TransformationJourneySection />
      <InstitutionalContextSection />
      <PhilosophySection />
      <LeadershipSection />
      <DeliveryArchitectureSection />
      <InstitutionalFootprintSection />
      <InstitutionalMetricsSection showCta={false} />
      <AboutCTASection />
    </main>
  );
}
