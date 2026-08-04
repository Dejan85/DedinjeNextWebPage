import { defineType, defineField } from "sanity";

export default defineType({
  name: "introSection",
  title: "Uvodna sekcija",
  type: "object",
  icon: () => "👋",
  fields: [
    defineField({
      name: "icon",
      title: "Ikonica",
      type: "string",
      description: 'Font Awesome klasa (npr. "fas fa-info-circle")',
    }),
    defineField({
      name: "heading",
      title: "Naslov",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "paragraphs",
      title: "Paragrafi",
      type: "array",
      of: [{ type: "localeText" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "badges",
      title: "Bedževi (opciono, npr. specijalnosti tima)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "Ikonica", type: "string" },
            { name: "label", title: "Tekst", type: "localeString" },
          ],
          preview: { select: { title: "label.sr" } },
        },
      ],
    }),
    defineField({
      name: "stats",
      title: "Statistika pilule (opciono, npr. \"19 ambulanti\")",
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
  ],
  preview: {
    select: { title: "heading.sr" },
    prepare({ title }) {
      return { title: `👋 ${title || "Uvodna sekcija"}` };
    },
  },
});
