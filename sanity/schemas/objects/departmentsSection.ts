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
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heading",
      title: "Glavni naslov",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Podnaslov",
      type: "localeString",
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
              type: "localeString",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "Opis",
              type: "localeText",
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
              title: "title.sr",
              description: "description.sr",
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
      heading: "heading.sr",
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
