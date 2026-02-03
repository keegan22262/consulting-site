"use client";

import Container from "../../components/layout/Container";

type ErrorProps = {
	error: Error & { digest?: string };
	reset: () => void;
};

export default function Error({ reset }: ErrorProps) {
	return (
		<main>
			<section aria-label="Services error">
				<Container>
					<div className="py-18 max-w-2xl">
						<h1 className="text-3xl leading-tight tracking-tight text-slate-900">
							Our Services
						</h1>
						<p className="mt-4 text-base leading-relaxed text-slate-700">
							We could not load services at this time.
						</p>
						<div className="mt-6">
							<button
								type="button"
								onClick={reset}
								className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
							>
								Try again
							</button>
						</div>
					</div>
				</Container>
			</section>
		</main>
	);
}
