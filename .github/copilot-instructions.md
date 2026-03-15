# Project Guidelines

## Code Style
- Use TypeScript with strict typing and narrow runtime guards (validate external data before rendering).
- Prefer existing import style with path alias `@/*` (configured in `tsconfig.json`).
- Keep edits minimal and localized; follow existing formatting in touched files.
- For API handlers, return JSON via `success(...)` / `error(...)` helpers in `lib/server/apiResponse.ts`.

## Architecture
- Main app is Next.js App Router in `app/` with Server Components by default.
- Use `components-v2/` as the primary UI system for layout, sections, foundation hooks, and UI primitives.
- Use `lib/sanity/` for Sanity client/query access and keep GROQ query definitions centralized in `lib/sanity/queries.ts`.
- `sanity/` is a standalone Studio workspace. Do not couple Studio-only code into frontend runtime code paths.
- `figma-reference/` is a separate design reference project; avoid changing it unless explicitly requested.

## Build and Validate
- Install: `npm install`
- Dev server: `npm run dev`
- Type check: `npx tsc --noEmit`
- Lint: `npm run lint`
- Production build: `npm run build`
- Studio setup: `npm install --prefix sanity`
- Studio dev: `npm run studio:dev`
- Studio build/start/deploy: `npm run studio:build`, `npm run studio:start`, `npm run studio:deploy`
- CI expects: type check, lint, and build (`.github/workflows/ci.yml`).

## Conventions
- Dynamic route page signatures use promised params in this codebase:
  - `generateMetadata({ params }: { params: Promise<{ slug: string }> })`
  - `const { slug } = await params`
- When querying Sanity content for public pages, include the publish gate used across this repo:
  - `(status == "published" || !defined(status))`
- For slug fields, prefer defensive projection patterns already used here, e.g. `coalesce(slug.current, slug)`.
- Keep metadata and page rendering resilient: provide safe fallback metadata and use `notFound()` for missing detail content where appropriate.
- Contact API relies on SMTP environment variables (`SMTP_HOST`, `SMTP_USER`, `SMTP_PORT`, `SMTP_PASS`, `CONTACT_EMAIL`).

## References
- Migration/fallback strategy: `docs/sanity-replacement-strategy.md`
- Root scripts and dependencies: `package.json`
- Studio scripts: `sanity/package.json`
- Query patterns: `lib/sanity/queries.ts`
