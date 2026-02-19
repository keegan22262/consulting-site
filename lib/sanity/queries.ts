// GROQ queries only (no fetching logic).

/** Fetch all published services (for list pages). */
export const ALL_PUBLISHED_SERVICES_QUERY = `
*[_type == "service" && status == "published"]
| order(coalesce(order, 999) asc, title asc)
{
  "id": _id,
  title,
  "slug": slug.current,
  category,
  summary,
  targetClients,
  "focusAreas": coalesce(focusAreas, []),
  approach,
  order
}
`;

/** Fetch a single published service by slug (for detail pages). */
export const PUBLISHED_SERVICE_BY_SLUG_QUERY = `
*[_type == "service" && status == "published" && slug.current == $slug][0]
{
  "id": _id,
  title,
  "slug": slug.current,
  category,
  summary,
  targetClients,
  "focusAreas": coalesce(focusAreas, []),
  approach,
  order
}
`;

/** Fetch a single published service by slug (full detail). */
export const PUBLISHED_SERVICE_BY_SLUG_EXPANDED_QUERY = `
*[_type == "service" && status == "published" && slug.current == $slug][0]
{
  "id": _id,
  title,
  "slug": slug.current,
  category,
  summary,
  targetClients,
  "focusAreas": coalesce(focusAreas, []),
  approach,
  order
}
`;

/** Fetch all published insights, newest first (for list pages). */
export const ALL_PUBLISHED_INSIGHTS_QUERY = `
*[_type == "insight" && status == "published"]
| order(publishDate desc)
{
  title,
  "slug": slug.current,
  excerpt,
  body,
  publishDate,
  "themeTitle": theme->title,

  // Optional cross-links (safe if absent in schema/documents)
  "relatedServices": coalesce(
    (relatedServices[]-> {
      title,
      "slug": slug.current,
      status
    })[status == "published"]{ title, slug },
    []
  )
}
`;

/** Fetch the latest N published insights (for home/teasers). */
export const LATEST_PUBLISHED_INSIGHTS_QUERY = `
*[_type == "insight" && status == "published"]
| order(publishDate desc)
[0...$limit]
{
  title,
  "slug": slug.current,
  excerpt,
  publishDate,
  "themeTitle": theme->title,

  // Optional cross-links (safe if absent in schema/documents)
  "relatedServices": coalesce(
    (relatedServices[]-> {
      title,
      "slug": slug.current,
      status
    })[status == "published"]{ title, slug },
    []
  )
}
`;

/** Fetch a single published insight by slug, including optional related services. */
export const PUBLISHED_INSIGHT_BY_SLUG_EXPANDED_QUERY = `
*[_type == "insight" && status == "published" && slug.current == $slug][0]
{
  title,
  "slug": slug.current,
  excerpt,
  body,
  publishDate,
  "themeTitle": theme->title,

  "relatedServices": coalesce(
    (relatedServices[]-> {
      title,
      "slug": slug.current,
      status
    })[status == "published"]{ title, slug },
    []
  )
}
`;

/** Fetch a single published static page by slug. */
export const PUBLISHED_PAGE_BY_SLUG_QUERY = `
*[_type == "page" && (slug == $slug || slug.current == $slug)][0]
{
  title,
  "body": coalesce(body, content)
}
`;

/** Fetch a single published static page by slug (title + body only). */
export const PUBLISHED_PAGE_TITLE_BODY_BY_SLUG_QUERY = `
*[_type == "page" && (slug.current == $slug || slug == $slug)][0]
{
  title,
  body
}
`;

/** Fetch published homepage configuration fields from the Page document with slug "home". */
export const PUBLISHED_HOME_PAGE_QUERY = `
*[_type == "page" && (slug.current == "home" || slug == "home")][0]
{
  title,
  heroTitle,
  heroSubtitle,
  servicesIntro,
  insightsIntro,
  ctaText,
  companyDescription,
  operatingApproach,
  problems,
  differentiation,
  capabilitiesIntro,
  capabilityClusters,
  audiences,
  workingProcess,
  heroCTA {
    label,
    href
  },
  "sectionIntros": coalesce(sectionIntros, []) {
    sectionId,
    title,
    intro,
    linkLabel,
    linkHref
  }
}
`;

/** Fetch Site Settings social link URLs. */
export const SITE_SETTINGS_SOCIAL_LINKS_QUERY = `
*[_type == "siteSettings"][0]
{
  linkedinUrl,
  twitterUrl,
  youtubeUrl,
  instagramUrl
}
`;

/** Unified search across pages, services, and insights. */
export const UNIFIED_SEARCH_QUERY = `
*[
  $term != "" &&
  _type in ["page", "service", "insight"] &&
  (
    _type == "page" ||
    status == "published"
  ) &&
  (
    title match ("*" + $term + "*") ||
    summary match ("*" + $term + "*") ||
    excerpt match ("*" + $term + "*") ||
    pt::text(coalesce(body, content)) match ("*" + $term + "*")
  )
]
| order(_updatedAt desc)
[0...$limit]
{
  "type": _type,
  title,
  "slug": coalesce(slug.current, slug),
  "excerpt": coalesce(
    excerpt,
    summary,
    pt::text(coalesce(body, content))
  )
}
`;

/** Search published services by text (title + summary), with optional category filter. */
export const SEARCH_PUBLISHED_SERVICES_QUERY = `
*[
  _type == "service" &&
  status == "published" &&
  $term != "" &&
  (
    title match ("*" + $term + "*") ||
    summary match ("*" + $term + "*")
  ) &&
  (!defined($category) || category == $category)
]
| order(coalesce(order, 999) asc, title asc)
{
  title,
  "slug": slug.current,
  category,
  summary
}
`;

/** Search published insights by text (title + excerpt), with optional theme filter. */
export const SEARCH_PUBLISHED_INSIGHTS_QUERY = `
*[
  _type == "insight" &&
  status == "published" &&
  $term != "" &&
  (
    title match ("*" + $term + "*") ||
    excerpt match ("*" + $term + "*")
  ) &&
  (
    !defined($theme) ||
    theme->title == $theme ||
    theme->slug.current == $theme ||
    theme._ref == $theme
  )
]
| order(publishDate desc)
{
  title,
  "slug": slug.current,
  excerpt,
  publishDate,
  "themeTitle": theme->title,

  // Optional cross-links (safe if absent in schema/documents)
  "relatedServices": coalesce(
    (relatedServices[]-> {
      title,
      "slug": slug.current,
      status
    })[status == "published"]{ title, slug },
    []
  )
}
`;

/** Fetch distinct categories used by published services (for filters). */
export const PUBLISHED_SERVICE_CATEGORIES_QUERY = `
array::unique(*[_type == "service" && status == "published" && defined(category)].category)
`;

/** Fetch published insight themes (for filters). */
export const PUBLISHED_INSIGHT_THEMES_QUERY = `
*[_type == "insightTheme" && status == "published"]
| order(title asc)
{
  title,
  "slug": slug.current
}
`;
