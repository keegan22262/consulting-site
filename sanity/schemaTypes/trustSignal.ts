import { defineField, defineType } from 'sanity';

export const trustSignal = defineType({
  name: 'trust_signal',
  title: 'Trust Signal',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: rule => rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', validation: rule => rule.required() }),
    defineField({ name: 'order', title: 'Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'title' },
  },
});

export default trustSignal;
