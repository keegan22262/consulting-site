import { defineField, defineType } from "sanity";

export const deliveryModel = defineType({
	name: "deliveryModel",
	title: "Delivery Model",
	type: "document",
	fields: [
		defineField({ name: 'targetMarket', title: 'Target Market', type: 'string' }),
		defineField({ name: 'serviceDelivery', title: 'Service Delivery', type: 'string' }),
		defineField({ name: 'overline', title: 'Overline', type: 'string' }),
		defineField({ name: 'heading', title: 'Heading', type: 'string' }),
		defineField({ name: 'description', title: 'Description', type: 'text' }),
		defineField({
			name: 'phases',
			title: 'Phases',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{ name: 'number', title: 'Phase Number', type: 'string' },
						{ name: 'name', title: 'Name', type: 'string' },
						{ name: 'body', title: 'Body', type: 'text' }
					]
				}
			]
		}),
	],
	preview: {
		prepare() {
			return { title: "Delivery Model" };
		},
	},
});

export default deliveryModel;
