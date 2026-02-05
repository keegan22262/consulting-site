import { defineField, defineType } from "sanity";

export const howWeWork = defineType({
	name: "howWeWork",
	title: "How We Work",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			initialValue: "How We Work",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "intro",
			title: "Intro",
			type: "array",
			of: [{ type: "block" }],
			description: "Short intro copy (portable text).",
		}),
		defineField({
			name: "principles",
			title: "Principles",
			type: "array",
			of: [
				{
					type: "object",
					name: "principle",
					fields: [
						defineField({
							name: "title",
							title: "Title",
							type: "string",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "description",
							title: "Description",
							type: "text",
							rows: 3,
						}),
					],
					preview: {
						select: { title: "title" },
						prepare(selection) {
							return { title: selection.title || "Principle" };
						},
					},
				},
			],
		}),
		defineField({
			name: "ctaText",
			title: "CTA Text",
			type: "string",
			description: "Optional call-to-action text used on the homepage or section footer.",
		}),
	],
	preview: {
		prepare() {
			return { title: "How We Work" };
		},
	},
});
