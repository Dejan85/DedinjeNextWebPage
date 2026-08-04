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
      type: "localeString",
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
      type: "localeText",
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
    defineField({
      name: "enReviewed",
      title: "🌍 EN prevod pregledan",
      description:
        "Označi tek nakon što pregledaš AI-generisani engleski prevod ovog dokumenta (Faza 3d i18n). Dok je isključeno, /en/* varijanta izostaje iz sitemap-a.",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role.sr",
      media: "image",
    },
  },
});
