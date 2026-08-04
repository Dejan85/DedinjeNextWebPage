import { defineType, defineField } from "sanity";

export default defineType({
  name: "seoMetadata",
  title: "SEO Metadata",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta naslov",
      type: "localeString",
      description: "Optimalan: 50-60 karaktera",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta opis",
      type: "localeText",
      description: "Optimalan: 150-160 karaktera",
    }),
    defineField({
      name: "metaKeywords",
      title: "Ključne reči",
      type: "array",
      of: [{ type: "localeString" }],
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph slika",
      type: "image",
      description: "Za deljenje na društvenim mrežama (1200x630px)",
    }),
  ],
});
