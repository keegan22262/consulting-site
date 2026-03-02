import { defineField, defineType } from 'sanity';

export const deliveryPhase = defineType({
  name: 'delivery_phase',
  title: 'Delivery Phase',
  type: 'document',
  fields: [
    defineField({ name: 'number', title: 'Phase Number', type: 'number', validation: rule => rule.required() }),
    defineField({ name: 'label', title: 'Label', type: 'string', validation: rule => rule.required() }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
    defineField({ name: 'body', title: 'Body', type: 'text' }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'number' },
    prepare(selection) {
      const { title, subtitle } = selection as { title?: string; subtitle?: number };
      return {
        title: title || 'Delivery phase',
        subtitle: subtitle ? `Phase ${subtitle}` : 'Phase order not set',
      };
    },
  },
});

export default deliveryPhase;
