"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components-v2/ui/Breadcrumb";
import { CaseStudyCard, ExploreRelatedKnowledge, type KnowledgeLink } from "@/components-v2/ui/RelatedKnowledge";
import ServiceCard from "@/components-v2/ui/ServiceCard";
import SectionHeader from "@/components-v2/sections/SectionHeader";
import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import CTABlock from "@/components-v2/sections/CTABlock";
import { useHeroEntrance } from "@/components-v2/foundation/useHeroEntrance";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";
import { SERVICES, type ServiceItem } from "@/src/sections/services/data";
import { CASE_STUDIES } from "@/src/sections/case-study/data";

export type IndustryRelatedService = {
  slug: string;
  title: string;
  description: string;
};

export type IndustryRelatedInsight = {
  slug: string;
  title: string;
  category: string;
  summary?: string;
  readingTime?: string | number;
};

interface Props {
  slug: string;
  title: string;
  summary: string;
  description: string;
  challenge: string;
  regulatoryContext: string;
  relatedServices: IndustryRelatedService[];
  relatedInsights: IndustryRelatedInsight[];
  heroImage?: string;
}

const INSIGHT_IMAGES = [
  "/images/insights/insight-1.jpg",
  "/images/insights/insight-2.jpg",
  "/images/insights/insight-3.jpg",
  "/images/insights/insight-4.jpg",
  "/images/insights/insight-5.jpg",
];

const INDUSTRY_IMAGE_SETS: Record<
  string,
  { hero: string; foresight: string; advisory: string }
> = {
  "financial-services": {
    hero: "/images/industries/financial-services/hero.jpg",
    foresight: "/images/industries/financial-services/foresight.jpg",
    advisory: "/images/industries/financial-services/advisory.jpg",
  },
  "healthcare-life-sciences": {
    hero: "/images/industries/healthcare-life-sciences/hero.jpg",
    foresight: "/images/industries/healthcare-life-sciences/foresight.jpg",
    advisory: "/images/industries/healthcare-life-sciences/advisory.jpg",
  },
  "energy-resources": {
    hero: "/images/industries/energy-resources/hero.jpg",
    foresight: "/images/industries/energy-resources/foresight.jpg",
    advisory: "/images/industries/energy-resources/advisory.jpg",
  },
  "industrials-manufacturing": {
    hero: "/images/industries/industrials-manufacturing/hero.jpg",
    foresight: "/images/industries/industrials-manufacturing/foresight.jpg",
    advisory: "/images/industries/industrials-manufacturing/advisory.jpg",
  },
  "consumer-retail": {
    hero: "/images/industries/consumer-retail/hero.jpg",
    foresight: "/images/industries/consumer-retail/foresight.jpg",
    advisory: "/images/industries/consumer-retail/advisory.jpg",
  },
  "technology-digital": {
    hero: "/images/industries/technology-digital/hero.jpg",
    foresight: "/images/industries/technology-digital/foresight.jpg",
    advisory: "/images/industries/technology-digital/advisory.jpg",
  },
  "transport-logistics": {
    hero: "/images/industries/transport-logistics/hero.jpg",
    foresight: "/images/industries/transport-logistics/foresight.jpg",
    advisory: "/images/industries/transport-logistics/advisory.jpg",
  },
  "public-sector-government": {
    hero: "/images/industries/public-sector-government/hero.jpg",
    foresight: "/images/industries/public-sector-government/foresight.jpg",
    advisory: "/images/industries/public-sector-government/advisory.jpg",
  },
  "real-estate-infrastructure": {
    hero: "/images/industries/real-estate-infrastructure/hero.jpg",
    foresight: "/images/industries/real-estate-infrastructure/foresight.jpg",
    advisory: "/images/industries/real-estate-infrastructure/advisory.jpg",
  },
  "private-capital": {
    hero: "/images/industries/private-capital/hero.jpg",
    foresight: "/images/industries/private-capital/foresight.jpg",
    advisory: "/images/industries/private-capital/advisory.jpg",
  },
  education: {
    hero: "/images/industries/education/hero.jpg",
    foresight: "/images/industries/education/foresight.jpg",
    advisory: "/images/industries/education/advisory.jpg",
  },
};

export default function IndustryDetailSections(props: Props) {
  const {
    slug,
    title,
    summary,
    description,
    regulatoryContext,
    relatedServices,
    relatedInsights,
    heroImage,
  } = props;

  const positioning = summary || description;
  const body = description || summary;
  const includes = regulatoryContext;

  const imageSet = INDUSTRY_IMAGE_SETS[slug];
  const effectiveHeroImage = imageSet?.hero ?? heroImage ?? "/images/industries/financial-services/hero.jpg";
  const futureImage = imageSet?.foresight ?? "/images/industries/financial-services/foresight.jpg";
  const advisoryImage = imageSet?.advisory ?? "/images/industries/financial-services/advisory.jpg";
  const serviceItems = buildServiceItems(relatedServices);
  const caseStudies = CASE_STUDIES.filter((cs) => cs.industryIds.includes(slug)).slice(0, 2);

  return (
    <>
      <IndustryEditorialHero title={title} positioning={positioning} />

      <IndustryCinematicImage image={effectiveHeroImage} title={title} />

      <IndustryNarrativeSection body={body} includes={includes} />

      {serviceItems.length > 0 ? (
        <ServicesSupportingSection services={serviceItems} />
      ) : (
        <Spacer />
      )}

      <FutureApproachSection title={title} image={futureImage} />

      <SectorAdvisoryCta title={title} image={advisoryImage} />

      <OutcomeSignalsSection signals={OUTCOME_SIGNALS[slug] || DEFAULT_OUTCOME_SIGNALS} />

      {relatedInsights.length > 0 ? (
        <IndustryRelatedInsights insights={relatedInsights} />
      ) : (
        <Spacer />
      )}

      {caseStudies.length > 0 ? (
        <IndustryRelatedCaseStudies caseStudies={caseStudies} />
      ) : (
        <Spacer />
      )}

      <IndustryKnowledgeNav
        services={serviceItems}
        insights={relatedInsights}
        caseStudies={caseStudies}
      />

      <IndustryPreFooterCta />
    </>
  );
}

function Spacer() {
  return <div className="py-10" />;
}

function IndustryEditorialHero({
  title,
  positioning,
}: {
  title: string;
  positioning: string;
}) {
  const heroEntrance = useHeroEntrance(true);
  const px = useResponsiveValue({ desktop: "32px", tablet: "32px", mobile: "24px" });
  const padTop = useResponsiveValue({ desktop: "120px", tablet: "96px", mobile: "72px" });
  const padBottom = useResponsiveValue({ desktop: "72px", tablet: "56px", mobile: "40px" });
  const titleSize = useResponsiveValue({ desktop: "3.5rem", tablet: "2.75rem", mobile: "2rem" });
  const titleLineHeight = useResponsiveValue({ desktop: "1.06", tablet: "1.1", mobile: "1.18" });
  const titleLetterSpacing = useResponsiveValue({ desktop: "-0.03em", tablet: "-0.02em", mobile: "-0.01em" });
  const descSize = useResponsiveValue({ desktop: "1.1875rem", tablet: "1.0625rem", mobile: "1rem" });

  return (
    <section className="bg-white">
      <div
        className="mx-auto max-w-[1280px]"
        style={{ paddingTop: padTop, paddingBottom: padBottom, paddingLeft: px, paddingRight: px }}
      >
        <div className="mb-10" style={heroEntrance.overline}>
          <Breadcrumb
            items={[
              { label: "RSL", href: "/" },
              { label: "Industries", href: "/industries" },
              { label: title },
            ]}
          />
        </div>
        <span
          className="block text-[0.6875rem] font-semibold uppercase tracking-[0.08em]"
          style={{ color: "rgba(27, 58, 92, 0.88)", ...heroEntrance.overline }}
        >
          Industry
        </span>
        <h1
          className="mt-4 max-w-[780px] font-semibold text-[#0F1720]"
          style={{ fontSize: titleSize, lineHeight: titleLineHeight, letterSpacing: titleLetterSpacing, ...heroEntrance.heading }}
        >
          {title}.
        </h1>
        <p
          className="mt-6 max-w-[62ch] leading-[1.65] text-[#475569]"
          style={{ fontSize: descSize, ...heroEntrance.paragraph }}
        >
          {positioning}
        </p>
      </div>
    </section>
  );
}

function IndustryCinematicImage({ image, title }: { image: string; title: string }) {
  const px = useResponsiveValue({ desktop: "32px", tablet: "32px", mobile: "24px" });
  const padBottom = useResponsiveValue({ desktop: "80px", tablet: "64px", mobile: "48px" });

  return (
    <section className="bg-white" style={{ paddingBottom: padBottom }}>
      <div className="mx-auto max-w-[1280px]" style={{ paddingLeft: px, paddingRight: px }}>
        <div className="relative w-full overflow-hidden" style={{ paddingBottom: "45%", borderRadius: "12px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            style={{ filter: "contrast(1.05)" }}
            sizes="(max-width: 1024px) 100vw, 1120px"
          />
          <div className="absolute inset-x-0 bottom-0" style={{ height: "120px", background: "linear-gradient(to top, rgba(0,0,0,0.15), transparent)" }} />
        </div>
      </div>
    </section>
  );
}

function IndustryNarrativeSection({ body, includes }: { body: string; includes: string }) {
  const isDesktop = useResponsiveValue({ desktop: true, tablet: false, mobile: false });
  const gap = useResponsiveValue({ desktop: "64px", tablet: "32px", mobile: "24px" });

  return (
    <SectionWrapper background="white">
      <SectionHeader
        overline="Sector Overview"
        title="Sector Landscape."
        showAccentRule={false}
      />

      <div style={{ width: "48px", height: "2px", backgroundColor: "var(--a700)", marginTop: "32px", marginBottom: "32px" }} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isDesktop ? "7fr 5fr" : "1fr",
          gap,
        }}
      >
        <div>
          <p style={{ fontSize: "var(--text-body-lg)", lineHeight: "1.65", color: "var(--n700)", maxWidth: "65ch" }}>
            {body}
          </p>
        </div>
        <div>
          <div style={{ borderLeft: "3px solid var(--a700)", paddingLeft: "24px" }}>
            <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "var(--a700)", letterSpacing: "0.04em", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
              Includes
            </span>
            <p style={{ fontSize: "var(--text-caption)", lineHeight: "1.55", color: "var(--n600)", maxWidth: "40ch" }}>
              {includes}
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function ServicesSupportingSection({ services }: { services: ServiceItem[] }) {
  const gridCols = useResponsiveValue({ desktop: "repeat(2, 1fr)", tablet: "1fr", mobile: "1fr" });
  const gridGap = useResponsiveValue({ desktop: "32px", tablet: "24px", mobile: "20px" });
  const gridMarginTop = useResponsiveValue({ desktop: "48px", tablet: "40px", mobile: "32px" });

  return (
    <SectionWrapper background="neutral50">
      <SectionHeader
        overline="Advisory Architecture"
        title="Services Supporting This Industry."
        showAccentRule={false}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: gridCols,
          gap: gridGap,
          marginTop: gridMarginTop,
        }}
      >
        {services.map((svc, index) => (
          <ServiceCard
            key={svc.slug}
            slug={svc.slug}
            title={svc.title}
            focusAreas={svc.focusAreas}
            approach={svc.approach}
            index={index}
            ctaLabel="Explore Service"
            showCornerArrow
          />
        ))}
      </div>
    </SectionWrapper>
  );
}

function FutureApproachSection({ title, image }: { title: string; image: string }) {
  const paraSize = useResponsiveValue({ desktop: "1.1875rem", tablet: "1.0625rem", mobile: "1rem" });
  const imgPad = useResponsiveValue({ desktop: "42%", tablet: "48%", mobile: "56%" });
  const imgMargin = useResponsiveValue({ desktop: "48px", tablet: "40px", mobile: "32px" });

  return (
    <SectionWrapper background="white">
      <SectionHeader
        overline="Industry Foresight"
        title={`Our Approach to the Future of ${title}.`}
        showAccentRule={false}
      />

      <div style={{ width: "48px", height: "2px", backgroundColor: "var(--a700)", marginTop: "32px", marginBottom: "32px" }} />

      <p style={{ fontSize: paraSize, lineHeight: "1.65", color: "var(--n700)", maxWidth: "68ch" }}>
        The future of the {title.toLowerCase()} sector will be shaped by accelerating technological change, evolving
        regulatory environments, and rising expectations from stakeholders. Institutions operating in this space must
        navigate complex structural shifts while maintaining operational resilience and long-term strategic clarity.
        Success will increasingly depend on the ability to anticipate disruption rather than merely respond to it.
      </p>

      <div
        style={{
          marginTop: imgMargin,
          marginBottom: imgMargin,
          position: "relative",
          width: "100%",
          paddingBottom: imgPad,
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Image
          src={image}
          alt={`The future of ${title} - strategic transformation landscape`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 1120px"
        />
      </div>

      <p style={{ fontSize: paraSize, lineHeight: "1.65", color: "var(--n700)", maxWidth: "68ch" }}>
        Our advisory approach focuses on helping institutions anticipate disruption, redesign strategic operating
        models, and implement transformation initiatives that align long-term institutional capabilities with
        emerging market realities. We combine deep sector knowledge with rigorous analytical frameworks to develop
        perspectives that are both forward-looking and actionable - enabling leaders to make confident decisions in
        the face of uncertainty.
      </p>
    </SectionWrapper>
  );
}

function SectorAdvisoryCta({ title, image }: { title: string; image: string }) {
  const isDesktop = useResponsiveValue({ desktop: true, tablet: true, mobile: false });
  const px = useResponsiveValue({ desktop: "32px", tablet: "32px", mobile: "24px" });
  const padTop = useResponsiveValue({ desktop: "80px", tablet: "64px", mobile: "48px" });
  const padBottom = useResponsiveValue({ desktop: "80px", tablet: "64px", mobile: "48px" });
  const padLeft = useResponsiveValue({ desktop: "64px", tablet: "48px", mobile: "0" });
  const padRight = useResponsiveValue({ desktop: "32px", tablet: "24px", mobile: "0" });

  return (
    <section style={{ backgroundColor: "var(--a900)" }}>
      <div
        className="mx-auto max-w-[1280px]"
        style={{
          paddingLeft: isDesktop ? "0" : px,
          paddingRight: px,
          display: "grid",
          gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
          minHeight: isDesktop ? "480px" : "auto",
        }}
      >
        <div style={{ position: "relative", minHeight: isDesktop ? "100%" : "280px", overflow: "hidden" }}>
          <Image
            src={image}
            alt={`${title} advisory context`}
            fill
            className="object-cover"
            style={{ filter: "grayscale(30%) contrast(1.08)" }}
            sizes="(max-width: 1024px) 100vw, 720px"
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: isDesktop ? "120px" : "100%",
              height: isDesktop ? "100%" : "80px",
              background: isDesktop
                ? "linear-gradient(to right, transparent, var(--a900))"
                : "linear-gradient(to top, var(--a900), transparent)",
              ...(isDesktop ? {} : { top: "auto" }),
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingTop: padTop,
            paddingBottom: padBottom,
            paddingLeft: padLeft,
            paddingRight: padRight,
          }}
        >
          <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>
            Sector Advisory
          </span>
          <h2
            style={{
              fontSize: useResponsiveValue({ desktop: "2rem", tablet: "1.75rem", mobile: "1.5rem" }),
              fontWeight: 600,
              lineHeight: useResponsiveValue({ desktop: "1.12", tablet: "1.16", mobile: "1.2" }),
              letterSpacing: useResponsiveValue({ desktop: "-0.02em", tablet: "-0.015em", mobile: "-0.01em" }),
              color: "#FFFFFF",
              maxWidth: "480px",
            }}
          >
            How we support leaders in {title.toLowerCase()}.
          </h2>
          <p style={{ fontSize: "var(--text-body)", lineHeight: "var(--line-height-body)", color: "var(--a200)", marginTop: "16px", maxWidth: "440px" }}>
            Our industry team brings deep sector experience across strategy, operations, digital, risk, and
            organizational transformation. Every engagement is structured around your specific context and
            objectives.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: useResponsiveValue({ desktop: "row", tablet: "row", mobile: "column" }),
              gap: "16px",
              marginTop: "32px",
            }}
          >
            <CtaButton label="Schedule an Introduction" href="/contact" variant="primary" />
            <CtaButton label="Explore Related Services" href="/services" variant="secondary" />
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaButton({
  label,
  href,
  variant,
}: {
  label: string;
  href: string;
  variant: "primary" | "secondary";
}) {
  const [hovered, setHovered] = useState(false);
  const isPrimary = variant === "primary";

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: "var(--text-caption)",
        fontWeight: 600,
        letterSpacing: "0.02em",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "14px",
        paddingBottom: "14px",
        paddingLeft: "28px",
        paddingRight: "28px",
        borderRadius: "4px",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: isPrimary
          ? hovered
            ? "#FFFFFF"
            : "rgba(255,255,255,0.9)"
          : hovered
            ? "rgba(255,255,255,0.5)"
            : "rgba(255,255,255,0.25)",
        backgroundColor: isPrimary
          ? hovered
            ? "#FFFFFF"
            : "rgba(255,255,255,0.9)"
          : "transparent",
        color: isPrimary
          ? "var(--a900)"
          : hovered
            ? "#FFFFFF"
            : "rgba(255,255,255,0.8)",
        transition: "background-color 120ms cubic-bezier(0.25, 0.1, 0.25, 1), border-color 120ms cubic-bezier(0.25, 0.1, 0.25, 1), color 120ms cubic-bezier(0.25, 0.1, 0.25, 1)",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </Link>
  );
}

function OutcomeSignalsSection({ signals }: { signals: OutcomeSignal[] }) {
  const gridCols = useResponsiveValue({ desktop: "repeat(3, 1fr)", tablet: "repeat(3, 1fr)", mobile: "1fr" });
  const gridGap = useResponsiveValue({ desktop: "32px", tablet: "24px", mobile: "20px" });
  const marginTop = useResponsiveValue({ desktop: "48px", tablet: "40px", mobile: "32px" });

  return (
    <SectionWrapper background="white">
      <SectionHeader
        overline="Outcome Signals"
        title="Measurable Impact."
        description="Outcome metrics are calibrated to each engagement. The following represent typical measurement dimensions across our industry advisory work."
        showAccentRule={false}
        maxWidth="60ch"
      />
      <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: gridGap, marginTop }}>
        {signals.map((signal, index) => (
          <div key={`${signal.label}-${index}`} style={{ borderTop: "2px solid var(--a700)", paddingTop: "24px" }}>
            <span style={{ fontSize: "2rem", fontWeight: 600, lineHeight: "1", color: signal.value === "-" ? "var(--n300)" : "var(--a700)", display: "block", marginBottom: "12px" }}>
              {signal.value}
            </span>
            <h3 style={{ fontSize: "var(--text-body)", fontWeight: 600, lineHeight: "var(--line-height-body)", color: "var(--n900)" }}>
              {signal.label}
            </h3>
            <p style={{ fontSize: "var(--text-caption)", lineHeight: "1.55", color: "var(--n500)", marginTop: "8px" }}>
              {signal.note}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

function IndustryRelatedInsights({ insights }: { insights: IndustryRelatedInsight[] }) {
  const gridCols = useResponsiveValue({ desktop: "repeat(3, 1fr)", tablet: "repeat(2, 1fr)", mobile: "1fr" });
  const gridGap = useResponsiveValue({ desktop: "24px", tablet: "20px", mobile: "16px" });
  const marginTop = useResponsiveValue({ desktop: "40px", tablet: "32px", mobile: "24px" });

  return (
    <SectionWrapper background="neutral50">
      <SectionHeader
        overline="Related Perspectives"
        title="Industry Insights."
        description="Research and analysis relevant to this sector, drawn from our institutional knowledge base."
        showAccentRule={false}
        maxWidth="56ch"
      />
      <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: gridGap, marginTop }}>
        {insights.map((insight, index) => (
          <InsightMiniCard
            key={insight.slug}
            insight={insight}
            image={INSIGHT_IMAGES[index % INSIGHT_IMAGES.length]}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}

function InsightMiniCard({
  insight,
  image,
}: {
  insight: IndustryRelatedInsight;
  image: string;
}) {
  const [hovered, setHovered] = useState(false);
  const readTime =
    typeof insight.readingTime === "number"
      ? `${insight.readingTime} min read`
      : insight.readingTime ?? "";

  return (
    <Link
      href={`/insights/${insight.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="block overflow-hidden rounded-xl border bg-white"
      style={{
        borderColor: hovered ? "var(--n300)" : "var(--n200)",
        transition: "border-color 120ms cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 120ms cubic-bezier(0.25, 0.1, 0.25, 1)",
        boxShadow: hovered ? "0 1px 4px rgba(0,0,0,0.06)" : "none",
        textDecoration: "none",
      }}
    >
      <div className="relative w-full pt-[50%]">
        <Image src={image} alt={insight.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 420px" />
      </div>
      <div className="px-4 py-4">
        <div className="mb-2 flex items-center justify-between text-[0.625rem] uppercase tracking-[0.06em] text-[#1B3A5C]">
          <span className="font-semibold">{insight.category}</span>
          {readTime ? <span className="text-[#94A3B8]">{readTime}</span> : null}
        </div>
        <h4
          className="text-sm font-medium leading-[1.4] line-clamp-3"
          style={{ color: hovered ? "var(--a700)" : "var(--n900)", transition: "color 120ms cubic-bezier(0.25, 0.1, 0.25, 1)" }}
        >
          {insight.title}
        </h4>
      </div>
    </Link>
  );
}

function IndustryRelatedCaseStudies({ caseStudies }: { caseStudies: typeof CASE_STUDIES }) {
  const gridCols = useResponsiveValue({ desktop: "repeat(2, 1fr)", tablet: "1fr", mobile: "1fr" });
  const gridGap = useResponsiveValue({ desktop: "32px", tablet: "24px", mobile: "20px" });
  const marginTop = useResponsiveValue({ desktop: "40px", tablet: "32px", mobile: "24px" });

  return (
    <SectionWrapper background="white">
      <SectionHeader
        overline="Client Impact"
        title="Related Engagements."
        showAccentRule={false}
      />
      <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: gridGap, marginTop }}>
        {caseStudies.map((cs) => (
          <CaseStudyCard
            key={cs.slug}
            cs={{
              slug: cs.slug,
              title: cs.title,
              image: cs.image,
              summary: cs.summary,
              metrics: cs.metrics,
            }}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}

function IndustryKnowledgeNav({
  services,
  insights,
  caseStudies,
}: {
  services: ServiceItem[];
  insights: IndustryRelatedInsight[];
  caseStudies: typeof CASE_STUDIES;
}) {
  const serviceLinks: KnowledgeLink[] = services.map((svc) => ({
    label: svc.title,
    href: `/services/${svc.slug}`,
  }));
  const insightLinks: KnowledgeLink[] = insights.map((ins) => ({
    label: ins.title,
    href: `/insights/${ins.slug}`,
    category: ins.category,
  }));
  const caseStudyLinks: KnowledgeLink[] = caseStudies.map((cs) => ({
    label: cs.title,
    href: `/case-studies/${cs.slug}`,
  }));

  return (
    <ExploreRelatedKnowledge
      services={serviceLinks}
      insights={insightLinks}
      caseStudies={caseStudyLinks}
    />
  );
}

function IndustryPreFooterCta() {
  return (
    <CTABlock
      heading="Discuss your sector-specific advisory needs."
      body="Every engagement begins with a structured conversation. No obligations - an exchange of context to determine whether there is a basis for collaboration."
      primary={{ label: "Speak with our industry team", href: "/contact" }}
      secondary={{ label: "View full coverage matrix", href: "/coverage" }}
      variant="dark"
      align="left"
    />
  );
}

function buildServiceItems(relatedServices: IndustryRelatedService[]) {
  if (!relatedServices || relatedServices.length === 0) {
    return SERVICES.slice(0, 4);
  }

  const serviceMap = new Map(SERVICES.map((svc) => [svc.slug, svc]));
  const items = relatedServices.map((svc) => {
    const match = serviceMap.get(svc.slug);
    return match
      ? match
      : {
          slug: svc.slug,
          title: svc.title,
          focusAreas: svc.description,
          approach: svc.description,
        };
  });

  return items.length > 0 ? items : SERVICES.slice(0, 4);
}

type OutcomeSignal = {
  value: string;
  label: string;
  note: string;
};

const DEFAULT_OUTCOME_SIGNALS: OutcomeSignal[] = [
  {
    value: "-",
    label: "Revenue / Growth Impact",
    note: "Engagement-specific metrics available upon request",
  },
  {
    value: "-",
    label: "Operational Efficiency",
    note: "Measured across delivery timelines and cost baselines",
  },
  {
    value: "-",
    label: "Risk Reduction",
    note: "Compliance, governance, and control environment improvements",
  },
];

const OUTCOME_SIGNALS: Record<string, OutcomeSignal[]> = {
  "financial-services": [
    {
      value: "30-50%",
      label: "Compliance Cost Reduction",
      note: "Through regulatory framework modernization and automation of control environments",
    },
    {
      value: "2-4x",
      label: "Digital Channel Adoption",
      note: "Accelerated customer migration to digital platforms via UX-led transformation",
    },
    {
      value: "15-25%",
      label: "Operational Cost Efficiency",
      note: "Process optimization across middle and back office operations",
    },
  ],
  "healthcare-life-sciences": [
    {
      value: "20-35%",
      label: "Clinical Workflow Efficiency",
      note: "Through digital enablement and care pathway redesign",
    },
    {
      value: "10-20%",
      label: "Cost-to-Serve Reduction",
      note: "Operational excellence programs across administrative and clinical functions",
    },
    {
      value: "40%+",
      label: "Digital Engagement Uplift",
      note: "Patient and member digital adoption through platform transformation",
    },
  ],
  "energy-resources": [
    {
      value: "15-30%",
      label: "Asset Performance Improvement",
      note: "Analytics-enabled maintenance and reliability-centered optimization",
    },
    {
      value: "20-40%",
      label: "Capital Delivery Efficiency",
      note: "Project governance and procurement assurance across major programs",
    },
    {
      value: "25%+",
      label: "Safety Incident Reduction",
      note: "Systematic safety culture transformation and process redesign",
    },
  ],
  "industrials-manufacturing": [
    {
      value: "10-25%",
      label: "Throughput Improvement",
      note: "Lean transformation and plant network optimization programs",
    },
    {
      value: "15-30%",
      label: "Procurement Savings",
      note: "Strategic sourcing, supplier consolidation, and demand-supply alignment",
    },
    {
      value: "20-35%",
      label: "Quality Cost Reduction",
      note: "Root cause analysis and quality management system modernization",
    },
  ],
  "consumer-retail": [
    {
      value: "5-12%",
      label: "Revenue Growth Acceleration",
      note: "Pricing optimization, promotion effectiveness, and channel mix strategy",
    },
    {
      value: "15-25%",
      label: "Supply Chain Cost Reduction",
      note: "Demand forecasting, inventory optimization, and logistics redesign",
    },
    {
      value: "2-3x",
      label: "Digital Conversion Uplift",
      note: "Omnichannel experience redesign and personalization programs",
    },
  ],
  "technology-digital": [
    {
      value: "20-40%",
      label: "Time-to-Market Acceleration",
      note: "Product development process redesign and platform modernization",
    },
    {
      value: "15-30%",
      label: "Unit Economics Improvement",
      note: "Operating model optimization and cloud infrastructure rationalization",
    },
    {
      value: "25%+",
      label: "Customer Retention Uplift",
      note: "Customer lifecycle optimization and engagement architecture redesign",
    },
  ],
  "transport-logistics": [
    {
      value: "10-20%",
      label: "Network Utilization Improvement",
      note: "Capacity planning, route optimization, and asset deployment strategy",
    },
    {
      value: "15-30%",
      label: "Operational Cost Reduction",
      note: "Warehouse efficiency, fulfillment redesign, and automation programs",
    },
    {
      value: "20%+",
      label: "Service Reliability Enhancement",
      note: "Disruption management and real-time visibility infrastructure",
    },
  ],
  "public-sector-government": [
    {
      value: "30-50%",
      label: "Service Delivery Improvement",
      note: "Citizen experience redesign and digital service channel modernization",
    },
    {
      value: "20-35%",
      label: "Administrative Cost Reduction",
      note: "Process optimization, shared services, and governance modernization",
    },
    {
      value: "40%+",
      label: "Digital Citizen Engagement",
      note: "GovTech maturity improvement and digital-first service architecture",
    },
  ],
  "real-estate-infrastructure": [
    {
      value: "10-25%",
      label: "Portfolio Return Improvement",
      note: "Asset management optimization and portfolio rationalization strategy",
    },
    {
      value: "15-30%",
      label: "Project Delivery Efficiency",
      note: "Governance, procurement assurance, and delivery risk management",
    },
    {
      value: "20%+",
      label: "Sustainability Performance",
      note: "ESG integration, energy efficiency programs, and green certification",
    },
  ],
  "private-capital": [
    {
      value: "2-5x",
      label: "Value Creation Multiple",
      note: "Full-potential plans combining growth strategy with operational improvement",
    },
    {
      value: "30-50%",
      label: "Integration Timeline Reduction",
      note: "Post-merger integration acceleration through structured methodology",
    },
    {
      value: "15-25%",
      label: "EBITDA Margin Expansion",
      note: "Cost optimization, pricing strategy, and operating model redesign across portfolio",
    },
  ],
  education: [
    {
      value: "20-35%",
      label: "Operational Efficiency Gain",
      note: "Administrative process optimization and digital enablement programs",
    },
    {
      value: "15-30%",
      label: "Outcome Measurement Improvement",
      note: "Performance management frameworks and impact evaluation methodology",
    },
    {
      value: "25%+",
      label: "Funding Effectiveness",
      note: "Grant management optimization, donor strategy, and resource allocation",
    },
  ],
};
