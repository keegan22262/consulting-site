"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Staggered hero-text entrance animation.
 *
 * Returns inline-style objects for four layers (overline → heading → paragraph → cta).
 * Each layer fades-up with a cumulative stagger delay.
 *
 * Disabled when `prefersReducedMotion` is `true` — all layers render
 * immediately at full opacity with no transform.
 */
export function useHeroEntrance(prefersReducedMotion = false) {
  const [visible, setVisible] = useState(false);
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    // Small delay so the hero image has a frame to paint before text fades in.
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (prefersReducedMotion) {
    const identity = { opacity: 1, transform: "none", transition: "none" } as const;
    return {
      overline: identity,
      heading: identity,
      paragraph: identity,
      cta: identity,
    };
  }

  const base = (delayMs: number) =>
    ({
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(18px)",
      transition: `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${delayMs}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delayMs}ms`,
    }) as const;

  return {
    overline: base(0),
    heading: base(120),
    paragraph: base(240),
    cta: base(380),
  };
}
