export type Service = {
	id: string;
	title: string;
	summary: string;
	category: string;
};

// Placeholder data. Replace later with CMS-backed content.
export const services: Service[] = [
	{
		id: "strategy",
		title: "Strategy",
		summary:
			"Market positioning, portfolio choices, and growth roadmaps grounded in evidence and aligned to your operating realities.",
		category: "Strategy",
	},
	{
		id: "advisory",
		title: "Advisory",
		summary:
			"Decision support for leadership teams—from opportunity assessment to business case development and stakeholder alignment.",
		category: "Advisory",
	},
	{
		id: "risk",
		title: "Risk",
		summary:
			"Risk identification, controls design, and governance improvements that strengthen resilience while keeping delivery moving.",
		category: "Risk",
	},
	{
		id: "digital-transformation",
		title: "Digital Transformation",
		summary:
			"Operating model evolution, process modernization, and implementation support to translate technology investments into business outcomes.",
		category: "Digital Transformation",
	},
];
