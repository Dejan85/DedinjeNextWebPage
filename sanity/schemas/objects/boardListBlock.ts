import { defineType, defineField } from "sanity";

const memberFields = [
  { name: "name", title: "Ime", type: "string" },
  { name: "role", title: "Uloga/titula", type: "string" },
];

export default defineType({
  name: "boardListBlock",
  title: "Lista odbora/organa",
  type: "object",
  icon: () => "🏛️",
  fields: [
    defineField({ name: "heading", title: "Naslov sekcije", type: "string" }),
    defineField({ name: "subtitle", title: "Podnaslov sekcije", type: "string" }),
    defineField({
      name: "boards",
      title: "Odbori/organi",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "Ikonica", type: "string" },
            { name: "title", title: "Naziv odbora", type: "string" },
            { name: "chairman", title: "Predsednik", type: "object", fields: memberFields },
            { name: "viceChairman", title: "Zamenik predsednika (opciono)", type: "object", fields: memberFields },
            { name: "membersLabel", title: "Naslov liste članova", type: "string" },
            {
              name: "members",
              title: "Članovi",
              type: "array",
              of: [{ type: "object", fields: memberFields, preview: { select: { title: "name", subtitle: "role" } } }],
            },
          ],
          preview: { select: { title: "title" } },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "heading", boards: "boards" },
    prepare({ title, boards }) {
      return {
        title: `🏛️ ${title || "Lista odbora/organa"}`,
        subtitle: `${boards?.length || 0} odbora`,
      };
    },
  },
});
