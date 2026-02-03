import { defineField, defineType } from "sanity";

export default defineType({
	name: "insight",
	title: "Insight",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description:
				"Clear, consulting-style headline. Use one idea per insight; avoid internal acronyms.",
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
			name: "summary",
			title: "Summary",
			type: "text",
			description:
				"Short executive summary used in lists and previews. Aim for 1–2 sentences; lead with the outcome or key finding.",
			rows: 3,
			validation: (rule) => rule.required().max(280),
		}),
		defineField({
			name: "category",
			title: "Category",
			type: "string",
			description:
				"Primary lens for grouping insights. Keep this stable to support long-term navigation and reporting.",
			options: {
				list: [
					{ title: "Strategy", value: "Strategy" },
					{ title: "Digital", value: "Digital" },
					{ title: "ESG", value: "ESG" },
					{ title: "Tax", value: "Tax" },
					{ title: "Public Sector", value: "PublicSector" },
				],
				layout: "dropdown",
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "date",
			title: "Date",
			type: "date",
			description:
				"Publication date used for sorting and display. Default is today; adjust to the intended publish date.",
			initialValue: () => new Date().toISOString().slice(0, 10),
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "content",
			title: "Content",
			type: "array",
			description:
				"Main body. Use headings and lists to keep structure clear. Avoid marketing filler; prefer evidence and practical guidance.",
			of: [{ type: "block" }],
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "relatedServices",
			title: "Related Services",
			type: "array",
			description:
				"Optional links to relevant services. Only relate services that are genuinely supported by the insight content.",
			of: [
				{
					type: "reference",
					to: [{ type: "service" }],
				},
			],
		}),
		defineField({
			name: "status",
			title: "Status",
			type: "string",
			description:
				"Publishing control. Draft items are for internal review and should not be treated as publish-ready. Use Published only after content, dates, and links are reviewed.",
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
			subtitle: "category",
		},
	},
});
