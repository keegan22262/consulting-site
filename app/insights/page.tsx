import Container from "../../components/layout/Container";
import InsightCard from "../../components/sections/InsightCard";

import { insights } from "../../lib/insights";

export default function InsightsPage() {
	return (
		<main>
			<section aria-labelledby="insights-page-title">
				<Container>
					<div className="py-18">
						<h1 id="insights-page-title" className="text-4xl leading-tight">
								Insights
						</h1>
						<p className="mt-4 max-w-2xl text-lg leading-relaxed">
							Our insights share neutral, practical perspectives drawn from research and hands-on delivery. We focus
							on decision-quality, execution discipline, and measurable outcomes.
						</p>

						<section aria-label="Insight cards" className="mt-10">
							<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
								{insights.map((insight) => (
									<InsightCard
										key={insight.id}
										title={insight.title}
										summary={insight.summary}
										category={insight.category}
										date={insight.date}
									/>
								))}
							</div>
						</section>
					</div>
				</Container>
			</section>
		</main>
	);
}

