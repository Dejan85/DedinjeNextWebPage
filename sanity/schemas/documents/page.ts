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
      name: "subtitle",
      title: "Podnaslov (PageHeader)",
      type: "localeText",
    }),
    defineField({
      name: "section",
      title: "Sekcija sajta",
      description:
        "Određuje u kojoj grupi se stranica prikazuje u Studio meniju (Sadržaj → Za pacijente / Edukacija / Nauka i istraživanje).",
      type: "string",
      options: {
        list: [
          { title: "Za pacijente", value: "za-pacijente" },
          { title: "Edukacija", value: "edukacija" },
          { title: "Nauka i istraživanje", value: "nauka-istrazivanje" },
          { title: "Ostalo", value: "ostalo" },
        ],
        layout: "radio",
      },
      initialValue: "ostalo",
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
        {
          type: "boardListBlock",
          title: "🏛️ Lista odbora/organa",
        },
        {
          type: "heroSlidesSection",
          title: "🎬 Hero slajder (video)",
        },
        {
          type: "clinicsFeaturedSection",
          title: "🏥 Istaknute klinike (početna)",
        },
        {
          type: "patientLinksSection",
          title: "🩺 Brzi linkovi za pacijente (početna)",
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
      title: "title.sr",
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
