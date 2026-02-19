import type { Metadata } from "next";

import Container from "../../components/layout/Container";
import { PortableText } from "@portabletext/react";

import { getPrivacyPolicy } from "@/lib/sanity/legal";

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


export default async function PrivacyPolicyPage() {
	const policy = await getPrivacyPolicy();

	return (
		<main>
			<section aria-labelledby="privacy-title">
				<Container>
					<div className="py-16 md:py-24">
						<header className="mx-auto max-w-3xl space-y-4">
							<h1 id="privacy-title" className="text-4xl leading-tight">
								{policy?.title ?? "Privacy Policy"}
							</h1>

							{policy ? (
								<p className="text-sm text-slate-600">Last updated: {policy.lastUpdated}</p>
							) : null}
						</header>

						{policy ? (
							<div className="mx-auto mt-10 max-w-prose space-y-4">
								<PortableText
									value={policy.content}
									components={{
										block: {
											normal: ({ children }) => (
												<p className="leading-relaxed text-slate-700">{children}</p>
											),
										},
									}}
								/>
							</div>
						) : (
							<div className="mx-auto mt-10 max-w-prose">
								<p className="text-sm leading-relaxed text-slate-700">
									Privacy policy content is not yet available.
								</p>
							</div>
						)}
					</div>
				</Container>
			</section>
		</main>
	);
}
