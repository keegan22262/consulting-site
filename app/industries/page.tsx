import HeroSection from "@/components-v2/sections/HeroSection";
import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";
import IndustryCard from "@/components-v2/ui/IndustryCard";

export default function IndustriesPage() {
  const industriesMock = [
    {
      title: "Financial Services",
      description: "Banking & Capital Markets, Insurance, Private Equity",
      slug: "financial-services",
    },
    {
      title: "Technology & Digital",
      description: "Enterprise Software, Fintech, Infrastructure",
      slug: "technology-digital",
    },
    {
      title: "Energy & Resources",
      description: "Oil & Gas, Power & Utilities, Renewables",
      slug: "energy-resources",
    },
  ];

  return (
    <>
      <HeroSection
        title="Industries"
        subtitle="Sector-focused advisory"
        description="Deep sector insight across capital, growth and transformation."
      />
      <SectionWrapper>
        <SectionHeader
          overline="Industries"
          title="Sector-focused advisory"
          description="Deep sector insight across capital, growth, and transformation."
        />
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {industriesMock.map((industry) => (
            <IndustryCard
              key={industry.slug}
              title={industry.title}
              description={industry.description}
              href={`/industries/${industry.slug}`}
            />
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
