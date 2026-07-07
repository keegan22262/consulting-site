"use client";
import { useRef, useState, useEffect, useMemo } from "react";
import { useReducedMotionPreference } from "@/src/lib/motion/useReducedMotionPreference";

const DURATION_MS = 800;
const STAGGER_MS = 120;
const TRANSLATE_Y = 32;

export interface ScrollRevealStyle {
  opacity: number;
  transform: string;
  transition: string;
  willChange: string;
}

export interface ScrollRevealOptions {
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  distance?: number;
  duration?: number;
  staggerIndex?: number;
}

export function useScrollReveal(
  options: number | ScrollRevealOptions = 0,
): [React.RefCallback<HTMLElement>, ScrollRevealStyle] {
  const staggerIndex = typeof options === "number" ? options : (options.staggerIndex ?? 0);
  const delayOverride = typeof options === "number" ? undefined : options.delay;
  const durationOverride = typeof options === "number" ? undefined : options.duration;

  const reducedMotion = useReducedMotionPreference();
  const [visible, setVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const refCallback: React.RefCallback<HTMLElement> = useMemo(() => {
    return (node: HTMLElement | null) => {
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

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const delay = delayOverride ?? (staggerIndex * STAGGER_MS);
  const duration = durationOverride ?? DURATION_MS;

  if (reducedMotion) {
    return [refCallback, { opacity: 1, transform: "none", transition: "none", willChange: "auto" }];
  }

  return [
    refCallback,
    {
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : `translateY(${TRANSLATE_Y}px)`,
      transition: visible
        ? `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`
        : "none",
      willChange: visible ? "auto" : "opacity, transform",
    },
  ];
}
