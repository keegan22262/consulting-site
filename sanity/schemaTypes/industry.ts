import { defineType, defineField } from 'sanity';

export const industry = defineType({
  name: 'industry',
  title: 'Industry',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: rule => rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug' }),
    defineField({
      name: 'status',
      title: 'Publication Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' }
        ],
        layout: 'radio'
      },
      initialValue: 'draft',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
      description: 'Mark to feature on homepage selections.'
    }),
    defineField({ name: 'challenge', title: 'Primary Challenge', type: 'text' }),
    defineField({ name: 'regulatoryContext', title: 'Regulatory Context', type: 'text' }),
    defineField({ name: 'capabilities', title: 'Capabilities', type: 'array', of: [{ type: 'reference', to: [{ type: 'service' }] }] }),
    defineField({ name: 'relatedInsights', title: 'Related Insights', type: 'array', of: [{ type: 'reference', to: [{ type: 'insight' }] }] }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'summary', title: 'Summary', type: 'text' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({ name: 'order', title: 'Order', type: 'number' })
  ]
});

export default industry;
