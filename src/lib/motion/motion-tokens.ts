/**
 * Institutional Motion System v1.0 — Token Definitions
 *
 * Canonical duration and easing tokens for all motion across the application.
 * Values are Framer Motion-compatible.
 */

export const motionDurations = {
	xFast: 80,
	fast: 120,
	medium: 200,
	slow: 320,
	xSlow: 500,
	cinematic: 800,
} as const;

export const motionEasings = {
	standard: [0.4, 0.0, 0.2, 1] as const,
	entrance: [0.0, 0.0, 0.2, 1] as const,
	exit: [0.4, 0.0, 1, 1] as const,
	linear: [0, 0, 1, 1] as const,
} as const;

export const motionTokens = {
	durations: motionDurations,
	easings: motionEasings,
} as const;

export type MotionDurationKey = keyof typeof motionDurations;
export type MotionEasingKey = keyof typeof motionEasings;
