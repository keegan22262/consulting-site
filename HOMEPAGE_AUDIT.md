# Homepage Architecture Audit

Read-only reverse-engineering of `/` as implemented today. No files were changed to produce this document.

**Context note (relevant to any redesign planning):** this codebase carries a memory record of a "Cycle 4" homepage rebuild designed externally in Claude Design (locked direction: African diamond motif + flat navy, transferred in 2026-07-13). Everything this audit finds in `app/HomepageClient.tsx` — the navy/paper palette, `DiamondMotif` component, Source Serif 4 + DM Sans fonts, terracotta accent — matches that design's description exactly. **The current live homepage already appears to be the Cycle 4 rebuild**, not a pre-redesign baseline. Section 16 covers a large body of *dead* CSS (`app/globals.css:384-1193`) that looks like a *different, earlier* homepage attempt (BEM-style class names: `.constellation-hero`, `.mandate-section`, `.homepage-cta`) — none of it is referenced by any component. Worth confirming with whoever owns the redesign plan whether "major redesign" means starting over, or iterating on Cycle 4.

---

## 1. Homepage Entry

| File | Purpose | Why it participates |
|---|---|---|
| `app/page.tsx` | Route entry for `/` (Next.js App Router convention). Async Server Component. | Fetches the 3 latest insights from Sanity via GROQ, filters out any without a `slug`/`title`, and passes them as props into `HomepageClient`. Sets page `metadata` (title/description/canonical) and `export const dynamic = "force-dynamic"` + `revalidate = 120`. |
| `app/HomepageClient.tsx` | Client Component (`"use client"`). Owns all 7 visible homepage sections as internal functions in one 609-line file. | This is where the actual homepage markup lives — hero, differentiators, services, point-of-view, industries, insights carousel, CTA band. |
| `app/layout.tsx` | Root layout (Server Component). Loads Google fonts (`DM_Sans`, `Source_Serif_4`), sets global `<html>`/`<body>`, injects `Organization` JSON-LD schema, sets root `metadata` (OpenGraph/Twitter defaults). | Wraps every route including `/`; supplies the `--font-dm-sans` / `--font-playfair` CSS variables that `HomepageClient.tsx` consumes via `var(--font-heading)` / `var(--font-body)`. |
| `app/ClientLayout.tsx` | Client Component. Renders `SiteHeader`, `{children}`, `SiteFooter`, and a `Suspense`-wrapped `PreviewBannerGate`. | Every page (including `/`) is sandwiched between header and footer here. |
| `components-v2/layout/SiteHeader.tsx` | Client Component. Sticky/transparent nav bar. | Rendered on homepage; has homepage-specific scroll logic (see §2). |
| `components-v2/layout/SiteFooter.tsx` | Server-renderable component (no `"use client"`, but rendered inside client tree). | Rendered on homepage — bottom of every page. |
| `components-v2/ui/PreviewBanner.tsx` | Client Component. | Only renders when `?preview=true` is in the URL; not part of default homepage render. |
| `components-v2/ui/DiamondMotif.tsx` | Purely presentational client-safe component (no `"use client"` directive, no hooks other than none — but takes `animate`/`playing` props driven by a parent's client state). | Used repeatedly throughout `HomepageClient.tsx` as the decorative "diamond" background motif in every navy panel. |
| `src/lib/motion/useReducedMotionPreference.ts` | Client hook (`useSyncExternalStore` on `matchMedia`). | Used by `DifferentiatorsSection` and `InsightsSection` to respect OS-level reduced-motion. |
| `src/sections/services/data.ts` | Static TS data module (not a component). | Supplies `CLUSTERS`/`SERVICES` fallback data consumed by `ServiceClustersSection`. |
| `src/sections/industries/data.ts` | Static TS data module. | Supplies `INDUSTRIES` fallback data consumed by `IndustriesSection`. |
| `lib/sanity/client.ts` | Server-only (`import "server-only"`) Sanity client factory. | Used exclusively by `app/page.tsx` to fetch the Insights carousel data. |
| `lib/breakpoints.ts` | Client hook module (`useBreakpoint`, `useBp`, `BpCtx`). | Used by `SiteHeader` (not by `HomepageClient.tsx` sections directly) to detect mobile/tablet for the hamburger/drawer nav. |

**Not found in codebase:** a `pages/index.tsx` (this is a pure App Router project — no `pages/` router), a homepage-specific `template.tsx`, or any wrapping "provider" component beyond `ClientLayout`.

---

## 2. Rendering Tree

```
RootLayout (app/layout.tsx)                          [Server Component]
└── <body>
    └── ClientLayout (app/ClientLayout.tsx)           [Client Component]
        ├── SiteHeader (components-v2/layout/SiteHeader.tsx)   [Client]
        │   ├── <nav> (logo Image, NAV_LINKS, hamburger button)
        │   └── MobileDrawer (conditionally rendered)
        │       ├── nav links
        │       └── "Schedule an Introduction" CTA
        │
        ├── Home (app/page.tsx)                        [Server Component, async]
        │   └── HomepageClient (app/HomepageClient.tsx) [Client Component]
        │       ├── HeroSection
        │       │   └── DiamondMotif
        │       ├── DifferentiatorsSection
        │       │   └── DiamondMotif (animate=true)
        │       ├── ServiceClustersSection
        │       │   ├── ClusterCardBig
        │       │   │   ├── DiamondMotif
        │       │   │   └── ServiceLinks
        │       │   ├── ClusterCardSmall × 2
        │       │   │   ├── DiamondMotif
        │       │   │   └── ServiceLinks
        │       │   └── (inline cluster #4 block)
        │       │       ├── DiamondMotif
        │       │       └── ServiceLinks
        │       ├── PointOfViewSection
        │       ├── IndustriesSection
        │       │   ├── DiamondMotif (section-level)
        │       │   ├── Featured sector card + DiamondMotif
        │       │   └── Supporting sector cards × 3, each + DiamondMotif
        │       ├── InsightsSection (conditional: insights.length > 0)
        │       │   └── per-insight slide × N, each + DiamondMotif
        │       └── CtaBandSection
        │           └── DiamondMotif (navy panel — photo removed in prior session)
        │
        ├── SiteFooter (components-v2/layout/SiteFooter.tsx)
        │   ├── Brand block (logo Image)
        │   ├── Sitemap nav
        │   ├── Company nav
        │   ├── "Follow us" links (LinkedIn, WhatsApp)
        │   └── Legal row (copyright, Privacy/Terms links)
        │
        └── Suspense → PreviewBannerGate → PreviewBanner (conditional, ?preview=true)
```

No `ServiceCard`/`Icon`/`Testimonials` components exist as separate files — the example tree in the prompt does not match this codebase's actual structure; sections are flat functions inside `HomepageClient.tsx`, and there is no testimonials section on the homepage at all (`Not found in codebase`).

---

## 3. Section-by-Section Analysis

### Section 1 — Hero
- **Component path:** `app/HomepageClient.tsx:70-117` (`HeroSection`)
- **Parent:** `HomepageClient` (`app/HomepageClient.tsx:56`)
- **Children:** `DiamondMotif`, `Link` (×2)
- **Rendering type:** Static. Headline `"Institutional advisory, built for African markets."` (line 79) and body copy are hardcoded JSX strings.

### Section 2 — Differentiators
- **Component path:** `app/HomepageClient.tsx:122-205` (`DifferentiatorsSection`)
- **Parent:** `HomepageClient`
- **Children:** `DiamondMotif` (animated), inline play/pause `<button>`, `.map()` over `DIFFERENTIATORS`
- **Rendering type:** Static + local React state. Copy comes from the `DIFFERENTIATORS` const (`app/HomepageClient.tsx:35-48`):
  ```ts
  const DIFFERENTIATORS = [
    { title: "Institutional rigor", body: "..." }, ...
  ] as const;
  ```
  `playing`/`reducedMotion` are `useState`/hook-derived UI state, not content.

### Section 3 — Service Clusters
- **Component path:** `app/HomepageClient.tsx:210-267` (`ServiceClustersSection`), with `ClusterCardBig` (287-327), `ClusterCardSmall` (329-369), `ServiceLinks` (269-285)
- **Parent:** `HomepageClient`
- **Children:** `DiamondMotif`, `ClusterCardBig`, `ClusterCardSmall` × 2, `ServiceLinks`, `Link`
- **Rendering type:** Local JSON (TS module), not CMS. Evidence:
  ```ts
  import { CLUSTERS, SERVICES } from "@/src/sections/services/data";
  ```
  `src/sections/services/data.ts:1-2` self-documents: *"FALLBACK DATA — used only when Sanity CMS returns empty. Do not edit for live content."* — but the homepage imports this fallback module directly and unconditionally; there is no live-Sanity path wired into this section at all (see §14).

### Section 4 — Point of View
- **Component path:** `app/HomepageClient.tsx:374-392` (`PointOfViewSection`)
- **Parent:** `HomepageClient`
- **Children:** `Link` only (no `DiamondMotif` — the only content section without one)
- **Rendering type:** Static. `"Africa's next decade belongs to institutions that can execute."` is a hardcoded string (line 379).

### Section 5 — Industries
- **Component path:** `app/HomepageClient.tsx:397-470` (`IndustriesSection`)
- **Parent:** `HomepageClient`
- **Children:** `DiamondMotif` (×5 — one section-level, one per card), `Link`
- **Rendering type:** Local JSON. Evidence:
  ```ts
  import { INDUSTRIES } from "@/src/sections/industries/data";
  const featured = INDUSTRIES.find((i) => i.id === FEATURED_INDUSTRY_ID);
  ```
  `FEATURED_INDUSTRY_ID` and `SUPPORTING_INDUSTRY_IDS` are hardcoded constants (`app/HomepageClient.tsx:50-51`) picking 4 of the 11 industries in `src/sections/industries/data.ts`.

### Section 6 — Insights Carousel
- **Component path:** `app/HomepageClient.tsx:475-568` (`InsightsSection`)
- **Parent:** `HomepageClient` — conditionally rendered: `{insights.length > 0 && <InsightsSection insights={insights} />}` (`app/HomepageClient.tsx:61`)
- **Children:** `DiamondMotif` per slide, prev/next `<button>`s, dot indicators
- **Rendering type:** **CMS (Sanity)** — the only dynamic-content section on the homepage. Evidence, `app/page.tsx:17-25`:
  ```ts
  const LATEST_INSIGHTS_QUERY = groq`*[_type == "insight" && (status == "published" || !defined(status))]
    | order(coalesce(publishedAt, _createdAt) desc)[0...3] { ... }`;
  ```
  Fetched server-side in `Home()` (`app/page.tsx:37`), passed as the `insights` prop.

### Section 7 — CTA Band
- **Component path:** `app/HomepageClient.tsx:574-619` (`CtaBandSection`)
- **Parent:** `HomepageClient`
- **Children:** `Link` (WhatsApp, `/contact`), `DiamondMotif`
- **Rendering type:** Static. Headline, WhatsApp number (`https://wa.me/254793995142`), and CTA copy are all hardcoded. *(Note: earlier this session, a photograph — `<Image src="/images/team/vankeno.jpg">` — was removed from this section's right-hand panel per explicit instruction; the panel is now navy gradient + `DiamondMotif` only. That change is still uncommitted.)*

---

## 4. Data Flow

**Static sections (1, 2, 4, 7):** JSX string literals → rendered directly. No transformation, no fetch.

**Local-JSON sections (3, 5):**
```
src/sections/services/data.ts (CLUSTERS, SERVICES consts)
  ↓ import
app/HomepageClient.tsx (module scope)
  ↓ Array.filter/slice in cardCopy()
ClusterCardBig / ClusterCardSmall (props)
  ↓ JSX interpolation
Rendered text
```
```
src/sections/industries/data.ts (INDUSTRIES const)
  ↓ import
app/HomepageClient.tsx (module scope)
  ↓ Array.find() × FEATURED_INDUSTRY_ID, .map()+.find() × SUPPORTING_INDUSTRY_IDS
IndustriesSection (local consts `featured`, `supporting`)
  ↓ JSX interpolation
Rendered text
```

**CMS section (6 — Insights):**
```
Sanity (production dataset, project via NEXT_PUBLIC_SANITY_PROJECT_ID)
  ↓ sanityClient.fetch(LATEST_INSIGHTS_QUERY)   [lib/sanity/client.ts, app/page.tsx:37]
Home() server component (app/page.tsx)
  ↓ .filter(i => i.slug && i.title)             [app/page.tsx:39]
  ↓ prop: insights
HomepageClient (app/HomepageClient.tsx:53)
  ↓ conditional prop pass
InsightsSection (app/HomepageClient.tsx:475)
  ↓ .map() over insights, new Date(insight.date).toLocaleDateString(...)
Rendered carousel slides
```

---

## 5. Props Audit

| Component | Incoming props | Required | Optional | Type/interface | Defaults | Unused props |
|---|---|---|---|---|---|---|
| `HomepageClient` | `insights` | `insights` | — | `HomepageClientProps { insights: HomepageInsight[] }` (`app/HomepageClient.tsx:10-12`) | none | none |
| `InsightsSection` | `insights` | `insights` | — | `{ insights: HomepageInsight[] }` (inline, `app/HomepageClient.tsx:475`) | none | none |
| `ServiceLinks` | `items` | `items` | — | `{ items: { slug: string }[] }` (inline, `app/HomepageClient.tsx:269`) | none | none |
| `ClusterCardBig` | `num, cluster, one_liner, items, left, top, motifSize` | all 7 | — | inline object type (`app/HomepageClient.tsx:295-303`) | none | none |
| `ClusterCardSmall` | `num, cluster, one_liner, items, left, top, motifSize` | all 7 | — | inline object type (`app/HomepageClient.tsx:337-345`) | none | none — **note:** `ClusterCardBig` and `ClusterCardSmall` have byte-identical prop signatures; only their JSX/styling differs (see §17 Code Smells) |
| `DiamondMotif` | `left, top, size, animate, playing` | `left, top, size` | `animate, playing` | `DiamondMotifProps` (`components-v2/ui/DiamondMotif.tsx:1-8`) | `animate = false`, `playing = true` (`DiamondMotif.tsx:14`) | none |
| `SiteHeader` | none | — | — | no props (`export default function SiteHeader()`) | — | — |
| `SiteFooter` | none | — | — | no props | — | — |
| `PreviewBanner` | `active, onExit` | — | both | `PreviewBannerProps { active?: boolean; onExit?: () => void }` (`components-v2/ui/PreviewBanner.tsx:5-8`) | `active = false` (`PreviewBanner.tsx:10`); `onExit` has no default, guarded with `disabled={!onExit}` | none |
| `ClientLayout` | `children` | `children` | — | `{ children: React.ReactNode }` | none | none |
| `RootLayout` | `children` | `children` | — | `Readonly<{ children: React.ReactNode }>` | none | none |

**Not found in codebase:** no component in this tree defines a prop it doesn't consume.

---

## 6. CMS Audit

Sanity **is** present, but touches only **one** of the 7 homepage sections (Insights).

- **Schemas** (`sanity/schemaTypes/`): `insight.ts`, `insightTheme.ts`, `industry.ts`, `page.ts`, plus `index.ts` (registry — not individually inspected beyond confirming these four).
- **Queries:** exactly one GROQ query touches the homepage — `LATEST_INSIGHTS_QUERY` in `app/page.tsx:17-25`.
- **Documents referenced:** `insight` (fetched), `insightTheme` (referenced by the query but **not wired into the `insight` schema** — see discrepancy below), `service` (referenced from `insight.relatedServices`/`serviceTags`, not used on homepage), `industry` (referenced from `insight.industryTags`, not used on homepage).
- **Portable Text:** `insight.ts` has `content` (`array of block`) and per-`sections[].body` (`array of block`) fields, consumed via `@portabletext/react` elsewhere in the app — **not** on the homepage; the homepage query only pulls `pt::text(...)` as a plain-text excerpt fallback (`app/page.tsx:22`).
- **Image fields:** `insight.heroImage` (`type: "image", options: { hotspot: true }`, `sanity/schemaTypes/insight.ts:71`) exists on the schema but **is not selected** by `LATEST_INSIGHTS_QUERY` — the homepage carousel never requests or renders an image for insights.
- **Slugs:** `insight.slug` (`type: "slug"`), read via `"slug": coalesce(slug.current, slug)` (`app/page.tsx:21`) — defensive against both slug-object and raw-string shapes.
- **Singletons:** Not found in codebase (no singleton document type detected in the four schema files inspected).
- **References:** `insight.relatedServices` → `service`, `insight.relatedSlugs` → `insight` (self-referencing), `insight.industryTags` → `industry`, `insight.serviceTags` → `service` — none of these are dereferenced by the homepage query.

**Discrepancy found:** the homepage query does `"category": coalesce(theme->title, category)` (`app/page.tsx:23`), which assumes an `insight.theme` reference field pointing at `insightTheme`. **`insight.ts`'s field list has no `theme` field** (`sanity/schemaTypes/insight.ts:8-71`) — only a plain `category` string. The `theme->title` half of the `coalesce` will always resolve to `null`/undefined for every document, silently falling through to `category`. Functionally harmless (GROQ dereferences of nonexistent fields just return null) but indicates either an unfinished migration toward theme-based categorization, or dead query logic.

---

## 7. Images Audit

| Image | Source | Storage | Rendering component | Optimization | Responsive | Lazy/Priority |
|---|---|---|---|---|---|---|
| Logo (header) | `/images/logo/Lockup_Horizontal_White.png` or `..._Navy.png` (swapped by scroll state) | `public/` | `SiteHeader` (`components-v2/layout/SiteHeader.tsx:104-115`) | `next/image`, fixed `width={1800} height={560}` | `className="h-8 w-auto sm:h-9"` (CSS-scaled) | `priority` (explicit, line 113) |
| Logo (footer) | `/images/logo/Lockup_Horizontal_Navy.png` | `public/` | `SiteFooter` (`components-v2/layout/SiteFooter.tsx:32-38`) | `next/image`, `width={1800} height={560}` | `className="h-8 w-auto"` | Not found — no `priority`/`loading` prop set (defaults to lazy) |
| Insights carousel images | **Not found in codebase.** `insight.heroImage` exists on the Sanity schema but the homepage GROQ query doesn't select it (§6) — the carousel renders category/title/dek/date text only, no image. | — | — | — | — | — |
| CTA band photograph | `/images/team/vankeno.jpg` | `public/` | *Was* `CtaBandSection` — **removed earlier this session** per explicit instruction (uncommitted). Panel is now `DiamondMotif` + navy gradient only. Asset file still exists on disk and is still referenced elsewhere (`src/sections/about/LeadershipSection.tsx:13`), so it is not an orphaned file. | was `next/image`, `fill`, `sizes="360px"` | was `object-cover` in an `aspect-[4/5]` frame | — |
| Diamond motif | Not an image — pure CSS (`border` + `transform: rotate(45deg)` on absolutely-positioned `<div>`s, no image asset at all) | — | `DiamondMotif` | N/A | N/A | N/A |
| OpenGraph image | `/images/og-image.jpg` | `public/` | Not rendered in-page; referenced only in `app/layout.tsx:36` `metadata.openGraph.images` for link-preview cards | N/A (meta tag, not `<img>`/`next/image`) | N/A | N/A |

**All homepage `<img>`-equivalent rendering uses `next/image`** (`Image` from `next/image`) — no raw `<img>` tags found in the homepage component tree.

---

## 8. Styling Audit

**Methodology:** Tailwind CSS v4 utility classes, near-exclusively, directly in JSX `className` strings (including many arbitrary-value utilities like `text-[clamp(2.25rem,1.6rem+2.6vw,3.25rem)]`, `bg-[linear-gradient(155deg,#0B355E_0%,#021024_78%)]`). `DiamondMotif` is the one exception — it builds inline `style={}` objects for its concentric rotated squares (`components-v2/ui/DiamondMotif.tsx:15-23`), because the geometry (`calc(${size} * ${scale})`) isn't expressible as static Tailwind classes.

No CSS Modules, no SCSS, no Emotion found in the homepage tree. `styled-components` is a listed dependency (`package.json`) but **zero files in the entire repository import it** (verified by repo-wide grep) — fully dead dependency.

**Per-section styling notes:**

| Section | Typography | Spacing | Container | Grid/Layout | Responsive | Animation/Hover |
|---|---|---|---|---|---|---|
| Hero | `font-[var(--font-heading)]`, `clamp()` fluid sizing | `clamp()` fluid padding | `max-w-[72rem]` centered | flex column, centered | `sm:px-16` breakpoint | `hover:bg-terracotta-hover` on CTA |
| Differentiators | same heading pattern | `clamp()` gaps | `max-w-[72rem]` | `flex flex-wrap`, `min-[…]` custom breakpoints via `flex-[48_1_0%]`/`flex-[52_1_0%]` | `sm:flex-row` at 640px | play/pause toggle button, `hover:scale`/`hover:bg` |
| Service Clusters | same | `clamp()` | `max-w-[72rem]` | `flex-col` → `min-[700px]:flex-row` (custom arbitrary breakpoint, not a Tailwind default) | custom `min-[700px]` | `hover:bg-terracotta-hover`, `hover:translate-x-0.5` |
| Point of View | same | `clamp()` | `max-w-[44rem]` | centered flex column | `sm:px-16` | `hover:translate-x-0.5 hover:underline` |
| Industries | same | `clamp()` | `max-w-[72rem]` | horizontal-scroll flex row (`overflow-x-auto`) | width % breakpoints at `sm:`/`lg:` | `lg:group-hover:h-full` reveal-on-hover card expansion (desktop-only, gated behind `lg:` prefix) |
| Insights | same | `clamp()` | `max-w-[72rem]` | `translateX` slide carousel via inline `style` | — | `transition: transform 300ms ease` unless `prefers-reduced-motion` |
| CTA Band | same | `clamp()` | full-width flex row/col | `md:flex-row`, `md:w-[44%]`/`md:w-[56%]` split | `md:` breakpoint | `hover:bg-navy-darkest/6`, `hover:bg-terracotta-hover` |

**Shared utility classes:** `text-eyebrow`, `text-navy-darkest`, `bg-terracotta`, `bg-[--color-paper]`, the `clamp(…)` fluid-type/spacing pattern, and the `DiamondMotif` component itself function as the de facto shared design-system primitives across all 7 sections.

---

## 9. Design System Audit

| Token category | Where defined | Evidence |
|---|---|---|
| Colors (brand) | `tailwind.config.ts:26-45` (JS theme extension) **and** `app/globals.css:32-150` (`:root` CSS custom properties) — **two parallel systems** | `tailwind.config.ts`: `navy.darkest = "#021024"`, `terracotta.DEFAULT = "#C17A46"`, `blue.mid/light/ice`, `eyebrow`. `globals.css`: `--color-navy-darkest: #021024`, `--color-terracotta: #C17A46`, etc. — same hex values, duplicated, not derived from one another. |
| Fonts | `app/layout.tsx:7-17` (next/font loaders define `--font-dm-sans`, `--font-playfair`) → consumed via `tailwind.config.ts:12-15` (`fontFamily.heading/body`) and directly via `var(--font-heading)`/`var(--font-body)` in `globals.css:38-39` | Confirmed identical fonts (DM Sans, Source Serif 4 aliased as "playfair") to the Cycle 4 design brief per memory. |
| Spacing scale | `app/globals.css:42-50` (`--space-4` … `--space-128`) | Largely **unused by the homepage** — `HomepageClient.tsx` uses `clamp()` arbitrary values instead of these tokens almost everywhere. |
| Border radius | `tailwind.config.ts:71-73` (`borderRadius.card = "4px"`), `globals.css:148` (`--radius-card: 4px`) | Homepage instead uses Tailwind default radii (`rounded-3xl`, `rounded-2xl`, `rounded-full`) rather than the `card` token. |
| Breakpoints | Tailwind defaults (`sm:`, `md:`, `lg:`) plus **custom arbitrary breakpoints** (`min-[700px]:`) inline in `HomepageClient.tsx:228,231,232` | No custom `screens` config found in `tailwind.config.ts` — the `min-[700px]` values are one-off arbitrary variants, not part of a documented scale. |
| Container widths | Ad hoc per-section: `max-w-[72rem]` (most sections), `max-w-[44rem]` (Point of View), vs. `tailwind.config.ts:67-69` (`maxWidth.content = "1200px"`, unused on homepage — `72rem` = 1152px, close but not identical) | `1200px` token and `72rem`/`1152px` actual usage are inconsistent (§17). |
| Shadow system | Inline arbitrary values only, e.g. `shadow-[0_24px_64px_-24px_rgba(2,16,36,.4)]` (`HomepageClient.tsx:151`), `shadow-[0_24px_64px_-20px_rgba(2,16,36,.5)]` (previously on the now-removed CTA photo) | `globals.css:149` defines `--shadow-card-hover` but it is **not used** anywhere in the homepage tree. |
| Animations | `@keyframes diamond-drift` (`globals.css:14-18`), `.animate-diamond-drift` (`globals.css:19-27`, respects `prefers-reduced-motion`) | Homepage's only true CSS keyframe animation; consumed by `DiamondMotif` when `animate` prop is set. |
| Tailwind configuration | `tailwind.config.ts` (JS-based `theme.extend`) — auto-discovered by `@tailwindcss/postcss` v4 even without an explicit `@config` directive in `globals.css` (verified: compiled `.next` CSS output contains `terracotta`/`navy-darkest` class names) | See `postcss.config.*` → `{ plugins: { "@tailwindcss/postcss": {} } }` |
| Global CSS | `app/globals.css` (1193 lines) | Only the first ~380 lines are live; lines 384-1193 are dead (§16). |
| CSS Variables | `app/globals.css:32-150` `:root` block | Large token surface; homepage only actually consumes a fraction of it (fonts, `--color-paper`, brand color hexes indirectly via Tailwind config duplication). |
| Theme Provider | **Not found in codebase.** No React context/provider wraps theme values — everything is static CSS variables + Tailwind config, no runtime theming (e.g., no dark-mode toggle; `globals.css:377-382` explicitly *disables* `prefers-color-scheme: dark` by re-pinning light values). |

---

## 10. Dependency Map

Homepage-relevant (`app/page.tsx` → `HomepageClient.tsx` → its full component tree):

| Dependency | Why it's used |
|---|---|
| `next` (`^16.2.6`) | Framework — App Router, `next/font`, `next/image`, `next/link`, `next/navigation`. |
| `react` / `react-dom` (`19.2.3`) | Component runtime; `useState`, `useSyncExternalStore` (in `useReducedMotionPreference`). |
| `groq` | Tagged-template GROQ query builder for the Insights query (`app/page.tsx:2,17`). |
| `@sanity/client` | `createClient()` for `lib/sanity/client.ts`. |
| `next-sanity` | Present in `package.json`; **not imported anywhere in the homepage path** — `lib/sanity/client.ts` builds its client from raw `@sanity/client`, not `next-sanity`'s helpers. Likely used by `/studio` route only (not audited here). |
| `server-only` | Guards `lib/sanity/client.ts` from being bundled client-side. |

Present in `package.json` but **not used anywhere in the homepage render path** (confirmed via repo-wide grep, not just homepage-scoped):
| Dependency | Note |
|---|---|
| `framer-motion` | Zero imports repo-wide. All homepage motion is CSS (`@keyframes`) or inline `style` transitions. Fully dead dependency. |
| `styled-components` | Zero imports repo-wide. Fully dead dependency. |
| `react-icons` | Not imported by `SiteHeader`/`SiteFooter`/`HomepageClient` — those hand-roll inline `<svg>` icons (`MenuIcon`, `CloseIcon` in `SiteHeader.tsx:293-310`). Not verified against non-homepage routes. |
| `@portabletext/react`, `@sanity/image-url`, `@sanity/vision`, `sanity` (studio), `zod`, `nodemailer`, `resend`, `@neondatabase/serverless` | Backend/CMS-studio/contact-form concerns — not part of the homepage render path. |

---

## 11. State Management Audit

- **React state:** `useState` in three places — `DifferentiatorsSection`'s `playing` (motif animation toggle, `HomepageClient.tsx:124`), `InsightsSection`'s `index` (carousel position, `HomepageClient.tsx:477`), `SiteHeader`'s `drawerOpen`/`navCollapsed`/`hasMounted`/`isSolid` (`SiteHeader.tsx:23-26`).
- **Context:** `BpCtx` (`lib/breakpoints.ts:10`) exists but is only *read* via `useBp()`; **no `<BpCtx.Provider>` found in the homepage tree** — `SiteHeader` uses `useBreakpoint()` (the resize-listener hook), not `useBp()`/context, so the context's default value (`"desktop"`) would apply to any consumer that did use `useBp()`. Effectively unused on this route.
- **Redux/Zustand:** Not found in codebase.
- **Server state:** The one Sanity fetch in `app/page.tsx` — no client-side re-fetching, no SWR/React Query. It's a one-shot server-side fetch on each request (`dynamic = "force-dynamic"`, `revalidate = 120` — these two directives are in tension; `force-dynamic` opts out of static/ISR caching entirely, making the `revalidate = 120` effectively moot for this route. Worth flagging, not fixing.).
- **Derived state:** `featured`/`supporting` in `IndustriesSection` (`.find()`/`.map()` over the imported `INDUSTRIES` const, recomputed every render — cheap, 11-item array, not memoized and doesn't need to be).
- **Memoization:** Not found in codebase — no `useMemo`/`useCallback`/`React.memo` anywhere in the homepage tree.
- **Suspense:** One instance — `<Suspense fallback={null}>` wrapping `PreviewBannerGate` in `ClientLayout.tsx:14-16`, needed because `useSearchParams()` requires a Suspense boundary in the App Router. Not used for data-fetching suspense.
- **Loading states:** Not found in codebase — no skeleton/spinner for the Insights section; if the Sanity fetch is slow, the whole Server Component await blocks the initial response (no `loading.tsx` found alongside `app/page.tsx`).

---

## 12. Performance Audit

- **Large components:** `app/HomepageClient.tsx` is 609 lines / 7 sections + 5 helper components in a single file — not "large" by bundle-size standards, but a single-file monolith for the entire homepage body.
- **Heavy rerenders:** Low risk. State is section-local (`playing`, `index`) — a click in `DifferentiatorsSection` doesn't rerender `InsightsSection`, since they're siblings with independent `useState`, not lifted to a shared parent.
- **Duplicate rendering:** `ClusterCardBig` and `ClusterCardSmall` are near-duplicate implementations (see §17) — not a runtime perf issue, but a maintenance/bundle-size one (two card renderers instead of one parametrized renderer).
- **Hydration boundaries:** The entire homepage is one client boundary — `HomepageClient.tsx` has `"use client"` at the top (`line 1`), meaning **all 7 sections hydrate as client components**, even though sections 1, 4, and 7 (Hero, Point of View, CTA Band) render zero interactive state and could be plain Server Components.
- **Client components that could be Server Components:** `HeroSection`, `PointOfViewSection`, `ServiceClustersSection`, `CtaBandSection`, `IndustriesSection` have no hooks, no event handlers requiring client execution — they only need client-side JS because they're colocated in a file whose top-level `"use client"` directive applies to everything in it. Only `DifferentiatorsSection` (motion toggle) and `InsightsSection` (carousel state) genuinely require client interactivity. Splitting the file would let ~5 of 7 sections ship as zero-JS Server Components.
- **Large bundles:** `framer-motion` and `styled-components` are dead weight in `package.json` (§10) — if either were accidentally imported in the future without tree-shaking awareness, they'd add non-trivial bundle size for zero benefit; today they cost nothing since nothing imports them.
- **Unoptimized images:** Not found — every image use on the homepage-and-chrome path goes through `next/image` (§7). Logo width/height (`1800×560`) are large intrinsic dimensions rendered at `h-8`/`h-9` (32-36px) — `next/image` handles responsive downscaling automatically via its `srcset` generation, so this is not a raw-`<img>`-style problem, but the *source* logo files themselves are sizeable PNGs (350-393KB each, per `ls -la` — see §7) for what renders as a ~150×36px logo; a smaller source asset (or WebP/SVG) would still reduce transferred bytes even with `next/image`'s optimization pipeline.
- **Expensive animations:** `DiamondMotif`'s `animate-diamond-drift` only animates one of its four `<div>` rings (`components-v2/ui/DiamondMotif.tsx:30-35`) via `transform`/no layout properties — GPU-cheap, respects `prefers-reduced-motion` (`globals.css:25-27`) and an explicit pause button (`DifferentiatorsSection`). The Industries section's hover-reveal (`lg:group-hover:h-full`) animates `height`, which is a layout-triggering property rather than `transform`/`opacity` — more expensive than necessary, though scoped to `lg:` (desktop hover only) and a handful of cards.

---

## 13. Code Smells

- **Duplicate UI:** `ClusterCardBig` (`HomepageClient.tsx:287-327`) and `ClusterCardSmall` (`HomepageClient.tsx:329-369`) are structurally identical components (same props, same `DiamondMotif` + header + `ServiceLinks` + CTA `Link` shape) differing only in Tailwind size classes. A single component taking a `variant: "big" | "small"` prop would collapse ~80 lines to ~45.
- **Repeated colors:** The brand palette is defined **twice** — once in `tailwind.config.ts:26-45` (JS), once in `app/globals.css:112-124` (CSS vars) — with matching hex values but no single source of truth (§9). A change to `#021024` would require editing both files to stay in sync.
- **Magic numbers:** Every section uses hand-picked `clamp(Xpx,Yvw,Zpx)` values inline (dozens of distinct clamp expressions across the file) rather than referencing the `--space-*` scale already defined in `globals.css:42-50`. E.g. `clamp(64px,8vw,96px)` appears verbatim at `HomepageClient.tsx:129,191,220,376,406,459,482` (7 times) — a candidate for a shared `--section-padding-y` token, especially since `globals.css:146` already defines an unused `--section-vertical: var(--space-96)`.
- **Repeated spacing:** Same as above — the fluid clamp values are copy-pasted per section rather than centralized.
- **Hardcoded strings:** All homepage copy (headlines, body text, button labels) is inline JSX string literals — expected for a non-CMS-driven page, but means any copy change requires a code deploy, including the phone number `254793995142` which appears in **two places** (`HomepageClient.tsx:588` CTA band, `SiteFooter.tsx:80` footer) with no shared constant.
- **Unused imports:** Not found currently in `HomepageClient.tsx` (the `next/image` import was removed earlier this session along with the CTA photo it supported — verified no other `Image` usage remains in the file).
- **Dead code:** `app/globals.css:384-1193` — ~810 lines (68% of the file) of fully unreferenced CSS classes for what appears to be an earlier/alternate homepage design (`.constellation-hero`, `.mandate-section`, `.capabilities-section`, `.insights-dark-section`, `.industries-section__*` grid, `.homepage-cta`). Confirmed via repo-wide grep: zero `.tsx`/`.ts`/`.jsx` files reference any of these class names. See §16 for detail.
- **Commented code:** Not found in `HomepageClient.tsx`, `SiteHeader.tsx`, `SiteFooter.tsx`, `DiamondMotif.tsx`, `ClientLayout.tsx`, or `app/layout.tsx`.
- **Inconsistent naming:** `cardCopy(clusterId)` returns `{ one_liner, items }` — `one_liner` is `snake_case` inside an otherwise `camelCase` codebase (`HomepageClient.tsx:213`). The container-width tokens are also inconsistent: `tailwind.config.ts` defines `maxWidth.content = "1200px"` but the homepage never uses `max-w-content` — it uses `max-w-[72rem]` (1152px) throughout instead (§9), a ~48px unexplained discrepancy from the documented token.
- **Overly large components:** `app/HomepageClient.tsx` at 609 lines holding 7 sections + 5 sub-components is large for a single file, though each individual function is reasonably scoped (20-95 lines).
- **Repeated layouts:** The "navy gradient panel + `DiamondMotif` + white content card" pattern recurs in Hero, Service Clusters (×3), Industries (×4), Insights (×N), and CTA Band — always hand-built inline rather than factored into a shared `NavyPanel`/`DiamondCard` wrapper component. Given `DiamondMotif` is already extracted, this is the natural next extraction if a redesign touches multiple sections.
- **Broken abstractions:** The `ClusterCardBig`/`ClusterCardSmall` split (see "Duplicate UI" above) is the clearest case — two names implying a meaningful behavioral distinction, but the actual difference is purely cosmetic sizing.

---

## 14. Content Classification

| Content | Classification | Evidence |
|---|---|---|
| Hero headline/body/CTA labels | Hardcoded | `HomepageClient.tsx:79,88-91,97,103` |
| Differentiators (3 cards) | Hardcoded | `DIFFERENTIATORS` const, `HomepageClient.tsx:35-48` |
| Service cluster labels/descriptions | Configuration (static TS data module, not CMS) | `src/sections/services/data.ts` — explicitly documented as "FALLBACK DATA," imported unconditionally, so functionally it's the live source despite the comment |
| Service cluster one-liners | Hardcoded (deliberately kept out of the CMS-fallback module) | `CLUSTER_ONE_LINERS` const, `HomepageClient.tsx:15-20`, with its own comment: *"Presentation-only copy that doesn't belong in the CMS fallback data"* |
| Point of View quote | Hardcoded | `HomepageClient.tsx:379` |
| Industries content (titles/descriptions) | Configuration (static TS data module) | `src/sections/industries/data.ts` |
| Which 4 industries appear on homepage | Configuration (hardcoded ID list) | `FEATURED_INDUSTRY_ID`, `SUPPORTING_INDUSTRY_IDS`, `HomepageClient.tsx:50-51` |
| Insights carousel content | **API response (Sanity CMS)** | `app/page.tsx:17-39` — the only CMS-editable content on the homepage |
| CTA band headline/body/WhatsApp link | Hardcoded | `HomepageClient.tsx:581,584,588` |
| Logo images | Static asset | `public/images/logo/*.png` |
| OG image | Static asset | `public/images/og-image.jpg`, referenced from `app/layout.tsx:36` |
| Sanity project ID / dataset / API version | Environment variable (with hardcoded fallback) | `lib/sanity/client.ts:20-23` — `safeEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "placeholder")` etc. |
| Page `revalidate`/`dynamic` behavior | Configuration (code constant) | `app/page.tsx:6-7` |

---

## 15. Redesign Risk Assessment

| Section | Risk | Reason |
|---|---|---|
| Hero | **Low** | Fully static, self-contained, single consumer (`data-homepage-hero` selector is read by `SiteHeader`'s scroll logic — see cross-section coupling note below, which raises this from trivial to low rather than zero). |
| Differentiators | **Low** | Static content + self-contained local state (play/pause). No external consumers. |
| Service Clusters | **Medium** | Pulls from `src/sections/services/data.ts`, which is shared fallback data — likely also consumed by a dedicated `/services` page/route. Changing that data module's shape to support a redesign could ripple beyond the homepage. `ClusterCardBig`/`ClusterCardSmall` duplication (§17) makes structural changes error-prone (must edit two near-identical components in sync). |
| Point of View | **Low** | Fully static, single `Link`, no shared data. |
| Industries | **Medium** | Pulls from `src/sections/industries/data.ts`, shared with (per the file's broader contents — `PHILOSOPHY_CARDS`, `SECTOR_INSIGHTS`, `FILTER_CATEGORIES`, etc.) what is very likely an `/industries` listing/detail page. The homepage only touches `INDUSTRIES`, `IndustryData`, but the data module itself is large and multi-purpose — redesigning homepage industry cards is low-risk in isolation *if* only the homepage-side JSX changes, but risky if the underlying data shape needs to change. |
| Insights | **High** | The only CMS-wired section — touches `app/page.tsx`'s server fetch, the GROQ query, the `HomepageInsight` type (exported from `page.tsx` and imported by `HomepageClient.tsx:8`), and Sanity schema assumptions (including the unresolved `theme->title` discrepancy in §6). A redesign that changes what data the carousel needs (e.g., adding hero images) requires touching the query, the type, and possibly the schema — three coordinated changes instead of one. |
| CTA Band | **Low** | Static content; the photograph was already removed this session, simplifying its risk profile further — it's now just navy + `DiamondMotif`, structurally identical to the pattern used elsewhere on the page. |
| **Cross-cutting: `DiamondMotif`** | **Medium** | Used in every section — a visual redesign that drops or fundamentally changes the diamond motif touches all 7 sections' JSX simultaneously, even though the component itself is tiny and self-contained. |
| **Cross-cutting: `SiteHeader` ↔ Hero coupling** | **Medium** | `SiteHeader` queries `document.querySelector('[data-homepage-hero]')` at runtime (`SiteHeader.tsx:57`) to compute scroll-based nav solidity, keyed to `heroHeight * 0.8` — this is a real (if loosely coupled, DOM-attribute-based) dependency from the header on the hero section's DOM structure existing and being tall. Removing/restructuring the hero without preserving the `data-homepage-hero` attribute and its height would silently break header scroll behavior sitewide-on-homepage. |
| **Cross-cutting: dead CSS (`globals.css:384-1193`)** | **Low risk to leave, but relevant to redesign planning** | Doesn't affect current rendering (confirmed zero references), but a redesign that reuses old naming conventions (e.g., someone writing a new `.homepage-cta` class not realizing one already exists unused) could silently collide with — or be confused for — this dead block. Worth a cleanup pass before or during redesign work, not during this audit (out of scope — read-only). |

---

## 16. Dead CSS Detail (supporting §12/§13/§15)

`app/globals.css:384-1193` defines a complete alternate homepage stylesheet under BEM-style naming, structured as 6 numbered sections:
1. `.constellation-hero*` (lines 387-561) — canvas-based hero with typing cursor, scroll indicator
2. `.mandate-section*` (567-667) — 50/50 image-split section
3. `.capabilities-section*` (672-810) — numbered vertical list
4. `.insights-dark-section*` (815-967) — 3-column grid insights
5. `.industries-section*` (972-1097) — 4-column grid (distinct from the live carousel-style `IndustriesSection`)
6. `.homepage-cta*` (1102-1185) — different CTA treatment (single centered column, not the live 44/56 split)

None of these class names appear in any `.tsx`/`.ts`/`.jsx` file repo-wide (verified by grep). This is almost certainly a prior homepage implementation (pre-dating or an earlier draft of the Cycle 4 diamond-motif rebuild referenced in project memory) that was superseded by the current Tailwind-utility-first `HomepageClient.tsx` but never removed from `globals.css`.

---

## Summary

The homepage is a **7-section, mostly-static, single-file** (`app/HomepageClient.tsx`) client component tree, fed by one Server Component (`app/page.tsx`) that does exactly one CMS fetch (latest 3 published Insights from Sanity). Two local TS data modules (`services/data.ts`, `industries/data.ts`) supply the Services and Industries sections — nominally "CMS fallback" data but functionally the live source, since nothing in the homepage path branches on a real Sanity fetch for either. Styling is Tailwind v4 utility-first with a duplicated (JS config + CSS vars) but internally consistent color/font token set. The most significant structural findings for redesign planning are: (1) the entire file is one client boundary when ~5 of 7 sections don't need to be, (2) `ClusterCardBig`/`ClusterCardSmall` are near-duplicate components, (3) `app/globals.css` is 68% dead code from what looks like a prior homepage design, and (4) the Insights section carries the only real CMS coupling and the only unresolved schema discrepancy (`theme->title` on a schema with no `theme` field).
