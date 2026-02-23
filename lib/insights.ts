export type Insight = {
	id: string;
	slug: string;
	title: string;
	summary: string;
	date: string; // ISO 8601 (date or timestamp)
	category: string;
	content: string;
	related: string[];

	// Newly added optional fields
	documentType?: string;
	domain?: string;
	readingTime?: string;
	sourceUrl?: string;
};

/**
 * Placeholder, local-only content.
 *
 * Migration strategy (Sanity + safe fallback) lives in:
 * - docs/sanity-replacement-strategy.md
 */

// Placeholder data. Replace later with CMS-backed content.
export const insights: Insight[] = [
	{
		id: "strategy-execution-gap",
		slug: "closing-the-strategy-execution-gap",
		title: "Closing the Strategy–Execution Gap",
		summary:
			"A pragmatic way to translate strategic intent into priorities, ownership, and weekly execution without adding bureaucracy.",
		date: "2026-01-10",
		category: "Strategy Execution",
		content:
			"Most execution failures are not caused by a lack of ambition. They stem from unclear priorities, ambiguous decision rights, and insufficient feedback loops between leadership intent and front-line delivery. The result is predictable: too many initiatives, inconsistent trade-offs, and limited visibility into where effort is creating outcomes.\n\nA practical remedy is to define a small set of measurable priorities, establish a single owner for each, and create a lightweight operating cadence that connects decisions to delivery. This includes explicit decision rights (who decides, who is consulted, and how exceptions are handled) and a regular review rhythm focused on dependencies, risks, and resource reallocation.\n\nThe goal is not more reporting. It is to improve decision quality and to shorten the time between learning and action, while keeping accountability and workload proportionate to the scale of change.",
		related: ["evidence-based-decisions", "transformation-outcomes"],
	},
	{
		id: "evidence-based-decisions",
		slug: "evidence-based-decisions-what-leaders-should-ask-for",
		title: "Evidence-Based Decisions: What Leaders Should Ask For",
		summary:
			"A simple checklist to improve decision quality: assumptions, sensitivity, uncertainty, and the minimum proof needed to act.",
		date: "2025-12-03",
		category: "Decision Quality",
		content:
			"Leadership teams rarely suffer from a lack of data. The more common issue is that decisions are made without a shared view of the assumptions and uncertainties that matter. This creates rework and makes it difficult to learn from outcomes.\n\nA disciplined approach is to require a short decision note that clarifies the decision to be made, the options considered, the critical assumptions, and the expected impact. Leaders should ask for sensitivity: what changes the conclusion, what is robust, and what is contingent. Where evidence is incomplete, teams should agree on a minimum proof standard and the fastest test that can reduce uncertainty.\n\nThis practice improves alignment, speeds follow-through, and creates an audit trail of reasoning that supports continuous improvement without adding unnecessary ceremony.",
		related: ["strategy-execution-gap", "risk-without-slowing-delivery"],
	},
	{
		id: "risk-without-slowing-delivery",
		slug: "managing-risk-without-slowing-delivery",
		title: "Managing Risk Without Slowing Delivery",
		summary:
			"How to focus on the few risks that matter, design lightweight controls, and build governance that supports speed and resilience.",
		date: "2025-11-14",
		category: "Risk & Controls",
		content:
			"Risk management becomes a barrier when it is treated as a parallel process that reviews work after it is done. In that model, controls are perceived as delays, and teams learn to optimise for passing reviews rather than reducing risk.\n\nA more effective approach is to identify a small set of non-negotiable risk outcomes (for example, data protection, financial exposure, and operational continuity) and design controls that are embedded in delivery. This may include clear guardrails, automated checks where feasible, and a defined escalation path for exceptions. Governance should focus on the few decisions that materially change risk posture, rather than routine approvals.\n\nWhen controls are proportionate and built into the workflow, organisations can improve compliance and resilience while maintaining delivery momentum.",
		related: ["evidence-based-decisions", "transformation-outcomes"],
	},
	{
		id: "transformation-outcomes",
		slug: "digital-transformation-that-delivers-outcomes",
		title: "Digital Transformation That Delivers Outcomes",
		summary:
			"A practical approach to sequencing change across people, process, data, and technology—measuring value as you go.",
		date: "2025-10-28",
		category: "Transformation",
		content:
			"Transformation programmes often underperform when technology delivery is treated as the primary objective. The strongest predictors of sustained impact are clarity on the outcome, a manageable scope, and an operating model that can absorb change.\n\nEffective sequencing starts with measurable outcomes and the decisions required to deliver them. Teams then map the minimal process, data, and capability changes needed, along with dependencies and constraints. Delivery should proceed in increments that demonstrate value, reduce uncertainty, and make it easier to adjust priorities based on evidence.\n\nGovernance should ensure benefits are defined, tracked, and owned, while giving teams the autonomy to make day-to-day delivery trade-offs within agreed guardrails.",
		related: ["strategy-execution-gap", "risk-without-slowing-delivery"],
	},
];

