"use client";

import { useState } from "react";
import Link from "next/link";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";

const IMG_HERO =
  "https://images.unsplash.com/photo-1709334197341-122c6fd5ae1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRpZ2l0YWwlMjBncmlkJTIwbmV0d29yayUyMGRhcmslMjBtaW5pbWFsfGVufDF8fHx8MTc3MTk1OTA3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export default function CoverageHero() {
  const [primaryHover, setPrimaryHover] = useState(false);
  const [secondaryHover, setSecondaryHover] = useState(false);
  const isMobile = useResponsiveValue({ desktop: false, tablet: false, mobile: true });
  const px = useResponsiveValue({ desktop: "32px", tablet: "32px", mobile: "24px" });
  const padTop = useResponsiveValue({ desktop: "128px", tablet: "96px", mobile: "72px" });
  const padBottom = useResponsiveValue({ desktop: "96px", tablet: "72px", mobile: "56px" });
  const titleSize = useResponsiveValue({ desktop: "3.5rem", tablet: "2.75rem", mobile: "2.25rem" });
  const titleLineHeight = useResponsiveValue({ desktop: "1.08", tablet: "1.12", mobile: "1.15" });
  const titleLetterSpacing = useResponsiveValue({ desktop: "-0.02em", tablet: "-0.015em", mobile: "-0.005em" });

  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${IMG_HERO})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(20%) contrast(1.05)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(8,18,30,0.4) 0%, rgba(8,18,30,0.55) 55%, rgba(8,18,30,0.7) 100%)",
        }}
      />

      <div style={{ position: "relative", padding: `${padTop} 0 ${padBottom}` }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: `0 ${px}` }}>
          <div style={{ marginBottom: "32px", color: "rgba(255,255,255,0.8)" }}>
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              RSL / Coverage
            </span>
          </div>

          <div style={{ maxWidth: isMobile ? "100%" : "720px" }}>
            <span
              style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "rgba(255,255,255,0.7)",
                display: "block",
                marginBottom: "16px",
              }}
            >
              Intelligence Dashboard
            </span>
            <h1
              style={{
                fontSize: titleSize,
                fontWeight: 600,
                lineHeight: titleLineHeight,
                letterSpacing: titleLetterSpacing,
                color: "#FFFFFF",
              }}
            >
              Capability × Industry Coverage
            </h1>
            <p
              style={{
                marginTop: "12px",
                fontSize: "var(--text-body-lg)",
                lineHeight: "var(--line-height-body-lg)",
                color: "rgba(191, 219, 254, 0.85)",
                maxWidth: "60ch",
              }}
            >
              Integrated advisory across strategy, digital, finance, people, sustainability, and public sector — aligned to the real challenges organizations face.
            </p>

            <div
              style={{
                marginTop: "48px",
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "stretch" : "center",
                gap: "20px",
              }}
            >
              <Link
                href="/services"
                onMouseEnter={() => setPrimaryHover(true)}
                onMouseLeave={() => setPrimaryHover(false)}
                style={{
                  display: "inline-block",
                  textAlign: "center",
                  fontSize: "var(--text-body)",
                  fontWeight: 600,
                  lineHeight: "1",
                  color: "#1B3A5C",
                  backgroundColor: primaryHover ? "#E2E8F0" : "#FFFFFF",
                  borderRadius: "12px",
                  padding: "16px 24px",
                  textDecoration: "none",
                  transition: "background-color 180ms ease",
                }}
              >
                Explore Services
              </Link>
              <Link
                href="/industries"
                onMouseEnter={() => setSecondaryHover(true)}
                onMouseLeave={() => setSecondaryHover(false)}
                style={{
                  fontSize: "var(--text-body)",
                  fontWeight: 400,
                  color: secondaryHover ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.7)",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                  textDecorationColor: secondaryHover ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.3)",
                  textDecorationThickness: secondaryHover ? "2px" : "1px",
                  transition: "color 180ms ease",
                  textAlign: isMobile ? "center" : undefined,
                }}
              >
                Explore Industries
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
