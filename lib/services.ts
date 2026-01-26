export type Service = {
	title: string;
	description: string;
	category: string;
};

// Placeholder data. Replace later with CMS-backed content.
export const services: Service[] = [
	{
		title: "Strategy & Growth",
		description:
			"Market positioning, portfolio choices, and growth roadmaps grounded in evidence and aligned to your operating realities.",
		category: "Strategy",
	},
	{
		title: "Operating Model",
		description:
			"Org design, decision rights, and cross-functional ways of working that improve speed, accountability, and execution.",
		category: "Operations",
	},
	{
		title: "Transformation Delivery",
		description:
			"Program structure, governance, and hands-on delivery support for initiatives that need momentum and measurable outcomes.",
		category: "Transformation",
	},
	{
		title: "Analytics & Performance",
		description:
			"KPI design, reporting clarity, and performance rhythms that keep teams focused on what matters most.",
		category: "Performance",
	},
];
