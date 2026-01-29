import { defineType, defineField } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "О институту",
  type: "document",
  icon: () => "🏥",
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
          initialValue: false,
        },
      ],
    }),

    // About Section
    defineField({
      name: "about",
      title: "O nama sekcija",
      type: "object",
      fields: [
        {
          name: "badge",
          title: "Badge",
          type: "string",
          initialValue: "О нама",
        },
        {
          name: "heading",
          title: "Naslov",
          type: "string",
        },
        {
          name: "leadText",
          title: "Lead tekst",
          type: "text",
          rows: 3,
        },
        {
          name: "bodyText",
          title: "Body tekst",
          type: "text",
          rows: 4,
        },
        {
          name: "highlights",
          title: "Highlights",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "icon",
                  title: "Font Awesome ikonica",
                  type: "string",
                },
                {
                  name: "title",
                  title: "Naslov",
                  type: "string",
                },
                {
                  name: "description",
                  title: "Opis",
                  type: "string",
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
        },
        {
          name: "foundedYear",
          title: "Godina osnivanja",
          type: "string",
          initialValue: "1959",
        },
        {
          name: "videoSrc",
          title: "Video putanja",
          type: "string",
          description: "Putanja do video fajla",
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

    // Statistics Section
    defineField({
      name: "statistics",
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
          name: "subtitle",
          title: "Podnaslov",
          type: "string",
        },
        {
          name: "stats",
          title: "Statistike",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "icon",
                  title: "Font Awesome ikonica",
                  type: "string",
                },
                {
                  name: "label",
                  title: "Label",
                  type: "string",
                },
                {
                  name: "value",
                  title: "Vrednost",
                  type: "string",
                },
                {
                  name: "description",
                  title: "Opis",
                  type: "string",
                },
              ],
              preview: {
                select: {
                  title: "value",
                  subtitle: "description",
                },
              },
            },
          ],
        },
      ],
    }),

    // Management/Profiles Section
    defineField({
      name: "management",
      title: "Uprava",
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
          name: "subtitle",
          title: "Podnaslov",
          type: "string",
        },
        {
          name: "profiles",
          title: "Profili",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "id",
                  title: "ID (za tab)",
                  type: "string",
                },
                {
                  name: "icon",
                  title: "Font Awesome ikonica",
                  type: "string",
                },
                {
                  name: "tabText",
                  title: "Tekst na tabu",
                  type: "string",
                },
                {
                  name: "image",
                  title: "Slika",
                  type: "image",
                  options: { hotspot: true },
                },
                {
                  name: "name",
                  title: "Ime i prezime",
                  type: "string",
                },
                {
                  name: "title",
                  title: "Titula/pozicija",
                  type: "string",
                },
                {
                  name: "bioTitle",
                  title: "Naslov biografije",
                  type: "string",
                  initialValue: "Биографија",
                },
                {
                  name: "bioParagraphs",
                  title: "Paragrafi biografije",
                  type: "array",
                  of: [{ type: "text" }],
                },
              ],
              preview: {
                select: {
                  title: "name",
                  subtitle: "title",
                  media: "image",
                },
              },
            },
          ],
        },
      ],
    }),

    // Values Section
    defineField({
      name: "values",
      title: "Vrednosti",
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
          name: "subtitle",
          title: "Podnaslov",
          type: "string",
        },
        {
          name: "items",
          title: "Vrednosti",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "icon",
                  title: "Font Awesome ikonica",
                  type: "string",
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
                  rows: 3,
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
          validation: (Rule) => Rule.max(6),
        },
      ],
    }),

    // CTA Section
    defineField({
      name: "cta",
      title: "CTA sekcija",
      type: "object",
      fields: [
        {
          name: "heading",
          title: "Naslov",
          type: "string",
        },
        {
          name: "text",
          title: "Tekst",
          type: "string",
        },
        {
          name: "buttons",
          title: "Dugmad",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "text",
                  title: "Tekst",
                  type: "string",
                },
                {
                  name: "href",
                  title: "Link",
                  type: "string",
                },
                {
                  name: "icon",
                  title: "Font Awesome ikonica",
                  type: "string",
                },
                {
                  name: "variant",
                  title: "Varijanta",
                  type: "string",
                  options: {
                    list: [
                      { title: "Primary", value: "primary" },
                      { title: "Secondary", value: "secondary" },
                    ],
                  },
                  initialValue: "primary",
                },
              ],
              preview: {
                select: {
                  title: "text",
                  subtitle: "href",
                },
              },
            },
          ],
          validation: (Rule) => Rule.max(2),
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
        title: "О институту",
      };
    },
  },
});
