import { defineField, defineType } from "sanity";

export const contactPage = defineType({
	name: "contactPage",
	title: "Contact Page",
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
			description: "Short introductory statement for the contact page.",
		}),
		defineField({
			name: "consultationNote",
			title: "Consultation Note",
			type: "string",
			description: "Brief note about the consultation process or expectations.",
		}),
		defineField({
			name: "contactMethod",
			title: "Contact Method",
			type: "string",
			description: "Primary contact method or instructions (e.g., email, phone).",
		}),
	],
	preview: {
		prepare() {
			return { title: "Contact" };
		},
	},
	initialValue: {
		title: "Contact",
	},
});
