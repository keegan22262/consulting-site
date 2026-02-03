import type { Metadata } from "next";
import Link from "next/link";

import Container from "@/components/layout/Container";
import InsightCard from "@/components/sections/InsightCard";
import { insights } from "@/lib/insights";

type PageProps = {
	params: {
		slug: string;
	};
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const insight = insights.find((item) => item.slug === params.slug);

	if (!insight) {
		return {
			title: "Insight not found",
			description: "The requested insight could not be found.",
			robots: { index: false, follow: false },
		};
	}

	return {
		title: insight.title,
		description: insight.summary,
		openGraph: {
			title: insight.title,
			description: insight.summary,
		},
	};
}

export default function InsightDetailPage({ params }: PageProps) {
	const insight = insights.find((item) => item.slug === params.slug);

	if (!insight) {
		return (
			<main>
				<Container>
					<div className="py-18">
						<p>Insight not found.</p>
					</div>
				</Container>
			</main>
		);
	}

	const paragraphs = insight.content
		.split(/\n\s*\n/)
		.map((paragraph) => paragraph.trim())
		.filter(Boolean);

	const relatedInsights = insights
		.filter((item) => item.id !== insight.id)
		.filter((item) => insight.related.includes(item.id))
		.slice(0, 3);

	return (
		<main>
			<Container>
				<article className="py-18">
					<header className="mx-auto max-w-[90ch]">
						<h1 className="text-4xl leading-tight tracking-tight text-slate-900">
							{insight.title}
						</h1>
						<div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
							<time dateTime={insight.date}>{insight.date}</time>
							<span className="text-slate-300" aria-hidden="true">
								•
							</span>
							<span>{insight.category}</span>
						</div>
						<p className="mt-6 text-lg leading-relaxed text-slate-700">
							{insight.summary}
						</p>
					</header>

					<div className="mx-auto mt-10 max-w-[90ch] space-y-6 text-base leading-7 text-slate-800">
						{paragraphs.map((paragraph) => (
							<p key={paragraph}>{paragraph}</p>
						))}
					</div>

					<section aria-labelledby="related-insights-title" className="mt-12 border-t border-slate-200 pt-10">
						<div className="mx-auto max-w-[90ch]">
							<div className="flex items-baseline justify-between gap-6">
								<h2
									id="related-insights-title"
									className="text-xl font-semibold tracking-tight text-slate-900"
								>
									Related Insights
								</h2>
								<Link className="text-sm text-slate-700" href="/insights">
									Back to insights
								</Link>
							</div>
						</div>

						<div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
							{relatedInsights.map((related) => (
								<InsightCard
									key={related.id}
									slug={related.slug}
									title={related.title}
									summary={related.summary}
									category={related.category}
									date={related.date}
								/>
							))}
						</div>
					</section>
				</article>
			</Container>
		</main>
	);
}
