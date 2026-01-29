import { defineType, defineField } from "sanity";

export default defineType({
  name: "statItem",
  title: "Statistika",
  type: "object",
  icon: () => "📊",
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
      number: "number",
      icon: "icon",
    },
    prepare({ title, number, icon }) {
      return {
        title: `📊 ${number || 0} - ${title || "Statistika"}`,
        subtitle: icon || "Bez ikone",
      };
    },
  },
});
