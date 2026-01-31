# Project State (Current)

## 1. Project Overview
- Tech stack: Next.js 16.1.5, React 19.2.3, TypeScript 5.x, Tailwind CSS 4.x, ESLint 9.x
- Framework & architecture style: Next.js App Router (`app/`), file-system routing, React Server Components by default with page-level composition; static in-repo data modules under `lib/`

## 2. Directory & File Structure Summary
- `app/`: App Router routes, global layout, and global styles
  - `layout.tsx`: root layout + global metadata
  - `globals.css`: base styles + typography rules
  - Route folders: `about/`, `how-we-work/`, `insights/`, `privacy/`, `services/`, `terms/`
  - `components/`: re-export stubs for shared components (mirrors `components/`)
- `components/`: shared UI building blocks
  - `components/layout/`: header/footer/container layout primitives
  - `components/sections/`: page sections and cards
- `lib/`: static content/data modules (`services.ts`, `insights.ts`)
- `public/`: static assets (SVGs)
- Root configuration: `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `tsconfig.json`, `eslint.config.mjs`, `package.json`

## 3. Routing & Pages Implemented
- Implemented routes (page files present):
  - `/` (home)
  - `/about`
  - `/how-we-work`
  - `/services`
  - `/services/[slug]`
  - `/insights`
  - `/privacy`
  - `/terms`
- Referenced but missing routes (linked in navigation and/or CTAs, but no corresponding `app/.../page.tsx` found):
  - `/contact`
  - `/careers`
- API routes status: no `app/**/route.ts` files found

## 4. Global Layout & Design System
- Fonts
  - Uses Google Inter via `next/font/google` in the root layout
- Layout wrappers
  - Root layout renders `Header`, then `<main>{children}</main>`, then `Footer`
  - `Container` enforces a shared max width and horizontal padding via Tailwind classes
- Typography & spacing enforcement
  - `app/globals.css` defines base typography rules for `h1`, `h2`, `h3`, and `p` via Tailwind `@layer base`
  - Tailwind config extends:
    - Type scale (xs through 4xl) with explicit line heights
    - Spacing tokens (18/22/26)
    - `maxWidth.content` token used by layout containers

## 5. Navigation & Interaction Flow
- Header navigation
  - Primary nav items: Home, About, How We Work, Services, Insights, Careers, Contact
  - Brand link targets `/`
- Footer navigation
  - Secondary nav items: About, How We Work, Services, Insights, Careers, Contact
  - Legal nav items: Privacy Policy (`/privacy`), Terms (`/terms`)
  - Includes a year-based copyright line
- CTA patterns
  - CTAs across the site primarily link to `/contact` (including default `CTA` component behavior)

## 6. Reusable Components & Sections
- Layout components
  - Header: `components/layout/Header.tsx`
  - Footer: `components/layout/Footer.tsx`
  - Container: `components/layout/Container.tsx`
- Sections and reusable UI
  - `Hero`
  - `ServicesOverview`
  - `Services` (renders the full services list as a section component)
  - `ServiceCard`
  - `ServiceContent`
  - `TrustSignals`
  - `InsightsTeaser`
  - `InsightCard`
  - `CTA`
- Section composition used on pages
  - Home (`/`): Hero → ServicesOverview → TrustSignals → InsightsTeaser → CTA
  - About (`/about`): includes TrustSignals as a standalone section inside the page
  - Services (`/services`): renders a grid of ServiceCard items
  - Service detail (`/services/[slug]`): uses ServiceContent + CTA
  - Insights (`/insights`): renders a grid of InsightCard items

## 7. Data Layer & Content Handling
- Static data files
  - `lib/services.ts`: exports service type definitions plus:
    - `services` array used by services pages and service cards
    - `serviceDomains` array present as a data-only taxonomy list
  - `lib/insights.ts`: exports `insights` array used by insights pages/cards
- CMS readiness
  - No CMS integration code found; data is imported directly from `lib/` modules
- API routes status
  - No API route handlers found

## 8. Services Architecture
- Services overview
  - `/services` lists all `services` from `lib/services.ts` as cards
  - Home page shows a featured subset via `ServicesOverview` (slices the services list)
- Dynamic service detail status
  - `/services/[slug]` resolves services by matching `slug` to a service `id`
  - Handles missing/empty/unknown slugs by rendering a “Service not found” page state
  - Implements route-level dynamic metadata via `generateMetadata`

## 9. Insights / Thought Leadership
- Insights listing
  - `/insights` renders all items from `lib/insights.ts` as a card grid
  - Home page teaser selects and displays the two most recent items by date
- Detail pages status
  - No dynamic insight detail route found (no `app/insights/[...]/page.tsx` present)

## 10. Contact & Engagement
- Contact page
  - No `/contact` page route found
- Forms and validation
  - No form components or submit handlers detected in the repository scan (no `<form>`/`onSubmit` usage found in non-ignored source files)

## 11. What Is Complete vs Partial vs Not Implemented
- Complete (routes implemented and linked internally)
  - `/`, `/about`, `/how-we-work`, `/services`, `/services/[slug]`, `/insights`, `/privacy`, `/terms`
- Partial (referenced in navigation/CTAs but not implemented as routes)
  - `/contact`, `/careers`
- Not implemented (no supporting files found)
  - API routes under `app/**/route.ts`
  - Forms/validation and any server-side submission handling
