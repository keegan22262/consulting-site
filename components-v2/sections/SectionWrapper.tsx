"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import AtmosphericLayer from "./AtmosphericLayer";
import SectionDivider from "./SectionDivider";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";
import { useReducedMotionPreference } from "@/src/lib/motion/useReducedMotionPreference";

type PadVTuple = [string, string, string];
type PadVObject = {
  desktop?: number;
  tablet?: number;
  mobile?: number;
};

interface SectionWrapperProps {
  children: ReactNode;
  background?:
    | "white"
    | "slate"
    | "primary"
    | "accent50"
    | "accent700"
    | "neutral50"
    | string;
  className?: string;
  padV?: PadVTuple | PadVObject;
  style?: CSSProperties;
  id?: string;
  withAtmosphere?: boolean;
  withDivider?: boolean;
  /** Disable the scroll-reveal entrance animation */
  noReveal?: boolean;
}

const DEFAULT_PAD_V: PadVTuple = ["96px", "64px", "48px"];
const MAX_WIDTH = "1280px";

function resolveBackground(background: SectionWrapperProps["background"]): string {
  switch (background) {
    case "white":
      return "#FFFFFF";
    case "slate":
      return "#F8FAFC";
    case "primary":
      return "var(--a900)";
    case "accent50":
      return "var(--a50)";
    case "accent700":
      return "var(--a700)";
    case "neutral50":
      return "var(--n50)";
    default:
      return background ?? "#FFFFFF";
  }
}

function resolvePadV(padV?: PadVTuple | PadVObject): PadVTuple {
  if (Array.isArray(padV)) {
    return padV;
  }

  return [
    padV?.desktop !== undefined ? `${padV.desktop}px` : DEFAULT_PAD_V[0],
    padV?.tablet !== undefined ? `${padV.tablet}px` : DEFAULT_PAD_V[1],
    padV?.mobile !== undefined ? `${padV.mobile}px` : DEFAULT_PAD_V[2],
  ];
}

export default function SectionWrapper({
  children,
  background = "white",
  className,
  padV,
  style,
  id,
  withAtmosphere = false,
  withDivider = false,
  noReveal = false,
}: SectionWrapperProps) {
  const [desktopPad, tabletPad, mobilePad] = resolvePadV(padV);
  const px = useResponsiveValue({ desktop: "32px", tablet: "32px", mobile: "24px" });
  const verticalPad = useResponsiveValue({
    desktop: desktopPad,
    tablet: tabletPad,
    mobile: mobilePad,
  });

  // Scroll reveal for the section
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(noReveal);
  const prefersReducedMotion = useReducedMotionPreference();
  const revealVisible = noReveal || prefersReducedMotion || isVisible;
  const shouldReveal = !noReveal && !prefersReducedMotion;

  useEffect(() => {
    if (!shouldReveal) return;
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldReveal]);

  const revealStyle: CSSProperties = noReveal
    ? {}
    : {
        opacity: revealVisible ? 1 : 0,
        transform: revealVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 30px, 0)",
        transition: "opacity 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        willChange: "opacity, transform",
      };

  return (
    <>
      <section
        ref={sectionRef}
        id={id}
        className={["relative", className].filter(Boolean).join(" ")}
        style={{
          backgroundColor: resolveBackground(background),
          paddingTop: verticalPad,
          paddingBottom: verticalPad,
          paddingLeft: "0",
          paddingRight: "0",
          ...revealStyle,
          ...style,
        }}
      >
        {withAtmosphere && <AtmosphericLayer />}
        <div
          className="relative"
          style={{
            maxWidth: MAX_WIDTH,
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: px,
            paddingRight: px,
            boxSizing: "border-box",
          }}
        >
          {children}
        </div>
      </section>
      {withDivider && <SectionDivider />}
    </>
  );
}
