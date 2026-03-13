import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";

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
  return (
    <SectionWrapper background="neutral50" padV={{ mobile: 56, tablet: 72, desktop: 96 }}>
      <SectionHeader
        overline="Integrated Framework"
        title="Our Capability Framework"
        description="Our advisory capabilities work together to transform institutions, unlock growth, and deliver long-term value."
      />

      <div className="relative mt-12 flex flex-col items-center gap-3">
        {/* Vertical connector line — desktop only */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-(--n300) md:block"
        />

        {/* Layer 1 — Core Strategy */}
        <div className="relative z-10 flex w-full justify-center">
          <FrameworkCard
            capability={CAPABILITIES[0]}
            className="w-full md:w-90"
          />
        </div>

        {/* Horizontal connector */}
        <div
          aria-hidden="true"
          className="relative z-10 hidden h-px bg-(--n300) md:block"
          style={{ width: "clamp(400px, 50%, 620px)" }}
        />

        {/* Layer 2 — Connected upper */}
        <div className="relative z-10 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 md:max-w-170">
          <FrameworkCard capability={CAPABILITIES[1]} />
          <FrameworkCard capability={CAPABILITIES[2]} />
        </div>

        {/* Layer 3 — Connected lower */}
        <div className="relative z-10 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 md:max-w-170">
          <FrameworkCard capability={CAPABILITIES[3]} />
          <FrameworkCard capability={CAPABILITIES[4]} />
        </div>

        {/* Horizontal connector */}
        <div
          aria-hidden="true"
          className="relative z-10 hidden h-px bg-(--n300) md:block"
          style={{ width: "clamp(400px, 50%, 620px)" }}
        />

        {/* Layer 4 — Foundation */}
        <div className="relative z-10 flex w-full justify-center">
          <FrameworkCard
            capability={CAPABILITIES[5]}
            className="w-full md:w-90"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}

function FrameworkCard({
  capability,
  className = "",
}: {
  capability: Capability;
  className?: string;
}) {
  const isAccent = capability.accent;

  return (
    <div
      className={[
        "rounded-(--radius-card) border p-6 transition-shadow duration-150",
        isAccent
          ? "border-transparent bg-(--a700)"
          : "border-(--n200) bg-white hover:border-(--a300) hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <h3
        className={isAccent ? "font-semibold text-white" : "font-semibold text-(--n900)"}
        style={{ fontSize: "1.0625rem", lineHeight: "1.3" }}
      >
        {capability.name}
      </h3>
      <p
        className={[
          "mt-2 leading-[1.55]",
          isAccent ? "text-white/70" : "text-(--n500)",
        ].join(" ")}
        style={{ fontSize: "var(--text-caption)" }}
      >
        {capability.description}
      </p>
    </div>
  );
}
