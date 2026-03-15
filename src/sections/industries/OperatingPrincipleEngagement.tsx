"use client";

import Link from "next/link";
import { useState } from "react";
import { useResponsiveValue } from "@/lib/breakpoints";
import { BORDER_RADIUS, C, F, M_CURVE, M_DUR, MAX_WIDTH, PHILOSOPHY_IMAGES } from "./data";

export default function OperatingPrincipleEngagement() {
  const isMobile = useResponsiveValue(false, false, true);
  const [imgHover, setImgHover] = useState(false);
  const [primaryHover, setPrimaryHover] = useState(false);
  const [secondaryHover, setSecondaryHover] = useState(false);

  const px = useResponsiveValue("32px", "32px", "24px");
  const padV = useResponsiveValue("96px", "64px", "48px");

  return (
    <section style={{ backgroundColor: C.n900 }}>
      <div
        style={{
          maxWidth: MAX_WIDTH,
          margin: "0 auto",
          paddingTop: padV,
          paddingBottom: padV,
          paddingLeft: px,
          paddingRight: px,
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: useResponsiveValue("64px", "40px", "40px"),
        }}
      >
        <div>
          <span
            style={{
              fontFamily: F,
              fontSize: "var(--text-caption)",
              fontWeight: 600,
              color: C.n500,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              display: "block",
              marginBottom: "16px",
            }}
          >
            Operating Principle
          </span>
          <p
            style={{
              fontFamily: F,
              fontSize: useResponsiveValue("var(--text-h3)", "var(--text-body-lg)", "var(--text-body-lg)"),
              lineHeight: useResponsiveValue("var(--line-height-h3)", "1.4", "1.4"),
              fontWeight: 600,
              color: C.white,
              maxWidth: "48ch",
              letterSpacing: "-0.005em",
            }}
          >
            Sector fluency is not a positioning claim. It is an operational requirement embedded in every
            engagement methodology, staffing decision, and quality governance protocol.
          </p>
          <div
            style={{ width: "48px", height: "2px", backgroundColor: C.n700, marginTop: "24px", marginBottom: "24px" }}
          />

          <Link
            href="/about"
            onMouseEnter={() => setImgHover(true)}
            onMouseLeave={() => setImgHover(false)}
            style={{
              display: "block",
              position: "relative",
              height: "180px",
              borderRadius: BORDER_RADIUS,
              overflow: "hidden",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${PHILOSOPHY_IMAGES[3]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "grayscale(40%) contrast(1.1)",
                opacity: imgHover ? 0.5 : 0.35,
                transition: `opacity ${M_DUR} ${M_CURVE}`,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "16px",
                left: "16px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span
                style={{
                  fontFamily: F,
                  fontSize: "var(--text-caption)",
                  fontWeight: 600,
                  color: C.white,
                  letterSpacing: "0.02em",
                }}
              >
                View our principles
              </span>
              <span style={{ color: C.white, fontSize: "0.8em" }}>→</span>
            </div>
          </Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <span
            style={{
              fontFamily: F,
              fontSize: "var(--text-caption)",
              fontWeight: 600,
              color: C.n500,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              display: "block",
              marginBottom: "16px",
            }}
          >
            Sector Engagement
          </span>
          <h3
            style={{
              fontFamily: F,
              fontSize: useResponsiveValue("var(--text-h2)", "var(--text-h3)", "var(--text-body-lg)"),
              fontWeight: 600,
              lineHeight: useResponsiveValue("var(--line-height-h2)", "var(--line-height-h3)", "1.3"),
              color: C.white,
            }}
          >
            Context before commitment.
          </h3>
          <p
            style={{
              fontFamily: F,
              fontSize: "var(--text-body)",
              lineHeight: "var(--line-height-body)",
              color: C.n400,
              marginTop: "12px",
              maxWidth: "48ch",
            }}
          >
            Every industry engagement begins with a structured sector diagnostic — mapping regulatory,
            competitive, and operational context before defining advisory scope.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: "12px",
              marginTop: "32px",
            }}
          >
            <Link
              href="/contact"
              onMouseEnter={() => setPrimaryHover(true)}
              onMouseLeave={() => setPrimaryHover(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: F,
                fontSize: "var(--text-body)",
                fontWeight: 600,
                lineHeight: "1",
                color: C.a700,
                backgroundColor: primaryHover ? C.n100 : C.white,
                borderRadius: BORDER_RADIUS,
                paddingTop: "14px",
                paddingBottom: "14px",
                paddingLeft: "24px",
                paddingRight: "24px",
                textDecoration: "none",
                cursor: "pointer",
                transition: `background-color ${M_DUR} ${M_CURVE}`,
              }}
            >
              Begin a conversation
            </Link>
            <Link
              href="/services"
              onMouseEnter={() => setSecondaryHover(true)}
              onMouseLeave={() => setSecondaryHover(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: F,
                fontSize: "var(--text-body)",
                fontWeight: 600,
                lineHeight: "1",
                color: secondaryHover ? C.white : C.n400,
                backgroundColor: "transparent",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: secondaryHover ? C.n500 : C.n700,
                borderRadius: BORDER_RADIUS,
                paddingTop: "14px",
                paddingBottom: "14px",
                paddingLeft: "24px",
                paddingRight: "24px",
                textDecoration: "none",
                cursor: "pointer",
                transition: `color ${M_DUR} ${M_CURVE}, border-color ${M_DUR} ${M_CURVE}`,
              }}
            >
              Download advisory overview
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
