import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import InsightsDetailHeroSection from "@/components-v2/sections/InsightsDetailHeroSection";
import InsightsContentSection from "@/components-v2/sections/InsightsContentSection";
import InsightsRelatedSection from "@/components-v2/sections/InsightsRelatedSection";
import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";
import ServiceCard from "@/components-v2/ui/ServiceCard";
import CTABlock from "@/components-v2/sections/CTABlock";
import { sanityClient } from "@/lib/sanity/client";
import { getInsightBySlugQuery } from "@/lib/sanity/queries";

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

  const dataHighlights = Array.isArray(insight.dataHighlights)
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

      {metaItems.length > 0 ? (
        <SectionWrapper background="white" padV={{ mobile: 24, tablet: 28, desktop: 32 }}>
          <div className="mx-auto flex max-w-[720px] flex-wrap items-center gap-3 text-sm text-text-secondary">
            {metaItems.map((item, index) => (
              <span key={item + index} className="flex items-center gap-3">
                {index > 0 ? <span className="text-text-muted">•</span> : null}
                <span>{item}</span>
              </span>
            ))}
          </div>
        </SectionWrapper>
      ) : (
        <div style={{ padding: "40px 0" }} />
      )}

      {summaryPoints.length > 0 ? (
        <SectionWrapper background="white" padV={{ mobile: 32, tablet: 40, desktop: 48 }}>
          <div className="mx-auto max-w-[720px]">
            <h2 className="text-2xl font-semibold leading-[1.2] text-text-primary">Summary</h2>
            <div className="mt-4 h-0.5 w-8 bg-[var(--a700)]" />
            <ul className="mt-6 space-y-4 text-base leading-[1.65] text-text-secondary list-disc pl-5">
              {summaryPoints.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
        </SectionWrapper>
      ) : (
        <div style={{ padding: "40px 0" }} />
      )}

      <InsightsContentSection>
        {contentBlocks.length > 0 ? (
          <PortableText
            value={contentBlocks as any}
            components={{
              block: {
                normal: ({ children }) => <p className="mb-6 last:mb-0">{children}</p>,
                h2: ({ children }) => (
                  <h2 className="mt-14 mb-6 text-2xl font-semibold leading-[1.2] text-text-primary">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mt-10 mb-4 text-xl font-semibold leading-[1.25] text-text-primary">
                    {children}
                  </h3>
                ),
              },
              list: {
                bullet: ({ children }) => (
                  <ul className="mb-6 list-disc space-y-3 pl-5 last:mb-0">{children}</ul>
                ),
              },
            }}
          />
        ) : null}
      </InsightsContentSection>

      {pullQuote ? (
        <SectionWrapper background="neutral50" padV={{ mobile: 32, tablet: 40, desktop: 48 }}>
          <div className="mx-auto max-w-[720px] rounded-card border-l-4 border-[var(--a700)] bg-[var(--n50)] p-8 text-text-primary">
            <p className="text-2xl font-semibold italic leading-[1.3]">{pullQuote}</p>
          </div>
        </SectionWrapper>
      ) : (
        <div style={{ padding: "40px 0" }} />
      )}

      {dataHighlights.length > 0 ? (
        <SectionWrapper background="white">
          <div className="rhythm-heading-grid grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            {dataHighlights.map((item, index) => (
              <div
                key={item.title + index}
                className="rounded-card border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <div className="text-sm font-semibold text-text-muted">{item.title}</div>
                <div className="mt-3 text-2xl font-semibold text-text-primary">{item.value}</div>
                {item.detail ? (
                  <p className="mt-3 text-sm leading-[1.6] text-text-secondary">{item.detail}</p>
                ) : null}
              </div>
            ))}
          </div>
        </SectionWrapper>
      ) : (
        <div style={{ padding: "40px 0" }} />
      )}

      {relatedServices.length > 0 ? (
        <SectionWrapper background="neutral50">
          <div className="flex items-center justify-between">
            <SectionHeader overline="Related Services" title="Advisory Support." />
            <Link href="/services" className="text-sm font-medium text-accent-primary hover:underline">
              Explore all services →
            </Link>
          </div>
          <div className="rhythm-heading-grid grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
            {relatedServices.map((service, index) => (
              <ServiceCard
                key={service.slug}
                slug={service.slug}
                title={service.title}
                focusAreas={service.description}
                approach={service.description}
                index={index}
              />
            ))}
          </div>
        </SectionWrapper>
      ) : null}

      {relatedInsights.length > 0 ? (
        <InsightsRelatedSection insights={relatedInsights} />
      ) : (
        <div style={{ padding: "40px 0" }} />
      )}

      <CTABlock
        title={insight.title ?? "Talk to a partner"}
        description={insight.summary ?? "Let’s translate your challenge into an actionable plan."}
        primaryLabel="Contact"
        primaryHref="/contact"
      />
    </>
  );
}
