import { defineField, defineType } from "sanity";

export const coreTeam = defineType({
	name: "coreTeam",
	title: "Core Team",
	type: "document",
	fields: [
		defineField({
			name: "leadershipModel",
			title: "Leadership Model",
			type: "string",
			description: "High-level description of the firm's leadership structure.",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "coreFunctions",
			title: "Core Functions",
			type: "array",
			description: "Key functional areas within the firm. Minimum 3.",
			of: [{ type: "string" }],
			options: { layout: "tags" },
			validation: (rule) => rule.required().min(3),
		}),
		defineField({
			name: "operatingPrinciples",
			title: "Operating Principles",
			type: "array",
			description: "Principles that guide the firm's operations. Minimum 3.",
			of: [{ type: "string" }],
			options: { layout: "tags" },
			validation: (rule) => rule.required().min(3),
		}),
	],
	preview: {
		prepare() {
			return { title: "Core Team" };
		},
	},
});
