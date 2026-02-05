import { defineField, defineType } from "sanity";

export const contactSubmission = defineType({
	name: "contactSubmission",
	title: "Contact Submission",
	type: "document",
	fields: [
		defineField({
			name: "name",
			title: "Name",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "email",
			title: "Email",
			type: "string",
			validation: (Rule) => Rule.required().email(),
		}),
		defineField({
			name: "inquiryType",
			title: "Inquiry Type",
			type: "string",
			options: {
				list: [
					{ title: "General", value: "general" },
					{ title: "Service", value: "service" },
					{ title: "Career", value: "career" },
				],
				layout: "radio",
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "relatedService",
			title: "Related Service",
			type: "reference",
			to: [{ type: "service" }],
			description: "Optional: link to a related Service when inquiry type is Service.",
		}),
		defineField({
			name: "message",
			title: "Message",
			type: "text",
			rows: 6,
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "createdAt",
			title: "Created At",
			type: "datetime",
			readOnly: true,
			initialValue: () => new Date().toISOString(),
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		select: {
			title: "name",
			subtitle: "email",
			inquiryType: "inquiryType",
			createdAt: "createdAt",
		},
		prepare(selection) {
			const inquiry = selection.inquiryType ? ` • ${selection.inquiryType}` : "";
			const created = selection.createdAt ? ` • ${selection.createdAt}` : "";
			return {
				title: selection.title || "Contact Submission",
				subtitle: `${selection.subtitle || ""}${inquiry}${created}`.trim(),
			};
		},
	},
});
