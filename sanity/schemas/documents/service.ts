import { defineType, defineField } from "sanity";

export default defineType({
  name: "service",
  title: "Usluge",
  type: "document",
  icon: () => "⚕️",
  fields: [
    defineField({
      name: "name",
      title: "Naziv usluge",
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
      name: "icon",
      title: "Ikonica",
      type: "string",
      description: 'Font Awesome klasa, npr. "fas fa-heart"',
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
      name: "features",
      title: "Karakteristike",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "department",
      title: "Odeljenje",
      type: "reference",
      to: [{ type: "department" }],
    }),
    defineField({
      name: "featured",
      title: "Istaknuta usluga",
      type: "boolean",
      initialValue: false,
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
