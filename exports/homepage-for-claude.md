# RSL Homepage — Full code export for Claude redesign

> **⚠️ HISTORICAL SNAPSHOT — DO NOT USE AS A REFERENCE FOR CURRENT VALUES.**
> This is a verbatim export of the codebase as of 2026-05-26 and is not kept in
> sync. In particular, the typography tokens below (e.g. `--text-h1: 3rem`,
> `--text-body: 1rem`, `--text-caption: 0.8125rem`) predate the Cycle 1
> typography evolution. The canonical, current token scale lives in
> `app/globals.css` (e.g. `--text-h1: 48px`, `--text-body: 15px`,
> `--text-caption: 13px`) — that file is the single source of truth.

Generated: 2026-05-26 12:36

## Instructions for Claude
- Redesign/polish the RSL homepage (route `/`).
- Return complete file contents for each path below; keep Next.js App Router + `"use client"` where present.
- Preserve Sanity data flow in `app/page.tsx` → `HomepageClient` insights prop.

## Image assets (do not paste binaries; keep these paths)
- `/images/sections/office-team.jpeg`
- `/images/sections/real-estate-investment.jpeg`
- `/images/sections/mentorship.jpeg`
- `/images/sections/teamwork-conference.jpeg`
- `/images/capabilities/strategy.jpg`, `digital-ai.jpg`, `financial.jpg`
- `/images/industries/sectors/financial-services.jpg`, `healthcare-life-sciences.jpg`, `energy-resources.jpg`
- `/images/insights/insight-1.jpg`, `insight-2.jpg`, `insight-3.jpg`, `insight-5.jpg`

## Files included (18 total)
| # | Path |
|---|------|
| 1 | app/page.tsx |
| 2 | app/HomepageClient.tsx |
| 3 | app/layout.tsx |
| 4 | app/ClientLayout.tsx |
| 5 | app/globals.css |
| 6 | src/styles/semantic.css |
| 7 | tailwind.config.ts |
| 8 | tokens/tokens.json |
| 9 | components-v2/sections/ConstellationHero.tsx |
| 10 | components-v2/sections/InsightsCarouselSection.tsx |
| 11 | components-v2/sections/FeaturedServicesSection.tsx |
| 12 | components-v2/layout/SiteHeader.tsx |
| 13 | components-v2/layout/SiteFooter.tsx |
| 14 | components-v2/layout/SearchOverlay.tsx |
| 15 | src/components/ScrollReveal.tsx |
| 16 | src/lib/motion/useReducedMotionPreference.ts |
| 17 | lib/breakpoints.ts |
| 18 | components-v2/ui/PreviewBanner.tsx |

---

================================================================================
FILE 1: app\page.tsx
Homepage route (server)
================================================================================

```tsx
import type { Metadata } from "next";
import groq from "groq";
import HomepageClient from "./HomepageClient";
import { sanityClient } from "@/lib/sanity/client";

export const dynamic = "force-dynamic";
export const revalidate = 120;

export const metadata: Metadata = {
  title: "Institutional Advisory Built for Growth, Transformation, and Execution",
  description:
    "Rill Singh Limited advises growth-stage companies, public institutions, and sovereign entities across Africa on strategy, capital, digital transformation, and governance.",
  alternates: {
    canonical: "/",
  },
};

const HOMEPAGE_INSIGHTS_QUERY = groq`*[_type == "insight" && featured == true && (status == "published" || !defined(status))]
  | order(date desc)[0...3] {
    _id,
    title,
    "slug": coalesce(slug.current, slug),
    summary,
    "excerpt": coalesce(excerpt, summary, pt::text(coalesce(body, content))),
    "category": coalesce(theme->title, category)
  }`;

type InsightQueryResult = {
  _id: string;
  title?: string;
  slug?: string;
  summary?: string;
  excerpt?: string;
  category?: string;
};

export default async function Home() {
  const insightsRaw = await sanityClient.fetch<InsightQueryResult[]>(HOMEPAGE_INSIGHTS_QUERY);

  const insights = (insightsRaw ?? [])
    .filter((item): item is InsightQueryResult & { slug: string; title: string; summary: string } =>
      Boolean(item.slug && item.title && item.summary)
    )
    .map((item) => ({
      slug: item.slug,
      category: item.category ?? "Insight",
      title: item.title,
      excerpt: item.excerpt ?? item.summary,
      summary: item.summary,
    }));

  return <HomepageClient insights={insights} />;
}
```


================================================================================
FILE 2: app\HomepageClient.tsx
Main homepage component
================================================================================

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import FeaturedServicesSection from "@/components-v2/sections/FeaturedServicesSection";
import InsightsCarouselSection from "@/components-v2/sections/InsightsCarouselSection";
import ConstellationHero from "@/components-v2/sections/ConstellationHero";
import ScrollReveal from "@/components-v2/ui/ScrollReveal";

interface HomepageClientProps {
  insights: Array<{
    slug: string;
    category?: string;
    title: string;
    excerpt?: string;
    summary?: string;
  }>;
}

function CheckIcon() {
  return (
    <div className="homepage-check-icon">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 6l3 3 5-5" stroke="#052659" strokeWidth="2" fill="none" />
      </svg>
    </div>
  );
}

export default function HomepageClient({ insights }: HomepageClientProps) {
  return (
    <>
      {/* SECTION 1: HERO */}
      <ConstellationHero />

      {/* SECTION 2: INTRODUCTION */}
      <section className="homepage-intro">
        <div className="homepage-intro__inner">
          <ScrollReveal direction="left" delay={100} distance={50} duration={900} className="homepage-intro__images">
            <div className="homepage-intro__img-main">
              <Image src="/images/sections/office-team.jpeg" alt="Advisory setting" fill sizes="320px" className="object-cover" quality={90} />
            </div>
            <div className="homepage-intro__img-top">
              <Image src="/images/sections/real-estate-investment.jpeg" alt="Strategic investment" fill sizes="200px" className="object-cover" quality={90} />
            </div>
            <div className="homepage-intro__img-bottom">
              <Image src="/images/sections/mentorship.jpeg" alt="Mentorship" fill sizes="220px" className="object-cover" quality={90} />
            </div>
            <div className="homepage-intro__badge">
              <span className="homepage-intro__badge-number">10+</span>
              <span className="homepage-intro__badge-label">Advisory Disciplines</span>
            </div>
          </ScrollReveal>

          <div className="homepage-intro__content">
            <ScrollReveal direction="right" delay={200} distance={30} duration={800}>
              <p className="homepage-intro__desc">
                We advise growth-stage companies, institutional operators, and public-sector leaders
                navigating structural complexity â€” delivering measurable outcomes with discipline.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={350} distance={25} duration={700}>
              <div className="homepage-intro__card border-blue-mid">
                <h4 className="homepage-intro__card-title">Integrated Advisory</h4>
                <p className="homepage-intro__card-text">
                  Ten disciplines under one roof â€” strategy, digital, finance, people, and governance
                  â€” delivered through a shared methodology framework.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={500} distance={25} duration={700}>
              <div className="homepage-intro__card border-blue-light">
                <h4 className="homepage-intro__card-title">Execution Discipline</h4>
                <p className="homepage-intro__card-text">
                  Strategy without implementation is academic. We operate at the intersection of
                  advisory insight and delivery accountability.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={650} distance={20} duration={700}>
              <div className="homepage-intro__ctas">
                <Link href="/services" className="homepage-btn homepage-btn--primary">
                  Explore Our Services
                </Link>
                <Link href="/insights" className="homepage-btn homepage-btn--outline">
                  Read Our Latest Thinking
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 3: EXPLORE + ADVISORY ARCHITECTURE */}
      <section className="homepage-advisory">
        <div className="homepage-advisory__inner">
          <ScrollReveal direction="left" delay={100} distance={50} duration={900} className="homepage-advisory__images">
            <div className="homepage-advisory__img-circle">
              <Image src="/images/sections/teamwork-conference.jpeg" alt="Advisory boardroom" fill sizes="300px" className="object-cover" quality={90} />
            </div>
            <div className="homepage-advisory__img-rect">
              <Image src="/images/sections/real-estate-investment.jpeg" alt="Team collaboration" fill sizes="240px" className="object-cover" quality={90} />
            </div>
            <div className="homepage-advisory__stats-badge">
              <span className="homepage-advisory__stats-number">11</span>
              <span className="homepage-advisory__stats-label">Industry Sectors</span>
            </div>
            <div className="homepage-advisory__dots" aria-hidden="true" />
          </ScrollReveal>

          <div className="homepage-advisory__content">
            <ScrollReveal direction="right" delay={150} distance={25} duration={800}>
              <p className="homepage-advisory__overline">Explore</p>
              <h2 className="homepage-advisory__heading">
                How can we assist you today?
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={300} distance={20} duration={700}>
              <div className="homepage-advisory__pills">
                <Link href="/services" className="homepage-pill homepage-pill--filled">By Capability</Link>
                <Link href="/industries" className="homepage-pill homepage-pill--outline">By Industry</Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={400} distance={25} duration={800}>
              <p className="homepage-advisory__sub-overline">Advisory Architecture</p>
              <h3 className="homepage-advisory__sub-heading">
                Ten disciplines. One integrated practice.
              </h3>
              <p className="homepage-advisory__desc">
                Ten advisory disciplines operate within a unified governance and delivery architecture
                â€” eliminating fragmentation, aligning strategic intent with execution mechanics, and
                ensuring institutional coherence across every engagement.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={550} distance={20} duration={700}>
              <div className="homepage-advisory__checklist">
                <div className="homepage-advisory__check-item"><CheckIcon /><span>Strategy & Transformation</span></div>
                <div className="homepage-advisory__check-item"><CheckIcon /><span>Digital & AI Advisory</span></div>
                <div className="homepage-advisory__check-item"><CheckIcon /><span>Financial & Risk Advisory</span></div>
                <div className="homepage-advisory__check-item"><CheckIcon /><span>People & ESG Consulting</span></div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={700} distance={15} duration={600}>
              <Link href="/services" className="homepage-advisory__link">
                Explore All Services <span>â†’</span>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 4: INSIGHTS */}
      <InsightsCarouselSection insights={insights} centered />

      {/* SECTION 5: FEATURED SERVICES & INDUSTRIES MARQUEE */}
      <FeaturedServicesSection />

      {/* SECTION 6: CTA */}
      <section className="homepage-cta">
        <div className="homepage-cta__bg">
          <Image src="/images/sections/teamwork-conference.jpeg" alt="" fill sizes="100vw" className="object-cover" quality={90} />
          <div className="homepage-cta__overlay" />
        </div>
        <div className="homepage-cta__content">
          <ScrollReveal direction="up" delay={200} distance={30} duration={900}>
            <h2 className="homepage-cta__heading">
              Begin a Conversation With Our Advisory Team.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={400} distance={25} duration={800}>
            <p className="homepage-cta__desc">
              Every engagement begins with a structured conversation. No obligations â€” simply an
              exchange of context to determine whether there is a basis for collaboration.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={600} distance={20} duration={700}>
            <Link href="/contact" className="homepage-cta__button">
              Schedule an Introduction
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
```


================================================================================
FILE 3: app\layout.tsx
Root layout + fonts
================================================================================

```tsx
import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";

import ClientLayout from "./ClientLayout";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rillsingh.com"),
  title: {
    default: "Rill Singh Limited | Pan-African Institutional Advisory",
    template: "%s | Rill Singh Limited",
  },
  description:
    "Rill Singh Limited is a pan-African advisory firm delivering integrated consulting across strategy, digital transformation, financial advisory, and governance.",
  openGraph: {
    type: "website",
    url: "https://rillsingh.com",
    siteName: "Rill Singh Limited",
    title: "Rill Singh Limited | Pan-African Institutional Advisory",
    description:
      "Rill Singh Limited is a pan-African advisory firm delivering integrated consulting across strategy, digital transformation, financial advisory, and governance.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rill Singh Limited â€” Pan-African Institutional Advisory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rill Singh Limited | Pan-African Institutional Advisory",
    description:
      "Rill Singh Limited is a pan-African advisory firm delivering integrated consulting across strategy, digital transformation, financial advisory, and governance.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rill Singh Limited",
    url: "https://rillsingh.com",
    logo: "https://rillsingh.com/images/logo.png",
    description:
      "Rill Singh Limited is a pan-African advisory firm delivering integrated consulting across strategy, digital transformation, financial advisory, and governance.",
    sameAs: [
      "https://www.linkedin.com/company/rill-singh-limited",
    ],
  };
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${dmSans.variable} ${playfairDisplay.variable}`}
    >
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#021024" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className={`${dmSans.className} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
```


================================================================================
FILE 4: app\ClientLayout.tsx
Header/footer shell
================================================================================

```tsx
"use client";
import { Suspense } from "react";
import SiteHeader from "@/components-v2/layout/SiteHeader";
import SiteFooter from "@/components-v2/layout/SiteFooter";
import PreviewBanner from "@/components-v2/ui/PreviewBanner";
import { useRouter, useSearchParams } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
      <Suspense fallback={null}>
        <PreviewBannerGate />
      </Suspense>
    </>
  );
}

function PreviewBannerGate() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const previewActive = searchParams?.get("preview") === "true";

  const handleExitPreview = () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.delete("preview");
    router.replace(`${url.pathname}${url.search}${url.hash}`);
  };

  return <PreviewBanner active={previewActive} onExit={handleExitPreview} />;
}
```


================================================================================
FILE 5: app\globals.css
Global + homepage CSS
================================================================================

```css
@import "tailwindcss";

@import "../src/styles/semantic.css";

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Design Tokens â€” RSL Premium Palette
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
:root {
  --background: #FFFFFF;
  --foreground: #1A1A2E;

  /* Fonts */
  --font-heading: var(--font-playfair), Georgia, "Times New Roman", serif;
  --font-body: var(--font-dm-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  /* Spacing */
  --space-4: 4px;
  --space-8: 8px;
  --space-16: 16px;
  --space-24: 24px;
  --space-32: 32px;
  --space-48: 48px;
  --space-64: 64px;
  --space-96: 96px;
  --space-128: 128px;

  /* Legacy token compat */
  --font-primary: var(--font-body);
  --text-display-xl: 4rem;
  --line-height-display-xl: 1.08;
  --text-h1: 3rem;
  --line-height-h1: 1.12;
  --text-h2: 2rem;
  --line-height-h2: 1.2;
  --text-h3: 1.375rem;
  --line-height-h3: 1.25;
  --text-body-lg: 1.25rem;
  --line-height-body-lg: 1.55;
  --text-body: 1rem;
  --line-height-body: 1.65;
  --text-caption: 0.8125rem;
  --line-height-caption: 1.5;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Global Base
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
html {
  scroll-behavior: smooth;
  overflow-anchor: none;
  font-family: var(--font-body);
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

body {
  font-family: var(--font-body) !important;
  font-size: 15px;
  line-height: 1.7;
  color: var(--color-text-dark);
  background: var(--background);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Typography â€” Playfair Display headings
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
h1, h2, h3, h4 {
  font-family: var(--font-heading);
  font-weight: 400;
}

h1 {
  font-size: 3rem;
  line-height: 1.12;
}

h2 {
  font-size: 2rem;
  line-height: 1.2;
}

h3 {
  font-size: 1.375rem;
  line-height: 1.25;
}

p {
  font-size: 15px;
  line-height: 1.7;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Links
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
a {
  transition: color 0.3s ease, border-color 0.3s ease;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Layout container
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
.layout-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding-left: var(--space-24);
  padding-right: var(--space-24);
}

@media (min-width: 768px) {
  .layout-container {
    padding-left: var(--space-32);
    padding-right: var(--space-32);
  }
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Section spacing (legacy compat)
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
.section-wrapper {
  padding-top: var(--space-24);
  padding-bottom: var(--space-24);
}

.hero-home {
  padding-top: 80px;
  padding-bottom: 40px;
}

.hero-standard {
  padding-top: 56px;
  padding-bottom: 40px;
}

.hero-industries {
  padding-top: 64px;
  padding-bottom: 40px;
}

.cta-block-pad {
  padding-top: 40px;
  padding-bottom: 40px;
}

.rhythm-heading-grid {
  margin-top: 20px;
}

.rhythm-body-cta {
  margin-top: 28px;
}

@media (min-width: 768px) {
  .section-wrapper {
    padding-top: var(--space-32);
    padding-bottom: var(--space-32);
  }

  .hero-home {
    padding-top: 96px;
    padding-bottom: 48px;
  }

  .hero-standard {
    padding-top: 72px;
    padding-bottom: 48px;
  }

  .hero-industries {
    padding-top: 80px;
    padding-bottom: 56px;
  }

  .cta-block-pad {
    padding-top: 48px;
    padding-bottom: 48px;
  }

  .rhythm-heading-grid {
    margin-top: 24px;
  }

  .rhythm-body-cta {
    margin-top: 32px;
  }
}

@media (min-width: 1024px) {
  .section-wrapper {
    padding-top: 40px;
    padding-bottom: 40px;
  }

  .hero-home {
    padding-top: 120px;
    padding-bottom: 64px;
  }

  .hero-standard {
    padding-top: 88px;
    padding-bottom: 56px;
  }

  .hero-industries {
    padding-top: 104px;
    padding-bottom: 64px;
  }

  .cta-block-pad {
    padding-top: 56px;
    padding-bottom: 56px;
  }

  .rhythm-heading-grid {
    margin-top: 28px;
  }

  .rhythm-body-cta {
    margin-top: 36px;
  }
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Marquee animations
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
@keyframes marquee-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes marquee-right {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}

.marquee-track-left {
  animation: marquee-left 35s linear infinite;
}

.marquee-track-right {
  animation: marquee-right 35s linear infinite;
}

.marquee-row:hover .marquee-track-left,
.marquee-row:hover .marquee-track-right {
  animation-play-state: paused;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Scroll indicator bounce
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
@keyframes bounce-down {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}

.scroll-indicator {
  animation: bounce-down 2s ease-in-out infinite;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Dark mode override (disable)
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #FFFFFF;
    --foreground: #1A1A2E;
  }
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   HOMEPAGE â€” Section 1: Constellation Hero
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
.constellation-hero {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #021024;
  overflow: hidden;
}

.constellation-hero__canvas-wrap {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.constellation-canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.constellation-hero__gradient {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    rgba(2,16,36,0.4) 60%,
    rgba(2,16,36,0.85) 100%
  );
  pointer-events: none;
}

.constellation-hero__content {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 32px;
}

.constellation-hero__label {
  font-family: var(--font-body);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 6px;
  font-weight: 400;
  color: rgba(125, 160, 202, 0.6);
  margin-bottom: 24px;
}

.constellation-hero__headline {
  font-family: var(--font-heading);
  font-size: 52px;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 1.15;
  letter-spacing: -0.5px;
  margin: 0;
  position: relative;
}

.constellation-hero__headline-inner {
  display: inline;
}

.constellation-hero__cursor {
  color: #5483B3;
  font-weight: 300;
  font-family: var(--font-body);
  margin-left: 2px;
  transition: opacity 0.1s;
}

.constellation-hero__subtext {
  font-family: var(--font-body);
  font-size: 17px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.7;
  max-width: 620px;
  margin: 28px auto 0;
}

.constellation-hero__cta {
  display: inline-block;
  font-family: var(--font-body);
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  background: transparent;
  border: 1px solid rgba(84, 131, 179, 0.4);
  color: rgba(255, 255, 255, 0.85);
  padding: 16px 40px;
  border-radius: 2px;
  text-decoration: none;
  margin-top: 36px;
  transition: all 0.3s ease;
}

.constellation-hero__cta:hover {
  background: rgba(84, 131, 179, 0.15);
  border-color: rgba(84, 131, 179, 0.7);
  color: #FFFFFF;
}

.constellation-hero__scroll {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.constellation-hero__scroll-line {
  width: 1px;
  height: 32px;
  background: rgba(125, 160, 202, 0.25);
}

.constellation-hero__scroll-text {
  font-family: var(--font-body);
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 4px;
  color: rgba(125, 160, 202, 0.2);
}

@media (max-width: 767px) {
  .constellation-hero__headline {
    font-size: 30px;
  }
  .constellation-hero__subtext {
    font-size: 15px;
  }
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   HOMEPAGE â€” Section 2: Introduction
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
.homepage-intro {
  background: #FFFFFF;
  padding: 80px 0;
}

.homepage-intro__inner {
  display: flex;
  align-items: center;
  gap: 60px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

.homepage-intro__images {
  width: 45%;
  position: relative;
  min-height: 500px;
  flex-shrink: 0;
}

.homepage-intro__img-main {
  position: absolute;
  top: 40px;
  left: 20px;
  width: 320px;
  height: 380px;
  border-radius: 12px;
  overflow: hidden;
  border: 4px solid #FFFFFF;
  box-shadow: 0 25px 50px -12px rgba(2,16,36,0.20);
  z-index: 2;
}

.homepage-intro__img-top {
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  border: 4px solid #FFFFFF;
  box-shadow: 0 20px 40px -8px rgba(2,16,36,0.18);
  z-index: 3;
}

.homepage-intro__img-bottom {
  position: absolute;
  bottom: 0;
  right: 20px;
  width: 220px;
  height: 180px;
  border-radius: 12px;
  overflow: hidden;
  border: 4px solid #FFFFFF;
  box-shadow: 0 20px 40px -8px rgba(2,16,36,0.18);
  z-index: 1;
}

.homepage-intro__badge {
  position: absolute;
  bottom: 20px;
  left: 0;
  background: #052659;
  color: #FFFFFF;
  padding: 16px 24px;
  border-radius: 12px;
  z-index: 4;
  display: flex;
  align-items: center;
  gap: 12px;
}

.homepage-intro__badge-number {
  font-family: var(--font-heading);
  font-size: 32px;
  font-weight: 600;
}

.homepage-intro__badge-label {
  font-size: 12px;
  color: #7DA0CA;
  max-width: 100px;
  line-height: 1.3;
}

.homepage-intro__content {
  width: 55%;
}

.homepage-intro__desc {
  font-size: 16px;
  color: #6B7280;
  line-height: 1.7;
  margin-bottom: 32px;
}

.homepage-intro__card {
  margin-bottom: 24px;
  padding: 20px 24px;
  border-left: 3px solid;
  background: #F8FBFF;
  border-radius: 0 8px 8px 0;
}

.homepage-intro__card-title {
  font-family: var(--font-body);
  font-size: 17px;
  font-weight: 600;
  color: #021024;
  margin-bottom: 6px;
}

.homepage-intro__card-text {
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
}

.homepage-intro__ctas {
  display: flex;
  gap: 16px;
  margin-top: 32px;
}

/* Shared button styles */
.homepage-btn {
  display: inline-block;
  padding: 14px 32px;
  border-radius: 6px;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.3s ease;
  text-align: center;
}

.homepage-btn--primary {
  background: #5483B3;
  color: #FFFFFF;
}

.homepage-btn--primary:hover {
  background: #7DA0CA;
}

.homepage-btn--outline {
  background: transparent;
  color: #052659;
  border: 1px solid #5483B3;
}

.homepage-btn--outline:hover {
  background: #5483B3;
  color: #FFFFFF;
}

@media (max-width: 767px) {
  .homepage-intro {
    padding: 48px 0;
  }
  .homepage-intro__inner {
    flex-direction: column;
    gap: 32px;
    padding: 0 20px;
  }
  .homepage-intro__images {
    width: 100%;
    min-height: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 12px;
    position: static;
  }
  .homepage-intro__img-main {
    position: relative;
    top: auto;
    left: auto;
    width: 100%;
    height: 220px;
    grid-column: 1 / -1;
    z-index: 1;
  }
  .homepage-intro__img-top {
    position: relative;
    top: auto;
    right: auto;
    width: 100%;
    height: 140px;
    z-index: 1;
  }
  .homepage-intro__img-bottom {
    position: relative;
    bottom: auto;
    right: auto;
    width: 100%;
    height: 140px;
    z-index: 1;
  }
  .homepage-intro__badge {
    position: relative;
    bottom: auto;
    left: auto;
    grid-column: 1 / -1;
    justify-self: start;
    z-index: 1;
  }
  .homepage-intro__content {
    width: 100%;
  }
  .homepage-intro__ctas {
    flex-direction: column;
  }
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   HOMEPAGE â€” Section 3: Explore + Advisory Architecture
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
.homepage-advisory {
  background: #F8FBFF;
  padding: 80px 0;
}

.homepage-advisory__inner {
  display: flex;
  align-items: center;
  gap: 60px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

.homepage-advisory__images {
  width: 45%;
  position: relative;
  min-height: 480px;
  flex-shrink: 0;
}

.homepage-advisory__img-circle {
  position: absolute;
  top: 20px;
  left: 40px;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #FFFFFF;
  box-shadow: 0 25px 50px -12px rgba(2,16,36,0.22);
  z-index: 2;
}

.homepage-advisory__img-rect {
  position: absolute;
  bottom: 20px;
  right: 0;
  width: 240px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  border: 4px solid #FFFFFF;
  box-shadow: 0 20px 40px -8px rgba(2,16,36,0.18);
  z-index: 3;
}

.homepage-advisory__stats-badge {
  position: absolute;
  top: 0;
  left: 0;
  background: #052659;
  color: #FFFFFF;
  padding: 14px 20px;
  border-radius: 12px;
  z-index: 4;
  text-align: center;
}

.homepage-advisory__stats-number {
  font-family: var(--font-heading);
  font-size: 28px;
  font-weight: 600;
  display: block;
}

.homepage-advisory__stats-label {
  font-size: 11px;
  color: #7DA0CA;
}

.homepage-advisory__dots {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 80px;
  height: 80px;
  opacity: 0.15;
  background-image: radial-gradient(circle, #052659 1.5px, transparent 1.5px);
  background-size: 12px 12px;
}

.homepage-advisory__content {
  width: 55%;
}

.homepage-advisory__overline {
  font-size: 12px;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: #7DA0CA;
  margin-bottom: 12px;
}

.homepage-advisory__heading {
  font-family: var(--font-heading);
  font-size: 38px;
  font-weight: 400;
  color: #021024;
  line-height: 1.2;
  margin-bottom: 16px;
}

.homepage-advisory__pills {
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
}

.homepage-pill {
  padding: 10px 28px;
  border-radius: 30px;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.homepage-pill--filled {
  background: #052659;
  color: #FFFFFF;
}

.homepage-pill--filled:hover {
  background: #5483B3;
}

.homepage-pill--outline {
  background: transparent;
  color: #5483B3;
  border: 1px solid rgba(84,131,179,0.3);
}

.homepage-pill--outline:hover {
  background: #5483B3;
  color: #FFFFFF;
  border-color: #5483B3;
}

.homepage-advisory__sub-overline {
  font-size: 12px;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: #5483B3;
  margin-bottom: 8px;
  margin-top: 24px;
}

.homepage-advisory__sub-heading {
  font-family: var(--font-heading);
  font-size: 28px;
  font-weight: 400;
  color: #021024;
  margin-bottom: 12px;
}

.homepage-advisory__desc {
  font-size: 15px;
  color: #6B7280;
  line-height: 1.7;
  margin-bottom: 24px;
}

.homepage-advisory__checklist {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
}

.homepage-advisory__check-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.homepage-advisory__check-item span {
  font-size: 14px;
  color: #1A1A2E;
}

.homepage-check-icon {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #C1E8FF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.homepage-advisory__link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #5483B3;
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s ease;
}

.homepage-advisory__link:hover {
  color: #7DA0CA;
}

@media (max-width: 767px) {
  .homepage-advisory {
    padding: 48px 0;
  }
  .homepage-advisory__inner {
    flex-direction: column;
    gap: 32px;
    padding: 0 20px;
  }
  .homepage-advisory__images {
    width: 100%;
    min-height: auto;
    display: flex;
    gap: 16px;
    align-items: flex-start;
    position: static;
  }
  .homepage-advisory__img-circle {
    position: relative;
    top: auto;
    left: auto;
    width: 160px;
    height: 160px;
    flex-shrink: 0;
  }
  .homepage-advisory__img-rect {
    position: relative;
    bottom: auto;
    right: auto;
    width: 100%;
    height: 160px;
    flex: 1;
    border-radius: 12px;
  }
  .homepage-advisory__stats-badge {
    display: none;
  }
  .homepage-advisory__dots {
    display: none;
  }
  .homepage-advisory__content {
    width: 100%;
  }
  .homepage-advisory__heading {
    font-size: 28px;
  }
  .homepage-advisory__sub-heading {
    font-size: 22px;
  }
  .homepage-advisory__checklist {
    grid-template-columns: 1fr;
  }
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   HOMEPAGE â€” Section 4: Insight Cards (new style)
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
.homepage-insight-card {
  display: block;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(2,16,36,0.08);
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: left;
}

.homepage-insight-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(2,16,36,0.14);
}

.homepage-insight-card__image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.homepage-insight-card__body {
  padding: 24px;
  background: #FFFFFF;
}

.homepage-insight-card__category {
  display: inline-block;
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 600;
  background: #C1E8FF;
  color: #052659;
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 12px;
}

.homepage-insight-card__title {
  font-family: var(--font-body);
  font-size: 17px;
  font-weight: 600;
  color: #021024;
  line-height: 1.35;
  margin-bottom: 8px;
}

.homepage-insight-card__date {
  font-size: 13px;
  color: #6B7280;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   HOMEPAGE â€” Section 5: Featured Marquee (horizontal cards)
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
.featured-section {
  background: #F8FBFF;
  padding: 64px 0;
  overflow: hidden;
}

.featured-marquee-card {
  display: flex;
  flex-shrink: 0;
  width: 500px;
  height: 180px;
  border-radius: 12px;
  overflow: hidden;
  background: #FFFFFF;
  box-shadow: 0 4px 16px rgba(2,16,36,0.06);
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.featured-marquee-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(2,16,36,0.12);
}

.featured-marquee-card__image {
  position: relative;
  width: 200px;
  flex-shrink: 0;
}

.featured-marquee-card__body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  min-width: 0;
}

.featured-marquee-card__title {
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 600;
  color: #021024;
  line-height: 1.3;
  margin-bottom: 8px;
}

.featured-marquee-card__desc {
  font-size: 13px;
  color: #6B7280;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 12px;
}

.featured-marquee-card__link {
  font-family: var(--font-body);
  font-size: 13px;
  color: #5483B3;
  font-weight: 500;
  transition: color 0.3s ease;
}

.featured-marquee-card:hover .featured-marquee-card__link {
  color: #7DA0CA;
}

.featured-fade {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 80px;
  z-index: 10;
  pointer-events: none;
}

.featured-fade--left {
  left: 0;
  background: linear-gradient(to right, #F8FBFF 0%, transparent 100%);
}

.featured-fade--right {
  right: 0;
  background: linear-gradient(to left, #F8FBFF 0%, transparent 100%);
}

@media (max-width: 767px) {
  .featured-section {
    padding: 48px 0;
  }
  .featured-marquee-card {
    width: 320px;
    height: 150px;
  }
  .featured-marquee-card__image {
    width: 120px;
  }
  .featured-marquee-card__title {
    font-size: 14px;
  }
  .featured-marquee-card__desc {
    font-size: 12px;
    -webkit-line-clamp: 2;
    margin-bottom: 8px;
  }
  .featured-fade {
    width: 40px;
  }
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   HOMEPAGE â€” Section 6: CTA with background image
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
.homepage-cta {
  position: relative;
  padding: 100px 40px;
  text-align: center;
}

.homepage-cta__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.homepage-cta__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(2,16,36,0.78) 0%,
    rgba(2,16,36,0.65) 50%,
    rgba(2,16,36,0.78) 100%
  );
}

.homepage-cta__content {
  position: relative;
  z-index: 1;
  max-width: 700px;
  margin: 0 auto;
}

.homepage-cta__heading {
  font-family: var(--font-heading);
  font-size: 40px;
  font-weight: 400;
  color: #FFFFFF;
  margin-bottom: 20px;
  text-shadow: 0 1px 3px rgba(0,0,0,0.25);
}

.homepage-cta__desc {
  font-size: 16px;
  color: rgba(255,255,255,0.65);
  line-height: 1.7;
  margin-bottom: 36px;
}

.homepage-cta__button {
  display: inline-block;
  background: #5483B3;
  color: #FFFFFF;
  padding: 16px 40px;
  border-radius: 6px;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  text-decoration: none;
  transition: background 0.3s ease;
}

.homepage-cta__button:hover {
  background: #7DA0CA;
}

@media (max-width: 767px) {
  .homepage-cta {
    padding: 64px 24px;
  }
  .homepage-cta__heading {
    font-size: 28px;
  }
}

@layer base {
  /* Tailwind base extensions */
}

@layer components {
  /* Tailwind component extensions */
}
```


================================================================================
FILE 6: src\styles\semantic.css
Design tokens (CSS vars)
================================================================================

```css
@layer base {
  :root {
    --n50: #FAFAFA;
    --n100: #F5F5F5;
    --n200: #E5E5E5;
    --n300: #D4D4D4;
    --n400: #A3A3A3;
    --n500: #737373;
    --n600: #525252;
    --n700: #404040;
    --n800: #262626;
    --n900: #0A0A0A;

    --a50: #F0F4F8;
    --a100: #D9E4EF;
    --a200: #B3C9DF;
    --a300: #8DAECF;
    --a500: #4A7196;
    --a600: #375A80;
    --a700: #1B3A5C;
    --a800: #132B45;
    --a900: #0C1C2E;

    --o500: #D97706;
    --o600: #B45309;
    --o700: #92400E;

    --white: #FFFFFF;

    --color-navy-darkest: #021024;
    --color-navy-dark: #052659;
    --color-blue-mid: #5483B3;
    --color-blue-light: #7DA0CA;
    --color-blue-ice: #C1E8FF;
    --color-white: #FFFFFF;
    --color-off-white: #F8FBFF;
    --color-text-dark: #1A1A2E;
    --color-text-muted: #6B7280;

    --semantic-success: #1A7A3D;
    --semantic-success-light: #EEF6F0;
    --semantic-warning: #92610A;
    --semantic-warning-light: #FDF6EC;
    --semantic-error: #9B2318;
    --semantic-error-light: #FBF0EF;

    --SECTION_OVERLINE_COLOR: rgba(27,58,92,0.88);

    --hero-gradient-dark: linear-gradient(to bottom, #0C1C2EB3 0%, #0C1C2ED9 60%, #0C1C2EF2 100%);
    --hero-gradient-industries: linear-gradient(to bottom, #0C1C2EB3 0%, #0C1C2ED9 50%, #0C1C2EF2 100%);
    --search-backdrop: rgba(10,10,10,0.5);
    --drawer-backdrop: rgba(10,10,10,0.4);

    --bg-primary: var(--n50);
    --bg-inverse: var(--n900);

    --text-primary: var(--n900);
    --text-secondary: var(--n600);
    --text-muted: var(--n500);
    --text-inverse: var(--n50);

    --border-subtle: var(--n200);
    --border-strong: var(--n300);

    --accent-primary: var(--a700);
    --accent-hover: var(--a800);

    /* SPACING */
    --section-vertical: var(--space-96);
    --container-padding: var(--space-24);

    /* RADIUS */
    --radius-card: 4px;

    /* SHADOW */
    --shadow-card-hover: 0 1px 4px rgba(0,0,0,0.06);
  }
}
```


================================================================================
FILE 7: tailwind.config.ts
Tailwind theme
================================================================================

```ts


import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import tokens from "./tokens/tokens.json" assert { type: "json" };

const extract = (obj: Record<string, any>) =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, v.value]));


const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components-v2/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          50: 'var(--n50)',
          100: 'var(--n100)',
          200: 'var(--n200)',
          300: 'var(--n300)',
          400: 'var(--n400)',
          500: 'var(--n500)',
          600: 'var(--n600)',
          700: 'var(--n700)',
          800: 'var(--n800)',
          900: 'var(--n900)'
        },
        accent: {
          50: 'var(--a50)',
          100: 'var(--a100)',
          200: 'var(--a200)',
          300: 'var(--a300)',
          500: 'var(--a500)',
          600: 'var(--a600)',
          700: 'var(--a700)',
          800: 'var(--a800)',
          900: 'var(--a900)'
        },
        orange: {
          500: 'var(--o500)',
          600: 'var(--o600)',
          700: 'var(--o700)'
        },
        navy: {
          darkest: "#021024",
          dark: "#052659",
        },
        blue: {
          ...colors.blue,
          mid: "#5483B3",
          light: "#7DA0CA",
          ice: "#C1E8FF",
        },
        white: 'var(--white)',
        semantic: {
          success: 'var(--semantic-success)',
          successLight: 'var(--semantic-success-light)',
          warning: 'var(--semantic-warning)',
          warningLight: 'var(--semantic-warning-light)',
          error: 'var(--semantic-error)',
          errorLight: 'var(--semantic-error-light)'
        },
        // Figma-aligned semantic color keys
        background: {
          primary: 'var(--bg-primary)',
          inverse: 'var(--bg-inverse)'
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          inverse: 'var(--text-inverse)'
        },
        border: {
          subtle: 'var(--border-subtle)',
          strong: 'var(--border-strong)'
        },
        accentSemantic: {
          primary: 'var(--accent-primary)',
          hover: 'var(--accent-hover)'
        }
      },
      spacing: {
        section: 'var(--section-vertical)',
        container: 'var(--container-padding)'
      },
      borderRadius: {
        sm: tokens.radius.sm.value,
        card: 'var(--radius-card)'
      },
      boxShadow: {
        card: tokens.shadow.card.hover.value,
        cardSemantic: 'var(--shadow-card-hover)'
      },

      // Motion tokens from Figma
      transitionDuration: {
        fast: '120ms',
        normal: '200ms',
        slow: '320ms',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
```


================================================================================
FILE 8: tokens\tokens.json
Design tokens JSON
================================================================================

```json
{
  "color": {
    "neutral": {
      "50": { "value": "#FAFAFA", "type": "color" },
      "100": { "value": "#F5F5F5", "type": "color" },
      "200": { "value": "#E5E5E5", "type": "color" },
      "300": { "value": "#D4D4D4", "type": "color" },
      "400": { "value": "#A3A3A3", "type": "color" },
      "500": { "value": "#737373", "type": "color" },
      "600": { "value": "#525252", "type": "color" },
      "700": { "value": "#404040", "type": "color" },
      "800": { "value": "#262626", "type": "color" },
      "900": { "value": "#0A0A0A", "type": "color" }
    },
    "accent": {
      "50": { "value": "#F0F4F8", "type": "color" },
      "100": { "value": "#D9E2EC", "type": "color" },
      "200": { "value": "#BCCCDC", "type": "color" },
      "300": { "value": "#9FB3C8", "type": "color" },
      "400": { "value": "#829AB1", "type": "color" },
      "500": { "value": "#627D98", "type": "color" },
      "600": { "value": "#486581", "type": "color" },
      "700": { "value": "#1B3A5C", "type": "color" },
      "800": { "value": "#132B45", "type": "color" },
      "900": { "value": "#0C1C2E", "type": "color" }
    }
  },
  "spacing": {
    "0": { "value": "0px", "type": "spacing" },
    "1": { "value": "4px", "type": "spacing" },
    "2": { "value": "8px", "type": "spacing" },
    "3": { "value": "12px", "type": "spacing" },
    "4": { "value": "16px", "type": "spacing" },
    "6": { "value": "24px", "type": "spacing" },
    "8": { "value": "32px", "type": "spacing" },
    "12": { "value": "48px", "type": "spacing" },
    "16": { "value": "64px", "type": "spacing" },
    "24": { "value": "96px", "type": "spacing" },
    "32": { "value": "128px", "type": "spacing" }
  },
  "radius": {
    "sm": { "value": "4px", "type": "borderRadius" }
  },
  "shadow": {
    "card": {
      "hover": { "value": "0 1px 4px rgba(0,0,0,0.06)", "type": "boxShadow" }
    }
  },
  "font": {
    "size": {
      "display-xl": { "value": "4rem", "type": "fontSizes" },
      "h1": { "value": "3rem", "type": "fontSizes" },
      "h2": { "value": "2rem", "type": "fontSizes" },
      "h3": { "value": "1.375rem", "type": "fontSizes" },
      "body-lg": { "value": "1.25rem", "type": "fontSizes" },
      "body": { "value": "1rem", "type": "fontSizes" },
      "caption": { "value": "0.8125rem", "type": "fontSizes" }
    },
    "line": {
      "display-xl": { "value": "1.08", "type": "lineHeights" },
      "h1": { "value": "1.12", "type": "lineHeights" },
      "h2": { "value": "1.2", "type": "lineHeights" },
      "h3": { "value": "1.25", "type": "lineHeights" },
      "body-lg": { "value": "1.55", "type": "lineHeights" },
      "body": { "value": "1.65", "type": "lineHeights" }
    },
    "tracking": {
      "tight": { "value": "-0.02em", "type": "letterSpacing" },
      "normal": { "value": "0em", "type": "letterSpacing" },
      "wide": { "value": "0.06em", "type": "letterSpacing" }
    }
  }
}
```


================================================================================
FILE 9: components-v2\sections\ConstellationHero.tsx
Hero section
================================================================================

```tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

// â”€â”€ Canvas Animation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  pulseTime: number;
  isPulsing: boolean;
}

function createParticles(count: number, w: number, h: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const r = 1.5 + Math.random();
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.15 + Math.random() * 0.15;
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: r,
      baseRadius: r,
      pulseTime: 0,
      isPulsing: false,
    });
  }
  return particles;
}

function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });
  const animFrameRef = useRef<number>(0);
  const lastPulseRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const dpr = window.devicePixelRatio || 1;
    const particleCount = isMobile ? 30 : 70;

    function resize() {
      if (!canvas) return;
      const w = canvas.parentElement!.clientWidth;
      const h = canvas.parentElement!.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Reinit particles if canvas resized significantly
      if (
        particlesRef.current.length === 0 ||
        Math.abs(w - (particlesRef.current[0]?.x ?? 0) * 2) > w
      ) {
        particlesRef.current = createParticles(particleCount, w, h);
      }
    }

    resize();
    if (particlesRef.current.length === 0) {
      const w = canvas.parentElement!.clientWidth;
      const h = canvas.parentElement!.clientHeight;
      particlesRef.current = createParticles(particleCount, w, h);
    }

    // Mouse interaction (desktop only)
    function onMouseMove(e: MouseEvent) {
      if (isMobile) return;
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    }
    function onMouseLeave() {
      mouseRef.current.active = false;
    }

    if (!isMobile) {
      canvas.addEventListener("mousemove", onMouseMove);
      canvas.addEventListener("mouseleave", onMouseLeave);
    }

    window.addEventListener("resize", resize);

    const CONNECTION_DIST = 180;

    function animate(time: number) {
      if (!canvas || !ctx) return;
      const w = canvas.parentElement!.clientWidth;
      const h = canvas.parentElement!.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Pulse logic: trigger a random pulse every 3-4 seconds
      if (time - lastPulseRef.current > 3000 + Math.random() * 1000) {
        const idx = Math.floor(Math.random() * particles.length);
        particles[idx].isPulsing = true;
        particles[idx].pulseTime = time;
        lastPulseRef.current = time;
      }

      // Update particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Mouse repulsion
        if (mouse.active && !isMobile) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120 && dist > 0) {
            const force = (120 - dist) / 120;
            p.x += (dx / dist) * force * 2;
            p.y += (dy / dist) * force * 2;
          }
        }

        // Pulse animation
        if (p.isPulsing) {
          const elapsed = time - p.pulseTime;
          if (elapsed < 500) {
            const progress = elapsed / 500;
            p.radius = p.baseRadius + (6 - p.baseRadius) * Math.sin(progress * Math.PI);
          } else {
            p.radius = p.baseRadius;
            p.isPulsing = false;
          }
        }
      }

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.6;
            const isPulseConnection =
              particles[i].isPulsing || particles[j].isPulsing;
            const lineOpacity = isPulseConnection
              ? Math.min(opacity * 2, 0.8)
              : opacity;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(84, 131, 179, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        if (p.isPulsing) {
          ctx.fillStyle = "rgba(125, 160, 202, 0.8)";
        } else {
          ctx.fillStyle = "rgba(84, 131, 179, 0.5)";
        }
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    }

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      if (!isMobile) {
        canvas.removeEventListener("mousemove", onMouseMove);
        canvas.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="constellation-canvas" />;
}

// â”€â”€ Hero Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function ConstellationHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState(0);
  // phase 0: initial (nothing visible)
  // phase 1: label fading in (300ms)
  // phase 2: typing headline (1100ms)
  // phase 3: typing complete, cursor blinking
  // phase 4: subtext fading in
  // phase 5: CTA fading in
  // phase 6: scroll indicator fading in
  // phase 7: all done
  const [typingProgress, setTypingProgress] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [showCursor, setShowCursor] = useState(false);
  const skippedRef = useRef(false);
  const phaseRef = useRef(0);

  const headline =
    "Institutional Advisory Built for Growth, Transformation, and Execution.";
  const charCount = headline.length;

  // Skip-to-end on scroll
  const skipToEnd = useCallback(() => {
    if (skippedRef.current) return;
    skippedRef.current = true;
    setTypingProgress(charCount);
    setShowCursor(false);
    setCursorVisible(false);
    setPhase(7);
    phaseRef.current = 7;
    if (sectionRef.current) {
      sectionRef.current.classList.add("hero-loaded");
    }
  }, [charCount]);

  useEffect(() => {
    const onScroll = () => {
      if (phaseRef.current < 7 && window.scrollY > 50) {
        skipToEnd();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [skipToEnd]);

  // Animation timeline
  useEffect(() => {
    if (skippedRef.current) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Phase 1: label fades in at 300ms
    timers.push(
      setTimeout(() => {
        if (skippedRef.current) return;
        setPhase(1);
        phaseRef.current = 1;
      }, 300)
    );

    // Phase 2: typing starts at 1100ms
    timers.push(
      setTimeout(() => {
        if (skippedRef.current) return;
        setPhase(2);
        phaseRef.current = 2;
        setShowCursor(true);

        // Type characters
        for (let i = 1; i <= charCount; i++) {
          timers.push(
            setTimeout(() => {
              if (skippedRef.current) return;
              setTypingProgress(i);
              if (i === charCount) {
                // Typing complete
                setPhase(3);
                phaseRef.current = 3;

                // Cursor blinks for 1000ms then disappears
                timers.push(
                  setTimeout(() => {
                    if (skippedRef.current) return;
                    setShowCursor(false);
                  }, 1000)
                );

                // Phase 4: subtext at typing complete + 500ms
                timers.push(
                  setTimeout(() => {
                    if (skippedRef.current) return;
                    setPhase(4);
                    phaseRef.current = 4;
                  }, 500)
                );

                // Phase 5: CTA at subtext + 1100ms (800ms fade + 300ms gap)
                timers.push(
                  setTimeout(() => {
                    if (skippedRef.current) return;
                    setPhase(5);
                    phaseRef.current = 5;
                  }, 1600)
                );

                // Phase 6: scroll indicator at CTA + 1100ms
                timers.push(
                  setTimeout(() => {
                    if (skippedRef.current) return;
                    setPhase(6);
                    phaseRef.current = 6;
                  }, 2500)
                );

                // Phase 7: all done
                timers.push(
                  setTimeout(() => {
                    if (skippedRef.current) return;
                    setPhase(7);
                    phaseRef.current = 7;
                    if (sectionRef.current) {
                      sectionRef.current.classList.add("hero-loaded");
                    }
                  }, 3000)
                );
              }
            }, i * 35)
          );
        }
      }, 1100)
    );

    return () => timers.forEach(clearTimeout);
  }, [charCount]);

  // Cursor blink interval
  useEffect(() => {
    if (!showCursor) return;
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(interval);
  }, [showCursor]);

  const done = phase >= 7 || skippedRef.current;

  return (
    <section
      ref={sectionRef}
      className={`constellation-hero${done ? " hero-loaded" : ""}`}
    >
      {/* Canvas background */}
      <div className="constellation-hero__canvas-wrap">
        <ConstellationCanvas />
      </div>

      {/* Gradient overlay */}
      <div className="constellation-hero__gradient" />

      {/* Text content */}
      <div className="constellation-hero__content">
        {/* Label */}
        <p
          className="constellation-hero__label"
          style={{
            opacity: done || phase >= 1 ? 1 : 0,
            transition: done ? "none" : "opacity 800ms ease",
          }}
        >
          PAN-AFRICAN INSTITUTIONAL ADVISORY
        </p>

        {/* Headline with typing effect */}
        <h1 className="constellation-hero__headline">
          <span className="constellation-hero__headline-inner">
            <span>{done ? headline : headline.slice(0, typingProgress)}</span>
            {!done && typingProgress < charCount && (
              <span style={{ color: "transparent" }}>
                {headline.slice(typingProgress)}
              </span>
            )}
          </span>
          {showCursor && (
            <span
              className="constellation-hero__cursor"
              style={{ opacity: cursorVisible ? 1 : 0 }}
            >
              |
            </span>
          )}
        </h1>

        {/* Subtext */}
        <p
          className="constellation-hero__subtext"
          style={{
            opacity: done || phase >= 4 ? 1 : 0,
            transition: done ? "none" : "opacity 800ms ease",
          }}
        >
          We advise growth-stage companies, institutional operators, and
          public-sector leaders navigating structural complexity â€” delivering
          measurable outcomes with discipline.
        </p>

        {/* CTA */}
        <div
          style={{
            opacity: done || phase >= 5 ? 1 : 0,
            transition: done ? "none" : "opacity 600ms ease",
          }}
        >
          <Link href="/services" className="constellation-hero__cta">
            Explore Our Capabilities
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="constellation-hero__scroll"
        style={{
          opacity: done || phase >= 6 ? 1 : 0,
          transition: done ? "none" : "opacity 400ms ease",
        }}
      >
        <div className="constellation-hero__scroll-line" />
        <span className="constellation-hero__scroll-text">SCROLL</span>
      </div>
    </section>
  );
}
```


================================================================================
FILE 10: components-v2\sections\InsightsCarouselSection.tsx
Insights section
================================================================================

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";

// â”€â”€â”€ Fallback insight data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const FALLBACK_INSIGHTS = [
  {
    category: "Technology",
    title: "AI Readiness Assessment for African Enterprises",
    excerpt:
      "Evaluating organizational, data, and infrastructure readiness for AI adoption across industries.",
    date: "January 2026",
    image: "/images/insights/insight-1.jpg",
    slug: "ai-readiness-assessment",
  },
  {
    category: "Finance",
    title: "Capital Structure Optimization in Volatile Currency Environments",
    excerpt:
      "Analytical methodology for managing multi-currency exposure and debt structuring in African markets.",
    date: "December 2025",
    image: "/images/insights/insight-2.jpg",
    slug: "capital-structure-optimization",
  },
  {
    category: "Infrastructure",
    title: "Corridor-Led Development: Unlocking Continental Trade Routes",
    excerpt:
      "How integrated transport and logistics corridors are reshaping intra-African trade.",
    date: "November 2025",
    image: "/images/insights/insight-3.jpg",
    slug: "corridor-led-development",
  },
  {
    category: "Strategy",
    title: "Scaling Advisory-Led Growth in Sub-Saharan Africa",
    excerpt:
      "A framework for enterprise advisory firms positioning against global incumbents.",
    date: "February 2026",
    image: "/images/insights/insight-5.jpg",
    slug: "scaling-advisory-led-growth",
  },
];

type InsightCardData = {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  slug: string;
};

interface InsightsCarouselSectionProps {
  insights?: Array<{
    slug: string;
    category?: string;
    title: string;
    excerpt?: string;
    summary?: string;
  }>;
  overline?: string;
  title?: string;
  description?: string;
  titleHref?: string | null;
  exploreHref?: string;
  exploreLabel?: string;
  hideFilters?: boolean;
  centered?: boolean;
}

export default function InsightsCarouselSection({
  insights,
  overline,
  title: customTitle,
  description: customDescription,
  exploreHref,
  exploreLabel,
  centered = false,
}: InsightsCarouselSectionProps) {
  const cards: InsightCardData[] =
    insights && insights.length > 0
      ? insights.map((item, idx) => ({
          category: item.category ?? "Insight",
          title: item.title,
          excerpt: item.excerpt ?? item.summary ?? "",
          date: FALLBACK_INSIGHTS[idx % FALLBACK_INSIGHTS.length]?.date ?? "2026",
          image: FALLBACK_INSIGHTS[idx % FALLBACK_INSIGHTS.length]?.image ?? "/images/insights/insight-1.jpg",
          slug: item.slug,
        }))
      : FALLBACK_INSIGHTS;

  // Show max 3 cards
  const displayCards = cards.slice(0, 3);

  return (
    <section
      style={{
        backgroundColor: "#FFFFFF",
        paddingTop: "80px",
        paddingBottom: "60px",
      }}
    >
      <div className="layout-container" style={centered ? { textAlign: "center" } : undefined}>
        {/* Header */}
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "4.5px",
            color: "#7DA0CA",
            display: "block",
          }}
        >
          {overline || "Insights"}
        </span>
        <h2
          className="mt-4"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(28px, 3.5vw, 38px)",
            fontWeight: 400,
            lineHeight: 1.2,
            color: "#021024",
            ...(centered ? { margin: "12px auto 8px" } : {}),
          }}
        >
          {customTitle || "Ideas shaping tomorrow\u2019s institutions."}
        </h2>
        <p
          className="mt-3"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "16px",
            color: "#6B7280",
            lineHeight: 1.7,
            maxWidth: "640px",
            ...(centered ? { margin: "0 auto 40px" } : {}),
          }}
        >
          {customDescription || "Explore perspectives drawn from advisory engagements, sector research, and institutional transformation across Africa\u2019s evolving economic landscape."}
        </p>

        {/* Insight Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {displayCards.map((card) => (
            <Link
              key={card.slug}
              href={`/insights/${card.slug}`}
              className="homepage-insight-card group"
            >
              <div className="homepage-insight-card__image">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  aria-hidden="true"
                />
              </div>
              <div className="homepage-insight-card__body">
                <span className="homepage-insight-card__category">
                  {card.category}
                </span>
                <h3 className="homepage-insight-card__title">
                  {card.title}
                </h3>
                <p className="homepage-insight-card__date">
                  {card.date}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Explore all link */}
        <div className={`mt-10 flex ${centered ? "justify-center" : "justify-end"}`}>
          <Link
            href={exploreHref || "/insights"}
            className="inline-flex items-center gap-1.5 transition-colors duration-300"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              fontWeight: 500,
              color: "#5483B3",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#7DA0CA"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#5483B3"; }}
          >
            {exploreLabel || "Explore All Insights"}
            <span aria-hidden="true">â†’</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
```


================================================================================
FILE 11: components-v2\sections\FeaturedServicesSection.tsx
Marquee section
================================================================================

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";

// â”€â”€â”€ Featured items (top 3 of each) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const FEATURED_SERVICES = [
  { title: "Strategy & Corporate Transformation", description: "Enterprise strategy, M&A advisory, and transformation roadmaps for growth-stage institutions.", image: "/images/capabilities/strategy.jpg", href: "/services/strategy" },
  { title: "Digital & AI Transformation", description: "Digital modernization, AI readiness, and platform implementation across the enterprise.", image: "/images/capabilities/digital-ai.jpg", href: "/services/digital" },
  { title: "Financial Advisory, Audit & Risk", description: "Financial resilience, governance, risk frameworks, and control architecture.", image: "/images/capabilities/financial.jpg", href: "/services/finance" },
];

const FEATURED_INDUSTRIES = [
  { title: "Financial Services", description: "Banks, capital markets, insurers, and fintechs navigating regulatory complexity.", image: "/images/industries/sectors/financial-services.jpg", href: "/industries/financial-services" },
  { title: "Healthcare & Life Sciences", description: "Healthcare providers, pharmaceutical companies, and medtech innovators.", image: "/images/industries/sectors/healthcare-life-sciences.jpg", href: "/industries/healthcare-life-sciences" },
  { title: "Energy & Natural Resources", description: "Oil, gas, utilities, renewables, and mining operations across the continent.", image: "/images/industries/sectors/energy-resources.jpg", href: "/industries/energy-resources" },
];

// â”€â”€â”€ Horizontal marquee card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function HorizontalMarqueeCard({
  title,
  description,
  image,
  href,
}: {
  title: string;
  description: string;
  image: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="featured-marquee-card group"
    >
      <div className="featured-marquee-card__image">
        <Image
          src={image}
          alt=""
          fill
          sizes="200px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          aria-hidden="true"
        />
      </div>
      <div className="featured-marquee-card__body">
        <h3 className="featured-marquee-card__title">{title}</h3>
        <p className="featured-marquee-card__desc">{description}</p>
        <span className="featured-marquee-card__link">
          Learn more <span aria-hidden="true">â†’</span>
        </span>
      </div>
    </Link>
  );
}

// â”€â”€â”€ Main section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function FeaturedServicesSection() {
  // Duplicate for seamless infinite loop
  const servicesDouble = [...FEATURED_SERVICES, ...FEATURED_SERVICES];
  const industriesDouble = [...FEATURED_INDUSTRIES, ...FEATURED_INDUSTRIES];

  return (
    <section className="featured-section">
      {/* Centered heading */}
      <div className="layout-container" style={{ textAlign: "center" }}>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "4.5px",
            color: "#7DA0CA",
            display: "block",
          }}
        >
          Featured
        </span>
        <h2
          className="mt-3"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "32px",
            fontWeight: 400,
            lineHeight: 1.2,
            color: "#021024",
          }}
        >
          Services & Industries
        </h2>
      </div>

      {/* Row 1: Services â€” scrolls left to right */}
      <div className="marquee-row relative mt-8" style={{ overflow: "hidden" }}>
        <div className="featured-fade featured-fade--left" />
        <div className="featured-fade featured-fade--right" />
        <div className="marquee-track-left flex gap-5" style={{ width: "max-content" }}>
          {servicesDouble.map((item, idx) => (
            <HorizontalMarqueeCard
              key={`svc-${idx}`}
              title={item.title}
              description={item.description}
              image={item.image}
              href={item.href}
            />
          ))}
        </div>
      </div>

      {/* Row 2: Industries â€” scrolls right to left */}
      <div className="marquee-row relative" style={{ marginTop: "24px", overflow: "hidden" }}>
        <div className="featured-fade featured-fade--left" />
        <div className="featured-fade featured-fade--right" />
        <div className="marquee-track-right flex gap-5" style={{ width: "max-content" }}>
          {industriesDouble.map((item, idx) => (
            <HorizontalMarqueeCard
              key={`ind-${idx}`}
              title={item.title}
              description={item.description}
              image={item.image}
              href={item.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```


================================================================================
FILE 12: components-v2\layout\SiteHeader.tsx
Navigation
================================================================================

```tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useBreakpoint } from "@/lib/breakpoints";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchOverlay from "@/components-v2/layout/SearchOverlay";

const NAV_LINKS_DESKTOP = ["Industries", "Services", "Insights", "Coverage", "About", "Careers", "Contact"] as const;
const NAV_LINKS_MOBILE = ["Industries", "Services", "About", "Insights", "Coverage", "Careers", "Contact"] as const;

const NAV_HREFS: Record<string, string> = {
  Industries: "/industries",
  Services: "/services",
  Insights: "/insights",
  Coverage: "/coverage",
  About: "/about",
  Careers: "/careers",
  Contact: "/contact",
};

const NAV_SUB_SERVICES = [
  { label: "Strategy & Corporate Transformation", href: "/services/strategy" },
  { label: "Digital & AI Transformation", href: "/services/digital" },
  { label: "Financial Advisory, Audit & Risk", href: "/services/finance" },
  { label: "People & Organization", href: "/services/people" },
  { label: "Sustainability & ESG", href: "/services/esg" },
  { label: "Public Sector Advisory", href: "/services/public" },
  { label: "Digital Communication", href: "/services/comms" },
  { label: "Tax & Asset Management", href: "/services/tax" },
  { label: "Legal & Regulatory", href: "/services/legal" },
  { label: "SME Development", href: "/services/sme" },
] as const;

const NAV_SUB_INDUSTRIES = [
  { label: "Financial Services", href: "/industries/financial-services" },
  { label: "Technology, Media & Telecommunications", href: "/industries/technology-digital" },
  { label: "Energy & Natural Resources", href: "/industries/energy-resources" },
  { label: "Healthcare & Life Sciences", href: "/industries/healthcare-life-sciences" },
  { label: "Public Sector & Government", href: "/industries/public-sector-government" },
  { label: "Industrials & Manufacturing", href: "/industries/industrials-manufacturing" },
  { label: "Consumer & Retail", href: "/industries/consumer-retail" },
  { label: "Transportation & Logistics", href: "/industries/transport-logistics" },
  { label: "Real Estate & Infrastructure", href: "/industries/real-estate-infrastructure" },
  { label: "Private Capital", href: "/industries/private-capital" },
  { label: "Education & Social Impact", href: "/industries/education" },
] as const;

// Add MEGA_NAV_LINKS definition
const MEGA_NAV_LINKS = new Set(["Industries", "Services", "Insights"]);

const MEGA_INDUSTRIES = {
  items: NAV_SUB_INDUSTRIES,
  relatedServices: [
    { label: "Strategy & Corporate Transformation", href: "/services/strategy" },
    { label: "Digital & AI Transformation", href: "/services/digital" },
    { label: "Financial Advisory, Audit & Risk", href: "/services/finance" },
  ],
  relatedInsights: [
    { label: "AI Readiness in Banking", href: "/insights/ai-readiness-assessment" },
    { label: "Corridor-Led Development", href: "/insights/corridor-led-development" },
    { label: "Renewable Energy Transition", href: "/insights/renewable-energy-transition" },
  ],
} as const;

const MEGA_SERVICES = {
  items: NAV_SUB_SERVICES,
  relatedIndustries: [
    { label: "Financial Services", href: "/industries/financial-services" },
    { label: "Energy & Natural Resources", href: "/industries/energy-resources" },
    { label: "Technology, Media & Telecom", href: "/industries/technology-digital" },
  ],
  relatedInsights: [
    { label: "Scaling Advisory-Led Growth", href: "/insights/scaling-advisory-led-growth" },
    { label: "Capital Structure Optimization", href: "/insights/capital-structure-optimization" },
    { label: "Digital Government Transformation", href: "/insights/renewable-energy-transition" },
  ],
} as const;

const MEGA_INSIGHTS = {
  categories: [
    { label: "Latest Thinking", href: "/insights" },
    { label: "Industry Insights", href: "/insights" },
    { label: "Research Reports", href: "/insights" },
    { label: "Transformation Perspectives", href: "/insights" },
  ],
  featured: [
    {
      title: "AI Readiness Assessment for African Enterprises",
      category: "Technology",
      href: "/insights/ai-readiness-assessment",
    },
    {
      title: "Corridor-Led Development: Unlocking Continental Trade Routes",
      category: "Infrastructure",
      href: "/insights/corridor-led-development",
    },
    {
      title: "Renewable Energy Transition and Institutional Readiness",
      category: "Public Policy",
      href: "/insights/renewable-energy-transition",
    },
  ],
} as const;

export default function SiteHeader() {
  const pathname = usePathname();
  const bp = useBreakpoint();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [megaPanel, setMegaPanel] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolledPast, setScrolledPast] = useState(false);
  const [navCollapsed, setNavCollapsed] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const megaTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activePage = NAV_LINKS_DESKTOP.find((label) => {
    const href = NAV_HREFS[label];
    if (!href) return false;
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  });

  useEffect(() => {
    const raf = requestAnimationFrame(() => setHasMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setNavCollapsed(scrollY > 0);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrolledPast(docHeight > 0 && scrollY / docHeight > 0.5);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isMobileViewport = hasMounted && (bp === "mobile" || bp === "tablet");
  const drawerOpenSafe = isMobileViewport || navCollapsed ? drawerOpen : false;

  useEffect(() => {
    if (drawerOpenSafe) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpenSafe]);

  useEffect(() => {
    const onScroll = () => {
      if (megaPanel) setMegaPanel(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [megaPanel]);

  const isInsightsPage = activePage === "Insights";
  const dynamicLabel = "Schedule an Introduction";
  const dynamicTo = "/contact";
  const hamburgerClassName =
    "inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-neutral-900 shadow-lg ring-1 ring-black/10 transition-transform duration-120 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-[1.03]";

  const handleLinkEnter = (link: string) => {
    setHoveredLink(link);
    if (MEGA_NAV_LINKS.has(link)) {
      if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
      setMegaPanel(link);
    }
  };

  const handleLinkLeave = () => {
    setHoveredLink(null);
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    megaTimeoutRef.current = setTimeout(() => {
      setMegaPanel(null);
    }, 150);
  };

  const handleMegaPanelEnter = () => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
  };

  const handleMegaPanelLeave = () => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    megaTimeoutRef.current = setTimeout(() => {
      setMegaPanel(null);
      setHoveredLink(null);
    }, 100);
  };

  return (
    <>
      <nav
        aria-label="Primary navigation"
        className="fixed inset-x-0 top-0 z-50 bg-transparent transition-all duration-300"
        style={{ boxShadow: "none", borderBottom: "none" }}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link
            href="/"
            className="text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--a700]"
          >
            Rill Singh Limited
          </Link>

          {!isMobileViewport ? (
            navCollapsed ? (
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open menu"
                className={hamburgerClassName}
              >
                <MenuIcon />
              </button>
            ) : (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-6">
                  {NAV_LINKS_DESKTOP.map((link) => {
                    const href = NAV_HREFS[link] || "#";
                    const isActive = link === activePage;
                    const isHovered = hoveredLink === link;
                    const hasMega = MEGA_NAV_LINKS.has(link);
                    return (
                      <Link
                        key={link}
                        href={href}
                        onMouseEnter={() => handleLinkEnter(link)}
                        onMouseLeave={handleLinkLeave}
                        className={`inline-flex items-center gap-1 border-b pb-1 text-[0.75rem] transition-colors duration-120 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                          isActive
                            ? "border-[--a700] text-white"
                            : isHovered
                              ? "border-neutral-500 text-white"
                              : "border-transparent text-white/80"
                        }`}
                      >
                        {link}
                        {hasMega && <ChevronDownIcon />}
                      </Link>
                    );
                  })}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSearchOpen(true)}
                    aria-label="Search"
                    className="inline-flex items-center justify-center text-white/80"
                  >
                    <SearchIcon />
                  </button>
                  <Link
                    href={dynamicTo}
                    className="rounded-card bg-[--a700] px-4 py-3 text-[0.75rem] font-semibold text-white transition-colors duration-120 hover:bg-[--a800]"
                  >
                    {dynamicLabel}
                  </Link>
                </div>
              </div>
            )
          ) : (
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="inline-flex items-center justify-center text-white/80"
              >
                <SearchIcon />
              </button>
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open menu"
                className={hamburgerClassName}
              >
                <MenuIcon />
              </button>
            </div>
          )}
        </div>
      </nav>

      {!isMobileViewport && megaPanel && (
        <MegaNavPanel
          activePanel={megaPanel}
          onMouseEnter={handleMegaPanelEnter}
          onMouseLeave={handleMegaPanelLeave}
        />
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      {(isMobileViewport || navCollapsed) && (
        <MobileDrawer
          open={drawerOpenSafe}
          onClose={() => setDrawerOpen(false)}
          activePage={activePage}
        />
      )}
    </>
  );
}

function MegaNavPanel({
  activePanel,
  onMouseEnter,
  onMouseLeave,
}: {
  activePanel: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const content =
    activePanel === "Industries" ? (
      <MegaIndustriesContent />
    ) : activePanel === "Services" ? (
      <MegaServicesContent />
    ) : (
      <MegaInsightsContent />
    );

  return (
    <div
      className="fixed inset-x-0 top-16 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">{content}</div>
    </div>
  );
}

function MegaIndustriesContent() {
  return (
    <div className="grid grid-cols-3 gap-10">
      <div>
        <MegaSectionLabel label="Industries" href="/industries" />
        <div className="mt-4 flex flex-col">
          {MEGA_INDUSTRIES.items.map((item) => (
            <MegaNavItem key={item.label} label={item.label} href={item.href} />
          ))}
        </div>
      </div>
      <div>
        <MegaSectionLabel label="Relevant Services" href="/services" />
        <div className="mt-4 flex flex-col">
          {MEGA_INDUSTRIES.relatedServices.map((item) => (
            <MegaNavItem key={item.label} label={item.label} href={item.href} />
          ))}
        </div>
        <Link href="/services" className="mt-4 inline-block text-[0.75rem] font-semibold text-[--a700]">
          View all services -&gt;
        </Link>
      </div>
      <div>
        <MegaSectionLabel label="Related Insights" href="/insights" />
        <div className="mt-4 flex flex-col">
          {MEGA_INDUSTRIES.relatedInsights.map((item) => (
            <MegaNavItem key={item.label} label={item.label} href={item.href} />
          ))}
        </div>
        <Link href="/insights" className="mt-4 inline-block text-[0.75rem] font-semibold text-[--a700]">
          View all insights -&gt;
        </Link>
      </div>
    </div>
  );
}

function MegaServicesContent() {
  return (
    <div className="grid grid-cols-3 gap-10">
      <div>
        <MegaSectionLabel label="Services" href="/services" />
        <div className="mt-4 flex flex-col">
          {MEGA_SERVICES.items.map((item) => (
            <MegaNavItem key={item.label} label={item.label} href={item.href} />
          ))}
        </div>
      </div>
      <div>
        <MegaSectionLabel label="Relevant Industries" href="/industries" />
        <div className="mt-4 flex flex-col">
          {MEGA_SERVICES.relatedIndustries.map((item) => (
            <MegaNavItem key={item.label} label={item.label} href={item.href} />
          ))}
        </div>
        <Link href="/industries" className="mt-4 inline-block text-[0.75rem] font-semibold text-[--a700]">
          View all industries -&gt;
        </Link>
      </div>
      <div>
        <MegaSectionLabel label="Related Insights" href="/insights" />
        <div className="mt-4 flex flex-col">
          {MEGA_SERVICES.relatedInsights.map((item) => (
            <MegaNavItem key={item.label} label={item.label} href={item.href} />
          ))}
        </div>
        <Link href="/insights" className="mt-4 inline-block text-[0.75rem] font-semibold text-[--a700]">
          View all insights -&gt;
        </Link>
      </div>
    </div>
  );
}

function MegaInsightsContent() {
  return (
    <div className="grid grid-cols-[1fr_2fr] gap-12">
      <div>
        <MegaSectionLabel label="Insights Categories" href="/insights" />
        <div className="mt-4 flex flex-col">
          {MEGA_INSIGHTS.categories.map((item) => (
            <MegaNavItem key={item.label} label={item.label} href={item.href} />
          ))}
        </div>
      </div>
      <div>
        <MegaSectionLabel label="Featured Insights" href="/insights" />
        <div className="mt-4 grid grid-cols-3 gap-6">
          {MEGA_INSIGHTS.featured.map((insight) => (
            <MegaInsightCard key={insight.title} insight={insight} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MegaSectionLabel({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="block border-b border-neutral-200 pb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-[--a700]"
    >
      {label}
    </Link>
  );
}

function MegaNavItem({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="block py-2 text-[0.75rem] text-neutral-700 transition-colors duration-120 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:text-[--a700]"
    >
      {label}
    </Link>
  );
}

function MegaInsightCard({
  insight,
}: {
  insight: { title: string; category: string; href: string };
}) {
  return (
    <Link
      href={insight.href}
      className="group block rounded-card border border-neutral-200 px-4 py-4 transition-colors duration-120 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:border-neutral-300"
    >
      <span className="block text-[0.625rem] font-semibold uppercase tracking-[0.04em] text-[--a700]">
        {insight.category}
      </span>
      <span className="mt-2 block text-[0.75rem] font-medium leading-[1.4] text-neutral-900 transition-colors duration-120 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:text-[--a700]">
        {insight.title}
      </span>
      <span className="mt-3 inline-flex items-center gap-1 text-[0.75rem] font-semibold text-[--a700]">
        Read -&gt;
      </span>
    </Link>
  );
}

function MobileDrawer({
  open,
  onClose,
  activePage,
}: {
  open: boolean;
  onClose: () => void;
  activePage?: string;
}) {
  const [subMenu, setSubMenu] = useState<"Services" | "Industries" | "Insights" | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap and ESC
  useEffect(() => {
    if (!open || !drawerRef.current) return;
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !drawerRef.current) return;
      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        "button, a, [tabindex]:not([tabindex='-1'])",
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleTab);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleTab);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  const handleClose = () => {
    setSubMenu(null);
    onClose();
    // Restore focus to hamburger button
    if (hamburgerButtonRef.current) {
      hamburgerButtonRef.current.focus();
    }
    document.body.style.overflow = "";
  };

  const subItems =
    subMenu === "Services"
      ? NAV_SUB_SERVICES
      : subMenu === "Industries"
        ? NAV_SUB_INDUSTRIES
        : subMenu === "Insights"
          ? MEGA_INSIGHTS.categories
          : [];

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-[rgba(10,10,10,0.4)] transition-opacity duration-120 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal={open ? "true" : undefined}
        aria-label="Navigation menu"
        className={`fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-90 flex-col bg-white transition-opacity duration-120 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
          <span className="text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-neutral-900">
            Menu
          </span>
          <button type="button" onClick={handleClose} aria-label="Close menu" className="text-neutral-900">
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          {subMenu === null ? (
            <div className="flex flex-col">
              {NAV_LINKS_MOBILE.map((link) => {
                const hasSubMenu = link === "Services" || link === "Industries" || link === "Insights";
                const isActive = link === activePage;
                if (hasSubMenu) {
                  return (
                    <button
                      key={link}
                      type="button"
                      onClick={() => setSubMenu(link)}
                      className={`flex w-full items-center justify-between px-6 py-4 text-left text-[0.9375rem] transition-colors duration-120 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:bg-neutral-50 ${
                        isActive ? "font-semibold text-[--a700]" : "text-neutral-900"
                      }`}
                    >
                      {link}
                      <ChevronRightIcon />
                    </button>
                  );
                }
                return (
                  <Link
                    key={link}
                    href={NAV_HREFS[link] || "#"}
                    onClick={handleClose}
                    className={`block px-6 py-4 text-[0.9375rem] transition-colors duration-120 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:bg-neutral-50 ${
                      isActive ? "font-semibold text-[--a700]" : "text-neutral-900"
                    }`}
                  >
                    {link}
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() => setSubMenu(null)}
                className="flex items-center gap-2 px-6 pb-4 pt-3 text-[0.75rem] font-semibold uppercase tracking-[0.04em] text-[--a700]"
              >
                <ChevronLeftIcon />
                Back
              </button>
              <div className="border-b border-neutral-200 px-6 pb-4 text-[0.9375rem] font-semibold text-neutral-900">
                {subMenu}
              </div>
              <Link
                href={NAV_HREFS[subMenu] || "#"}
                onClick={handleClose}
                className="block px-6 pb-3 pt-4 text-[0.75rem] font-semibold text-[--a700]"
              >
                View all {subMenu.toLowerCase()} -&gt;
              </Link>
              {subItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={handleClose}
                  className="block px-6 py-3 text-[0.9375rem] text-neutral-700 transition-colors duration-120 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:bg-neutral-50"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-neutral-200 px-6 py-5">
          <Link
            href="/contact"
            onClick={handleClose}
            className="block rounded-card bg-[--a700] px-6 py-3 text-center text-[0.9375rem] font-semibold text-white"
          >
            Schedule an Introduction
          </Link>
        </div>
      </div>
    </>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M3 6h18" />
      <path d="M3 12h18" />
      <path d="M3 18h18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M6 6l12 12" />
      <path d="M6 18L18 6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="m15 6-6 6 6 6" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
```


================================================================================
FILE 13: components-v2\layout\SiteFooter.tsx
Footer
================================================================================

```tsx
import Link from "next/link";

const COLUMN_1_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
] as const;

const COLUMN_2_LINKS = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
] as const;

export default function SiteFooter() {
  return (
    <footer className="bg-navy-darkest">
      {/* Separator line from CTA section above */}
      <div className="mx-auto w-full max-w-[1280px] border-t border-blue-light/15 px-6 lg:px-8">
        {/* â•â•â• TOP ROW â•â•â• */}
        <div className="flex flex-col gap-8 pt-12 lg:flex-row lg:gap-0">
          {/* Left 55% â€” Brand */}
          <div className="lg:w-[55%]">
            <span
              className="font-[var(--font-heading)] text-[22px] font-normal text-white"
            >
              Rill Singh Limited
            </span>
            <p
              className="mt-3 max-w-[400px] font-[var(--font-body)] text-[14px] leading-[1.6] text-blue-light"
            >
              Pan-African institutional advisory. Precision-led consulting for growth,
              transformation, and execution.
            </p>
          </div>

          {/* Right 45% â€” Quick links in 2 columns */}
          <div className="lg:w-[45%] flex gap-16">
            <div className="flex flex-col gap-3">
              {COLUMN_1_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-[var(--font-body)] text-[13px] text-white/60 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {COLUMN_2_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-[var(--font-body)] text-[13px] text-white/60 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* â•â•â• MIDDLE ROW â•â•â• */}
        <div className="mt-10 border-t border-blue-light/10 py-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span
                className="font-[var(--font-body)] text-[12px] text-blue-light"
              >
                Follow us
              </span>
              <Link
                href="https://www.linkedin.com/company/rill-singh-limited"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity duration-300 hover:opacity-80"
              >
                <svg viewBox="0 0 24 24" fill="white" className="h-4 w-4">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://wa.me/254793995142"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity duration-300 hover:opacity-80"
              >
                <svg viewBox="0 0 24 24" fill="white" className="h-4 w-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="sr-only">WhatsApp</span>
              </Link>
            </div>
            <span className="font-[var(--font-body)] text-[12px] text-blue-light">
              Nairobi, Kenya
            </span>
          </div>
        </div>

        {/* â•â•â• BOTTOM ROW â•â•â• */}
        <div className="flex flex-col items-start justify-between gap-3 pb-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-1">
            {LEGAL_LINKS.map((link, i) => (
              <span key={link.label} className="flex items-center gap-1">
                {i > 0 && (
                  <span className="text-[12px] text-white/20" aria-hidden="true">Â·</span>
                )}
                <Link
                  href={link.href}
                  className="font-[var(--font-body)] text-[12px] text-white/40 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </div>
          <span className="font-[var(--font-body)] text-[12px] text-white/40">
            &copy; {new Date().getFullYear()} Rill Singh Limited
          </span>
        </div>
      </div>
    </footer>
  );
}
```


================================================================================
FILE 14: components-v2\layout\SearchOverlay.tsx
Search (header)
================================================================================

```tsx
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import type { UnifiedSearchResult } from "@/lib/search/types";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

type SearchState = {
  query: string;
  results: UnifiedSearchResult[];
  loading: boolean;
};

function isUnifiedSearchResult(value: unknown): value is UnifiedSearchResult {
  if (!value || typeof value !== "object") return false;
  const record = value as UnifiedSearchResult;
  return (
    (record.type === "page" || record.type === "service" || record.type === "insight") &&
    typeof record.title === "string" &&
    typeof record.slug === "string" &&
    typeof record.excerpt === "string"
  );
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ open, onClose }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<SearchState>({
    query: "",
    results: [],
    loading: false,
  });
  const [inputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !overlayRef.current) return;
      const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
        "input, button, a, [tabindex]:not([tabindex='-1'])",
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    window.addEventListener("keydown", handleTab);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("keydown", handleTab);
    };
  }, [open, onClose]);

  const runSearch = useCallback(async (query: string, controller: AbortController) => {
    if (query.length < 3) {
      setState((prev) => ({ ...prev, results: [], loading: false }));
      return;
    }

    setState((prev) => ({ ...prev, loading: true }));

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: query }),
        signal: controller.signal,
      });

      if (!response.ok) {
        setState((prev) => ({ ...prev, results: [], loading: false }));
        return;
      }

      const data = await response.json();
      const items = Array.isArray(data?.data) ? data.data.filter(isUnifiedSearchResult) : [];
      setState((prev) => ({ ...prev, results: items, loading: false }));
    } catch (error) {
      if ((error as Error)?.name === "AbortError") return;
      setState((prev) => ({ ...prev, results: [], loading: false }));
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    const handle = window.setTimeout(() => {
      void runSearch(state.query, controller);
    }, 180);
    return () => {
      controller.abort();
      window.clearTimeout(handle);
    };
  }, [open, runSearch, state.query]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      className="fixed inset-0 z-60 flex items-start justify-center bg-[rgba(10,10,10,0.5)]"
      onClick={onClose}
    >
      <div
        className="mt-24 w-full max-w-[640px] rounded-card bg-white shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex items-center gap-3 px-5 py-4 transition-colors duration-[120ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
            inputFocused ? "border-b border-[var(--a700)]" : "border-b border-neutral-200"
          }`}
        >
          <SearchIcon className="text-neutral-400" />
          <input
            ref={inputRef}
            type="text"
            value={state.query}
            placeholder="Search insights, services, industries..."
            aria-label="Search insights, services, industries"
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            onChange={(e) => setState((prev) => ({ ...prev, query: e.target.value }))}
            className="w-full border-0 bg-transparent text-[0.9375rem] text-neutral-900 outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="text-neutral-400 transition-colors duration-[120ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:text-neutral-700"
          >
            <CloseIcon />
          </button>
        </div>

        {state.results.length > 0 && (
          <div className="max-h-[360px] overflow-y-auto px-5 py-4 text-[0.75rem] text-neutral-500">
            <div className="mb-3 flex items-center justify-between border-b border-neutral-100 pb-2">
              <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.04em] text-[var(--a700)]">
                Knowledge Results
              </span>
              <span className="text-[0.6875rem] text-neutral-400">
                {state.results.length} found
              </span>
            </div>
            <div className="flex flex-col gap-1">
              {state.results.map((result) => (
                <a
                  key={`${result.type}-${result.slug}`}
                  href={`/${result.type === "page" ? "" : `${result.type}s/`}${result.slug}`}
                  className="flex items-center gap-3 rounded-card px-3 py-2 text-[0.75rem] text-neutral-700 transition-colors duration-[120ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:bg-neutral-50"
                  onClick={onClose}
                >
                  <span
                    className={`shrink-0 rounded-[2px] px-2 py-1 text-[0.5625rem] font-semibold uppercase tracking-[0.04em] ${
                      result.type === "insight"
                        ? "bg-[var(--a50)] text-[var(--a700)]"
                        : result.type === "service"
                          ? "bg-neutral-100 text-neutral-600"
                          : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    {result.type === "page" ? "Page" : result.type}
                  </span>
                  <span className="truncate">{result.title}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {state.results.length === 0 && (
          <div className="px-5 py-6 text-[0.75rem] text-neutral-500">
            {state.loading ? (
              <p>Searching...</p>
            ) : (
              <>
                <p className="mb-2">Search across the RSL knowledge network.</p>
                <p className="text-[0.6875rem] text-neutral-400">
                  Try: AI, digital transformation, financial services, energy, governance...
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-5 w-5 ${className ?? ""}`} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M6 6l12 12" />
      <path d="M6 18L18 6" />
    </svg>
  );
}
```


================================================================================
FILE 15: src\components\ScrollReveal.tsx
Scroll animations
================================================================================

```tsx
"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties, type Ref } from "react";
import { useReducedMotionPreference } from "@/src/lib/motion/useReducedMotionPreference";

type RevealDirection = "up" | "down" | "left" | "right" | "fade";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  distance?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "span" | "section" | "article" | "li";
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  distance = 35,
  duration = 800,
  threshold = 0.12,
  once = true,
  className,
  style,
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotionPreference();
  const revealVisible = prefersReducedMotion ? true : isVisible;

  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion, threshold, once]);

  const getTransform = (): string => {
    if (revealVisible) return "translate3d(0, 0, 0)";
    switch (direction) {
      case "up": return `translate3d(0, ${distance}px, 0)`;
      case "down": return `translate3d(0, -${distance}px, 0)`;
      case "left": return `translate3d(${distance}px, 0, 0)`;
      case "right": return `translate3d(-${distance}px, 0, 0)`;
      case "fade": return "translate3d(0, 0, 0)";
    }
  };

  const revealStyle: CSSProperties = {
    opacity: revealVisible ? 1 : 0,
    transform: getTransform(),
    transition: `opacity ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms, transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
    willChange: "opacity, transform",
    ...style,
  };

  return (
    <Tag ref={ref as Ref<HTMLElement>} className={className} style={revealStyle}>
      {children}
    </Tag>
  );
}

/**
 * Wrapper for staggered children â€” each direct child gets a delay offset.
 */
interface StaggerRevealProps {
  children: ReactNode[];
  direction?: RevealDirection;
  baseDelay?: number;
  staggerDelay?: number;
  distance?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  style?: CSSProperties;
  childClassName?: string;
}

export function StaggerReveal({
  children,
  direction = "up",
  baseDelay = 0,
  staggerDelay = 120,
  distance = 30,
  duration = 700,
  threshold = 0.08,
  className,
  style,
  childClassName,
}: StaggerRevealProps) {
  return (
    <div className={className} style={style}>
      {children.map((child, i) => (
        <ScrollReveal
          key={i}
          direction={direction}
          delay={baseDelay + i * staggerDelay}
          distance={distance}
          duration={duration}
          threshold={threshold}
          className={childClassName}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
}
```


================================================================================
FILE 16: src\lib\motion\useReducedMotionPreference.ts
Motion hook
================================================================================

```ts
"use client";

import { useCallback, useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Returns `true` when the user has requested reduced motion at the OS level.
 * SSR-safe â€” defaults to `false` on the server.
 */
export function useReducedMotionPreference(): boolean {
	const subscribe = useCallback((onStoreChange: () => void) => {
		const mql = window.matchMedia(QUERY);
		mql.addEventListener("change", onStoreChange);
		return () => mql.removeEventListener("change", onStoreChange);
	}, []);

	const getSnapshot = useCallback(() => window.matchMedia(QUERY).matches, []);
	const getServerSnapshot = useCallback(() => false, []);

	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
```


================================================================================
FILE 17: lib\breakpoints.ts
Breakpoints hook
================================================================================

```ts
"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Breakpoint = "desktop" | "tablet" | "mobile";

const MOBILE_MAX = 767;
const TABLET_MAX = 1023;

export const BpCtx = createContext<Breakpoint>("desktop");

function resolveBreakpoint(width: number): Breakpoint {
  if (width <= MOBILE_MAX) return "mobile";
  if (width <= TABLET_MAX) return "tablet";
  return "desktop";
}

export function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>("desktop");

  useEffect(() => {
    const onResize = () => setBp(resolveBreakpoint(window.innerWidth));
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return bp;
}

export function useBp(): Breakpoint {
  return useContext(BpCtx);
}

export function useResponsiveValue<TDesktop, TTablet, TMobile>(
  desktop: TDesktop,
  tablet: TTablet,
  mobile: TMobile,
): TDesktop | TTablet | TMobile {
  const bp = useBp();
  if (bp === "mobile") return mobile;
  if (bp === "tablet") return tablet;
  return desktop;
}
```


================================================================================
FILE 18: components-v2\ui\PreviewBanner.tsx
Preview banner (layout)
================================================================================

```tsx
"use client";

import { useState } from "react";

interface PreviewBannerProps {
  active?: boolean;
  onExit?: () => void;
}

export default function PreviewBanner({ active = false, onExit }: PreviewBannerProps) {
  const [hovered, setHovered] = useState(false);

  if (!active) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "16px",
        left: "50%",
        marginLeft: "-160px",
        width: "320px",
        zIndex: 9999,
        backgroundColor: "var(--o600)",
        color: "#FFFFFF",
        fontFamily: "var(--font-primary)",
        fontSize: "var(--text-caption)",
        fontWeight: 600,
        padding: "12px 20px",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      <span>Preview Mode Active</span>
      <button
        type="button"
        onClick={onExit}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        disabled={!onExit}
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "var(--text-caption)",
          fontWeight: 600,
          color: "#FFFFFF",
          backgroundColor: hovered ? "rgba(255,255,255,0.2)" : "transparent",
          border: "1px solid rgba(255,255,255,0.5)",
          borderRadius: "4px",
          padding: "4px 12px",
          cursor: onExit ? "pointer" : "default",
          transition: "background-color 120ms cubic-bezier(0.25, 0.1, 0.25, 1)",
          opacity: onExit ? 1 : 0.6,
        }}
      >
        Exit
      </button>
    </div>
  );
}
```

