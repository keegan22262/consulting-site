"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";

type Tier = "core" | "active" | "supporting";

interface ServiceDef {
  slug: string;
  title: string;
  shortTitle: string;
  focusAreas: string;
  approach: string;
}

interface IndustryDef {
  id: string;
  title: string;
  shortTitle: string;
  body: string;
}

const SERVICES: ServiceDef[] = [
  {
    slug: "strategy",
    title: "Strategy & Corporate Transformation",
    shortTitle: "Strategy",
    focusAreas: "Corporate strategy, M&A advisory, organizational transformation, and growth strategy.",
    approach:
      "We guide businesses in navigating complex challenges, offering strategic development and ongoing support for seamless execution and measurable results.",
  },
  {
    slug: "digital",
    title: "Digital & AI Transformation",
    shortTitle: "Digital & AI",
    focusAreas: "Digital strategy, AI implementation, automation, cloud migration, and cybersecurity.",
    approach:
      "We integrate advanced technology solutions to optimize operations, ensuring businesses stay ahead of the digital curve.",
  },
  {
    slug: "finance",
    title: "Financial Advisory, Audit & Risk Management",
    shortTitle: "Finance & Risk",
    focusAreas: "Regulatory compliance, risk assessment, financial restructuring, and forensic accounting.",
    approach: "We provide expert advice on navigating complex financial landscapes, ensuring sustainability and growth.",
  },
  {
    slug: "people",
    title: "People & Organization Consulting",
    shortTitle: "People & Org",
    focusAreas: "Talent management, leadership development, organizational design, and change management.",
    approach:
      "We foster organizational growth by optimizing talent and leadership, ensuring businesses are agile and adaptive to change.",
  },
  {
    slug: "esg",
    title: "Sustainability & ESG Consulting",
    shortTitle: "ESG",
    focusAreas: "Sustainable business practices, ESG reporting, climate risk assessment, and circular economy strategies.",
    approach:
      "We help businesses embed sustainability into their core operations, meeting regulatory standards and driving environmental impact.",
  },
  {
    slug: "public",
    title: "Public Sector & Government Advisory",
    shortTitle: "Public Sector",
    focusAreas: "Policy analysis, public sector reform, digital government transformation, and public-private partnerships.",
    approach:
      "We assist governments and institutions in modernizing operations, improving governance, and fostering strategic partnerships.",
  },
  {
    slug: "comms",
    title: "Digital Communication & Social Media Consulting",
    shortTitle: "Comms",
    focusAreas: "Social media strategy, digital brand management, content marketing, and influencer marketing.",
    approach:
      "We craft tailored digital strategies that enhance engagement, boost brand visibility, and drive growth.",
  },
  {
    slug: "tax",
    title: "Tax Advisory & Asset Management",
    shortTitle: "Tax & Asset",
    focusAreas: "Tax compliance, international tax planning, wealth management, estate planning, and investment strategies.",
    approach:
      "We offer insightful and strategic tax planning solutions to optimize wealth management and ensure financial stability.",
  },
  {
    slug: "legal",
    title: "Legal & Regulatory Compliance Consulting",
    shortTitle: "Legal",
    focusAreas:
      "Corporate governance, local regulatory compliance, international trade law, intellectual property, and labor law advisory.",
    approach: "We provide legal and regulatory expertise to ensure compliance and mitigate risk.",
  },
  {
    slug: "sme",
    title: "SME Development & Growth Consulting",
    shortTitle: "SME Growth",
    focusAreas:
      "Business incubation, financing for SMEs, market entry strategies, operational efficiency, and export facilitation.",
    approach: "We help SMEs scale and expand through strategic planning, funding facilitation, and operational optimization.",
  },
];

const INDUSTRIES: IndustryDef[] = [
  {
    id: "financial-services",
    title: "Financial Services",
    shortTitle: "Finance",
    body:
      "We support banks, capital markets players, insurers, asset/wealth managers, and fintechs as they modernize platforms, strengthen risk and compliance, and build better digital customer experiences.",
  },
  {
    id: "healthcare-life-sciences",
    title: "Healthcare & Life Sciences",
    shortTitle: "Healthcare",
    body:
      "We help healthcare providers and payers improve outcomes, access, and affordability through operational excellence and digital enablement.",
  },
  {
    id: "energy-resources",
    title: "Energy & Natural Resources",
    shortTitle: "Energy",
    body:
      "We partner with energy and resources organizations to improve safety, reliability, and asset performance while navigating the transition to lower-carbon systems.",
  },
  {
    id: "industrials-manufacturing",
    title: "Industrials & Manufacturing",
    shortTitle: "Industrials",
    body:
      "We help industrial companies raise productivity, improve quality, and strengthen supply networks across increasingly complex operations.",
  },
  {
    id: "consumer-retail",
    title: "Consumer & Retail",
    shortTitle: "Consumer",
    body:
      "We support consumer-facing companies in winning market share through sharper brand strategy, revenue growth management, and omnichannel execution.",
  },
  {
    id: "technology-digital",
    title: "Technology, Media & Telecommunications",
    shortTitle: "TMT",
    body:
      "We help technology, media, and telecom companies scale growth, modernize operating models, and improve unit economics in fast-moving markets.",
  },
  {
    id: "transport-logistics",
    title: "Transportation & Logistics",
    shortTitle: "Transport",
    body:
      "We support airlines, shippers, logistics providers, and travel/hospitality businesses in optimizing networks, improving service reliability, and enhancing customer experience.",
  },
  {
    id: "public-sector-government",
    title: "Public Sector & Government",
    shortTitle: "Govt",
    body:
      "We work with governments, agencies, and defense organizations to improve service delivery, strengthen governance, and modernize legacy systems securely.",
  },
  {
    id: "real-estate-infrastructure",
    title: "Real Estate & Infrastructure",
    shortTitle: "Real Estate",
    body:
      "We help owners, investors, and operators improve the performance of real assets across the lifecycle — from planning and development to operations and portfolio strategy.",
  },
  {
    id: "private-capital",
    title: "Private Capital",
    shortTitle: "Priv. Capital",
    body:
      "We support investors across the deal lifecycle — from commercial due diligence through post-merger integration, value creation, and exit readiness.",
  },
  {
    id: "education",
    title: "Education & Social Impact",
    shortTitle: "Education",
    body:
      "We help education institutions and social-impact organizations sharpen strategy, improve operating models, and measure outcomes more effectively.",
  },
];

const COVERAGE: Record<string, Record<string, Tier>> = {
  strategy: {
    "financial-services": "core",
    "healthcare-life-sciences": "core",
    "energy-resources": "core",
    "industrials-manufacturing": "core",
    "consumer-retail": "core",
    "technology-digital": "core",
    "transport-logistics": "core",
    "public-sector-government": "active",
    "real-estate-infrastructure": "core",
    "private-capital": "core",
    education: "core",
  },
  digital: {
    "financial-services": "active",
    "healthcare-life-sciences": "active",
    "energy-resources": "supporting",
    "industrials-manufacturing": "active",
    "consumer-retail": "active",
    "technology-digital": "core",
    "transport-logistics": "active",
    "public-sector-government": "supporting",
    "real-estate-infrastructure": "supporting",
    "private-capital": "active",
    education: "active",
  },
  finance: {
    "financial-services": "core",
    "healthcare-life-sciences": "supporting",
    "energy-resources": "active",
    "industrials-manufacturing": "active",
    "consumer-retail": "active",
    "technology-digital": "supporting",
    "transport-logistics": "active",
    "public-sector-government": "active",
    "real-estate-infrastructure": "active",
    "private-capital": "core",
    education: "supporting",
  },
  people: {
    "financial-services": "supporting",
    "healthcare-life-sciences": "active",
    "energy-resources": "supporting",
    "industrials-manufacturing": "active",
    "consumer-retail": "supporting",
    "technology-digital": "active",
    "transport-logistics": "active",
    "public-sector-government": "active",
    "real-estate-infrastructure": "supporting",
    "private-capital": "active",
    education: "active",
  },
  esg: {
    "financial-services": "supporting",
    "healthcare-life-sciences": "supporting",
    "energy-resources": "core",
    "industrials-manufacturing": "supporting",
    "consumer-retail": "supporting",
    "technology-digital": "supporting",
    "transport-logistics": "active",
    "public-sector-government": "active",
    "real-estate-infrastructure": "active",
    "private-capital": "supporting",
    education: "active",
  },
  public: {
    "financial-services": "supporting",
    "healthcare-life-sciences": "active",
    "energy-resources": "active",
    "industrials-manufacturing": "supporting",
    "consumer-retail": "supporting",
    "technology-digital": "supporting",
    "transport-logistics": "supporting",
    "public-sector-government": "core",
    "real-estate-infrastructure": "supporting",
    "private-capital": "supporting",
    education: "core",
  },
  comms: {
    "financial-services": "supporting",
    "healthcare-life-sciences": "supporting",
    "energy-resources": "supporting",
    "industrials-manufacturing": "supporting",
    "consumer-retail": "active",
    "technology-digital": "active",
    "transport-logistics": "supporting",
    "public-sector-government": "supporting",
    "real-estate-infrastructure": "supporting",
    "private-capital": "supporting",
    education: "supporting",
  },
  tax: {
    "financial-services": "active",
    "healthcare-life-sciences": "supporting",
    "energy-resources": "supporting",
    "industrials-manufacturing": "supporting",
    "consumer-retail": "active",
    "technology-digital": "supporting",
    "transport-logistics": "supporting",
    "public-sector-government": "supporting",
    "real-estate-infrastructure": "active",
    "private-capital": "active",
    education: "supporting",
  },
  legal: {
    "financial-services": "active",
    "healthcare-life-sciences": "active",
    "energy-resources": "active",
    "industrials-manufacturing": "supporting",
    "consumer-retail": "supporting",
    "technology-digital": "supporting",
    "transport-logistics": "supporting",
    "public-sector-government": "supporting",
    "real-estate-infrastructure": "active",
    "private-capital": "supporting",
    education: "supporting",
  },
  sme: {
    "financial-services": "supporting",
    "healthcare-life-sciences": "supporting",
    "energy-resources": "supporting",
    "industrials-manufacturing": "active",
    "consumer-retail": "active",
    "technology-digital": "active",
    "transport-logistics": "supporting",
    "public-sector-government": "supporting",
    "real-estate-infrastructure": "supporting",
    "private-capital": "supporting",
    education: "supporting",
  },
};

function getCellDescription(service: ServiceDef, industry: IndustryDef, tier: Tier) {
  if (tier === "core") {
    return `${service.shortTitle} is a core advisory discipline for ${industry.shortTitle} engagements, representing primary delivery focus.`;
  }
  if (tier === "active") {
    return `${service.shortTitle} provides active coverage across ${industry.shortTitle} sector engagements as an integrated advisory component.`;
  }
  return `${service.shortTitle} offers supporting expertise to ${industry.shortTitle} sector clients through cross-functional advisory integration.`;
}

const TIER_STYLES: Record<Tier, { bg: string; color: string; border: string; label: string }> = {
  core: { bg: "var(--a700)", color: "#FFFFFF", border: "var(--a700)", label: "Core" },
  active: {
    bg: "rgba(27, 58, 92, 0.12)",
    color: "var(--a700)",
    border: "rgba(27, 58, 92, 0.25)",
    label: "Active",
  },
  supporting: { bg: "transparent", color: "var(--n400)", border: "var(--n200)", label: "Supporting" },
};

export default function CoverageMatrixSection() {
  const isMobile = useResponsiveValue({ desktop: false, tablet: false, mobile: true });
  const isDesktop = useResponsiveValue({ desktop: true, tablet: false, mobile: false });
  const [filterService, setFilterService] = useState("all");
  const [filterIndustry, setFilterIndustry] = useState("all");
  const [filterTier, setFilterTier] = useState("all");

  const hasFilters = filterService !== "all" || filterIndustry !== "all" || filterTier !== "all";

  const filteredServices = useMemo(
    () => (filterService === "all" ? SERVICES : SERVICES.filter((s) => s.slug === filterService)),
    [filterService]
  );
  const filteredIndustries = useMemo(
    () => (filterIndustry === "all" ? INDUSTRIES : INDUSTRIES.filter((i) => i.id === filterIndustry)),
    [filterIndustry]
  );

  const resetFilters = useCallback(() => {
    setFilterService("all");
    setFilterIndustry("all");
    setFilterTier("all");
  }, []);

  return (
    <SectionWrapper background="white" id="coverage-matrix">
      <SectionHeader
        overline="Crosswalk Matrix"
        title="Service × Industry Coverage."
        description="Three-tier encoding: Core Focus represents primary advisory alignment, Active Coverage indicates integrated delivery, Supporting Exposure reflects cross-functional advisory reach."
        showAccentRule={false}
        maxWidth="62ch"
      />

      <div
        style={{
          marginTop: "40px",
          marginBottom: "32px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "stretch" : "center",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <FilterDropdown
          label="Service"
          value={filterService}
          onChange={setFilterService}
          options={[{ value: "all", label: "All Services" }, ...SERVICES.map((s) => ({ value: s.slug, label: s.shortTitle }))]}
        />
        <FilterDropdown
          label="Industry"
          value={filterIndustry}
          onChange={setFilterIndustry}
          options={[{ value: "all", label: "All Industries" }, ...INDUSTRIES.map((i) => ({ value: i.id, label: i.shortTitle }))]}
        />
        <FilterDropdown
          label="Tier"
          value={filterTier}
          onChange={setFilterTier}
          options={[
            { value: "all", label: "All Tiers" },
            { value: "core", label: "Core Focus" },
            { value: "active", label: "Active Coverage" },
            { value: "supporting", label: "Supporting Exposure" },
          ]}
        />
        {hasFilters ? (
          <button
            onClick={resetFilters}
            style={{
              fontSize: "var(--text-caption)",
              fontWeight: 600,
              color: "var(--a700)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px 0",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            Reset filters
          </button>
        ) : null}
      </div>

      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", marginBottom: "24px" }}>
        <LegendItem tier="core" label="Core Focus" />
        <LegendItem tier="active" label="Active Coverage" />
        <LegendItem tier="supporting" label="Supporting Exposure" />
      </div>

      {isMobile ? (
        <MobileAccordion services={filteredServices} industries={filteredIndustries} filterTier={filterTier} />
      ) : (
        <DesktopMatrix
          services={filteredServices}
          industries={filteredIndustries}
          filterTier={filterTier}
          isDesktop={isDesktop}
        />
      )}
    </SectionWrapper>
  );
}

function FilterDropdown({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <span
        style={{
          fontSize: "0.6875rem",
          fontWeight: 600,
          color: "var(--n400)",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        style={{
          fontSize: "var(--text-caption)",
          color: "var(--n800)",
          backgroundColor: "var(--n50)",
          border: "1px solid var(--n200)",
          borderRadius: "12px",
          padding: "8px 32px 8px 12px",
          appearance: "none",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23737373' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 10px center",
          cursor: "pointer",
          outline: "none",
          minWidth: "140px",
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function LegendItem({ tier, label }: { tier: Tier; label: string }) {
  const s = TIER_STYLES[tier];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div style={{ width: "14px", height: "14px", borderRadius: "2px", backgroundColor: s.bg, border: `1px solid ${s.border}` }} />
      <span style={{ fontSize: "var(--text-caption)", color: "var(--n600)" }}>{label}</span>
    </div>
  );
}

function DesktopMatrix({
  services,
  industries,
  filterTier,
  isDesktop,
}: {
  services: ServiceDef[];
  industries: IndustryDef[];
  filterTier: string;
  isDesktop: boolean;
}) {
  const stickyWidth = isDesktop ? "200px" : "160px";

  return (
    <div
      style={{
        border: "1px solid var(--n200)",
        borderRadius: "12px",
        overflow: "auto",
        position: "relative",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: `${industries.length * 100 + 200}px` }}>
        <thead>
          <tr>
            <th
              style={{
                position: "sticky",
                left: 0,
                top: 0,
                zIndex: 3,
                backgroundColor: "var(--n50)",
                width: stickyWidth,
                minWidth: stickyWidth,
                borderBottom: "1px solid var(--n200)",
                borderRight: "1px solid var(--n200)",
                padding: "16px 12px",
                fontSize: "0.6875rem",
                fontWeight: 600,
                color: "var(--n400)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                textAlign: "left",
                verticalAlign: "bottom",
              }}
            >
              Service ↓ / Industry →
            </th>
            {industries.map((industry) => (
              <IndustryColumnHeader key={industry.id} industry={industry} />
            ))}
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={service.slug} style={{ backgroundColor: index % 2 === 0 ? "#FFFFFF" : "var(--n50)" }}>
              <ServiceRowHeader service={service} bgColor={index % 2 === 0 ? "#FFFFFF" : "var(--n50)"} />
              {industries.map((industry) => {
                const tier = COVERAGE[service.slug]?.[industry.id];
                const dimmed = filterTier !== "all" && tier !== filterTier;
                return (
                  <MatrixCell
                    key={`${service.slug}-${industry.id}`}
                    service={service}
                    industry={industry}
                    tier={tier}
                    dimmed={dimmed}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function IndustryColumnHeader({ industry }: { industry: IndustryDef }) {
  const [hovered, setHovered] = useState(false);
  return (
    <th
      style={{
        position: "sticky",
        top: 0,
        zIndex: 2,
        backgroundColor: "var(--n50)",
        borderBottom: "1px solid var(--n200)",
        padding: "12px 8px",
        minWidth: "90px",
        textAlign: "center",
        verticalAlign: "bottom",
      }}
    >
      <Link
        href={`/industries/${industry.id}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          fontSize: "0.6875rem",
          fontWeight: 600,
          color: hovered ? "var(--a700)" : "var(--n700)",
          textDecoration: "none",
          borderBottom: hovered ? "1px solid var(--a200)" : "1px solid transparent",
          transition: "color 180ms ease, border-color 180ms ease",
          lineHeight: "1.35",
        }}
      >
        {industry.shortTitle}
      </Link>
    </th>
  );
}

function ServiceRowHeader({ service, bgColor }: { service: ServiceDef; bgColor: string }) {
  const [hovered, setHovered] = useState(false);
  const isDesktop = useResponsiveValue({ desktop: true, tablet: false, mobile: false });
  const stickyWidth = isDesktop ? "200px" : "160px";

  return (
    <td
      style={{
        position: "sticky",
        left: 0,
        zIndex: 1,
        backgroundColor: bgColor,
        borderRight: "1px solid var(--n200)",
        padding: "12px",
        width: stickyWidth,
        minWidth: stickyWidth,
      }}
    >
      <Link
        href={`/services/${service.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          fontSize: "var(--text-caption)",
          fontWeight: 600,
          color: hovered ? "var(--a700)" : "var(--n900)",
          textDecoration: "none",
          borderBottom: hovered ? "1px solid var(--a200)" : "1px solid transparent",
          transition: "color 180ms ease, border-color 180ms ease",
        }}
      >
        {service.shortTitle}
      </Link>
    </td>
  );
}

function MatrixCell({
  service,
  industry,
  tier,
  dimmed,
}: {
  service: ServiceDef;
  industry: IndustryDef;
  tier?: Tier;
  dimmed: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const cellRef = useRef<HTMLTableCellElement>(null);

  const showTooltip = useCallback(() => {
    setHovered(true);
    if (cellRef.current) {
      const rect = cellRef.current.getBoundingClientRect();
      setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top });
    }
  }, []);

  const hideTooltip = useCallback(() => {
    setHovered(false);
    setTooltipPos(null);
  }, []);

  if (!tier) {
    return (
      <td style={{ padding: "8px", textAlign: "center", borderBottom: "1px solid var(--n100)" }}>
        <span style={{ fontSize: "0.6875rem", color: "var(--n200)" }}>—</span>
      </td>
    );
  }

  const s = TIER_STYLES[tier];
  const opacity = dimmed ? 0.2 : 1;

  return (
    <td
      ref={cellRef}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      style={{ padding: "6px", textAlign: "center", borderBottom: "1px solid var(--n100)", cursor: "default" }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: s.bg,
          color: s.color,
          border: `1px solid ${hovered ? "var(--a700)" : s.border}`,
          borderRadius: "3px",
          padding: "4px 8px",
          minWidth: "52px",
          fontSize: "0.625rem",
          fontWeight: 600,
          letterSpacing: "0.02em",
          opacity,
          transition: "border-color 180ms ease, opacity 180ms ease",
        }}
      >
        {s.label}
      </div>

      {hovered && tooltipPos && !dimmed ? (
        <CellTooltip service={service} industry={industry} tier={tier} pos={tooltipPos} />
      ) : null}
    </td>
  );
}

function CellTooltip({
  service,
  industry,
  tier,
  pos,
}: {
  service: ServiceDef;
  industry: IndustryDef;
  tier: Tier;
  pos: { x: number; y: number };
}) {
  const desc = getCellDescription(service, industry, tier);
  const s = TIER_STYLES[tier];

  return (
    <div
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y - 8,
        zIndex: 1000,
        pointerEvents: "none",
        transform: "translate(-50%, -100%)",
      }}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid var(--n200)",
          borderRadius: "12px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          padding: "16px",
          maxWidth: "280px",
          minWidth: "220px",
        }}
      >
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "2px", backgroundColor: s.bg, border: `1px solid ${s.border}` }} />
          <span
            style={{
              fontSize: "0.625rem",
              fontWeight: 600,
              color: "var(--n400)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            {s.label}
          </span>
        </div>

        <p style={{ fontSize: "var(--text-caption)", fontWeight: 600, color: "var(--n900)", marginBottom: "2px" }}>
          {service.title}
        </p>
        <p style={{ fontSize: "var(--text-caption)", fontWeight: 400, color: "var(--a700)", marginBottom: "8px" }}>
          {industry.title}
        </p>
        <p style={{ fontSize: "0.6875rem", lineHeight: "1.5", color: "var(--n600)" }}>{desc}</p>

        <div
          style={{
            marginTop: "10px",
            paddingTop: "8px",
            borderTop: "1px solid var(--n100)",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <span style={{ fontSize: "0.625rem", fontWeight: 600, color: "var(--a700)" }}>View related service →</span>
          <span style={{ fontSize: "0.625rem", fontWeight: 600, color: "var(--a700)" }}>View industry detail →</span>
        </div>
      </div>
    </div>
  );
}

function MobileAccordion({
  services,
  industries,
  filterTier,
}: {
  services: ServiceDef[];
  industries: IndustryDef[];
  filterTier: string;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
      {services.map((service) => {
        const isOpen = expanded === service.slug;
        return (
          <div key={service.slug}>
            <button
              onClick={() => setExpanded(isOpen ? null : service.slug)}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 20px",
                backgroundColor: isOpen ? "var(--n50)" : "#FFFFFF",
                border: "1px solid var(--n200)",
                borderRadius: "12px",
                cursor: "pointer",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <span style={{ fontSize: "var(--text-caption)", fontWeight: 600, color: "var(--n900)" }}>
                  {service.shortTitle}
                </span>
                <span style={{ fontSize: "0.6875rem", color: "var(--n400)", display: "block", marginTop: "2px" }}>
                  {service.title}
                </span>
              </div>
              <span style={{ fontSize: "var(--text-body)", color: "var(--n400)" }}>{isOpen ? "−" : "+"}</span>
            </button>

            {isOpen ? (
              <div
                style={{
                  border: "1px solid var(--n200)",
                  borderTop: "none",
                  borderRadius: "0 0 12px 12px",
                  padding: "16px 20px",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {industries.map((industry) => {
                    const tier = COVERAGE[service.slug]?.[industry.id];
                    if (!tier) return null;
                    if (filterTier !== "all" && tier !== filterTier) return null;
                    const s = TIER_STYLES[tier];
                    return (
                      <div
                        key={industry.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          paddingBottom: "12px",
                          borderBottom: "1px solid var(--n100)",
                        }}
                      >
                        <Link
                          href={`/industries/${industry.id}`}
                          style={{ fontSize: "var(--text-caption)", color: "var(--n700)", textDecoration: "none" }}
                        >
                          {industry.shortTitle}
                        </Link>
                        <span
                          style={{
                            fontSize: "0.625rem",
                            fontWeight: 600,
                            color: s.color,
                            backgroundColor: s.bg,
                            border: `1px solid ${s.border}`,
                            borderRadius: "3px",
                            padding: "3px 8px",
                            letterSpacing: "0.02em",
                          }}
                        >
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <Link
                  href={`/services/${service.slug}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    color: "var(--a700)",
                    textDecoration: "none",
                    marginTop: "12px",
                  }}
                >
                  View service detail <span style={{ color: "var(--o500)" }}>→</span>
                </Link>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
