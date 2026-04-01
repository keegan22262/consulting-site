import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityClient } from "@/lib/sanity/client";
import { getServiceBySlugQuery } from "@/lib/sanity/queries";
import ServiceDetailSections from "@/src/sections/service-detail/ServiceDetailSections";
import { CAPABILITIES } from "@/src/sections/service-detail/capabilities";

export const dynamic = "force-dynamic";
export const revalidate = 60;

type Deliverable = {
  overline?: string;
  title?: string;
  body?: string;
};

type RelatedIndustry = {
  slug?: string;
  title?: string;
  description?: string;
};

type RelatedInsight = {
  slug?: string;
  title?: string;
  category?: string;
  summary?: string;
};

type ServiceResult = {
  slug?: string;
  title?: string;
  summary?: string;
  approach?: string;
  targetClients?: string;
  focusAreas?: string[];
  order?: number;
  deliverables?: Deliverable[];
  relatedIndustries?: RelatedIndustry[];
  relatedInsights?: RelatedInsight[];
  heroImage?: { url?: string };
  finalCtaImage?: { url?: string };
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await sanityClient.fetch<ServiceResult | null>(getServiceBySlugQuery, { slug });
  const fallback = CAPABILITIES[slug];

  if (!service?.title && !fallback?.title) {
    return {
      title: "Rill Singh Limited",
    };
  }

  const description =
    service?.summary ?? fallback?.approach ?? "Strategic advisory service delivered by Rill Singh Limited.";
  const image = service?.heroImage?.url ?? "/og-default.jpg";
  const title = service?.title ?? fallback?.title ?? "Rill Singh Limited";

  return {
    title: `${title} | Rill Singh Limited`,
    description,
    openGraph: {
      title: `${title} | Rill Singh Limited`,
      description,
      url: `https://rillsingh.com/services/${slug}`,
      type: "article",
      images: [image],
    },
    alternates: {
      canonical: `https://rillsingh.com/services/${slug}`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await sanityClient.fetch<ServiceResult | null>(getServiceBySlugQuery, {
    slug,
  });
  const fallback = CAPABILITIES[slug];

  if (!service?.title && !fallback?.title) {
    notFound();
  }

  const focusAreas = Array.isArray(service?.focusAreas)
    ? service.focusAreas.filter(Boolean).join(", ")
    : fallback?.focusAreas ?? "";

  const deliverables = (service?.deliverables ?? [])
    .filter((item): item is Deliverable & { title: string; body: string } => Boolean(item?.title && item?.body))
    .map((item) => ({
      overline: item.overline ?? "Deliverable",
      title: item.title,
      body: item.body,
    }));

  const relatedIndustries = (service?.relatedIndustries ?? [])
    .filter((item): item is RelatedIndustry & { slug: string; title: string } => Boolean(item?.slug && item?.title))
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      description: item.description ?? "",
    }));

  const relatedInsights = (service?.relatedInsights ?? [])
    .filter((item): item is RelatedInsight & { slug: string; title: string } => Boolean(item?.slug && item?.title))
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      category: item.category ?? "Insight",
      summary: item.summary ?? "",
    }));

  return (
    <ServiceDetailSections
      slug={slug}
      number={service?.order ? String(service.order).padStart(2, "0") : fallback?.number ?? ""}
      title={service?.title ?? fallback?.title ?? ""}
      summary={service?.summary ?? ""}
      approach={service?.approach ?? fallback?.approach ?? ""}
      targetClients={service?.targetClients ?? fallback?.targetClients ?? ""}
      focusAreas={focusAreas}
      deliverables={deliverables.length > 0 ? deliverables : []}
      relatedIndustries={relatedIndustries.length > 0 ? relatedIndustries : []}
      relatedInsights={relatedInsights.length > 0 ? relatedInsights : []}
      heroImage={service?.heroImage?.url}
      finalCtaImage={service?.finalCtaImage?.url}
    />
  );
}
