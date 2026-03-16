"use client";

import { useState } from "react";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";
import type { TopicFilter } from "@/src/sections/insights/data";

interface InsightFilterBarProps {
  filters: TopicFilter[];
  activeFilter: string;
  onFilterChange: (label: string) => void;
}

export default function InsightFilterBar({
  filters,
  activeFilter,
  onFilterChange,
}: InsightFilterBarProps) {
  const marginBottom = useResponsiveValue({ desktop: "48px", tablet: "40px", mobile: "32px" });

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        marginBottom: marginBottom,
        paddingBottom: "24px",
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        borderBottomColor: "var(--n200)",
      }}
    >
      {filters.map((topic) => (
        <TopicPill
          key={topic.label}
          label={topic.label}
          isActive={activeFilter === topic.label}
          onClick={() => onFilterChange(topic.label)}
        />
      ))}
    </div>
  );
}

function TopicPill({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const bgColor = isActive ? "var(--a700)" : hovered ? "var(--a50)" : "#FFFFFF";
  const textColor = isActive ? "#FFFFFF" : "var(--n700)";
  const borderColor = isActive ? "var(--a700)" : "var(--n200)";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "var(--font-primary)",
        fontSize: "0.8125rem",
        fontWeight: isActive ? 600 : 400,
        color: textColor,
        backgroundColor: bgColor,
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: borderColor,
        borderRadius: "100px",
        paddingTop: "8px",
        paddingBottom: "8px",
        paddingLeft: "20px",
        paddingRight: "20px",
        cursor: "pointer",
        transition: "all 200ms ease",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}
