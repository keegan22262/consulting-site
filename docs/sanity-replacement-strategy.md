# Safe Sanity integration strategy (replacing `lib/services.ts` + `lib/insights.ts`)

## Goals

- Replace the hardcoded, placeholder exports in `lib/services.ts` and `lib/insights.ts` with Sanity-backed content.
- Guarantee that **no page breaks** during the migration.
- Keep a **reliable fallback** to local data if Sanity is missing/unavailable.
- Support “separate concern” Studio (already under `sanity/`) and keep frontend resilient when env vars are absent.

## Non-goals / constraints

- **Do not modify any pages yet.** This plan is designed so the swap can be done later with minimal, safe changes.
- Do not make Sanity configuration mandatory for local dev or CI builds.
- Avoid import-time failures: Sanity modules must not throw at module import when env vars are absent.

## Current state (what we must preserve)

### Local data modules

- `lib/services.ts` exports:
  - Types: `ServicePhase`, `ServiceCategory`, `ServiceDomain`, `Service`
  - Data: `serviceDomains: ServiceDomain[]`, `services: Service[]`

- `lib/insights.ts` exports:
  - Type: `Insight`
  - Data: `insights: Insight[]`

Pages and components may import these values directly (e.g., `services.map(...)`). That means:

- The migration must preserve the **existing type shapes** (or remain compatible) until all call sites are migrated.
- Any async fetch must be introduced **without forcing pages to change** (initially).

### Sanity query helpers (already present)

- `lib/sanity/services.ts` (`getAllServices`, `getServiceBySlug`)
- `lib/sanity/insights.ts` (`getAllInsights`, `getInsightBySlug`)

These return *Sanity-shaped* types (e.g., `slug`, `summary`, optional rich `content`). They do not match the local placeholder shapes 1:1.

## Recommended architecture (safe + incremental)

Introduce a small “content repository” layer that can serve content from either source:

- **Primary source (when enabled + available):** Sanity via `sanityFetch(...)`
- **Fallback source (always available):** local exported arrays from `lib/services.ts` / `lib/insights.ts`

Key idea: make the *selection logic* explicit and centrally tested:

- `SANITY_ENABLED=true|false` controls whether we even attempt Sanity.
- Sanity being “unavailable” includes:
  - missing `SANITY_PROJECT_ID` / `SANITY_DATASET` / `SANITY_API_VERSION`
  - network / API errors
  - empty results (optional policy)

### Two stable “public APIs” to support

During transition, support both:

1) **Legacy synchronous exports** (unchanged, for existing pages):
   - `services`, `serviceDomains`, `insights`

2) **New async repository functions** (opt-in for future page migrations):
   - `getServices(): Promise<Service[]>`
   - `getInsights(): Promise<Insight[]>`
   - Optional: `getServiceById(id)` / `getInsightBySlug(slug)`

This lets you migrate pages **one route at a time** later.

## Step-by-step replacement plan

### Phase 0 — Baseline and guardrails (no behavior changes)

1. **Inventory imports** of `lib/services.ts` and `lib/insights.ts`.
2. Document the exact shapes pages rely on (fields, assumptions like stable ids).
3. Confirm build/dev work with Sanity env vars missing.

Acceptance criteria:
- `npm run build` works with no Sanity env vars.
- No runtime crashes due to Sanity config.

### Phase 1 — Define mapping contracts (design step)

Local `Service` vs Sanity `service` do not match perfectly:

- Local uses `id`; Sanity uses `slug`.
  - Recommendation: treat `id = slug` moving forward.
- Local includes `phase` and strict `category` union.
  - Recommendation: keep `category` as a string in Sanity OR enforce a strict list in schema.
  - Recommendation: store `phase` in Sanity as `mvp|future` so the UI can stay consistent.

Local `Insight` vs Sanity `insight`:

- Local `content` is a string; Sanity content is Portable Text blocks.
  - Recommendation: define a canonical “display model” used by pages.
  - Interim strategy: serialize Portable Text to plain text for the legacy model (or keep legacy pages on local data until they migrate to PT rendering).

Deliverables:
- A short mapping spec (table) for each model.

### Phase 2 — Add repository layer (still no page changes)

Create modules that can return either source:

- `lib/content/servicesRepo.ts`
- `lib/content/insightsRepo.ts`

These should:

- Export async functions only (`getServices`, `getInsights`, etc.).
- Implement fallback:
  - If `SANITY_ENABLED !== "true"` → return local data.
  - Else try Sanity → map to legacy model → if empty/error → return local data.

Important:
- The repository layer should **never throw** for expected outages; it should log (optionally) and fall back.

Suggested env vars:

- `SANITY_ENABLED=false` (default)
- `SANITY_DEBUG=true|false`

### Phase 3 — “Shadow mode” verification (optional but safest)

Before migrating any pages:

1. Create a script (node/tsx) that fetches from Sanity and compares keys to local arrays.
2. Validate:
   - every local `service.id` exists as a Sanity `slug`
   - every local `insight.slug` exists in Sanity
   - required fields are populated

This reduces the chance of blank lists after switching.

### Phase 4 — Migrate pages gradually (future step; not done now)

Route-by-route, update pages to use the async repository functions (or directly Sanity helpers):

- Start with list pages: `/services`, `/insights`
- Then detail pages: `/services/[slug]`, `/insights/[slug]`

Each route gets:

- a minimal loading state
- a non-crashing empty state (e.g., “No items available”) if both sources fail (should be rare)

### Phase 5 — Replace legacy exports (final step)

After all pages no longer import `services` / `insights` arrays:

1. Remove placeholder arrays from `lib/services.ts` / `lib/insights.ts` (or keep as seed data in a separate folder).
2. Keep the types if they remain useful, or move types to a dedicated `lib/content/types.ts`.
3. Keep a small set of test fixtures for UI tests.

## Recommended fallback policy

Use a 3-tier decision policy:

1. **Feature flag OFF** (`SANITY_ENABLED!="true"`) → local data
2. **Flag ON, but Sanity unavailable** (missing env / fetch error) → local data
3. **Flag ON, Sanity returns empty** →
   - Option A (safer): fall back to local data
   - Option B (stricter): show empty state so you notice missing content

Recommendation: start with **Option A** until content is fully seeded in Sanity; later switch to Option B.

## Operational notes (prevent page breaks)

- Keep Sanity client “server-only” and avoid import-time throws (already the direction in this repo).
- Avoid coupling page rendering to Sanity availability.
- Log Sanity failures only when `SANITY_DEBUG=true` to keep CI/build logs clean.
- Consider caching (`cache()` and Next.js revalidation) once the source of truth is Sanity.

## Checklist for the eventual cutover

- [ ] Content seeded in Sanity for all existing services/insights
- [ ] Repo layer mapping tested via script
- [ ] `SANITY_ENABLED=true` in staging first
- [ ] Monitor logs for missing fields / empty queries
- [ ] Migrate pages gradually
- [ ] Remove legacy arrays only after all imports are gone
