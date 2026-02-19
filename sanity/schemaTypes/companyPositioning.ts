import { defineField, defineType } from "sanity";

export const companyPositioning = defineType({
	name: "companyPositioning",
	title: "Company Positioning",
	type: "document",
	fields: [
		defineField({
			name: "mission",
			title: "Mission",
			type: "text",
			description: "The firm's core mission statement.",
			rows: 3,
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "brandPositioning",
			title: "Brand Positioning",
			type: "text",
			description: "How the firm positions itself in the market.",
			rows: 3,
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "problemStatement",
			title: "Problem Statement",
			type: "text",
			description: "The core problem the firm solves for clients.",
			rows: 3,
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "painPoints",
			title: "Pain Points",
			type: "array",
			description: "Key client pain points the firm addresses. Minimum 3.",
			of: [{ type: "string" }],
			options: { layout: "tags" },
			validation: (rule) => rule.required().min(3),
		}),
		defineField({
			name: "whyChooseUs",
			title: "Why Choose Us",
			type: "array",
			description: "Reasons clients choose this firm. Minimum 3.",
			of: [{ type: "string" }],
			options: { layout: "tags" },
			validation: (rule) => rule.required().min(3),
		}),
	],
	preview: {
		prepare() {
			return { title: "Company Positioning" };
		},
	},
});
