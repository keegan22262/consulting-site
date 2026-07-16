# Investigation Report — Homepage Maintenance Scope

**Status:** Investigation only. No source code, configuration, dependencies, assets, or documentation were modified to produce this report. Every claim below is backed by a specific file, line number, and/or command output captured during this investigation.

---

## 1. Executive Summary

Five maintenance tasks were investigated. Summary verdicts:

| # | Task | Verdict | Risk | Confidence |
|---|---|---|---|---|
| 1 | Remove legacy CSS block in `app/globals.css` | **Safe to remove** — confirmed zero references anywhere in the repository, across all file types, not just component files. | Low | 98% |
| 2 | Consolidate duplicate design tokens | **Narrower than it first appears** — only the brand-color subset (`navy`/`blue`/`terracotta`/`eyebrow`) is genuinely duplicated as two independent hardcoded sources. Of the two, `globals.css`'s copy is provably dead (zero `var()`/arbitrary-value consumers repo-wide); `tailwind.config.ts`'s copy is the one actually compiled into every utility class. The neutral/semantic scale already demonstrates the correct single-source pattern. | Low–Medium | 90% |
| 3 | Verify `framer-motion`/`styled-components` are unused and removable | **Confirmed unused** in all application source; both are imported only inside their own `package.json`/`package-lock.json` entries (and, for `styled-components`, the separate `sanity/` sub-package's lockfile). No compiler flags reference either. | Low | 95% |
| 4 | Investigate the "theme" field Sanity query | **Larger and different than initially scoped** — this is not an isolated dead code path in one homepage query. It is a repo-wide pattern: **10 separate exported GROQ query constants** across `lib/sanity/queries.ts` and `app/page.tsx` assume an `insight.theme` reference field that has never existed in `sanity/schemaTypes/insight.ts` (confirmed via full git history). A parallel, fully-built `insightTheme` document type, a working theme-search filter, and a working `getPublishedInsightThemes()` fetch function all exist — but nothing in the schema connects `insight` documents to them, and no UI component consumes the theme-fetching functions. This reads as an unfinished feature (schema migration never completed), not leftover dead code. | N/A — investigation task, no change proposed | 92% |
| 5 | Identify architectural improvements excluded from scope | 9 items identified and deferred, ranked by size (see §9). | N/A | — |

**The single most consequential finding across all five tasks:** the homepage's data-fetching path (`app/page.tsx`) bypasses this codebase's own shared, tested, error-handled Sanity abstraction layer (`lib/sanity/insights.ts`, `lib/sanity/fetch.ts`) entirely, hand-rolling a duplicate query, a duplicate type, and a duplicate fetch call instead of using the `getLatestInsights(limit)` function that already does the same job. This is out of scope for the five maintenance tasks as literally worded, but it is the root cause behind why the homepage's `theme->title` discrepancy exists as an isolated instance rather than being caught by the same pattern used everywhere else — see §9.

---

## 2. Repository Evidence

### Task 1 — Legacy CSS block

```
$ grep -rlE "constellation-hero|mandate-section|capabilities-section|insights-dark-section|industries-section__|homepage-cta" \
  --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git .
HOMEPAGE_AUDIT.md
HOMEPAGE_ONBOARDING.md
app/globals.css
exports/homepage-for-claude.md
```
The only source-code match is `app/globals.css` itself (the block's own definition). The three other matches are this engagement's own prior audit/export documents *describing* the dead block — not consumers of it. No `.tsx`, `.ts`, `.jsx`, `.mdx`, or other CSS file references any of these class names.

Exact boundaries, confirmed by grepping section-divider comments and counting lines:
```
app/globals.css:384-385   /* HOMEPAGE — Section 1: Constellation Hero */   ← block starts
app/globals.css:1187      @layer base { /* Tailwind base extensions */ }   ← trailing empty stub
app/globals.css:1191      @layer components { /* Tailwind component extensions */ }
app/globals.css total: 1193 lines
```
The dead block (lines 384-1186) is six numbered sections under BEM-style naming: `.constellation-hero*` (387-561), `.mandate-section*` (567-667), `.capabilities-section*` (672-810), `.insights-dark-section*` (815-967), `.industries-section*` (972-1097), `.homepage-cta*` (1102-1185).

`app/globals.css` is imported in exactly one place: `app/layout.tsx:5` (`import "./globals.css"`). This is a single global stylesheet for the entire Next.js app (not per-route) — confirmed by grepping for `globals.css` imports repo-wide, only one match outside this engagement's own generated documents.

### Task 2 — Duplicate design tokens

Brand-color definitions, side by side:
```
tailwind.config.ts:26-45 (theme.extend.colors, hardcoded hex, no var() reference):
  navy: { darkest: "#021024", dark: "#052659" }
  blue: { mid: "#5483B3", light: "#7DA0CA", ice: "#C1E8FF" }
  terracotta: { DEFAULT: "#C17A46", hover: "#CB8752" }
  eyebrow: "#3D6690"

app/globals.css:113-124 (:root, hardcoded hex, independent of the above):
  --color-navy-darkest: #021024;
  --color-navy-dark: #052659;
  --color-blue-mid: #5483B3;
  --color-blue-light: #7DA0CA;
  --color-eyebrow: #3D6690;
  --color-blue-ice: #C1E8FF;
  --color-white: #FFFFFF;
  --color-off-white: #F8FBFF;
  --color-text-dark: #1A1A2E;
  --color-text-muted: #6B7280;
  --color-terracotta: #C17A46;
  --color-terracotta-hover: #CB8752;
```
Live-usage check — searched for `var(--color-*)` and Tailwind arbitrary-value syntax `[--color-*]` across the entire repository, all file types, excluding `node_modules`/`.next`/`.git`:
```
$ grep -rn "var(--color-navy|var(--color-blue|var(--color-terracotta|var(--color-eyebrow|[--color-navy|[--color-blue|[--color-terracotta|[--color-eyebrow" .
(zero matches)
```
None of the 8 brand-related `--color-*` custom properties are ever consumed anywhere — confirmed empty result. By contrast, the control case `--color-paper` (`globals.css:35`) **is** consumed:
```
$ grep -rl "\-\-color-paper" --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git .
app/globals.css
app/HomepageClient.tsx
components-v2/layout/SiteHeader.tsx
```
`--color-text-dark` is also live, but only internally — it drives `globals.css`'s own `body { color: var(--color-text-dark); }` rule (confirmed by grep: exactly 1 file match, `app/globals.css` itself, no external consumer).

Per-token repo-wide usage counts for the rest of the token surface (to establish what is and isn't in scope for a "consolidation," beyond the brand-color subset):
```
n50: 16 files    n100: 7    n200: 13   n300: 8    n400: 13
n500: 10         n600: 14   n700: 10   n800: 4    n900: 16
semantic-success/warning/error: 1 file each
space-24: 1 file   space-32: 1 file   space-96: 1 file
space-4/8/16/48/64/128: 0 files
section-vertical: 0 files   radius-card: 0 files   shadow-card-hover: 0 files
```
The neutral scale (`--n50`…`--n900`) is genuinely, widely used across the app (`app/careers/page.tsx`, `app/legal-notices/page.tsx`, `app/regulatory-disclosures/page.tsx`, `components-v2/layout/SiteHeader.tsx`, three `src/sections/insight-detail/*` files, `src/sections/services/CapabilityFrameworkMap.tsx`) — and `tailwind.config.ts:46-57` already sources it correctly, as `var(--n50)` etc., not a second hardcoded copy. **This is the working pattern the brand colors should be brought in line with, not a second instance of the same problem.**

### Task 3 — `framer-motion` / `styled-components`

```
$ grep -rln "framer-motion" --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git .
HOMEPAGE_ONBOARDING.md   ← this engagement's own prior audit document
HOMEPAGE_AUDIT.md        ← this engagement's own prior audit document
package.json             ← the dependency declaration itself
package-lock.json        ← lockfile entry
sanity/package-lock.json ← transitive lockfile entry (not a direct dependency of the Sanity sub-package)

$ grep -rln "styled-components" --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git .
HOMEPAGE_ONBOARDING.md, HOMEPAGE_AUDIT.md   ← prior audit documents
package.json, package-lock.json             ← root declaration/lockfile
sanity/package.json, sanity/package-lock.json  ← ALSO declared as a dependency inside sanity/'s own package.json
```
No `.tsx`/`.ts`/`.jsx` file anywhere in the repository imports either package — zero application-code matches for `from "framer-motion"` or `from "styled-components"` (or their alternate import forms).

`next.config.ts` (full contents captured) has no `compiler.styledComponents` flag and no other reference to either package. No `.babelrc`/`babel.config.*` file exists in the repository (Next.js is using the default SWC compiler, confirmed by absence of a Babel config).

Package declarations:
```
package.json:22:  "framer-motion": "^12.35.0",
package.json:31:  "styled-components": "^6.3.11",
```

### Task 4 — "theme" field investigation

The homepage's own query (`app/page.tsx:17-25`):
```groq
"category": coalesce(theme->title, category),
```
This is **one of ten** query definitions in the repository making the same assumption. Full inventory, `lib/sanity/queries.ts`:
```
line 32:   getIndustryBySlugQuery         → "category": coalesce(theme->title, category)
line 91:   getServiceBySlugQuery          → "category": coalesce(theme->title, category)
line 110:  getAllInsightsQuery            → "category": coalesce(theme->title, category)
line 126:  INSIGHTS_LISTING_QUERY         → "category": coalesce(theme->title, category)
line 141:  getInsightBySlugQuery          → "category": coalesce(theme->title, category)
line 155:  getInsightBySlugQuery (related)→ "category": coalesce(theme->title, category)
line 258-260: SEARCH_PUBLISHED_INSIGHTS_QUERY → theme->title == $theme || theme->slug.current == $theme || theme._ref == $theme
line 269:  SEARCH_PUBLISHED_INSIGHTS_QUERY → "themeTitle": theme->title
line 329:  ALL_PUBLISHED_INSIGHTS_QUERY    → "themeTitle": coalesce(theme->title, category)
line 343:  LATEST_PUBLISHED_INSIGHTS_QUERY → "themeTitle": coalesce(theme->title, category)
line 360:  PUBLISHED_INSIGHT_BY_SLUG_EXPANDED_QUERY → "themeTitle": coalesce(theme->title, category)
```
Against the actual schema, `sanity/schemaTypes/insight.ts` — full field list, captured directly from the file:
```
title, slug, status, featured, summary, category, date, content,
relatedServices, readTime, summaryPoints, sections, pullQuote,
dataHighlights, industryTags, serviceTags, relatedSlugs, heroImage
```
**No `theme` field.** Confirmed this was never present by walking the full commit history of the file:
```
$ git log -p --follow -- sanity/schemaTypes/insight.ts | grep -n "theme"
(zero matches across every historical version of the file)
```
So this is not a regression (a field that was removed) — the field was never added, across 5 commits that have touched this schema file since its creation.

Countervailing evidence that this is a **half-finished feature**, not vestigial dead code:
- `sanity/schemaTypes/insightTheme.ts` — a complete, separate document type ("Long-term strategic themes used to categorize thought leadership consistently over time"), registered in `sanity/schemaTypes/index.ts:4,29`.
- `lib/sanity/queries.ts:377-384` — `PUBLISHED_INSIGHT_THEMES_QUERY`, a working query for all published `insightTheme` documents.
- `lib/sanity/filters.ts:46-73` — `getPublishedInsightThemes()`, a complete, error-handled, cache-tagged (`tags: ["sanity:insights", "sanity:filters:themes"]`) fetch function wrapping that query.
- `lib/sanity/queries.ts:247-281` — `SEARCH_PUBLISHED_INSIGHTS_QUERY` implements a working `$theme` filter parameter (matching by title, slug, or raw reference ID) — a fully-designed filtering feature.
- **But:** `getPublishedInsightThemes` has zero callers anywhere in `app/`, `components-v2/`, or `src/` — confirmed by grep — no UI component fetches or renders a theme filter.
- **And:** `lib/sanity/insights.ts:44-58` — the `PublishedInsightRecord` and mapping types already treat `themeTitle` as the *primary* signal, falling back to `category` (`lib/sanity/insights.ts:130`: `category: item.category ?? item.themeTitle ?? ""` — note: this specific line actually prioritizes `category` first, but `lib/sanity/insights.ts:157`, `getInsightBySlug`, assigns `category: result.themeTitle` directly with no fallback at all, meaning that function's return value for `category` would always be `undefined` in production today since `theme` doesn't exist on the schema).

`app/page.tsx`'s query is a fifth, independently-written variant that doesn't match any of the 9 in `lib/sanity/queries.ts` field-for-field (it selects `_id, title, slug, dek, category, date` — none of the shared query constants use `dek` as a field alias) and is not imported from `lib/sanity/queries.ts` at all — confirmed by `app/page.tsx:1-4`'s import list, which imports only `sanityClient` from `@/lib/sanity/client`, nothing from `@/lib/sanity/queries` or `@/lib/sanity/insights`.

### Task 5 — Deferred architectural improvements

Evidence gathered for this task is threaded through §9 below, each item citing the specific file/line that surfaced it during Tasks 1-4's investigation plus the four prior audit documents produced earlier in this engagement (`HOMEPAGE_AUDIT.md`, `COMPONENT_DEPENDENCY_GRAPH.md`, `HOMEPAGE_CONTENT_AUDIT.md`, `LAYOUT_AUDIT.md`), which remain the authoritative detailed source for each.

---

## 3. Findings

### Task 1 — Legacy CSS block

**Scope analysis:**
- **Files involved:** `app/globals.css` only.
- **Components involved:** none — zero components reference the block (§2).
- **Dependencies involved:** none.
- **Runtime impact:** none. The block is never matched against any rendered DOM, so removing it changes no computed styles anywhere in the application.
- **Build impact:** Tailwind v4's `@tailwindcss/postcss` processes `globals.css` as plain CSS (the dead block isn't `@apply`-based or otherwise Tailwind-directive-dependent — it's hand-written CSS) — removing ~803 lines reduces the CSS asset's source size and, marginally, the PostCSS processing time. No build configuration references line ranges or byte offsets in this file, so no build-config changes are needed.

**Finding:** this is the cleanest of the five tasks. The evidence is unambiguous and the blast radius is a single file.

### Task 2 — Duplicate design tokens

**Scope analysis:**
- **Files involved:** `tailwind.config.ts` (lines 26-45) and `app/globals.css` (lines 113-124), if the goal is removing the redundant copy. Zero other files need to change, because zero other files consume the redundant copy (§2).
- **Components involved:** none directly — every component that renders a brand color does so via a Tailwind utility class (`bg-terracotta`, `text-navy-darkest`, etc.), which is compiled exclusively from `tailwind.config.ts`. Confirmed: the `--color-navy-darkest`-style CSS variables have no `var()`/arbitrary-value consumers, so no component's rendered output would change if that block were deleted.
- **Dependencies involved:** none — this is a pure CSS/config cleanup, not a package change.
- **Runtime impact:** none, if the redundant (dead) copy is the one removed. The compiled CSS output for every `bg-*`/`text-*` brand-color utility class is generated from `tailwind.config.ts` regardless of what `globals.css`'s `:root` block contains, since `@tailwindcss/postcss` v4 generates utility classes from the JS config independent of whether a same-named CSS variable also happens to exist.
- **Build impact:** none — removing unreferenced CSS custom properties does not change what Tailwind generates.

**Finding — narrower framing than "consolidate two systems":** the investigation shows this is closer to "delete a dead, redundant declaration" than "merge two live systems that must agree." `tailwind.config.ts` is the sole system with runtime consumers, for the specific brand-color subset. The genuinely-correct dual-layer pattern already exists in the same file for the neutral/semantic scale (`tailwind.config.ts:46-65` sourcing from `var(--n50)` etc., where `globals.css`'s copy of those tokens *is* the live source, confirmed by 16-file usage counts in §2) — meaning this codebase already knows how to do single-sourcing correctly; the brand-color block is the one place where that pattern wasn't followed and two independent literals were written instead.

### Task 3 — `framer-motion` / `styled-components`

**Scope analysis:**
- **Files involved (if actually removed — not being done here):** `package.json` (2 lines), `package-lock.json` (regenerated by the package manager, not hand-edited).
- **Components involved:** none — zero components import either package (§2).
- **Dependencies involved:** the two packages themselves, plus whatever `package-lock.json` resolution changes cascade from removing them (their own transitive dependencies would be pruned on a fresh `npm install`, not investigated further as this would require running the package manager, which is out of scope for a read-only investigation).
- **Runtime impact:** none — neither package ships any runtime code path in the current application; nothing would render differently.
- **Build impact:** marginal — both packages are currently `dependencies` (not `devDependencies`), so they are included in `npm install` resolution and in `node_modules` size, though not in the client bundle unless imported. Removing them would shrink `node_modules` and marginally speed up `npm install`, with no effect on the shipped Next.js build output since nothing currently imports them into any bundle.

**Finding:** confirmed unused by every method available short of actually removing the packages and rebuilding (which this investigation is not authorized to do). The one residual uncertainty is `sanity/package.json`'s separate declaration of `styled-components` — that's the Sanity Studio sub-project's own dependency tree, not the root Next.js app's, and was out of the literal scope of "this codebase" as the root `package.json` governs the app being audited; flagged in §10 as a clarification point since removing it from root `package.json` would not affect Sanity Studio's own build either way.

### Task 4 — "theme" field investigation

**Scope analysis:**
- **Files involved (if this were to be resolved, not being done here):** at minimum `sanity/schemaTypes/insight.ts` (to add a `theme` reference field) — a schema change, which has downstream implications for existing published Sanity documents (a schema addition is additive/non-breaking for existing content, but the field would need to be populated by content editors to have any effect). Possibly also `app/page.tsx` (to align its independent query with the shared `lib/sanity/queries.ts` constants and use `getLatestInsights()` instead of hand-rolling a fetch), though that is a separate, larger decision — see §9.
- **Components involved:** `InsightsSection` (`app/HomepageClient.tsx:475-568`) is the only homepage-visible consumer of the affected `category` field; `getInsightBySlug`'s broken `category: result.themeTitle` (§2) affects the `/insights/[slug]` detail page, outside the homepage but sharing the same root cause.
- **Dependencies involved:** none — this is entirely a first-party schema/query alignment issue, no package involved.
- **Runtime impact today:** none — `coalesce()` silently absorbs the nonexistent-field lookups everywhere except `getInsightBySlug` (`lib/sanity/insights.ts:157`), where `category: result.themeTitle` has no fallback and therefore always resolves to `undefined` in production for every insight detail page, since the underlying schema field it depends on doesn't exist.
- **Build impact:** none — GROQ is not statically type-checked against the Sanity schema at build time in this codebase (no generated-types step was found in `package.json`'s scripts, which only include `dev`/`build`/`start`/`lint`/four `studio:*` scripts) — an invalid field reference in a GROQ string is not a build-time error, only a silent runtime no-op.

**Finding:** this is explicitly an investigation task, not a change to execute, and the report's job is to characterize it accurately rather than propose the fix. The evidence strongly supports characterizing this as **an incomplete feature rollout** (schema field never added, despite query layer, a dedicated document type, and filter infrastructure all being built for it) rather than **leftover dead code** (which would imply a field that used to exist and was removed, or speculative code that was never real) or **query bug** (which would imply the wrong pattern for an otherwise-correct feature). The distinction matters for whoever picks this up next: the fix is "add the missing schema field and wire up the theme-picker UI that already has backend support," not "delete the dead `theme->` references from ten queries."

### Task 5 — Deferred architectural improvements

See §9 (Deferred Improvements) for the full list; each item's scope/evidence is documented there directly since the task itself *is* the identification of these items, not a proposal to execute any of them.

---

## 4. Risk Assessment

| Task | Risk Level | Rationale |
|---|---|---|
| 1. Remove dead CSS block | **Low** | Zero references anywhere in the repository across all file types; single-file change; no build-config dependency on the removed lines; visually and functionally inert today. |
| 2. Consolidate design tokens | **Low–Medium** | Low if scoped to deleting the provably-dead `globals.css` brand-color block (zero consumers, confirmed). Medium if the consolidation direction chosen instead is "move `tailwind.config.ts`'s hardcoded hex values to reference `var(--color-*)`" — that direction requires `@tailwindcss/postcss` to correctly resolve CSS custom properties inside a JS theme config at build time, which was not tested in this read-only investigation and is a materially different (untested) code path than the current all-hardcoded approach. |
| 3. Remove `framer-motion`/`styled-components` | **Low** | Confirmed zero application-code imports; no compiler flags reference them; no runtime code path exists today that would be affected. Residual risk is entirely process-level (a fresh `npm install` after removal, and whether CI/deploy pipelines pin exact versions anywhere not inspected in this investigation — see §10). |
| 4. Theme field investigation | **N/A (investigation only)** | No change is being proposed or executed for this task per its own instructions — it is explicitly an investigation deliverable. |
| 5. Identify deferred improvements | **N/A (investigation only)** | Same as above. |

---

## 5. Confidence Scores

| Task | Confidence | What's missing (if <95%) |
|---|---|---|
| 1. Remove dead CSS block | **98%** | The 2% gap is the theoretical possibility of a build tool or CI script that references `globals.css` by byte offset/line count rather than by CSS selector (not found in `package.json` scripts or `next.config.ts`, but a repo-wide search for every possible tool config — e.g. a visual-regression-testing config, a Percy/Chromatic snapshot baseline — was not exhaustively performed, since no such tooling was found declared in `package.json`'s `devDependencies` in the first place). |
| 2. Consolidate design tokens | **90%** | Two things were not verified: (a) whether any other part of the application (outside the homepage — the four earlier audits in this engagement were homepage-scoped) reads `--color-navy-darkest` etc. via inline `style` attributes rather than `var()`/Tailwind arbitrary-value class syntax, which the grep pattern used would not catch if written unusually (e.g., string-concatenated CSS-in-JS); (b) whether removing `globals.css`'s copy vs. keeping both in permanent sync is the team's actual intended direction — this is a judgment call the investigation surfaced evidence for but cannot resolve unilaterally (see §10). |
| 3. Remove dependencies | **95%** | The remaining 5% is the `sanity/` sub-package's independent `styled-components` declaration (§3) — whether the two `package.json` files are intended to be treated as one dependency surface or two independent ones was not established by any documentation found in the repository, and affects whether "safe to remove" means "remove from root only" or "remove from both." |
| 4. Theme field investigation | **92%** | The 8% gap: whether a `theme` field was ever planned in a design document, ticket, or Sanity Studio draft/unpublished schema change not present in this git repository (e.g., a schema edit made directly in Sanity's hosted Studio UI and never committed here, or an external project-management record) could not be checked — this investigation is scoped to the repository's own version-controlled history, which conclusively shows the field was never present in *this repo's* schema files, but cannot speak to intent recorded elsewhere. |
| 5. Deferred improvements | **N/A** | Enumerative task — see §9 for each item's individual confidence framing. |

---

## 6. Files That Would Change

*(Listed for planning purposes only — no files were changed to produce this report.)*

**Task 1:**
- `app/globals.css` — delete lines 384-1186 (the six dead sections). Lines 1187-1193 (`@layer base {}` / `@layer components {}` empty stubs) are a separate, minor decision — they contain no rules and could be retained as intentional extension points or removed as noise; either choice is independent of the dead-block removal itself.

**Task 2 (if executed as "delete the dead copy" — the lower-risk direction):**
- `app/globals.css` — delete lines 113-124 except `--color-text-dark` (`line 121`, confirmed live via `globals.css`'s own `body` rule) — that one line would need to move or be reconciled separately since it's a genuine (if narrow) consumer.
- `tailwind.config.ts` — no change needed under this direction, since it's already the sole live source.

**Task 2 (if executed as "CSS variables become the source of truth" — the higher-risk, unverified direction):**
- `tailwind.config.ts` — lines 27-40 would change from hardcoded hex to `var(--color-*)` references.
- `app/globals.css` — no deletions, but would become the canonical definition site.
- This direction was not further scoped in detail because §5 flags it as needing a build-time verification step this investigation could not perform without modifying and rebuilding the project.

**Task 3 (if executed):**
- `package.json` — remove lines 22 and 31.
- `package-lock.json` — regenerated by the package manager (not hand-edited).
- Optionally `sanity/package.json`/`sanity/package-lock.json` if the sub-package's independent `styled-components` declaration is included in scope (§10, open question).

**Task 4:** no files are proposed for change — this task is investigation-only per its own framing (the report is asked to *investigate*, not resolve, the theme field discrepancy).

**Task 5:** no files are proposed for change — see §9.

---

## 7. Execution Plan

*(Described for planning purposes only. Not performed.)*

### Task 1 — Remove dead CSS block
1. Re-run the repo-wide, all-file-type grep from §2 immediately before executing, to catch any file added between this report's writing and execution time.
2. Open `app/globals.css`, delete lines 384 through 1186 inclusive (verify the exact boundary by re-locating the `/* HOMEPAGE — Section 1: Constellation Hero */` comment marker and the file's final content before the `@layer` stubs, rather than trusting hardcoded line numbers, since any prior edit could shift them).
3. Leave lines 1-383 untouched (confirmed live: fonts, spacing tokens referenced elsewhere, the `diamond-drift` keyframe consumed by `DiamondMotif`, base typography rules, `.layout-container`/`.section-wrapper` legacy classes confirmed in use by `app/careers/page.tsx` and `src/sections/service-detail/ServiceDetailSections.tsx`).
4. Decide separately (not part of this deletion) whether to keep or remove the trailing empty `@layer base {}`/`@layer components {}` stubs.

### Task 2 — Consolidate design tokens
1. Confirm the team's intended direction (§10, open question) — this determines which of the two file-change plans in §6 applies.
2. If "delete the dead copy" direction is chosen: remove `globals.css:113-124` except the `--color-text-dark` line; separately decide whether `--color-text-dark`'s single internal consumer (`globals.css`'s own `body` rule) should instead read from a `tailwind.config.ts`-sourced value or remain a standalone CSS variable, since it's used at the CSS layer rather than via a Tailwind utility class.
3. If "CSS becomes source of truth" direction is chosen: rewrite `tailwind.config.ts:27-40` to reference `var(--color-*)` per key, then rebuild and visually diff every page that renders a brand color (not just the homepage) to confirm Tailwind v4's config loader resolves the custom properties identically to the current hardcoded hex.
4. Either direction: do not touch the neutral/semantic scale — it is already correctly single-sourced and out of scope.

### Task 3 — Remove `framer-motion`/`styled-components`
1. Resolve the `sanity/` sub-package scope question (§10) before touching anything.
2. Remove the two lines from `package.json`'s `dependencies` block.
3. Run the package manager's install/lock step to regenerate `package-lock.json` (not a hand-edit).
4. Do not touch `next.config.ts` — no flags reference either package, so no config cleanup is coupled to this change.

### Task 4 — Theme field
No execution plan is provided, per the task's own framing as an investigation, not a change request. If the team later decides to act on the finding in §2/§3, the two realistic directions are (a) add a `theme` reference field to `sanity/schemaTypes/insight.ts` and wire up the already-built `getPublishedInsightThemes()`/theme-filter query into a UI component, completing the feature as originally scaffolded, or (b) formally remove the `theme->`/`themeTitle` references from all 10 query constants and delete the now-orphaned `insightTheme` schema, `PUBLISHED_INSIGHT_THEMES_QUERY`, and `getPublishedInsightThemes()` if the feature is no longer wanted. Both are redesign-adjacent decisions, not maintenance-scope changes, and neither is recommended over the other by this investigation — see §10.

### Task 5
No execution plan — see §9.

---

## 8. Validation Plan

*(Described for planning purposes only. Not performed.)*

**Task 1:**
- `npx tsc --noEmit` — should show no new errors (CSS deletion cannot introduce TypeScript errors, included for completeness of the standard validation sequence used earlier in this engagement).
- `npm run build` — should complete successfully; compare the emitted CSS asset's byte size before/after as a sanity check that the deletion took effect.
- Visual check: load `/` (and, since `globals.css` is global, spot-check `/services`, `/industries`, `/about`, `/contact` — any route touched by earlier audits) in a browser and confirm no visual regression, since the block being removed was already confirmed to have zero selectors matching any rendered element.

**Task 2:**
- Same `tsc`/`build` steps.
- A pixel-level or close visual diff of every page using `bg-terracotta`, `text-navy-darkest`, `bg-blue-*`, `text-eyebrow` classes (found via the same grep methodology used in the four prior audits) before and after the change, since this task's entire purpose is "preserving identical visual output" per the task's own wording — this is the one task in this batch where a visual regression is the primary failure mode to guard against, not a build error.
- If the "CSS becomes source of truth" direction is chosen: additionally inspect the compiled `.next/static/chunks/*.css` output (the same method used in the earlier `HOMEPAGE_AUDIT.md` investigation to confirm `tailwind.config.ts` was being picked up) to confirm the generated utility classes still resolve to the correct hex values, not to an unresolved `var(--color-navy-darkest)` string.

**Task 3:**
- `npm install` (or equivalent) completes without error after the `package.json` edit.
- `npx tsc --noEmit` and `npm run build` both succeed.
- Grep the emitted `.next` build output for `framer-motion`/`styled-components` strings as a final confirmation neither is present in the shipped bundle (expected: no matches, since neither was imported before removal either).

**Task 4:** no validation plan — investigation only.

**Task 5:** no validation plan — investigation only.

---

## 9. Deferred Improvements

Architectural improvements identified during this and the four prior audits in this engagement, explicitly excluded from the current maintenance scope because each requires a design/product decision, touches shared (non-homepage-exclusive) code, or is redesign-scale rather than a mechanical cleanup:

1. **Homepage bypasses the shared Sanity fetch layer entirely.** `app/page.tsx` hand-rolls its own `sanityClient.fetch()` call, its own query, and its own type (`HomepageInsight`) instead of using `lib/sanity/insights.ts`'s existing `getLatestInsights(limit)` — which already handles errors, ISR cache tags (`lib/sanity/fetch.ts:20-32`), and ordering. This is the single highest-leverage deferred item: fixing it would likely have prevented the Task 4 discrepancy from existing as an isolated fifth variant, and would resolve the `force-dynamic`/`revalidate=120` tension noted in `HOMEPAGE_ONBOARDING.md` §1, since `sanityFetch()`'s `next: { revalidate }` option is the pattern the rest of the app already uses. Deferred because it changes the homepage's data contract (`HomepageInsight` type, field names `dek` vs. `excerpt`) and touches `app/HomepageClient.tsx`'s consuming code, not just the fetch call.
2. **The dormant `page` document schema.** `sanity/schemaTypes/page.ts:7-16`'s `homepage` fieldset (`heroTitle`, `heroSubtitle`, `differentiation[]`, `industries[]`, etc.) is fully built and registered but never queried anywhere (established in `HOMEPAGE_CONTENT_AUDIT.md` §1-3). Deferred because resolving it requires a product decision (wire it up vs. formally retire it), not a mechanical fix.
3. **`ClusterCardBig`/`ClusterCardSmall` near-duplication** (`app/HomepageClient.tsx:287-369`) — identical prop signatures, near-identical structure, differing only in Tailwind sizing classes. Deferred because collapsing them is a refactor with UI-surface risk, not a pure cleanup.
4. **Entire homepage renders as one client boundary** (`app/HomepageClient.tsx:1`, `"use client"` applies file-wide) when only `DifferentiatorsSection` and `InsightsSection` have actual interactivity — established in `HOMEPAGE_ONBOARDING.md` §5. Deferred because splitting the file to let 5 of 7 sections become Server Components is a structural change with hydration-boundary implications, not a cleanup task.
5. **`service` schema's category taxonomy doesn't match the static fallback data's cluster IDs** (`sanity/schemaTypes/service.ts:87-92` vs. `src/sections/services/data.ts:19-24`) — established in `HOMEPAGE_CONTENT_AUDIT.md` §2. Deferred because reconciling two already-diverged taxonomies is a content-modeling decision, not a code fix.
6. **No `<main>` landmark and no skip link anywhere in the layout** (`app/ClientLayout.tsx:9-19`) — established in `HOMEPAGE_ONBOARDING.md` §21. Deferred from *this* maintenance batch only because it wasn't one of the five requested tasks — it is otherwise a low-risk, high-value fix that could reasonably be bundled into a future small maintenance pass rather than a redesign.
7. **No `app/loading.tsx`/`app/error.tsx` for the homepage route**, unlike `/insights` and `/services` which both have them — established in `HOMEPAGE_ONBOARDING.md` §1. Same deferral reasoning as item 6.
8. **`getInsightBySlug`'s `category: result.themeTitle` has no fallback** (`lib/sanity/insights.ts:157`), meaning the `/insights/[slug]` detail page's category is always `undefined` in production today, a concrete downstream consequence of the Task 4 schema gap already actively affecting a shipped page (not just the homepage). Flagged here rather than folded into Task 4's own scope because fixing it requires the same schema/UI decision as item 1 in this list.
9. **Two independent design-token systems for the neutral/semantic scale exist correctly today, but the pattern isn't documented anywhere** (no `README`, `CONTRIBUTING.md`, or code comment in `tailwind.config.ts` explaining *why* neutral/semantic reference CSS variables while brand colors don't) — a documentation gap that likely contributed to the brand-color duplication in Task 2 happening in the first place, since there was no written precedent for a future contributor to follow.

---

## 10. Questions Requiring Clarification

1. **Task 2 direction:** should the design-token consolidation make `tailwind.config.ts` the single source (delete `globals.css`'s dead brand-color block, the lower-risk path with confirmed-zero consumers) or make `globals.css`'s CSS variables the single source (rewrite `tailwind.config.ts` to reference them, matching the pattern already used for the neutral/semantic scale, but requiring a build-time verification this investigation didn't perform)?
2. **Task 3 scope:** does "this codebase" for the purposes of removing `framer-motion`/`styled-components` include the `sanity/` sub-package's independent `package.json` (which separately declares `styled-components`), or only the root application's `package.json`?
3. **Task 4 direction:** is the `theme`/`insightTheme` feature (schema field, filter UI, category display) something the team still intends to finish — in which case the next step is a schema migration plus a UI component to consume `getPublishedInsightThemes()` — or has it been superseded/abandoned, in which case the next step is removing the now-orphaned query constants, schema type, and fetch function instead? This investigation found strong evidence of intent (a fully-built supporting layer) but no evidence of current priority or timeline.
4. **Task 5 / item 1 (highest-leverage deferred item):** is replacing the homepage's hand-rolled Sanity fetch with the existing `getLatestInsights()` function considered in-scope for a near-term maintenance follow-up, or does it need to wait for the broader "Cycle 4"/redesign work referenced in this engagement's earlier audits (`HOMEPAGE_AUDIT.md`'s context note)? The two are related but not identical in scope, and doing the fetch-layer fix independently of a visual redesign appears low-risk based on the evidence gathered, but was not itself deeply scoped as part of this investigation (it wasn't one of the five requested tasks).
5. **Task 1, minor:** should the trailing empty `@layer base {}`/`@layer components {}` stubs (`globals.css:1187-1193`) be removed alongside the dead block, or kept as intentional (if currently empty) extension points for future Tailwind customization?
