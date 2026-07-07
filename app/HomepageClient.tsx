"use client";
import Link from "next/link";
import ConstellationHero from "@/components-v2/sections/ConstellationHero";

type FeaturedInsight = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
} | null;

type SupportingInsight = {
  _id: string;
  title: string;
  slug: string;
  category: string;
};

interface HomepageClientProps {
  featured: FeaturedInsight;
  supporting: SupportingInsight[];
}

const FEATURED_CAPABILITIES = [
  {
    num: "01",
    name: "Strategy & Corporate Transformation",
    desc: "Enterprise strategy, operating model design, and transformation roadmaps.",
    href: "/services/strategy",
  },
  {
    num: "02",
    name: "Digital & AI Transformation",
    desc: "Digital modernisation, AI readiness, and technology implementation.",
    href: "/services/digital",
  },
  {
    num: "03",
    name: "Financial Advisory, Audit & Risk",
    desc: "Financial resilience, governance architecture, and risk management.",
    href: "/services/finance",
  },
] as const;

const FEATURED_INDUSTRIES = [
  {
    num: "01",
    name: "Financial Services",
    desc: "Banks, capital markets, insurers, fintechs",
    href: "/industries/financial-services",
    accent: "#5483B3",
  },
  {
    num: "02",
    name: "Public Sector & Government",
    desc: "Ministries, agencies, parastatals",
    href: "/industries/public-sector-government",
    accent: "#7DA0CA",
  },
  {
    num: "03",
    name: "Technology, Media & Telecom",
    desc: "Platforms, telcos, digital infrastructure",
    href: "/industries/technology-digital",
    accent: "#5483B3",
  },
  {
    num: "04",
    name: "Energy & Natural Resources",
    desc: "Oil, gas, utilities, renewables, mining",
    href: "/industries/energy-resources",
    accent: "#7DA0CA",
  },
] as const;

const FALLBACK_FEATURED = {
  _id: "f1",
  title: "AI Governance as a Competitive Differentiator",
  slug: "ai-governance-competitive-differentiator",
  excerpt: "How institutional AI governance frameworks are becoming the defining capability separating leading organisations from the rest in Africa\'s most dynamic sectors.",
  category: "Technology",
};

const FALLBACK_SUPPORTING = [
  { _id: "s1", title: "Africa Growth Outlook: Execution Determines Trajectory", slug: "africa-growth-outlook", category: "Strategy" },
  { _id: "s2", title: "Connectivity, Digital Identity, and Payment Rails Form a Growth Stack", slug: "connectivity-digital-identity", category: "Technology" },
];

/* ── Shared style tokens ───────────────────────────────────────────── */
const f = {
  heading: "var(--font-playfair), Georgia, serif",
  body: "var(--font-dm-sans), system-ui, sans-serif",
};

const overline = (color = "rgba(125,160,202,0.6)"): React.CSSProperties => ({
  fontFamily: f.body,
  fontSize: "11px",
  textTransform: "uppercase" as const,
  letterSpacing: "6px",
  fontWeight: 500,
  color,
  marginBottom: "12px",
  display: "block",
});

/* ════════════════════════════════════════════════════════════════════
   HOMEPAGE — 6 sections, no images, pure typography + colour
════════════════════════════════════════════════════════════════════ */
export default function HomepageClient({ featured, supporting }: HomepageClientProps) {
  const feat = featured ?? FALLBACK_FEATURED;
  const supp = supporting.length >= 2 ? supporting : FALLBACK_SUPPORTING;

  return (
    <>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1 — HERO
          Constellation canvas handles this entirely. Keep as-is.
      ───────────────────────────────────────────────────────────── */}
      <ConstellationHero />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2 — THE MANDATE
          Dark navy. Pure typography. 3 stacked stats.
          No image. The colour and type do the work.
      ───────────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#021024" }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "96px 40px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center",
        }}>

          {/* Left — headline and body */}
          <div>
            <span style={overline()}>THE MANDATE</span>
            <h2 style={{
              fontFamily: f.heading,
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 400,
              color: "#FFFFFF",
              lineHeight: 1.15,
              marginBottom: "28px",
              letterSpacing: "-0.02em",
            }}>
              We don&apos;t just advise.{" "}
              <span style={{ color: "#7DA0CA" }}>
                We architect outcomes.
              </span>
            </h2>
            <p style={{
              fontFamily: f.body,
              fontSize: "17px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.8,
              marginBottom: "20px",
              maxWidth: "480px",
            }}>
              Rill Singh Limited partners with growth-stage companies, institutional
              operators, and sovereign entities across Africa — building the strategic,
              financial, and operational infrastructure that compounds over time.
            </p>
            <p style={{
              fontFamily: f.body,
              fontSize: "16px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.8,
              maxWidth: "480px",
            }}>
              Ten integrated disciplines. One delivery architecture. Zero tolerance
              for recommendations without accountability.
            </p>
          </div>

          {/* Right — 3 stats, each with its own animated accent border */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {[
              { number: "10", label: "Advisory Disciplines", desc: "Integrated under one delivery architecture" },
              { number: "11", label: "Industry Sectors", desc: "From financial services to public infrastructure" },
              { number: "100%", label: "Senior-Led", desc: "The people you meet are the people who deliver" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  borderLeft: "2px solid rgba(84,131,179,0.25)",
                  paddingLeft: "32px",
                  paddingTop: "8px",
                  paddingBottom: "32px",
                  transition: "border-color 0.25s ease, padding-left 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderLeftColor = "#7DA0CA";
                  e.currentTarget.style.paddingLeft = "40px";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderLeftColor = "rgba(84,131,179,0.25)";
                  e.currentTarget.style.paddingLeft = "32px";
                }}
              >
                <span style={{
                  display: "block",
                  fontFamily: f.heading,
                  fontSize: "56px",
                  fontWeight: 400,
                  color: "#FFFFFF",
                  lineHeight: 1,
                  marginBottom: "8px",
                }}>
                  {stat.number}
                </span>
                <span style={{
                  display: "block",
                  fontFamily: f.body,
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#7DA0CA",
                  marginBottom: "6px",
                }}>
                  {stat.label}
                </span>
                <span style={{
                  display: "block",
                  fontFamily: f.body,
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.3)",
                  lineHeight: 1.5,
                }}>
                  {stat.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3 — 3 FEATURED CAPABILITIES
          Off-white background. Editorial list. Hover interactions.
      ───────────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#F8FBFF" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "96px 40px" }}>

          {/* Section header — label left, link right */}
          <div style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "48px",
            flexWrap: "wrap",
            gap: "16px",
          }}>
            <div>
              <span style={overline("#5483B3")}>CAPABILITIES</span>
              <h2 style={{
                fontFamily: f.heading,
                fontSize: "clamp(26px, 3.5vw, 40px)",
                fontWeight: 400,
                color: "#021024",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                margin: 0,
              }}>
                What We Do
              </h2>
            </div>
            <Link href="/services" style={{
              fontFamily: f.body,
              fontSize: "13px",
              color: "#5483B3",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              paddingBottom: "4px",
              borderBottom: "1px solid rgba(84,131,179,0.3)",
            }}>
              View all 10 capabilities →
            </Link>
          </div>

          {/* 3 capability rows */}
          <div style={{ borderTop: "1px solid #E2E8F0" }}>
            {FEATURED_CAPABILITIES.map((cap) => (
              <Link
                key={cap.href}
                href={cap.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "28px 0",
                  borderBottom: "1px solid #E2E8F0",
                  textDecoration: "none",
                  gap: "24px",
                  transition: "padding-left 0.2s ease, background 0.2s ease",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.paddingLeft = "16px";
                  const n = e.currentTarget.querySelector(".cap-name") as HTMLElement;
                  const d = e.currentTarget.querySelector(".cap-desc") as HTMLElement;
                  const a = e.currentTarget.querySelector(".cap-arrow") as HTMLElement;
                  const b = e.currentTarget.querySelector(".cap-bar") as HTMLElement;
                  if (n) n.style.color = "#5483B3";
                  if (d) d.style.color = "#4A5568";
                  if (a) { a.style.opacity = "1"; a.style.transform = "translateX(4px)"; }
                  if (b) b.style.height = "100%";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.paddingLeft = "0";
                  const n = e.currentTarget.querySelector(".cap-name") as HTMLElement;
                  const d = e.currentTarget.querySelector(".cap-desc") as HTMLElement;
                  const a = e.currentTarget.querySelector(".cap-arrow") as HTMLElement;
                  const b = e.currentTarget.querySelector(".cap-bar") as HTMLElement;
                  if (n) n.style.color = "#021024";
                  if (d) d.style.color = "#6B7280";
                  if (a) { a.style.opacity = "0"; a.style.transform = "translateX(0)"; }
                  if (b) b.style.height = "0%";
                }}
              >
                {/* Animated left accent bar */}
                <div className="cap-bar" style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "2px",
                  height: "0%",
                  backgroundColor: "#5483B3",
                  transition: "height 0.2s ease",
                }} />

                {/* Row number */}
                <span style={{
                  fontFamily: f.body,
                  fontSize: "13px",
                  color: "#9CA3AF",
                  flexShrink: 0,
                  width: "32px",
                }}>
                  {cap.num}
                </span>

                {/* Name + descriptor */}
                <div style={{ flex: 1 }}>
                  <span className="cap-name" style={{
                    display: "block",
                    fontFamily: f.heading,
                    fontSize: "clamp(17px, 2vw, 22px)",
                    fontWeight: 400,
                    color: "#021024",
                    marginBottom: "5px",
                    transition: "color 0.2s ease",
                  }}>
                    {cap.name}
                  </span>
                  <span className="cap-desc" style={{
                    display: "block",
                    fontFamily: f.body,
                    fontSize: "14px",
                    color: "#6B7280",
                    lineHeight: 1.5,
                    transition: "color 0.2s ease",
                  }}>
                    {cap.desc}
                  </span>
                </div>

                {/* Arrow — hidden until hover */}
                <span className="cap-arrow" style={{
                  fontSize: "20px",
                  color: "#5483B3",
                  opacity: 0,
                  flexShrink: 0,
                  transition: "opacity 0.2s ease, transform 0.2s ease",
                }} aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4 — FEATURED INSIGHT + 2 SUPPORTING
          Dark navy. Pure typography. No images.
          Featured insight as a large card with coloured left border.
      ───────────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#021024" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "96px 40px" }}>

          {/* Header */}
          <div style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "48px",
            flexWrap: "wrap",
            gap: "16px",
          }}>
            <div>
              <span style={overline()}>LATEST THINKING</span>
              <h2 style={{
                fontFamily: f.heading,
                fontSize: "clamp(26px, 3.5vw, 40px)",
                fontWeight: 400,
                color: "#FFFFFF",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                margin: 0,
                maxWidth: "520px",
              }}>
                Ideas shaping tomorrow&apos;s institutions.
              </h2>
            </div>
            <Link href="/insights" style={{
              fontFamily: f.body,
              fontSize: "13px",
              color: "#5483B3",
              textDecoration: "none",
              paddingBottom: "4px",
              borderBottom: "1px solid rgba(84,131,179,0.3)",
            }}>
              Explore all insights →
            </Link>
          </div>

          {/* Featured insight — large card with left border accent */}
          <Link href={`/insights/${feat.slug}`} style={{
            display: "block",
            backgroundColor: "#052659",
            borderLeft: "4px solid #5483B3",
            padding: "48px",
            textDecoration: "none",
            marginBottom: "2px",
            transition: "background 0.2s ease, border-color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#0a3070";
            e.currentTarget.style.borderLeftColor = "#7DA0CA";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#052659";
            e.currentTarget.style.borderLeftColor = "#5483B3";
          }}>
            <div style={{ display: "flex", gap: "48px", flexWrap: "wrap", alignItems: "flex-start" }}>
              <div style={{ flex: "1 1 300px" }}>
                <span style={overline("#5483B3")}>{feat.category}</span>
                <h3 style={{
                  fontFamily: f.heading,
                  fontSize: "clamp(20px, 2.5vw, 30px)",
                  fontWeight: 400,
                  color: "#FFFFFF",
                  lineHeight: 1.25,
                  marginBottom: "16px",
                  letterSpacing: "-0.01em",
                }}>
                  {feat.title}
                </h3>
              </div>
              <div style={{ flex: "1 1 280px" }}>
                <p style={{
                  fontFamily: f.body,
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.75,
                  marginBottom: "24px",
                }}>
                  {feat.excerpt}
                </p>
                <span style={{
                  fontFamily: f.body,
                  fontSize: "14px",
                  color: "#7DA0CA",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}>
                  Read article →
                </span>
              </div>
            </div>
          </Link>

          {/* 2 supporting insights — text only, side by side */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2px",
          }}>
            {supp.map((ins) => (
              <Link key={ins._id} href={`/insights/${ins.slug}`} style={{
                display: "block",
                backgroundColor: "rgba(255,255,255,0.03)",
                padding: "28px 32px",
                textDecoration: "none",
                borderLeft: "1px solid rgba(84,131,179,0.15)",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
                const t = e.currentTarget.querySelector(".ins-t") as HTMLElement;
                if (t) t.style.color = "#7DA0CA";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)";
                const t = e.currentTarget.querySelector(".ins-t") as HTMLElement;
                if (t) t.style.color = "#FFFFFF";
              }}>
                <span style={{ ...overline("#5483B3"), marginBottom: "10px" }}>{ins.category}</span>
                <span className="ins-t" style={{
                  fontFamily: f.heading,
                  fontSize: "17px",
                  fontWeight: 400,
                  color: "#FFFFFF",
                  lineHeight: 1.4,
                  display: "block",
                  transition: "color 0.2s ease",
                }}>
                  {ins.title}
                </span>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5 — 4 FEATURED INDUSTRIES
          White background. 2x2 grid. Clean tiles.
      ───────────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#FFFFFF" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "96px 40px" }}>

          {/* Header */}
          <div style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "48px",
            flexWrap: "wrap",
            gap: "16px",
          }}>
            <div>
              <span style={overline("#5483B3")}>SECTORS</span>
              <h2 style={{
                fontFamily: f.heading,
                fontSize: "clamp(26px, 3.5vw, 40px)",
                fontWeight: 400,
                color: "#021024",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                margin: 0,
              }}>
                Industries We Serve
              </h2>
            </div>
            <Link href="/industries" style={{
              fontFamily: f.body,
              fontSize: "13px",
              color: "#5483B3",
              textDecoration: "none",
              paddingBottom: "4px",
              borderBottom: "1px solid rgba(84,131,179,0.3)",
            }}>
              View all 11 industries →
            </Link>
          </div>

          {/* 2x2 grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1px",
            backgroundColor: "#E2E8F0",
          }}>
            {FEATURED_INDUSTRIES.map((ind) => (
              <Link key={ind.href} href={ind.href} style={{
                display: "flex",
                flexDirection: "column",
                padding: "40px 36px",
                backgroundColor: "#FFFFFF",
                textDecoration: "none",
                minHeight: "200px",
                transition: "background 0.2s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#F8FBFF";
                const n = e.currentTarget.querySelector(".ind-name") as HTMLElement;
                const a = e.currentTarget.querySelector(".ind-arrow") as HTMLElement;
                const bar = e.currentTarget.querySelector(".ind-bar") as HTMLElement;
                if (n) n.style.color = "#5483B3";
                if (a) a.style.transform = "translateX(4px)";
                if (bar) bar.style.width = "100%";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#FFFFFF";
                const n = e.currentTarget.querySelector(".ind-name") as HTMLElement;
                const a = e.currentTarget.querySelector(".ind-arrow") as HTMLElement;
                const bar = e.currentTarget.querySelector(".ind-bar") as HTMLElement;
                if (n) n.style.color = "#021024";
                if (a) a.style.transform = "translateX(0)";
                if (bar) bar.style.width = "0%";
              }}>

                {/* Top accent bar — animated on hover */}
                <div className="ind-bar" style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "2px",
                  width: "0%",
                  backgroundColor: ind.accent,
                  transition: "width 0.3s ease",
                }} />

                <span style={{
                  fontFamily: f.body,
                  fontSize: "11px",
                  color: "#9CA3AF",
                  marginBottom: "16px",
                }}>
                  {ind.num}
                </span>
                <span className="ind-name" style={{
                  fontFamily: f.heading,
                  fontSize: "22px",
                  fontWeight: 400,
                  color: "#021024",
                  lineHeight: 1.3,
                  marginBottom: "10px",
                  flex: 1,
                  transition: "color 0.2s ease",
                }}>
                  {ind.name}
                </span>
                <span style={{
                  fontFamily: f.body,
                  fontSize: "13px",
                  color: "#6B7280",
                  lineHeight: 1.5,
                  marginBottom: "24px",
                }}>
                  {ind.desc}
                </span>
                <span className="ind-arrow" style={{
                  fontSize: "14px",
                  color: "#5483B3",
                  transition: "transform 0.2s ease",
                  display: "block",
                }} aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6 — CTA
          Dark gradient. Centered. One dominant action.
      ───────────────────────────────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(160deg, #021024 0%, #052659 50%, #021024 100%)",
        padding: "120px 40px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <span style={{ ...overline("rgba(125,160,202,0.5)"), textAlign: "center" }}>
            NEXT STEP
          </span>
          <h2 style={{
            fontFamily: f.heading,
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 400,
            color: "#FFFFFF",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            marginBottom: "20px",
          }}>
            Begin a Conversation With Our Advisory Team.
          </h2>
          <p style={{
            fontFamily: f.body,
            fontSize: "17px",
            fontWeight: 300,
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.75,
            marginBottom: "40px",
            maxWidth: "480px",
            margin: "0 auto 40px",
          }}>
            Every engagement begins with a structured diagnostic conversation
            — before we propose anything.
          </p>

          {/* Primary CTA */}
          <Link href="/contact" style={{
            display: "inline-block",
            backgroundColor: "#5483B3",
            color: "#FFFFFF",
            padding: "16px 48px",
            borderRadius: "4px",
            fontFamily: f.body,
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "2px",
            textTransform: "uppercase",
            textDecoration: "none",
            marginBottom: "16px",
          }}>
            Schedule an Introduction
          </Link>

          {/* Secondary link — subordinate, barely visible */}
          <div style={{ marginTop: "16px" }}>
            <Link href="/about" style={{
              fontFamily: f.body,
              fontSize: "13px",
              color: "rgba(125,160,202,0.4)",
              textDecoration: "none",
            }}>
              Or explore our firm overview →
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}
