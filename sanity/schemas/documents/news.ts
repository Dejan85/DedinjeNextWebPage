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
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: {
        source: "title.sr",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Kratak izvod",
      type: "localeText",
    }),
    defineField({
      name: "content",
      title: "Sadržaj (portable text, trenutno neiskorišćeno na sajtu)",
      type: "localePortableText",
    }),
    defineField({
      name: "fullText",
      title: "Pun tekst vesti",
      description: "Pasusi odvojeni praznim redom.",
      type: "localeText",
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
      type: "localeString",
      initialValue: { sr: "Medicinski tim", en: "Medical team" },
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
      title: "title.sr",
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
