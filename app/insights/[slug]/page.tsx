import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InsightsDetailHeroSection from "@/components-v2/sections/InsightsDetailHeroSection";
import InsightsRelatedSection from "@/components-v2/sections/InsightsRelatedSection";
import CTABlock from "@/components-v2/sections/CTABlock";
import { sanityClient } from "@/lib/sanity/client";
import { getInsightBySlugQuery } from "@/lib/sanity/queries";
import InsightBodySection from "@/src/sections/insight-detail/InsightBodySection";
import InsightDataHighlightsSection, {
  type InsightDataHighlight,
} from "@/src/sections/insight-detail/InsightDataHighlightsSection";
import InsightMetaStrip from "@/src/sections/insight-detail/InsightMetaStrip";
import InsightPullQuoteSection from "@/src/sections/insight-detail/InsightPullQuoteSection";
import InsightRelatedServicesSection from "@/src/sections/insight-detail/InsightRelatedServicesSection";
import InsightSummarySection from "@/src/sections/insight-detail/InsightSummarySection";
import Link from "next/link";
import { CASE_STUDIES } from "@/src/sections/case-study/data";

export const dynamic = "force-dynamic";
export const revalidate = 60;

type RelatedInsight = {
  slug?: string;
  title?: string;
  category?: string;
};

type RelatedService = {
  slug?: string;
  title?: string;
  description?: string;
};

type DataHighlight = {
  title?: string;
  value?: string;
  detail?: string;
};

type InsightResult = {
  slug?: string;
  title?: string;
  summary?: string;
  category?: string;
  content?: unknown[];
  body?: unknown[];
  publishedAt?: string;
  readTime?: string;
  summaryPoints?: string[];
  pullQuote?: string;
  dataHighlights?: DataHighlight[];
  relatedServices?: RelatedService[];
  relatedInsights?: RelatedInsight[];
  heroImage?: { url?: string };
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const insight = await sanityClient.fetch<InsightResult | null>(getInsightBySlugQuery, { slug });

  if (!insight?.title) {
    return {
      title: "Rill Singh Limited",
    };
  }

  const description = insight.summary ?? "Insight from Rill Singh Limited.";
  const image = insight.heroImage?.url ?? "/og-default.jpg";

  return {
    title: `${insight.title} | Insights | Rill Singh Limited`,
    description,
    openGraph: {
      title: `${insight.title} | Insights | Rill Singh Limited`,
      description,
      url: `https://rillsingh.com/insights/${slug}`,
      type: "article",
      publishedTime: insight.publishedAt,
      images: [image],
    },
    alternates: {
      canonical: `https://rillsingh.com/insights/${slug}`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const insight = await sanityClient.fetch<InsightResult | null>(getInsightBySlugQuery, {
    slug,
  });

  if (process.env.NODE_ENV === "development") {
    console.log("Sanity fetch result:", insight);
  }

  if (!insight?.title) {
    console.warn("No data found for insight", slug);
    notFound();
  }

  const contentBlocks = (Array.isArray(insight.content)
    ? insight.content
    : Array.isArray(insight.body)
      ? insight.body
      : []) as Record<string, unknown>[];

  const relatedInsights = (insight.relatedInsights ?? [])
    .filter((item): item is RelatedInsight & { slug: string; title: string } =>
      Boolean(item?.slug && item?.title && item.slug !== slug)
    )
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      category: item.category ?? "Insight",
    }))
    .slice(0, 3);

  const relatedServices = (insight.relatedServices ?? [])
    .filter((item): item is RelatedService & { slug: string; title: string } => Boolean(item?.slug && item?.title))
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      description: item.description ?? "",
    }))
    .slice(0, 3);

  const summaryPoints = Array.isArray(insight.summaryPoints)
    ? insight.summaryPoints.filter((point): point is string => Boolean(point))
    : [];

  const dataHighlights: InsightDataHighlight[] = Array.isArray(insight.dataHighlights)
    ? insight.dataHighlights
        .filter((item): item is DataHighlight & { title: string; value: string } => Boolean(item?.title && item?.value))
        .map((item) => ({
          title: item.title,
          value: item.value,
          detail: item.detail ?? "",
        }))
    : [];

  const pullQuote = insight.pullQuote?.trim() ?? "";

  const metaItems = [insight.publishedAt, insight.readTime, insight.category ?? "Insight"]
    .filter(Boolean)
    .map((item) => String(item));

  const canonicalUrl = `https://rillsingh.com/insights/${slug}`;
  const description = insight.summary ?? "Insight from Rill Singh Limited.";
  const heroImageUrl = insight.heroImage?.url ?? "https://rillsingh.com/og-default.jpg";

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title ?? "Insight | Rill Singh Limited",
    description,
    mainEntityOfPage: canonicalUrl,
    datePublished: insight.publishedAt ?? undefined,
    dateModified: insight.publishedAt ?? undefined,
    author: {
      "@type": "Organization",
      name: "Rill Singh Limited",
    },
    publisher: {
      "@type": "Organization",
      name: "Rill Singh Limited",
      logo: {
        "@type": "ImageObject",
        url: "https://rillsingh.com/logo.png",
      },
    },
    image: [heroImageUrl],
    url: canonicalUrl,
  };

  return (
    <>
      <InsightsDetailHeroSection
        category={insight.category ?? "Insight"}
        title={insight.title}
        excerpt={insight.summary ?? ""}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      <InsightMetaStrip metaItems={metaItems} />

      <InsightSummarySection summaryPoints={summaryPoints} />

      <InsightBodySection contentBlocks={contentBlocks} />

      <InsightPullQuoteSection pullQuote={pullQuote} />

      <InsightDataHighlightsSection dataHighlights={dataHighlights} />

      <InsightRelatedServicesSection relatedServices={relatedServices} />

      <TranslateInsightSection />

      {relatedInsights.length > 0 ? (
        <InsightsRelatedSection insights={relatedInsights} />
      ) : (
        <div style={{ padding: "40px 0" }} />
      )}

      <RelatedIndustriesSection />

      <RelatedCaseStudiesSection />

      <InsightKnowledgeNavigation hasServices={relatedServices.length > 0} />

      <CTABlock
        title={insight.title ?? "Talk to a partner"}
        description={insight.summary ?? "Let’s translate your challenge into an actionable plan."}
        primaryLabel="Contact"
        primaryHref="/contact"
      />
    </>
  );
}

function TranslateInsightSection() {
  return (
    <section className="bg-[#F8FAFC] py-14 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-8 md:p-10">
          <span className="block text-xs font-semibold uppercase tracking-widest text-[#1B3A5C]">
            Translate Insight into Action
          </span>
          <h3 className="mt-3 text-[1.5rem] font-semibold leading-[1.2] text-[#0F1720] md:text-[1.875rem]">
            Move from analysis to institutional execution.
          </h3>
          <p className="mt-4 max-w-[62ch] text-base leading-[1.7] text-[#475569]">
            We help leadership teams turn research findings into scoped initiatives, governance decisions, and delivery
            plans aligned to operational realities.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-lg bg-[#1B3A5C] px-7 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#0C1C2E]"
            >
              Discuss This Insight
            </Link>
            <Link
              href="/services"
              className="rounded-lg border border-[#CBD5E1] px-7 py-3 text-center text-sm font-semibold text-[#1B3A5C] transition hover:border-[#94A3B8]"
            >
              Explore Advisory Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function InsightKnowledgeNavigation({ hasServices }: { hasServices: boolean }) {
  return (
    <section className="bg-white py-14 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <span className="block text-xs font-semibold uppercase tracking-widest text-[#1B3A5C]">Explore Related Knowledge</span>
        <h3 className="mt-3 text-[1.5rem] font-semibold leading-[1.2] text-[#0F1720] md:text-[2rem]">
          Continue from insight to execution context.
        </h3>
        <p className="mt-4 max-w-[62ch] text-base leading-[1.7] text-[#475569]">
          Move between research, service architecture, and applied case context to shape institution-specific decisions.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Link
            href="/insights"
            className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 text-sm font-medium text-[#334155] transition hover:border-[#94A3B8]"
          >
            More Insights
          </Link>
          <Link
            href={hasServices ? "/services" : "/contact"}
            className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 text-sm font-medium text-[#334155] transition hover:border-[#94A3B8]"
          >
            {hasServices ? "Related Services" : "Discuss This Topic"}
          </Link>
          <Link
            href="/case-studies"
            className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 text-sm font-medium text-[#334155] transition hover:border-[#94A3B8]"
          >
            Case Studies
          </Link>
        </div>
      </div>
    </section>
  );
}

function RelatedIndustriesSection() {
  const industries = [
    ["financial-services", "Financial Services"],
    ["technology-digital", "Technology, Media & Telecommunications"],
    ["public-sector-government", "Public Sector & Government"],
  ] as const;

  return (
    <section className="bg-[#F8FAFC] py-14 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <span className="block text-xs font-semibold uppercase tracking-widest text-[#1B3A5C]">Related Industries</span>
        <h3 className="mt-3 text-[1.5rem] font-semibold leading-[1.2] text-[#0F1720] md:text-[2rem]">
          Sector contexts connected to this insight.
        </h3>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {industries.map(([slug, label]) => (
            <Link
              key={slug}
              href={`/industries/${slug}`}
              className="rounded-xl border border-[#E2E8F0] bg-white p-6 text-sm font-medium text-[#334155] transition hover:border-[#94A3B8]"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedCaseStudiesSection() {
  const studies = CASE_STUDIES.slice(0, 2);

  return (
    <section className="bg-white py-14 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <span className="block text-xs font-semibold uppercase tracking-widest text-[#1B3A5C]">Related Case Studies</span>
        <h3 className="mt-3 text-[1.5rem] font-semibold leading-[1.2] text-[#0F1720] md:text-[2rem]">
          Applied execution examples.
        </h3>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {studies.map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 transition hover:border-[#94A3B8]"
            >
              <h4 className="text-base font-semibold text-[#0F1720]">{study.title}</h4>
              <p className="mt-2 text-sm leading-[1.6] text-[#475569]">{study.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
