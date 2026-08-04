import { defineType, defineField } from "sanity";

export default defineType({
  name: "documentListBlock",
  title: "Lista dokumenata",
  type: "object",
  icon: () => "📄",
  fields: [
    defineField({
      name: "heading",
      title: "Naslov sekcije",
      type: "localeString",
    }),
    defineField({
      name: "subtitle",
      title: "Podnaslov sekcije",
      type: "localeString",
    }),
    defineField({
      name: "items",
      title: "Dokumenta",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "Ikonica", type: "string" },
            { name: "label", title: "Naziv dokumenta", type: "localeString", validation: (Rule) => Rule.required() },
            { name: "href", title: "Link ka PDF-u", type: "string", validation: (Rule) => Rule.required() },
            { name: "year", title: "Godina (opciono)", type: "string" },
          ],
          preview: { select: { title: "label.sr", subtitle: "year" } },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "heading.sr" },
    prepare({ title }) {
      return { title: `📄 ${title || "Lista dokumenata"}` };
    },
  },
});
