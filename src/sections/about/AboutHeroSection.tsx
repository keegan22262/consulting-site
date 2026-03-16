"use client";

import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";

const ABOUT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1669333490889-194e8f46a766?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOYWlyb2JpJTIwc2t5bGluZSUyMGNvcnBvcmF0ZSUyMHRvd2VycyUyMGFlcmlhbHxlbnwxfHx8fDE3NzMzMjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export default function AboutHeroSection() {
  const heroHeight = useResponsiveValue({ desktop: "620px", tablet: "520px", mobile: "420px" });
  const px = useResponsiveValue({ desktop: "48px", tablet: "32px", mobile: "24px" });
  const headingSize = useResponsiveValue({ desktop: "3.25rem", tablet: "2.5rem", mobile: "2rem" });
  const headingLineHeight = useResponsiveValue({ desktop: "1.08", tablet: "1.08", mobile: "1.15" });
  const headingLetterSpacing = useResponsiveValue({ desktop: "-0.025em", tablet: "-0.02em", mobile: "-0.01em" });
  const bodySize = useResponsiveValue({ desktop: "1.0625rem", tablet: "1.0625rem", mobile: "0.9375rem" });
  const topPad = useResponsiveValue({ desktop: "104px", tablet: "80px", mobile: "56px" });

  return (
    <section
      aria-labelledby="about-hero-title"
      style={{
        position: "relative",
        width: "100%",
        height: heroHeight,
        overflow: "hidden",
        backgroundColor: "#0F172A",
      }}
    >
      <img
        src={ABOUT_HERO_IMAGE}
        alt="Nairobi skyline and Britam Towers - institutional presence of Rill Singh Limited"
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
          background:
            "linear-gradient(135deg, rgba(8,18,30,0.5) 0%, rgba(8,18,30,0.2) 55%, transparent 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          height: "100%",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            marginLeft: "auto",
            marginRight: "auto",
            paddingTop: topPad,
            paddingLeft: px,
            paddingRight: px,
            boxSizing: "border-box",
          }}
        >
          <div style={{ marginBottom: "32px", color: "rgba(255, 255, 255, 0.85)" }}>
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              RSL / About
            </span>
          </div>

          <h1
            id="about-hero-title"
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: headingSize,
              fontWeight: 600,
              lineHeight: headingLineHeight,
              letterSpacing: headingLetterSpacing,
              color: "#FFFFFF",
              maxWidth: "600px",
            }}
          >
            About Rill Singh Limited
          </h1>
          <p
            style={{
              marginTop: "20px",
              maxWidth: "480px",
              fontFamily: "var(--font-primary)",
              fontSize: bodySize,
              lineHeight: "1.6",
              color: "rgba(255, 255, 255, 0.85)",
            }}
          >
            We partner with institutions to solve complex strategic challenges, build resilient organizations, and deliver long-term value.
          </p>
        </div>
      </div>
    </section>
  );
}
