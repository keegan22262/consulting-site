import { defineType, defineField } from 'sanity';

export const insight = defineType({
	name: 'insight',
	title: 'Insight',
	type: 'document',
	fields: [
		defineField({ name: 'title', title: 'Title', type: 'string', validation: rule => rule.required() }),
		defineField({ name: 'slug', title: 'Slug', type: 'slug' }),
		defineField({ name: 'summary', title: 'Summary', type: 'text' }),
		defineField({ name: 'category', title: 'Category', type: 'string' }),
		defineField({ name: 'date', title: 'Date', type: 'datetime' }),
		defineField({ name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] }),
		defineField({ name: 'relatedServices', title: 'Related Services', type: 'array', of: [{ type: 'reference', to: [{ type: 'service' }] }] }),
		defineField({ name: 'readTime', title: 'Read Time', type: 'string' }),
		defineField({ name: 'summaryPoints', title: 'Summary Points', type: 'array', of: [{ type: 'string' }] }),
		defineField({
			name: 'sections',
			title: 'Article Sections',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{ name: 'id', title: 'ID', type: 'string' },
						{ name: 'heading', title: 'Heading', type: 'string' },
						{ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] }
					]
				}
			]
		}),
		defineField({ name: 'pullQuote', title: 'Pull Quote', type: 'text' }),
		defineField({
			name: 'dataHighlights',
			title: 'Data Highlights',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{ name: 'label', title: 'Label', type: 'string' },
						{ name: 'value', title: 'Value', type: 'string' }
					]
				}
			]
		}),
		defineField({ name: 'industryTags', title: 'Industry Tags', type: 'array', of: [{ type: 'reference', to: [{ type: 'industry' }] }] }),
		defineField({ name: 'serviceTags', title: 'Service Tags', type: 'array', of: [{ type: 'reference', to: [{ type: 'service' }] }] }),
		defineField({ name: 'relatedSlugs', title: 'Related Insights', type: 'array', of: [{ type: 'reference', to: [{ type: 'insight' }] }] }),
		defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } })
	]
});

export default insight;
