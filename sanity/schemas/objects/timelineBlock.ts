import { defineType, defineField } from "sanity";

export default defineType({
  name: "timelineBlock",
  title: "Timeline (istorijat)",
  type: "object",
  icon: () => "🕰️",
  fields: [
    defineField({
      name: "heading",
      title: "Naslov",
      type: "localeString",
    }),
    defineField({
      name: "intro",
      title: "Uvodni tekst (opciono)",
      type: "localeText",
    }),
    defineField({
      name: "items",
      title: "Stavke",
      type: "array",
      of: [{ type: "timeline" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "heading.sr" },
    prepare({ title }) {
      return { title: `🕰️ ${title || "Timeline"}` };
    },
  },
});
