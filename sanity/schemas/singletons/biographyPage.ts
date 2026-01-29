import { defineType, defineField } from "sanity";

export default defineType({
  name: "biographyPage",
  title: "Биографија",
  type: "document",
  icon: () => "👨‍⚕️",
  fields: [
    // Page Header
    defineField({
      name: "pageHeader",
      title: "Zaglavlje stranice",
      type: "object",
      fields: [
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
        },
      ],
    }),

    // Biography Intro
    defineField({
      name: "intro",
      title: "Uvodni deo",
      type: "object",
      fields: [
        {
          name: "image",
          title: "Fotografija",
          type: "image",
          options: { hotspot: true },
          validation: (Rule) => Rule.required(),
        },
        {
          name: "name",
          title: "Ime i prezime",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "position",
          title: "Pozicija",
          type: "string",
        },
        {
          name: "shortBio",
          title: "Kratka biografija",
          type: "text",
          rows: 3,
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
      ],
    }),

    // Professional Path Timeline
    defineField({
      name: "professionalPath",
      title: "Profesionalni put",
      type: "object",
      fields: [
        {
          name: "badge",
          title: "Badge",
          type: "string",
          initialValue: "Каријера",
        },
        {
          name: "heading",
          title: "Naslov",
          type: "string",
          initialValue: "Професионални пут",
        },
        {
          name: "timeline",
          title: "Timeline stavke",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "year",
                  title: "Godina/Period",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "title",
                  title: "Naslov pozicije",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "institution",
                  title: "Institucija",
                  type: "string",
                },
                {
                  name: "description",
                  title: "Opis",
                  type: "text",
                  rows: 4,
                },
              ],
              preview: {
                select: {
                  title: "title",
                  subtitle: "year",
                },
              },
            },
          ],
        },
      ],
    }),

    // Academic Qualifications
    defineField({
      name: "academicQualifications",
      title: "Akademska kvalifikacija",
      type: "object",
      fields: [
        {
          name: "badge",
          title: "Badge",
          type: "string",
          initialValue: "Образовање",
        },
        {
          name: "heading",
          title: "Naslov",
          type: "string",
          initialValue: "Академска квалификација",
        },
        {
          name: "qualifications",
          title: "Kvalifikacije",
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
                  name: "degree",
                  title: "Stepen obrazovanja",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "institution",
                  title: "Institucija",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "year",
                  title: "Godina",
                  type: "string",
                },
                {
                  name: "description",
                  title: "Opis/Tema rada",
                  type: "text",
                  rows: 3,
                },
              ],
              preview: {
                select: {
                  title: "degree",
                  subtitle: "institution",
                },
              },
            },
          ],
          validation: (Rule) => Rule.max(4),
        },
        {
          name: "additionalInfo",
          title: "Dodatne informacije",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "title",
                  title: "Naslov",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "content",
                  title: "Sadržaj",
                  type: "text",
                  rows: 5,
                },
              ],
              preview: {
                select: {
                  title: "title",
                },
              },
            },
          ],
        },
      ],
    }),

    // Full Biography
    defineField({
      name: "fullBiography",
      title: "Kompletna biografija",
      type: "object",
      fields: [
        {
          name: "sections",
          title: "Sekcije biografije",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "heading",
                  title: "Naslov sekcije",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "paragraphs",
                  title: "Paragrafi",
                  type: "array",
                  of: [
                    {
                      type: "text",
                      rows: 5,
                    },
                  ],
                },
              ],
              preview: {
                select: {
                  title: "heading",
                },
              },
            },
          ],
        },
        {
          name: "pdfDownloadUrl",
          title: "PDF link za preuzimanje",
          type: "string",
          description: "Putanja do PDF fajla biografije",
        },
        {
          name: "pdfButtonText",
          title: "Tekst dugmeta za preuzimanje",
          type: "string",
          initialValue: "Преузмите комплетну биографију (PDF)",
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
                  name: "variant",
                  title: "Varijanta",
                  type: "string",
                  options: {
                    list: [
                      { title: "Primary", value: "primary" },
                      { title: "Outline", value: "outline" },
                    ],
                  },
                },
              ],
            },
          ],
          validation: (Rule) => Rule.max(3),
        },
      ],
    }),

    // SEO Metadata
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        {
          name: "title",
          title: "SEO Naslov",
          type: "string",
        },
        {
          name: "description",
          title: "SEO Opis",
          type: "text",
          rows: 3,
        },
        {
          name: "keywords",
          title: "Ključne reči",
          type: "array",
          of: [{ type: "string" }],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Биографија - Академик проф. др Милован М. Бојић",
      };
    },
  },
});
