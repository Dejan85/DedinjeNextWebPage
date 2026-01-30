import { defineType, defineField } from "sanity";

export default defineType({
  name: "bibliographyPage",
  title: "Библиографија",
  type: "document",
  icon: () => "📚",
  fields: [
    // Page Header
    defineField({
      name: "pageHeader",
      title: "Zaglavlje stranice",
      type: "object",
      fields: [
        {
          name: "breadcrumbs",
          title: "Breadcrumbs",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "label",
                  title: "Tekst",
                  type: "string",
                },
                {
                  name: "href",
                  title: "Link",
                  type: "string",
                },
              ],
            },
          ],
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
        },
      ],
    }),

    // Introduction
    defineField({
      name: "introduction",
      title: "Uvodni deo",
      type: "object",
      fields: [
        {
          name: "heading",
          title: "Naslov",
          type: "string",
        },
        {
          name: "description",
          title: "Opis",
          type: "text",
          rows: 3,
        },
        {
          name: "stats",
          title: "Statistika",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "value",
                  title: "Vrednost",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "label",
                  title: "Label",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
              ],
              preview: {
                select: {
                  title: "label",
                  subtitle: "value",
                },
              },
            },
          ],
          validation: (Rule) => Rule.max(6),
        },
      ],
    }),

    // Bibliography Categories
    defineField({
      name: "categories",
      title: "Kategorije publikacija",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "categoryId",
              title: "ID kategorije",
              type: "string",
              description: "Jedinstveni identifikator (npr. m21a-plus, m21a)",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "icon",
              title: "Font Awesome ikonica",
              type: "string",
              description: "Npr: fas fa-trophy",
            },
            {
              name: "title",
              title: "Naslov kategorije",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "Opis kategorije",
              type: "string",
            },
            {
              name: "publications",
              title: "Publikacije",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "number",
                      title: "Redni broj",
                      type: "number",
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "text",
                      title: "Tekst publikacije",
                      type: "text",
                      rows: 5,
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                  preview: {
                    select: {
                      title: "number",
                      subtitle: "text",
                    },
                    prepare(selection) {
                      const { title, subtitle } = selection;
                      return {
                        title: `${title}. ${subtitle?.substring(0, 60)}...`,
                      };
                    },
                  },
                },
              ],
            },
            {
              name: "collapsible",
              title: "Expandable (za dugačke liste)",
              type: "boolean",
              description:
                "Da li će ova kategorija biti sakrivena iza 'Show More' dugmeta",
              initialValue: false,
            },
            {
              name: "initiallyExpanded",
              title: "Inicijalno prošireno",
              type: "boolean",
              description: "Da li će kategorija biti otvorena po defaultu",
              initialValue: true,
            },
          ],
          preview: {
            select: {
              title: "title",
              categoryId: "categoryId",
            },
            prepare(selection) {
              const { title, categoryId } = selection;
              return {
                title: title,
                subtitle: categoryId,
              };
            },
          },
        },
      ],
    }),

    // Download Section
    defineField({
      name: "download",
      title: "Sekcija za preuzimanje",
      type: "object",
      fields: [
        {
          name: "heading",
          title: "Naslov",
          type: "string",
        },
        {
          name: "description",
          title: "Opis",
          type: "string",
        },
        {
          name: "buttonText",
          title: "Tekst dugmeta",
          type: "string",
          initialValue: "Преузми комплетну библиографију (PDF)",
        },
        {
          name: "fileUrl",
          title: "PDF link",
          type: "string",
          description: "Putanja do PDF fajla",
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
        title: "Библиографија - Академик проф. др Милован М. Бојић",
      };
    },
  },
});
