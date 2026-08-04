import { defineType, defineField } from "sanity";

const memberFields = [
  { name: "name", title: "Ime", type: "string" },
  { name: "role", title: "Uloga/titula", type: "localeString" },
];

export default defineType({
  name: "boardListBlock",
  title: "Lista odbora/organa",
  type: "object",
  icon: () => "🏛️",
  fields: [
    defineField({ name: "heading", title: "Naslov sekcije", type: "localeString" }),
    defineField({ name: "subtitle", title: "Podnaslov sekcije", type: "localeString" }),
    defineField({
      name: "boards",
      title: "Odbori/organi",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "Ikonica", type: "string" },
            { name: "title", title: "Naziv odbora", type: "localeString" },
            { name: "chairman", title: "Predsednik", type: "object", fields: memberFields },
            { name: "viceChairman", title: "Zamenik predsednika (opciono)", type: "object", fields: memberFields },
            { name: "membersLabel", title: "Naslov liste članova", type: "localeString" },
            {
              name: "members",
              title: "Članovi",
              type: "array",
              of: [{ type: "object", fields: memberFields, preview: { select: { title: "name", subtitle: "role.sr" } } }],
            },
          ],
          preview: { select: { title: "title.sr" } },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "heading.sr", boards: "boards" },
    prepare({ title, boards }) {
      return {
        title: `🏛️ ${title || "Lista odbora/organa"}`,
        subtitle: `${boards?.length || 0} odbora`,
      };
    },
  },
});
