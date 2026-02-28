
import { notFound } from "next/navigation";
import ServicesDetailHeroSection from "@/components-v2/sections/ServicesDetailHeroSection";
import ServicesChallengeSection from "@/components-v2/sections/ServicesChallengeSection";
import ServicesDeliverablesSection from "@/components-v2/sections/ServicesDeliverablesSection";
import ServicesDeliveryModelSection from "@/components-v2/sections/ServicesDeliveryModelSection";
import ServicesRelatedInsightsSection from "@/components-v2/sections/ServicesRelatedInsightsSection";
import ServicesRelatedIndustriesSection from "@/components-v2/sections/ServicesRelatedIndustriesSection";

const CAPABILITIES = {
  strategy: {
    number: "01",
    title: "Strategy",
    focusAreas: "Growth strategy, portfolio design, capital allocation.",
    targetClients: "Boards, executive committees, institutional investors.",
    approach: "Structured diagnostic, scenario modeling, and board-level alignment.",
    deliverables: [
      {
        overline: "Assessment",
        title: "Strategic Diagnostic",
        body: "Comprehensive review of positioning, performance, and capital deployment."
      },
      {
        overline: "Architecture",
        title: "Strategic Blueprint",
        body: "Integrated roadmap across growth, governance, and capital structure."
      }
    ],
    relatedIndustries: [
      {
        slug: "financial-services",
        title: "Financial Services",
        description: "Capital markets, banking, insurance, and private equity."
      },
      {
        slug: "technology",
        title: "Technology",
        description: "Enterprise software, fintech, infrastructure platforms."
      }
    ]
  }
};

export default async function Page({ params }: { params: { slug: string } }) {
  const capability = CAPABILITIES[params.slug as keyof typeof CAPABILITIES];
  if (!capability) {
    notFound();
  }
  return (
    <>
      <ServicesDetailHeroSection
        number={capability.number}
        title={capability.title}
        approach={capability.approach}
      />
      <ServicesChallengeSection
        focusAreas={capability.focusAreas}
        targetClients={capability.targetClients}
        approach={capability.approach}
      />
      <ServicesDeliverablesSection
        deliverables={capability.deliverables}
      />
      <ServicesDeliveryModelSection />
      <ServicesRelatedInsightsSection />
      <ServicesRelatedIndustriesSection
        industries={capability.relatedIndustries}
      />
    </>
  );
}
