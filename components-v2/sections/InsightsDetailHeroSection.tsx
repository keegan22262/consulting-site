import Link from "next/link";
import Breadcrumb from "@/components-v2/ui/Breadcrumb";

interface InsightTag {
  label: string;
  href: string;
}

interface InsightsDetailHeroSectionProps {
  category: string;
  title: string;
  excerpt: string;
  image?: string;
  date?: string;
  readTime?: string;
  tags?: InsightTag[];
}

export default function InsightsDetailHeroSection({
  category,
  title,
  excerpt,
  image,
  date,
  readTime,
  tags = [],
}: InsightsDetailHeroSectionProps) {
  const metaItems = [formatDate(date), readTime].filter(Boolean) as string[];

  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${image ?? "/og-default.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(40%) contrast(1.05)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(12,28,46,0.5) 0%, rgba(12,28,46,0.8) 40%, rgba(12,28,46,0.95) 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "140px 0 80px 0",
        }}
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-8">
          <div className="mb-8">
            <Breadcrumb
              items={[
                { label: "RSL", href: "/" },
                { label: "Insights", href: "/insights" },
                { label: "Detail" },
              ]}
              light
            />
          </div>

          <span className="block text-xs uppercase tracking-[0.06em] text-[rgba(255,255,255,0.6)] mb-3">
            {category}
          </span>

          <h1 className="max-w-[780px] text-[2rem] font-semibold leading-[1.2] text-white md:text-[2.75rem]">
            {title}
          </h1>

          {metaItems.length > 0 ? (
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[rgba(255,255,255,0.6)]">
              {metaItems.map((item, index) => (
                <span key={item} className="flex items-center gap-3">
                  {index > 0 ? <span className="text-[rgba(255,255,255,0.3)]">•</span> : null}
                  <span>{item}</span>
                </span>
              ))}
            </div>
          ) : null}

          {tags.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag.href}
                  href={tag.href}
                  className="rounded border border-[rgba(255,255,255,0.2)] px-2.5 py-1 text-[0.6875rem] font-medium text-[rgba(255,255,255,0.8)] transition hover:border-[rgba(255,255,255,0.4)] hover:text-white"
                >
                  {tag.label}
                </Link>
              ))}
            </div>
          ) : null}

          {excerpt ? (
            <p className="mt-6 max-w-[640px] text-base leading-[1.65] text-[rgba(255,255,255,0.75)]">
              {excerpt}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function formatDate(dateStr?: string): string | null {
  if (!dateStr) return null;
  const date = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
