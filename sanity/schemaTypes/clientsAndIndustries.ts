import { defineField, defineType } from "sanity";

export const clientsAndIndustries = defineType({
	name: "clientsAndIndustries",
	title: "Clients & Industries",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "intro",
			title: "Intro",
			type: "string",
			description: "Short introductory statement for the Clients & Industries page.",
		}),
		defineField({
			name: "clientTypes",
			title: "Client Types",
			type: "array",
			description: "Types of clients the firm serves.",
			of: [{ type: "string" }],
			options: { layout: "tags" },
		}),
		defineField({
			name: "industries",
			title: "Industries",
			type: "array",
			description: "Industries the firm operates in.",
			of: [{ type: "string" }],
			options: { layout: "tags" },
		}),
	],
	preview: {
		prepare() {
			return { title: "Clients & Industries" };
		},
	},
	initialValue: {
		title: "Clients & Industries",
	},
});
