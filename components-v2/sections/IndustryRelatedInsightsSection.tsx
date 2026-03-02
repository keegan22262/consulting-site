import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";
import Link from "next/link";

interface RelatedInsight {
  slug: string;
  title: string;
  category: string;
}

interface IndustryRelatedInsightsSectionProps {
  insights: RelatedInsight[];
}

function InsightMiniCard({ slug, title, category }: RelatedInsight) {
  return (
    <Link
      href={`/insights/${slug}`}
      className="group block border border-neutral-200 rounded-[12px] p-6 bg-white transition duration-[200ms] ease hover:border-neutral-300 hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)]"
    >
      <span className="block text-xs uppercase tracking-widest text-text-muted mb-2">
        {category}
      </span>
      <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent-primary transition-fast">
        {title}
      </h3>
    </Link>
  );
}

export default function IndustryRelatedInsightsSection({ insights }: IndustryRelatedInsightsSectionProps) {
  return (
    <SectionWrapper>
      <div className="flex items-center justify-between">
        <SectionHeader
          overline="Sector Insights"
          title="Related Research."
        />
        <Link
          href="/insights"
          className="text-sm font-medium text-accent-primary hover:underline"
        >
          Explore all insights →
        </Link>
      </div>
      <div className="rhythm-heading-grid grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
        {insights.slice(0, 3).map((item) => (
          <InsightMiniCard
            key={item.slug}
            slug={item.slug}
            title={item.title}
            category={item.category}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
