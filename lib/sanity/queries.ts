import groq from "groq";

// Industries: fetch all industry documents for cards
export const industriesQuery = groq`
  *[_type == "industry" && (status == "published" || !defined(status))] | order(order asc) {
    _id,
    title,
    "slug": coalesce(slug.current, slug),
    summary,
    tags,
    order
  }
`;

export const getIndustryBySlugQuery = groq`
  *[_type == "industry" && (status == "published" || !defined(status)) && slug.current == $slug][0] {
    _id,
    title,
    "slug": coalesce(slug.current, slug),
    summary,
    description,
    challenge,
    regulatoryContext,
    "relatedServices": coalesce(capabilities[]-> {
      slug,
      title,
      "description": coalesce(summary, description)
    }, []),
    "relatedInsights": coalesce(relatedInsights[]-> {
      "slug": coalesce(slug.current, slug),
      title,
      "category": coalesce(theme->title, category),
      "summary": coalesce(summary, description),
      readingTime
    }, [])
  }
`;

// 1. All Services
export const getAllServicesQuery = groq`
  *[_type == "service" && (status == "published" || !defined(status))] | order(title asc) {
    _id,
    title,
    slug,
    summary,
    description,
    offerings,
    outcomes,
    category,
    engagementType,
    timeHorizon,
    operationalScope
  }
`;

// 2. Service by Slug
export const getServiceBySlugQuery = groq`
  *[_type == "service" && (status == "published" || !defined(status)) && slug == $slug][0] {
    _id,
    title,
    slug,
    summary,
    description,
    targetClients,
    focusAreas,
    approach,
    order,
    deliverables,
    "relatedIndustries": coalesce(relatedIndustries[]-> {
      "slug": coalesce(slug.current, slug),
      title,
      "description": coalesce(summary, description)
    }, []),
    "relatedInsights": *[_type == "insight" && references(^._id) && (status == "published" || !defined(status))]
      | order(coalesce(publishedAt, _createdAt) desc)[0...3] {
        "slug": coalesce(slug.current, slug),
        title,
        "category": coalesce(theme->title, category),
        "summary": coalesce(summary, description)
      },
    offerings,
    outcomes,
    category,
    engagementType,
    timeHorizon,
    operationalScope
  }
`;

// 3. All Insights
export const getAllInsightsQuery = groq`
  *[_type == "insight" && (status == "published" || !defined(status))] | order(coalesce(publishedAt, _createdAt) desc) {
    _id,
    title,
    "slug": coalesce(slug.current, slug),
    summary,
    "category": coalesce(theme->title, category),
    "publishedAt": coalesce(publishedAt, _createdAt),
    documentType,
    domain,
    readingTime,
    sourceUrl
  }
`;

// 4. Insight by Slug
export const getInsightBySlugQuery = groq`
  *[_type == "insight" && (status == "published" || !defined(status)) && slug.current == $slug][0] {
    _id,
    title,
    "slug": coalesce(slug.current, slug),
    summary,
    "category": coalesce(theme->title, category),
    "publishedAt": coalesce(publishedAt, _createdAt),
    "heroImage": heroImage{ "url": asset->url },
    readTime,
    summaryPoints,
    pullQuote,
    "dataHighlights": coalesce(dataHighlights[] { label, value }, []),
    "industryTags": coalesce(industryTags[]-> { "id": coalesce(slug.current, slug), "label": title }, []),
    "serviceTags": coalesce(serviceTags[]-> { "slug": slug, "label": title }, []),
    content,
    body,
    "relatedInsights": coalesce(relatedSlugs[]-> {
      "slug": coalesce(slug.current, slug),
      title,
      "category": coalesce(theme->title, category)
    }, []),
    "relatedServices": coalesce(relatedServices[]-> {
      slug,
      title,
      "summary": coalesce(summary, description)
    }, []),
    documentType,
    domain,
    readingTime,
    sourceUrl
  }
`;

/** Fetch a single published static page by slug. */
export const PUBLISHED_PAGE_BY_SLUG_QUERY = `
*[_type == "page" && status == "published" && (slug == $slug || slug.current == $slug)][0]
{
  title,
  "body": coalesce(body, content)
}
`;

/** Fetch a single published static page by slug (title + body only). */
export const PUBLISHED_PAGE_TITLE_BODY_BY_SLUG_QUERY = `
*[_type == "page" && status == "published" && (slug.current == $slug || slug == $slug)][0]
{
  title,
  body
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
  (status == "published" || !defined(status)) &&
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
  (status == "published" || !defined(status)) &&
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
  slug,
  category,
  summary
}
`;

/** Search published insights by text (title + excerpt), with optional theme filter. */
export const SEARCH_PUBLISHED_INSIGHTS_QUERY = `
*[
  _type == "insight" &&
  (status == "published" || !defined(status)) &&
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

/** Back-compat: all services used by lib/sanity/services.ts */
export const ALL_PUBLISHED_SERVICES_QUERY = `
*[_type == "service" && (status == "published" || !defined(status))]
| order(coalesce(order, 999) asc, title asc)
{
  "id": _id,
  title,
  slug,
  summary,
  category,
  targetClients,
  focusAreas,
  approach,
  order
}
`;

/** Back-compat: service detail by slug used by lib/sanity/services.ts */
export const PUBLISHED_SERVICE_BY_SLUG_EXPANDED_QUERY = `
*[
  _type == "service" &&
  (status == "published" || !defined(status)) &&
  slug == $slug
][0]
{
  "id": _id,
  title,
  slug,
  summary,
  category,
  targetClients,
  focusAreas,
  approach,
  order
}
`;

/** Back-compat: all insights used by lib/sanity/insights.ts */
export const ALL_PUBLISHED_INSIGHTS_QUERY = `
*[_type == "insight" && (status == "published" || !defined(status))]
| order(coalesce(publishedAt, _createdAt) desc)
{
  title,
  "slug": coalesce(slug.current, slug),
  "excerpt": summary,
  "publishDate": coalesce(publishedAt, _createdAt),
  "themeTitle": coalesce(theme->title, category)
}
`;

/** Back-compat: latest insights with configurable limit. */
export const LATEST_PUBLISHED_INSIGHTS_QUERY = `
*[_type == "insight" && (status == "published" || !defined(status))]
| order(coalesce(publishedAt, _createdAt) desc)
[0...$limit]
{
  title,
  "slug": coalesce(slug.current, slug),
  "excerpt": summary,
  "publishDate": coalesce(publishedAt, _createdAt),
  "themeTitle": coalesce(theme->title, category)
}
`;

/** Back-compat: expanded insight by slug used by lib/sanity/insights.ts */
export const PUBLISHED_INSIGHT_BY_SLUG_EXPANDED_QUERY = `
*[
  _type == "insight" &&
  (status == "published" || !defined(status)) &&
  slug.current == $slug
][0]
{
  title,
  "slug": coalesce(slug.current, slug),
  body,
  "excerpt": summary,
  "publishDate": coalesce(publishedAt, _createdAt),
  "themeTitle": coalesce(theme->title, category),
  "relatedServices": coalesce(relatedServices, serviceTags)[]-> {
    title,
      slug,
    summary,
    "domain": category,
      status
  }
}
`;

/** Fetch distinct categories used by published services (for filters). */
export const PUBLISHED_SERVICE_CATEGORIES_QUERY = `
array::unique(*[_type == "service" && (status == "published" || !defined(status)) && defined(category)].category)
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
