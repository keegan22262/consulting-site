import { defineField, defineType } from "sanity";

export default defineType({
	name: "page",
	title: "Page",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description:
				"Page name used internally and for previews. Keep it clear and stable (e.g., “About”, “How We Work”).",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "string",
			description:
				"URL path segment (no leading slash), e.g. about or how-we-work. Keep stable after publishing.",
			validation: (rule) =>
				rule
					.required()
					.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
						name: "kebab-case",
						invert: false,
					})
					.error("Use kebab-case (letters, numbers, hyphens), e.g. how-we-work"),
		}),
		defineField({
			name: "content",
			title: "Content",
			type: "array",
			description:
				"Page body content. Keep structure disciplined with headings and short paragraphs.",
			of: [{ type: "block" }],
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "status",
			title: "Status",
			type: "string",
			description:
				"Publishing control. Keep pages as Draft until content is final and the slug is confirmed. Published pages should be considered live.",
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
		defineField({
			name: "lastUpdated",
			title: "Last updated",
			type: "datetime",
			description:
				"Initialized automatically. For true auto-update on every edit, consider using Sanity's built-in _updatedAt or a custom Studio action.",
			readOnly: true,
			initialValue: () => new Date().toISOString(),
		}),
	],
	initialValue: {
		status: "draft",
	},
	preview: {
		select: {
			title: "title",
			subtitle: "slug",
		},
		prepare({ title, subtitle }) {
			return {
				title,
				subtitle: subtitle ? `/${subtitle}` : undefined,
			};
		},
	},
});
