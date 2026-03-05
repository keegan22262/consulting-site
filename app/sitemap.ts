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

  // Static routes (always safe)
  const staticRoutes = STATIC_ROUTES.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
  }));

  // Guard CMS calls — if Sanity env is missing, return static routes only
  const hasSanityEnv =
    !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "placeholder";

  if (!hasSanityEnv) {
    console.warn("[sitemap] Sanity env vars missing — returning static routes only");
    return staticRoutes;
  }

  let serviceRoutes: MetadataRoute.Sitemap = [];
  let insightRoutes: MetadataRoute.Sitemap = [];
  let aboutRoute: MetadataRoute.Sitemap = [];

  try {
    const services = await getAllServices();
    serviceRoutes = services
      .filter((s) => !!s.slug)
      .map((s) => ({
        url: `${baseUrl}/services/${s.slug}`,
        lastModified,
      }));
  } catch (e) {
    console.warn("[sitemap] Failed to fetch services:", e);
  }

  try {
    const insights = await getAllInsights();
    insightRoutes = insights
      .filter((i) => !!i.slug)
      .map((i) => ({
        url: `${baseUrl}/insights/${i.slug}`,
        lastModified,
      }));
  } catch (e) {
    console.warn("[sitemap] Failed to fetch insights:", e);
  }

  try {
    const aboutPage = await getPublishedPageBySlug("about");
    aboutRoute = aboutPage
      ? [{ url: `${baseUrl}/about`, lastModified }]
      : [];
  } catch (e) {
    console.warn("[sitemap] Failed to fetch about page:", e);
  }

  return [
    ...staticRoutes,
    ...aboutRoute,
    ...serviceRoutes,
    ...insightRoutes,
  ];
}
