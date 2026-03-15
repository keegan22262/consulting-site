import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";
import IndustryCard from "@/components-v2/ui/IndustryCard";

export interface IndustriesOverviewProps {
  industries: {
    title: string;
    description: string;
    slug: string;
  }[];
  background?: "white" | "slate" | "primary" | "accent50" | "accent700" | "neutral50";
}

const IndustriesOverview = ({ industries, background = "white" }: IndustriesOverviewProps) => {
  return (
    <SectionWrapper background={background}>
      <SectionHeader
        title="Industries"
        description="We support organizations across a range of industries."
      />
      <div className="rhythm-heading-grid grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
        {industries.map((industry) => (
          <IndustryCard
            key={industry.slug}
            title={industry.title}
            description={industry.description}
            variant="detailed"
            href={`/industries/${industry.slug}`}
          />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default IndustriesOverview;