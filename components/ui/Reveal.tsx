"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
	children: React.ReactNode;
	className?: string;
};

export default function Reveal({ children, className }: RevealProps) {
	const elementRef = useRef<HTMLDivElement | null>(null);
	const [hasRevealed, setHasRevealed] = useState(false);

	useEffect(() => {
		if (hasRevealed) return;
		if (typeof window === "undefined") return;

		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setHasRevealed(true);
			return;
		}

		const element = elementRef.current;
		if (!element) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					setHasRevealed(true);
					observer.disconnect();
					break;
				}
			},
			{
				threshold: 0.15,
				rootMargin: "0px 0px -10% 0px",
			}
		);

		observer.observe(element);
		return () => observer.disconnect();
	}, [hasRevealed]);

	return (
		<div
			ref={elementRef}
			className={[
				"transform-gpu transition-[opacity,transform] duration-slow ease-out",
				"motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100",
				hasRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
				className,
			]
				.filter(Boolean)
				.join(" ")}
		>
			{children}
		</div>
	);
}
