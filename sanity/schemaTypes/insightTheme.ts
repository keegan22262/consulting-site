import { defineField, defineType } from "sanity";

export default defineType({
	name: "insightTheme",
	title: "Insight Theme",
	type: "document",
	description:
		"Long-term strategic themes used to categorize thought leadership consistently over time.",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description:
				"Strategic theme name. Keep it concise and durable (e.g., “Decision Quality”, “Transformation Outcomes”).",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			description:
				"URL identifier generated from the title. Keep stable after publishing to avoid broken links.",
			options: {
				source: "title",
				maxLength: 96,
				isUnique: (value, context) => context.defaultIsUnique(value, context),
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text",
			description:
				"Explain the strategic lens of this theme. Focus on what it covers, how to recognize it, and what good looks like (2–4 sentences).",
			rows: 4,
			validation: (rule) => rule.required().max(600),
		}),
		defineField({
			name: "status",
			title: "Status",
			type: "string",
			description:
				"Publishing control. Draft themes are for internal iteration; publish only after the theme is approved for consistent long-term use.",
			options: {
				list: [
					{ title: "Draft", value: "draft" },
					{ title: "Published", value: "published" },
				],
				layout: "radio",
				direction: "horizontal",
			},
			initialValue: "draft",
			validation: (rule) => rule.required(),
		}),
	],
	initialValue: {
		status: "draft",
	},
	preview: {
		select: {
			title: "title",
			subtitle: "status",
		},
		prepare(selection) {
			const { title, subtitle } = selection as { title?: string; subtitle?: string };
			const statusLabel = subtitle === "published" ? "Published" : "Draft";
			return {
				title: title || "Untitled theme",
				subtitle: `Status: ${statusLabel}`,
			};
		},
	},
});
