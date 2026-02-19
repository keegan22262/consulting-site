import { defineField, defineType } from "sanity";

export const howWeWork = defineType({
	name: "howWeWork",
	title: "How We Work",
	type: "document",
	fields: [
		defineField({
			name: "intro",
			title: "Intro",
			type: "string",
			description: "Short introductory statement for the How We Work page.",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "steps",
			title: "Steps",
			type: "array",
			description: "Exactly 4 engagement steps describing how a project unfolds.",
			of: [
				{
					type: "object",
					name: "step",
					fields: [
						defineField({
							name: "title",
							title: "Title",
							type: "string",
							validation: (rule) => rule.required(),
						}),
						defineField({
							name: "description",
							title: "Description",
							type: "string",
							validation: (rule) => rule.required(),
						}),
					],
					preview: {
						select: { title: "title" },
						prepare(selection) {
							return { title: selection.title || "Step" };
						},
					},
				},
			],
			validation: (rule) => rule.required().min(4).max(4),
		}),
		defineField({
			name: "deliveryModel",
			title: "Delivery Model",
			type: "string",
			description: "Brief description of the engagement or delivery model.",
		}),
		defineField({
			name: "partnerships",
			title: "Partnerships",
			type: "string",
			description: "Brief description of partnership approach or philosophy.",
		}),
	],
	preview: {
		prepare() {
			return { title: "How We Work" };
		},
	},
});
