import { defineField, defineType } from "sanity";

export const terms = defineType({
	name: "terms",
	title: "Terms & Conditions",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			initialValue: "Terms & Conditions",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "lastUpdated",
			title: "Last Updated",
			type: "date",
			description: "Date these terms were last updated.",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "content",
			title: "Content",
			type: "array",
			of: [{ type: "block" }],
			description: "Long-form terms & conditions (portable text).",
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		select: {
			title: "title",
			lastUpdated: "lastUpdated",
		},
		prepare(selection) {
			const suffix = selection.lastUpdated ? ` (Updated ${selection.lastUpdated})` : "";
			return { title: `${selection.title || "Terms & Conditions"}${suffix}` };
		},
	},
});
