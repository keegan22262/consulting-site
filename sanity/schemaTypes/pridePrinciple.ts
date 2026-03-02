import { defineField, defineType } from 'sanity';

export const pridePrinciple = defineType({
  name: 'pride_principle',
  title: 'PRIDE Principle',
  type: 'document',
  fields: [
    defineField({ name: 'letter', title: 'Letter', type: 'string', validation: rule => rule.required().max(1) }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: rule => rule.required() }),
    defineField({ name: 'body', title: 'Body', type: 'text', validation: rule => rule.required() }),
    defineField({ name: 'order', title: 'Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'letter' },
    prepare(selection) {
      const { title, subtitle } = selection as { title?: string; subtitle?: string };
      return {
        title: title || 'PRIDE Principle',
        subtitle: subtitle ? `Letter ${subtitle}` : 'No letter',
      };
    },
  },
});

export default pridePrinciple;
