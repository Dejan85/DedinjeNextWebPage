import { defineType, defineField } from "sanity";

export default defineType({
  name: "departmentsSection",
  title: "Odeljenja sekcija",
  type: "object",
  icon: () => "🏥",
  fields: [
    defineField({
      name: "badge",
      title: "Badge tekst",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heading",
      title: "Glavni naslov",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Podnaslov",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "departments",
      title: "Odeljenja",
      type: "array",
      of: [
        {
          type: "object",
          name: "departmentCard",
          title: "Odeljenje kartica",
          fields: [
            {
              name: "image",
              title: "Slika",
              type: "image",
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "title",
              title: "Naziv odeljenja",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "Opis",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
            {
              name: "linkHref",
              title: "Link",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "title",
              description: "description",
              media: "image",
            },
            prepare({ title, description, media }) {
              return {
                title: title,
                subtitle: description,
                media,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(2).max(8),
    }),
  ],
  preview: {
    select: {
      heading: "heading",
      departments: "departments",
    },
    prepare({ heading, departments }) {
      const count = departments?.length || 0;
      return {
        title: `🏥 ${heading || "Odeljenja sekcija"}`,
        subtitle: `${count} odeljenja`,
      };
    },
  },
});
