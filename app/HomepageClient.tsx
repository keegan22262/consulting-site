"use client";

import Link from "next/link";
import Image from "next/image";
import FeaturedServicesSection from "@/components-v2/sections/FeaturedServicesSection";
import InsightsCarouselSection from "@/components-v2/sections/InsightsCarouselSection";
import ScrollReveal from "@/src/components/ScrollReveal";

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
      <section className="homepage-hero">
        <div className="homepage-hero__bg">
          <Image
            src="/images/hero/hero-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            quality={100}
            priority
            unoptimized
          />
          <div className="homepage-hero__overlay" />
        </div>
        <div className="homepage-hero__content">
          <ScrollReveal direction="up" delay={200} distance={25} duration={900}>
            <p className="homepage-hero__overline">
              Pan-African Institutional Advisory
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={400} distance={30} duration={1000}>
            <h1 className="homepage-hero__headline">
              Institutional Advisory Built for Growth, Transformation, and Execution.
            </h1>
          </ScrollReveal>
        </div>
      </section>

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
                navigating structural complexity — delivering measurable outcomes with discipline.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={350} distance={25} duration={700}>
              <div className="homepage-intro__card" style={{ borderLeftColor: "#5483B3" }}>
                <h4 className="homepage-intro__card-title">Integrated Advisory</h4>
                <p className="homepage-intro__card-text">
                  Ten disciplines under one roof — strategy, digital, finance, people, and governance
                  — delivered through a shared methodology framework.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={500} distance={25} duration={700}>
              <div className="homepage-intro__card" style={{ borderLeftColor: "#7DA0CA" }}>
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
                — eliminating fragmentation, aligning strategic intent with execution mechanics, and
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
                Explore All Services <span>→</span>
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
              Every engagement begins with a structured conversation. No obligations — simply an
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
