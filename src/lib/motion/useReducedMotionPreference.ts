"use client";

import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Returns `true` when the user has requested reduced motion at the OS level.
 * SSR-safe — defaults to `false` on the server.
 */
export function useReducedMotionPreference(): boolean {
	const [prefersReduced, setPrefersReduced] = useState(false);

	useEffect(() => {
		const mql = window.matchMedia(QUERY);
		setPrefersReduced(mql.matches);

		const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
		mql.addEventListener("change", handler);
		return () => mql.removeEventListener("change", handler);
	}, []);

	return prefersReduced;
}
