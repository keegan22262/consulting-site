# Homepage Component Dependency Graph

Read-only reverse-engineering of the `/` component tree, built from the same source inspection as `HOMEPAGE_AUDIT.md`. No files were changed to produce this document.

**A note on "Server or Client Component" classification:** Next.js App Router determines this by *how* a component enters the tree, not only by whether its own file has `"use client"`. A Server Component passed to a Client Component via the `children` prop stays server-rendered. A component *directly imported and called* by a Client Component module — even with no `"use client"` of its own and no hooks — is bundled and executed as part of that client tree, because it's not entering via the `children` escape hatch. Two components below (`SiteFooter`, `DiamondMotif`) hit exactly this case: no directive, no hooks, but always invoked directly from within an already-client module, so they are Client Components in practice. `Home` (`app/page.tsx`) is the one component in this tree that *does* use the `children`-prop escape hatch (`RootLayout` → `ClientLayout` → `{children}` → `Home`), which is why it's allowed to be `async` and call a `server-only`-guarded Sanity client.

---

## ASCII Dependency Tree

```
RootLayout                                          app/layout.tsx                         [Server]
└─ ClientLayout                                     app/ClientLayout.tsx                    [Client]
   ├─ SiteHeader                                    components-v2/layout/SiteHeader.tsx      [Client]
   │  ├─ Image (logo, next/image)
   │  ├─ Link ×N (NAV_LINKS, next/link)
   │  ├─ MenuIcon                                   (internal, SiteHeader.tsx)                [Client]
   │  └─ MobileDrawer                               (internal, SiteHeader.tsx)                [Client]
   │     ├─ Link ×N (NAV_LINKS)
   │     └─ CloseIcon                               (internal, SiteHeader.tsx)                [Client]
   │
   ├─ {children} ⇒ Home                             app/page.tsx                             [Server, async]
   │  └─ HomepageClient                              app/HomepageClient.tsx                   [Client]
   │     ├─ HeroSection                             (internal)                                [Client*]
   │     │  ├─ DiamondMotif ×1                      components-v2/ui/DiamondMotif.tsx         [Client**]
   │     │  └─ Link ×2 (next/link)
   │     │
   │     ├─ DifferentiatorsSection                  (internal)                                [Client]
   │     │  ├─ DiamondMotif ×1 (animate=true)
   │     │  └─ Link ×1
   │     │
   │     ├─ ServiceClustersSection                  (internal)                                [Client*]
   │     │  ├─ ClusterCardBig                       (internal)                                [Client*]
   │     │  │  ├─ DiamondMotif ×1
   │     │  │  ├─ ServiceLinks                      (internal)                                [Client*]
   │     │  │  │  └─ Link ×N
   │     │  │  └─ Link ×1
   │     │  ├─ ClusterCardSmall ×2                  (internal)                                [Client*]
   │     │  │  ├─ DiamondMotif ×1 (each)
   │     │  │  ├─ ServiceLinks
   │     │  │  └─ Link ×1 (each)
   │     │  ├─ DiamondMotif ×1 (cluster #4, inline block)
   │     │  ├─ ServiceLinks (cluster #4)
   │     │  └─ Link ×2
   │     │
   │     ├─ PointOfViewSection                      (internal)                                [Client*]
   │     │  └─ Link ×1
   │     │
   │     ├─ IndustriesSection                       (internal)                                [Client*]
   │     │  ├─ DiamondMotif ×1 (section-level)
   │     │  ├─ DiamondMotif ×1 + Link ×1 (featured card)
   │     │  ├─ DiamondMotif ×3 + Link ×3 (supporting cards)
   │     │  └─ Link ×1 ("See all 11 sectors")
   │     │
   │     ├─ InsightsSection (conditional: insights.length > 0)  (internal)                    [Client]
   │     │  ├─ DiamondMotif ×N (one per slide)
   │     │  └─ button ×(N+2) (prev/next/dots)
   │     │
   │     └─ CtaBandSection                          (internal)                                [Client*]
   │        ├─ Link ×2
   │        └─ DiamondMotif ×1
   │
   ├─ SiteFooter                                    components-v2/layout/SiteFooter.tsx       [Client**]
   │  ├─ Image (logo, next/image)
   │  └─ Link ×N (sitemap, company, social, legal)
   │
   └─ Suspense
      └─ PreviewBannerGate                          (internal, app/ClientLayout.tsx)          [Client]
         └─ PreviewBanner                           components-v2/ui/PreviewBanner.tsx        [Client]

  [Client*]  = no hooks/state of its own; client-only because it's a function defined inside
              app/HomepageClient.tsx, which has a file-level "use client" directive
  [Client**] = no "use client" directive and no hooks; client-only because it's imported and
              called directly by an already-client module (see note above)
```

---

## Dependency Table

| Component | File path | Parent | Children | Imported modules | Export type | Server/Client | Props | Data source | Styling method | Images used |
|---|---|---|---|---|---|---|---|---|---|---|
| `RootLayout` | `app/layout.tsx` | — (route root) | `ClientLayout` | `next` (`Metadata` type), `next/font/google` (`DM_Sans`, `Source_Serif_4`), `./ClientLayout`, `./globals.css` | default | **Server** | `{ children: React.ReactNode }` | Hardcoded `organizationSchema` object (JSON-LD) | Tailwind (`className` on `<html>`/`<body>`), `next/font` CSS variables | None rendered; one image URL string referenced inside JSON-LD (`/images/logo/Lockup_Icon_White.png`) — not an `<img>`/`Image` |
| `ClientLayout` | `app/ClientLayout.tsx` | `RootLayout` | `SiteHeader`, `{children}` (→ `Home`), `SiteFooter`, `Suspense`→`PreviewBannerGate` | `react` (`Suspense`), `@/components-v2/layout/SiteHeader`, `@/components-v2/layout/SiteFooter`, `@/components-v2/ui/PreviewBanner`, `next/navigation` (`useRouter`, `useSearchParams`) | default | **Client** (`"use client"`) | `{ children: React.ReactNode }` | None | None (pure structural wrapper) | None |
| `PreviewBannerGate` | `app/ClientLayout.tsx` (internal, not exported) | `ClientLayout` (inside `Suspense`) | `PreviewBanner` | inherits file-top imports (`useRouter`, `useSearchParams`) | not exported | **Client** | none | URL search param `preview` | None | None |
| `Home` | `app/page.tsx` | `ClientLayout` (via `{children}`) | `HomepageClient` | `next` (`Metadata` type), `groq`, `./HomepageClient`, `@/lib/sanity/client` (`sanityClient`) | default (`async function Home`) | **Server**, async | none (route entry) | Sanity CMS — `LATEST_INSIGHTS_QUERY` GROQ fetch | None | None |
| `HomepageClient` | `app/HomepageClient.tsx` | `Home` | `HeroSection`, `DifferentiatorsSection`, `ServiceClustersSection`, `PointOfViewSection`, `IndustriesSection`, `InsightsSection` (conditional), `CtaBandSection` | `react` (`useState`), `next/link`, `@/components-v2/ui/DiamondMotif`, `@/src/lib/motion/useReducedMotionPreference`, `@/src/sections/services/data` (`CLUSTERS`, `SERVICES`), `@/src/sections/industries/data` (`INDUSTRIES`), `type HomepageInsight` from `./page` | default | **Client** (`"use client"`) | `HomepageClientProps { insights: HomepageInsight[] }` | Prop-drilled Sanity data (`insights`) + module-level static consts | Tailwind (utility classes, incl. many `[arbitrary-value]` clamps/gradients) | None (removed earlier this session; see `HOMEPAGE_AUDIT.md` §7) |
| `HeroSection` | `app/HomepageClient.tsx` (internal) | `HomepageClient` | `DiamondMotif`, `Link` ×2 | none beyond file-top imports | not exported | **Client\*** | none | Hardcoded strings | Tailwind | None |
| `DifferentiatorsSection` | `app/HomepageClient.tsx` (internal) | `HomepageClient` | `DiamondMotif`, `button` (play/pause toggle) | `useState`, `useReducedMotionPreference` (file-top) | not exported | **Client** (own `useState`) | none | `DIFFERENTIATORS` const (module-level, static) | Tailwind + inline `style` (`clipPath` polygons) | None |
| `ServiceClustersSection` | `app/HomepageClient.tsx` (internal) | `HomepageClient` | `ClusterCardBig`, `ClusterCardSmall` ×2, `DiamondMotif`, `ServiceLinks`, `Link` | `CLUSTERS`, `SERVICES` (file-top) | not exported | **Client\*** | none | `CLUSTERS`/`SERVICES` (`src/sections/services/data.ts`) + `CLUSTER_ONE_LINERS` const | Tailwind | None |
| `ClusterCardBig` | `app/HomepageClient.tsx` (internal) | `ServiceClustersSection` | `DiamondMotif`, `ServiceLinks`, `Link` | none additional | not exported | **Client\*** | `{ num, cluster, one_liner, items, left, top, motifSize }` | Props (derived from `CLUSTERS`/`SERVICES` by parent) | Tailwind | None |
| `ClusterCardSmall` | `app/HomepageClient.tsx` (internal) | `ServiceClustersSection` | `DiamondMotif`, `ServiceLinks`, `Link` | none additional | not exported | **Client\*** | `{ num, cluster, one_liner, items, left, top, motifSize }` (identical shape to `ClusterCardBig`) | Props | Tailwind | None |
| `ServiceLinks` | `app/HomepageClient.tsx` (internal) | `ClusterCardBig`, `ClusterCardSmall`, `ServiceClustersSection` (cluster #4 inline block) | `Link`, `span` | uses module-level `SERVICE_SHORT_LABELS` const | not exported | **Client\*** | `{ items: { slug: string }[] }` | Props + `SERVICE_SHORT_LABELS` const | Tailwind | None |
| `PointOfViewSection` | `app/HomepageClient.tsx` (internal) | `HomepageClient` | `Link` | none additional | not exported | **Client\*** | none | Hardcoded string | Tailwind | None |
| `IndustriesSection` | `app/HomepageClient.tsx` (internal) | `HomepageClient` | `DiamondMotif` ×5, `Link` ×N | `INDUSTRIES` (file-top) | not exported | **Client\*** | none | `INDUSTRIES` (`src/sections/industries/data.ts`) + `FEATURED_INDUSTRY_ID`/`SUPPORTING_INDUSTRY_IDS` consts | Tailwind | None |
| `InsightsSection` | `app/HomepageClient.tsx` (internal) | `HomepageClient` (conditional: `insights.length > 0`) | `DiamondMotif` ×N (per slide), `button` ×(N+2) | `useState`, `useReducedMotionPreference` | not exported | **Client** (own `useState`) | `{ insights: HomepageInsight[] }` | Sanity CMS, prop-drilled from `Home` | Tailwind + inline `style` (`transform: translateX`, `transition`) | None (schema has `heroImage` field; homepage query doesn't select it) |
| `CtaBandSection` | `app/HomepageClient.tsx` (internal) | `HomepageClient` | `Link` ×2, `DiamondMotif` | none additional | not exported | **Client\*** | none | Hardcoded strings | Tailwind | None (photograph removed earlier this session) |
| `DiamondMotif` | `components-v2/ui/DiamondMotif.tsx` | `HeroSection`, `DifferentiatorsSection`, `ClusterCardBig`, `ClusterCardSmall`, `ServiceClustersSection` (cluster #4), `IndustriesSection` (×5), `InsightsSection` (×N), `CtaBandSection` | none (renders 4 `<div>`s, no sub-components) | none | default | **Client\*\*** (no directive, no hooks; client because directly imported by client modules) | `DiamondMotifProps { left: string; top: string; size: string; animate?: boolean; playing?: boolean }` | Props only | Inline `style` objects (computed geometry: `calc()`, `rotate(45deg)`, `border`) + one Tailwind/CSS-keyframe class (`animate-diamond-drift`, defined in `app/globals.css:19-27`) | None (pure CSS borders, no image assets) |
| `SiteHeader` | `components-v2/layout/SiteHeader.tsx` | `ClientLayout` | `Image` (logo), `Link` ×N, `MenuIcon`, `MobileDrawer` | `react` (`useEffect`, `useRef`, `useState`), `@/lib/breakpoints` (`useBreakpoint`), `next/image`, `next/link`, `next/navigation` (`usePathname`) | default | **Client** (`"use client"`) | none | `NAV_LINKS`/`NAV_HREFS` consts (static) + runtime `pathname`/scroll position/`document.querySelector('[data-homepage-hero]')` | Tailwind | `/images/logo/Lockup_Horizontal_White.png`, `/images/logo/Lockup_Horizontal_Navy.png` (swapped via `isSolid` state) |
| `MobileDrawer` | `components-v2/layout/SiteHeader.tsx` (internal) | `SiteHeader` | `Link` ×N, `CloseIcon` | `useEffect`, `useRef` (file-top) | not exported | **Client** | `{ open: boolean; onClose: () => void; activePage?: string }` | `NAV_LINKS` const + props | Tailwind | None |
| `MenuIcon` | `components-v2/layout/SiteHeader.tsx` (internal) | `SiteHeader` | none (raw `<svg>`) | none | not exported | **Client\*** | none | None | Tailwind (`className` on `<svg>`) | None (inline SVG) |
| `CloseIcon` | `components-v2/layout/SiteHeader.tsx` (internal) | `MobileDrawer` | none (raw `<svg>`) | none | not exported | **Client\*** | none | None | Tailwind (`className` on `<svg>`) | None (inline SVG) |
| `SiteFooter` | `components-v2/layout/SiteFooter.tsx` | `ClientLayout` | `Image` (logo), `Link` ×N | `next/image`, `next/link` | default | **Client\*\*** (no directive, no hooks; client because directly imported by `ClientLayout`) | none | `SITEMAP_LINKS`/`COMPANY_LINKS`/`LEGAL_LINKS` consts (static) + `new Date().getFullYear()` at render time | Tailwind | `/images/logo/Lockup_Horizontal_Navy.png` |
| `PreviewBanner` | `components-v2/ui/PreviewBanner.tsx` | `PreviewBannerGate` | `button` | `react` (`useState`) | default | **Client** (`"use client"`) | `PreviewBannerProps { active?: boolean; onExit?: () => void }` | Props (driven by URL search param upstream) | Inline `style` objects only (no Tailwind classes; uses `var(--o600)`, `var(--font-primary)`, `var(--text-caption)` CSS vars) | None |

---

## Supporting (Non-Component) Modules

Referenced in the "Imported modules" column above but not components themselves — included for completeness since they materially shape props/data-source columns:

| Module | File path | Type | Used by | Purpose |
|---|---|---|---|---|
| `useReducedMotionPreference` | `src/lib/motion/useReducedMotionPreference.ts` | Client hook (`"use client"`, `useSyncExternalStore`) | `DifferentiatorsSection`, `InsightsSection` | Reads `(prefers-reduced-motion: reduce)` media query |
| `useBreakpoint` / `useBp` / `BpCtx` | `lib/breakpoints.ts` | Client hook + unused `Context` (`"use client"`) | `SiteHeader` (`useBreakpoint` only — `useBp`/`BpCtx` have no provider mounted in this tree) | Resize-listener-based mobile/tablet/desktop detection |
| `sanityClient` | `lib/sanity/client.ts` | Server-only module (`import "server-only"`) | `Home` (`app/page.tsx`) | Sanity `@sanity/client` instance, env-configured |
| `CLUSTERS`, `SERVICES` | `src/sections/services/data.ts` | Static TS data (no export type — plain consts) | `HomepageClient` → `ServiceClustersSection` | "Fallback" data module, used unconditionally as the live source on this route |
| `INDUSTRIES` | `src/sections/industries/data.ts` | Static TS data | `HomepageClient` → `IndustriesSection` | Same pattern as `CLUSTERS`/`SERVICES` |
| `HomepageInsight` (type) | `app/page.tsx` (named export) | TS type only, no runtime | `HomepageClient`, `InsightsSection` | Shape of a Sanity-fetched insight after `page.tsx`'s query/filter |

---

## Summary Stats

- **Total component nodes:** 22 (9 in dedicated files, 13 defined inline inside `HomepageClient.tsx` or `SiteHeader.tsx`)
- **True Server Components:** 2 (`RootLayout`, `Home`)
- **Client Components (own directive):** 6 (`ClientLayout`, `HomepageClient`, `SiteHeader`, `PreviewBanner`, plus `DifferentiatorsSection`/`InsightsSection` which inherit the directive *and* additionally hold their own `useState`)
- **Client by inheritance only** (`[Client*]` — no own directive needed because defined inside an already-`"use client"` file): 12
- **Client by import-boundary rule** (`[Client**]` — no directive anywhere, no hooks, client only because a Client Component imports and calls them directly rather than receiving them via `children`): 2 (`SiteFooter`, `DiamondMotif`)
- **Most-reused component:** `DiamondMotif` — rendered from 8 distinct call sites across 7 sections, ~13+ total instances counting loops (Industries ×5, Insights ×N slides)
- **Only CMS-connected component:** `InsightsSection` (indirectly, via prop-drilled `insights` from `Home`)
