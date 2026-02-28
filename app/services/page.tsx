import ServicesHeroSection from "@/components-v2/sections/ServicesHeroSection";
import ServicesIntroSection from "@/components-v2/sections/ServicesIntroSection";
import ServicesGridSection from "@/components-v2/sections/ServicesGridSection";
import ServicesIntegrationSection from "@/components-v2/sections/ServicesIntegrationSection";

const servicesMock = [
  {
    slug: "strategy",
    title: "Strategy",
    focusAreas: "Growth strategy, capital allocation, portfolio design",
    approach: "Structured diagnostic, scenario modeling, and board-level alignment."
  },
  {
    slug: "digital",
    title: "Digital Transformation",
    focusAreas: "Platform modernization, enterprise architecture",
    approach: "Technology roadmaps integrated with operating model redesign."
  },
  {
    slug: "finance",
    title: "Finance & Capital",
    focusAreas: "Capital structure, M&A readiness, valuation",
    approach: "Financial modeling and institutional capital advisory."
  }
];

export default async function Page() {
  return (
    <>
      <ServicesHeroSection />
      <ServicesIntroSection />
      <ServicesGridSection services={servicesMock} />
      <ServicesIntegrationSection />
    </>
  );
}
