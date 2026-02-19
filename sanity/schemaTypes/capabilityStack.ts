import { defineField, defineType } from "sanity";

export const capabilityStack = defineType({
	name: "capabilityStack",
	title: "Capability Stack",
	type: "document",
	fields: [
		defineField({
			name: "capabilityOverview",
			title: "Capability Overview",
			type: "string",
			description: "High-level summary of the firm's delivery capabilities.",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "coreCapabilities",
			title: "Core Capabilities",
			type: "array",
			description: "Primary capabilities the firm delivers. Minimum 3.",
			of: [{ type: "string" }],
			options: { layout: "tags" },
			validation: (rule) => rule.required().min(3),
		}),
		defineField({
			name: "deliveryEnablers",
			title: "Delivery Enablers",
			type: "array",
			description: "Enablers that support delivery of core capabilities. Minimum 3.",
			of: [{ type: "string" }],
			options: { layout: "tags" },
			validation: (rule) => rule.required().min(3),
		}),
	],
	preview: {
		prepare() {
			return { title: "Capability Stack" };
		},
	},
});
