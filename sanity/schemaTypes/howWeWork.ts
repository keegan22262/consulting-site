import { defineField, defineType } from "sanity";

export const howWeWork = defineType({
	name: "howWeWork",
	title: "How We Work",
	type: "document",
	fields: [
		defineField({ name: 'intro', title: 'Intro', type: 'text' }),
		defineField({ name: 'steps', title: 'Steps', type: 'array', of: [{ type: 'string' }] }),
		defineField({ name: 'deliveryModel', title: 'Delivery Model', type: 'reference', to: [{ type: 'deliveryModel' }] }),
		defineField({ name: 'partnerships', title: 'Partnerships', type: 'array', of: [{ type: 'string' }] }),
		defineField({ name: 'headline', title: 'Headline', type: 'string' }),
		defineField({ name: 'metrics', title: 'Metrics', type: 'array', of: [ { type: 'object', fields: [ { name: 'label', title: 'Label', type: 'string' }, { name: 'value', title: 'Value', type: 'string' } ] } ] })
	],
	preview: {
		prepare() {
			return { title: "How We Work" };
		},
	},
});
export default howWeWork;
