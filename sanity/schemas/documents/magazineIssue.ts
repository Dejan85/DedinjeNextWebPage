import { defineType, defineField } from "sanity";

export default defineType({
  name: "magazineIssue",
  title: "Часопис Дедиње — издања",
  type: "document",
  icon: () => "📖",
  fields: [
    defineField({ name: "volume", title: "Volumen", type: "string" }),
    defineField({ name: "number", title: "Broj", type: "string" }),
    defineField({ name: "year", title: "Godina", type: "string" }),
    defineField({
      name: "title",
      title: "Naslov (tema izdanja)",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "topics",
      title: "Teme",
      type: "array",
      of: [{ type: "localeString" }],
    }),
    defineField({
      name: "pdfUrl",
      title: "PDF link",
      type: "string",
    }),
    defineField({
      name: "coverColor",
      title: "Boja korica (hex)",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Redosled (manji broj = novije)",
      type: "number",
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
    select: { title: "title.sr", volume: "volume", number: "number", year: "year" },
    prepare({ title, volume, number, year }) {
      return {
        title,
        subtitle: `Вол. ${volume}, Бр. ${number} (${year})`,
      };
    },
  },
  orderings: [
    { title: "Redosled", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
