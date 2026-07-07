import type { Metadata } from "next";
import groq from "groq";
import HomepageClient from "./HomepageClient";
import { sanityClient } from "@/lib/sanity/client";

export const dynamic = "force-dynamic";
export const revalidate = 120;

export const metadata: Metadata = {
  title: "Institutional Advisory Built for Growth, Transformation, and Execution",
  description:
    "Rill Singh Limited advises growth-stage companies, public institutions, and sovereign entities across Africa on strategy, capital, digital transformation, and governance.",
  alternates: { canonical: "/" },
};

/* Featured insight — shown full-width on homepage */
const FEATURED_INSIGHT_QUERY = groq`*[_type == "insight" && featured == true && (status == "published" || !defined(status))]
  | order(date desc)[0...1] {
    _id,
    title,
    "slug": coalesce(slug.current, slug),
    "excerpt": coalesce(excerpt, summary, pt::text(coalesce(body, content))),
    "category": coalesce(theme->title, category),
    "imageUrl": coalesce(mainImage.asset->url, heroImage.asset->url)
  }[0]`;

/* Two supporting insights — text links below the featured one */
const SUPPORTING_INSIGHTS_QUERY = groq`*[_type == "insight" && (status == "published" || !defined(status))]
  | order(date desc)[0...3] {
    _id,
    title,
    "slug": coalesce(slug.current, slug),
    "category": coalesce(theme->title, category)
  }`;

type FeaturedInsight = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  imageUrl?: string;
};

type SupportingInsight = {
  _id: string;
  title: string;
  slug: string;
  category: string;
};

export default async function Home() {
  const [featuredRaw, supportingRaw] = await Promise.all([
    sanityClient.fetch<FeaturedInsight | null>(FEATURED_INSIGHT_QUERY),
    sanityClient.fetch<SupportingInsight[]>(SUPPORTING_INSIGHTS_QUERY),
  ]);

  const featured: FeaturedInsight | null =
    featuredRaw?.slug && featuredRaw?.title ? featuredRaw : null;

  /* Supporting = next 2 insights that are NOT the featured one */
  const supporting = (supportingRaw ?? [])
    .filter((i) => i.slug && i.title && i.slug !== featured?.slug)
    .slice(0, 2);

  return <HomepageClient featured={featured} supporting={supporting} />;
}
