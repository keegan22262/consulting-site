import { defineType, defineField } from 'sanity';

export const service = defineType({
	name: 'service',
	title: 'Service',
	type: 'document',
	fields: [
		defineField({ name: 'title', title: 'Title', type: 'string', validation: rule => rule.required() }),
		defineField({ name: 'slug', title: 'Slug', type: 'string', validation: rule => rule.required().max(200) }),
		defineField({ name: 'category', title: 'Category', type: 'string' }),
		defineField({ name: 'summary', title: 'Summary', type: 'text' }),
		defineField({ name: 'targetClients', title: 'Target Clients', type: 'string' }),
		defineField({ name: 'focusAreas', title: 'Focus Areas', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
		defineField({ name: 'approach', title: 'Approach', type: 'text', rows: 4 }),
		defineField({ name: 'order', title: 'Order', type: 'number', validation: rule => rule.required() }),
		defineField({
			name: 'deliverables',
			title: 'Deliverables',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{ name: 'overline', title: 'Overline', type: 'string' },
						{ name: 'title', title: 'Title', type: 'string' },
						{ name: 'body', title: 'Body', type: 'text' }
					]
				}
			]
		}),
		defineField({
			name: 'relatedIndustries',
			title: 'Related Industries',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'industry' }] }]
		}),
		defineField({
			name: 'heroImage',
			title: 'Hero Image',
			type: 'image',
			options: { hotspot: true }
		})
	],
	orderings: [
		{
			title: 'Display Order',
			name: 'orderAsc',
			by: [{ field: 'order', direction: 'asc' }],
		},
		{
			title: 'Title',
			name: 'titleAsc',
			by: [{ field: 'title', direction: 'asc' }],
		},
	],
	initialValue: {
		status: 'draft',
	},
	preview: {
		select: {
			title: 'title',
			subtitle: 'category',
		},
		prepare(selection) {
			const { title, subtitle } = selection as { title?: string; subtitle?: string };
			const categoryLabels: Record<string, string> = {
				'strategy-transformation': 'Strategy & Transformation',
				'digital-ai': 'Digital & AI',
				'financial-risk-tax': 'Financial, Risk & Tax',
				'people-esg-public': 'People, ESG & Public',
			};
			return {
				title: title || 'Untitled service',
				subtitle: subtitle ? categoryLabels[subtitle] ?? subtitle : 'No category',
			};
		},
	},
});

export default service;
