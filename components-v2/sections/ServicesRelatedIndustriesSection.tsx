import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";
import Link from "next/link";

interface IndustryItem {
  slug: string;
  title: string;
  description: string;
}

interface ServicesRelatedIndustriesSectionProps {
  industries: IndustryItem[];
}

function IndustryMiniCard({
  slug,
  title,
  description
}: IndustryItem) {
  return (
    <Link
      href={`/industries/${slug}`}
      className="group block border border-neutral-200 rounded-[12px] p-6 bg-white transition duration-[200ms] ease hover:border-neutral-300 hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)]"
    >
      <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent-primary transition-fast">
        {title}
      </h3>
      <p className="text-base text-text-secondary mb-4 leading-relaxed">
        {description}
      </p>
      <span className="text-sm font-medium text-accent-primary">
        Explore industry →
      </span>
    </Link>
  );
}

export default function ServicesRelatedIndustriesSection({ industries }: ServicesRelatedIndustriesSectionProps) {
  return (
    <SectionWrapper background="neutral50">
      <div className="flex items-center justify-between">
        <SectionHeader
          overline="Related Industries"
          title="Sector Context."
        />
        <Link
          href="/industries"
          className="text-sm font-medium text-accent-primary hover:underline"
        >
          Explore all industries →
        </Link>
      </div>
      <div className="rhythm-heading-grid grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
        {industries.slice(0, 3).map((industry) => (
          <IndustryMiniCard
            key={industry.slug}
            slug={industry.slug}
            title={industry.title}
            description={industry.description}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
