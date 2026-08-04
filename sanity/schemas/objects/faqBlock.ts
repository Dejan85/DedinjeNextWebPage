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
      type: "localeString",
    }),
    defineField({
      name: "subtitle",
      title: "Podnaslov",
      type: "localeString",
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
              type: "localeString",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "answer",
              title: "Odgovor",
              type: "localeText",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "category",
              title: "Kategorija",
              type: "localeString",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: { select: { title: "question.sr", subtitle: "category.sr" } },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title.sr" },
    prepare({ title }) {
      return { title: `❓ ${title || "FAQ"}` };
    },
  },
});
