import { defineField, defineType } from "sanity";

export const internalStrategy = defineType({
	name: "internalStrategy",
	title: "Internal Strategy",
	type: "document",
	fields: [
		defineField({
			name: "pricingModels",
			title: "Pricing Models",
			type: "array",
			description: "Pricing approaches used by the firm. Minimum 3.",
			of: [{ type: "string" }],
			options: { layout: "tags" },
			validation: (rule) => rule.required().min(3),
		}),
		defineField({
			name: "keyPerformanceIndicators",
			title: "Key Performance Indicators",
			type: "array",
			description: "KPIs used to measure firm and engagement performance. Minimum 3.",
			of: [{ type: "string" }],
			options: { layout: "tags" },
			validation: (rule) => rule.required().min(3),
		}),
	],
	preview: {
		prepare() {
			return { title: "Internal Strategy" };
		},
	},
});
