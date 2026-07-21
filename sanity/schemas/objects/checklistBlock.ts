import { defineType, defineField } from "sanity";

export default defineType({
  name: "checklistBlock",
  title: "Checklist",
  type: "object",
  icon: () => "✅",
  fields: [
    defineField({
      name: "heading",
      title: "Naslov",
      type: "string",
    }),
    defineField({
      name: "intro",
      title: "Uvodni tekst (opciono)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "items",
      title: "Stavke",
      type: "array",
      of: [{ type: "text", rows: 2 }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: `✅ ${title || "Checklist"}` };
    },
  },
});
