import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityClient } from "@/lib/sanity/client";
import { getIndustryBySlugQuery } from "@/lib/sanity/queries";
import IndustryDetailSections from "@/src/sections/industry-detail/IndustryDetailSections";
import { INDUSTRIES, INDUSTRY_IMAGES } from "@/src/sections/industries/data";
import { INSIGHTS_DATA } from "@/src/sections/insights/data";
import { SERVICES } from "@/src/sections/services/data";

export const dynamic = "force-dynamic";
export const revalidate = 60;

type RelatedService = {
  slug?: string;
  title?: string;
  description?: string;
};

type RelatedInsight = {
  slug?: string;
  title?: string;
  category?: string;
  summary?: string;
  readingTime?: string | number;
};

type IndustryResult = {
  slug?: string;
  title?: string;
  summary?: string;
  description?: string;
  challenge?: string;
  regulatoryContext?: string;
  relatedServices?: RelatedService[];
  relatedInsights?: RelatedInsight[];
  heroImage?: { url?: string };
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = await sanityClient.fetch<IndustryResult | null>(getIndustryBySlugQuery, { slug });
  const fallback = INDUSTRIES.find((item) => item.id === slug);

  if (!industry?.title && !fallback?.title) {
    return {
      title: "Rill Singh Limited",
    };
  }

  const description =
    industry?.summary ?? fallback?.description ?? "Industry advisory delivered by Rill Singh Limited.";
  const image = industry?.heroImage?.url ?? INDUSTRY_IMAGES[slug] ?? "/og-default.jpg";
  const title = industry?.title ?? fallback?.title ?? "Rill Singh Limited";

  return {
    title: `${title} Industry Advisory | Rill Singh Limited`,
    description,
    openGraph: {
      title: `${title} Industry Advisory | Rill Singh Limited`,
      description,
      url: `https://rillsingh.com/industries/${slug}`,
      type: "article",
      images: [image],
    },
    alternates: {
      canonical: `https://rillsingh.com/industries/${slug}`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = await sanityClient.fetch<IndustryResult | null>(getIndustryBySlugQuery, {
    slug,
  });
  const fallback = INDUSTRIES.find((item) => item.id === slug);

  if (!industry?.title && !fallback?.title) {
    console.warn("No data found for industry", slug);
    notFound();
  }

  const relatedServices = (industry?.relatedServices ?? [])
    .filter((item): item is RelatedService & { slug: string; title: string } => Boolean(item?.slug && item?.title))
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      description: item.description ?? "",
    }))
    .slice(0, 3);

  const relatedInsights = (industry?.relatedInsights ?? [])
    .filter((item): item is RelatedInsight & { slug: string; title: string } => Boolean(item?.slug && item?.title))
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      category: item.category ?? "Insight",
      summary: item.summary ?? "",
      readingTime: item.readingTime,
    }))
    .slice(0, 3);

  const fallbackServices = fallback
    ? SERVICES.filter((service) => fallback.capabilities.includes(service.title))
        .map((service) => ({
          slug: service.slug,
          title: service.title,
          description: service.focusAreas,
        }))
        .slice(0, 3)
    : [];

  const fallbackInsights = fallback
    ? INSIGHTS_DATA.slice(0, 3).map((insight) => ({
        slug: insight.slug,
        title: insight.headline,
        category: insight.category,
        summary: insight.whatItMeans,
        readingTime: insight.readTime,
      }))
    : [];

  return (
    <IndustryDetailSections
      slug={slug}
      title={industry?.title ?? fallback?.title ?? ""}
      summary={industry?.summary ?? fallback?.description ?? ""}
      description={industry?.description ?? fallback?.description ?? ""}
      challenge={industry?.challenge ?? fallback?.challenge ?? ""}
      regulatoryContext={industry?.regulatoryContext ?? fallback?.regulatoryContext ?? ""}
      relatedServices={relatedServices.length > 0 ? relatedServices : fallbackServices}
      relatedInsights={relatedInsights.length > 0 ? relatedInsights : fallbackInsights}
      heroImage={industry?.heroImage?.url}
    />
  );
}
