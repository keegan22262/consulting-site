"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { type ReactNode } from "react";
import { motionDurations } from "@/src/lib/motion/motion-tokens";
import { useReducedMotionPreference } from "@/src/lib/motion/useReducedMotionPreference";

const DURATION_S = motionDurations.medium / 1000; // 0.2s

type PageTransitionProps = {
	children: ReactNode;
};

/**
 * Wraps page content with a cross-fade transition on route changes.
 *
 * - Fade only (opacity 0 → 1), no slide or directional animation
 * - `mode="wait"` ensures exit completes before enter starts
 * - `initial={false}` prevents animation on first mount → no hydration mismatch
 * - Respects `prefers-reduced-motion` (instant swap, zero duration)
 * - Compatible with Next.js App Router streaming (children passed as prop)
 */
export default function PageTransition({ children }: PageTransitionProps) {
	const pathname = usePathname();
	const prefersReduced = useReducedMotionPreference();

	const duration = prefersReduced ? 0 : DURATION_S;

	return (
		<AnimatePresence mode="wait" initial={false}>
			<motion.div
				key={pathname}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration, ease: "easeInOut" }}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}
