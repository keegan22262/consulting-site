"use client";

import { useState } from "react";

interface PreviewBannerProps {
  active?: boolean;
  onExit?: () => void;
}

export default function PreviewBanner({ active = false, onExit }: PreviewBannerProps) {
  const [hovered, setHovered] = useState(false);

  if (!active) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "16px",
        left: "50%",
        marginLeft: "-160px",
        width: "320px",
        zIndex: 9999,
        backgroundColor: "var(--o600)",
        color: "#FFFFFF",
        fontFamily: "var(--font-primary)",
        fontSize: "var(--text-caption)",
        fontWeight: 600,
        padding: "12px 20px",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      <span>Preview Mode Active</span>
      <button
        type="button"
        onClick={onExit}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        disabled={!onExit}
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "var(--text-caption)",
          fontWeight: 600,
          color: "#FFFFFF",
          backgroundColor: hovered ? "rgba(255,255,255,0.2)" : "transparent",
          border: "1px solid rgba(255,255,255,0.5)",
          borderRadius: "4px",
          padding: "4px 12px",
          cursor: onExit ? "pointer" : "default",
          transition: "background-color 120ms cubic-bezier(0.25, 0.1, 0.25, 1)",
          opacity: onExit ? 1 : 0.6,
        }}
      >
        Exit
      </button>
    </div>
  );
}
