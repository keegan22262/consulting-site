
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { getInsightBySlug } from "@/lib/sanityInsights";

export const revalidate = 300;

type InsightDetailsPageProps = {
	params: Promise<{
		slug: string;
	}>;
};

export async function generateMetadata(
	{ params }: InsightDetailsPageProps
): Promise<Metadata> {
	const { slug } = await params;
	const normalizedSlug = slug.trim();
	const insight = normalizedSlug ? await getInsightBySlug(normalizedSlug) : null;

	if (!normalizedSlug || !insight) {
		return {
			title: "Insight Not Found",
			description: "The requested insight could not be located.",
			openGraph: {
				title: "Insight Not Found",
				description: "The requested insight could not be located.",
			},
			alternates: {
				canonical: `/insights/${normalizedSlug}`,
			},
		};
	}

	const safeTitle = (insight.title || "").trim() || "Insight";
	const safeDescription =
		"Research, analysis, and perspective on strategy, risk, and transformation.";

	return {
		title: safeTitle,
		description: safeDescription,
		openGraph: {
			title: safeTitle,
			description: safeDescription,
		},
		alternates: {
			canonical: `/insights/${normalizedSlug}`,
		},
	};
}

export default async function InsightDetailsPage({
	params,
}: InsightDetailsPageProps) {
	const { slug } = await params;
	const normalizedSlug = slug.trim();
	const insight = normalizedSlug ? await getInsightBySlug(normalizedSlug) : null;

	if (!normalizedSlug || !insight) {
		return (
			<main>
				<Container>
					<section className="py-16 md:py-24" aria-labelledby="insight-not-found-title">
						<header className="space-y-4">
							<h1 id="insight-not-found-title" className="text-3xl leading-tight">
								Insight not found
							</h1>
							<p className="max-w-2xl leading-relaxed">
								The requested insight could not be located.
							</p>
							<p>
								<Link href="/insights" className="text-sm underline underline-offset-4">
									View all insights
								</Link>
							</p>
						</header>
					</section>
				</Container>
			</main>
		);
	}

	const articleSchema = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: insight.title,
		description: insight.title ?? "",
		author: {
			"@type": "Organization",
			name: "Rill Singh Consulting",
		},
		publisher: {
			"@type": "Organization",
			name: "Rill Singh Consulting",
			logo: {
				"@type": "ImageObject",
				url: process.env.NEXT_PUBLIC_SITE_URL + "/logo.png",
			},
		},
		datePublished: insight.date ?? "",
		mainEntityOfPage: process.env.NEXT_PUBLIC_SITE_URL + "/insights/" + normalizedSlug,
	};

	return (
		<main>
			<Container>
				<section className="py-16 md:py-24" aria-labelledby="insight-title">
					<div className="mx-auto max-w-2xl space-y-12">
						<header className="space-y-4">
							<p>
								<Link href="/insights" className="text-sm underline underline-offset-4">
									Back to insights
								</Link>
							</p>
							<p className="text-xs uppercase tracking-wide">
								{insight.category}
							</p>
							<h1 id="insight-title" className="text-4xl leading-tight">
								{insight.title}
							</h1>
						</header>
						<div className="mt-6 text-lg leading-relaxed text-slate-700">
							{insight.category ? `Category: ${insight.category}` : "No summary available."}
						</div>
						{/* Add more insight details here as needed */}
						<script
							type="application/ld+json"
							dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
						/>
					</div>
				</section>
			</Container>
		</main>
	);
}
