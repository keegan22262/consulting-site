import { defineField, defineType } from "sanity";

export const privacyPolicy = defineType({
	name: "privacyPolicy",
	title: "Privacy Policy",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "lastUpdated",
			title: "Last Updated",
			type: "date",
			description: "Date this policy was last updated.",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "content",
			title: "Content",
			type: "array",
			of: [{ type: "block" }],
			description: "Long-form legal copy (portable text).",
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
			return { title: `${selection.title || "Privacy Policy"}${suffix}` };
		},
	},
});
