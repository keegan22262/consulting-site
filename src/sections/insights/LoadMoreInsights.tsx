"use client";

import { useState } from "react";

interface LoadMoreInsightsProps {
  onClick: () => void;
}

export default function LoadMoreInsights({ onClick }: LoadMoreInsightsProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "var(--font-primary)",
        fontSize: "0.875rem",
        fontWeight: 600,
        color: hovered ? "#FFFFFF" : "var(--a700)",
        backgroundColor: hovered ? "var(--a700)" : "#FFFFFF",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "var(--a700)",
        borderRadius: "8px",
        paddingTop: "14px",
        paddingBottom: "14px",
        paddingLeft: "40px",
        paddingRight: "40px",
        cursor: "pointer",
        transition: "all 200ms ease",
      }}
    >
      Load More Insights
    </button>
  );
}
