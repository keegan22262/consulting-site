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
				"Clear service name used across the site. Use concise, consulting-style phrasing (e.g., “Strategy”, “Digital Transformation”).",
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
				"Short overview used in cards and listings. Aim for 1–2 sentences, outcomes-led, no jargon.",
			rows: 3,
			validation: (rule) => rule.required().max(280),
		}),
		defineField({
			name: "body",
			title: "Body",
			type: "array",
			description:
				"Long-form consulting content. Keep structure disciplined: lead with what it is, when to use it, and what outcomes clients can expect.",
			of: [
				{
					type: "block",
					styles: [
						{ title: "Normal", value: "normal" },
						{ title: "Heading", value: "h2" },
						{ title: "Subheading", value: "h3" },
						{ title: "Quote", value: "blockquote" },
					],
					lists: [
						{ title: "Bullet", value: "bullet" },
						{ title: "Numbered", value: "number" },
					],
					marks: {
						decorators: [
							{ title: "Strong", value: "strong" },
							{ title: "Emphasis", value: "em" },
						],
						annotations: [
							{
								name: "link",
								title: "Link",
								type: "object",
								fields: [
									defineField({
										name: "href",
										title: "URL",
										type: "url",
										validation: (rule) =>
											rule.required().uri({ scheme: ["http", "https", "mailto"] }),
									}),
								],
							},
						],
					},
				},
			],
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "domain",
			title: "Domain",
			type: "string",
			description:
				"High-level grouping for navigation and reporting. Keep broad and stable (e.g., Strategy, Advisory, Digital).",
			options: {
				list: [
					{ title: "Strategy", value: "Strategy" },
					{ title: "Advisory", value: "Advisory" },
					{ title: "Digital", value: "Digital" },
					{ title: "Risk", value: "Risk" },
					{ title: "People", value: "People" },
				],
				layout: "dropdown",
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "relatedInsights",
			title: "Related Insights",
			type: "array",
			description:
				"Optional: link relevant insights/case notes that provide context or supporting analysis for this service.",
			of: [
				{
					type: "reference",
					to: [{ type: "insight" }],
				},
			],
		}),
		defineField({
			name: "parentService",
			title: "Parent Service",
			type: "reference",
			description:
				"Optional: use to model sub-services (e.g., a specialized offering under a broader service).",
			to: [{ type: "service" }],
		}),
		defineField({
			name: "status",
			title: "Status",
			type: "string",
			description:
				"Publishing control for safe editorial workflow. Use Draft until the content and links are reviewed.",
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
			subtitle: "domain",
		},
		prepare(selection) {
			const { title, subtitle } = selection as { title?: string; subtitle?: string };
			return {
				title: title || "Untitled service",
				subtitle: subtitle ? `Domain: ${subtitle}` : "Domain not set",
			};
		},
	},
});
