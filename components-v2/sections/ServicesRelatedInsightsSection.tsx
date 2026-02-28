import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";
import Link from "next/link";

const RELATED_INSIGHTS = [
  {
    category: "Capital Strategy",
    title: "Institutionalizing Growth Architecture",
    slug: "institutionalizing-growth"
  },
  {
    category: "Digital Transformation",
    title: "Platform-Led Operating Models",
    slug: "platform-led-operating-models"
  },
  {
    category: "Governance",
    title: "Board-Level Capital Discipline",
    slug: "board-level-capital-discipline"
  }
];

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
      className="group block bg-background-primary border border-border-subtle rounded-card overflow-hidden transition-fast ease-standard hover:shadow-sm"
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

export default function ServicesRelatedInsightsSection() {
  return (
    <SectionWrapper background="slate">
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
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {RELATED_INSIGHTS.map((insight) => (
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
