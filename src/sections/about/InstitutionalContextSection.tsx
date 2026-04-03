"use client";

import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";

const INSTITUTIONAL_IMAGE =
  "https://images.unsplash.com/photo-1760740962486-1f358391170e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwY29ycG9yYXRlJTIwZGlzdHJpY3QlMjBhZXJpYWwlMjBtb2Rlcm4lMjBidWlsZGluZ3N8ZW58MXx8fHwxNzczMzI0OTkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const CLIENT_SEGMENTS = [
  {
    segment: "Startups",
    scope: "Essential foundations: strategy, finance, tax, and go-to-market.",
  },
  {
    segment: "SMEs",
    scope: "Scaling with structure: operations, compliance, digital enablement, and growth.",
  },
  {
    segment: "Mid-size & large organizations",
    scope: "Transformation: operating model, risk, technology, people, and ESG.",
  },
];

export default function InstitutionalContextSection() {
  return (
    <SectionWrapper background="white">
      <SectionHeader overline="The Firm" title="Institutional Context." showAccentRule={false} />
      <div
        style={{
          width: "48px",
          height: "2px",
          backgroundColor: "#1B3A5C",
          marginTop: "32px",
          marginBottom: "32px",
        }}
      />

      <div className="grid gap-6 md:gap-8 lg:grid-cols-[7fr_5fr] lg:gap-16">
        <div style={{ maxWidth: "65ch" }}>
          <p
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "var(--text-body-lg)",
              lineHeight: "1.65",
              color: "#334155",
            }}
          >
            Rill Singh Limited (RSL) is a pan-African advisory firm established to address a persistent structural gap in the consulting market: the fragmentation between strategic advice and operational execution. Too often, organizations engage multiple firms for strategy, technology, finance, people, and compliance - then absorb the coordination cost themselves. The result is delayed outcomes, diluted accountability, and eroded momentum.
          </p>

          <div style={{ marginTop: "40px", marginBottom: "40px" }}>
            <img
              src={INSTITUTIONAL_IMAGE}
              alt="African corporate district - the institutional environments where RSL operates"
              className="h-[220px] w-full rounded-[12px] object-cover object-center md:h-[280px] lg:h-[340px]"
            />
          </div>

          <p
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "var(--text-body-lg)",
              lineHeight: "1.65",
              color: "#334155",
            }}
          >
            RSL was designed to close that gap. The firm brings end-to-end capability under one roof - strategy and corporate transformation, digital and AI, financial advisory and risk, people and organizational effectiveness, sustainability and ESG, and public-sector advisory - delivered through small, senior teams operating within a shared governance and methodology framework.
          </p>

          <p
            style={{
              marginTop: "24px",
              fontFamily: "var(--font-primary)",
              fontSize: "var(--text-body)",
              lineHeight: "var(--line-height-body)",
              color: "#475569",
            }}
          >
            The firm&apos;s operating philosophy - PRIDE: Precision, Resilience, Integrity, Discipline, Execution - is not aspirational. It is the behavioral architecture that governs how every engagement is scoped, staffed, delivered, and sustained. Precision means starting with facts and a clear problem definition. Integrity means transparent timelines, costs, and advice. Discipline means protecting delivery through cadence and governance. Execution means staying close to implementation until outcomes are verified.
          </p>
        </div>

        <div>
          <div
            style={{
              borderLeft: "3px solid #1B3A5C",
              paddingLeft: "24px",
              marginBottom: "32px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "0.6875rem",
                fontWeight: 600,
                color: "#1B3A5C",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Mission
            </span>
            <p
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "var(--text-body)",
                lineHeight: "var(--line-height-body)",
                color: "#475569",
                maxWidth: "40ch",
              }}
            >
              To deliver comprehensive, innovative solutions that drive sustainable growth and transformation for startups, SMEs, and enterprises - globally - through strategy, technology integration, financial optimization, and human capital development.
            </p>
          </div>

          <div style={{ borderLeft: "3px solid #CBD5E1", paddingLeft: "24px" }}>
            <span
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "0.6875rem",
                fontWeight: 600,
                color: "#94A3B8",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Client Segments
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {CLIENT_SEGMENTS.map((segment) => (
                <div key={segment.segment}>
                  <span
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "var(--text-caption)",
                      fontWeight: 600,
                      color: "#0F172A",
                      display: "block",
                    }}
                  >
                    {segment.segment}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "var(--text-caption)",
                      lineHeight: "1.55",
                      color: "#64748B",
                    }}
                  >
                    {segment.scope}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
