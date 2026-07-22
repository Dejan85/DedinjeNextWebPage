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
      name: "subtitle",
      title: "Podnaslov (PageHeader)",
      type: "text",
      rows: 2,
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
          type: "departmentsSection",
          title: "🏥 Odeljenja sekcija",
        },
        {
          type: "teamSection",
          title: "👥 Tim sekcija",
        },
        {
          type: "testimonialsSection",
          title: "💬 Testimonijali sekcija",
        },
        {
          type: "newsSection",
          title: "📰 Vesti sekcija",
        },
        {
          type: "contactSection",
          title: "📞 Kontakt sekcija",
        },
        {
          type: "partnersSection",
          title: "🤝 Partneri sekcija",
        },
        {
          type: "contentBlock",
          title: "📝 Sadržaj blok",
        },
        {
          type: "statItem",
          title: "📊 Statistika",
        },
        {
          type: "introSection",
          title: "👋 Uvodna sekcija",
        },
        {
          type: "bannerBlock",
          title: "📢 Banner",
        },
        {
          type: "cardGridBlock",
          title: "🗂️ Grid kartica",
        },
        {
          type: "checklistBlock",
          title: "✅ Checklist",
        },
        {
          type: "contactDirectoryBlock",
          title: "📞 Kontakt direktorijum",
        },
        {
          type: "accordionBlock",
          title: "📋 Akordeon",
        },
        {
          type: "faqBlock",
          title: "❓ FAQ",
        },
        {
          type: "tabsBlock",
          title: "🗂️ Tabovi (procedure)",
        },
        {
          type: "timelineBlock",
          title: "🕰️ Timeline (istorijat)",
        },
        {
          type: "lectureScheduleBlock",
          title: "📅 Raspored predavanja (tabovi po godinama)",
        },
        {
          type: "documentListBlock",
          title: "📄 Lista dokumenata",
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
