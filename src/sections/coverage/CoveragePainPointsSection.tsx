"use client";

import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";

const PAIN_POINTS = [
  {
    title: "Lack of Strategic Clarity and Execution",
    body: "Many businesses struggle with defining a clear strategy or face challenges when implementing complex strategies. This can result in lost opportunities, inefficient resource allocation, and stagnant growth.",
  },
  {
    title: "Technological Lag and Complexity",
    body: "With rapid digital transformation and AI adoption, many organizations are overwhelmed by the complexity of modern technology or fall behind in adopting critical innovations. This includes gaps in cybersecurity, automation, and cloud infrastructure.",
  },
  {
    title: "Financial and Regulatory Compliance Risks",
    body: "Companies often find it challenging to navigate the evolving financial and regulatory landscape, risking costly penalties, reputational damage, and operational inefficiencies.",
  },
  {
    title: "Talent Management and Organizational Inefficiency",
    body: "Businesses frequently fail to optimize their workforce, leading to poor leadership development, ineffective talent retention, and organizational dysfunction, which inhibits growth and transformation.",
  },
  {
    title: "Sustainability and ESG Compliance",
    body: "Organizations are under increasing pressure to meet environmental, social, and governance (ESG) standards. However, they lack the expertise or resources to integrate sustainability practices effectively, risking compliance issues or a tarnished reputation.",
  },
  {
    title: "Public Sector and Government Modernization",
    body: "Government agencies and public sector organizations often face inefficiencies due to outdated systems and lack of transformation expertise, impacting their ability to provide services effectively and respond to modern challenges.",
  },
];

export default function CoveragePainPointsSection() {
  return (
    <SectionWrapper background="neutral50">
      <SectionHeader overline="Value Proposition" title="Pain Points We Solve for Clients." showAccentRule={false} />

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {PAIN_POINTS.map((item, index) => (
          <div key={item.title} className="border-t-2 border-(--a700) pt-6">
            <span
              style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                color: "var(--n400)",
                letterSpacing: "0.02em",
                fontVariantNumeric: "tabular-nums",
                display: "block",
                marginBottom: "8px",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 style={{ fontSize: "var(--text-body)", fontWeight: 600, lineHeight: "var(--line-height-body)", color: "var(--n900)", marginBottom: "8px" }}>
              {item.title}
            </h3>
            <p style={{ fontSize: "var(--text-caption)", lineHeight: "1.55", color: "var(--n600)", maxWidth: "55ch" }}>
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
