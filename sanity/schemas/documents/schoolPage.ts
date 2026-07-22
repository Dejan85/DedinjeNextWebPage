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
      name: "subtitle",
      title: "Podnaslov",
      type: "string",
    }),
    defineField({
      name: "breadcrumbLabel",
      title: "Breadcrumb tekst",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Uvodna sekcija (opciono)",
      type: "object",
      fields: [
        { name: "heading", title: "Naslov", type: "string" },
        { name: "paragraphs", title: "Paragrafi", type: "array", of: [{ type: "text", rows: 3 }] },
        { name: "images", title: "Slike (putanje, opciono)", type: "array", of: [{ type: "string" }] },
      ],
    }),
    defineField({
      name: "programNav",
      title: "Program / kursevi kartice (opciono)",
      type: "object",
      fields: [
        { name: "heading", title: "Naslov", type: "string" },
        { name: "subtitle", title: "Podnaslov", type: "text", rows: 2 },
        {
          name: "items",
          title: "Kartice",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "icon", title: "Ikonica", type: "string" },
                { name: "title", title: "Naslov", type: "string" },
                { name: "href", title: "Link (npr. #anchor, opciono)", type: "string" },
                { name: "buttonText", title: "Tekst dugmeta (opciono)", type: "string" },
              ],
              preview: { select: { title: "title" } },
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
            { name: "label", title: "Label", type: "string" },
          ],
          preview: { select: { title: "value", subtitle: "label" } },
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
            { name: "heading", title: "Naslov", type: "string", validation: (Rule) => Rule.required() },
            { name: "paragraphs", title: "Paragrafi", type: "array", of: [{ type: "text", rows: 3 }] },
            {
              name: "details",
              title: "Kartice detalja (npr. teorijska/praktična nastava, ispit)",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "icon", title: "Ikonica", type: "string" },
                    { name: "title", title: "Naslov", type: "string" },
                    { name: "description", title: "Opis", type: "text", rows: 3 },
                  ],
                  preview: { select: { title: "title" } },
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
                    { name: "text", title: "Tekst", type: "string" },
                  ],
                  preview: { select: { title: "text" } },
                },
              ],
            },
            { name: "highlight", title: "Istaknuti citat/napomena (opciono)", type: "text", rows: 3 },
            { name: "image", title: "Slika (putanja, opciono)", type: "string" },
            { name: "contactNote", title: "Kontakt napomena (opciono)", type: "string" },
          ],
          preview: { select: { title: "heading" } },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "requirementsSection",
      title: "Zahtevi i sertifikat (opciono)",
      type: "object",
      fields: [
        { name: "heading", title: "Naslov", type: "string" },
        { name: "subtitle", title: "Podnaslov", type: "text", rows: 2 },
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
                { name: "title", title: "Naslov (opciono)", type: "string" },
                { name: "description", title: "Opis", type: "text", rows: 2 },
              ],
              preview: { select: { title: "title", subtitle: "value" } },
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
        { name: "heading", title: "Naslov", type: "string" },
        {
          name: "cards",
          title: "Kartice",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "icon", title: "Ikonica", type: "string" },
                { name: "heading", title: "Naslov", type: "string" },
                { name: "intro", title: "Uvodni tekst", type: "text", rows: 2 },
                { name: "listItems", title: "Lista stavki (opciono)", type: "array", of: [{ type: "text", rows: 2 }] },
                { name: "outro", title: "Zaključni tekst (opciono)", type: "text", rows: 2 },
                { name: "badge", title: "Bedž tekst (opciono)", type: "text", rows: 2 },
              ],
              preview: { select: { title: "heading" } },
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
        { name: "heading", title: "Naslov", type: "string" },
        { name: "subtitle", title: "Podnaslov", type: "text", rows: 2 },
        {
          name: "members",
          title: "Članovi",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "name", title: "Ime", type: "string" },
                { name: "role", title: "Uloga (opciono)", type: "string" },
              ],
              preview: { select: { title: "name", subtitle: "role" } },
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
        { name: "heading", title: "Naslov", type: "string" },
        { name: "members", title: "Imena", type: "array", of: [{ type: "string" }] },
        { name: "footnote", title: "Napomena ispod (opciono)", type: "string" },
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
