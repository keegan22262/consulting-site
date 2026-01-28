export type Service = {
	id: string;
	title: string;
	summary: string;
	description: string;
	category: string;
	offerings: string[];
	outcomes: string[];
};

// Placeholder data. Replace later with CMS-backed content.
export const services: Service[] = [
	{
		id: "strategy",
		title: "Strategy",
		summary:
			"Market positioning, portfolio choices, and growth roadmaps grounded in evidence and aligned to your operating realities.",
		description:
			"We help leadership teams define where to play and how to win. Our work connects market insight with practical choicesso strategy is clear, actionable, and executable within your constraints.",
		category: "Strategy",
		offerings: [
			"Market and competitive assessment",
			"Customer segmentation and value proposition refinement",
			"Strategic priorities and multi-year roadmap",
			"Portfolio and investment decision support",
		],
		outcomes: [
			"Clear strategic direction and decision framework",
			"Aligned leadership priorities and investment focus",
			"Roadmap with measurable milestones",
			"Improved confidence in growth choices",
		],
	},
	{
		id: "advisory",
		title: "Advisory",
		summary:
			"Decision support for leadership teams—from opportunity assessment to business case development and stakeholder alignment.",
		description:
			"We provide trusted, senior-level advisory support to clarify options, reduce risk in decision-making, and move complex initiatives forward with stakeholder alignment.",
		category: "Advisory",
		offerings: [
			"Executive workshops and decision facilitation",
			"Business case and ROI modeling",
			"Operating and financial impact analysis",
			"Stakeholder alignment and communications support",
		],
		outcomes: [
			"Faster, higher-quality decisions",
			"Stronger stakeholder alignment",
			"Clear business rationale and trade-offs",
			"Reduced execution friction",
		],
	},
	{
		id: "risk",
		title: "Risk",
		summary:
			"Risk identification, controls design, and governance improvements that strengthen resilience while keeping delivery moving.",
		description:
			"We help teams identify key risks early, implement pragmatic controls, and strengthen governancewithout slowing delivery. The goal is resilience, compliance, and confidence in execution.",
		category: "Risk",
		offerings: [
			"Risk assessment and heatmapping",
			"Controls design and process strengthening",
			"Governance, policy, and compliance support",
			"Operational resilience planning",
		],
		outcomes: [
			"Better visibility into enterprise and delivery risks",
			"Improved control environment and audit readiness",
			"More consistent governance and accountability",
			"Reduced disruption and operational surprises",
		],
	},
	{
		id: "digital-transformation",
		title: "Digital Transformation",
		summary:
			"Operating model evolution, process modernization, and implementation support to translate technology investments into business outcomes.",
		description:
			"We partner with teams to turn digital initiatives into measurable business valuefrom shaping the transformation plan to helping deliver change across people, process, data, and technology.",
		category: "Digital Transformation",
		offerings: [
			"Transformation roadmap and value case",
			"Target operating model and process redesign",
			"Delivery governance and program management support",
			"Change management and adoption planning",
		],
		outcomes: [
			"Clear transformation plan and delivery cadence",
			"Better adoption and measurable benefits realization",
			"Modernized processes and improved efficiency",
			"Stronger alignment between technology and business goals",
		],
	},
];
