import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InsightInDevelopmentPlaceholder from "@/components-v2/sections/InsightInDevelopmentPlaceholder";
import InsightsDetailHeroSection from "@/components-v2/sections/InsightsDetailHeroSection";
import InsightsRelatedSection from "@/components-v2/sections/InsightsRelatedSection";
import CTABlock from "@/components-v2/sections/CTABlock";
import { sanityClient } from "@/lib/sanity/client";
import { getInsightBySlugQuery } from "@/lib/sanity/queries";
import InsightBodySection from "@/src/sections/insight-detail/InsightBodySection";
import type { InsightDataHighlight } from "@/src/sections/insight-detail/InsightDataHighlightsSection";
import InsightRelatedServicesSection from "@/src/sections/insight-detail/InsightRelatedServicesSection";
import { CASE_STUDIES } from "@/src/sections/case-study/data";
import { ExploreRelatedKnowledge, type KnowledgeLink } from "@/components-v2/ui/RelatedKnowledge";
import { INSIGHTS_DATA } from "@/src/sections/insights/data";
import InsightRelatedIndustriesSection, {
  type InsightRelatedIndustry,
} from "@/src/sections/insight-detail/InsightRelatedIndustriesSection";
import InsightRelatedEngagementsSection from "@/src/sections/insight-detail/InsightRelatedEngagementsSection";
import TranslateInsightSection from "@/src/sections/insight-detail/TranslateInsightSection";

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
  summary?: string;
};

type DataHighlight = {
  label?: string;
  value?: string;
  detail?: string;
};

type InsightTag = {
  slug?: string;
  id?: string;
  label?: string;
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
  industryTags?: InsightTag[];
  serviceTags?: InsightTag[];
  relatedServices?: RelatedService[];
  relatedInsights?: RelatedInsight[];
  heroImage?: { url?: string };
  sourceUrl?: string;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const insight = await sanityClient.fetch<InsightResult | null>(getInsightBySlugQuery, { slug });
  const fallback = INSIGHTS_DATA.find((item) => item.slug === slug);

  if (!insight?.title && !fallback?.headline) {
    return {
      title: "Rill Singh Limited",
    };
  }

  const description = insight?.summary ?? fallback?.whatItMeans ?? "Insight from Rill Singh Limited.";
  const image = insight?.heroImage?.url ?? fallback?.image ?? "/og-default.jpg";
  const title = insight?.title ?? fallback?.headline ?? "Insight";

  return {
    title: `${title} | Insights | Rill Singh Limited`,
    description,
    openGraph: {
      title: `${title} | Insights | Rill Singh Limited`,
      description,
      url: `https://rillsingh.com/insights/${slug}`,
      type: "article",
      publishedTime: insight?.publishedAt ?? fallback?.date,
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
  const fallback = INSIGHTS_DATA.find((item) => item.slug === slug);

  if (process.env.NODE_ENV === "development") {
    console.log("Sanity fetch result:", insight);
  }

  if (!insight?.title && !fallback?.headline) {
    // Show in-development placeholder instead of 404
    return <InsightInDevelopmentPlaceholder />;
  }

  const contentBlocks = (Array.isArray(insight?.content)
    ? insight?.content
    : Array.isArray(insight?.body)
      ? insight?.body
      : []) as Record<string, unknown>[];

  const relatedInsights = (insight?.relatedInsights ?? [])
    .filter((item): item is RelatedInsight & { slug: string; title: string } =>
      Boolean(item?.slug && item?.title && item.slug !== slug)
    )
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      category: item.category ?? "Insight",
    }))
    .slice(0, 3);

  const relatedServices = (insight?.relatedServices ?? [])
    .filter((item): item is RelatedService & { slug: string; title: string } => Boolean(item?.slug && item?.title))
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      description: item.description ?? item.summary ?? "",
    }))
    .slice(0, 3);

  const summaryPoints = Array.isArray(insight?.summaryPoints)
    ? insight.summaryPoints.filter((point): point is string => Boolean(point))
    : [];
  if (summaryPoints.length === 0) {
    if (insight?.summary) {
      summaryPoints.push(insight.summary);
    } else if (fallback?.whatItMeans) {
      summaryPoints.push(fallback.whatItMeans);
    }
  }

  const dataHighlights: InsightDataHighlight[] = Array.isArray(insight?.dataHighlights)
    ? insight.dataHighlights
        .filter((item): item is DataHighlight & { label: string; value: string } => Boolean(item?.label && item?.value))
        .map((item) => ({
          title: item.label,
          value: item.value,
          detail: item.detail ?? "",
        }))
    : [];

  const pullQuote = insight?.pullQuote?.trim() ?? "";

  const canonicalUrl = `https://rillsingh.com/insights/${slug}`;
  const description = insight?.summary ?? fallback?.whatItMeans ?? "Insight from Rill Singh Limited.";
  const heroImageUrl = insight?.heroImage?.url ?? fallback?.image ?? "https://rillsingh.com/og-default.jpg";
  const sourceUrl = insight?.sourceUrl ?? fallback?.source ?? "";

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight?.title ?? fallback?.headline ?? "Insight | Rill Singh Limited",
    description,
    mainEntityOfPage: canonicalUrl,
    datePublished: insight?.publishedAt ?? fallback?.date ?? undefined,
    dateModified: insight?.publishedAt ?? fallback?.date ?? undefined,
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

  const industryTags = Array.isArray(insight?.industryTags)
    ? insight.industryTags
        .filter((tag): tag is InsightTag & { id: string; label: string } => Boolean(tag?.id && tag?.label))
        .map((tag) => ({ id: tag.id, label: tag.label }))
    : [];
  const relatedIndustries: InsightRelatedIndustry[] = industryTags.length > 0
    ? industryTags
    : [
        { href: "/industries/financial-services", label: "Financial Services" },
        { href: "/industries/technology-digital", label: "Technology, Media & Telecommunications" },
        { href: "/industries/public-sector-government", label: "Public Sector & Government" },
      ].map((item) => ({ id: item.href.split("/").pop() || item.href, label: item.label }));
  const serviceTags = Array.isArray(insight?.serviceTags)
    ? insight.serviceTags
        .filter((tag): tag is InsightTag & { slug: string; label: string } => Boolean(tag?.slug && tag?.label))
        .map((tag) => ({ slug: tag.slug, label: tag.label }))
    : [];
  const knowledgeServices: KnowledgeLink[] = relatedServices.map((svc) => ({
    label: svc.title,
    href: `/services/${svc.slug}`,
  }));
  const knowledgeInsights: KnowledgeLink[] = relatedInsights.map((ins) => ({
    label: ins.title,
    href: `/insights/${ins.slug}`,
    category: ins.category,
  }));
  const relatedServiceIds = relatedServices.map((svc) => svc.slug);
  const relatedIndustryIds = relatedIndustries.map((ind) => ind.id);
  const relatedCaseStudies = CASE_STUDIES.filter(
    (study) =>
      study.serviceIds.some((id) => relatedServiceIds.includes(id)) ||
      study.industryIds.some((id) => relatedIndustryIds.includes(id)),
  ).slice(0, 2);
  const knowledgeCaseStudies: KnowledgeLink[] = relatedCaseStudies.map((study) => ({
    label: study.title,
    href: `/case-studies/${study.slug}`,
  }));
  const heroTags = [
    ...(industryTags.length > 0
      ? industryTags.map((ind) => ({ label: ind.label, href: `/industries/${ind.id}` }))
      : relatedIndustries.map((ind) => ({ label: ind.label, href: `/industries/${ind.id}` }))),
    ...(serviceTags.length > 0
      ? serviceTags.map((svc) => ({ label: svc.label, href: `/services/${svc.slug}` }))
      : relatedServices.map((svc) => ({ label: svc.title, href: `/services/${svc.slug}` }))),
  ];
  const sidebarServices = serviceTags.length > 0
    ? serviceTags
    : relatedServices.map((svc) => ({ slug: svc.slug, label: svc.title }));
  const sidebarIndustries = industryTags.length > 0 ? industryTags : relatedIndustries;

  return (
    <>
      <InsightsDetailHeroSection
        category={insight?.category ?? fallback?.category ?? "Insight"}
        title={insight?.title ?? fallback?.headline ?? ""}
        excerpt={insight?.summary ?? fallback?.whatItMeans ?? ""}
        image={insight?.heroImage?.url ?? fallback?.image ?? "/og-default.jpg"}
        date={insight?.publishedAt ?? fallback?.date ?? ""}
        readTime={insight?.readTime ?? fallback?.readTime ?? ""}
        tags={heroTags}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      <InsightBodySection
        contentBlocks={contentBlocks}
        summaryPoints={summaryPoints}
        dataHighlights={dataHighlights}
        pullQuote={pullQuote}
        sourceUrl={sourceUrl}
        relatedServices={sidebarServices}
        relatedIndustries={sidebarIndustries}
        shareUrl={canonicalUrl}
        shareTitle={insight?.title ?? fallback?.headline ?? ""}
        discussionCTA={{ label: "Discuss this insight", to: "/contact" }}
      />

      <TranslateInsightSection category={insight?.category ?? fallback?.category} />

      {relatedInsights.length > 0 ? (
        <InsightsRelatedSection insights={relatedInsights} />
      ) : (
        <div style={{ padding: "40px 0" }} />
      )}

      <InsightRelatedServicesSection relatedServices={relatedServices} />

      <InsightRelatedIndustriesSection industries={relatedIndustries} />

      <InsightRelatedEngagementsSection caseStudies={relatedCaseStudies} />

      <ExploreRelatedKnowledge
        industries={relatedIndustries.map((ind) => ({ label: ind.label, href: `/industries/${ind.id}` }))}
        services={knowledgeServices}
        insights={knowledgeInsights}
        caseStudies={knowledgeCaseStudies}
      />

      <CTABlock
        title={insight?.title ?? fallback?.headline ?? "Talk to a partner"}
        description={insight?.summary ?? fallback?.whatItMeans ?? "Let’s translate your challenge into an actionable plan."}
        primaryLabel="Contact"
        primaryHref="/contact"
      />
    </>
  );
}
