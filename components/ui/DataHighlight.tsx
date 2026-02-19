"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motionDurations, motionEasings } from "@/src/lib/motion/motion-tokens";
import { useReducedMotionPreference } from "@/src/lib/motion/useReducedMotionPreference";

/* ------------------------------------------------------------------ */
/*  Easing helper — maps a 0→1 progress value through a cubic-bezier  */
/* ------------------------------------------------------------------ */

function cubicBezierAt(
	[x1, y1, x2, y2]: readonly [number, number, number, number],
	t: number,
): number {
	// De Casteljau subdivision to solve for y given t along the curve.
	// Control points: P0=(0,0) P1=(x1,y1) P2=(x2,y2) P3=(1,1)
	// We approximate x→t mapping with Newton-Raphson (3 iterations).
	const cx = 3 * x1;
	const bx = 3 * (x2 - x1) - cx;
	const ax = 1 - cx - bx;

	const cy = 3 * y1;
	const by = 3 * (y2 - y1) - cy;
	const ay = 1 - cy - by;

	const sampleX = (s: number) => ((ax * s + bx) * s + cx) * s;
	const sampleY = (s: number) => ((ay * s + by) * s + cy) * s;
	const sampleDX = (s: number) => (3 * ax * s + 2 * bx) * s + cx;

	// Newton-Raphson to find s where sampleX(s) ≈ t
	let s = t;
	for (let i = 0; i < 6; i++) {
		const dx = sampleX(s) - t;
		const d = sampleDX(s);
		if (Math.abs(dx) < 1e-6) break;
		if (Math.abs(d) < 1e-6) break;
		s -= dx / d;
	}

	return sampleY(Math.min(1, Math.max(0, s)));
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface DataHighlightProps {
	/** The target numeric value to animate toward. */
	value: number;
	/** Optional prefix rendered before the number (e.g. "$", "€"). */
	prefix?: string;
	/** Optional suffix rendered after the number (e.g. "%", "+", "x"). */
	suffix?: string;
	/** Decimal places to show. Defaults to 0 (integers). */
	decimals?: number;
	/** Label displayed below or beside the number. */
	label?: string;
	/** Additional CSS classes for the outer wrapper. */
	className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function DataHighlight({
	value,
	prefix = "",
	suffix = "",
	decimals = 0,
	label,
	className = "",
}: DataHighlightProps) {
	const ref = useRef<HTMLDivElement>(null);
	const hasAnimated = useRef(false);
	const rafId = useRef<number>(0);
	const prefersReduced = useReducedMotionPreference();

	const [display, setDisplay] = useState<string>(() =>
		prefersReduced ? value.toFixed(decimals) : (0).toFixed(decimals),
	);

	/* ---- Animate on viewport entry ---- */
	const animate = useCallback(() => {
		if (hasAnimated.current) return;
		hasAnimated.current = true;

		if (prefersReduced) {
			setDisplay(value.toFixed(decimals));
			return;
		}

		const duration = motionDurations.slow; // 320 ms
		const easing = motionEasings.standard;
		let start: number | null = null;

		const step = (timestamp: number) => {
			if (start === null) start = timestamp;
			const elapsed = timestamp - start;
			const rawProgress = Math.min(elapsed / duration, 1);
			const easedProgress = cubicBezierAt(easing, rawProgress);

			const current = easedProgress * value;
			setDisplay(current.toFixed(decimals));

			if (rawProgress < 1) {
				rafId.current = requestAnimationFrame(step);
			} else {
				// Ensure we land on the exact target
				setDisplay(value.toFixed(decimals));
			}
		};

		rafId.current = requestAnimationFrame(step);
	}, [value, decimals, prefersReduced]);

	/* ---- IntersectionObserver (once) ---- */
	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		// If reduced motion: show final value immediately, skip observer
		if (prefersReduced) {
			setDisplay(value.toFixed(decimals));
			hasAnimated.current = true;
			return;
		}

		// Already animated — don't re-attach
		if (hasAnimated.current) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					animate();
					observer.disconnect();
				}
			},
			{ threshold: 0.3 },
		);

		observer.observe(el);

		return () => {
			observer.disconnect();
			if (rafId.current) cancelAnimationFrame(rafId.current);
		};
	}, [animate, prefersReduced, value, decimals]);

	return (
		<div ref={ref} className={className}>
			<span className="tabular-nums">
				{prefix}
				{display}
				{suffix}
			</span>
			{label && <p className="mt-1 text-sm text-text-secondary">{label}</p>}
		</div>
	);
}
