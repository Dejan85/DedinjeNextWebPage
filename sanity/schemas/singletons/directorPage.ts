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
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "title",
          title: "Naslov",
          type: "string",
          description: "Koristi <br /> za prelazak u novi red",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "subtitle",
          title: "Podnaslov",
          type: "string",
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
              type: "string",
            },
            {
              name: "description",
              title: "Opis",
              type: "text",
              rows: 2,
            },
            {
              name: "buttonText",
              title: "Tekst dugmeta",
              type: "string",
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
              title: "title",
              subtitle: "description",
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
          type: "string",
          initialValue: "Реч директора",
        },
        {
          name: "heading",
          title: "Naslov",
          type: "string",
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
                  type: "text",
                  rows: 4,
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
                  text: "text",
                  variant: "variant",
                },
                prepare({ text, variant }) {
                  return {
                    title: text?.substring(0, 60) + "...",
                    subtitle: variant === "lead" ? "Lead paragraf" : "Body paragraf",
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
          type: "string",
        },
        {
          name: "videoCaption",
          title: "Video caption",
          type: "string",
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
          type: "text",
          rows: 3,
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
          type: "string",
        },
        {
          name: "heading",
          title: "Naslov",
          type: "string",
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
                { name: "label", title: "Label", type: "string" },
                { name: "icon", title: "Ikonica", type: "string" },
              ],
              preview: {
                select: {
                  value: "value",
                  label: "label",
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
          type: "string",
        },
        {
          name: "items",
          title: "Partneri",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "icon", title: "Ikonica", type: "string" },
                { name: "text", title: "Tekst", type: "string" },
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
          type: "string",
        },
        {
          name: "description",
          title: "Meta opis",
          type: "text",
          rows: 3,
        },
      ],
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
