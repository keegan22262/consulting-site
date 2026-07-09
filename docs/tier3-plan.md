# Cycle 3 — Component System Consolidation Plan

> **Status:** ANALYSIS ONLY. No code changed. This document is the sole deliverable.
> Executive summary is at the top; supporting analysis (Steps 1–7) follows.

---

## Executive Summary

**The premise "two parallel component systems" is only half true.** The two trees
are not rival implementations — they are **layers**. The dependency graph proves
it: `src/sections/` imports from `components-v2/` **100 times**; `components-v2/`
imports from `src/sections/` **once** (a data import, no cycle). `components-v2/`
is the shared **library** (hooks, site chrome, UI, section primitives);
`src/sections/` is the **page-body** layer built on top of it, and it is what the
routes and the approved homepage spec actually use.

The real problem is narrower and cheaper than a migration: **37 of ~56 files in
`components-v2/sections/` are abandoned first-draft page bodies with ZERO
importers** — dead code that `src/sections/` superseded. That dead half is what
*looks* like a second parallel system.

**Canonical target:** Keep **both**, with a hard role boundary —
**`components-v2/` = shared library, `src/sections/` = pages.** For the
overlapping concern (page composition) the winner is **`src/sections/`** (routes
point there, `docs/cycle2.md` sources its data from there, and 99/100 cross-tree
edges already flow the correct page→library direction). Consolidation = (1)
delete 37 dead files, (2) cut the 1 back-edge, (3) unify the one split route
(`insights/[slug]`).

**Increment count:** **7 PRs** (~1–1.5 days), +1 optional rename.
- Phase A: 4 PRs of provably-dead deletion (near-zero risk).
- Phase B: 1 PR to cut the cross-tree back-edge.
- Phase C: 2 PRs to unify the split Insight-detail route (needs visual verify).
- Phase D: optional `components-v2/`→`components/` rename.

**Should Cycle 3 precede the homepage rebuild?** **Partly — yes, run Phase A
first.** The dead-code deletion is pure cleanup with zero route impact; doing it
before the homepage shrinks the surface and removes misleading dead drafts
(`HeroSection`, `InsightsHeroSection`, etc.) that could confuse the rebuild.
Phases B–C touch only `/insights/[slug]` and are independent of the homepage, so
they can run in parallel with or after it. Nothing in Cycle 3 touches
`ConstellationHero`, `HomepageClient`, or any `data.ts` the homepage reads, so
the two efforts don't collide. **Recommendation: Phase A before homepage; B–C
any time.**

**Top 3 risks:**
1. **CMS-fallback coupling (R2):** `src/sections/*/data.ts` are *live runtime
   fallbacks* (`cmsServices ?? SERVICES`) and the homepage's data source — never
   delete one; the plan only *moves* `INSIGHTS_DATA` (B1).
2. **Name collisions in Phase C (R5):** duplicate `InsightsHeroSection` /
   `InsightRelated*` names across trees can silently mis-resolve; mitigate with
   small verified PRs that delete the v2 original in the same PR as the move.
3. **API data-access divergence (R1):** `/api/services` (shim) vs `/api/insights`
   (module+remap) vs `/api/industries` (inline GROQ) is a *separate axis* —
   freeze the `useX()` hook contracts and defer API normalization to its own tier
   so it doesn't creep into Cycle 3.

---

## Step 1 — Route-to-System Map

Two live component trees:

- **`components-v2/`** (aliased `@/components-v2/...`) — 73 files
- **`src/sections/`** (aliased `@/src/sections/...`) — 73 files

**Global shell:** `app/layout.tsx` → `app/ClientLayout.tsx` imports `SiteHeader`,
`SiteFooter`, `PreviewBanner` — **all from `components-v2/`**. So *every* route
transitively depends on `components-v2/` for its chrome, even routes whose body
is built entirely from `src/sections/`.

| Route | components-v2 imports | src/sections imports | BOTH? |
|---|---|---|---|
| `app/layout.tsx` → `ClientLayout.tsx` | SiteHeader, SiteFooter, PreviewBanner | — | v2 only (global) |
| `app/page.tsx` → `HomepageClient.tsx` | ConstellationHero | — | v2 only |
| `app/about/page.tsx` | — | AboutHeroSection, InstitutionalContextSection, PhilosophySection, MissionClientSegmentsSection, LeadershipSection, DeliveryArchitectureSection, InstitutionalFootprintSection, AboutCTASection | sections only |
| `app/coverage/page.tsx` | — | CoverageHero, CoverageContextLine, CoverageMatrixSection, CoverageCTASection, CoveragePainPointsSection, CoverageDifferentiatorsSection, CoverageProgressiveIntelligenceSection | sections only |
| `app/industries/page.tsx` | — | IndustriesPageClient | sections only |
| `app/industries/[slug]/page.tsx` | — | IndustryDetailSections, INDUSTRIES, INDUSTRY_IMAGES, INSIGHTS_DATA, SERVICES | sections only |
| `app/services/page.tsx` | — | ServicesPageClient | sections only |
| `app/services/[slug]/page.tsx` | — | ServiceDetailSections, CAPABILITIES | sections only |
| `app/insights/page.tsx` | — | InsightsPageClient | sections only |
| `app/insights/[slug]/page.tsx` | InsightInDevelopmentPlaceholder, InsightsDetailHeroSection, InsightsRelatedSection, CTABlock, RelatedKnowledge/ExploreRelatedKnowledge | InsightBodySection, InsightDataHighlightsSection (type), InsightRelatedServicesSection, CASE_STUDIES, INSIGHTS_DATA, InsightRelatedIndustriesSection, InsightRelatedEngagementsSection, TranslateInsightSection | **⚠ BOTH** |
| `app/case-studies/[slug]/page.tsx` | CTABlock | CaseStudyBody, CaseStudyHero, CASE_STUDIES, INSIGHTS_DATA | **⚠ BOTH** |
| `app/search/page.tsx` | IndustryCard, ServiceCard, Button | — | v2 only |
| `app/contact/page.tsx` | ScrollReveal | — | v2 only |
| `app/insights/error.tsx` | Button | — | v2 only |
| `app/services/error.tsx` | Button | — | v2 only |
| `app/careers/page.tsx` | — | — | neither (static / inline) |
| `app/how-we-work/page.tsx` | — | — | neither |
| `app/privacy/page.tsx` | — | — | neither |
| `app/privacy-policy/page.tsx` | — | — | neither |
| `app/terms/page.tsx` | — | — | neither |
| `app/legal-notices/page.tsx` | — | — | neither |
| `app/regulatory-disclosures/page.tsx` | — | — | neither |
| `app/admin/submissions/page.tsx` | — | — | neither |
| `app/studio/[[...tool]]/page.tsx` | — | — | neither (Sanity Studio) |

### Findings

- **2 routes import from BOTH systems in the same file:**
  `app/insights/[slug]/page.tsx` (the worst offender — 5 v2 + 8 sections) and
  `app/case-studies/[slug]/page.tsx`.
- **`components-v2/` owns the global chrome** (header/footer/preview banner) and
  the homepage hero, plus leaf UI (`Button`, `ServiceCard`, `IndustryCard`,
  `ScrollReveal`, `CTABlock`) reused across several routes.
- **`src/sections/` owns entire page bodies** for about, coverage, industries,
  services, and insights index pages — each route pulls a bundle of
  page-specific section components + a co-located `data.ts`.
- The split is roughly: **v2 = shared/leaf/chrome + homepage**, **sections =
  per-page marketing bodies**. The two detail routes (`insights/[slug]`,
  `case-studies/[slug]`) are where the two worlds collide.

---

## Step 2 — Cross-System Dependency Direction

**The dependency is overwhelmingly one-directional: `src/sections/` → `components-v2/`.**

- **`src/sections/` imports from `components-v2/`: 100 import lines** across ~40
  section files.
- **`components-v2/` imports from `src/sections/`: exactly 1 line.**

### The single back-edge

```
components-v2/sections/InsightsRelatedSection.tsx:7
  import { INSIGHTS_DATA } from "@/src/sections/insights/data";
```

- It imports **data**, not a component.
- The target (`src/sections/insights/data.ts`) has **no imports back into
  `components-v2/`**, so **there is no true module-level cycle** — the graph is
  a DAG. But it is a cross-tree back-edge that must be cut during consolidation
  (move `INSIGHTS_DATA` to a neutral/shared location, or the canonical tree).

### What `src/sections/` consumes from `components-v2/` (most-used first)

| v2 module | consumers | role |
|---|---|---|
| `foundation/useResponsiveValue` | 22 | responsive hook |
| `sections/SectionWrapper` | 20 | layout primitive |
| `foundation/useScrollReveal` | 14 | motion hook |
| `sections/SectionHeader` | 11 | layout primitive |
| `ui/ScrollReveal` | 6 | motion wrapper |
| `ui/InsightCarouselCard` (+`INSIGHT_CAROUSEL_EASING`) | 6 | card + motion token |
| `ui/Breadcrumb` | 5 | nav primitive |
| `ui/RelatedKnowledge` (`CaseStudyCard`, `ExploreRelatedKnowledge`) | 3 | shared cards |
| `foundation/useHeroEntrance` | 3 | motion hook |
| `ui/EditorialIndustryCard`, `sections/CTABlock`, `ui/ServiceCard`, `ui/GateWayLink`, `ui/Button`, `ui/ArticleSidebar`, `sections/InstitutionalCTA`, `sections/InsightsCarouselSection` | 1–2 each | shared UI/sections |

### Finding — this is NOT two parallel duplicate systems

The 100:1 ratio shows a **layered architecture**, not two competing copies:

- **`components-v2/` is the foundation / design-system layer** — layout
  primitives (`SectionWrapper`, `SectionHeader`), foundation hooks
  (`useResponsiveValue`, `useScrollReveal`, `useHeroEntrance`), and shared UI
  (`Button`, `Breadcrumb`, cards, `CTABlock`, `ScrollReveal`).
- **`src/sections/` is the page-composition layer** — per-page marketing
  section bundles that are *built on top of* `components-v2/` primitives.

This reframes the whole exercise: consolidation is **not** "pick one tree and
delete the other." It is "**components-v2 is the base; either (a) leave sections
as a thin page layer on top, or (b) absorb sections into components-v2 so there
is one tree.**" See Step 5. The back-edge and the two BOTH-importing detail
routes are the only real entanglements to untangle.

---

## Step 3 — Overlap Census

### Headline: most of `components-v2/sections/` is DEAD, not duplicated-and-live

Importer count for every `components-v2/sections/*.tsx` (precise
`sections/Name"` match across `app/`, `src/`, `components-v2/`; confirmed no
barrel re-export hides usage — `components-v2/sections/index.ts` and `ui/index.ts`
are imported by **nothing**; and there are **no dynamic imports** anywhere in the
codebase, so static counts are authoritative):

**LIVE `components-v2/sections/` (9 files):**

| Component | importers | role |
|---|---|---|
| `SectionWrapper` | 42 | core layout primitive (shared foundation) |
| `SectionHeader` | 23 | core layout primitive (shared foundation) |
| `CTABlock` | 4 | shared CTA |
| `ConstellationHero` | 1 | homepage hero (used by `HomepageClient`) |
| `InsightsCarouselSection` | 1 | used by `service-detail` |
| `InstitutionalCTA` | 1 | used by `services` page |
| `InsightInDevelopmentPlaceholder` | 1 | insight `[slug]` |
| `InsightsDetailHeroSection` | 1 | insight `[slug]` |
| `InsightsRelatedSection` | 1 | insight `[slug]` (holds the back-edge) |

**DEAD `components-v2/sections/` — 37 files with ZERO importers** (superseded by
`src/sections/` page bodies):
`AtmosphericLayer, CapabilityNavigator, CapabilityPanelsSection, ContentSkeleton,
DecisionGateway, EngagementFrameworkSection, FeaturedIndustriesSection,
FeaturedServicesSection, HeroSection, IndustriesHeroSection, IndustriesOverview,
IndustryContextSection, IndustryDetailHeroSection, IndustryRelatedInsightsSection,
IndustryRelatedServicesSection, IndustrySummarySection, InsightsContentSection,
InsightsGridSection, InsightsHeroSection, InsightsIntroSection,
InstitutionalMetricsSection, MidPageImageBand, PhaseBlock, PridePhilosophySection,
SectionDivider, ServicesChallengeSection, ServicesDeliverablesSection,
ServicesDeliveryModelSection, ServicesDetailHeroSection, ServicesGridSection,
ServicesHeroSection, ServicesIntegrationSection, ServicesIntroSection,
ServicesRelatedIndustriesSection, ServicesRelatedInsightsSection, SummaryBlock,
TrustSignalsSection`.

> ⚠ This changes the character of Cycle 3: the "second parallel system" in
> `components-v2/sections/` is mostly **abandoned first-draft page bodies** that
> `src/sections/` replaced. It's dead-code deletion, not migration. (v2's `ui/`,
> `foundation/`, and `layout/` remain the live shared library — see Step 4.)

### Conceptual overlap map (same purpose, two implementations)

| Concept | components-v2 (mostly DEAD) | src/sections (LIVE — route-wired) | Winner |
|---|---|---|---|
| Homepage hero | `sections/ConstellationHero` ✅LIVE | — | v2 (unique, live) |
| Services **index** page | `sections/Services{Hero,Intro,Grid,Challenge,Deliverables,DeliveryModel,Integration}Section` ❌DEAD | `services/*` + `ServicesPageClient` ✅ | sections |
| Services **detail** page | `sections/Services{DetailHero,RelatedIndustries,RelatedInsights}Section` ❌DEAD | `service-detail/ServiceDetailSections` ✅ | sections |
| Industries **index** | `sections/{IndustriesHeroSection,IndustriesOverview,FeaturedIndustriesSection}` ❌DEAD | `industries/*` + `IndustriesPageClient` ✅ | sections |
| Industry **detail** | `sections/Industry{DetailHero,Context,RelatedInsights,RelatedServices,Summary}Section` ❌DEAD | `industry-detail/IndustryDetailSections` ✅ | sections |
| Insights **index** | `sections/Insights{Hero,Intro,Content,Grid}Section` ❌DEAD | `insights/*` + `InsightsPageClient` ✅ | sections |
| Insight **detail** | `sections/{InsightsDetailHeroSection,InsightsRelatedSection,InsightInDevelopmentPlaceholder}` ✅LIVE | `insight-detail/*` ✅LIVE | **SPLIT — both live** |
| Case study | — | `case-study/{CaseStudyHero,CaseStudyBody}` ✅ | sections |
| Generic hero | `sections/HeroSection` ❌DEAD | (each page has own hero) | sections |
| CTA | `sections/CTABlock` ✅, `InstitutionalCTA` ✅ | (consume v2's) | v2 (shared) |
| Insights carousel | `sections/InsightsCarouselSection` ✅, `ui/InsightCarouselCard` ✅ | (consume v2's) | v2 (shared) |
| Name collision | `sections/InsightsHeroSection` ❌DEAD | `insights/InsightsHeroSection` ✅LIVE | same filename, different tree — sections wins |

### Unique-to-one-tree

- **Unique & live in v2 (keep):** all of `foundation/*` (hooks), all of
  `layout/*` (`SiteHeader`, `SiteFooter`, `SearchOverlay`, `PreviewBanner`), most
  of `ui/*` (`Button`, `Breadcrumb`, cards, `ScrollReveal`, `RelatedKnowledge`,
  `ArticleSidebar`, `InsightCarouselCard`, etc.), the homepage
  `ConstellationHero`, and the shared section primitives (`SectionWrapper`,
  `SectionHeader`, `CTABlock`, `InstitutionalCTA`).
- **Unique & live in sections (keep):** every page-body dir — `about/`,
  `coverage/`, `industries/`, `industry-detail/`, `services/`, `service-detail/`,
  `insights/`, `insight-detail/`, `case-study/`, `contact/` — plus their
  co-located `data.ts` files.
- **The only genuinely-split live concept is the Insight detail page**
  (`insights/[slug]`), which pulls hero/related/placeholder from v2 and
  body/related-services/etc. from sections. This is the one real merge target.

---

## Step 4 — Characterizing Both Systems

Samples: v2 → `sections/SectionHeader`, `ui/Button`, `sections/SectionWrapper`,
`sections/ConstellationHero`. sections → `about/AboutHeroSection`,
`services/ServicesPageClient`, `industry-detail/IndustryDetailSections`,
`insight-detail/InsightBodySection`.

| Dimension | `components-v2/` | `src/sections/` |
|---|---|---|
| **Role** | Reusable primitives + shared UI (design-system layer) | Page-body composition (per-route sections) |
| **Styling** | Tailwind semantic classes (`bg-blue-mid`, `duration-normal`) + CSS-var tokens (`var(--text-h2)`, `var(--n900)`) | Same token vocabulary, but more inline `style={{…}}` and raw utility literals (`h-[420px]`, inline gradients) |
| **Data access** | **Props-only / presentational.** `SectionWrapper` has 5 imports, none data. No CMS calls. | **CMS-hook + fallback.** The 3 page clients (`ServicesPageClient`, `IndustriesPageClient`, `InsightsPageClient`) call `lib/hooks/useX()` then fall back to co-located `data.ts` const (`cmsServices ?? SERVICES`). Leaf sections take props. |
| **Motion** | Owns the hooks: `useScrollReveal`, `useHeroEntrance`, `useResponsiveValue`. Also reaches into `@/src/lib/motion/useReducedMotionPreference`. | **Consumes v2's motion hooks** (14× `useScrollReveal`, 22× `useResponsiveValue`) + `ScrollReveal`. No motion of its own. |
| **Cycle-1 type tokens** | 25 files use `var(--text-*)` / `var(--line-height-*)` | 28 files use them |
| **Raw font-size literals (older pattern)** | 12 files | 17 files |

### Reading of the evidence

- **Typography-token adoption is roughly equal** — both trees consume the Cycle-1
  CSS-var tokens (25 vs 28 files) and both carry a similar tail of raw literals
  (12 vs 17). Neither tree is the "old inline" one; they were built/updated in
  the same era against the same tokens.
- **The motion system is shared and already unified** (Cycle 1 consolidated it):
  hooks live in `components-v2/foundation` + `src/lib/motion`, and *both* trees
  consume them. Note v2 → `src/lib/motion` is another cross-tree edge, but it's a
  **hook/util**, not a component, and it's the intended shared location.
- **The only real behavioral difference is layer, not vintage:** v2 is
  presentational primitives; sections is data-wired page composition. They are
  **complementary layers, not competing implementations.**

### Which tree is closer to the intended end state?

**Both are — because the end state uses both.** `docs/cycle2.md` confirms it:
the homepage rebuild is told to "reuse existing data wiring," pulls its data from
`src/sections/services/data.ts` and `src/sections/industries/data.ts`, and to use
"only Cycle-1 tokens." The intended architecture is:

> **`components-v2/` = the shared primitive/UI library; `src/sections/` = the
> data-wired page bodies that consume it.** The abandoned draft page-bodies in
> `components-v2/sections/` (Step 3's 37 dead files) are the ONLY part that is
> genuinely off the intended path.

---

## Step 5 — Canonical Target Recommendation

**Recommendation: keep BOTH trees with a hard role boundary — do NOT collapse
one into the other.**

- **`components-v2/` is canonical for the shared library** — `foundation/`
  (hooks), `layout/` (site chrome), `ui/` (Button, cards, Breadcrumb,
  ScrollReveal, RelatedKnowledge, ArticleSidebar, InsightCarouselCard…), and the
  four shared section primitives (`SectionWrapper`, `SectionHeader`, `CTABlock`,
  `InstitutionalCTA`) + homepage `ConstellationHero`.
- **`src/sections/` is canonical for page bodies** — every per-route section
  bundle and its co-located `data.ts`.

If forced to name a single winner for the *overlapping* concern (page
composition), it is **`src/sections/`**, because:

1. **Routes already point there.** Every content page (about, coverage,
   services, industries, insights, case-study) composes from `src/sections/`; the
   equivalent `components-v2/sections/` page-bodies have **0 importers** (Step 3).
2. **The approved homepage spec points there.** `docs/cycle2.md` sources cluster
   and sector data from `src/sections/services/data.ts` and
   `src/sections/industries/data.ts` and says "reuse existing data wiring."
3. **Fewer entanglements to unwind.** The cross-tree edges nearly all run
   sections → v2 (the intended direction: page → library). The only wrong-way
   edges are **one** (`InsightsRelatedSection` → `insights/data`) and the split
   Insight-detail route. Choosing sections-as-pages / v2-as-library keeps 99 of
   100 cross-tree edges pointing the correct way.

### What "consolidation" actually means here

Not a migration between two rival systems. Three concrete moves:

1. **DELETE** the 37 dead `components-v2/sections/*` page-draft files (Step 3).
   This removes the *appearance* of a second parallel system. ~Half of
   `components-v2/sections/` disappears with zero route impact.
2. **CUT the one back-edge:** relocate `INSIGHTS_DATA` so
   `components-v2/sections/InsightsRelatedSection` no longer imports from
   `src/sections/` (or move that one component into `src/sections/insight-detail/`
   since it's insight-specific and used only by `insights/[slug]`).
3. **UNIFY the split Insight-detail route:** consolidate the 3 v2 insight-detail
   pieces (`InsightsDetailHeroSection`, `InsightsRelatedSection`,
   `InsightInDevelopmentPlaceholder`) into `src/sections/insight-detail/` so
   `app/insights/[slug]/page.tsx` imports from ONE tree. Same for the `CTABlock`
   in `case-studies/[slug]` (leave as shared-library import — that's allowed).

After these, `components-v2/` is unambiguously "the library" and `src/sections/`
is unambiguously "the pages," with a single legal dependency direction.

> **Optional cosmetic follow-up (not required for Cycle 3):** rename
> `components-v2/` → `components/` (or `src/components/`) once it's purely the
> shared library, to kill the "v2 implies there's a v1/duplicate" confusion. Pure
> path churn; defer unless the team wants it.

---

## Step 6 — Migration Order (lowest → highest risk)

Barrels (`sections/index.ts`, `ui/index.ts`, `foundation/index.ts`) re-export
**only live** components, so deleting dead files won't break them. The 37 dead
files have no references anywhere in code repo-wide (the sole hit,
`exports/homepage-for-claude.md`, is a markdown export, not a build input).

> **On granularity:** the "1–3 components per increment" rule is for *risky*
> migrations. Phase A is provably-dead deletion (0 importers each, verified), so
> batching by domain is safe and reviewable — each batch still ends green.

### Phase A — Dead-code deletion (near-zero risk, do first)

Each PR: delete files + run typecheck/targeted build of affected routes. No route
imports these, so the build stays green by construction.

| PR | Delete (dead `components-v2/sections/`) | Count |
|---|---|---|
| **A1 — services drafts** | ServicesChallengeSection, ServicesDeliverablesSection, ServicesDeliveryModelSection, ServicesDetailHeroSection, ServicesGridSection, ServicesHeroSection, ServicesIntegrationSection, ServicesIntroSection, ServicesRelatedIndustriesSection, ServicesRelatedInsightsSection, FeaturedServicesSection, CapabilityNavigator, CapabilityPanelsSection | 13 |
| **A2 — industries drafts** | IndustriesHeroSection, IndustriesOverview, IndustryContextSection, IndustryDetailHeroSection, IndustryRelatedInsightsSection, IndustryRelatedServicesSection, IndustrySummarySection, FeaturedIndustriesSection | 8 |
| **A3 — insights index drafts** | InsightsContentSection, InsightsGridSection, InsightsHeroSection, InsightsIntroSection | 4 |
| **A4 — generic/misc drafts** | AtmosphericLayer, ContentSkeleton, DecisionGateway, EngagementFrameworkSection, HeroSection, InstitutionalMetricsSection, MidPageImageBand, PhaseBlock, PridePhilosophySection, SectionDivider, SummaryBlock, TrustSignalsSection | 12 |

(Also update `exports/homepage-for-claude.md`'s stale `FeaturedServicesSection`
mention in A1 — doc-only, no build effect.)

After Phase A, `components-v2/sections/` drops from 56 → 19 files and the
"parallel system" illusion is gone.

### Phase B — Cut the one cross-tree back-edge (low risk, 1 PR)

- **B1:** Remove `components-v2/sections/InsightsRelatedSection.tsx`'s import of
  `@/src/sections/insights/data`. Simplest: **move `InsightsRelatedSection` into
  `src/sections/insight-detail/`** (it's insight-specific, single consumer =
  `insights/[slug]`). Update that route's import. Result: 0 wrong-way edges.
  Verify: build + visual check of `/insights/[slug]`.

### Phase C — Unify the split Insight-detail route (medium risk, 2 PRs)

`app/insights/[slug]/page.tsx` is the only both-trees route left after B. Move
its remaining v2 pieces into `src/sections/insight-detail/` so the route imports
page-body from ONE tree (shared-library imports like `CTABlock` stay as-is).

- **C1:** Move `InsightsDetailHeroSection` + `InsightInDevelopmentPlaceholder`
  into `src/sections/insight-detail/`; update route. Build + visual verify.
- **C2:** Reconcile any naming/overlap between v2 `InsightsRelatedSection`
  (moved in B) and existing `src/sections/insight-detail/InsightRelated*`
  sections; ensure no dead duplicate remains. Build + visual verify.
  *(`CTABlock` in `case-studies/[slug]` stays a shared-library import — leave it.)*

### Phase D — Optional cosmetic (defer)

- **D1 (optional):** rename `components-v2/` → `components/`. Pure path churn
  across ~40 importers; one mechanical PR with a codemod. Only if the team wants
  the name gone. Not required for a consolidated architecture.

### Increment count & effort

| Phase | PRs | Risk | Effort |
|---|---|---|---|
| A (dead deletion) | 4 | near-zero | ~2–3 h total (mechanical) |
| B (back-edge) | 1 | low | ~1 h |
| C (insight-detail unify) | 2 | medium | ~2–4 h (needs visual verify) |
| D (rename, optional) | 1 | low-mechanical | ~1 h |
| **Total** | **7 (8 with optional D)** | — | **~1–1.5 days** |

Every PR ends in a green build; Phases A–B need only a build pass, C needs build
+ visual confirmation of `/insights/[slug]`.

---

## Step 7 — Risks That Could Invalidate the Plan

### R1 — API data-access divergence is a SEPARATE axis — do not entangle it
The three list endpoints each fetch Sanity differently:
- `/api/services` → thin shim over `getAllServices()` (`lib/sanity/services`).
- `/api/insights` → `getAllInsights()` + inline field remap in the route.
- `/api/industries` → **inline `sanityClient.fetch(industriesQuery)`** + inline
  filter/map, no service module.

This is a **data-layer inconsistency, orthogonal to the component split.** The
component consolidation only *consumes* these via `lib/hooks/useX()` inside the
three `src/sections/*PageClient` files — all on the `src/sections` (winning)
side, and untouched by Phases A–C. **Risk:** scope-creep — someone tries to
"also fix the API" mid-consolidation. **Mitigation:** keep the `useX()` hook
contracts frozen during Cycle 3; treat the `/api/*` normalization as its own
later tier. It does not block or alter this plan.

### R2 — CMS-fallback coupling in `src/sections/*/data.ts`
`ServicesPageClient`/`IndustriesPageClient`/`InsightsPageClient` use
`cmsServices ?? SERVICES` — the co-located `data.ts` consts are **live runtime
fallbacks**, not dead sample data. `docs/cycle2.md` also reads `CLUSTERS`/
`INDUSTRIES` from these files, and detail routes import `CASE_STUDIES`,
`INSIGHTS_DATA`, `INDUSTRIES`, `SERVICES`, `CAPABILITIES` directly. **Risk:**
treating any `data.ts` as deletable during cleanup would break both the fallback
and the homepage. **Mitigation:** the plan touches **no** `data.ts` except
relocating `INSIGHTS_DATA` (B1) — and that must be a *move*, keeping every
existing import path updated, never a delete.

### R3 — Dynamic imports that static greps miss — CLEARED
Explicitly checked: **no `next/dynamic`, `React.lazy`, or `import()` anywhere**
in `app/`/`src/`/`components-v2/`. All usage is static, so the 0-importer counts
in Step 3 are authoritative. Low residual risk.

### R4 — Barrel/index re-exports — CLEARED
`components-v2/{sections,ui,foundation}/index.ts` re-export only LIVE components;
none of the 37 dead files appear in a barrel, and the `sections`/`ui` barrels are
imported by nothing. Deletion cannot break a barrel build.

### R5 — Name collisions during Phase C
Both trees contain an `InsightsHeroSection` and near-twins
(`InsightsRelatedSection` vs `insight-detail/InsightRelated*`). When moving files
in B/C, a same-named file could collide or an import could silently resolve to
the wrong tree. **Mitigation:** do B and C as small, individually-verified PRs
(build + visual check of `/insights/[slug]`), and delete the v2 original in the
same PR that adds the sections copy so no duplicate lingers.

### R6 — v2 → `src/lib/motion` cross-tree util edge
`components-v2` reaches into `@/src/lib/motion/useReducedMotionPreference`. This
is an intended shared-motion location (Cycle 1), not a page dependency, so it
does **not** violate the library/page boundary. Flag only so a future
"components-v2 must not import from src/" lint rule is written to allow
`src/lib/*` (shared utils) while forbidding `src/sections/*` (pages).

### R7 — Homepage timing interaction (see summary)
`ConstellationHero` (live, v2) is imported by `HomepageClient`, which
`docs/cycle2.md` plans to rebuild in-place. Cycle 3's Phase A/B/C never touch
`ConstellationHero` or `HomepageClient`, so the two efforts don't collide — but
sequencing matters (see Executive Summary).

### Residual unknowns
- Visual regressions on `/insights/[slug]` after Phase C are the only place a
  green build might still look wrong — hence the mandated visual verify there.
- Whether the team wants the `components-v2` → `components` rename (D1) is a
  naming preference, not a technical blocker.
