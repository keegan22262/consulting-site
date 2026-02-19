import { defineField, defineType } from "sanity";

export const growthStrategy = defineType({
	name: "growthStrategy",
	title: "Growth Strategy",
	type: "document",
	fields: [
		defineField({
			name: "acquisitionChannels",
			title: "Acquisition Channels",
			type: "array",
			description: "Client acquisition channels and methods. Minimum 3.",
			of: [{ type: "string" }],
			options: { layout: "tags" },
			validation: (rule) => rule.required().min(3),
		}),
		defineField({
			name: "positioningApproach",
			title: "Positioning Approach",
			type: "string",
			description: "Summary of the firm's market positioning approach.",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "growthPrinciples",
			title: "Growth Principles",
			type: "array",
			description: "Guiding principles for growth and client acquisition. Minimum 3.",
			of: [{ type: "string" }],
			options: { layout: "tags" },
			validation: (rule) => rule.required().min(3),
		}),
	],
	preview: {
		prepare() {
			return { title: "Growth Strategy" };
		},
	},
});
