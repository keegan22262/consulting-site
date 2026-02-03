import type { Metadata } from "next";
import Link from "next/link";

import Container from "@/components/layout/Container";
import ServiceCard from "@/components/sections/ServiceCard";
import { getInsightBySlug } from "@/lib/sanityInsights";

type PageProps = {
	params: {
		slug: string;
	};
};

type PortableTextChild = {
	text?: string;
};

type PortableTextBlock = {
	_type?: string;
	style?: string;
	listItem?: string;
	children?: PortableTextChild[];
};

function blockToText(block: PortableTextBlock): string {
	if (!Array.isArray(block.children)) return "";
	return block.children
		.map((child) => (typeof child?.text === "string" ? child.text : ""))
		.join("")
		.trim();
}

function portableTextToParagraphs(blocks: PortableTextBlock[] | undefined): string[] {
	if (!Array.isArray(blocks)) return [];

	return blocks
		.filter((block) => block?._type === "block" && !block.listItem)
		.map((block) => blockToText(block))
		.filter((text) => Boolean(text));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const normalizedSlug = (params.slug || "").trim();
	const insight = normalizedSlug ? await getInsightBySlug(normalizedSlug) : null;

	if (!insight) {
		return {
			title: "Insight not found",
			description: "The requested insight could not be found.",
			robots: { index: false, follow: false },
		};
	}

	return {
		title: insight.title,
		description: "Read our latest research-informed perspective.",
		openGraph: {
			title: insight.title,
			description: "Read our latest research-informed perspective.",
		},
	};
}

export default async function InsightDetailPage({ params }: PageProps) {
	const normalizedSlug = (params.slug || "").trim();
	const insight = normalizedSlug ? await getInsightBySlug(normalizedSlug) : null;

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

	const paragraphs = portableTextToParagraphs(insight.content as PortableTextBlock[] | undefined);
	const headerSummary = paragraphs[0] ?? "";
	const relatedServices = Array.isArray(insight.relatedServices) ? insight.relatedServices : [];
	const hasRelatedServices = relatedServices.length > 0;

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
							{headerSummary}
						</p>
					</header>

					<div className="mx-auto mt-10 max-w-[90ch] space-y-6 text-base leading-7 text-slate-800">
						{paragraphs.map((paragraph) => (
							<p key={paragraph}>{paragraph}</p>
						))}
					</div>

					{hasRelatedServices ? (
						<section aria-labelledby="related-services-title" className="mt-12 border-t border-slate-200 pt-10">
							<div className="mx-auto max-w-[90ch]">
								<div className="flex items-baseline justify-between gap-6">
									<h2
										id="related-services-title"
										className="text-xl font-semibold tracking-tight text-slate-900"
									>
										Related Services
									</h2>
									<Link className="text-sm text-slate-700" href="/insights">
										Back to insights
									</Link>
								</div>
							</div>

							<div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
								{relatedServices
									.filter((service) => Boolean(service?.slug))
									.map((service) => (
										<ServiceCard
											key={service.slug}
											id={service.slug}
											title={service.title}
											summary={service.summary ?? ""}
											category={service.category ?? ""}
										/>
									))}
							</div>
						</section>
					) : null}
				</article>
			</Container>
		</main>
	);
}
