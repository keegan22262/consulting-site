"use client";
import type { CSSProperties, ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  background?: "white" | "slate" | "primary" | "accent50" | "accent700" | "neutral50";
  className?: string;
  padV?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  style?: CSSProperties;
}

export default function SectionWrapper({
  children,
  background = "white",
  className,
  padV,
  style,
}: SectionWrapperProps) {
  const sectionPadMobile = `${padV?.mobile ?? 48}px`;
  const sectionPadTablet = `${padV?.tablet ?? 64}px`;
  const sectionPadDesktop = `${padV?.desktop ?? 96}px`;

  // Semantic background class
  const bgClass =
    background === "white"
      ? "bg-white"
      : background === "slate"
      ? "bg-slate-50"
      : background === "primary"
      ? "bg-primary"
      : background === "accent50"
      ? "bg-[var(--a50)]"
      : background === "accent700"
      ? "bg-[var(--a700)]"
      : background === "neutral50"
      ? "bg-[var(--n50)]"
      : "";

  return (
    <section
      className={["section-wrapper", bgClass, className].filter(Boolean).join(" ")}
      style={{
        ["--section-pad-mobile" as string]: sectionPadMobile,
        ["--section-pad-tablet" as string]: sectionPadTablet,
        ["--section-pad-desktop" as string]: sectionPadDesktop,
        ...style,
      }}
    >
      <div className="layout-container">
        {children}
      </div>
    </section>
  );
}
