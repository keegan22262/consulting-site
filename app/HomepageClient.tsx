"use client";

import Link from "next/link";
import Image from "next/image";
import FeaturedServicesSection from "@/components-v2/sections/FeaturedServicesSection";
import InsightsCarouselSection from "@/components-v2/sections/InsightsCarouselSection";

interface HomepageClientProps {
  insights: Array<{
    slug: string;
    category?: string;
    title: string;
    excerpt?: string;
    summary?: string;
  }>;
}

/* ─── Checkmark icon used in the advisory checklist ─────────────────────── */
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
      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1: HERO — Full-viewport background image
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="homepage-hero">
        <div className="homepage-hero__bg">
          <Image
            src="/images/hero/hero-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            quality={90}
            priority
          />
          <div className="homepage-hero__overlay" />
        </div>
        <div className="homepage-hero__content">
          <p className="homepage-hero__overline">
            Pan-African Institutional Advisory
          </p>
          <h1 className="homepage-hero__headline">
            Institutional Advisory Built for Growth, Transformation, and Execution.
          </h1>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2: INTRODUCTION — Split layout, image collage + content
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="homepage-intro">
        <div className="homepage-intro__inner">
          {/* Left: Overlapping image collage */}
          <div className="homepage-intro__images">
            <div className="homepage-intro__img-main">
              <Image
                src="/images/advisory/institutional-01.jpg"
                alt="Advisory setting"
                fill
                sizes="320px"
                className="object-cover"
              />
            </div>
            <div className="homepage-intro__img-top">
              <Image
                src="/images/advisory/institutional-02.jpg"
                alt="Team meeting"
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
            <div className="homepage-intro__img-bottom">
              <Image
                src="/images/advisory/institutional-03.jpg"
                alt="Workspace"
                fill
                sizes="220px"
                className="object-cover"
              />
            </div>
            <div className="homepage-intro__badge">
              <span className="homepage-intro__badge-number">10+</span>
              <span className="homepage-intro__badge-label">Advisory Disciplines</span>
            </div>
          </div>

          {/* Right: Text content */}
          <div className="homepage-intro__content">
            <p className="homepage-intro__desc">
              We advise growth-stage companies, institutional operators, and public-sector leaders
              navigating structural complexity — delivering measurable outcomes with discipline.
            </p>

            <div className="homepage-intro__card" style={{ borderLeftColor: "#5483B3" }}>
              <h4 className="homepage-intro__card-title">Integrated Advisory</h4>
              <p className="homepage-intro__card-text">
                Ten disciplines under one roof — strategy, digital, finance, people, and governance
                — delivered through a shared methodology framework.
              </p>
            </div>

            <div className="homepage-intro__card" style={{ borderLeftColor: "#7DA0CA" }}>
              <h4 className="homepage-intro__card-title">Execution Discipline</h4>
              <p className="homepage-intro__card-text">
                Strategy without implementation is academic. We operate at the intersection of
                advisory insight and delivery accountability.
              </p>
            </div>

            <div className="homepage-intro__ctas">
              <Link href="/services" className="homepage-btn homepage-btn--primary">
                Explore Our Services
              </Link>
              <Link href="/insights" className="homepage-btn homepage-btn--outline">
                Read Our Latest Thinking
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3: EXPLORE + ADVISORY ARCHITECTURE — Mirrored layout
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="homepage-advisory">
        <div className="homepage-advisory__inner">
          {/* Left: Image collage */}
          <div className="homepage-advisory__images">
            <div className="homepage-advisory__img-circle">
              <Image
                src="/images/gateway/executive.jpg"
                alt="Advisory boardroom"
                fill
                sizes="300px"
                className="object-cover"
              />
            </div>
            <div className="homepage-advisory__img-rect">
              <Image
                src="/images/capabilities/strategy.jpg"
                alt="Team collaboration"
                fill
                sizes="240px"
                className="object-cover"
              />
            </div>
            <div className="homepage-advisory__stats-badge">
              <span className="homepage-advisory__stats-number">11</span>
              <span className="homepage-advisory__stats-label">Industry Sectors</span>
            </div>
            {/* Decorative dot pattern */}
            <div className="homepage-advisory__dots" aria-hidden="true" />
          </div>

          {/* Right: Content */}
          <div className="homepage-advisory__content">
            <p className="homepage-advisory__overline">Explore</p>
            <h2 className="homepage-advisory__heading">
              How can we assist you today?
            </h2>

            <div className="homepage-advisory__pills">
              <Link href="/services" className="homepage-pill homepage-pill--filled">
                By Capability
              </Link>
              <Link href="/industries" className="homepage-pill homepage-pill--outline">
                By Industry
              </Link>
            </div>

            <p className="homepage-advisory__sub-overline">Advisory Architecture</p>
            <h3 className="homepage-advisory__sub-heading">
              Ten disciplines. One integrated practice.
            </h3>
            <p className="homepage-advisory__desc">
              Ten advisory disciplines operate within a unified governance and delivery architecture
              — eliminating fragmentation, aligning strategic intent with execution mechanics, and
              ensuring institutional coherence across every engagement.
            </p>

            <div className="homepage-advisory__checklist">
              <div className="homepage-advisory__check-item">
                <CheckIcon />
                <span>Strategy & Transformation</span>
              </div>
              <div className="homepage-advisory__check-item">
                <CheckIcon />
                <span>Digital & AI Advisory</span>
              </div>
              <div className="homepage-advisory__check-item">
                <CheckIcon />
                <span>Financial & Risk Advisory</span>
              </div>
              <div className="homepage-advisory__check-item">
                <CheckIcon />
                <span>People & ESG Consulting</span>
              </div>
            </div>

            <Link href="/services" className="homepage-advisory__link">
              Explore All Services <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 4: INSIGHTS — Centered header, 3-column cards
          ═══════════════════════════════════════════════════════════════════ */}
      <InsightsCarouselSection insights={insights} centered />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 5: FEATURED SERVICES & INDUSTRIES MARQUEE
          ═══════════════════════════════════════════════════════════════════ */}
      <FeaturedServicesSection />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 6: CTA — Background image with dark overlay
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="homepage-cta">
        <div className="homepage-cta__bg">
          <Image
            src="/images/services/hero-services.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            quality={85}
          />
          <div className="homepage-cta__overlay" />
        </div>
        <div className="homepage-cta__content">
          <h2 className="homepage-cta__heading">
            Begin a Conversation With Our Advisory Team.
          </h2>
          <p className="homepage-cta__desc">
            Every engagement begins with a structured conversation. No obligations — simply an
            exchange of context to determine whether there is a basis for collaboration.
          </p>
          <Link href="/contact" className="homepage-cta__button">
            Schedule an Introduction
          </Link>
        </div>
      </section>
    </>
  );
}
