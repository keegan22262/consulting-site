# Homepage Engineering Onboarding

**Audience:** a senior frontend engineer joining this project and about to work on (or plan a redesign of) `/`.
**Scope:** the homepage route and everything it touches — routing context, rendering tree, data flow, styling system, and known technical debt.
**Method:** every claim below is grounded in a specific file and, where useful, a line number. Nothing here is inferred from naming conventions or assumed framework defaults without confirming it against the actual source. Where something could not be verified, it says so explicitly rather than guessing.
**State of the code:** read-only audit — nothing in this document reflects changes made during its writing. One prior, already-applied and committed change is referenced where relevant (removal of a photograph from the CTA band, commit `cb2b756b`).

---

## 1. Routing

This is a Next.js **App Router** project (`app/` directory, no `pages/` router present). Route structure, confirmed by directory listing:

```
app/
├── page.tsx                    → /                (homepage — this document's focus)
├── layout.tsx                  → root layout, wraps every route
├── ClientLayout.tsx            → client-side chrome wrapper (not itself a route)
├── HomepageClient.tsx          → homepage body (not itself a route — imported by page.tsx)
├── about/page.tsx              → /about
├── careers/page.tsx            → /careers
├── contact/page.tsx (+ ContactForm.tsx, NewsletterSection.tsx, ContactContextMessage.tsx)
│                                → /contact
├── coverage/page.tsx           → /coverage
├── how-we-work/page.tsx        → /how-we-work
├── industries/page.tsx         → /industries
├── industries/[slug]/          → /industries/:slug (dynamic segment)
├── insights/page.tsx (+ loading.tsx, error.tsx)
│                                → /insights (with route-level loading/error boundaries)
├── insights/[slug]/            → /insights/:slug
├── services/page.tsx (+ loading.tsx, error.tsx)
│                                → /services (with route-level loading/error boundaries)
├── services/[slug]/            → /services/:slug
├── case-studies/[slug]/        → /case-studies/:slug
├── search/page.tsx             → /search
├── legal-notices, privacy, privacy-policy, regulatory-disclosures, terms
│                                → static legal pages
├── admin/submissions/          → /admin/submissions
├── studio/[[...tool]]/         → /studio/* (Sanity Studio, catch-all route)
├── api/contact/route.ts        → POST /api/contact
├── api/industries/route.ts     → /api/industries
├── api/insights/route.ts       → /api/insights
├── api/pages/[slug]/route.ts   → /api/pages/:slug
├── api/search/route.ts         → /api/search
├── api/services/route.ts       → /api/services
├── api/submissions/route.ts    → /api/submissions
├── robots.ts                   → /robots.txt (generated)
└── sitemap.ts                  → /sitemap.xml (generated)
```

**Homepage-specific routing notes:**
- `app/page.tsx:6-7` sets `export const dynamic = "force-dynamic"` and `export const revalidate = 120` on the same route. These two directives are in tension — `force-dynamic` opts the route out of static generation/ISR caching entirely, which makes the `revalidate = 120` value effectively inert for this route. Confirmed by reading both exports directly; no build-time caching behavior was separately verified.
- The homepage has **no `app/loading.tsx` or `app/error.tsx`** at the root, unlike `/insights` and `/services`, which both have dedicated `loading.tsx`/`error.tsx` siblings. If the homepage's server-side Sanity fetch (`app/page.tsx:37`) is slow or throws, there is no route-level boundary to catch it — confirmed by directory listing (§1 above) showing no such files next to `app/page.tsx`.
- `app/studio/[[...tool]]/` is Sanity Studio embedded as a Next.js route (catch-all segment) — out of scope for the homepage but worth knowing it's mounted inside this same app.

---

## 2. Rendering Tree

```
RootLayout (app/layout.tsx)                              [Server]
└─ <body>
   └─ ClientLayout (app/ClientLayout.tsx)                 [Client, "use client"]
      ├─ SiteHeader (components-v2/layout/SiteHeader.tsx) [Client, "use client"]
      │  └─ MobileDrawer (internal)                       [Client]
      ├─ {children} ⇒ Home (app/page.tsx)                 [Server, async]
      │  └─ HomepageClient (app/HomepageClient.tsx)        [Client, "use client"]
      │     ├─ HeroSection (internal)
      │     ├─ DifferentiatorsSection (internal)
      │     ├─ ServiceClustersSection (internal)
      │     │  ├─ ClusterCardBig, ClusterCardSmall ×2 (internal)
      │     │  └─ ServiceLinks (internal)
      │     ├─ PointOfViewSection (internal)
      │     ├─ IndustriesSection (internal)
      │     ├─ InsightsSection (internal, conditional on insights.length > 0)
      │     └─ CtaBandSection (internal)
      │     (every section above renders DiamondMotif — components-v2/ui/DiamondMotif.tsx — repeatedly)
      ├─ SiteFooter (components-v2/layout/SiteFooter.tsx)  [no directive, no hooks]
      └─ Suspense → PreviewBannerGate (internal) → PreviewBanner (components-v2/ui/PreviewBanner.tsx) [Client]
```

Full per-component detail (file path, parent, children, imports, props, export type) is documented in `COMPONENT_DEPENDENCY_GRAPH.md` in this repository — that document should be treated as the authoritative reference table; this section summarizes it.

---

## 3. Layouts

- **Root layout** (`app/layout.tsx:51-90`): a Server Component. Loads two Google fonts via `next/font/google` (`DM_Sans` as `--font-dm-sans`, `Source_Serif_4` as `--font-playfair`, both `display: "swap"`, `layout.tsx:7-17`), sets `<html lang="en" data-scroll-behavior="smooth">`, injects an `Organization` JSON-LD `<script>` (`layout.tsx:56-83`), and renders `<ClientLayout>{children}</ClientLayout>` inside `<body>`.
- **`ClientLayout`** (`app/ClientLayout.tsx:8-19`) is the de facto "site chrome" layout — header, routed page content, footer, preview banner — but it is **not** a Next.js `layout.tsx` file; it's a plain component manually inserted into the root layout. There is no nested `layout.tsx` anywhere under `app/` (confirmed by the directory listing in §1) — this is a **single-layout application**, not a route-group/nested-layout architecture.
- **No `<main>` landmark exists anywhere in the layout chain.** `ClientLayout.tsx:9-19` wraps `<SiteHeader/>`, `{children}`, `<SiteFooter/>` in a bare React Fragment (`<>...</>`), not a semantic `<main>` element. Confirmed by reading the full file — no `<main>` tag present. See §22 (Accessibility).
- No route groups (`(group)` folder syntax) are used anywhere in `app/` — confirmed by the directory listing in §1.

---

## 4. Providers

**No React Context Provider is mounted anywhere in the tree reachable from `/`.** Confirmed by a repository-wide search for `.Provider` usage across `app/`, `components-v2/`, `src/`, and `lib/`: the only match found is `src/sections/industries/IndustriesPageClient.tsx:28,38` (`<BpCtx.Provider value={bp}>`), which belongs to the `/industries` route, not the homepage. `BpCtx` itself is defined in `lib/breakpoints.ts:10`, and `SiteHeader` (which *is* in the homepage tree) reads breakpoint state via the separate `useBreakpoint()` resize-listener hook (`lib/breakpoints.ts:18-29`), not via `useBp()`/context — so even the one Provider that exists in this codebase never wraps anything on `/`.

There is no theme provider, no state-management provider (Redux/Zustand/etc. — not found in `package.json` dependencies either), and no data-fetching provider (no SWR/React Query context).

---

## 5. Server/Client Boundaries

This is the most consequential architectural fact for anyone planning a redesign, so it's worth stating precisely:

| Component | Directive | Effective boundary | Why |
|---|---|---|---|
| `RootLayout` (`app/layout.tsx`) | none | **Server** | No `"use client"`, no hooks. |
| `ClientLayout` (`app/ClientLayout.tsx`) | `"use client"` (line 1) | **Client** | Uses `useRouter`/`useSearchParams`. |
| `SiteHeader` (`components-v2/layout/SiteHeader.tsx`) | `"use client"` (line 1) | **Client** | Uses `useState`/`useEffect`/`usePathname`. |
| `SiteFooter` (`components-v2/layout/SiteFooter.tsx`) | none | **Client, by import-boundary rule** | No directive, no hooks — but it's directly imported and called by `ClientLayout` (a Client Component), not passed via `children`. Per the App Router's boundary rules, a component only stays server-rendered inside a Client Component tree if it arrives through the `children` prop from a Server Component ancestor. Direct import + direct call inside client code makes it part of the client bundle regardless of its own directive. |
| `Home` (`app/page.tsx`) | none, `async function` | **Server** | This is the one component in the tree that genuinely benefits from the `children`-prop escape hatch: it's passed into `ClientLayout` as `{children}` from `RootLayout` (a Server Component), so it retains server execution — confirmed by the fact that it's `async` and calls `sanityClient`, which is guarded by the `server-only` package (`lib/sanity/client.ts:1`) and would throw a build error if it were ever pulled into a client bundle. |
| `HomepageClient` (`app/HomepageClient.tsx`) | `"use client"` (line 1) | **Client** | File-level directive applies to every function defined in the file. |
| `DiamondMotif` (`components-v2/ui/DiamondMotif.tsx`) | none | **Client, by import-boundary rule** | Same reasoning as `SiteFooter` — no hooks, no directive, but always invoked directly from within already-client parents (every call site is inside `HomepageClient.tsx` or its internal section functions). |

**Practical consequence:** all 7 visible homepage sections hydrate as client-side JavaScript, even though only 2 of them (`DifferentiatorsSection`, which owns a `useState` play/pause toggle, and `InsightsSection`, which owns a `useState` carousel index) have any actual interactivity. `HeroSection`, `PointOfViewSection`, `ServiceClustersSection`, `IndustriesSection`, and `CtaBandSection` have zero hooks and zero event handlers of their own — they are client components today purely because they're defined inside a file with a top-level `"use client"` directive, not because they need to be. Splitting `HomepageClient.tsx` so those 5 sections live in separate files without the directive would let them ship as zero-JS Server Components; this was not done and is not required for the current behavior — flagged here because it's exactly the kind of thing that gets *harder*, not easier, to fix after a redesign layers more markup onto the same file.

---

## 6. Component Hierarchy

Full parent/child mapping — including internal (non-exported) components, props, and export types — is maintained in `COMPONENT_DEPENDENCY_GRAPH.md`. Headline structural facts:

- **22 total component nodes** in the homepage-reachable tree; 9 live in dedicated files, 13 are defined inline inside `app/HomepageClient.tsx` (10 of them) or `components-v2/layout/SiteHeader.tsx` (3: `MobileDrawer`, `MenuIcon`, `CloseIcon`).
- `app/HomepageClient.tsx` is 609 lines and contains the entire homepage body — all 7 sections plus 5 helper components (`ClusterCardBig`, `ClusterCardSmall`, `ServiceLinks`, plus the two internal icon components live in `SiteHeader.tsx`).
- `DiamondMotif` (`components-v2/ui/DiamondMotif.tsx:14-38`) is the single most-reused component — 8 distinct call sites across every section except Point of View, 13+ rendered instances once loop-based calls (Industries, Insights) are counted.

---

## 7. Data Flow

**Static content** (Hero, Differentiators, Point of View, CTA Band, and most of Header/Footer): inline JSX string literals or module-level `const`s, e.g. `DIFFERENTIATORS` (`app/HomepageClient.tsx:35-48`), `NAV_LINKS` (`components-v2/layout/SiteHeader.tsx:9`), `SITEMAP_LINKS`/`COMPANY_LINKS`/`LEGAL_LINKS` (`components-v2/layout/SiteFooter.tsx:4-20`). No transformation, no fetch.

**Local-data-module content** (Service Clusters, Industries):
```
src/sections/services/data.ts (CLUSTERS, SERVICES consts)
  → import in app/HomepageClient.tsx (module scope)
  → Array.filter/slice in cardCopy() (HomepageClient.tsx:211-214)
  → ClusterCardBig / ClusterCardSmall props → rendered text

src/sections/industries/data.ts (INDUSTRIES const)
  → import in app/HomepageClient.tsx (module scope)
  → Array.find()/`.map()+.find()` against FEATURED_INDUSTRY_ID / SUPPORTING_INDUSTRY_IDS (HomepageClient.tsx:50-51, 398-401)
  → IndustriesSection local consts → rendered text
```
`src/sections/services/data.ts:1-2` self-documents as *"FALLBACK DATA — used only when Sanity CMS returns empty. Do not edit for live content"* — but the homepage imports and renders it unconditionally; there is no live-Sanity branch wired into this section, so in practice it is the actual production content source, not a fallback.

**CMS content** (Insights — the only genuinely dynamic section): see §9 for the full flow.

---

## 8. CMS

Sanity is integrated (`@sanity/client`, `next-sanity`, `sanity` in `package.json`), but touches only **one** of the homepage's 7 sections at runtime.

**Client setup** — `lib/sanity/client.ts`: a `server-only`-guarded (`line 1`) module that builds a `createClient()` instance from `NEXT_PUBLIC_SANITY_PROJECT_ID`/`NEXT_PUBLIC_SANITY_DATASET`/`NEXT_PUBLIC_SANITY_API_VERSION` env vars, each with a hardcoded fallback via a local `safeEnv()` helper (`lib/sanity/client.ts:12-19`); `useCdn` is hardcoded `false` (`line 25`); the dataset is force-pinned to `"production"` regardless of the env var's value (`lines 26-29`).

**Schemas registered** (`sanity/schemaTypes/index.ts:26-48`): `page`, `service`, `insight`, `insightTheme`, `siteSettings`, `howWeWork`, `privacyPolicy`, `terms`, `contactSubmission`, `clientsAndIndustries`, `careersPage`, `contactPage`, `companyPositioning`, `deliveryModel`, `internalStrategy`, `coreTeam`, `capabilityStack`, `growthStrategy`, `joinUs`, `industry`, `deliveryPhase`, `pridePrinciple`, `trustSignal` — 23 document types total.

**The one live query** — `LATEST_INSIGHTS_QUERY` (`app/page.tsx:17-25`, GROQ via the `groq` tagged template):
```groq
*[_type == "insight" && (status == "published" || !defined(status))]
  | order(coalesce(publishedAt, _createdAt) desc)[0...3] {
    _id, title, "slug": coalesce(slug.current, slug),
    "dek": coalesce(excerpt, summary, pt::text(coalesce(body, content))),
    "category": coalesce(theme->title, category),
    "date": coalesce(publishedAt, _createdAt)
  }
```
Two verified discrepancies against the actual `insight` schema (`sanity/schemaTypes/insight.ts:1-73`):
1. The query's `theme->title` and `coalesce(excerpt, ..., body, ...)` and `publishedAt` all reference field names (`theme`, `excerpt`, `body`, `publishedAt`) that **do not exist** on the `insight` schema — the schema has `category` (plain string, `insight.ts:32`), `summary` (`insight.ts:31`), `content` (`insight.ts:34`), and `date` (`insight.ts:33`) instead. Because GROQ's `coalesce()` silently passes through nonexistent-field lookups as `null`, this doesn't break anything — every field resolves via its second/third fallback in practice — but it means the "primary" path in each `coalesce()` is dead code, and specifically that **dates displayed on the homepage come from Sanity's auto-generated `_createdAt` system field, not the editable `date` field a content editor would expect to control.**
2. `insight.heroImage` (`insight.ts:71`, an `image` field with `hotspot: true`) exists on the schema but is not selected by the query — the Insights carousel renders no image at all (confirmed against `app/HomepageClient.tsx:475-568`: `InsightsSection` never renders an `<Image>` or `<img>`).

**A largely unused content model exists specifically for the homepage.** `sanity/schemaTypes/page.ts:7-16` defines a `homepage` fieldset on the `page` document type with fields `heroTitle`, `heroSubtitle`, `servicesIntro`, `insightsIntro`, `ctaText`, `companyDescription`, `operatingApproach`, `problems[]`, `differentiation[]` (an array of `{ label, explanation }` objects — structurally near-identical to the hardcoded `DIFFERENTIATORS` const's `{ title, body }` shape), `audiences[]`, `capabilitiesIntro`, `capabilityClusters[]`, `workingProcess`, and `industries[]` (references to `industry` documents, described in the schema itself as *"Select industries to feature on the homepage"* — `page.ts:194-199`, which is exactly what the hardcoded `FEATURED_INDUSTRY_ID`/`SUPPORTING_INDUSTRY_IDS` consts do today). **No code anywhere in this repository queries the `page` document type** — confirmed by the fact that `app/page.tsx` contains exactly one GROQ query (`LATEST_INSIGHTS_QUERY`) and no other file imports `sanityClient` for a `page`-type fetch reachable from the homepage. This schema is either an unfinished migration or a superseded content model; either way, none of its fields reach the rendered page.

A `service` schema (`sanity/schemaTypes/service.ts`) and `industry` schema (`sanity/schemaTypes/industry.ts`) also exist and could theoretically back the Service Clusters and Industries sections, but the homepage uses the static `src/sections/services/data.ts` / `src/sections/industries/data.ts` modules instead. Notably, `service.ts`'s `category` preview labels (`digital-ai`, `financial-risk-tax`, `people-esg-public`, `strategy-transformation` — `service.ts:87-92`) do not fully match the 4 cluster IDs the static data module actually uses (`strategy-transformation`, `finance-risk-regulation`, `sustainability-public`, `growth-communications` — `src/sections/services/data.ts:19-24`), meaning even a future migration to the live `service` schema would require reconciling two already-diverged taxonomies.

---

## 9. API Usage

**The homepage makes zero client-side API calls.** Confirmed by grepping `app/HomepageClient.tsx` and every component in the homepage tree for `fetch(` — no matches. All homepage data acquisition happens server-side, once, in `Home()` (`app/page.tsx:36-42`) via the direct Sanity client (§8) — not through any of this repo's own `/api/*` route handlers.

For context, the `/api/*` surface that exists in this repo (not consumed by the homepage, but relevant to understand the wider system):
- `app/api/contact/route.ts` — `POST` handler, rate-limited (`checkRateLimit`, `route.ts:26-28`), sends email via Resend or SMTP/nodemailer depending on configuration (`route.ts:8-21`), backed by a Neon Postgres connection (`@/lib/db`, imported `route.ts:4`).
- `app/api/industries/route.ts`, `app/api/services/route.ts`, `app/api/insights/route.ts`, `app/api/pages/[slug]/route.ts`, `app/api/search/route.ts` — not inspected in detail as part of this audit (out of scope: not homepage-reachable).
- `app/api/submissions/route.ts` — paired with `app/admin/submissions/` (an internal admin view), also not homepage-reachable.

---

## 10. Props

Full per-component prop tables (required/optional, types, defaults) are in `COMPONENT_DEPENDENCY_GRAPH.md`. Summary of the notable patterns:

- Every prop interface in the homepage tree is fully consumed — no unused props were found anywhere in the tree.
- `ClusterCardBig` and `ClusterCardSmall` (`app/HomepageClient.tsx:287-303, 329-345`) have **byte-identical prop signatures** (`num, cluster, one_liner, items, left, top, motifSize`) — see §26 (Duplicated Code).
- `DiamondMotif`'s props (`DiamondMotifProps`, `components-v2/ui/DiamondMotif.tsx:1-8`) are the only ones with defaults in the tree: `animate = false`, `playing = true` (`DiamondMotif.tsx:14`).
- `PreviewBanner`'s props are both optional (`active?: boolean; onExit?: () => void` — `components-v2/ui/PreviewBanner.tsx:5-8`), with the component defensively disabling its own exit button when `onExit` is absent (`PreviewBanner.tsx:43`).

---

## 11. State

- **`useState` instances in the homepage tree:** `DifferentiatorsSection`'s `playing` (motif animation toggle, `HomepageClient.tsx:124`); `InsightsSection`'s `index` (carousel position, `HomepageClient.tsx:477`); `SiteHeader`'s `drawerOpen`, `navCollapsed`, `hasMounted`, `isSolid` (`SiteHeader.tsx:23-26`); `MobileDrawer` uses `useRef` (not `useState`) for focus-trap bookkeeping (`SiteHeader.tsx:190-191`).
- **No memoization** (`useMemo`/`useCallback`/`React.memo`) exists anywhere in the homepage tree — confirmed by inspecting every component file listed in §6. `IndustriesSection`'s `featured`/`supporting` derivation (`.find()`/`.map()`+`.find()` over an 11-item array, `HomepageClient.tsx:398-401`) recomputes on every render without memoization; this is inexpensive at the current data size and not flagged as a performance problem, only as an absence worth knowing about before scaling the dataset.
- **No Suspense-based data fetching** — the one `<Suspense>` in the tree (`ClientLayout.tsx:14-16`) exists only because `useSearchParams()` requires a Suspense boundary in the App Router; it wraps `PreviewBannerGate`, not any data-loading component.
- **No loading state exists for the Insights fetch.** `Home()` is a blocking `await` (`app/page.tsx:37`) with no skeleton/spinner and no route-level `loading.tsx` (§1) — if the Sanity fetch is slow, the entire initial response is delayed.

---

## 12. Styling

**Methodology:** Tailwind CSS v4 utility classes, applied directly in JSX `className` strings, including extensive use of arbitrary-value utilities (`text-[clamp(2.25rem,1.6rem+2.6vw,3.25rem)]`, `bg-[linear-gradient(155deg,#0B355E_0%,#021024_78%)]`, etc.) — confirmed throughout `app/HomepageClient.tsx`. The one exception is `DiamondMotif`, which builds inline `style={}` objects (`components-v2/ui/DiamondMotif.tsx:15-23`) because its geometry (`calc(${size} * ${scale})`) isn't expressible as static utility classes.

**No CSS Modules, SCSS, or Emotion** were found anywhere in the homepage tree. `styled-components` is listed in `package.json` but a repository-wide grep for its import found **zero matches anywhere in the entire repo** — a fully dead dependency, not just unused on the homepage.

---

## 13. Tailwind Architecture

- **Version:** Tailwind CSS v4.1.18 (`node_modules/tailwindcss/package.json`), via `@tailwindcss/postcss` (`postcss.config.*`: `{ plugins: { "@tailwindcss/postcss": {} } }`).
- **Entry point:** `app/globals.css:1` — `@import "tailwindcss";`. No `@theme` block and no `@config` directive exist anywhere in `globals.css` (confirmed by full-file read and grep).
- **Config file:** `tailwind.config.ts` (JS-based, `theme.extend` shape) is nonetheless picked up automatically by `@tailwindcss/postcss` v4 even without an explicit `@config` directive — this was verified empirically, not assumed: the compiled `.next/static/chunks/*.css` output contains generated class rules for `terracotta`, `terracotta-hover`, and `navy-darkest`, which only exist as values inside `tailwind.config.ts:26-45`.
- **Content globs:** `tailwind.config.ts:5-9` scans `app/**`, `components-v2/**`, `src/**`.
- **Custom theme surface:** custom `fontFamily.heading`/`fontFamily.body` (referencing the `next/font` CSS variables), custom `fontSize` scale keyed to CSS variables (`overline`, `caption`, `body`, `lead`, `h3`, `h2`, `h1`, `display` — `tailwind.config.ts:16-25`), custom `colors` (`navy.darkest/dark`, `blue.mid/light/ice`, `terracotta.DEFAULT/hover`, `eyebrow`, `rsl.offwhite/textDark/textMuted`, `neutral.*` and `semantic.*` re-pointed at CSS variables — `tailwind.config.ts:26-66`), custom `maxWidth.content = "1200px"` (**not used anywhere on the homepage** — every homepage section instead uses the arbitrary value `max-w-[72rem]`, which is 1152px, a close-but-distinct number from the token), custom `borderRadius.card = "4px"` (also not used on the homepage — sections use Tailwind's default `rounded-3xl`/`rounded-2xl`/`rounded-full` instead), and custom `transitionDuration.fast/normal/slow`.
- **Custom arbitrary breakpoint:** `min-[700px]:` appears in `ServiceClustersSection` (`HomepageClient.tsx:228, 231, 232`) — a one-off value with no corresponding entry in `tailwind.config.ts`'s (absent) `screens` config.

---

## 14. Design Tokens

**Design tokens are defined twice, in two different systems, with matching values but no shared source of truth:**
1. `tailwind.config.ts:26-45` — JS `theme.extend.colors` object.
2. `app/globals.css:32-150` — a `:root` block of ~90 CSS custom properties, organized into "Fonts," "Spacing," "Typography scale," "Neutral scale," "Accent scale," "Status colours," "Brand colours," "Section tokens," "Semantic aliases," and "Layout tokens" (each section explicitly commented in the source).

Both systems encode the same brand hex values (e.g. `#021024` navy-darkest, `#C17A46` terracotta) independently — a change to either requires manually mirroring it in the other; nothing in the codebase generates one from the other. This was confirmed by reading both files in full, not inferred from the naming similarity alone.

`globals.css:146` defines `--section-vertical: var(--space-96)` — a token that, if actually applied, would correspond exactly to the ad hoc `py-[clamp(64px,8vw,96px)]` value repeated verbatim across four homepage sections (Differentiators, Service Clusters, Industries, Insights) — but the token itself is not referenced by any `className` in the homepage tree (confirmed by grep).

---

## 15. Typography

- **Font loading:** `next/font/google` loads `DM_Sans` (→ `--font-dm-sans`) and `Source_Serif_4` (→ `--font-playfair`, note the variable name doesn't match the actual font — a naming leftover, not a bug) in `app/layout.tsx:7-17`, both with `display: "swap"`.
- **Application:** `globals.css:38-39` maps `--font-heading: var(--font-playfair), Georgia, "Times New Roman", serif` and `--font-body: var(--font-dm-sans), -apple-system, ...`. Every heading-styled element in the homepage tree uses `font-[var(--font-heading)]` directly in its `className` rather than a Tailwind `font-heading` utility, even though `tailwind.config.ts:12-15` does define that utility — both paths resolve to the same CSS variable, so this is a stylistic inconsistency, not a functional bug.
- **Visual scale (not semantic heading levels — see §22):** Hero H1 (`clamp(2.25rem,1.55rem+3vw,4.625rem)`, `HomepageClient.tsx:78`) is the largest text on the page. The Point of View section's central statement is the second-largest (`clamp(1.75rem,1.2rem+3.2vw,3.25rem)`, `HomepageClient.tsx:378`) but is marked up as a `<p>`, not a heading. A shared section-H2 clamp value (`clamp(2.25rem,1.5rem+3vw,4rem)`) is reused verbatim across Differentiators, Service Clusters, and Industries (`HomepageClient.tsx:132, 223, 411`). The Insights section's H2 uses the same shared clamp (`HomepageClient.tsx:485`). The CTA Band's H2 uses a distinct-but-close clamp (`clamp(2.25rem,1.6rem+2.6vw,3.25rem)`, `HomepageClient.tsx:580`) rather than the shared one.
- **Only one `<h1>`** exists in the homepage-rendered DOM — confirmed by grep for `<h1` across `app/HomepageClient.tsx`: exactly one match, in `HeroSection` (`line 78`).

---

## 16. Spacing System

- `app/globals.css:42-50` defines a `--space-4` through `--space-128` scale (4, 8, 16, 24, 32, 48, 64, 96, 128px). **The homepage does not use this scale.** Every section instead hand-writes its own fluid `clamp()` expression inline. The most common value, `clamp(64px,8vw,96px)`, appears verbatim at `HomepageClient.tsx:129, 191, 220, 376, 406, 459, 482` — 7 separate occurrences of the identical string, none of them referencing the `--space-96`-based `--section-vertical` token that already exists for exactly this purpose (§14).
- Horizontal padding is more consistent: `px-6 sm:px-16` recurs across nearly every section's outer container.
- Point of View and CTA Band deliberately deviate from the standard vertical rhythm (`clamp(80px,9vw,128px)` and `clamp(56px,7vw,88px)` respectively) — this reads as an intentional choice (a "breather" section and a "closing" section, respectively) rather than an inconsistency, though it's implemented with more one-off arbitrary values rather than named tokens either way.

---

## 17. Image Management

- **All raster images in the homepage-reachable tree render through `next/image`** (`Image` from `next/image`) — no raw `<img>` tags were found in `SiteHeader.tsx`, `SiteFooter.tsx`, or `app/HomepageClient.tsx` (which, post the CTA-band photo removal referenced above, no longer imports `next/image` at all — confirmed via grep, zero `<Image` occurrences remain in that file).
- **Logo assets:** `SiteHeader.tsx:104-115` swaps between `/images/logo/Lockup_Horizontal_White.png` and `/images/logo/Lockup_Horizontal_Navy.png` based on scroll state, with `priority` set (line 113). `SiteFooter.tsx:32-38` uses `/images/logo/Lockup_Horizontal_Navy.png` with no `priority`/`loading` override (defaults to lazy). Both set explicit `width={1800} height={560}` while rendering at `h-8`/`h-9` (32-36px tall) via CSS — `next/image` handles the responsive downscaling, but the source PNG files themselves are 350-393KB each (confirmed via `ls -la public/images/logo/`), sizeable for what ultimately renders as a small logo mark.
- **The Insights carousel renders no images at all**, despite the `insight` schema having a `heroImage` field (§8) — confirmed by reading `InsightsSection` (`HomepageClient.tsx:475-568`) in full: no `<Image>`/`<img>` element anywhere in it.
- **`DiamondMotif` is not an image** — it's pure CSS (rotated, bordered `<div>`s), confirmed by reading `components-v2/ui/DiamondMotif.tsx` in full: no `<img>`, no `background-image`, no SVG.
- **OpenGraph image:** `/images/og-image.jpg`, referenced only as a metadata URL (`app/layout.tsx:36`), never rendered in-page.
- A photograph (`/images/team/vankeno.jpg`) previously rendered in the CTA band's navy panel was removed earlier in this engagement (git commit `cb2b756b`) at explicit user instruction; the asset file itself remains on disk and is still legitimately referenced elsewhere in the codebase (`src/sections/about/LeadershipSection.tsx:13`), so it is not orphaned.

---

## 18. Responsive Behavior

- **Primary strategy: fluid `clamp()` values**, not discrete breakpoint jumps, for the majority of type sizing and spacing across every section — this is the dominant responsive pattern on the page, confirmed by the sheer density of `clamp(...)` usage throughout `app/HomepageClient.tsx`.
- **Layered on top, a handful of discrete Tailwind breakpoints** change actual layout structure (not just sizing): `sm:` (640px, e.g. `DifferentiatorsSection`'s card row direction, `HomepageClient.tsx:192`), `md:` (768px, CTA Band's column→row split, `HomepageClient.tsx:577, 602`), `lg:` (1024px, Industries' hover-reveal behavior gate, `HomepageClient.tsx:440-453`), and the one custom arbitrary breakpoint `min-[700px]:` (Service Clusters' big/small row direction, §13).
- **Header collapse is JS-driven, not purely CSS-driven:** `SiteHeader.tsx:18-29` uses a `useBreakpoint()` resize-listener hook (`lib/breakpoints.ts:18-29`) to detect mobile/tablet, and *separately* a `scrollY > 0` listener (`SiteHeader.tsx:42-49`) that collapses the nav to a hamburger on **any** viewport once the page is scrolled, even on desktop — two independent triggers for the same collapsed state.
- **Industries section uses a horizontal-scroll flex rail at every breakpoint** (`overflow-x-auto`, `HomepageClient.tsx:416`) rather than reflowing into a wrapped grid — card widths step through percentage breakpoints (`w-[88%] sm:w-[58%]` for the featured card) but the scrolling mechanism itself never changes.

---

## 19. Animations

Full inventory, confirmed against source (no animation exists in this tree beyond what's listed here):
1. **Header background crossfade** on scroll (`transition-all duration-300`, `SiteHeader.tsx:91`).
2. **`DiamondMotif` drift** (`@keyframes diamond-drift`, `globals.css:14-18`; `.animate-diamond-drift`, `globals.css:19-27`) — a 48-second rotate/scale loop, applied **only** when the `animate` prop is explicitly passed. Grepping every `<DiamondMotif` call site in `HomepageClient.tsx` shows exactly one passes `animate` (`DifferentiatorsSection`, `HomepageClient.tsx:171`) — every other instance (12+ others) is static. The animated instance is user-togglable via a play/pause button (`HomepageClient.tsx:172-186`) and respects `prefers-reduced-motion` both at the CSS level (`globals.css:25-27`) and via the `useReducedMotionPreference` hook gating the `isPlaying` value (`HomepageClient.tsx:123-125`).
3. **Insights carousel slide transition** — inline `style={{ transform: translateX(...), transition: reducedMotion ? "none" : "transform 300ms ease" }}` (`HomepageClient.tsx:493-496`), explicitly disabled under reduced motion.
4. **Industries supporting-card hover-reveal** — `lg:transition-[height] duration-500` on the info panel, `lg:transition-[opacity,transform] duration-200` on the description/link (`HomepageClient.tsx:440-453`) — `lg:`-gated only; below `lg:`, content is always fully visible with no transition needed.
5. **Uniform hover micro-transitions** (`hover:bg-*-hover`, `hover:translate-x-0.5 hover:underline`, `hover:scale-[1.03]`) on links/buttons throughout — standard Tailwind `transition-colors`/`transition-transform` patterns, no custom easing beyond Tailwind defaults except where noted above.

No scroll-triggered reveal animations, no parallax, and no page-load entrance animations exist anywhere in the homepage tree — confirmed by the exhaustiveness of the above list against a full read of every homepage component file.

---

## 20. Performance

- **Hydration cost:** all 7 homepage sections are client components (§5) despite only 2 needing interactivity — every visitor downloads and hydrates JS for 5 sections that have no behavior beyond what a Server Component could render statically.
- **No memoization anywhere** (§11) — not currently a measured problem at this data scale (11 industries, 10 services, 3 insights), but worth knowing before the data model grows.
- **`force-dynamic` + `revalidate = 120` tension** (§1) — the route opts out of static caching entirely; the `revalidate` value is not doing what it visually appears to do.
- **No `loading.tsx` for the homepage** (§1, §11) — a slow Sanity fetch blocks the entire initial response with no skeleton state.
- **Dead dependencies inflate `package.json` but not the shipped bundle** — `framer-motion` and `styled-components` are listed as dependencies but have zero imports anywhere in the entire repository (confirmed by repo-wide grep), so they cost nothing at runtime today; they would only become a bundle-size risk if someone imported them without realizing they're currently fully unused.
- **Images:** every homepage-reachable image goes through `next/image` (§17), which handles responsive `srcset` generation automatically; the one inefficiency identified is the large source-PNG logo files (350-393KB) for a ~32-36px rendered logo — `next/image` mitigates but doesn't eliminate the cost of the large source asset.
- **Industries hover-reveal animates `height`** (`lg:transition-[height]`, `HomepageClient.tsx:440`), a layout-triggering CSS property, rather than a compositor-only property like `transform`/`opacity` — more expensive than necessary for a handful of desktop-only hover interactions, not a measured bottleneck.

---

## 21. Accessibility

Findings are stated as verified facts about what is/isn't present in the markup — no color-contrast ratios or automated audit tool output are claimed here, since no such tool was run as part of this exercise.

**Present and correctly implemented, confirmed by source:**
- `<html lang="en">` is set (`app/layout.tsx:70`).
- The primary nav is labeled: `<nav aria-label="Primary navigation">` (`SiteHeader.tsx:89-90`).
- Decorative elements are consistently hidden from assistive tech: every `DiamondMotif` ring `<div>` carries `aria-hidden="true"` (`DiamondMotif.tsx:27-35`), and every decorative arrow glyph (`→`, `↗`, `‹`, `›`) across the homepage is wrapped in `<span aria-hidden="true">` alongside visible link text (e.g. `HomepageClient.tsx:97, 103, 145-146`) — confirmed as a consistent pattern across the whole file, not a one-off.
- Interactive icon-only controls have `aria-label`s: hamburger (`aria-label="Open menu"`, `SiteHeader.tsx:123`), drawer close (`aria-label="Close menu"`, `SiteHeader.tsx:254`), carousel prev/next (`aria-label="Previous/Next insight"`, `HomepageClient.tsx:525, 548`), carousel dots (`aria-label={\`Go to insight ${i+1}\`}`, `aria-current={i === index}`, `HomepageClient.tsx:537-538`), motif play/pause (`aria-label` dynamically reflects state, `HomepageClient.tsx:175`).
- The mobile nav drawer implements a real focus trap (Tab/Shift+Tab cycling, `SiteHeader.tsx:196-211`) and Escape-to-close (`SiteHeader.tsx:212-214`), and restores focus to the triggering hamburger button on close (`SiteHeader.tsx:223-230`).
- Industries' hover-reveal card content uses `group-focus-within` alongside `group-hover` (`HomepageClient.tsx:440-453`) — meaning keyboard focus on the "Explore sector" link inside a supporting card also triggers the reveal, not just mouse hover. This is a deliberate, correctly-implemented keyboard-parity pattern, not an oversight.
- Carousel prev/next buttons use the native `disabled` attribute at range bounds (`HomepageClient.tsx:526, 549`), which correctly removes them from the tab order and announces their unavailability.

**Gaps, confirmed by source:**
- **No `<main>` landmark exists anywhere in the layout.** `app/ClientLayout.tsx:9-19` wraps header/content/footer in a bare Fragment. Screen reader users have no "skip to main content" landmark target, and no such target exists to skip *to* even if a skip link were added.
- **No skip link** ("Skip to content" or equivalent) was found anywhere in the codebase — confirmed by a repository-wide grep for that phrase and common variants across `app/` and `components-v2/`, zero matches.
- **`focus-visible` styling is applied in exactly one place** in the entire homepage-reachable tree: the header logo link (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--a700]`, `SiteHeader.tsx:102`). No other link or button in `HomepageClient.tsx`, `SiteFooter.tsx`, or the rest of `SiteHeader.tsx` has an explicit focus style — confirmed via grep for `focus-visible:`/`focus:` across those files. These elements still receive the browser's default focus outline (not suppressed), so keyboard navigation is functional, but visual focus treatment is inconsistent between the one styled element and everything else.
- **The Point of View section's largest-after-hero text is a `<p>`, not a heading** (`HomepageClient.tsx:378`) — visually it reads as a section title (second-largest text on the page), but it carries no heading semantics, so it won't appear in a screen-reader user's heading-navigation outline of the page the way every other section's title does.
- **The Insights carousel has no live-region announcement** for slide changes — confirmed by reading `InsightsSection` in full: no `aria-live` region wraps the slide content, so a screen-reader user navigating via the prev/next buttons gets no automatic announcement of the new slide's content (they would need to re-navigate into the slide manually).

---

## 22. SEO Metadata

- **Root metadata** (`app/layout.tsx:19-49`): `metadataBase` set to `https://rillsingh.com`; templated `title` (`"%s | Rill Singh Limited"`); full OpenGraph block (type, url, siteName, title, description, one image at `1200×630`); Twitter card metadata (`summary_large_image`).
- **Page-level metadata** (`app/page.tsx:9-14`): overrides `title`/`description` for `/` specifically, and sets `alternates: { canonical: "/" }`.
- **Structured data:** an `Organization` JSON-LD block is injected via `dangerouslySetInnerHTML` in the root layout (`app/layout.tsx:56-83`) — present on every route, not homepage-specific, containing `name`, `url`, `logo`, `description`, and a `sameAs` array (LinkedIn only).
- **`robots.ts`** (`app/robots.ts`): generates `/robots.txt` allowing all user agents on `/`, pointing to `${baseUrl}/sitemap.xml`. `baseUrl` falls back to `https://example.com` if `NEXT_PUBLIC_SITE_URL` is unset (`robots.ts:4`) — a placeholder value that would silently ship if that env var were ever missing in production.
- **`sitemap.ts`** (`app/sitemap.ts`): includes `/` in its `STATIC_ROUTES` list (`sitemap.ts:7-19`) alongside other top-level pages, plus dynamically-fetched `/services/:slug` and `/insights/:slug` routes (guarded — if Sanity env vars are missing, it falls back to static routes only, `sitemap.ts:32-39`, with a `console.warn` rather than a thrown error).
- **Theme color:** `<meta name="theme-color" content="#021024">` (`app/layout.tsx:77`).
- **No per-section structured data** (e.g. no `Article` schema for Insights, no `BreadcrumbList`) was found on the homepage — only the site-wide `Organization` schema exists.

---

## 23. Dependencies

Homepage-relevant (`app/page.tsx` → `HomepageClient.tsx` → full tree): `next` (16.2.6, App Router/`next/font`/`next/image`/`next/link`), `react`/`react-dom` (19.2.3), `groq` (GROQ query builder), `@sanity/client` (data fetch), `server-only` (guards the Sanity client module from client bundling).

**Present in `package.json`, confirmed unused anywhere in the entire repository** (not just the homepage — verified by repo-wide grep, zero import matches for each):
- `framer-motion` — all homepage motion is CSS `@keyframes` or inline `style` transitions instead.
- `styled-components` — no styled-components usage found anywhere.

**Present but not part of the homepage path** (used elsewhere in the app — contact form, Studio, backend): `next-sanity`, `@portabletext/react`, `@sanity/image-url`, `@sanity/vision`, `sanity`, `zod`, `nodemailer`, `resend`, `@neondatabase/serverless`, `react-icons` (the homepage/header/footer hand-roll their own inline `<svg>` icons instead of using this library — confirmed via grep, no `react-icons` import in `SiteHeader.tsx`/`SiteFooter.tsx`/`HomepageClient.tsx`).

---

## 24. Reusable Components

The homepage's actual reusable-component surface is small:
- **`DiamondMotif`** (`components-v2/ui/DiamondMotif.tsx`) — the only genuinely reusable, parametrized visual primitive in the tree; used 8+ times with different `left`/`top`/`size` props.
- **`ServiceLinks`** (`app/HomepageClient.tsx:269-285`) — reused 4 times within Service Clusters (in `ClusterCardBig`, twice in `ClusterCardSmall`, and once inline for cluster 4).
- Everything else that *looks* reusable is duplicated instead of shared — see §26.

No shared "Card," "Section," or "Container" primitive exists — every section hand-builds its own wrapper markup and spacing, even though the same `mx-auto w-full max-w-[72rem] px-6 sm:px-16` pattern recurs across 6 of the 7 sections (confirmed: Hero ×3, Differentiators, Service Clusters, Industries, Insights all use this exact string or a near-identical variant).

---

## 25. Technical Debt

Ranked by how much they'd cost to carry into a redesign:

1. **The `page` schema's `homepage` fieldset is fully dormant** (§8) — a maintained, apparently intentional CMS content model exists for most of this page's text content, and nothing reads from it. Anyone redesigning the homepage needs a decision from whoever owns the CMS roadmap: build the query that was never finished, or formally retire the schema.
2. **`app/globals.css` is 1193 lines; only the first ~380 are live.** Lines 384-1193 (`.constellation-hero`, `.mandate-section`, `.capabilities-section`, `.insights-dark-section`, `.industries-section__*`, `.homepage-cta`) are a complete, unreferenced alternate homepage stylesheet — confirmed via repo-wide grep, zero `.tsx`/`.ts`/`.jsx` files reference any of these class names. This is very likely a prior homepage implementation that predates the current Tailwind-utility-first build and was never deleted.
3. **Duplicated design-token systems** (§14) — `tailwind.config.ts` and `globals.css` both define the brand palette independently.
4. **Entire homepage is one client boundary** (§5) — structurally makes a future partial-server-rendering optimization harder the more this file grows.
5. **Dead GROQ query paths** (§8) — `theme`, `excerpt`, `body`, `publishedAt` are probed but don't exist on the `insight` schema; harmless today via `coalesce()` fallbacks, but a trap for the next person who reads the query and assumes those fields are real.
6. **`force-dynamic` + `revalidate` tension** (§1) — a misleading pair of exports that don't compose the way they visually suggest.

---

## 26. Duplicated Code

- **`ClusterCardBig` and `ClusterCardSmall`** (`app/HomepageClient.tsx:287-327` and `329-369`) — identical prop signatures, identical child structure (`DiamondMotif` → header block → `ServiceLinks` → CTA `Link`, arranged with `justify-between`), differing only in Tailwind sizing classes (`min-h-[320px]` vs. `aspect-[16/10] min-h-[180px]`, font-size clamps, padding clamps). ~80 combined lines that a single `variant: "big" | "small"` prop would collapse to roughly half that.
- **The "navy gradient panel + `DiamondMotif` + content" shape** recurs, hand-built from scratch each time, in Hero, Service Clusters (×4: `ClusterCardBig`, `ClusterCardSmall` ×2, inline cluster 4), Industries (×4 cards), Insights (×N slides), and CTA Band — six sections independently reimplementing the same visual pattern with no shared wrapper component.
- **The phone number `254793995142`** appears hardcoded independently in two places with no shared constant: `HomepageClient.tsx:588` (CTA Band) and `SiteFooter.tsx:80` (Footer).
- **Three distinct near-50/50 flex-split ratios** (Differentiators 48/52, Service Clusters 55/45, CTA Band 44/56), each tuned independently with a different breakpoint mechanism (implicit flex-wrap, custom `min-[700px]:`, and `md:` respectively) — functionally the same "two-column split" concept solved three separate ways.

---

## 27. Code Smells

- **`snake_case` inside a `camelCase` codebase:** `cardCopy()`'s return shape uses `one_liner` (`HomepageClient.tsx:213`), the only snake_case identifier found in the file.
- **Magic numbers via repeated `clamp()` literals** instead of the `--space-*`/`--section-vertical` tokens that already exist for this purpose (§16).
- **Unreconciled token vs. actual value:** `tailwind.config.ts`'s `maxWidth.content = "1200px"` is never used; every section uses `max-w-[72rem]` (1152px) instead — a documented token that doesn't match the shipped layout.
- **`font-[var(--font-heading)]` written as an arbitrary value everywhere**, despite `tailwind.config.ts:12-15` already exposing this as the `font-heading` utility class — both work, but the codebase never uses the shorter, more idiomatic form.
- **Presentational content deliberately kept out of the "CMS fallback" data module**, per its own comment: `CLUSTER_ONE_LINERS` in `HomepageClient.tsx:15-20` is explicitly annotated *"Presentation-only copy that doesn't belong in the CMS fallback data"* — a sign the fallback/live-data boundary was a conscious design decision, even though (per §8) no live-data path currently exists to make the distinction meaningful.
- **Hardcoded statistics that happen to match, but aren't derived from, real data:** the Hero's "10 disciplines · 11 sectors" (`HomepageClient.tsx:111-113`) and Industries' "See all 11 sectors" (`HomepageClient.tsx:464`) match `SERVICES.length` (10) and `INDUSTRIES.length` (11) today, but are plain string literals, not `${SERVICES.length}`-style interpolations — a future data change wouldn't automatically keep these numbers correct.

---

## 28. Redesign Risks

| Section / concern | Risk | Why |
|---|---|---|
| Hero | Low-Medium | Fully static content, but `SiteHeader` reads `document.querySelector('[data-homepage-hero]')`'s live height at runtime (`SiteHeader.tsx:57-59`) to decide when to go solid — restructuring the hero without preserving that attribute and a comparable height would silently break header scroll behavior on `/` specifically. |
| Differentiators | Low | Self-contained static content + local state; no external data dependencies. |
| Service Clusters | Medium | Consumes `src/sections/services/data.ts`, which (based on its contents) is very likely shared with a dedicated `/services` route — changing that module's shape to support a redesign could ripple beyond the homepage. The `ClusterCardBig`/`ClusterCardSmall` duplication (§26) means structural changes must be made twice, in sync, or the duplication will drift further. |
| Point of View | Low | Fully static, single link, no shared data — but note the heading-semantics gap (§21) if a redesign wants this content to appear in a screen-reader heading outline. |
| Industries | Medium | Consumes `src/sections/industries/data.ts`, a large multi-purpose module (also exporting `PHILOSOPHY_CARDS`, `SECTOR_INSIGHTS`, `FILTER_CATEGORIES`, etc. per its own contents) very likely shared with `/industries`. Low risk if only the homepage's JSX changes; higher risk if the underlying data shape needs to change. |
| Insights | High | The only CMS-wired section — touches the GROQ query, the `HomepageInsight` type (exported from `page.tsx`, imported by `HomepageClient.tsx:8`), and schema assumptions that are already partially incorrect (§8). Any redesign that wants to show an image, a "real" published date, or richer content needs to fix the query and possibly the schema, not just the JSX. |
| CTA Band | Low | Static content; the right panel is now just navy + `DiamondMotif` (photo removed, commit `cb2b756b`) — structurally matches the pattern used elsewhere on the page. Note it's the one full-bleed (non-`max-w`-contained) section (§13/LAYOUT_AUDIT.md), so restoring container-consistency would be a deliberate layout change, not a bug fix. |
| Cross-cutting: `DiamondMotif` | Medium | Present in 8+ call sites across every section but Point of View — a redesign that drops or fundamentally changes this motif touches nearly the entire file at once, even though the component itself is trivial. |
| Cross-cutting: dead CSS (`globals.css:384-1193`) | Low to leave, relevant to plan around | Doesn't affect current rendering, but a redesign that reuses old class-naming conventions (e.g., a new `.homepage-cta` class) could collide with or be confused for this dead block. |
| Cross-cutting: dormant `page` schema | Decision-blocking, not code-risk | Before investing redesign effort in new hardcoded content, get an explicit answer on whether the `page.homepage` fieldset (§8) is meant to be wired up as part of this redesign — building new hardcoded sections on top of an already-existing-but-unused CMS model would compound the exact problem described in §25 item 1. |

---

## Appendix: File Index

Primary files referenced throughout this document, for quick navigation:

| Purpose | Path |
|---|---|
| Root layout | `app/layout.tsx` |
| Client chrome wrapper | `app/ClientLayout.tsx` |
| Homepage route entry (Server) | `app/page.tsx` |
| Homepage body (Client) | `app/HomepageClient.tsx` |
| Header | `components-v2/layout/SiteHeader.tsx` |
| Footer | `components-v2/layout/SiteFooter.tsx` |
| Decorative motif | `components-v2/ui/DiamondMotif.tsx` |
| Preview banner | `components-v2/ui/PreviewBanner.tsx` |
| Reduced-motion hook | `src/lib/motion/useReducedMotionPreference.ts` |
| Breakpoint hook/context | `lib/breakpoints.ts` |
| Sanity client | `lib/sanity/client.ts` |
| Services fallback data | `src/sections/services/data.ts` |
| Industries fallback data | `src/sections/industries/data.ts` |
| Sanity schemas | `sanity/schemaTypes/*.ts` |
| Global CSS / design tokens | `app/globals.css` |
| Tailwind config | `tailwind.config.ts` |
| PostCSS config | `postcss.config.*` |
| Package manifest | `package.json` |

Related documents already produced in this engagement, each covering one dimension in more exhaustive detail than the summaries above:
- `HOMEPAGE_AUDIT.md` — full 15-part structural/architectural audit.
- `COMPONENT_DEPENDENCY_GRAPH.md` — exhaustive per-component table (file, parent, children, imports, export type, server/client, props, data source, styling, images).
- `HOMEPAGE_CONTENT_AUDIT.md` — every visible content item traced to its origin, with the dormant-CMS-schema mapping in full.
- `LAYOUT_AUDIT.md` — visual layout system: containers, grids, spacing rhythm, typography scale, animation inventory, ASCII page blueprint.
