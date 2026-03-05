"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Cinematic crossfade hook — cycles through a slide sequence on an interval.
 *
 * @param count   Total number of slides in the sequence.
 * @param interval  Duration each slide is held (ms). Default 10 000 ms.
 * @param disabled  When `true`, locks on index 0 (mobile / reduced-motion).
 * @returns The currently-active slide index.
 */
export function useHeroSequence(
  count: number,
  interval = 10_000,
  disabled = false,
): number {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (disabled || count <= 1) return;

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [disabled, count, interval]);

  return activeIndex;
}
