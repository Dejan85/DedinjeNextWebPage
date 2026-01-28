import { defineType, defineField } from "sanity";

export default defineType({
  name: "statItem",
  title: "Statistika",
  type: "object",
  fields: [
    defineField({
      name: "number",
      title: "Broj",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Labela",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Ikonica",
      type: "string",
      description: "Font Awesome klasa",
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "number",
    },
  },
});
