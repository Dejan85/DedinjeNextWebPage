import { defineType, defineField } from "sanity";

export default defineType({
  name: "news",
  title: "Novosti",
  type: "document",
  icon: () => "📰",
  fields: [
    defineField({
      name: "title",
      title: "Naslov",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Kratak izvod",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "content",
      title: "Sadržaj",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "mainImage",
      title: "Glavna slika",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategorija",
      type: "string",
      options: {
        list: [
          { title: "Inovacije", value: "inovacije" },
          { title: "Akcije", value: "akcije" },
          { title: "Oprema", value: "oprema" },
          { title: "Uspeh", value: "uspeh" },
          { title: "Edukacija", value: "edukacija" },
          { title: "Obaveštenje", value: "obavestenje" },
        ],
      },
    }),
    defineField({
      name: "author",
      title: "Autor",
      type: "string",
      initialValue: "Medicinski tim",
    }),
    defineField({
      name: "publishedAt",
      title: "Datum objave",
      type: "datetime",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "featured",
      title: "Istaknuta vest",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "seo",
      title: "SEO Metadata",
      type: "seoMetadata",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publishedAt",
      media: "mainImage",
    },
    prepare({ title, subtitle, media }) {
      const date = new Date(subtitle).toLocaleDateString("sr-RS");
      return {
        title,
        subtitle: date,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Datum objave, najnovije",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
