import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicesDetailHeroSection from "@/components-v2/sections/ServicesDetailHeroSection";
import ServicesChallengeSection from "@/components-v2/sections/ServicesChallengeSection";
import ServicesDeliverablesSection from "@/components-v2/sections/ServicesDeliverablesSection";
import ServicesRelatedInsightsSection from "@/components-v2/sections/ServicesRelatedInsightsSection";
import ServicesRelatedIndustriesSection from "@/components-v2/sections/ServicesRelatedIndustriesSection";
import CTABlock from "@/components-v2/sections/CTABlock";
import { sanityClient } from "@/lib/sanity/client";
import { getServiceBySlugQuery } from "@/lib/sanity/queries";

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
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await sanityClient.fetch<ServiceResult | null>(getServiceBySlugQuery, { slug });

  if (!service?.title) {
    return {
      title: "Rill Singh Limited",
    };
  }

  const description =
    service.summary ?? "Strategic advisory service delivered by Rill Singh Limited.";
  const image = service.heroImage?.url ?? "/og-default.jpg";

  return {
    title: `${service.title} | Rill Singh Limited`,
    description,
    openGraph: {
      title: `${service.title} | Rill Singh Limited`,
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

  if (!service?.title) {
    console.warn("No data found for service", slug);
    notFound();
  }

  const focusAreas = Array.isArray(service.focusAreas)
    ? service.focusAreas.filter(Boolean).join(", ")
    : "";

  const deliverables = (service.deliverables ?? [])
    .filter((item): item is Deliverable & { title: string; body: string } => Boolean(item?.title && item?.body))
    .map((item) => ({
      overline: item.overline ?? "Deliverable",
      title: item.title,
      body: item.body,
    }));

  const relatedIndustries = (service.relatedIndustries ?? [])
    .filter((item): item is RelatedIndustry & { slug: string; title: string } => Boolean(item?.slug && item?.title))
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      description: item.description ?? "",
    }));

  const relatedInsights = (service.relatedInsights ?? [])
    .filter((item): item is RelatedInsight & { slug: string; title: string } => Boolean(item?.slug && item?.title))
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      category: item.category ?? "Insight",
    }));

  return (
    <>
      <ServicesDetailHeroSection
        number={String(service.order ?? 0).padStart(2, "0")}
        title={service.title}
        approach={service.approach ?? service.summary ?? ""}
      />

      <ServicesChallengeSection
        focusAreas={focusAreas || service.summary || ""}
        targetClients={service.targetClients ?? ""}
        approach={service.approach ?? service.summary ?? ""}
      />

      {deliverables.length > 0 ? (
        <ServicesDeliverablesSection deliverables={deliverables} />
      ) : (
        <div style={{ padding: "40px 0" }} />
      )}

      {relatedIndustries.length > 0 ? (
        <ServicesRelatedIndustriesSection industries={relatedIndustries} />
      ) : (
        <div style={{ padding: "40px 0" }} />
      )}

      {relatedInsights.length > 0 ? (
        <ServicesRelatedInsightsSection insights={relatedInsights} />
      ) : (
        <div style={{ padding: "40px 0" }} />
      )}

      <CTABlock
        title={service.title ?? "Talk to a partner"}
        description={service.summary ?? service.approach ?? "Let’s align on your priorities and delivery approach."}
        primaryLabel="Contact"
        primaryHref="/contact"
      />
    </>
  );
}
