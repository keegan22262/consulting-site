"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

// ─── Service data ────────────────────────────────────────────────────────────

const SERVICES = [
  { title: "Strategy & Corporate Transformation", description: "Corporate strategy, M&A advisory, and organizational transformation.", href: "/services/strategy", image: "/images/capabilities/strategy.jpg" },
  { title: "Digital & AI Transformation", description: "Digital strategy, AI implementation, automation, and cloud migration.", href: "/services/digital", image: "/images/capabilities/digital-ai.jpg" },
  { title: "Financial Advisory, Audit & Risk", description: "Regulatory compliance, risk assessment, and financial restructuring.", href: "/services/financial", image: "/images/capabilities/financial.jpg" },
  { title: "People & Organization", description: "Talent management, leadership development, and organizational design.", href: "/services/people", image: "/images/industries/sectors/healthcare-life-sciences.jpg" },
  { title: "Sustainability & ESG", description: "ESG reporting, climate risk assessment, and sustainable practices.", href: "/services/sustainability", image: "/images/industries/sectors/energy-resources.jpg" },
  { title: "Public Sector Advisory", description: "Policy analysis, public sector reform, and digital government.", href: "/services/public-sector", image: "/images/industries/sectors/public-sector-government.jpg" },
  { title: "Digital Communication", description: "Social media strategy, digital brand management, and content marketing.", href: "/services/communication", image: "/images/industries/sectors/technology-digital.jpg" },
  { title: "Tax & Asset Management", description: "Tax compliance, international tax planning, and wealth management.", href: "/services/tax", image: "/images/industries/sectors/financial-services.jpg" },
  { title: "Legal & Regulatory", description: "Corporate governance, regulatory compliance, and trade law.", href: "/services/legal", image: "/images/industries/sectors/private-capital.jpg" },
  { title: "SME Development & Growth", description: "Business incubation, SME financing, and market entry strategy.", href: "/services/sme", image: "/images/industries/sectors/consumer-retail.jpg" },
];

const INDUSTRIES = [
  { title: "Financial Services", description: "Banks, capital markets, insurers, fintechs, and asset managers.", href: "/industries/financial-services", image: "/images/industries/sectors/financial-services.jpg" },
  { title: "Healthcare & Life Sciences", description: "Healthcare providers, pharma, biotech, and medtech.", href: "/industries/healthcare-life-sciences", image: "/images/industries/sectors/healthcare-life-sciences.jpg" },
  { title: "Energy & Natural Resources", description: "Oil, gas, utilities, renewables, power, and mining.", href: "/industries/energy-resources", image: "/images/industries/sectors/energy-resources.jpg" },
  { title: "Industrials & Manufacturing", description: "Industrial companies, productivity, and supply chain.", href: "/industries/industrials-manufacturing", image: "/images/industries/sectors/industrials-manufacturing.jpg" },
  { title: "Consumer & Retail", description: "Retail, CPG, consumer goods, and omnichannel strategy.", href: "/industries/consumer-retail", image: "/images/industries/sectors/consumer-retail.jpg" },
  { title: "Technology, Media & Telecom", description: "Technology companies, media organizations, and telecom operators.", href: "/industries/technology-digital", image: "/images/industries/sectors/technology-digital.jpg" },
  { title: "Transportation & Logistics", description: "Airlines, shippers, logistics, and travel/hospitality.", href: "/industries/transport-logistics", image: "/images/industries/sectors/transport-logistics.jpg" },
  { title: "Public Sector & Government", description: "Governments, agencies, and defense organizations.", href: "/industries/public-sector-government", image: "/images/industries/sectors/public-sector-government.jpg" },
  { title: "Real Estate & Infrastructure", description: "Real estate, infrastructure, and construction.", href: "/industries/real-estate-infrastructure", image: "/images/industries/sectors/real-estate-infrastructure.jpg" },
  { title: "Private Capital", description: "PE firms, principal investors, and value creation.", href: "/industries/private-capital", image: "/images/industries/sectors/private-capital.jpg" },
  { title: "Education & Social Impact", description: "Education institutions, nonprofits, and social enterprises.", href: "/industries/education", image: "/images/industries/sectors/education.jpg" },
];

// ─── Asymmetric grid layout helpers ──────────────────────────────────────────

// Services (10 items): 3, 2, 3, 2
const SERVICE_GRID_ROWS = [
  { items: [0, 1, 2], widths: ["1fr", "1fr", "1fr"] },
  { items: [3, 4], widths: ["3fr", "2fr"] },
  { items: [5, 6, 7], widths: ["1fr", "1fr", "1fr"] },
  { items: [8, 9], widths: ["2fr", "3fr"] },
];

// Industries (11 items): 3, 2, 3, 3
const INDUSTRY_GRID_ROWS = [
  { items: [0, 1, 2], widths: ["1fr", "1fr", "1fr"] },
  { items: [3, 4], widths: ["3fr", "2fr"] },
  { items: [5, 6, 7], widths: ["1fr", "1fr", "1fr"] },
  { items: [8, 9, 10], widths: ["1fr", "1fr", "1fr"] },
];

// ─── Card component ──────────────────────────────────────────────────────────

function ExploreCard({
  title,
  description,
  href,
  image,
}: {
  title: string;
  description: string;
  href: string;
  image?: string;
}) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden transition-transform duration-300 ease-out hover:scale-[1.02]"
      style={{
        height: "210px",
        borderRadius: "10px",
        background: image ? undefined : "linear-gradient(135deg, #052659 0%, #021024 100%)",
      }}
    >
      {/* Background image */}
      {image && (
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover"
          aria-hidden="true"
        />
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: image
            ? "linear-gradient(to top, rgba(2,16,36,0.88) 0%, rgba(2,16,36,0.4) 50%, rgba(2,16,36,0.2) 100%)"
            : "none",
          borderRadius: "inherit",
        }}
      />
      {/* Hover lighten */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "linear-gradient(to top, rgba(2,16,36,0.73) 0%, rgba(2,16,36,0.25) 50%, rgba(2,16,36,0.05) 100%)",
          borderRadius: "inherit",
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6" style={{ borderRadius: "inherit" }}>
        <h3
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "17px",
            fontWeight: 600,
            color: "#FFFFFF",
            lineHeight: 1.3,
          }}
        >
          {title}
        </h3>
        <p
          className="mt-1 line-clamp-2"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.5,
          }}
        >
          {description}
        </p>
      </div>

      {/* Arrow */}
      <span
        className="absolute bottom-6 right-6 text-white/50 transition-all duration-300 group-hover:translate-x-[5px] group-hover:text-white/90"
        aria-hidden="true"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

type Tab = "service" | "industry";

interface CapabilityNavigatorProps {
  background?: string;
}

export default function CapabilityNavigator({ background }: CapabilityNavigatorProps) {
  const [activeTab, setActiveTab] = useState<Tab>("service");
  const [fading, setFading] = useState(false);
  const [displayTab, setDisplayTab] = useState<Tab>("service");

  const switchTab = useCallback(
    (tab: Tab) => {
      if (tab === activeTab) return;
      setFading(true);
      setTimeout(() => {
        setDisplayTab(tab);
        setActiveTab(tab);
        setFading(false);
      }, 200);
    },
    [activeTab],
  );

  const items = displayTab === "service" ? SERVICES : INDUSTRIES;
  const gridRows = displayTab === "service" ? SERVICE_GRID_ROWS : INDUSTRY_GRID_ROWS;

  return (
    <section
      style={{
        backgroundColor: background || "#FFFFFF",
        paddingTop: "80px",
        paddingBottom: "60px",
      }}
    >
      <div className="layout-container">
        {/* Header */}
        <div className="max-w-2xl">
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
            Explore
          </span>
          <h2
            className="mt-4"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(28px, 3.5vw, 40px)",
              fontWeight: 400,
              lineHeight: 1.2,
              color: "#021024",
            }}
          >
            How can we assist you today?
          </h2>
          <p
            className="mt-3"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              color: "#6B7280",
              lineHeight: 1.7,
              maxWidth: "600px",
            }}
          >
            Select a capability or industry to learn more.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="mt-6 flex gap-3">
          {(["service", "industry"] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => switchTab(tab)}
                className="transition-all duration-300"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  fontWeight: 500,
                  padding: "10px 28px",
                  borderRadius: "30px",
                  backgroundColor: isActive ? "#052659" : "transparent",
                  color: isActive ? "#FFFFFF" : "#5483B3",
                  border: isActive ? "1px solid #052659" : "1px solid rgba(84,131,179,0.3)",
                  cursor: "pointer",
                }}
              >
                {tab === "service" ? "By Capability" : "By Industry"}
              </button>
            );
          })}
        </div>

        {/* Asymmetric Grid */}
        <div
          className="mt-8"
          style={{
            opacity: fading ? 0 : 1,
            transition: "opacity 250ms ease-in-out",
          }}
        >
          {gridRows.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="grid gap-[14px]"
              style={{
                gridTemplateColumns: row.widths.join(" "),
                marginTop: rowIdx > 0 ? "14px" : 0,
              }}
            >
              {row.items.map((itemIdx) => {
                const item = items[itemIdx];
                if (!item) return null;
                return (
                  <ExploreCard
                    key={item.title}
                    title={item.title}
                    description={item.description}
                    href={item.href}
                    image={item.image}
                  />
                );
              })}
            </div>
          ))}

          {/* Mobile fallback: single column */}
          <style>{`
            @media (max-width: 767px) {
              .grid[style*="gridTemplateColumns"] {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
