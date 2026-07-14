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

/* Latest 3 insights — shown as uniform carousel slides on homepage */
const LATEST_INSIGHTS_QUERY = groq`*[_type == "insight" && (status == "published" || !defined(status))]
  | order(coalesce(publishedAt, _createdAt) desc)[0...3] {
    _id,
    title,
    "slug": coalesce(slug.current, slug),
    "dek": coalesce(excerpt, summary, pt::text(coalesce(body, content))),
    "category": coalesce(theme->title, category),
    "date": coalesce(publishedAt, _createdAt)
  }`;

export type HomepageInsight = {
  _id: string;
  title: string;
  slug: string;
  dek: string;
  category: string;
  date: string;
};

export default async function Home() {
  const insightsRaw = await sanityClient.fetch<HomepageInsight[]>(LATEST_INSIGHTS_QUERY);

  const insights = (insightsRaw ?? []).filter((i) => i.slug && i.title);

  return <HomepageClient insights={insights} />;
}
