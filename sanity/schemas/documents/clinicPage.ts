import { defineType, defineField } from "sanity";

export default defineType({
  name: "clinicPage",
  title: "Клиника",
  type: "document",
  icon: () => "🏥",
  fields: [
    defineField({
      name: "title",
      title: "Наслов",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (ruta)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Redosled na /klinike hub-u",
      type: "number",
    }),
    defineField({
      name: "breadcrumbLabel",
      title: "Breadcrumb tekst",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Podnaslov",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "introIcon",
      title: "Ikonica (intro + hub kartica)",
      type: "string",
      description: 'Font Awesome klasa, npr. "fas fa-syringe"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "introTitle",
      title: "Naslov intro sekcije",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "introText",
      title: "Tekst intro sekcije",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "introParagraphs",
      title: "Dodatni paragrafi (istorijat i sl.)",
      type: "array",
      of: [{ type: "text", rows: 4 }],
    }),
    defineField({
      name: "areas",
      title: "Ključne oblasti rada",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "Ikonica", type: "string" },
            { name: "title", title: "Naslov", type: "string" },
            { name: "desc", title: "Opis", type: "text", rows: 2 },
          ],
          preview: { select: { title: "title", subtitle: "desc" } },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "areasTitle",
      title: "Naslov sekcije oblasti rada",
      type: "string",
    }),
    defineField({
      name: "areasSubtitle",
      title: "Podnaslov sekcije oblasti rada",
      type: "string",
    }),
    defineField({
      name: "areasIcon",
      title: "Ikonica sekcije oblasti rada",
      type: "string",
    }),
    defineField({
      name: "extraBanner",
      title: "Istaknuti banner (opciono)",
      type: "object",
      fields: [
        { name: "value", title: "Vrednost", type: "string" },
        { name: "label", title: "Label", type: "string" },
        { name: "desc", title: "Opis", type: "string" },
      ],
    }),
    defineField({
      name: "proceduresList",
      title: "Lista procedura (opciono)",
      type: "object",
      fields: [
        { name: "title", title: "Naslov", type: "string" },
        {
          name: "items",
          title: "Stavke",
          type: "array",
          of: [{ type: "string" }],
        },
      ],
    }),
    defineField({
      name: "staffList",
      title: "Kadar (opciono)",
      type: "object",
      fields: [
        { name: "title", title: "Naslov", type: "string" },
        {
          name: "groups",
          title: "Grupe",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "heading", title: "Naslov grupe", type: "string" },
                {
                  name: "names",
                  title: "Imena",
                  type: "array",
                  of: [{ type: "string" }],
                },
              ],
              preview: { select: { title: "heading" } },
            },
          ],
        },
      ],
    }),
    defineField({
      name: "patientInstructions",
      title: "Uputstvo za pacijente (opciono)",
      type: "object",
      fields: [
        { name: "title", title: "Naslov", type: "string" },
        {
          name: "paragraphs",
          title: "Paragrafi",
          type: "array",
          of: [{ type: "text", rows: 3 }],
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        { name: "title", title: "Meta naslov", type: "string" },
        { name: "description", title: "Meta opis", type: "text", rows: 3 },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "subtitle" },
  },
});
