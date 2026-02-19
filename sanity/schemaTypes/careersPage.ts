import { defineField, defineType } from "sanity";

export const careersPage = defineType({
	name: "careersPage",
	title: "Careers Page",
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
			description: "Short introductory statement for the careers page.",
		}),
		defineField({
			name: "hiringPhilosophy",
			title: "Hiring Philosophy",
			type: "string",
			description: "Brief description of the firm's approach to hiring.",
		}),
		defineField({
			name: "contactInstruction",
			title: "Contact Instruction",
			type: "string",
			description: "How candidates should reach out (e.g., email address or process).",
		}),
	],
	preview: {
		prepare() {
			return { title: "Careers" };
		},
	},
	initialValue: {
		title: "Careers",
	},
});
