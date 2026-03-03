"use client";

import { useCallback, useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Returns `true` when the user has requested reduced motion at the OS level.
 * SSR-safe — defaults to `false` on the server.
 */
export function useReducedMotionPreference(): boolean {
	const subscribe = useCallback((onStoreChange: () => void) => {
		const mql = window.matchMedia(QUERY);
		mql.addEventListener("change", onStoreChange);
		return () => mql.removeEventListener("change", onStoreChange);
	}, []);

	const getSnapshot = useCallback(() => window.matchMedia(QUERY).matches, []);
	const getServerSnapshot = useCallback(() => false, []);

	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
