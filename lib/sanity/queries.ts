// GROQ queries only (no fetching logic).

/** Fetch all published services (for list pages). */
export const ALL_PUBLISHED_SERVICES_QUERY = `
*[_type == "service" && status == "published"]
| order(domain asc, title asc)
{
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
      excerpt,
      publishDate,
      "themeTitle": theme->title,
      status
    })[status == "published"],
    []
  ),
  "overviewSections": coalesce(overviewSections, [])
}
`;

/** Fetch a single published service by slug (for detail pages). */
export const PUBLISHED_SERVICE_BY_SLUG_QUERY = `
*[_type == "service" && status == "published" && slug.current == $slug][0]
{
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
      excerpt,
      publishDate,
      "themeTitle": theme->title,
      status
    })[status == "published"],
    []
  ),
  "overviewSections": coalesce(overviewSections, [])
}
`;

/** Fetch a single published service by slug, including optional future relationship fields. */
export const PUBLISHED_SERVICE_BY_SLUG_EXPANDED_QUERY = `
*[_type == "service" && status == "published" && slug.current == $slug][0]
{
  title,
  "slug": slug.current,
  summary,
  body,
  domain,

  // Optional future fields (safe if absent in schema/documents)
  "relatedInsights": coalesce(relatedInsights[]-> {
    title,
    "slug": slug.current,
    excerpt,
    publishDate,
    "themeTitle": theme->title
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
  "themeTitle": theme->title
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
  "themeTitle": theme->title
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
      summary,
      domain,
      status
    })[status == "published"],
    []
  )
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
