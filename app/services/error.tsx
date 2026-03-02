"use client";

import Button from "@/components-v2/ui/Button";



type ErrorProps = {
	error: Error & { digest?: string };
	reset: () => void;
};

export default function Error({ reset }: ErrorProps) {
	return (
		<main>
			<section aria-label="Services error">
				<div className="max-w-7xl mx-auto px-6">
					<div className="py-16 md:py-24 max-w-2xl">
						<h1 className="text-3xl leading-tight tracking-tight">
							Our Services
						</h1>
						<p className="mt-4 text-base leading-relaxed text-slate-700">
							We could not load services at this time.
						</p>
						<div className="mt-6">
							<Button variant="secondary" onClick={reset}>
								Try again
							</Button>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
