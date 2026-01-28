import { defineType, defineField } from "sanity";

export default defineType({
  name: "department",
  title: "Odeljenja",
  type: "document",
  icon: () => "🏥",
  fields: [
    defineField({
      name: "name",
      title: "Naziv odeljenja",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Kratak opis",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "content",
      title: "Detaljan sadržaj",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "image",
      title: "Slika",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "icon",
      title: "Ikonica",
      type: "string",
      description: 'Font Awesome klasa, npr. "fas fa-heart"',
    }),
    defineField({
      name: "features",
      title: "Karakteristike",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "services",
      title: "Usluge",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
    defineField({
      name: "doctors",
      title: "Lekari",
      type: "array",
      of: [{ type: "reference", to: [{ type: "doctor" }] }],
    }),
    defineField({
      name: "order",
      title: "Redosled",
      type: "number",
    }),
    defineField({
      name: "seo",
      title: "SEO Metadata",
      type: "seoMetadata",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "description",
      media: "image",
    },
  },
});
