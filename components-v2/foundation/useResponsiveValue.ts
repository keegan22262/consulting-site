"use client";

import { useEffect, useState } from "react";

type Breakpoint = "mobile" | "tablet" | "desktop";

export function useResponsiveValue<T>(values: {
  mobile: T;
  tablet?: T;
  desktop?: T;
}): T {
  // SSR-safe: default to mobile
  const getBreakpoint = (): Breakpoint => {
    if (typeof window === "undefined") return "mobile";
    if (window.matchMedia("(min-width: 1280px)").matches) return "desktop";
    if (window.matchMedia("(min-width: 768px)").matches) return "tablet";
    return "mobile";
  };

  const getValue = (bp: Breakpoint): T => {
    if (bp === "desktop" && values.desktop !== undefined) return values.desktop;
    if (bp === "desktop" && values.tablet !== undefined) return values.tablet;
    if (bp === "desktop") return values.mobile;
    if (bp === "tablet" && values.tablet !== undefined) return values.tablet;
    return values.mobile;
  };

  const [current, setCurrent] = useState<Breakpoint>("mobile");

  useEffect(() => {
    const handleResize = () => {
      setCurrent(getBreakpoint());
    };
    window.addEventListener("resize", handleResize);
    // Run once on mount in case initial SSR mismatch
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return getValue(current);
}
