"use client";

import { useState } from "react";
import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";

interface Capability {
  id: string;
  name: string;
  description: string;
  accent?: boolean;
}

// Six representative capabilities that map to the framework map layers.
// Source: Figma reference — figma-reference/rslservices.tsx → CapabilityFrameworkMap
const CAPABILITIES: Capability[] = [
  {
    id: "strategy",
    name: "Strategy",
    description:
      "Corporate strategy, M&A advisory, organizational transformation, and growth strategy.",
    accent: true,
  },
  {
    id: "digital",
    name: "Digital Transformation",
    description:
      "AI implementation, automation, cloud migration, and cybersecurity integration.",
  },
  {
    id: "people",
    name: "Operational Excellence",
    description:
      "Talent management, leadership development, organizational design, and change management.",
  },
  {
    id: "public",
    name: "Infrastructure Advisory",
    description:
      "Public sector reform, digital government transformation, and public-private partnerships.",
  },
  {
    id: "finance",
    name: "Financial Strategy",
    description:
      "Regulatory compliance, risk assessment, financial restructuring, and forensic insight.",
  },
  {
    id: "esg",
    name: "Sustainability",
    description:
      "ESG reporting, climate risk assessment, sustainable business practices, and circular economy.",
  },
];

/**
 * CapabilityFrameworkMap
 *
 * Visual hierarchy showing how the six core advisory capabilities interrelate.
 * Rendered on neutral-50 background.
 *
 * Layout: Figma reference — figma-reference/rslservices.tsx → CapabilityFrameworkMap
 * Spacing: section py-24 (96px); card p-6 (24px)
 * Layers: core (1 wide card) → upper pair → lower pair → foundation (1 wide card)
 */
export default function CapabilityFrameworkMap() {
  const isMobile = useResponsiveValue({ desktop: false, tablet: false, mobile: true });
  const mapMarginTop = useResponsiveValue({ desktop: "56px", tablet: "44px", mobile: "36px" });
  const gap = useResponsiveValue({ desktop: "16px", tablet: "16px", mobile: "12px" });
  const gridGap = useResponsiveValue({ desktop: "24px", tablet: "16px", mobile: "12px" });
  const gridMaxWidth = useResponsiveValue({ desktop: "680px", tablet: "560px", mobile: "100%" });
  const connectorWidth = useResponsiveValue({ desktop: "620px", tablet: "500px", mobile: "0px" });
  const highlightWidth = useResponsiveValue({ desktop: "360px", tablet: "320px", mobile: "100%" });

  return (
    <SectionWrapper background="neutral50" padV={{ mobile: 56, tablet: 72, desktop: 96 }}>
      <SectionHeader
        overline="Integrated Framework"
        title="Our Capability Framework"
        description="Our advisory capabilities work together to transform institutions, unlock growth, and deliver long-term value."
        showAccentRule={false}
        maxWidth="56ch"
      />

      <div
        className="relative flex flex-col items-center"
        style={{ marginTop: mapMarginTop, gap }}
      >
        {/* Vertical connector line — desktop only */}
        {!isMobile && (
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-(--n300)"
          />
        )}

        {/* Layer 1 — Core Strategy */}
        <div className="relative z-10 flex w-full justify-center">
          <FrameworkCard capability={CAPABILITIES[0]} width={highlightWidth} accent />
        </div>

        {!isMobile && (
          <div
            aria-hidden="true"
            className="relative z-10 flex w-full justify-center"
          >
            <div className="h-px bg-(--n300)" style={{ width: connectorWidth }} />
          </div>
        )}

        <div
          className="relative z-10 grid w-full"
          style={{
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: gridGap,
            maxWidth: gridMaxWidth,
          }}
        >
          <FrameworkCard capability={CAPABILITIES[1]} />
          <FrameworkCard capability={CAPABILITIES[2]} />
        </div>

        <div
          className="relative z-10 grid w-full"
          style={{
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: gridGap,
            maxWidth: gridMaxWidth,
          }}
        >
          <FrameworkCard capability={CAPABILITIES[3]} />
          <FrameworkCard capability={CAPABILITIES[4]} />
        </div>

        {!isMobile && (
          <div
            aria-hidden="true"
            className="relative z-10 flex w-full justify-center"
          >
            <div className="h-px bg-(--n300)" style={{ width: connectorWidth }} />
          </div>
        )}

        <div className="relative z-10 flex w-full justify-center">
          <FrameworkCard capability={CAPABILITIES[5]} width={highlightWidth} />
        </div>
      </div>
    </SectionWrapper>
  );
}

function FrameworkCard({
  capability,
  width,
  accent = false,
}: {
  capability: Capability;
  width?: string;
  accent?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const isAccent = accent || capability.accent;
  const cardBg = isAccent ? (hovered ? "var(--a800)" : "var(--a700)") : "#FFFFFF";
  const titleColor = isAccent ? "#FFFFFF" : hovered ? "var(--a700)" : "var(--n900)";
  const descColor = isAccent
    ? hovered
      ? "rgba(255,255,255,0.9)"
      : "rgba(255,255,255,0.72)"
    : hovered
      ? "var(--n600)"
      : "var(--n500)";
  const borderColor = isAccent ? "transparent" : hovered ? "var(--a300)" : "var(--n200)";
  const boxShadow = hovered ? "0 4px 16px rgba(0,0,0,0.08)" : "0 1px 4px rgba(0,0,0,0.04)";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: width || "100%",
        backgroundColor: cardBg,
        borderColor,
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "4px",
        paddingTop: "24px",
        paddingBottom: "24px",
        paddingLeft: "28px",
        paddingRight: "28px",
        boxShadow,
        transition: "background-color 120ms cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 120ms cubic-bezier(0.25, 0.1, 0.25, 1), border-color 120ms cubic-bezier(0.25, 0.1, 0.25, 1)",
      }}
    >
      <h3
        style={{
          fontSize: "1.0625rem",
          lineHeight: "1.3",
          color: titleColor,
          fontWeight: 600,
        }}
      >
        {capability.name}
      </h3>
      <p
        style={{
          marginTop: "8px",
          fontSize: "0.8125rem",
          lineHeight: "1.55",
          color: descColor,
          maxHeight: hovered ? "100px" : "40px",
          overflow: "hidden",
        }}
      >
        {capability.description}
      </p>
    </div>
  );
}
