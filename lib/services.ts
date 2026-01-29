export type ServicePhase = "mvp" | "future";

export type ServiceCategory =
	| "Strategy & Transformation"
	| "Digital & AI"
	| "Risk & Compliance"
	| "People & Organization";

export type ServiceDomain = {
	id: string;
	name: string;
	category: ServiceCategory;
	phase: ServicePhase;
};

export type Service = {
	id: string;
	title: string;
	summary: string;
	description: string;
	category: ServiceCategory;
	phase: ServicePhase;
	offerings: string[];
	outcomes: string[];
};

// Service domains from the client MVP document.
// This list is data-only (not rendered directly) so the website can stay MVP-focused
// while still capturing a scalable service taxonomy for Phase 2.
export const serviceDomains: ServiceDomain[] = [
	{
		id: "strategy-corporate-transformation",
		name: "Strategy & Corporate Transformation",
		category: "Strategy & Transformation",
		phase: "mvp",
	},
	{
		id: "digital-ai-transformation",
		name: "Digital & AI Transformation",
		category: "Digital & AI",
		phase: "mvp",
	},
	{
		id: "financial-advisory-audit-risk",
		name: "Financial Advisory, Audit & Risk Management",
		category: "Risk & Compliance",
		phase: "mvp",
	},
	{
		id: "people-organization",
		name: "People & Organization Consulting",
		category: "People & Organization",
		phase: "mvp",
	},
	{
		id: "sustainability-esg",
		name: "Sustainability & ESG Consulting",
		category: "Risk & Compliance",
		phase: "future",
	},
	{
		id: "public-sector-government",
		name: "Public Sector & Government Advisory",
		category: "People & Organization",
		phase: "future",
	},
	{
		id: "digital-communication-social-media",
		name: "Digital Communication & Social Media Consulting",
		category: "Digital & AI",
		phase: "future",
	},
	{
		id: "tax-advisory-asset-management",
		name: "Tax Advisory & Asset Management",
		category: "Risk & Compliance",
		phase: "future",
	},
	{
		id: "legal-regulatory-compliance",
		name: "Legal & Regulatory Compliance Consulting",
		category: "Risk & Compliance",
		phase: "future",
	},
	{
		id: "sme-development-growth",
		name: "SME Development & Growth Consulting",
		category: "People & Organization",
		phase: "future",
	},
];

// Placeholder data. Replace later with CMS-backed content.
export const services: Service[] = [
	{
		id: "strategy",
		title: "Strategy",
		summary:
			"Market positioning, portfolio choices, and growth roadmaps grounded in evidence and aligned to your operating realities.",
		description:
			"We help leadership teams clarify priorities, make trade-offs, and align on a direction that can be executed. Our work connects market insight with practical choices—so plans are clear, actionable, and grounded in operating constraints.",
		category: "Strategy & Transformation",
		phase: "mvp",
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
			"We provide independent, senior-level advisory support to clarify options, strengthen decision quality, and move complex initiatives forward with stakeholder alignment.",
		category: "Strategy & Transformation",
		phase: "mvp",
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
			"We help teams identify key risks early, implement pragmatic controls, and strengthen governance—without slowing delivery. The goal is resilience, audit readiness, and confidence in execution.",
		category: "Risk & Compliance",
		phase: "mvp",
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
			"We partner with teams to turn digital initiatives into measurable business value—from shaping priorities and plans to supporting delivery across people, process, data, and technology.",
		category: "Digital & AI",
		phase: "mvp",
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
