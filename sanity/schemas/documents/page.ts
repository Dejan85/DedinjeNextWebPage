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
        {
          type: "hero",
          title: "🎯 Hero sekcija",
        },
        {
          type: "infoBox",
          title: "📦 Info kutija",
        },
        {
          type: "welcomeSection",
          title: "👋 Dobrodošli sekcija",
        },
        {
          type: "statsSection",
          title: "📊 Statistika sekcija",
        },
        {
          type: "servicesSection",
          title: "💊 Usluge sekcija",
        },
        {
          type: "whyChooseUsSection",
          title: "⭐ Zašto mi sekcija",
        },
        {
          type: "ctaSection",
          title: "📢 CTA sekcija",
        },
        {
          type: "contentBlock",
          title: "📝 Sadržaj blok",
        },
        {
          type: "statItem",
          title: "📊 Statistika",
        },
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
