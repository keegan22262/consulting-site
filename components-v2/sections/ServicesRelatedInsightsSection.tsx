import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";
import Link from "next/link";

type RelatedInsight = {
  category: string;
  title: string;
  slug: string;
};

function InsightMiniCard({
  category,
  title,
  slug
}: {
  category: string;
  title: string;
  slug: string;
}) {
  return (
    <Link
      href={`/insights/${slug}`}
      className="group block bg-white border border-neutral-200 rounded-[12px] overflow-hidden transition duration-[200ms] ease hover:border-neutral-300 hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)]"
    >
      <div className="aspect-video bg-neutral-200" />
      <div className="p-6">
        <span className="block text-xs uppercase tracking-widest text-text-muted mb-2">
          {category}
        </span>
        <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent-primary transition-fast">
          {title}
        </h3>
      </div>
    </Link>
  );
}

interface ServicesRelatedInsightsSectionProps {
  insights: RelatedInsight[];
}

export default function ServicesRelatedInsightsSection({ insights }: ServicesRelatedInsightsSectionProps) {
  return (
    <SectionWrapper>
      <div className="flex items-center justify-between">
        <SectionHeader
          overline="Related Insights"
          title="Further Reading."
        />
        <Link
          href="/insights"
          className="text-sm font-medium text-accent-primary hover:underline"
        >
          Explore all insights →
        </Link>
      </div>
      <div className="rhythm-heading-grid grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
        {insights.slice(0, 3).map((insight) => (
          <InsightMiniCard
            key={insight.slug}
            category={insight.category}
            title={insight.title}
            slug={insight.slug}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
