"use client";

import { useState } from "react";
import Link from "next/link";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";

const CTA_BG_IMAGE =
  "https://images.unsplash.com/photo-1565688527174-775059ac429c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGVjdXRpdmUlMjBhZHZpc29yeSUyMGNvbnN1bHRpbmclMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc3MzMyNzQ0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export default function AboutCTASection() {
  const sectionHeight = useResponsiveValue({ desktop: "560px", tablet: "520px", mobile: "480px" });
  const px = useResponsiveValue({ desktop: "64px", tablet: "40px", mobile: "24px" });
  const headingSize = useResponsiveValue({ desktop: "2.5rem", tablet: "2rem", mobile: "1.75rem" });
  const bodySize = useResponsiveValue({ desktop: "1.0625rem", tablet: "1.0625rem", mobile: "0.9375rem" });
  const isMobile = useResponsiveValue({ desktop: false, tablet: false, mobile: true });
  const [hoverPrimary, setHoverPrimary] = useState(false);
  const [hoverSecondary, setHoverSecondary] = useState(false);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: sectionHeight,
        overflow: "hidden",
        marginTop: "80px",
      }}
    >
      <img
        src={CTA_BG_IMAGE}
        alt="Advisory team collaborating with executives - institutional engagement"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: isMobile
            ? "linear-gradient(to top, rgba(12, 28, 46, 0.92) 0%, rgba(12, 28, 46, 0.7) 50%, rgba(12, 28, 46, 0.5) 100%)"
            : "linear-gradient(to right, rgba(12, 28, 46, 0.92) 0%, rgba(12, 28, 46, 0.75) 45%, rgba(12, 28, 46, 0.3) 80%, transparent 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          height: "100%",
          display: "flex",
          alignItems: isMobile ? "flex-end" : "center",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            width: "100%",
            paddingTop: isMobile ? "40px" : "0",
            paddingBottom: isMobile ? "48px" : "0",
            paddingLeft: px,
            paddingRight: px,
            boxSizing: "border-box",
          }}
        >
          <div style={{ maxWidth: isMobile ? "100%" : "520px" }}>
            <h2
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: headingSize,
                fontWeight: 600,
                lineHeight: "1.12",
                letterSpacing: "-0.02em",
                color: "#FFFFFF",
                marginBottom: "20px",
              }}
            >
              Begin a Conversation
            </h2>
            <p
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: bodySize,
                lineHeight: "1.6",
                color: "rgba(255, 255, 255, 0.82)",
                marginBottom: "36px",
              }}
            >
              Engage with our advisory team to explore how we can support your institution&apos;s strategic transformation.
            </p>

            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: "16px" }}>
              <Link
                href="/contact"
                onMouseEnter={() => setHoverPrimary(true)}
                onMouseLeave={() => setHoverPrimary(false)}
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: hoverPrimary ? "#1B3A5C" : "#FFFFFF",
                  backgroundColor: hoverPrimary ? "#FFFFFF" : "#1B3A5C",
                  border: `1px solid ${hoverPrimary ? "#FFFFFF" : "#1B3A5C"}`,
                  borderRadius: "12px",
                  padding: "14px 28px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "color 180ms ease, background-color 180ms ease, border-color 180ms ease",
                }}
              >
                Schedule an Introduction
              </Link>

              <Link
                href="/services"
                onMouseEnter={() => setHoverSecondary(true)}
                onMouseLeave={() => setHoverSecondary(false)}
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: hoverSecondary ? "#1B3A5C" : "#FFFFFF",
                  backgroundColor: hoverSecondary ? "#FFFFFF" : "transparent",
                  border: `1px solid ${hoverSecondary ? "#FFFFFF" : "rgba(255, 255, 255, 0.4)"}`,
                  borderRadius: "12px",
                  padding: "14px 28px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "color 180ms ease, background-color 180ms ease, border-color 180ms ease",
                }}
              >
                Explore Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
