import { defineField, defineType } from "sanity";

export const deliveryModel = defineType({
	name: "deliveryModel",
	title: "Delivery Model",
	type: "document",
	fields: [
		defineField({
			name: "targetMarket",
			title: "Target Market",
			type: "array",
			description: "Target market segments the firm serves. Minimum 3.",
			of: [{ type: "string" }],
			options: { layout: "tags" },
			validation: (rule) => rule.required().min(3),
		}),
		defineField({
			name: "serviceDelivery",
			title: "Service Delivery",
			type: "array",
			description: "Service delivery methods or channels. Minimum 3.",
			of: [{ type: "string" }],
			options: { layout: "tags" },
			validation: (rule) => rule.required().min(3),
		}),
	],
	preview: {
		prepare() {
			return { title: "Delivery Model" };
		},
	},
});
