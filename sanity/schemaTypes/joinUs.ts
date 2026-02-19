import { defineField, defineType } from "sanity";

export const joinUs = defineType({
	name: "joinUs",
	title: "Join Us",
	type: "document",
	fields: [
		defineField({
			name: "message",
			title: "Message",
			type: "string",
			description: "Core call-to-action message aligned with the firm's values.",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "whoShouldReachOut",
			title: "Who Should Reach Out",
			type: "array",
			description: "Types of people or profiles encouraged to connect. Minimum 2.",
			of: [{ type: "string" }],
			options: { layout: "tags" },
			validation: (rule) => rule.required().min(2),
		}),
		defineField({
			name: "engagementNote",
			title: "Engagement Note",
			type: "string",
			description: "Brief note on how to engage or what to expect.",
			validation: (rule) => rule.required(),
		}),
	],
	preview: {
		prepare() {
			return { title: "Join Us" };
		},
	},
});
