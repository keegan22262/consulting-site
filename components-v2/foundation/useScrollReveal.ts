"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { useReducedMotionPreference } from "@/src/lib/motion/useReducedMotionPreference";

// ─── Scroll-reveal motion constants ──────────────────────────────────────────
const DURATION_MS = 700;
const STAGGER_MS = 120;
const TRANSLATE_Y = 24; // px

export interface ScrollRevealStyle {
  opacity: number;
  transform: string;
  transition: string;
  willChange: string;
}

/**
 * IntersectionObserver-based scroll reveal with optional stagger delay.
 *
 * Usage:
 *   const [revealRef, revealStyle] = useScrollReveal();       // standalone
 *   const [revealRef, revealStyle] = useScrollReveal(index);  // staggered
 *
 * Attach `revealRef` to the container, spread `revealStyle` onto it.
 * Respects `prefers-reduced-motion` — skips animation entirely.
 */
export function useScrollReveal(
  staggerIndex = 0,
): [React.RefCallback<HTMLElement>, ScrollRevealStyle] {
  const reducedMotion = useReducedMotionPreference();
  const [visible, setVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Stable ref callback — avoids stale closure issues
  const refCallback: React.RefCallback<HTMLElement> = useMemo(() => {
    return (node: HTMLElement | null) => {
      // Clean up previous observer
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (!node || typeof IntersectionObserver === "undefined") return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
      );

      observer.observe(node);
      observerRef.current = observer;
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const delay = staggerIndex * STAGGER_MS;

  if (reducedMotion) {
    return [
      refCallback,
      {
        opacity: 1,
        transform: "none",
        transition: "none",
        willChange: "auto",
      },
    ];
  }

  return [
    refCallback,
    {
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : `translateY(${TRANSLATE_Y}px)`,
      transition: visible
        ? `opacity ${DURATION_MS}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform ${DURATION_MS}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`
        : "none",
      willChange: visible ? "auto" : "opacity, transform",
    },
  ];
}
