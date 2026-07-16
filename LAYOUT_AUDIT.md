# Homepage Layout Audit

Read-only reverse-engineering of `/` as a **visual layout system** — geometry, rhythm, hierarchy, and motion only. Implementation details (state, data source, CMS wiring) are covered in `HOMEPAGE_AUDIT.md` / `HOMEPAGE_CONTENT_AUDIT.md` and intentionally omitted here except where they affect layout (e.g. carousel index driving a `translateX`). No files were changed to produce this document.

---

## Page Blueprint (top to bottom)

```
╔══════════════════════════════════════════════════════════════════════╗
║ HEADER — fixed, full-width, z-50, overlays everything below           ║
║ transparent-on-hero → solid-paper past 80% of hero height             ║
║ [Logo]                                   [Services Industries         ║
║                                            Insights About] [CTA pill] ║
╚══════════════════════════════════════════════════════════════════════╝
        ↓ (not in normal flow — hero renders full-bleed underneath it)

┌──────────────────────────────────────────────────────────────────────┐
│ 1. HERO                                          bg: white            │
│         ╭──────────── centered, max-w 1152px ────────────╮           │
│         │        eyebrow (centered)                       │           │
│         │        H1 — largest type on page (centered)     │           │
│         ╰─────────────────────────────────────────────────╯           │
│   ╭──────────────── centered, max-w 1152px ──────────────────────╮   │
│   │ ┌────────────────────────────────────────────────────────┐  │   │
│   │ │ NAVY PANEL, rounded-3xl, 420–640px tall                  │  │   │
│   │ │  ◇ diamond motif (static)      ┌──────────────────────┐ │  │   │
│   │ │                                 │ paper card, top-right │ │  │   │
│   │ │                                 │ body copy              │ │  │   │
│   │ │                                 │ [Start conversation]   │ │  │   │
│   │ │                                 │  Explore services →    │ │  │   │
│   │ │                                 └──────────────────────┘ │  │   │
│   │ └────────────────────────────────────────────────────────┘  │   │
│   ╰────────────────────────────────────────────────────────────╯   │
│   ╭──────────────── centered, max-w 1152px ──────────────────────╮   │
│   │ 10 disciplines · 11 sectors · Nairobi   (left-aligned, small) │   │
│   ╰────────────────────────────────────────────────────────────╯   │
└──────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────┐
│ 2. DIFFERENTIATORS                              bg: paper (#F7F6F2)   │
│   ╭──────────── centered, max-w 1152px, 2-col flex ───────────────╮  │
│   │ TEXT (48%)                      │ IMAGE (52%)                 │  │
│   │  eyebrow                        │ ┌─────────────────────────┐ │  │
│   │  H2                             │ │ navy card, aspect 4:3     │ │  │
│   │  body                           │ │  zigzag bands (top/bot)   │ │  │
│   │  [Start a conversation]         │ │  ◇ diamond (ANIMATED)     │ │  │
│   │                                 │ │            [pause/play]  │ │  │
│   │                                 │ └─────────────────────────┘ │  │
│   ╰─────────────────────────────────────────────────────────────╯  │
│   ╭──────────── centered, max-w 1152px, 3-col row ────────────────╮  │
│   │ ── card 1 ──   ── card 2 ──   ── card 3 ──  (border-top rule)  │  │
│   ╰─────────────────────────────────────────────────────────────╯  │
└──────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────┐
│ 3. SERVICE CLUSTERS                             bg: white              │
│   ╭──────────── centered, max-w 1152px ───────────────────────────╮  │
│   │ eyebrow / H2  (max-w 672px)                                    │  │
│   │ ┌─────────────────────────┐ ┌───────────────────────────────┐ │  │
│   │ │  CLUSTER 01 (big card)    │ │  CLUSTER 02 (small card)      │ │  │
│   │ │  55% width, navy          │ │  45% width, navy, 16:10        │ │  │
│   │ │  ◇  label/one-liner        │ ├───────────────────────────────┤ │  │
│   │ │     [service pills]        │ │  CLUSTER 03 (small card)      │ │  │
│   │ │     [Explore]               │ │  stacked below 02              │ │  │
│   │ └─────────────────────────┘ └───────────────────────────────┘ │  │
│   │ ┌───────────────────────────────────────────────────────────┐│  │
│   │ │ CLUSTER 04 — full-width navy band, ◇ motif, [Explore]        ││  │
│   │ └───────────────────────────────────────────────────────────┘│  │
│   │ Explore all ten disciplines →                                 │  │
│   ╰────────────────────────────────────────────────────────────╯  │
└──────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────┐
│ 4. POINT OF VIEW                                bg: paper              │
│         ╭─────── centered, max-w 704px (narrowest section) ───────╮   │
│         │           large pull-quote (centered)                    │   │
│         │        Our point of view, and the work behind it →       │   │
│         ╰─────────────────────────────────────────────────────────╯   │
└──────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────┐
│ 5. INDUSTRIES                bg: white  (◇ giant motif bleeds top-right, section-level, escapes the 1152px container) │
│   ╭──────────── centered, max-w 1152px ───────────────────────────╮  │
│   │ eyebrow / H2                                                    │  │
│   │ ┌──────────────┐┌────────────┐┌────────────┐┌────────────┐→ scroll │
│   │ │ FEATURED       ││ sector 2   ││ sector 3   ││ sector 4   │  (horizontal-scroll rail, │
│   │ │ 58% width       ││ 46%/34%    ││            ││            │   NOT a wrapping grid,   │
│   │ │ ◇ + bottom card ││ hover→full ││ hover→full ││ hover→full │   scrolls at ALL widths) │
│   │ └──────────────┘└────────────┘└────────────┘└────────────┘  │  │
│   │ See all 11 sectors →                                           │  │
│   ╰────────────────────────────────────────────────────────────╯  │
└──────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────┐
│ 6. INSIGHTS                                     bg: navy-darkest       │
│   ╭──────────── centered, max-w 1152px ───────────────────────────╮  │
│   │ eyebrow (blue-light) / H2 (white)                               │  │
│   │ ┌───────────────────────────────────────────────────────────┐ │  │
│   │ │ single active slide, full-bleed within rounded-20px frame    │ │  │
│   │ │ ◇ motif   content bottom-left, max-w 576px                    │ │  │
│   │ │           category / title / dek / date                       │ │  │
│   │ └───────────────────────────────────────────────────────────┘ │  │
│   │        ‹prev›   ●●●○   ‹next›      (centered controls row)     │  │
│   │              All insights →   (centered)                       │  │
│   ╰────────────────────────────────────────────────────────────╯  │
└──────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────┐
│ 7. CTA BAND    bg: paper (left) / navy gradient (right) — FULL-BLEED, │
│                no max-w container — the one section that spans edge-  │
│                to-edge with no inset content wrapper                  │
│ ┌───────────────────────────┐┌─────────────────────────────────────┐│
│ │ TEXT (44% width, desktop)  ││ NAVY PANEL (56% width, desktop)      ││
│ │ eyebrow                    ││        ◇ diamond motif (static,      ││
│ │ H2                         ││          centered in panel)          ││
│ │ body                       ││                                       ││
│ │ [WhatsApp] [Start a conv.] ││                                       ││
│ └───────────────────────────┘└─────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────────────┘
╔══════════════════════════════════════════════════════════════════════╗
║ FOOTER                                          bg: navy-darkest       ║
║   ╭──────────── centered, max-w 1152px ───────────────────────────╮  ║
║   │ [Logo]      Sitemap    Company    ...........   Follow us       │  ║
║   │ tagline     links      links                     LinkedIn        │  ║
║   │ Nairobi                                           WhatsApp        │  ║
║   ├──────────────────── border-top rule ─────────────────────────┤  ║
║   │ © year Rill Singh Limited          Privacy Policy · Terms       │  ║
║   ╰────────────────────────────────────────────────────────────╯  ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## Page Chrome

### Header — `components-v2/layout/SiteHeader.tsx`

```
┌────────────────────────────────────────────────────────────┐
│ [Logo]                    Services Industries Insights About │
│                                          [Schedule an Intro] │
└────────────────────────────────────────────────────────────┘
  fixed · full-width · z-50 · overlays the hero underneath it
```

- **Purpose:** Global primary navigation + always-available conversion CTA, present on every page.
- **Position on page:** `fixed inset-x-0 top-0 z-50` — removed from document flow, floats above all section content. On the homepage specifically it starts transparent over the hero and never pushes content down.
- **Width behavior:** Full viewport width; inner content capped at `max-w-7xl` (1280px), centered.
- **Container structure:** One `<nav>` wrapper (background/border only) → one inner `flex h-[clamp(64px,56px+2.222vw,88px)]` row.
- **Grid or Flex layout:** Single flex row, `items-center justify-between` — logo pinned left, nav+CTA cluster pinned right (own `flex items-center gap-6`).
- **Alignment:** Vertically centered; horizontally split (logo vs. nav cluster) via `justify-between`.
- **Spacing:** `px-6 lg:px-8` horizontal; nav links `gap-6`.
- **Responsive behavior:** Two axes of collapse, tracked independently: (1) **viewport-based** — `useBreakpoint()` collapses to a hamburger under 1024px (mobile/tablet); (2) **scroll-based** — even on desktop, once `window.scrollY > 0`, `navCollapsed` flips true and the full nav collapses to a hamburger regardless of viewport width (a "shrink on scroll" pattern, not just a media-query one). A `MobileDrawer` slides in from the right (`w-full max-w-90`) whenever either condition is active.
- **Typography hierarchy:** Nav links `text-[0.75rem]`; CTA pill same size but bolder weight — no heading-level type here, this is chrome, not content.
- **Visual hierarchy:** Logo > CTA pill > nav links, reinforced by the CTA's filled terracotta background against otherwise-text-only siblings.
- **Animations:** `transition-all duration-300` on the nav background (transparent↔solid crossfade); logo swaps source (not a cross-fade, an instant `src` switch) in sync with the same `isSolid` state; drawer open/close is an opacity transition, `duration-120`.
- **Call-to-action placement:** Top-right, always visible — most persistent CTA on the page, present at every scroll position across every route.
- **Component nesting:** `SiteHeader` → `MobileDrawer` → nav links + `CloseIcon`; `SiteHeader` → `MenuIcon` (hamburger, standalone).
- **Layout-relevant coupling:** reads `document.querySelector('[data-homepage-hero]')`'s rendered height at runtime to decide when to go solid (`scrollY > heroHeight * 0.8`) — the header's visual state is *structurally dependent on the hero section's actual height*, homepage-only.

### Footer — `components-v2/layout/SiteFooter.tsx`

- **Purpose:** Global sitemap, brand reinforcement, legal/social links — terminal section of every page.
- **Position on page:** Last element in normal document flow, after `{children}`.
- **Width behavior:** Full-bleed `bg-navy-darkest`, inner content capped `max-w-[72rem]` (same 1152px container used by most homepage sections), centered.
- **Container structure:** One outer `<footer>` → inner `max-w-[72rem]` div → two stacked rows (link grid, then legal bar).
- **Grid or Flex layout:** Row 1 is `flex flex-col sm:flex-row sm:flex-wrap` with 4 flex children of different basis: brand (`flex-[0_1_320px]`), Sitemap nav (`flex-[0_0_auto]`), Company nav (`flex-[0_0_auto]`), Follow-us (`sm:ml-auto` — pinned right via auto margin, not justify-content). Row 2 is `flex flex-col sm:flex-row sm:items-center sm:justify-between`.
- **Alignment:** Left-aligned columns; "Follow us" pushed to the far right on `sm:+` via `ml-auto`; legal row splits copyright (left) from legal links (right) at `sm:+`.
- **Spacing:** `px-6 pt-20 lg:px-16`; row 1 uses `gap-14` (mobile stack) / `column-gap: clamp(48px,7vw,96px)` + `row-gap: 40px` (desktop wrap); legal row `mt-20 border-t py-10`.
- **Responsive behavior:** Single breakpoint (`sm:`, 640px) flips the whole footer from stacked-column to wrapped-row.
- **Typography hierarchy:** All footer text is small (`text-[14px]`/`text-[13px]`/`text-[12px]`) — flattest hierarchy on the page, no heading-weight type at all; "Follow us" label is the only uppercase/tracked microcopy, functioning as a de facto category label.
- **Visual hierarchy:** Logo image is the only non-text element — de facto visual anchor of the block.
- **Animations:** `hover:text-white` color transitions on links only (`duration-300`); no motion, no motif.
- **Call-to-action placement:** No primary CTA button in the footer — LinkedIn/WhatsApp are the closest thing to conversion links, styled identically to plain nav links (no visual emphasis).
- **Component nesting:** Flat — `SiteFooter` renders `Image` + `Link`s directly, no sub-components.
- **Notable inconsistency:** Every other `bg-navy-darkest` surface on this page (Insights section, CTA band's right panel) pairs the navy background with a `DiamondMotif`. The footer is navy and motif-free — the one dark surface that breaks the page's own decorative pattern.

---

## 1. Hero — `HeroSection`, `app/HomepageClient.tsx:70-117`

- **Purpose:** First-impression statement of positioning + primary conversion entry point.
- **Position on page:** First section, directly under the (transparent, overlaid) header. `data-homepage-hero` attribute marks it as the header's scroll-trigger reference.
- **Width behavior:** Full-bleed `bg-white` section; content inset into **three separate** `max-w-[72rem]` centered containers stacked vertically (headline block, navy-panel block, stat-line block) rather than one shared wrapper — each block re-declares its own `mx-auto w-full max-w-[72rem] px-6 sm:px-16`.
- **Container structure:** `<section>` → 3× (`div.max-w-[72rem]` → content).
- **Grid or Flex layout:** Block 1 is a centered flex column (`flex flex-col items-center text-center`). Block 2 is a single relative panel (no internal flex grid) with an absolutely-positioned card floating over an absolutely-positioned motif. Block 3 has no flex wrapper — a single block-level div.
- **Alignment:** Block 1 (eyebrow + H1): centered, both axes of text. Block 2's white card: pinned to the panel's top-right corner via `absolute right-[…] top-[…]`, not flex-centered. Block 3 (stat line): left-aligned (default), breaking the centered rhythm of block 1 directly above it.
- **Spacing:** `pt-[clamp(96px,16vh,152px)]` top offset (compensates for the fixed, initially-transparent header sitting on top), `pt-[clamp(36px,5vw,56px)]` between headline and panel, `pb-[clamp(64px,8vw,96px)]` before Differentiators.
- **Responsive behavior:** Almost entirely `clamp()`-fluid — panel min-height scales `clamp(420px,50vw,640px)`, card width `min(28rem,80%)` (so it also shrinks to 80% of panel width on narrow viewports rather than only obeying the rem cap); one discrete breakpoint, `sm:px-16`.
- **Typography hierarchy:** H1 at `clamp(2.25rem,1.55rem+3vw,4.625rem)` — the single largest type instance anywhere on the page. Eyebrow at `13px` uppercase/tracked sits above it as the smallest text in the block, maximizing the size contrast between kicker and headline.
- **Visual hierarchy:** H1 > navy panel (large colored block, second-strongest pull) > white floating card (body copy + CTA, tertiary) > stat line (quaternary, smallest/plainest text on the page).
- **Animations:** None in this section — the only `DiamondMotif` instance here is static (no `animate` prop passed).
- **Call-to-action placement:** Primary CTA ("Start a conversation") + secondary text link sit *inside* the floating white card, which itself is offset into the top-right of the navy panel rather than centered under the headline — the CTA is visually detached from the H1 it supports, one full section-width away.
- **Component nesting:** `HeroSection` → `DiamondMotif` (panel background) + floating card (`Link` ×2, no sub-component).

## 2. Differentiators — `DifferentiatorsSection`, `app/HomepageClient.tsx:122-205`

- **Purpose:** Substantiate the hero's claim with a rationale (text) + a visual "proof" panel, then reinforce with 3 supporting pillars.
- **Position on page:** Second section, first `bg-paper` surface — establishes the white→paper alternation that recurs down the page.
- **Width behavior:** One shared `max-w-[72rem]` container for the whole section (unlike Hero's 3 separate ones).
- **Container structure:** `<section>` → row 1 (text+image split) → row 2 (3-card strip), both inside the same outer `max-w-[72rem]` div... actually implemented as two sibling `max-w-[72rem]` divs sharing the same width value (one for the split, one for the card strip) — same effective width, technically two containers again.
- **Grid or Flex layout:** Row 1: `flex flex-wrap` two-item split at **48%/52%** flex-basis (`flex-[48_1_0%]` / `flex-[52_1_0%]`) — an unusual near-even-but-not-quite ratio, with `min-w-[340px]`/`min-w-[360px]` guards that force a stacked mobile layout once the row can't fit both minimums (`flex-wrap`, no explicit breakpoint — the wrap point is content-driven, not a fixed `sm:`/`md:` cutoff). Row 2: `flex flex-col gap-9 sm:flex-row` — 3 equal (`flex-1`) cards.
- **Alignment:** Row 1 columns are `items-center` (vertically centered against each other). Row 2 cards are top-aligned, separated by a `border-t` rule rather than a card background — a minimal, editorial treatment vs. the boxed cards used elsewhere on the page.
- **Spacing:** `gap-10 sm:gap-20` between the two row-1 columns; `gap-9` between row-2 cards; each row-2 card has its own `border-t … pt-5` acting as internal top-spacing.
- **Responsive behavior:** Row 1's wrap point is implicit (flex-basis + min-width interplay, not a named breakpoint) — this is the one section-level layout shift on the page that isn't tied to a Tailwind breakpoint token. Row 2 has an explicit `sm:flex-row` (640px).
- **Typography hierarchy:** H2 at the page's standard "section headline" clamp (`clamp(2.25rem,1.5rem+3vw,4rem)` — one step below the Hero H1 clamp, and identical to the H2 clamp reused in Service Clusters, Industries, and Insights, making this the de facto "section title" scale). Row-2 card titles (`text-[19px]`) are deliberately modest — smaller than body-lead text elsewhere — since the border-rule, not type size, carries the card boundary.
- **Visual hierarchy:** H2 + navy image panel are co-equal focal points (roughly matched visual weight at 48/52 split); the 3-card strip below is lower-emphasis supporting detail, reinforced by its plain/ruled (non-boxed) treatment.
- **Animations:** The **only animated `DiamondMotif` instance on the entire page** lives here (`animate playing={isPlaying}`, a 48s drift loop, user-togglable via the play/pause button and auto-disabled under `prefers-reduced-motion`). Every other `DiamondMotif` on the page (12+ other instances) is static.
- **Call-to-action placement:** Primary CTA sits directly under the body paragraph in the text column (`mt-2`) — the most conventional, tightly-coupled CTA placement on the page (contrast with Hero's detached CTA).
- **Component nesting:** `DifferentiatorsSection` → `DiamondMotif` (animated) + play/pause `<button>` (image column) → `.map()` over `DIFFERENTIATORS` (row 2, no sub-component, inline `<div>`s).

## 3. Service Clusters — `ServiceClustersSection` + `ClusterCardBig` + `ClusterCardSmall`, `app/HomepageClient.tsx:210-369`

- **Purpose:** Present the 4 service clusters as the page's primary "what we do" grid, weighted toward the first cluster.
- **Position on page:** Third section, returns to `bg-white` (continuing the alternation).
- **Width behavior:** Single `max-w-[72rem]` container for the whole section.
- **Container structure:** `<section>` → container → header block → cards row → full-width band → footer link, all siblings within one container.
- **Grid or Flex layout:** This is the most structurally elaborate layout on the page — a **bento/asymmetric split**, not a CSS grid: `flex flex-col min-[700px]:flex-row` outer row containing (a) `ClusterCardBig` at `min-[700px]:w-[55%] flex-none`, and (b) a nested `flex flex-col` column at `min-[700px]:w-[45%]` holding two stacked `ClusterCardSmall`s. Below that row, a separate full-width navy band holds the 4th cluster (broken out of the 3-card layout entirely — 4 items rendered as 1-big + 2-small + 1-full-width-band, not a uniform 4-up grid).
- **Alignment:** Cards are top-aligned within their row; each card internally uses `justify-between` (flex column) to pin its CTA to the card's bottom edge regardless of copy length.
- **Spacing:** `gap-[clamp(20px,3vw,24px)]` between all cards (row and stacked-column alike); `mt-[clamp(32px,5vw,48px)]` before the cluster-4 band.
- **Responsive behavior:** Custom arbitrary breakpoint `min-[700px]:` (not a standard Tailwind token — 700px doesn't match `sm`/`md`/`lg`) governs the big/small row-vs-stack switch; below 700px everything stacks to a single column in card order (big, small, small).
- **Typography hierarchy:** Section H2 shares the standard section-title clamp. Within cards, `ClusterCardBig`'s title clamp (`clamp(1.75rem,1.3rem+2.2vw,2.5rem)`) is visibly larger than `ClusterCardSmall`'s (`clamp(1.15rem,1rem+0.8vw,1.4rem)`) and the inline cluster-4 band (fixed `clamp(1.5rem,1.2rem+1.5vw,2rem)`, its own distinct third size) — a genuine 3-tier type scale within one section, reinforcing the big/small/band visual hierarchy.
- **Visual hierarchy:** Cluster 01 (big card) > Clusters 02/03 (small cards, roughly half the visual weight each) ≈ Cluster 04 (full-width band, wide but shallow — different shape claims comparable attention). The asymmetry deliberately signals cluster 01 as "primary."
- **Animations:** None beyond shared hover states (`hover:bg-terracotta-hover` on every "Explore" CTA, `hover:translate-x-0.5 hover:underline` on the bottom text link).
- **Call-to-action placement:** Every card carries its own "Explore →" CTA pinned to the card's bottom edge (`justify-between` pattern); one additional page-level "Explore all ten disciplines →" sits below the entire grid — a two-tier CTA structure (per-card + section-level).
- **Component nesting:** `ServiceClustersSection` → `ClusterCardBig` → (`DiamondMotif`, `ServiceLinks` → `Link`×N, `Link`); → `ClusterCardSmall` ×2 → same shape; → inline cluster-4 block → `DiamondMotif` + `ServiceLinks` + `Link` (not componentized, unlike 01-03).

## 4. Point of View — `PointOfViewSection`, `app/HomepageClient.tsx:374-392`

- **Purpose:** A deliberate visual and cognitive "rest beat" — single-statement pull-quote between two dense, multi-card sections.
- **Position on page:** Fourth section, midpoint of the page; returns to `bg-paper`.
- **Width behavior:** Narrowest container on the entire page — `max-w-[44rem]` (704px), versus 1152px used everywhere else.
- **Container structure:** `<section>` → one `flex flex-col items-center` container — the simplest structure on the page, no nested rows/cards.
- **Grid or Flex layout:** Single-column flex, fully centered.
- **Alignment:** Both axes centered (`items-center`, `text-center`).
- **Spacing:** `py-[clamp(80px,9vw,128px)]` — among the most generous vertical padding on the page (exceeded only by nothing; it's tied for the most breathing room), proportionate to its role as a pause.
- **Responsive behavior:** Fluid clamp only; no discrete breakpoints — nothing here needs to reflow.
- **Typography hierarchy:** Rendered as a `<p>`, not a heading tag, at `clamp(1.75rem,1.2rem+3.2vw,3.25rem)` — visually the **second-largest** text block on the page (after the Hero H1, and larger than every section's H2) despite carrying no heading semantics. This is the clearest instance of visual hierarchy diverging from document/semantic hierarchy on the page.
- **Visual hierarchy:** The quote alone dominates; the link below it is deliberately understated (small, `blue-mid`, no button styling) so it reads as a footnote, not a competing CTA.
- **Animations:** None.
- **Call-to-action placement:** Single text link, centered below the quote, `mt-[clamp(32px,4vw,40px)]` — the only section on the page whose "CTA" is a plain inline link rather than a button.
- **Component nesting:** Flat — no sub-components, one `Link`.

## 5. Industries — `IndustriesSection`, `app/HomepageClient.tsx:397-470`

- **Purpose:** Demonstrate sector depth via a featured industry + 3 supporting sectors, with the remaining 7 reachable via the closing link.
- **Position on page:** Fifth section, `bg-white` (continuing alternation, now two whites in a row across sections 3 and 5 since section 4 was paper).
- **Width behavior:** Section itself is `overflow-hidden` with a **section-level** `DiamondMotif` (`left="92%" top="6%" size="46%"`) positioned outside/independent of the inner content container — the only motif on the page that isn't confined to a card/panel; it bleeds toward the section's own edge rather than a nested navy block.
- **Container structure:** `<section>` → section-level motif (sibling, `z-` under content) → `relative z-[2]` inner `max-w-[72rem]` container → header block + scroll rail + footer link.
- **Grid or Flex layout:** **Not a grid** — `flex gap-3 overflow-x-auto` horizontal-scroll rail. This is the one section on the page that uses a scrolling-carousel-of-cards pattern for its *primary* layout (as opposed to Insights, which uses `translateX` slide-swapping) — cards are flex-none at percentage widths (`w-[88%] sm:w-[58%]` featured, `sm:w-[46%] lg:w-[34%]` supporting) that never fully reflow into a wrapped grid at any breakpoint; the "grid-like" 4-up appearance at desktop widths is actually 4 flex children exactly filling the container width, not `grid-template-columns`.
- **Alignment:** Cards top-aligned in the rail; each card's text content is bottom-anchored (`absolute inset-x-0 bottom-0`) against the card's own height, not the rail's.
- **Spacing:** `gap-3 lg:gap-1.5` between cards (note: gap *shrinks* at the `lg:` breakpoint rather than growing, the inverse of the pattern used elsewhere on the page); `pb-4` under the rail to clear the scrollbar.
- **Responsive behavior:** Card widths step through 3 breakpoints (`w-[88%]` mobile → `sm:w-[46%]`/`58%` → `lg:w-[34%]`/`58%`), but the *layout mechanism itself* (horizontal scroll) never changes — unlike most sections, there's no point at which this section becomes a static wrapped grid. A second, independent responsive behavior lives inside each supporting card: at `lg:` only, `group-hover`/`group-focus-within` expands the bottom info panel from a fixed 34% height to 100% height, revealing description + link that are hidden (`opacity-0`) below `lg:`.
- **Typography hierarchy:** Featured card title `1.4rem` > supporting card titles `1.15rem` — a two-tier scale mirroring the Service Clusters section's big/small pattern, but with only 2 tiers here versus 3 there.
- **Visual hierarchy:** Featured card (58% width, content always fully visible) > supporting cards (34-46% width, most content hidden until hover/focus on desktop — meaning on desktop, 3 of 4 cards show only a title until interacted with, a deliberately progressive-disclosure treatment that doesn't exist anywhere else on the page).
- **Animations:** Per supporting card: `lg:transition-[height] duration-500` (panel expand) + `lg:transition-[opacity,transform] duration-200` (description/link fade-and-rise) — the most animation-dense section on the page after the Insights carousel, but entirely hover/focus-gated and `lg:`-only (no mobile equivalent, so mobile users always see the fully-expanded card content instead).
- **Call-to-action placement:** Every card has its own "Explore sector →" link at the card's bottom edge (hidden until hover on 3 of 4 cards, per above); one closing "See all 11 sectors →" link below the rail.
- **Component nesting:** `IndustriesSection` → `DiamondMotif` (section-level) → featured-card block (`DiamondMotif`, `Link`) → `.map()` over `supporting` (3× inline card blocks, each with `DiamondMotif` + `Link`, not componentized).

## 6. Insights — `InsightsSection`, `app/HomepageClient.tsx:475-568`

- **Purpose:** Surface the 3 latest published articles as a single-slide-at-a-time carousel — the page's only dynamically-sourced content.
- **Position on page:** Sixth section, first (and only) section where the **entire `<section>`** is `bg-navy-darkest` rather than white/paper with an inset dark panel — the darkest, most saturated moment on the page.
- **Width behavior:** `max-w-[72rem]` container, consistent with the majority pattern.
- **Container structure:** `<section>` → container → header block → carousel frame (`overflow-hidden rounded-[20px]`) → controls row → footer link.
- **Grid or Flex layout:** Carousel is a `flex` row of full-width (`w-full flex-none`) slides, shifted via inline `style={{ transform: translateX(-${index*100}%) }}` — a JS-driven single-active-slide pattern, not CSS scroll-snap and not a grid. Each slide's *internal* content is `flex h-full flex-col justify-end` — text is bottom-anchored within the slide rather than centered or top-anchored.
- **Alignment:** Slide content bottom-left, capped `max-w-[36rem]` within a full-width slide (leaves the right ~2/3 of wide slides as pure motif/gradient background). Controls row is fully centered (`justify-center`).
- **Spacing:** Standard section `py-[clamp(64px,8vw,96px)]`; slide internal padding `p-[clamp(28px,4vw,48px)]`; controls `mt-[clamp(24px,3vw,32px)] gap-5`.
- **Responsive behavior:** Slide min-height steps once (`min-h-[380px] sm:min-h-[460px]`); otherwise fluid. The `translateX` percentage math is resolution-independent by construction (percentage-based, not pixel), so no per-breakpoint carousel logic is needed.
- **Typography hierarchy:** Slide title clamp (`clamp(1.5rem,1.2rem+1.6vw,2.15rem)`) sits below the section H2 but above body text — a fairly compressed 2-step hierarchy within the slide itself (category label → title → dek, with category and dek at similar small sizes, title the sole "large" element).
- **Visual hierarchy:** Active slide dominates entirely (siblings are fully offscreen, not partially visible/peeking); dot indicators provide the only at-a-glance signal of total slide count/position.
- **Animations:** `transition: transform 300ms ease` on the slide track (disabled under `prefers-reduced-motion`, instant snap instead); no other motion in this section (the per-slide `DiamondMotif` instances are static).
- **Call-to-action placement:** No per-slide CTA link (slides are informational, not independently clickable in this implementation — see `HOMEPAGE_CONTENT_AUDIT.md` for the underlying data question); navigation is via prev/next buttons + dots; one section-level "All insights →" link, centered below the controls.
- **Component nesting:** `InsightsSection` → `.map()` over `insights` (slide `<div>`s, each with `DiamondMotif`, no sub-component) → prev `<button>` / dot `<button>`×N / next `<button>`.

## 7. CTA Band — `CtaBandSection`, `app/HomepageClient.tsx:574-619`

- **Purpose:** Final, page-closing conversion moment — restates the primary ask (schedule a conversation) with two contact channels.
- **Position on page:** Last homepage section, directly above the footer (both are effectively "closing" content, and both sit on saturated backgrounds — navy-adjacent — reinforcing a strong finish).
- **Width behavior:** **The only section on the page with no `max-w` container at all** — `flex w-full` spans the full viewport edge-to-edge, breaking the 1152px-inset pattern used by every other section. This is the single largest structural departure from the page's otherwise-consistent container system.
- **Container structure:** `<section>` → single `flex flex-col md:flex-row` row, two direct children (no intermediate content wrapper on either side).
- **Grid or Flex layout:** Two-column flex split, `md:w-[44%]` (text) / `md:w-[56%]` (navy panel) — an asymmetric ratio distinct from both Differentiators' 48/52 and Service Clusters' 55/45, meaning the page uses **three different near-even split ratios** across three sections with no shared token.
- **Alignment:** Text column vertically centered on desktop (`md:justify-center`); navy panel centers its motif via `items-center justify-center`.
- **Spacing:** `px-6 sm:px-16 md:px-16` on the text column only (the navy panel uses its own `p-[clamp(28px,5vw,56px)]`, uncoordinated with the text column's padding since they're not sharing a container).
- **Responsive behavior:** Single breakpoint, `md:` (768px) — below it, the two columns stack (text above, navy panel below); this is a different breakpoint than the visually-similar Differentiators split, which reflows at an implicit flex-wrap point rather than `md:`.
- **Typography hierarchy:** H2 clamp (`clamp(2.25rem,1.6rem+2.6vw,3.25rem)`) is close to but not identical to the shared "section H2" clamp used in Differentiators/Service Clusters/Industries/Insights (`clamp(2.25rem,1.5rem+3vw,4rem)`) — a near-match that reads as consistent visually but is a distinct value, not a shared token.
- **Visual hierarchy:** Text column (headline + 2 CTAs) and navy panel (pure motif, no content since the photo's removal) are now visually asymmetric in a new way — the right 56% of the section carries zero text/informational content, all visual weight, none of the "message."
- **Animations:** Standard hover-color/background transitions on both CTAs; no motion beyond that.
- **Call-to-action placement:** Two CTAs side-by-side (`flex flex-wrap gap-4`) in the text column — an outlined "Message us on WhatsApp" and a filled "Start a conversation," the only section on the page offering two CTAs of visually comparable weight rather than one primary + one secondary-link pattern.
- **Component nesting:** `CtaBandSection` → `Link`×2 (text column) + `DiamondMotif` (navy panel, sole occupant since the photo card was removed).

---

## Cross-Section Layout System (the patterns, not the sections)

**Container widths in use:** `max-w-[72rem]` (1152px) is the dominant content container — Hero (×3 instances), Differentiators, Service Clusters, Industries, Insights, and Footer all use it. Two deliberate exceptions: Point of View narrows to `max-w-[44rem]` (704px) as a rest beat, and CTA Band drops the container entirely (full-bleed). No section uses the `maxWidth.content = "1200px"` token defined in `tailwind.config.ts` — the actual value in use (1152px) is close but distinct, suggesting the token and the built sections were never reconciled (see `HOMEPAGE_AUDIT.md` §17).

**Vertical rhythm:** `py-[clamp(64px,8vw,96px)]` is the standard section padding, reused verbatim in Differentiators, Service Clusters, Industries, and Insights. Point of View intentionally scales up (`clamp(80px,9vw,128px)`) for its pause effect; CTA Band intentionally scales down (`clamp(56px,7vw,88px)`); Hero uses a bespoke top offset (`clamp(96px,16vh,152px)`, viewport-height-relative rather than viewport-width-relative like everything else, because it has to clear the fixed transparent header).

**Background color rhythm (top to bottom):** white → paper → white → paper → white → **navy** → paper/navy-split → **navy**. The page alternates light/cream through 5 sections, then breaks into a sustained dark run for the last 3 (Insights, CTA-right-panel, Footer) — a deliberate "darken toward the close" arc rather than continuing the alternation to the end.

**Horizontal split ratios:** three different near-50/50 flex splits appear with three different exact ratios and three different breakpoints — Differentiators (48/52, implicit flex-wrap point), Service Clusters' big/small row (55/45, custom `min-[700px]:`), CTA Band (44/56, `md:`). None share a token; each was tuned independently.

**Typography scale (visual, not semantic):** Hero H1 (largest) → Point-of-view `<p>` (2nd largest, no heading tag) → shared section-H2 clamp (Differentiators/Service-Clusters/Industries/Insights, all functionally identical) → CTA Band H2 (a close-but-distinct near-match to the shared H2) → card-level titles (Service Clusters' 3-tier big/small/band scale, Industries' 2-tier featured/supporting scale) → eyebrows (uniform `13px` uppercase/tracked kicker across every section that has one) → footer (flattest tier, no heading-weight type at all).

**`DiamondMotif` as the unifying decorative signature:** appears in every navy/dark surface except the Footer (13+ instances across Hero, Differentiators, Service Clusters ×4, Industries ×5 incl. section-level, Insights ×N, CTA Band) — functions as the page's one true cross-section visual constant. Of all these instances, **exactly one animates** (Differentiators' image panel); every other instance, including the ones in the dark, motion-heavy Insights section, is static.

**Animation inventory (page-wide):** (1) header solid/transparent crossfade on scroll, (2) one animated `DiamondMotif` drift loop (Differentiators only, user-togglable, reduced-motion-aware), (3) Insights carousel `translateX` slide transition (reduced-motion-aware), (4) Industries supporting-card hover-reveal (`lg:`-only, height + opacity/transform), (5) uniform `hover:` color/translate/background micro-transitions on every link and button page-wide. No scroll-triggered reveal animations, no parallax, and no page-load entrance animations were found anywhere in the homepage tree.

**Call-to-action pattern census:** per-card CTAs pinned to card bottoms via `justify-between` (Service Clusters, Industries) vs. section-level CTAs below a group (Service Clusters' "Explore all," Industries' "See all," Insights' "All insights") vs. a detached CTA-in-a-floating-card (Hero) vs. a plain inline link with no button chrome (Point of View) vs. two co-equal button CTAs (CTA Band). Five distinct CTA-placement idioms across seven sections — no single reusable "CTA row" pattern is shared between sections; each was hand-built.
