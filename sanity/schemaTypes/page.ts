import { defineType, defineField } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fieldsets: [
    {
      name: "homepage",
      title: "Homepage",
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      fieldset: "homepage",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 3,
      fieldset: "homepage",
    }),
    defineField({
      name: "servicesIntro",
      title: "Services Intro",
      type: "text",
      rows: 3,
      fieldset: "homepage",
    }),
    defineField({
      name: "insightsIntro",
      title: "Insights Intro",
      type: "text",
      rows: 3,
      fieldset: "homepage",
    }),
    defineField({
      name: "ctaText",
      title: "CTA Text",
      type: "string",
      fieldset: "homepage",
    }),
    defineField({
      name: "companyDescription",
      title: "Company Description",
      type: "array",
      of: [{ type: "block" }],
      fieldset: "homepage",
    }),
    defineField({
      name: "operatingApproach",
      title: "Operating Approach",
      type: "array",
      of: [{ type: "block" }],
      fieldset: "homepage",
    }),
    defineField({
      name: "problems",
      title: "Problems",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      fieldset: "homepage",
    }),
    defineField({
      name: "differentiation",
      title: "Differentiation",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "explanation",
              title: "Explanation",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      fieldset: "homepage",
    }),
    defineField({
      name: "audiences",
      title: "Audiences",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
            }),
            defineField({
              name: "qualifier",
              title: "Qualifier",
              type: "string",
            }),
          ],
        },
      ],
      fieldset: "homepage",
    }),
    defineField({
      name: "capabilitiesIntro",
      title: "Capabilities Intro",
      type: "string",
      fieldset: "homepage",
    }),
    defineField({
      name: "capabilityClusters",
      title: "Capability Clusters",
      type: "array",
      of: [{ type: "string" }],
      fieldset: "homepage",
    }),
    defineField({
      name: "workingProcess",
      title: "Working Process",
      type: "array",
      of: [{ type: "block" }],
      fieldset: "homepage",
    }),
  ],
});
