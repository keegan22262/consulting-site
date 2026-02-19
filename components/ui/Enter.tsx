"use client";

import { useEffect, useState } from "react";

type EnterProps = {
	children: React.ReactNode;
	className?: string;
};

export default function Enter({ children, className }: EnterProps) {
	const [entered, setEntered] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined") return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setEntered(true);
			return;
		}

		// Next paint after mount.
		const frame = window.requestAnimationFrame(() => setEntered(true));
		return () => window.cancelAnimationFrame(frame);
	}, []);

	return (
		<div
			className={[
				"transform-gpu transition-[opacity,transform] duration-slow ease-out",
				"motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100",
				entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
				className,
			]
				.filter(Boolean)
				.join(" ")}
		>
			{children}
		</div>
	);
}
