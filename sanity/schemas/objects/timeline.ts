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
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Podnaslov",
      type: "localeString",
    }),
    defineField({
      name: "description",
      title: "Opis",
      type: "localeText",
    }),
  ],
  preview: {
    select: {
      title: "title.sr",
      subtitle: "year",
    },
  },
});
