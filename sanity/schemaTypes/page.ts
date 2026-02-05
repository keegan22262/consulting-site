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
  ],
});
