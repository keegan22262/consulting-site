"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { useReducedMotionPreference } from "@/src/lib/motion/useReducedMotionPreference";

type RevealDirection = "up" | "down" | "left" | "right" | "fade";

interface UseScrollRevealOptions {
  threshold?: number;
  delay?: number;
  direction?: RevealDirection;
  distance?: number;
  duration?: number;
  once?: boolean;
}

interface ScrollRevealResult {
  ref: RefObject<HTMLElement | null>;
  style: React.CSSProperties;
}

export function useScrollReveal({
  threshold = 0.15,
  delay = 0,
  direction = "up",
  distance = 40,
  duration = 800,
  once = true,
}: UseScrollRevealOptions = {}): ScrollRevealResult {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotionPreference();
  const revealVisible = prefersReducedMotion ? true : isVisible;

  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion, threshold, once]);

  const getTransform = (): string => {
    if (revealVisible) return "translate3d(0, 0, 0)";
    switch (direction) {
      case "up":
        return `translate3d(0, ${distance}px, 0)`;
      case "down":
        return `translate3d(0, -${distance}px, 0)`;
      case "left":
        return `translate3d(${distance}px, 0, 0)`;
      case "right":
        return `translate3d(-${distance}px, 0, 0)`;
      case "fade":
        return "translate3d(0, 0, 0)";
    }
  };

  const style: React.CSSProperties = {
    opacity: revealVisible ? 1 : 0,
    transform: getTransform(),
    transition: `opacity ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms, transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
    willChange: "opacity, transform",
  };

  return { ref, style };
}
