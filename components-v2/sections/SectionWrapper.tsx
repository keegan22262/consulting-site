"use client";

import type { CSSProperties, ReactNode } from "react";
import AtmosphericLayer from "./AtmosphericLayer";
import SectionDivider from "./SectionDivider";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";

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
  /** Override vertical padding: [desktop, tablet, mobile] */
  padV?: PadVTuple | PadVObject;
  style?: CSSProperties;
  /** HTML id attribute for anchor linking */
  id?: string;
  /** Render subtle institutional gradient + texture behind content */
  withAtmosphere?: boolean;
  /** Render a subtle glow divider after this section */
  withDivider?: boolean;
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
}: SectionWrapperProps) {
  const [desktopPad, tabletPad, mobilePad] = resolvePadV(padV);
  const px = useResponsiveValue({ desktop: "32px", tablet: "32px", mobile: "24px" });
  const verticalPad = useResponsiveValue({
    desktop: desktopPad,
    tablet: tabletPad,
    mobile: mobilePad,
  });

  return (
    <>
      <section
        id={id}
        className={["relative", className].filter(Boolean).join(" ")}
        style={{
          backgroundColor: resolveBackground(background),
          paddingTop: verticalPad,
          paddingBottom: verticalPad,
          paddingLeft: "0",
          paddingRight: "0",
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
