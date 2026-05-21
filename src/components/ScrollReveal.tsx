"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import { useReducedMotionPreference } from "@/src/lib/motion/useReducedMotionPreference";

type RevealDirection = "up" | "down" | "left" | "right" | "fade";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  distance?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "span" | "section" | "article" | "li";
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  distance = 35,
  duration = 800,
  threshold = 0.12,
  once = true,
  className,
  style,
  as: Tag = "div",
}: ScrollRevealProps) {
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
      case "up": return `translate3d(0, ${distance}px, 0)`;
      case "down": return `translate3d(0, -${distance}px, 0)`;
      case "left": return `translate3d(${distance}px, 0, 0)`;
      case "right": return `translate3d(-${distance}px, 0, 0)`;
      case "fade": return "translate3d(0, 0, 0)";
    }
  };

  const revealStyle: CSSProperties = {
    opacity: revealVisible ? 1 : 0,
    transform: getTransform(),
    transition: `opacity ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms, transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
    willChange: "opacity, transform",
    ...style,
  };

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={className}
      style={revealStyle}
    >
      {children}
    </Tag>
  );
}

/**
 * Wrapper for staggered children — each direct child gets a delay offset.
 */
interface StaggerRevealProps {
  children: ReactNode[];
  direction?: RevealDirection;
  baseDelay?: number;
  staggerDelay?: number;
  distance?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  style?: CSSProperties;
  childClassName?: string;
}

export function StaggerReveal({
  children,
  direction = "up",
  baseDelay = 0,
  staggerDelay = 120,
  distance = 30,
  duration = 700,
  threshold = 0.08,
  className,
  style,
  childClassName,
}: StaggerRevealProps) {
  return (
    <div className={className} style={style}>
      {children.map((child, i) => (
        <ScrollReveal
          key={i}
          direction={direction}
          delay={baseDelay + i * staggerDelay}
          distance={distance}
          duration={duration}
          threshold={threshold}
          className={childClassName}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
}
