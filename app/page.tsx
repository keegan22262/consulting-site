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
  alternates: {
    canonical: "/",
  },
};

const HOMEPAGE_INSIGHTS_QUERY = groq`*[_type == "insight" && featured == true && (status == "published" || !defined(status))]
  | order(date desc)[0...3] {
    _id,
    title,
    "slug": coalesce(slug.current, slug),
    summary,
    "excerpt": coalesce(excerpt, summary, pt::text(coalesce(body, content))),
    "category": coalesce(theme->title, category)
  }`;

type InsightQueryResult = {
  _id: string;
  title?: string;
  slug?: string;
  summary?: string;
  excerpt?: string;
  category?: string;
};

export default async function Home() {
  const insightsRaw = await sanityClient.fetch<InsightQueryResult[]>(HOMEPAGE_INSIGHTS_QUERY);

  const insights = (insightsRaw ?? [])
    .filter((item): item is InsightQueryResult & { slug: string; title: string; summary: string } =>
      Boolean(item.slug && item.title && item.summary)
    )
    .map((item) => ({
      slug: item.slug,
      category: item.category ?? "Insight",
      title: item.title,
      excerpt: item.excerpt ?? item.summary,
      summary: item.summary,
    }));

  return <HomepageClient insights={insights} />;
}
