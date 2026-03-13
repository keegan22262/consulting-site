import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityClient } from "@/lib/sanity/client";
import { getIndustryBySlugQuery } from "@/lib/sanity/queries";
import IndustryDetailSections from "@/src/sections/industry-detail/IndustryDetailSections";

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

  if (!industry?.title) {
    return {
      title: "Rill Singh Limited",
    };
  }

  const description =
    industry.summary ?? "Industry advisory delivered by Rill Singh Limited.";
  const image = industry.heroImage?.url ?? "/og-default.jpg";

  return {
    title: `${industry.title} Industry Advisory | Rill Singh Limited`,
    description,
    openGraph: {
      title: `${industry.title} Industry Advisory | Rill Singh Limited`,
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

  if (!industry?.title) {
    console.warn("No data found for industry", slug);
    notFound();
  }

  const relatedServices = (industry.relatedServices ?? [])
    .filter((item): item is RelatedService & { slug: string; title: string } => Boolean(item?.slug && item?.title))
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      description: item.description ?? "",
    }))
    .slice(0, 3);

  const relatedInsights = (industry.relatedInsights ?? [])
    .filter((item): item is RelatedInsight & { slug: string; title: string } => Boolean(item?.slug && item?.title))
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      category: item.category ?? "Insight",
    }))
    .slice(0, 3);

  return (
    <IndustryDetailSections
      slug={slug}
      title={industry.title ?? ""}
      summary={industry.summary ?? ""}
      description={industry.description ?? ""}
      challenge={industry.challenge ?? ""}
      regulatoryContext={industry.regulatoryContext ?? ""}
      relatedServices={relatedServices}
      relatedInsights={relatedInsights}
      heroImage={industry.heroImage?.url}
    />
  );
}
