import { defineType, defineField } from "sanity";

export default defineType({
  name: "seoMetadata",
  title: "SEO Metadata",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta naslov",
      type: "string",
      description: "Optimalan: 50-60 karaktera",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta opis",
      type: "text",
      rows: 3,
      description: "Optimalan: 150-160 karaktera",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "metaKeywords",
      title: "Ključne reči",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph slika",
      type: "image",
      description: "Za deljenje na društvenim mrežama (1200x630px)",
    }),
  ],
});
