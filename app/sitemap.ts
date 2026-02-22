import type { MetadataRoute } from "next";
import { getAllServices } from "@/lib/sanity/services";
import { getAllInsights } from "@/lib/sanity/insights";
import { getPublishedPageBySlug } from "@/lib/sanity/pages";


const STATIC_ROUTES = [
  "/",
  "/services",
  "/insights",
  "/how-we-work",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/search",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(/\/$/, "");
  const lastModified = new Date().toISOString();

  // Dynamic service slugs
  const services = await getAllServices();
  const serviceRoutes = services
    .filter((s) => !!s.slug)
    .map((s) => ({
      url: `${baseUrl}/services/${s.slug}`,
      lastModified,
    }));

  // Dynamic insight slugs
  const insights = await getAllInsights();
  const insightRoutes = insights
    .filter((i) => !!i.slug)
    .map((i) => ({
      url: `${baseUrl}/insights/${i.slug}`,
      lastModified,
    }));

  // About page (CMS-driven)
  const aboutPage = await getPublishedPageBySlug("about");
  const aboutRoute = aboutPage
    ? [{ url: `${baseUrl}/about`, lastModified }]
    : [];

  // Static routes
  const staticRoutes = STATIC_ROUTES.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
  }));

  return [
    ...staticRoutes,
    ...aboutRoute,
    ...serviceRoutes,
    ...insightRoutes,
  ];
}
