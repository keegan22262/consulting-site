"use client";

import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";

interface SummaryBlockProps {
  title?: string;
  points: string[];
}

export default function SummaryBlock({ title = "Key Takeaways", points }: SummaryBlockProps) {
  const padding = useResponsiveValue({ desktop: "32px", tablet: "28px", mobile: "24px" });

  return (
    <div
      style={{
        backgroundColor: "var(--n50)",
        borderLeft: "3px solid var(--a700)",
        borderRadius: "0 4px 4px 0",
        padding,
        maxWidth: "720px",
        margin: "0 0 48px 0",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "0.6875rem",
          fontWeight: 600,
          color: "var(--a700)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          display: "block",
          marginBottom: "16px",
        }}
      >
        {title}
      </span>

      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {points.map((point, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "0.625rem",
                fontWeight: 700,
                color: "var(--a700)",
                minWidth: "16px",
                marginTop: "3px",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <p
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "var(--text-caption)",
                lineHeight: "1.6",
                color: "var(--n700)",
                margin: 0,
              }}
            >
              {point}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
