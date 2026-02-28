import { notFound } from "next/navigation";
import IndustryDetailHeroSection from "@/components-v2/sections/IndustryDetailHeroSection";
import IndustryContextSection from "@/components-v2/sections/IndustryContextSection";
import IndustryRelatedServicesSection from "@/components-v2/sections/IndustryRelatedServicesSection";
import IndustryRelatedInsightsSection from "@/components-v2/sections/IndustryRelatedInsightsSection";

const INDUSTRIES = {
  "financial-services": {
    title: "Financial Services",
    description: "Capital markets, banking, insurance, and institutional asset management.",
    pressures: "Regulatory evolution, capital adequacy demands, digital-native competitors, and cross-border liquidity pressures are redefining institutional resilience.",
    transformationFocus: "Core modernization, governance strengthening, risk architecture enhancement, and capital allocation discipline.",
    institutionalShift: "Leading institutions are transitioning from product-centric growth models to platform-based financial ecosystems supported by digital core infrastructure.",
    relatedServices: [
      {
        slug: "strategy",
        title: "Strategy",
        description: "Institutional growth design and capital architecture."
      },
      {
        slug: "digital-transformation",
        title: "Digital Transformation",
        description: "Platform modernization and operating model redesign."
      }
    ],
    relatedInsights: [
      {
        slug: "institutionalizing-growth",
        title: "Institutionalizing Growth Architecture",
        category: "Capital Strategy"
      },
      {
        slug: "governance-discipline",
        title: "Board-Level Capital Discipline",
        category: "Governance"
      }
    ]
  }
};

export default async function Page({ params }: { params: { slug: string } }) {
  const industry = INDUSTRIES[params.slug as keyof typeof INDUSTRIES];
  if (!industry) {
    notFound();
  }
  return (
    <>
      <IndustryDetailHeroSection
        title={industry.title}
        description={industry.description}
      />
      <IndustryContextSection
        pressures={industry.pressures}
        transformationFocus={industry.transformationFocus}
        institutionalShift={industry.institutionalShift}
      />
      <IndustryRelatedServicesSection
        services={industry.relatedServices}
      />
      <IndustryRelatedInsightsSection
        insights={industry.relatedInsights}
      />
    </>
  );
}
