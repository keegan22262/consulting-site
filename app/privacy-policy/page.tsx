import type { Metadata } from "next";
export const dynamic = 'force-dynamic';


import { PortableText } from "@portabletext/react";

import { getPrivacyPolicy } from "@/lib/sanity/queries/privacyPolicy";

export const metadata: Metadata = {
	title: "Privacy Policy",
	description: "Privacy Policy.",
	robots: {
		index: false,
		follow: false,
	},
	openGraph: {
		title: "Privacy Policy",
		description: "Privacy Policy.",
	},
	alternates: {
		canonical: "/privacy-policy",
	},
};

function formatLastUpdated(value: string): string {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return value;
	return new Intl.DateTimeFormat("en-GB", {
		year: "numeric",
		month: "short",
		day: "2-digit",
	}).format(date);
}
export const revalidate = 300;

export default async function PrivacyPolicyPage() {
	const policy = await getPrivacyPolicy();

	return (
		<main>
			<section aria-labelledby="privacy-policy-title">
				<div className="max-w-7xl mx-auto px-6">
					<div className="py-16 md:py-24">
						{policy ? (
							<>
								<header className="mx-auto max-w-3xl space-y-4">
									<h1 id="privacy-policy-title" className="text-4xl leading-tight">
										{policy.title}
									</h1>
									<p className="text-sm text-slate-600">
										Last updated: {formatLastUpdated(policy.lastUpdated)}
									</p>
								</header>

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
							</>
						) : (
							<>
								<header className="mx-auto max-w-3xl space-y-4">
									<h1 id="privacy-policy-title" className="text-4xl leading-tight">
										Privacy Policy
									</h1>
								</header>

										<div className="mx-auto mt-10 max-w-prose">
									<p className="text-sm leading-relaxed text-slate-700">
										Privacy policy content is not yet available.
									</p>
								</div>
							</>
						)}
					</div>
				</div>
			</section>
		</main>
	);
}
