import { defineType, defineField } from "sanity";

export default defineType({
  name: "publication",
  title: "Publikacije",
  type: "document",
  icon: () => "📚",
  fields: [
    defineField({
      name: "title",
      title: "Naslov rada",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authors",
      title: "Autori",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "journal",
      title: "Časopis",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Godina",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "volume",
      title: "Volumen",
      type: "string",
    }),
    defineField({
      name: "pages",
      title: "Strane",
      type: "string",
    }),
    defineField({
      name: "doi",
      title: "DOI",
      type: "string",
    }),
    defineField({
      name: "pmid",
      title: "PubMed ID",
      type: "string",
    }),
    defineField({
      name: "abstract",
      title: "Abstrakt",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "url",
      title: "Link",
      type: "url",
    }),
    defineField({
      name: "category",
      title: "Kategorija",
      type: "string",
      options: {
        list: [
          { title: "M21a+", value: "m21a+" },
          { title: "M21a", value: "m21a" },
          { title: "M21", value: "m21" },
          { title: "M22", value: "m22" },
          { title: "M23", value: "m23" },
        ],
      },
    }),
    defineField({
      name: "impactFactor",
      title: "Impact Factor",
      type: "number",
    }),
    defineField({
      name: "doctor",
      title: "Povezan lekar",
      type: "reference",
      to: [{ type: "doctor" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "year",
      authors: "authors",
    },
    prepare({ title, subtitle, authors }) {
      return {
        title,
        subtitle: `${subtitle} - ${authors?.[0] || ""}`,
      };
    },
  },
  orderings: [
    {
      title: "Godina, najnovije",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
});
