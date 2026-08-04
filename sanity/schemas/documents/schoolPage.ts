import { defineType, defineField } from "sanity";

export default defineType({
  name: "schoolPage",
  title: "Škola (edukativni program)",
  type: "document",
  icon: () => "🎓",
  fields: [
    defineField({
      name: "title",
      title: "Naslov",
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
      name: "subtitle",
      title: "Podnaslov",
      type: "localeString",
    }),
    defineField({
      name: "breadcrumbLabel",
      title: "Breadcrumb tekst",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Uvodna sekcija (opciono)",
      type: "object",
      fields: [
        { name: "heading", title: "Naslov", type: "localeString" },
        { name: "paragraphs", title: "Paragrafi", type: "array", of: [{ type: "localeText" }] },
        { name: "images", title: "Slike (putanje, opciono)", type: "array", of: [{ type: "string" }] },
      ],
    }),
    defineField({
      name: "programNav",
      title: "Program / kursevi kartice (opciono)",
      type: "object",
      fields: [
        { name: "heading", title: "Naslov", type: "localeString" },
        { name: "subtitle", title: "Podnaslov", type: "localeText" },
        {
          name: "items",
          title: "Kartice",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "icon", title: "Ikonica", type: "string" },
                { name: "title", title: "Naslov", type: "localeString" },
                { name: "href", title: "Link (npr. #anchor, opciono)", type: "string" },
                { name: "buttonText", title: "Tekst dugmeta (opciono)", type: "localeString" },
              ],
              preview: { select: { title: "title.sr" } },
            },
          ],
        },
      ],
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
          ],
          preview: { select: { title: "value", subtitle: "label.sr" } },
        },
      ],
    }),
    defineField({
      name: "courseSections",
      title: "Kursevi / programske sekcije",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "anchorId", title: "Anchor ID (opciono, za navigaciju sa programNav)", type: "string" },
            { name: "icon", title: "Ikonica", type: "string" },
            { name: "heading", title: "Naslov", type: "localeString", validation: (Rule) => Rule.required() },
            { name: "paragraphs", title: "Paragrafi", type: "array", of: [{ type: "localeText" }] },
            {
              name: "details",
              title: "Kartice detalja (npr. teorijska/praktična nastava, ispit)",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "icon", title: "Ikonica", type: "string" },
                    { name: "title", title: "Naslov", type: "localeString" },
                    { name: "description", title: "Opis", type: "localeText" },
                  ],
                  preview: { select: { title: "title.sr" } },
                },
              ],
            },
            {
              name: "metaLines",
              title: "Meta linije (ikonica + kratak tekst, npr. \"Trajanje kursa: 2 meseca\")",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "icon", title: "Ikonica", type: "string" },
                    { name: "text", title: "Tekst", type: "localeString" },
                  ],
                  preview: { select: { title: "text.sr" } },
                },
              ],
            },
            { name: "highlight", title: "Istaknuti citat/napomena (opciono)", type: "localeText" },
            { name: "image", title: "Slika (putanja, opciono)", type: "string" },
            { name: "contactNote", title: "Kontakt napomena (opciono)", type: "localeString" },
          ],
          preview: { select: { title: "heading.sr" } },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "requirementsSection",
      title: "Zahtevi i sertifikat (opciono)",
      type: "object",
      fields: [
        { name: "heading", title: "Naslov", type: "localeString" },
        { name: "subtitle", title: "Podnaslov", type: "localeText" },
        {
          name: "variant",
          title: "Prikaz",
          type: "string",
          options: { list: ["cards", "stats"] },
          initialValue: "cards",
        },
        {
          name: "items",
          title: "Stavke",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "icon", title: "Ikonica (za \"cards\" prikaz)", type: "string" },
                { name: "value", title: "Broj (za \"stats\" prikaz)", type: "string" },
                { name: "title", title: "Naslov (opciono)", type: "localeString" },
                { name: "description", title: "Opis", type: "localeText" },
              ],
              preview: { select: { title: "title.sr", subtitle: "value" } },
            },
          ],
        },
      ],
    }),
    defineField({
      name: "examSection",
      title: "Završni ispit (opciono)",
      type: "object",
      fields: [
        { name: "heading", title: "Naslov", type: "localeString" },
        {
          name: "cards",
          title: "Kartice",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "icon", title: "Ikonica", type: "string" },
                { name: "heading", title: "Naslov", type: "localeString" },
                { name: "intro", title: "Uvodni tekst", type: "localeText" },
                { name: "listItems", title: "Lista stavki (opciono)", type: "array", of: [{ type: "localeText" }] },
                { name: "outro", title: "Zaključni tekst (opciono)", type: "localeText" },
                { name: "badge", title: "Bedž tekst (opciono)", type: "localeText" },
              ],
              preview: { select: { title: "heading.sr" } },
            },
          ],
        },
      ],
    }),
    defineField({
      name: "team",
      title: "Tim (opciono)",
      type: "object",
      fields: [
        { name: "heading", title: "Naslov", type: "localeString" },
        { name: "subtitle", title: "Podnaslov", type: "localeText" },
        {
          name: "members",
          title: "Članovi",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "name", title: "Ime", type: "string" },
                { name: "role", title: "Uloga (opciono)", type: "localeString" },
              ],
              preview: { select: { title: "name", subtitle: "role.sr" } },
            },
          ],
        },
      ],
    }),
    defineField({
      name: "techTeam",
      title: "Tehnički tim (opciono, npr. ehotehničari)",
      type: "object",
      fields: [
        { name: "heading", title: "Naslov", type: "localeString" },
        { name: "members", title: "Imena", type: "array", of: [{ type: "string" }] },
        { name: "footnote", title: "Napomena ispod (opciono)", type: "localeString" },
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
