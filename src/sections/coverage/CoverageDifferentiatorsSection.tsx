"use client";

import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";

const DIFFERENTIATORS = [
  {
    title: "Tailored, Personalized Approach",
    body: "Unlike large consulting firms with generic solutions, ALINABSS offers highly personalized and tailored consulting services. We take the time to understand the unique challenges of each client, providing solutions that are specifically designed for their business needs, rather than offering a one-size-fits-all approach.",
  },
  {
    title: "Cost-Effective and Agile",
    body: "Many enterprises cannot afford the high fees charged by industry giants like PwC, Deloitte, or EY. ALINABSS delivers the same level of expertise and quality at a fraction of the cost, making world-class advisory accessible to organizations of all sizes — from SMEs to large enterprises.",
  },
  {
    title: "Niche Expertise with Global Insight",
    body: "ALINABSS combines deep local knowledge with global insight. Our consultants bring sector-specific expertise paired with an understanding of international best practices, enabling clients to navigate both regional challenges and global opportunities with confidence.",
  },
  {
    title: "Speed and Execution Focus",
    body: "We prioritize speed without sacrificing quality. ALINABSS is structured for rapid engagement mobilization and accelerated delivery timelines, ensuring clients see tangible results faster than traditional consulting engagements typically allow.",
  },
  {
    title: "Integrated, End-to-End Solutions",
    body: "Rather than siloed advisory, ALINABSS provides integrated, end-to-end solutions that span strategy, technology, finance, people, and operations. This holistic approach ensures coherence across workstreams and eliminates the coordination overhead of managing multiple advisory providers.",
  },
  {
    title: "Transparency and Integrity",
    body: "ALINABSS operates with full transparency in pricing, methodology, and deliverables. We believe in building trust through honest communication, clear expectations, and a commitment to delivering what we promise — without hidden fees or scope creep.",
  },
  {
    title: "Commitment to Sustainability and ESG",
    body: "Sustainability is not an add-on service — it is embedded in how we advise. ALINABSS integrates ESG considerations into every engagement, helping clients build businesses that are not only profitable but also responsible, resilient, and aligned with evolving global standards.",
  },
];

export default function CoverageDifferentiatorsSection() {
  return (
    <SectionWrapper background="white">
      <SectionHeader overline="Our Difference" title="Why Choose ALINABSS." showAccentRule={false} />

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {DIFFERENTIATORS.map((item, index) => (
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
