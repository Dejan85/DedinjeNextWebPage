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
          type: "localeString",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "title",
          title: "Naslov",
          type: "localeString",
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
          type: "localeString",
          initialValue: { sr: "О нама", en: "About us" },
        },
        {
          name: "heading",
          title: "Naslov",
          type: "localeString",
        },
        {
          name: "leadText",
          title: "Lead tekst",
          type: "localeText",
        },
        {
          name: "bodyText",
          title: "Body tekst",
          type: "localeText",
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
                  type: "localeString",
                },
                {
                  name: "description",
                  title: "Opis",
                  type: "localeString",
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
          type: "localeString",
        },
        {
          name: "videoCaption",
          title: "Video caption",
          type: "localeString",
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
          type: "localeString",
        },
        {
          name: "heading",
          title: "Naslov",
          type: "localeString",
        },
        {
          name: "subtitle",
          title: "Podnaslov",
          type: "localeString",
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
                  type: "localeString",
                },
                {
                  name: "value",
                  title: "Vrednost",
                  type: "string",
                },
                {
                  name: "description",
                  title: "Opis",
                  type: "localeString",
                },
              ],
              preview: {
                select: {
                  title: "value",
                  subtitle: "description.sr",
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
          type: "localeString",
        },
        {
          name: "heading",
          title: "Naslov",
          type: "localeString",
        },
        {
          name: "subtitle",
          title: "Podnaslov",
          type: "localeString",
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
                  type: "localeString",
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
                  type: "localeString",
                },
                {
                  name: "bioTitle",
                  title: "Naslov biografije",
                  type: "localeString",
                  initialValue: { sr: "Биографија", en: "Biography" },
                },
                {
                  name: "bioParagraphs",
                  title: "Paragrafi biografije",
                  type: "array",
                  of: [{ type: "localeText" }],
                },
              ],
              preview: {
                select: {
                  title: "name",
                  subtitle: "title.sr",
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
          type: "localeString",
        },
        {
          name: "heading",
          title: "Naslov",
          type: "localeString",
        },
        {
          name: "subtitle",
          title: "Podnaslov",
          type: "localeString",
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
                  type: "localeString",
                },
                {
                  name: "description",
                  title: "Opis",
                  type: "localeText",
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
          type: "localeString",
        },
        {
          name: "text",
          title: "Tekst",
          type: "localeString",
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
                  type: "localeString",
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
                  title: "text.sr",
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
        title: "О институту",
      };
    },
  },
});
