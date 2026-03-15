"use client";

import { useResponsiveValue } from "@/lib/breakpoints";
import { C, F, MAX_WIDTH, TRANSFORMATION_FORCES } from "./data";

export default function TransformationForcesSection() {
  const gridCols = useResponsiveValue("repeat(3, 1fr)", "repeat(2, 1fr)", "1fr");
  const gridGap = useResponsiveValue("32px", "24px", "20px");

  return (
    <section style={{ backgroundColor: C.white }}>
      <div
        style={{
          maxWidth: MAX_WIDTH,
          margin: "0 auto",
          paddingTop: useResponsiveValue("96px", "72px", "56px"),
          paddingBottom: useResponsiveValue("96px", "72px", "56px"),
          paddingLeft: useResponsiveValue("32px", "32px", "24px"),
          paddingRight: useResponsiveValue("32px", "32px", "24px"),
        }}
      >
        <span
          style={{
            fontFamily: F,
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: C.n500,
            display: "block",
            marginBottom: "12px",
          }}
        >
          Sector Transformation
        </span>
        <h2
          style={{
            fontFamily: F,
            fontSize: "var(--text-h2)",
            fontWeight: 600,
            lineHeight: "var(--line-height-h2)",
            color: C.n900,
          }}
        >
          Forces reshaping industries.
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: gridCols,
            gap: gridGap,
            marginTop: useResponsiveValue("52px", "40px", "32px"),
          }}
        >
          {TRANSFORMATION_FORCES.map((force, i) => (
            <div
              key={force.title}
              style={{
                borderTopWidth: "2px",
                borderTopStyle: "solid",
                borderTopColor: C.a700,
                borderBottomWidth: "0",
                borderLeftWidth: "0",
                borderRightWidth: "0",
                paddingTop: "24px",
              }}
            >
              <span
                style={{
                  fontFamily: F,
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  color: C.n400,
                  letterSpacing: "0.02em",
                  fontVariantNumeric: "tabular-nums",
                  display: "block",
                  marginBottom: "12px",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                style={{
                  fontFamily: F,
                  fontSize: "var(--text-body)",
                  fontWeight: 600,
                  lineHeight: "var(--line-height-body)",
                  color: C.n900,
                }}
              >
                {force.title}
              </h3>
              <p
                style={{
                  fontFamily: F,
                  fontSize: "var(--text-caption)",
                  lineHeight: "1.55",
                  color: C.n600,
                  marginTop: "8px",
                  maxWidth: "48ch",
                }}
              >
                {force.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
