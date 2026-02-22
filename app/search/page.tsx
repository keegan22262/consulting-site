import type { Metadata } from "next";

import Container from "@/components/layout/Container";
import InsightCard from "@/components/sections/InsightCard";
import ServiceCard from "@/components/sections/ServiceCard";
import {
	getPublishedInsightThemes,
	getPublishedServiceCategories,
} from "@/lib/sanity/filters";
import { searchInsights, searchServices } from "@/lib/sanity/search";

export const metadata: Metadata = {
	title: "Search",
	description: "Search services and insights.",
	openGraph: {
		title: "Search",
		description: "Search services and insights.",
	},
	alternates: {
		canonical: "/search",
	},
};

type SearchPageProps = {
	searchParams?: {
		q?: string | string[];
		category?: string | string[];
		theme?: string | string[];
	};
};

function getSingleParam(value: string | string[] | undefined): string {
	return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}
export const revalidate = 300;

export default async function SearchPage({ searchParams }: SearchPageProps) {
	const q = getSingleParam(searchParams?.q).trim();
	const category = getSingleParam(searchParams?.category).trim();
	const theme = getSingleParam(searchParams?.theme).trim();

	const hasQuery = q.length > 0;

	const [categories, themes, services, insights] = await Promise.all([
		getPublishedServiceCategories(),
		getPublishedInsightThemes(),
		hasQuery ? searchServices(q, { category }) : Promise.resolve([]),
		hasQuery ? searchInsights(q, { theme }) : Promise.resolve([]),
	]);
	const hasAnyResults = services.length > 0 || insights.length > 0;

	return (
		<main>
			<section aria-labelledby="search-title">
				<Container>
					<div className="py-16 md:py-24">
						<header className="mx-auto max-w-3xl space-y-4">
							<h1 id="search-title" className="text-4xl leading-tight">
								Search
							</h1>
							<p className="text-lg leading-relaxed">Search across services and insights.</p>
						</header>

						<div className="mx-auto mt-8 max-w-3xl">
							<form action="/search" method="get" className="space-y-3">
								<label htmlFor="q" className="text-sm font-medium text-slate-900">
									Search term
								</label>
								<div className="flex flex-col gap-3 sm:flex-row">
									<input
										id="q"
										name="q"
										type="search"
										defaultValue={q}
										placeholder="e.g., strategy, risk, transformation"
										className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
										autoComplete="off"
									/>
									<button
										type="submit"
										className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
									>
										Search
									</button>
								</div>

								<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
									<div className="space-y-1">
										<label
											htmlFor="category"
											className="text-sm font-medium text-slate-900"
										>
											Category (Services)
										</label>
										<select
											id="category"
											name="category"
											defaultValue={category}
											className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
										>
											<option value="">All categories</option>
											{categories.map((value) => (
												<option key={value} value={value}>
													{value}
												</option>
											))}
										</select>
									</div>

									<div className="space-y-1">
										<label
											htmlFor="theme"
											className="text-sm font-medium text-slate-900"
										>
											Theme (Insights)
										</label>
										<select
											id="theme"
											name="theme"
											defaultValue={theme}
											className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
										>
											<option value="">All themes</option>
											{themes.map((item) => (
												<option key={item.slug} value={item.slug}>
													{item.title}
												</option>
											))}
										</select>
									</div>
								</div>
							</form>
						</div>

						{hasQuery && !hasAnyResults ? (
							<div className="mx-auto mt-10 max-w-3xl">
								<p className="text-sm leading-relaxed text-slate-700">No results found.</p>
							</div>
						) : null}
					</div>
				</Container>
			</section>

			{services.length > 0 ? (
				<section aria-labelledby="search-services-title">
					<Container>
						<div className="py-16 md:py-24">
							<div className="mx-auto max-w-3xl">
								<h2 id="search-services-title" className="text-2xl leading-snug">
									Services
								</h2>
							</div>
							<div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
								{services.map((service) => (
									<ServiceCard
										key={service.slug}
										id={service.slug}
										title={service.title}
										summary={service.summary}
										category={service.category ?? ""}
									/>
								))}
							</div>
						</div>
					</Container>
				</section>
			) : null}

			{insights.length > 0 ? (
				<section aria-labelledby="search-insights-title">
					<Container>
						<div className="py-16 md:py-24">
							<div className="mx-auto max-w-3xl">
								<h2 id="search-insights-title" className="text-2xl leading-snug">
									Insights
								</h2>
							</div>
							<div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
								{insights.map((insight) => (
									<InsightCard
										key={insight.slug}
										slug={insight.slug}
										title={insight.title}
										summary={insight.summary}
										category={insight.category ?? ""}
										date={insight.date ?? ""}
									/>
								))}
							</div>
						</div>
					</Container>
				</section>
			) : null}
		</main>
	);
}
