import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";
import IndustryCard from "@/components-v2/ui/IndustryCard";

export interface IndustriesOverviewProps {
  industries: {
    title: string;
    description: string;
    slug: string;
  }[];
}

const IndustriesOverview = ({ industries }: IndustriesOverviewProps) => {
  return (
    <SectionWrapper>
      <SectionHeader
        title="Industries"
        description="We support organizations across a range of industries."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12">
        {industries.map((industry) => (
          <IndustryCard
            key={industry.slug}
            title={industry.title}
            description={industry.description}
            href={`/industries/${industry.slug}`}
          />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default IndustriesOverview;