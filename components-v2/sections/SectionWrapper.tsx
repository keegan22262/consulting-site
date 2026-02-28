"use client";
import type { ReactNode } from "react";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";

interface SectionWrapperProps {
  children: ReactNode;
  background?: "white" | "slate" | "primary";
  className?: string;
  padV?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

export default function SectionWrapper({
  children,
  background = "white",
  className,
  padV,
}: SectionWrapperProps) {
  // Default vertical padding values (in px)
  const defaultPad = { mobile: 48, tablet: 64, desktop: 96 };
  const pad = {
    mobile: padV?.mobile ?? defaultPad.mobile,
    tablet: padV?.tablet ?? defaultPad.tablet,
    desktop: padV?.desktop ?? defaultPad.desktop,
  };
  const verticalPad = useResponsiveValue(pad);

  // Semantic background class
  const bgClass =
    background === "white"
      ? "bg-white"
      : background === "slate"
      ? "bg-slate-50"
      : background === "primary"
      ? "bg-primary"
      : "";

  return (
    <section
      className={[bgClass, className].filter(Boolean).join(" ")}
      style={{ padding: `${verticalPad}px 0` }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {children}
      </div>
    </section>
  );
}
