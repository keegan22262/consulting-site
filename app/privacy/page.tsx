import type { Metadata } from "next";

import Container from "../../components/layout/Container";

export const metadata: Metadata = {
	title: "Privacy Policy",
	description: "Privacy Policy (pre-launch placeholder).",
	robots: {
		index: false,
		follow: false,
	},
	openGraph: {
		title: "Privacy Policy",
		description: "Privacy Policy (pre-launch placeholder).",
	},
};

export default function PrivacyPolicyPage() {
	return (
		<main>
			<section aria-labelledby="privacy-title">
				<Container>
					<div className="py-18">
						<header className="mx-auto max-w-3xl space-y-4">
							<h1 id="privacy-title" className="text-4xl leading-tight">
								Privacy Policy
							</h1>
							<p className="text-lg leading-relaxed">
								This site is in pre-launch. A formal Privacy Policy will be published prior to launch.
							</p>
							<p className="leading-relaxed text-slate-600">
								If you need details related to data handling before then, please check back later.
							</p>
						</header>
					</div>
				</Container>
			</section>
		</main>
	);
}
