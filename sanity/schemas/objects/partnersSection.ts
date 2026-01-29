import { defineType, defineField } from "sanity";

export default defineType({
  name: "partnersSection",
  title: "Partners Section",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "partners",
      title: "Partners",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              description: "FontAwesome icon class (e.g., 'fas fa-hospital')",
            }),
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "icon",
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(10),
    }),
  ],
  preview: {
    select: {
      title: "heading",
      partners: "partners",
    },
    prepare({ title, partners }) {
      return {
        title: title || "Partners Section",
        subtitle: partners ? `${partners.length} партнера` : "Нема партнера",
      };
    },
  },
});
