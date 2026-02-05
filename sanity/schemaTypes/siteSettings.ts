import { defineField, defineType } from "sanity";

const FIXED_TITLE = "Global Site Settings";

export const siteSettings = defineType({
	name: "siteSettings",
	title: "Site Settings",
	type: "document",
	// Reinforce singleton behavior in the Studio UI.
	// The actual single-instance entry point is defined via the custom desk structure.
	__experimental_actions: ["update", "publish"],
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			readOnly: true,
			description: "Fixed value used to identify the singleton document.",
			validation: (Rule) => Rule.required(),
			initialValue: FIXED_TITLE,
		}),
		defineField({
			name: "linkedinUrl",
			title: "LinkedIn URL",
			type: "url",
		}),
		defineField({
			name: "twitterUrl",
			title: "X (Twitter) URL",
			type: "url",
		}),
		defineField({
			name: "youtubeUrl",
			title: "YouTube URL",
			type: "url",
		}),
		defineField({
			name: "instagramUrl",
			title: "Instagram URL",
			type: "url",
		}),
	],
	preview: {
		select: {
			title: "title",
		},
		prepare(selection) {
			return { title: selection.title || FIXED_TITLE };
		},
	},
});
