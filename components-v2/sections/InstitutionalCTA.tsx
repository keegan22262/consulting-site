"use client";

import { useState } from "react";
import Link from "next/link";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";

interface InstitutionalCTAProps {
  overline?: string;
  headline: string;
  body: string;
  buttonLabel?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  contactFrom?: string;
}

export default function InstitutionalCTA({
  overline = "Next Step",
  headline,
  body,
  buttonLabel = "Schedule an Introduction",
  secondaryLabel,
  secondaryHref,
  contactFrom,
}: InstitutionalCTAProps) {
  const [primaryHover, setPrimaryHover] = useState(false);
  const [secondaryHover, setSecondaryHover] = useState(false);
  const isMobile = useResponsiveValue({ desktop: false, tablet: false, mobile: true });
  const px = useResponsiveValue({ desktop: "32px", tablet: "32px", mobile: "24px" });
  const padV = useResponsiveValue({ desktop: "120px", tablet: "88px", mobile: "64px" });
  const h2Size = useResponsiveValue({ desktop: "var(--text-h2)", tablet: "var(--text-h2)", mobile: "1.5rem" });
  const h2LineHeight = useResponsiveValue({ desktop: "var(--line-height-h2)", tablet: "var(--line-height-h2)", mobile: "1.25" });
  const fromParam = contactFrom ?? "cta";
  const contextParam = encodeURIComponent(headline);

  return (
    <section style={{ backgroundColor: "var(--a700)" }}>
      <div
        style={{
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingTop: padV,
          paddingRight: px,
          paddingBottom: padV,
          paddingLeft: px,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "var(--text-caption)",
            fontWeight: 600,
            color: "rgba(255, 255, 255, 0.5)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            display: "block",
            marginBottom: "8px",
          }}
        >
          {overline}
        </span>
        <h2
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: h2Size,
            fontWeight: 600,
            lineHeight: h2LineHeight,
            color: "#FFFFFF",
            letterSpacing: "-0.01em",
          }}
        >
          {headline}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: isMobile ? "var(--text-body)" : "var(--text-body-lg)",
            lineHeight: isMobile ? "var(--line-height-body)" : "var(--line-height-body-lg)",
            color: "var(--a200)",
            marginTop: "12px",
            maxWidth: "480px",
          }}
        >
          {body}
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            marginTop: "56px",
            width: "100%",
          }}
        >
          <Link
            href={`/contact?from=${fromParam}&context=${contextParam}`}
            onMouseEnter={() => setPrimaryHover(true)}
            onMouseLeave={() => setPrimaryHover(false)}
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "var(--text-body)",
              fontWeight: 600,
              lineHeight: "1",
              color: "var(--a700)",
              backgroundColor: primaryHover ? "var(--n100)" : "#FFFFFF",
              borderRadius: "4px",
              paddingTop: "16px",
              paddingBottom: "16px",
              paddingLeft: "40px",
              paddingRight: "40px",
              cursor: "pointer",
              transition: "background-color 120ms cubic-bezier(0.25, 0.1, 0.25, 1)",
              width: isMobile ? "100%" : "auto",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            {buttonLabel}
          </Link>
          {secondaryLabel && secondaryHref ? (
            <Link
              href={secondaryHref}
              onMouseEnter={() => setSecondaryHover(true)}
              onMouseLeave={() => setSecondaryHover(false)}
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "var(--text-caption)",
                fontWeight: 400,
                lineHeight: "1",
                color: secondaryHover ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.6)",
                cursor: "pointer",
                transition: "color 120ms cubic-bezier(0.25, 0.1, 0.25, 1)",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                textDecorationColor: secondaryHover ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.3)",
              }}
            >
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
