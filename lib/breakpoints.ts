"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Breakpoint = "desktop" | "tablet" | "mobile";

const MOBILE_MAX = 767;
const TABLET_MAX = 1023;

export const BpCtx = createContext<Breakpoint>("desktop");

function resolveBreakpoint(width: number): Breakpoint {
  if (width <= MOBILE_MAX) return "mobile";
  if (width <= TABLET_MAX) return "tablet";
  return "desktop";
}

export function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>(() => {
    if (typeof window === "undefined") return "desktop";
    return resolveBreakpoint(window.innerWidth);
  });

  useEffect(() => {
    const onResize = () => setBp(resolveBreakpoint(window.innerWidth));
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return bp;
}

export function useBp(): Breakpoint {
  return useContext(BpCtx);
}

export function r<TDesktop, TTablet, TMobile>(
  desktop: TDesktop,
  tablet: TTablet,
  mobile: TMobile,
): TDesktop | TTablet | TMobile {
  const bp = useBp();
  if (bp === "mobile") return mobile;
  if (bp === "tablet") return tablet;
  return desktop;
}
