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
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (ruta)",
      type: "slug",
      options: { source: "title.sr", maxLength: 96 },
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
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Podnaslov",
      type: "localeText",
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
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "introText",
      title: "Tekst intro sekcije",
      type: "localeText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "introParagraphs",
      title: "Dodatni paragrafi (istorijat i sl.)",
      type: "array",
      of: [{ type: "localeText" }],
    }),
    defineField({
      name: "organizationalStructure",
      title: "Organizaciona struktura (opciono)",
      description: "Poseban paragraf o unutrašnjoj organizaciji klinike (odeljenja/odseci).",
      type: "localeText",
    }),
    defineField({
      name: "stats",
      title: "Statistika (opciono)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Vrednost", type: "string" },
            { name: "label", title: "Label", type: "localeString" },
            { name: "icon", title: "Ikonica", type: "string" },
          ],
          preview: { select: { title: "value", subtitle: "label.sr" } },
        },
      ],
    }),
    defineField({
      name: "highlights",
      title: "Najznačajniji rezultati (opciono)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "Ikonica", type: "string" },
            { name: "text", title: "Tekst", type: "localeText" },
          ],
          preview: { select: { title: "text.sr" } },
        },
      ],
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
            { name: "title", title: "Naslov", type: "localeString" },
            { name: "desc", title: "Opis", type: "localeText" },
          ],
          preview: { select: { title: "title.sr", subtitle: "desc.sr" } },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "areasTitle",
      title: "Naslov sekcije oblasti rada",
      type: "localeString",
    }),
    defineField({
      name: "areasSubtitle",
      title: "Podnaslov sekcije oblasti rada",
      type: "localeString",
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
        { name: "label", title: "Label", type: "localeString" },
        { name: "desc", title: "Opis", type: "localeString" },
      ],
    }),
    defineField({
      name: "proceduresList",
      title: "Lista procedura (opciono)",
      type: "object",
      fields: [
        { name: "title", title: "Naslov", type: "localeString" },
        {
          name: "items",
          title: "Stavke",
          type: "array",
          of: [{ type: "localeString" }],
        },
      ],
    }),
    defineField({
      name: "staffList",
      title: "Kadar (opciono)",
      type: "object",
      fields: [
        { name: "title", title: "Naslov", type: "localeString" },
        {
          name: "groups",
          title: "Grupe",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "heading", title: "Naslov grupe", type: "localeString" },
                {
                  name: "names",
                  title: "Imena (prost spisak)",
                  type: "array",
                  of: [{ type: "string" }],
                },
                {
                  name: "members",
                  title: "Članovi sa ulogom (opciono, alternativa 'Imena')",
                  description:
                    "Ako je popunjeno, koristi se umesto 'Imena' za prikaz kartica ime+uloga.",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      fields: [
                        { name: "name", title: "Ime", type: "string" },
                        { name: "role", title: "Uloga", type: "localeString" },
                      ],
                      preview: { select: { title: "name", subtitle: "role.sr" } },
                    },
                  ],
                },
              ],
              preview: { select: { title: "heading.sr" } },
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
        { name: "title", title: "Naslov", type: "localeString" },
        {
          name: "paragraphs",
          title: "Paragrafi",
          type: "array",
          of: [{ type: "localeText" }],
        },
      ],
    }),
    defineField({
      name: "units",
      title: "Pod-jedinice (opciono, npr. odeljenja kardiohirurgije)",
      description:
        "Za klinike sa sopstvenim pod-stranicama (npr. Одељење кардиохирургије 1/2) — svaka stavka postaje ruta /klinike/<slug klinike>/<slug jedinice>.",
      type: "array",
      of: [
        {
          type: "object",
          name: "clinicUnit",
          fields: [
            { name: "slug", title: "Slug (deo URL-a)", type: "string" },
            { name: "title", title: "Naslov", type: "localeString" },
            { name: "heroImage", title: "Slika (putanja ili URL)", type: "string" },
            { name: "heroSubtitle", title: "Podnaslov", type: "localeText" },
            {
              name: "sections",
              title: "Sekcije sadržaja",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "clinicUnitParagraph",
                  title: "Paragraf",
                  fields: [
                    { name: "type", title: "Tip", type: "string", initialValue: "paragraph", readOnly: true },
                    { name: "title", title: "Naslov", type: "localeString" },
                    { name: "text", title: "Tekst", type: "localeText" },
                  ],
                  preview: { select: { title: "title.sr" } },
                },
                {
                  type: "object",
                  name: "clinicUnitList",
                  title: "Lista",
                  fields: [
                    { name: "type", title: "Tip", type: "string", initialValue: "list", readOnly: true },
                    { name: "title", title: "Naslov", type: "localeString" },
                    {
                      name: "items",
                      title: "Stavke",
                      type: "array",
                      of: [{ type: "localeString" }],
                    },
                  ],
                  preview: { select: { title: "title.sr" } },
                },
              ],
            },
          ],
          preview: { select: { title: "title.sr", subtitle: "slug" } },
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        { name: "title", title: "Meta naslov", type: "localeString" },
        { name: "description", title: "Meta opis", type: "localeText" },
      ],
    }),
  ],
  preview: {
    select: { title: "title.sr", subtitle: "subtitle.sr" },
  },
});
