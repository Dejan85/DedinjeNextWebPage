import { defineType, defineField } from "sanity";

export default defineType({
  name: "page",
  title: "Stranice",
  type: "document",
  icon: () => "📄",
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
      name: "seo",
      title: "SEO Metadata",
      type: "seoMetadata",
    }),
    defineField({
      name: "pageBuilder",
      title: "Sadržaj stranice",
      type: "array",
      of: [
        { type: "hero" },
        { type: "contentBlock" },
        { type: "infoBox" },
        { type: "statItem" },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Datum objave",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
    },
    prepare({ title, slug }) {
      return {
        title: title,
        subtitle: `/${slug}`,
      };
    },
  },
});
