import { defineType, defineField } from "sanity";

export default defineType({
  name: "timeline",
  title: "Timeline stavka",
  type: "object",
  fields: [
    defineField({
      name: "year",
      title: "Godina",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Naslov",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Podnaslov",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Opis",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "year",
    },
  },
});
