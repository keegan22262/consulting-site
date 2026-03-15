"use client";

import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";

export interface DataHighlightItem {
  metric: string;
  label: string;
  context?: string;
}

interface DataHighlightProps {
  items: DataHighlightItem[];
}

export default function DataHighlight({ items }: DataHighlightProps) {
  const gridCols = useResponsiveValue({
    desktop:
      items.length >= 3
        ? "repeat(3, 1fr)"
        : `repeat(${Math.max(items.length, 1)}, 1fr)`,
    tablet:
      items.length >= 2
        ? "repeat(2, 1fr)"
        : "1fr",
    mobile: "1fr",
  });
  const gap = useResponsiveValue({ desktop: "24px", tablet: "20px", mobile: "16px" });
  const metricSize = useResponsiveValue({ desktop: "2rem", tablet: "1.75rem", mobile: "1.5rem" });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: gridCols,
        gap,
        margin: "40px 0",
        maxWidth: "720px",
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            padding: "24px 20px",
            backgroundColor: "var(--n50)",
            borderRadius: "4px",
            borderTop: "2px solid var(--a700)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: metricSize,
              fontWeight: 600,
              color: "var(--a700)",
              lineHeight: "1.1",
              display: "block",
            }}
          >
            {item.metric}
          </span>
          <span
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "var(--text-caption)",
              fontWeight: 600,
              color: "var(--n900)",
              display: "block",
              marginTop: "8px",
            }}
          >
            {item.label}
          </span>
          {item.context ? (
            <p
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "0.6875rem",
                lineHeight: "1.5",
                color: "var(--n500)",
                marginTop: "8px",
              }}
            >
              {item.context}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
