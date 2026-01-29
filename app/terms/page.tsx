import type { Metadata } from "next";

import Container from "../../components/layout/Container";

export const metadata: Metadata = {
	title: "Terms",
	description: "Terms (pre-launch placeholder).",
	robots: {
		index: false,
		follow: false,
	},
	openGraph: {
		title: "Terms",
		description: "Terms (pre-launch placeholder).",
	},
};

export default function TermsPage() {
	return (
		<main>
			<section aria-labelledby="terms-title">
				<Container>
					<div className="py-18">
						<header className="mx-auto max-w-3xl space-y-4">
							<h1 id="terms-title" className="text-4xl leading-tight">
								Terms
							</h1>
							<p className="text-lg leading-relaxed">
								This site is in pre-launch. Formal Terms will be published prior to launch.
							</p>
							<p className="leading-relaxed text-slate-600">
								Until then, information is provided for general awareness and may change.
							</p>
						</header>
					</div>
				</Container>
			</section>
		</main>
	);
}
