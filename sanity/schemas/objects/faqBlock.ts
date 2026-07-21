import { defineType, defineField } from "sanity";

export default defineType({
  name: "faqBlock",
  title: "FAQ",
  type: "object",
  icon: () => "❓",
  fields: [
    defineField({
      name: "title",
      title: "Naslov",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Podnaslov",
      type: "string",
    }),
    defineField({
      name: "items",
      title: "Pitanja",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "question",
              title: "Pitanje",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "answer",
              title: "Odgovor",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
            {
              name: "category",
              title: "Kategorija",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: { select: { title: "question", subtitle: "category" } },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: `❓ ${title || "FAQ"}` };
    },
  },
});
