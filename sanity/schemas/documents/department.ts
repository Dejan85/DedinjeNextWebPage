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
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: {
        source: "name.sr",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Kratak opis",
      type: "localeText",
    }),
    defineField({
      name: "content",
      title: "Detaljan sadržaj",
      type: "localePortableText",
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
      of: [{ type: "localeString" }],
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
      title: "name.sr",
      subtitle: "description.sr",
      media: "image",
    },
  },
});
