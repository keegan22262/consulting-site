import { defineField, defineType } from "sanity";

export const service = defineType({
	name: "service",
	title: "Service",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description:
				"Clear service name. Use concise, consulting-style phrasing.",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			description:
				"URL identifier generated from the title. Keep stable after publishing.",
			options: {
				source: "title",
				maxLength: 96,
				isUnique: (value, context) => context.defaultIsUnique(value, context),
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "category",
			title: "Category",
			type: "string",
			description: "Practice area grouping for navigation and filtering.",
			options: {
				list: [
					{ title: "Strategy & Transformation", value: "strategy-transformation" },
					{ title: "Digital & AI", value: "digital-ai" },
					{ title: "Financial, Risk & Tax", value: "financial-risk-tax" },
					{ title: "People, ESG & Public", value: "people-esg-public" },
				],
				layout: "dropdown",
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "summary",
			title: "Summary",
			type: "string",
			description: "One-sentence overview used in cards and listings.",
			validation: (rule) => rule.required().max(200),
		}),
		defineField({
			name: "targetClients",
			title: "Target Clients",
			type: "string",
			description:
				"Who this service is for (e.g., CFOs navigating M&A complexity).",
		}),
		defineField({
			name: "focusAreas",
			title: "Focus Areas",
			type: "array",
			description: "Key capabilities or topics covered by this service.",
			of: [{ type: "string" }],
			options: { layout: "tags" },
		}),
		defineField({
			name: "approach",
			title: "Approach",
			type: "text",
			description:
				"Short paragraph on methodology or working style for this service.",
			rows: 4,
		}),
		defineField({
			name: "order",
			title: "Order",
			type: "number",
			description: "Display order in listings. Lower numbers appear first.",
		}),
		defineField({
			name: "status",
			title: "Status",
			type: "string",
			description: "Publishing control. Use Draft until content is reviewed.",
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
	orderings: [
		{
			title: "Display Order",
			name: "orderAsc",
			by: [{ field: "order", direction: "asc" }],
		},
		{
			title: "Title",
			name: "titleAsc",
			by: [{ field: "title", direction: "asc" }],
		},
	],
	initialValue: {
		status: "draft",
	},
	preview: {
		select: {
			title: "title",
			subtitle: "category",
		},
		prepare(selection) {
			const { title, subtitle } = selection as { title?: string; subtitle?: string };
			const categoryLabels: Record<string, string> = {
				"strategy-transformation": "Strategy & Transformation",
				"digital-ai": "Digital & AI",
				"financial-risk-tax": "Financial, Risk & Tax",
				"people-esg-public": "People, ESG & Public",
			};
			return {
				title: title || "Untitled service",
				subtitle: subtitle ? categoryLabels[subtitle] ?? subtitle : "No category",
			};
		},
	},
});
