"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import { motionDurations, motionEasings } from "@/src/lib/motion/motion-tokens";
import { useReducedMotionPreference } from "@/src/lib/motion/useReducedMotionPreference";

const DURATION_S = motionDurations.medium / 1000;
const EASING = [...motionEasings.standard] as [number, number, number, number];
const STAGGER_S = 0.04; // 40ms

type AnimatedSectionProps = {
	children: ReactNode;
	className?: string;
	/** Stagger delay index — pass the section's position on the page for stagger effect */
	staggerIndex?: number;
};

/**
 * Wraps a page section with a fade-up entrance animation.
 *
 * - Fade + translateY only (no scale, no spring)
 * - Fires once per mount (not on every scroll)
 * - Respects `prefers-reduced-motion`
 * - Zero layout shift: uses `transform` only, no dimension changes
 */
export default function AnimatedSection({
	children,
	className,
	staggerIndex = 0,
}: AnimatedSectionProps) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
	const prefersReduced = useReducedMotionPreference();

	const skip = prefersReduced;

	return (
		<motion.div
			ref={ref}
			className={className}
			initial={skip ? false : { opacity: 0, y: 12 }}
			animate={
				skip
					? { opacity: 1, y: 0 }
					: isInView
						? { opacity: 1, y: 0 }
						: { opacity: 0, y: 12 }
			}
			transition={
				skip
					? { duration: 0 }
					: {
							duration: DURATION_S,
							ease: EASING,
							delay: staggerIndex * STAGGER_S,
						}
			}
		>
			{children}
		</motion.div>
	);
}
