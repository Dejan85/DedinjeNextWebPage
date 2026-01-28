import { defineType, defineField } from "sanity";

export default defineType({
  name: "infoBox",
  title: "Info kutija",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Ikonica",
      type: "string",
      description: "Font Awesome klasa",
    }),
    defineField({
      name: "title",
      title: "Naslov",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Opis",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
