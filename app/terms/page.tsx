import type { Metadata } from "next";


import { PortableText } from "@portabletext/react";

import { getTerms } from "@/lib/sanity/queries/terms";

export const metadata: Metadata = {
	title: "Terms",
	description: "Terms.",
	robots: {
		index: false,
		follow: false,
	},
	openGraph: {
		title: "Terms",
		description: "Terms.",
	},
	alternates: {
		canonical: "/terms",
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

export default async function TermsPage() {
	const terms = await getTerms();

	return (
		<main>
			<section aria-labelledby="terms-title">
				<div className="max-w-7xl mx-auto px-6">
					<div className="py-16 md:py-24">
						{terms ? (
							<>
								<header className="mx-auto max-w-3xl space-y-4">
									<h1 id="terms-title" className="text-4xl leading-tight">
										{terms.title}
									</h1>
									<p className="text-sm text-slate-600">
										Last updated: {formatLastUpdated(terms.lastUpdated)}
									</p>
								</header>

								<div className="mx-auto mt-10 max-w-prose space-y-4">
									<PortableText
										value={terms.content}
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
									<h1 id="terms-title" className="text-4xl leading-tight">
										Terms
									</h1>
								</header>

										<div className="mx-auto mt-10 max-w-prose">
									<p className="text-sm leading-relaxed text-slate-700">
										Terms content is not yet available.
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
