import { defineType, defineField } from "sanity";

export default defineType({
  name: "directorPage",
  title: "Реч директора",
  type: "document",
  icon: () => "�",
  fields: [
    // Hero Section
    defineField({
      name: "hero",
      title: "Hero sekcija",
      type: "object",
      fields: [
        {
          name: "image",
          title: "Slika",
          type: "image",
          options: { hotspot: true },
          validation: (Rule) => Rule.required(),
        },
        {
          name: "badge",
          title: "Badge tekst",
          type: "localeString",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "title",
          title: "Naslov",
          type: "localeString",
          description: "Koristi <br /> za prelazak u novi red",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "subtitle",
          title: "Podnaslov",
          type: "localeString",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "showScrollIndicator",
          title: "Prikaži scroll indikator",
          type: "boolean",
          initialValue: true,
        },
      ],
    }),

    // Info Cards
    defineField({
      name: "infoCards",
      title: "Info kartice",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Font Awesome ikonica",
              type: "string",
              description: 'Primer: "fas fa-user-graduate"',
            },
            {
              name: "title",
              title: "Naslov",
              type: "localeString",
            },
            {
              name: "description",
              title: "Opis",
              type: "localeText",
            },
            {
              name: "buttonText",
              title: "Tekst dugmeta",
              type: "localeString",
            },
            {
              name: "buttonHref",
              title: "Link",
              type: "string",
            },
            {
              name: "highlight",
              title: "Highlight kartica",
              type: "boolean",
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: "title.sr",
              subtitle: "description.sr",
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),

    // Director Message
    defineField({
      name: "message",
      title: "Порука директора",
      type: "object",
      fields: [
        {
          name: "badge",
          title: "Badge",
          type: "localeString",
          initialValue: { sr: "Реч директора", en: "Director's message" },
        },
        {
          name: "heading",
          title: "Naslov",
          type: "localeString",
        },
        {
          name: "paragraphs",
          title: "Paragrafi",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "text",
                  title: "Tekst",
                  type: "localeText",
                },
                {
                  name: "variant",
                  title: "Varijanta",
                  type: "string",
                  options: {
                    list: [
                      { title: "Lead (veliki)", value: "lead" },
                      { title: "Body (normalan)", value: "body" },
                    ],
                  },
                  initialValue: "body",
                },
              ],
              preview: {
                select: {
                  text: "text.sr",
                  variant: "variant",
                },
                prepare({ text, variant }) {
                  return {
                    title: text?.substring(0, 60) + "...",
                    subtitle:
                      variant === "lead" ? "Lead paragraf" : "Body paragraf",
                  };
                },
              },
            },
          ],
        },
        {
          name: "signature",
          title: "Potpis",
          type: "string",
        },
        {
          name: "videoSrc",
          title: "Video putanja",
          type: "string",
          description: "Putanja do video fajla, npr: /videos/rec-direktora.mp4",
        },
        {
          name: "videoOverlayText",
          title: "Video overlay tekst",
          type: "localeString",
        },
        {
          name: "videoCaption",
          title: "Video caption",
          type: "localeString",
        },
      ],
    }),

    // Quote Section
    defineField({
      name: "quote",
      title: "Citat",
      type: "object",
      fields: [
        {
          name: "text",
          title: "Tekst citata",
          type: "localeText",
        },
        {
          name: "author",
          title: "Autor",
          type: "string",
        },
      ],
    }),

    // Stats Section
    defineField({
      name: "stats",
      title: "Statistika",
      type: "object",
      fields: [
        {
          name: "badge",
          title: "Badge",
          type: "localeString",
        },
        {
          name: "heading",
          title: "Naslov",
          type: "localeString",
        },
        {
          name: "items",
          title: "Stavke",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "value", title: "Vrednost", type: "string" },
                { name: "label", title: "Label", type: "localeString" },
                { name: "icon", title: "Ikonica", type: "string" },
              ],
              preview: {
                select: {
                  value: "value",
                  label: "label.sr",
                },
                prepare({ value, label }) {
                  return {
                    title: `${value} - ${label}`,
                  };
                },
              },
            },
          ],
          validation: (Rule) => Rule.max(4),
        },
      ],
    }),

    // Partner Logos
    defineField({
      name: "partners",
      title: "Partneri",
      type: "object",
      fields: [
        {
          name: "heading",
          title: "Naslov",
          type: "localeString",
        },
        {
          name: "items",
          title: "Partneri",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "icon",
                  title: "Ikonica",
                  type: "string",
                  description: "FontAwesome klasa, koristi se samo ako logotip nije unet.",
                },
                {
                  name: "image",
                  title: "Logotip",
                  type: "string",
                  description: "Putanja do fajla u /public/images/partners (npr. /images/partners/ministarstvo-nauke.svg).",
                },
                { name: "text", title: "Naslov", type: "localeString" },
                { name: "description", title: "Opis", type: "localeText" },
              ],
            },
          ],
        },
      ],
    }),

    // SEO
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Meta naslov",
          type: "localeString",
        },
        {
          name: "description",
          title: "Meta opis",
          type: "localeText",
        },
      ],
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
    prepare() {
      return {
        title: "Реч директора",
      };
    },
  },
});
