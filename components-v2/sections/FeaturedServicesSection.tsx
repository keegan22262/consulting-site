"use client";

import Image from "next/image";
import Link from "next/link";

// ─── Featured items (top 3 of each) ────────────────────────────────────────

const FEATURED_SERVICES = [
  { title: "Strategy & Corporate Transformation", description: "Enterprise strategy, M&A advisory, and transformation roadmaps for growth-stage institutions.", image: "/images/capabilities/strategy.jpg", href: "/services/strategy" },
  { title: "Digital & AI Transformation", description: "Digital modernization, AI readiness, and platform implementation across the enterprise.", image: "/images/capabilities/digital-ai.jpg", href: "/services/digital" },
  { title: "Financial Advisory, Audit & Risk", description: "Financial resilience, governance, risk frameworks, and control architecture.", image: "/images/capabilities/financial.jpg", href: "/services/financial" },
];

const FEATURED_INDUSTRIES = [
  { title: "Financial Services", description: "Banks, capital markets, insurers, and fintechs navigating regulatory complexity.", image: "/images/industries/sectors/financial-services.jpg", href: "/industries/financial-services" },
  { title: "Healthcare & Life Sciences", description: "Healthcare providers, pharmaceutical companies, and medtech innovators.", image: "/images/industries/sectors/healthcare-life-sciences.jpg", href: "/industries/healthcare-life-sciences" },
  { title: "Energy & Natural Resources", description: "Oil, gas, utilities, renewables, and mining operations across the continent.", image: "/images/industries/sectors/energy-resources.jpg", href: "/industries/energy-resources" },
];

// ─── Horizontal marquee card ────────────────────────────────────────────────

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
          Learn more <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}

// ─── Main section ────────────────────────────────────────────────────────────

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

      {/* Row 1: Services — scrolls left to right */}
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

      {/* Row 2: Industries — scrolls right to left */}
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
