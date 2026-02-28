

import { notFound } from "next/navigation";
import InsightsDetailHeroSection from "@/components-v2/sections/InsightsDetailHeroSection";
import InsightsContentSection from "@/components-v2/sections/InsightsContentSection";
import InsightsRelatedSection from "@/components-v2/sections/InsightsRelatedSection";

const INSIGHTS = {
	"institutionalizing-growth": {
		category: "Capital Strategy",
		title: "Institutionalizing Growth Architecture",
		excerpt: "How boards structure capital deployment for sustainable expansion.",
		content: `
			Growth requires disciplined capital architecture.
			Institutional leaders align governance, performance metrics,
			and capital allocation to ensure sustainable scale.

			Boards must treat capital deployment as a system —
			not a series of isolated decisions.
		`,
		related: [
			{
				slug: "platform-operating-models",
				title: "Platform-Led Operating Models",
				category: "Digital Transformation"
			},
			{
				slug: "governance-discipline",
				title: "Board-Level Capital Discipline",
				category: "Governance"
			}
		]
	}
};

export default async function Page({ params }: { params: { slug: string } }) {
	const insight = INSIGHTS[params.slug as keyof typeof INSIGHTS];
	if (!insight) {
		notFound();
	}
	return (
		<>
			<InsightsDetailHeroSection
				category={insight.category}
				title={insight.title}
				excerpt={insight.excerpt}
			/>
			<InsightsContentSection>
				<div className="space-y-6 text-text-secondary leading-relaxed">
					{insight.content.split("\n").map((paragraph, i) => (
						<p key={i}>{paragraph}</p>
					))}
				</div>
			</InsightsContentSection>
			<InsightsRelatedSection insights={insight.related} />
		</>
	);
}
