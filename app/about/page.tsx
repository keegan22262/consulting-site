import type { Metadata } from "next";

import AboutHeroSection from "@/src/sections/about/AboutHeroSection";
import TransformationJourneySection from "@/src/sections/about/TransformationJourneySection";
import InstitutionalContextSection from "@/src/sections/about/InstitutionalContextSection";
import PhilosophySection from "@/src/sections/about/PhilosophySection";
import AdvisoryDisciplinesSection from "@/src/sections/about/AdvisoryDisciplinesSection";
import InstitutionalFootprintSection from "@/src/sections/about/InstitutionalFootprintSection";
import ClientImpactSection from "@/src/sections/about/ClientImpactSection";
import DeliveryArchitectureSection from "@/src/sections/about/DeliveryArchitectureSection";
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
      <AdvisoryDisciplinesSection />
      <InstitutionalFootprintSection />
      <ClientImpactSection />
      <DeliveryArchitectureSection />
      <AboutCTASection />
    </main>
  );
}
