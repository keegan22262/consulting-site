// GROQ queries only (no fetching logic).

/** Fetch all published services (for list pages). */
export const ALL_PUBLISHED_SERVICES_QUERY = `
*[_type == "service" && status == "published"]
| order(domain asc, title asc)
{
  "id": _id,
  title,
  "slug": slug.current,
  summary,
  body,
  domain,

  // Optional future fields (safe if absent in schema/documents)
  "relatedInsights": coalesce(
    (relatedInsights[]-> {
      title,
      "slug": slug.current,
      status
    })[status == "published"]{ title, slug },
    []
  ),
  "overviewSections": coalesce(overviewSections, [])
}
`;

/** Fetch a single published service by slug (for detail pages). */
export const PUBLISHED_SERVICE_BY_SLUG_QUERY = `
*[_type == "service" && status == "published" && slug.current == $slug][0]
{
  "id": _id,
  title,
  "slug": slug.current,
  summary,
  body,
  domain,

  // Optional future fields (safe if absent in schema/documents)
  "relatedInsights": coalesce(
    (relatedInsights[]-> {
      title,
      "slug": slug.current,
      status
    })[status == "published"]{ title, slug },
    []
  ),
  "overviewSections": coalesce(overviewSections, [])
}
`;

/** Fetch a single published service by slug, including optional future relationship fields. */
export const PUBLISHED_SERVICE_BY_SLUG_EXPANDED_QUERY = `
*[_type == "service" && status == "published" && slug.current == $slug][0]
{
  "id": _id,
  title,
  "slug": slug.current,
  summary,
  body,
  domain,

  // Optional future fields (safe if absent in schema/documents)
  "relatedInsights": coalesce(relatedInsights[]-> {
    title,
    "slug": slug.current,
    status
  }, []),

  "parentService": parentService-> {
    title,
    "slug": slug.current,
    summary,
    domain
  },

  "subServices": *[_type == "service" && status == "published" && parentService._ref == ^._id]
    | order(title asc)
    {
      title,
      "slug": slug.current,
      summary,
      domain
    },

  // Optional future fields (safe if absent in schema/documents)
  "overviewSections": coalesce(overviewSections, [])
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

/** Search published services by text (title + summary), with optional domain filter. */
export const SEARCH_PUBLISHED_SERVICES_QUERY = `
*[
  _type == "service" &&
  status == "published" &&
  $term != "" &&
  (
    title match ("*" + $term + "*") ||
    summary match ("*" + $term + "*")
  ) &&
  (!defined($domain) || domain == $domain)
]
| order(domain asc, title asc)
{
  title,
  "slug": slug.current,
  summary,
  body,
  domain,

  // Optional cross-links (safe if absent in schema/documents)
  "relatedInsights": coalesce(
    (relatedInsights[]-> {
      title,
      "slug": slug.current,
      status
    })[status == "published"]{ title, slug },
    []
  ),
  "overviewSections": coalesce(overviewSections, [])
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

/** Fetch distinct domains used by published services (for filters). */
export const PUBLISHED_SERVICE_DOMAINS_QUERY = `
array::unique(*[_type == "service" && status == "published" && defined(domain)].domain)
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
