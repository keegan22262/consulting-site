"use client";

import { useState } from "react";
import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";

const FOOTPRINT_MAP_IMAGE =
  "https://images.unsplash.com/photo-1723306743371-38f6666be1a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHlsaXplZCUyMHdvcmxkJTIwbWFwJTIwZ2xvYmFsJTIwcHJlc2VuY2UlMjBhYnN0cmFjdHxlbnwxfHx8fDE3NzMzMjYxMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const FOOTPRINT_CITY_IMAGE =
  "https://images.unsplash.com/photo-1765475467677-579353b25ce0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb2Rlcm4lMjBBZnJpY2FuJTIwY2l0eSUyMGluZnJhc3RydWN0dXJlJTIwZGV2ZWxvcG1lbnQlMjBhZXJpYWx8ZW58MXx8fHwxNzczMzI2MTA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const INDUSTRIES_SERVED = [
  "Financial Services",
  "Technology & Digital",
  "Energy & Natural Resources",
  "Healthcare & Life Sciences",
  "Public Sector & Government",
  "Real Estate & Infrastructure",
  "Manufacturing & Industrial",
  "Education & Research",
  "Media & Telecommunications",
  "Professional Services",
  "Logistics & Transport",
];

const SCALE_ITEMS = [
  {
    label: "Institutional transformation programs",
    desc: "Multi-year advisory mandates spanning strategy, technology, and organizational redesign.",
  },
  {
    label: "Large-scale operational redesign",
    desc: "End-to-end process optimization, governance restructuring, and operating model transformation.",
  },
  {
    label: "Strategic advisory mandates",
    desc: "Board-level counsel on M&A, growth strategy, market entry, and competitive repositioning.",
  },
  {
    label: "Cross-sector policy advisory",
    desc: "Public-private engagement design, regulatory reform support, and institutional capacity building.",
  },
];

export default function InstitutionalFootprintSection() {
  const gridCols = useResponsiveValue({
    desktop: "repeat(3, 1fr)",
    tablet: "repeat(2, 1fr)",
    mobile: "1fr",
  });
  const gap = useResponsiveValue({ desktop: "32px", tablet: "24px", mobile: "20px" });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <SectionWrapper background="neutral50">
      <SectionHeader
        overline="Institutional Reach"
        title="Institutional Footprint."
        description="Our advisory work spans industries, institutions, and geographies - helping organizations navigate complex transformation challenges."
        showAccentRule={false}
        maxWidth="60ch"
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: gridCols,
          gap,
          marginTop: "56px",
        }}
      >
        <div
          onMouseEnter={() => setHovered("geo")}
          onMouseLeave={() => setHovered(null)}
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "12px",
            border: `1px solid ${hovered === "geo" ? "#93C5FD" : "#E2E8F0"}`,
            overflow: "hidden",
            boxShadow:
              hovered === "geo" ? "0 8px 32px rgba(0,0,0,0.08)" : "0 1px 4px rgba(0,0,0,0.04)",
            transition: "box-shadow 200ms ease, border-color 200ms ease",
            gridColumn: gridCols === "repeat(2, 1fr)" ? "span 2" : "auto",
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "200px", overflow: "hidden" }}>
            <img
              src={FOOTPRINT_MAP_IMAGE}
              alt="Global advisory presence - stylized world map"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
                filter: "saturate(0.8) contrast(1.05)",
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "40%",
                background: "linear-gradient(to top, rgba(255,255,255,1) 0%, transparent 100%)",
              }}
            />
          </div>
          <div style={{ padding: "24px 28px 28px" }}>
            <span
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "0.6875rem",
                fontWeight: 600,
                color: "#1B3A5C",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "12px",
              }}
            >
              Geographic Presence
            </span>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#0F172A", marginBottom: "12px" }}>
              Pan-African & Emerging Markets
            </h3>
            <p style={{ fontSize: "0.875rem", lineHeight: "1.6", color: "#64748B" }}>
              Global and regional advisory engagements across emerging and established markets. Our teams operate on the ground in key African economic hubs, with connectivity to international advisory networks.
            </p>
          </div>
        </div>

        <div
          onMouseEnter={() => setHovered("ind")}
          onMouseLeave={() => setHovered(null)}
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "12px",
            border: `1px solid ${hovered === "ind" ? "#93C5FD" : "#E2E8F0"}`,
            overflow: "hidden",
            boxShadow:
              hovered === "ind" ? "0 8px 32px rgba(0,0,0,0.08)" : "0 1px 4px rgba(0,0,0,0.04)",
            transition: "box-shadow 200ms ease, border-color 200ms ease",
            padding: "28px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "0.6875rem",
              fontWeight: 600,
              color: "#1B3A5C",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "12px",
            }}
          >
            Industries Served
          </span>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#0F172A", marginBottom: "20px" }}>11 Sectors</h3>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {INDUSTRIES_SERVED.map((industry) => (
              <div
                key={industry}
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid #F1F5F9",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div style={{ width: "4px", height: "4px", borderRadius: "999px", backgroundColor: "#1B3A5C" }} />
                <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "#334155" }}>{industry}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          onMouseEnter={() => setHovered("scale")}
          onMouseLeave={() => setHovered(null)}
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "12px",
            border: `1px solid ${hovered === "scale" ? "#93C5FD" : "#E2E8F0"}`,
            overflow: "hidden",
            boxShadow:
              hovered === "scale" ? "0 8px 32px rgba(0,0,0,0.08)" : "0 1px 4px rgba(0,0,0,0.04)",
            transition: "box-shadow 200ms ease, border-color 200ms ease",
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "180px", overflow: "hidden" }}>
            <img
              src={FOOTPRINT_CITY_IMAGE}
              alt="Modern African city infrastructure and development"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
            />
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "40%",
                background: "linear-gradient(to top, rgba(255,255,255,1) 0%, transparent 100%)",
              }}
            />
          </div>
          <div style={{ padding: "24px 28px 28px" }}>
            <span
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "0.6875rem",
                fontWeight: 600,
                color: "#1B3A5C",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "12px",
              }}
            >
              Scale of Engagement
            </span>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#0F172A", marginBottom: "16px" }}>
              Institutional-Grade Mandates
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {SCALE_ITEMS.map((item) => (
                <div key={item.label}>
                  <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#1E293B", display: "block" }}>
                    {item.label}
                  </span>
                  <span style={{ fontSize: "0.75rem", lineHeight: "1.55", color: "#64748B" }}>{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
