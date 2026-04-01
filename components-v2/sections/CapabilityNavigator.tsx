"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

// ─── Service data ────────────────────────────────────────────────────────────

const SERVICES = [
  { title: "Strategy & Corporate Transformation", description: "Corporate strategy, M&A advisory, and organizational transformation.", href: "/services/strategy" },
  { title: "Digital & AI Transformation", description: "Digital strategy, AI implementation, automation, and cloud migration.", href: "/services/digital" },
  { title: "Financial Advisory, Audit & Risk", description: "Regulatory compliance, risk assessment, and financial restructuring.", href: "/services/financial" },
  { title: "People & Organization", description: "Talent management, leadership development, and organizational design.", href: "/services/people" },
  { title: "Sustainability & ESG", description: "ESG reporting, climate risk assessment, and sustainable practices.", href: "/services/sustainability" },
  { title: "Public Sector Advisory", description: "Policy analysis, public sector reform, and digital government.", href: "/services/public-sector" },
  { title: "Digital Communication", description: "Social media strategy, digital brand management, and content marketing.", href: "/services/communication" },
  { title: "Tax & Asset Management", description: "Tax compliance, international tax planning, and wealth management.", href: "/services/tax" },
  { title: "Legal & Regulatory", description: "Corporate governance, regulatory compliance, and trade law.", href: "/services/legal" },
  { title: "SME Development & Growth", description: "Business incubation, SME financing, and market entry strategy.", href: "/services/sme" },
];

const INDUSTRIES = [
  { title: "Financial Services", description: "Banks, capital markets, insurers, fintechs, and asset managers.", href: "/industries/financial-services" },
  { title: "Healthcare & Life Sciences", description: "Healthcare providers, pharma, biotech, and medtech.", href: "/industries/healthcare-life-sciences" },
  { title: "Energy & Natural Resources", description: "Oil, gas, utilities, renewables, power, and mining.", href: "/industries/energy-resources" },
  { title: "Industrials & Manufacturing", description: "Industrial companies, productivity, and supply chain.", href: "/industries/industrials-manufacturing" },
  { title: "Consumer & Retail", description: "Retail, CPG, consumer goods, and omnichannel strategy.", href: "/industries/consumer-retail" },
  { title: "Technology, Media & Telecom", description: "Technology companies, media organizations, and telecom operators.", href: "/industries/technology-digital" },
  { title: "Transportation & Logistics", description: "Airlines, shippers, logistics, and travel/hospitality.", href: "/industries/transport-logistics" },
  { title: "Public Sector & Government", description: "Governments, agencies, and defense organizations.", href: "/industries/public-sector-government" },
  { title: "Real Estate & Infrastructure", description: "Real estate, infrastructure, and construction.", href: "/industries/real-estate-infrastructure" },
  { title: "Private Capital", description: "PE firms, principal investors, and value creation.", href: "/industries/private-capital" },
  { title: "Education & Social Impact", description: "Education institutions, nonprofits, and social enterprises.", href: "/industries/education" },
];

// ─── Asymmetric grid layout templates ────────────────────────────────────────
// Each row is an array of column fractions. "3" = equal thirds, "6/4" = 60%/40%.

const SERVICE_LAYOUT: { items: number[]; cols: string }[] = [
  { items: [0, 1, 2], cols: "1fr 1fr 1fr" },
  { items: [3, 4], cols: "3fr 2fr" },
  { items: [5, 6, 7], cols: "1fr 1fr 1fr" },
  { items: [8, 9], cols: "2fr 3fr" },
];

const INDUSTRY_LAYOUT: { items: number[]; cols: string }[] = [
  { items: [0, 1, 2], cols: "1fr 1fr 1fr" },
  { items: [3, 4], cols: "3fr 2fr" },
  { items: [5, 6, 7], cols: "1fr 1fr 1fr" },
  { items: [8, 9, 10], cols: "1fr 1fr 1fr" },
];

// ─── Gradient backgrounds for cards without images ───────────────────────────

const CARD_GRADIENTS = [
  "linear-gradient(135deg, #0A1628 0%, #1B3A5C 100%)",
  "linear-gradient(135deg, #0E223A 0%, #1B3A5C 100%)",
  "linear-gradient(135deg, #0A1628 0%, #162D48 100%)",
  "linear-gradient(135deg, #132942 0%, #1B3A5C 100%)",
  "linear-gradient(135deg, #0C1C2E 0%, #1A3655 100%)",
  "linear-gradient(135deg, #0A1628 0%, #1E4068 100%)",
  "linear-gradient(135deg, #0E223A 0%, #162D48 100%)",
  "linear-gradient(135deg, #0A1628 0%, #1B3A5C 100%)",
  "linear-gradient(135deg, #132942 0%, #0C1C2E 100%)",
  "linear-gradient(135deg, #0C1C2E 0%, #1A3655 100%)",
  "linear-gradient(135deg, #0A1628 0%, #162D48 100%)",
];

// ─── Card component ──────────────────────────────────────────────────────────

function EditorialCard({
  title,
  description,
  href,
  index,
}: {
  title: string;
  description: string;
  href: string;
  index: number;
}) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-xl transition-transform duration-300 ease-out hover:scale-[1.015]"
      style={{
        height: "clamp(180px, 22vw, 240px)",
        background: CARD_GRADIENTS[index % CARD_GRADIENTS.length],
      }}
    >
      {/* Hover overlay */}
      <div
        className="absolute inset-0 bg-white/0 transition-colors duration-300 group-hover:bg-white/10"
        style={{ borderRadius: "inherit" }}
      />

      {/* Content — bottom-left positioned */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
        <h3 className="text-[17px] font-semibold leading-snug text-white md:text-lg">
          {title}
        </h3>
        <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-white/70">
          {description}
        </p>
      </div>

      {/* Arrow — bottom-right */}
      <span
        className="absolute bottom-5 right-5 text-white/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white/90 md:bottom-6 md:right-6"
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
  const layout = displayTab === "service" ? SERVICE_LAYOUT : INDUSTRY_LAYOUT;

  return (
    <section
      className="section-wrapper"
      style={background ? { backgroundColor: background } : undefined}
    >
      <div className="layout-container">
        {/* Header */}
        <div className="max-w-2xl">
          <span
            className="block text-xs font-semibold uppercase"
            style={{ letterSpacing: "0.08em", color: "#888" }}
          >
            Explore
          </span>
          <h2
            className="mt-2 text-[2rem] font-semibold leading-[1.2] md:text-[2.25rem]"
            style={{ color: "#0A1628", fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            How can we assist you today?
          </h2>
          <p className="mt-3 max-w-[600px] text-base leading-relaxed" style={{ color: "#666" }}>
            Select a capability or industry to learn more.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={() => switchTab("service")}
            className="rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200"
            style={{
              backgroundColor: activeTab === "service" ? "#0A1628" : "transparent",
              color: activeTab === "service" ? "#FFFFFF" : "#666",
              border: activeTab === "service" ? "1px solid #0A1628" : "1px solid #D0D0D0",
            }}
          >
            By Capability
          </button>
          <button
            type="button"
            onClick={() => switchTab("industry")}
            className="rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200"
            style={{
              backgroundColor: activeTab === "industry" ? "#0A1628" : "transparent",
              color: activeTab === "industry" ? "#FFFFFF" : "#666",
              border: activeTab === "industry" ? "1px solid #0A1628" : "1px solid #D0D0D0",
            }}
          >
            By Industry
          </button>
        </div>

        {/* Editorial Grid */}
        <div
          className="mt-6 flex flex-col gap-3 md:gap-3.5"
          style={{
            opacity: fading ? 0 : 1,
            transition: "opacity 200ms ease-in-out",
          }}
        >
          {layout.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="grid gap-3 md:gap-3.5"
              style={{
                gridTemplateColumns: "1fr",
              }}
            >
              {/* Desktop: use asymmetric grid template */}
              <div
                className="hidden md:grid gap-3.5"
                style={{ gridTemplateColumns: row.cols }}
              >
                {row.items.map((itemIdx) => {
                  const item = items[itemIdx];
                  if (!item) return null;
                  return (
                    <EditorialCard
                      key={item.title}
                      title={item.title}
                      description={item.description}
                      href={item.href}
                      index={itemIdx}
                    />
                  );
                })}
              </div>
              {/* Mobile: single column stack */}
              <div className="flex flex-col gap-3 md:hidden">
                {row.items.map((itemIdx) => {
                  const item = items[itemIdx];
                  if (!item) return null;
                  return (
                    <EditorialCard
                      key={item.title}
                      title={item.title}
                      description={item.description}
                      href={item.href}
                      index={itemIdx}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
