import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  icon: () => "💬",
  fields: [
    defineField({
      name: "name",
      title: "Ime pacijenta",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Opis",
      type: "string",
      description: 'npr. "Pacijent, Kardiohirurgija"',
    }),
    defineField({
      name: "image",
      title: "Fotografija",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "quote",
      title: "Iskustvo",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Ocena",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: "featured",
      title: "Istaknut testimonial",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "publishedAt",
      title: "Datum",
      type: "date",
      initialValue: () => new Date().toISOString().split("T")[0],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "image",
    },
  },
});
