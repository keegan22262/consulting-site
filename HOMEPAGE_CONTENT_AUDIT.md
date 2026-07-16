# Homepage Content Architecture Audit

Read-only inventory of every visible content item on `/`, tracing origin → Sanity-editability → query → transform → component → render location. No files were changed to produce this document. Builds on `HOMEPAGE_AUDIT.md` and `COMPONENT_DEPENDENCY_GRAPH.md`.

## Headline finding

**A fully-built Sanity `page` schema (`sanity/schemaTypes/page.ts`) has a dedicated `homepage` fieldset — `heroTitle`, `heroSubtitle`, `problems` (title/description pairs), `differentiation` (label/explanation pairs), `servicesIntro`, `capabilitiesIntro`, `capabilityClusters`, `insightsIntro`, `ctaText`, `industries` (references, "Select industries to feature on the homepage") — that maps almost one-to-one onto the current hardcoded Hero, Differentiators, Service Clusters, Industries, and CTA Band sections. The live homepage query (`app/page.tsx`) never queries the `page` document type at all.** This schema is either a not-yet-wired-up content model, or a superseded one — either way, none of it reaches the rendered page today. See the "Dormant Schema Mapping" table (§3) for the full field-by-field correspondence.

Three other schemas exist that could theoretically back homepage content but don't: `service` (`sanity/schemaTypes/service.ts`), `industry` (`sanity/schemaTypes/industry.ts`), and the `siteSettings` singleton (`sanity/schemaTypes/siteSettings.ts`, which has `linkedinUrl`/`twitterUrl`/`youtubeUrl`/`instagramUrl` fields — the footer's LinkedIn URL is hardcoded despite `linkedinUrl` existing as an editable field).

Of the entire homepage, **exactly one content stream is genuinely Sanity-driven at runtime: the Insights carousel**, via the `insight` document type.

---

## 1. Complete CMS Content Flow (the one real path)

This is the only section where content flows CMS → query → transform → component → UI. Every other item on the page terminates at "hardcoded" or "static TS data module" — see §2.

```
Sanity Studio (content editors)
  │  create/edit `insight` documents (sanity/schemaTypes/insight.ts)
  ▼
Sanity Content Lake (dataset: "production", project via NEXT_PUBLIC_SANITY_PROJECT_ID)
  │
  ▼
sanityClient  (lib/sanity/client.ts)
  │  createClient({ projectId, dataset, apiVersion, useCdn: false })
  ▼
LATEST_INSIGHTS_QUERY  (app/page.tsx:17-25, GROQ, via `groq` tagged template)
  │  *[_type == "insight" && (status == "published" || !defined(status))]
  │    | order(coalesce(publishedAt, _createdAt) desc)[0...3] {
  │      _id,
  │      title,
  │      "slug": coalesce(slug.current, slug),
  │      "dek": coalesce(excerpt, summary, pt::text(coalesce(body, content))),
  │      "category": coalesce(theme->title, category),
  │      "date": coalesce(publishedAt, _createdAt)
  │    }
  ▼
Home()  (app/page.tsx:36-42, async Server Component — the fetch function)
  │  const insightsRaw = await sanityClient.fetch<HomepageInsight[]>(LATEST_INSIGHTS_QUERY);
  │  const insights = (insightsRaw ?? []).filter((i) => i.slug && i.title);   ← data transformation
  ▼
<HomepageClient insights={insights} />   (app/page.tsx:41 — prop pass)
  ▼
HomepageClient  (app/HomepageClient.tsx:53, Client Component)
  │  {insights.length > 0 && <InsightsSection insights={insights} />}   (line 61 — conditional render)
  ▼
InsightsSection  (app/HomepageClient.tsx:475-568)
  │  insights.map((insight, i) => ...)
  │  new Date(insight.date).toLocaleDateString("en-US", {...})   ← final transform (date formatting)
  ▼
Rendered UI: carousel slide — category label, title, dek, formatted date
  (app/HomepageClient.tsx:505-514)
```

**Important caveat on `category`:** the query's `theme->title` half assumes an `insight.theme` reference field pointing at `insightTheme`. `insight.ts`'s actual field list has no `theme` field (only a plain `category` string) — so `theme->title` always resolves to null, and every insight's category comes from the plain `category` string field in practice. Functionally works today (via `coalesce`), but is dead/unfinished query logic.

**What the schema offers but the query doesn't take:** `insight.heroImage` (image field with hotspot, `insight.ts:71`) is never selected — the carousel renders no image. `insight.summaryPoints`, `insight.dataHighlights`, `insight.pullQuote`, `insight.sections`, `insight.relatedServices`, `insight.industryTags`, `insight.serviceTags`, `insight.relatedSlugs`, `insight.readTime` all exist on the schema and are presumably used on the full `/insights/[slug]` article page, but none reach the homepage.

---

## 2. Per-Item Content Inventory

Legend for **Editable in Sanity?**: **No** = hardcoded/static, not editable without a code change. **Yes** = live CMS field, editable by a content editor today. **Dormant** = a matching Sanity field exists but the homepage doesn't query it.

### Header (`components-v2/layout/SiteHeader.tsx`)

| Content item | Origin | Editable in Sanity? | Schema/Field | Component | Rendered location |
|---|---|---|---|---|---|
| Logo image (2 variants, swapped on scroll) | `/images/logo/Lockup_Horizontal_White.png`, `Lockup_Horizontal_Navy.png` — static assets | No | — | `SiteHeader` | `SiteHeader.tsx:104-115` |
| Nav labels "Services", "Industries", "Insights", "About" | `NAV_LINKS` const | No | — | `SiteHeader` | `SiteHeader.tsx:9` (const), `:131-147` (render) |
| Nav hrefs (`/services`, `/industries`, `/insights`, `/about`) | `NAV_HREFS` const | No | — | `SiteHeader` | `SiteHeader.tsx:11-16` |
| CTA button "Schedule an Introduction" → `/contact` | `dynamicLabel`/`dynamicTo` consts | No | — | `SiteHeader` | `SiteHeader.tsx:80-81` (const), `:149-158` (render) |
| Hamburger icon (SVG) | Inline `<svg>` | No | — | `MenuIcon` | `SiteHeader.tsx:293-301` |
| Mobile drawer "Menu" label | Hardcoded string | No | — | `MobileDrawer` | `SiteHeader.tsx:251-253` |
| Mobile drawer nav links (duplicate of desktop) | `NAV_LINKS` const | No | — | `MobileDrawer` | `SiteHeader.tsx:261-276` |
| Mobile drawer CTA "Schedule an Introduction" (duplicate) | Hardcoded string, href `/contact` | No | — | `MobileDrawer` | `SiteHeader.tsx:280-286` |
| Close icon (SVG) | Inline `<svg>` | No | — | `CloseIcon` | `SiteHeader.tsx:303-310` |

### Hero (`app/HomepageClient.tsx:70-117`)

| Content item | Origin | Editable in Sanity? | Schema/Field | Component | Rendered location |
|---|---|---|---|---|---|
| Eyebrow "Pan-African institutional advisory" | Hardcoded string | **Dormant** — `page.heroTitle`-adjacent fieldset exists but this exact eyebrow has no direct field match | `HeroSection` | `HomepageClient.tsx:76` |
| H1 "Institutional advisory, built for African markets." | Hardcoded string | **Dormant** — `page.heroTitle` (string, `page.ts:52-56`) | `HeroSection` | `HomepageClient.tsx:79` |
| Diamond motif (decorative) | `DiamondMotif` component, pure CSS | No | — | `DiamondMotif` | `HomepageClient.tsx:86` |
| Body copy "We advise governments, investors, and enterprises across ten disciplines and eleven sectors..." | Hardcoded string | **Dormant** — `page.heroSubtitle` (text, `page.ts:57-63`) | `HeroSection` | `HomepageClient.tsx:88-91` |
| CTA button "Start a conversation" → `/contact` | Hardcoded string/href | **Dormant** — `page.ctaText` (string, `page.ts:78-83`) is a plausible but unconfirmed match | `HeroSection` | `HomepageClient.tsx:93-98` |
| Secondary link "Explore our services →" → `/services` | Hardcoded string/href | No | — | `HeroSection` | `HomepageClient.tsx:99-104` |
| Stat line "10 disciplines · 11 sectors · Nairobi" | Hardcoded string | No — **not derived from `SERVICES.length`/`INDUSTRIES.length`** even though those arrays happen to total 10 and 11 today; a data change wouldn't auto-update this string | — | `HomepageClient.tsx:111-113` |

### Differentiators (`app/HomepageClient.tsx:122-205`)

| Content item | Origin | Editable in Sanity? | Schema/Field | Component | Rendered location |
|---|---|---|---|---|---|
| Eyebrow "Why Rill Singh" | Hardcoded string | No | — | `DifferentiatorsSection` | `HomepageClient.tsx:131` |
| H2 "Built to advise. Structured to deliver." | Hardcoded string | **Dormant** — no dedicated field, but conceptually adjacent to `page.companyDescription` (portable text, `page.ts:84-90`) | `DifferentiatorsSection` | `HomepageClient.tsx:132-134` |
| Body "We bring institutional-grade rigor..." | Hardcoded string | **Dormant** — `page.companyDescription` or `page.operatingApproach` (both portable text arrays, `page.ts:84-97`) | `DifferentiatorsSection` | `HomepageClient.tsx:135-139` |
| CTA "Start a conversation →" → `/contact` | Hardcoded string/href | No | — | `DifferentiatorsSection` | `HomepageClient.tsx:141-146` |
| Decorative navy card + animated `DiamondMotif` | Component, no text content | No | — | `DiamondMotif` | `HomepageClient.tsx:151-187` |
| Play/pause toggle button (icon-only, `aria-label` dynamic) | Hardcoded SVG-free CSS bars/triangle | No | — | `DifferentiatorsSection` | `HomepageClient.tsx:172-186` |
| "Institutional rigor" card (title + body) | `DIFFERENTIATORS` const, item 1 | **Dormant** — `page.differentiation[]` (`{ label, explanation }` object array, `page.ts:124-149`) is a near-exact structural match for `DIFFERENTIATORS`'s `{ title, body }` shape | `DifferentiatorsSection` | const: `HomepageClient.tsx:36-39`; render: `:193-200` |
| "Ground truth" card (title + body) | `DIFFERENTIATORS` const, item 2 | **Dormant** — same as above | `DifferentiatorsSection` | const: `:40-43`; render: `:193-200` |
| "Execution focus" card (title + body) | `DIFFERENTIATORS` const, item 3 | **Dormant** — same as above | `DifferentiatorsSection` | const: `:44-47`; render: `:193-200` |

### Service Clusters (`app/HomepageClient.tsx:210-369`)

| Content item | Origin | Editable in Sanity? | Schema/Field | Component | Rendered location |
|---|---|---|---|---|---|
| Eyebrow "Services" | Hardcoded string | No | — | `ServiceClustersSection` | `HomepageClient.tsx:222` |
| H2 "Ten disciplines. Four ways in." | Hardcoded string | **Dormant** — `page.capabilitiesIntro` (string, `page.ts:174-178`) plausible match | `ServiceClustersSection` | `HomepageClient.tsx:223-225` |
| Cluster 01 "Strategy & transformation" — label | `CLUSTERS[0]` (`src/sections/services/data.ts:20`) | **Dormant** — `page.capabilityClusters[]` (plain string array, `page.ts:179-185`) exists but is a flat string list, not a structured object — would need a schema change to fully replace `Cluster { id, label }` | `ClusterCardBig` | `src/sections/services/data.ts:20`; render `HomepageClient.tsx:229,310-312` |
| Cluster 01 one-liner | `CLUSTER_ONE_LINERS["strategy-transformation"]` — homepage-only const, explicitly commented *"doesn't belong in the CMS fallback data"* | No | — | `ClusterCardBig` | const: `HomepageClient.tsx:16`; render: `:313` |
| Cluster 01's top-3 service links (Strategy, Digital, People) | `SERVICES` filtered by `cluster === "strategy-transformation"`, sliced to 3 (`cardCopy()`, `HomepageClient.tsx:211-214`) | **Dormant** — `service` document type exists (`sanity/schemaTypes/service.ts`) with matching `title`/`slug`/`category`/`focusAreas`/`approach` fields, but its `category` values (`digital-ai`, `financial-risk-tax`, `people-esg-public` per `service.ts:88-91` preview labels) **don't match** the 4 cluster IDs in `src/sections/services/data.ts` (`strategy-transformation`, `finance-risk-regulation`, `sustainability-public`, `growth-communications`) — the two taxonomies have diverged | `ServiceLinks` | `src/sections/services/data.ts:26-113`; render via `ServiceLinks`, `HomepageClient.tsx:269-285` |
| Cluster 02/03 "Finance, risk & regulation" / "Sustainability & public impact" (label, one-liner, 3 links each) | Same pattern as Cluster 01 | Same as above | Same as above | `ClusterCardSmall` ×2 | `HomepageClient.tsx:231-232, 329-369` |
| Cluster 04 "Growth & communications" (label, one-liner, links) | Same pattern, rendered inline (not via `ClusterCardBig`/`Small`) | Same as above | Same as above | `ServiceClustersSection` (inline block) | `HomepageClient.tsx:236-254` |
| Bottom link "Explore all ten disciplines →" → `/services` | Hardcoded string/href | No | — | `ServiceClustersSection` | `HomepageClient.tsx:256-263` |
| Per-card "Explore →" CTAs → `/services` (×4) | Hardcoded string/href, repeated 4× | No | — | `ClusterCardBig`, `ClusterCardSmall` ×2, inline cluster 4 | `HomepageClient.tsx:246-253, 316-323, 358-365` |
| `DiamondMotif` × 4 (one per cluster card) | Component, decorative | No | — | `DiamondMotif` | `HomepageClient.tsx:229,231,232,237` |

### Point of View (`app/HomepageClient.tsx:374-392`)

| Content item | Origin | Editable in Sanity? | Schema/Field | Component | Rendered location |
|---|---|---|---|---|---|
| Quote "Africa's next decade belongs to institutions that can execute." | Hardcoded string | No | — | `PointOfViewSection` | `HomepageClient.tsx:379` |
| Link "Our point of view, and the work behind it →" → `/about` | Hardcoded string/href | No | — | `PointOfViewSection` | `HomepageClient.tsx:382-387` |

### Industries (`app/HomepageClient.tsx:397-470`)

| Content item | Origin | Editable in Sanity? | Schema/Field | Component | Rendered location |
|---|---|---|---|---|---|
| Eyebrow "Industries" | Hardcoded string | No | — | `IndustriesSection` | `HomepageClient.tsx:410` |
| H2 "Sector depth across the real economy." | Hardcoded string | No | — | `IndustriesSection` | `HomepageClient.tsx:411-413` |
| Section-level `DiamondMotif` | Component, decorative | No | — | `DiamondMotif` | `HomepageClient.tsx:407` |
| Which 4 of 11 industries appear (`financial-services` featured; `public-sector-government`, `energy-resources`, `industrials-manufacturing` supporting) | `FEATURED_INDUSTRY_ID`/`SUPPORTING_INDUSTRY_IDS` consts | **Dormant** — `page.industries[]` (array of references to `industry` documents, explicitly described as *"Select industries to feature on the homepage"*, `page.ts:193-200`) is a purpose-built, unused replacement for exactly this hardcoded selection | `IndustriesSection` | consts: `HomepageClient.tsx:50-51`; selection logic: `:398-401` |
| Featured card label "Featured sector" | Hardcoded string | No | — | `IndustriesSection` | `HomepageClient.tsx:420` |
| Featured card title (`featured.title`) | `INDUSTRIES` const → `financial-services.title` = "Financial Services" | **Dormant** — `industry.title` (string, `industry.ts:8`) | `IndustriesSection` | data: `src/sections/industries/data.ts:88`; render: `HomepageClient.tsx:421-423` |
| Featured card description (`featured.description`) | `INDUSTRIES` const → `financial-services.description` | **Dormant** — closest schema match is `industry.summary`/`industry.description` (both `text`, `industry.ts:36-37`) — schema actually has *two* description-shaped fields, neither wired up | `IndustriesSection` | data: `data.ts:89-91`; render: `HomepageClient.tsx:424` |
| Featured card CTA "Explore sector →" → `/industries/financial-services` | Hardcoded string, href built from `featured.id` | No | — | `IndustriesSection` | `HomepageClient.tsx:425-430` |
| "Sector" label (×3 supporting cards) | Hardcoded string | No | — | `IndustriesSection` | `HomepageClient.tsx:441` |
| Supporting card titles/descriptions (×3: Public Sector & Government, Energy & Natural Resources, Industrials & Manufacturing) | `INDUSTRIES` const, same fields as featured | **Dormant** — same `industry.title`/`summary`/`description` mapping | `IndustriesSection` | data: `data.ts:104-270` (respective entries); render: `HomepageClient.tsx:442-447` |
| Supporting card CTAs "Explore sector →" (×3) | Hardcoded string, href built from `industry.id` | No | — | `IndustriesSection` | `HomepageClient.tsx:448-453` |
| `DiamondMotif` × 4 (one per card) | Component, decorative | No | — | `DiamondMotif` | `HomepageClient.tsx:418,439` |
| Bottom link "See all 11 sectors →" → `/industries` | Hardcoded string | No — also not derived from `INDUSTRIES.length` (currently 11, matches by coincidence) | — | `IndustriesSection` | `HomepageClient.tsx:459-465` |

### Insights (`app/HomepageClient.tsx:475-568`) — the one live CMS section

| Content item | Origin | Editable in Sanity? | Schema/Field | GROQ | Fetch fn | Component | Rendered location |
|---|---|---|---|---|---|---|---|
| Eyebrow "Insights" | Hardcoded string | No | — | — | — | `InsightsSection` | `HomepageClient.tsx:484` |
| H2 "Latest thinking." | Hardcoded string | No | — | — | — | `InsightsSection` | `HomepageClient.tsx:485-487` |
| Per-slide category label | `insight.category` (with dead `theme->title` fallback attempt — see §1 caveat) | **Yes** | `insight.category` (string, `insight.ts:32`) | `LATEST_INSIGHTS_QUERY`, `app/page.tsx:17-25` | `sanityClient.fetch()` in `Home()`, `app/page.tsx:37` | `InsightsSection` | `HomepageClient.tsx:505-507` |
| Per-slide title | `insight.title` | **Yes** | `insight.title` (string, required, `insight.ts:8`) | same | same | `InsightsSection` | `HomepageClient.tsx:508-510` |
| Per-slide dek/excerpt | `coalesce(excerpt, summary, pt::text(coalesce(body, content)))` — note: schema field is actually named `summary` and `content`; query also probes for `excerpt`/`body` field names that **don't exist** on the `insight` schema (`insight.ts` has no `excerpt` or `body` fields) — dead probes in the `coalesce`, harmless but vestigial | **Yes** (via `summary`) | `insight.summary` (text, `insight.ts:31`) | same | same | `InsightsSection` | `HomepageClient.tsx:511` |
| Per-slide date | `coalesce(publishedAt, _createdAt)` — note: schema field is actually named `date` (`insight.ts:33`), not `publishedAt`; query's `publishedAt` probe doesn't match any schema field, so this **always** falls through to Sanity's built-in `_createdAt` system field in practice | **Partially** — falls back to system-generated creation timestamp rather than the editable `date` field | `insight.date` exists but is never queried; `_createdAt` (Sanity system field) is what's actually used | same | same | `InsightsSection` | `HomepageClient.tsx:512-514` |
| Slide background (`DiamondMotif`, decorative) | Component | No | — | — | — | `DiamondMotif` | `HomepageClient.tsx:503` |
| Prev/Next carousel buttons (‹ ›) | Hardcoded glyphs | No | — | — | — | `InsightsSection` | `HomepageClient.tsx:523-531, 546-554` |
| Dot indicators | Generated from `insights.map()`, not content | No | — | — | — | `InsightsSection` | `HomepageClient.tsx:532-545` |
| "All insights →" link → `/insights` | Hardcoded string/href | No | — | — | — | `HomepageClient` (`InsightsSection`'s sibling block) | `HomepageClient.tsx:559-564` |

### CTA Band (`app/HomepageClient.tsx:574-619`)

| Content item | Origin | Editable in Sanity? | Schema/Field | Component | Rendered location |
|---|---|---|---|---|---|
| Eyebrow "Get in touch" | Hardcoded string | No | — | `CtaBandSection` | `HomepageClient.tsx:579` |
| H2 "Let's discuss what's next for your institution." | Hardcoded string | **Dormant** — `page.ctaText` (string, `page.ts:78-83`) is the closest match, though this reads more like a headline than a button label | `CtaBandSection` | `HomepageClient.tsx:580-582` |
| Body "A first conversation is free of charge — and free of theatre." | Hardcoded string | No | — | `CtaBandSection` | `HomepageClient.tsx:583-585` |
| "Message us on WhatsApp ↗" → `https://wa.me/254793995142` | Hardcoded string/href — **note:** this phone number also appears independently hardcoded in the footer (`SiteFooter.tsx:80`), no shared constant between the two | No — no WhatsApp/phone field exists on any schema, including `siteSettings` | — | `CtaBandSection` | `HomepageClient.tsx:587-594` |
| "Start a conversation ↗" → `/contact` | Hardcoded string/href | No | — | `CtaBandSection` | `HomepageClient.tsx:595-600` |
| `DiamondMotif` (navy panel) | Component, decorative | No | — | `DiamondMotif` | `HomepageClient.tsx:605` (photograph that previously sat here was removed earlier this session — see `HOMEPAGE_AUDIT.md` §7) |

### Footer (`components-v2/layout/SiteFooter.tsx`)

| Content item | Origin | Editable in Sanity? | Schema/Field | Component | Rendered location |
|---|---|---|---|---|---|
| Logo image | `/images/logo/Lockup_Horizontal_Navy.png` | No | — | `SiteFooter` | `SiteFooter.tsx:32-38` |
| Tagline "Pan-African institutional advisory. Precision-led consulting for growth, transformation, and execution." | Hardcoded string | No | — | `SiteFooter` | `SiteFooter.tsx:39-42` |
| Location "Nairobi, Kenya" | Hardcoded string | No | — | `SiteFooter` | `SiteFooter.tsx:43-45` |
| Sitemap links (Services, Industries, Insights) | `SITEMAP_LINKS` const | No | — | `SiteFooter` | `SiteFooter.tsx:4-8, 50-54` |
| Company links (About, Careers, Contact, Coverage) | `COMPANY_LINKS` const | No | — | `SiteFooter` | `SiteFooter.tsx:10-15, 59-63` |
| "Follow us" label | Hardcoded string | No | — | `SiteFooter` | `SiteFooter.tsx:68-70` |
| LinkedIn link → `https://www.linkedin.com/company/rill-singh-limited` | Hardcoded href | **Dormant** — `siteSettings.linkedinUrl` (url field, `siteSettings.ts:21-25`) exists and is the singleton "Global Site Settings" doc, but isn't queried anywhere in this route | `SiteFooter` | `SiteFooter.tsx:71-78` |
| WhatsApp link → `https://wa.me/254793995142` | Hardcoded href (duplicate of CTA band's number) | No — no matching `siteSettings` field | — | `SiteFooter` | `SiteFooter.tsx:79-86` |
| Copyright "© {year} Rill Singh Limited" | Hardcoded string + `new Date().getFullYear()` (computed at render) | No | — | `SiteFooter` | `SiteFooter.tsx:92-94` |
| Legal links (Privacy Policy, Terms of Service) | `LEGAL_LINKS` const | No | — | `SiteFooter` | `SiteFooter.tsx:17-20, 96-104` |

---

## 3. Dormant Schema Mapping (Sanity fields that exist but the homepage never queries)

| Sanity field | Schema file | Would-be homepage content | Current actual source |
|---|---|---|---|
| `page.heroTitle` | `page.ts:52-56` | Hero H1 | Hardcoded, `HomepageClient.tsx:79` |
| `page.heroSubtitle` | `page.ts:57-63` | Hero body copy | Hardcoded, `HomepageClient.tsx:88-91` |
| `page.problems[].{title, description}` | `page.ts:98-123` | Unclear direct match — closest conceptual fit is Differentiators, though field name suggests different intent (pain points vs. strengths) | Hardcoded, no equivalent rendered on homepage |
| `page.differentiation[].{label, explanation}` | `page.ts:124-149` | Differentiators' 3 cards (title/body) | `DIFFERENTIATORS` const, `HomepageClient.tsx:35-48` |
| `page.servicesIntro` | `page.ts:64-70` | Service Clusters section intro copy | Hardcoded H2/eyebrow, `HomepageClient.tsx:222-225` |
| `page.capabilitiesIntro` | `page.ts:173-178` | Service Clusters H2 | Hardcoded, `HomepageClient.tsx:223-225` |
| `page.capabilityClusters[]` (flat string array) | `page.ts:179-185` | The 4 cluster labels — **schema shape mismatch**: flat strings vs. the `{ id, label }` object shape `CLUSTERS` actually needs | `CLUSTERS` const, `src/sections/services/data.ts:19-24` |
| `page.insightsIntro` | `page.ts:71-77` | Insights section intro copy | Hardcoded eyebrow/H2, `HomepageClient.tsx:484-487` |
| `page.ctaText` | `page.ts:78-83` | CTA band headline or button label (ambiguous which) | Hardcoded, `HomepageClient.tsx:581` and/or `:593,599` |
| `page.industries[]` (references to `industry` docs) | `page.ts:193-200`, description: *"Select industries to feature on the homepage"* | The 4-of-11 featured/supporting industry picks | `FEATURED_INDUSTRY_ID`/`SUPPORTING_INDUSTRY_IDS` consts, `HomepageClient.tsx:50-51` |
| `page.audiences[].{name, qualifier}` | `page.ts:150-172` | No current homepage equivalent found | Not found in codebase |
| `page.workingProcess` (portable text) | `page.ts:186-192` | No current homepage equivalent found | Not found in codebase |
| `page.companyDescription` / `page.operatingApproach` (portable text) | `page.ts:84-97` | Possible source for Differentiators or Point of View body copy | Hardcoded strings in both sections |
| `siteSettings.linkedinUrl` | `siteSettings.ts:21-25` | Footer LinkedIn link | Hardcoded, `SiteFooter.tsx:72` |
| `service.*` (title, category, focusAreas, approach, deliverables) | `service.ts` | Service cluster card content — **taxonomy mismatch**: `service.category` values don't match the 4 cluster IDs used on the homepage (§2, Service Clusters table) | `SERVICES`/`CLUSTER_ONE_LINERS` consts |
| `industry.title` / `industry.summary` / `industry.description` | `industry.ts:8,36-37` | Featured/supporting industry card text | `INDUSTRIES` const, `src/sections/industries/data.ts` |
| `insight.heroImage` | `insight.ts:71` | Insights carousel slide image | Not rendered — no image in the carousel at all |

**No `page` document is fetched anywhere in this codebase's homepage path** — this table represents entirely unused schema capacity, not a partial implementation.

---

## 4. Content Categories Not Found on the Homepage

- **Testimonials:** Not found in codebase — no testimonial content, component, or schema field appears anywhere in the homepage tree.
- **Statistics as a distinct content type:** the only numeric claims are the Hero's "10 disciplines · 11 sectors · Nairobi" line and the repeated "ten disciplines"/"eleven sectors" phrasing in body copy — all hardcoded strings, not computed from `SERVICES.length`/`INDUSTRIES.length` (§2, Hero table) and not sourced from any schema `number` field.
- **Icons (as a design-system concept, e.g. `react-icons`):** not used on the homepage. All "icons" are either inline hand-rolled `<svg>` (`MenuIcon`, `CloseIcon`), Unicode arrow glyphs (`→`, `↗`, `‹`, `›`) as literal JSX text, or the CSS-only play/pause bars/triangle in `DifferentiatorsSection`.
- **Ratings, pricing, forms:** Not found in codebase on this route (a contact form exists at `/contact`, out of scope for the homepage).
