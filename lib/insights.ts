export type Insight = {
	id: string;
	title: string;
	summary: string;
	category: string;
	date: string;
};

// Placeholder data. Replace later with CMS-backed content.
export const insights: Insight[] = [
	{
		id: "strategy-execution-gap",
		title: "Closing the Strategy–Execution Gap",
		summary:
			"A pragmatic way to translate strategic intent into priorities, ownership, and weekly execution without adding bureaucracy.",
		category: "Strategy",
		date: "2026-01-10",
	},
	{
		id: "evidence-based-decisions",
		title: "Evidence-Based Decisions: What Leaders Should Ask For",
		summary:
			"A simple checklist to improve decision quality: assumptions, sensitivity, uncertainty, and the minimum proof needed to act.",
		category: "Advisory",
		date: "2025-12-03",
	},
	{
		id: "risk-without-slowing-delivery",
		title: "Managing Risk Without Slowing Delivery",
		summary:
			"How to focus on the few risks that matter, design lightweight controls, and build governance that supports speed and resilience.",
		category: "Risk",
		date: "2025-11-14",
	},
	{
		id: "transformation-outcomes",
		title: "Digital Transformation That Delivers Outcomes",
		summary:
			"A practical approach to sequencing change across people, process, data, and technology—measuring value as you go.",
		category: "Digital Transformation",
		date: "2025-10-28",
	},
];

