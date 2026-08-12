import { defineType, defineField } from "sanity";

export default defineType({
  name: "partnersSection",
  title: "Partners Section",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "partners",
      title: "Partners",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              description: "FontAwesome icon class (e.g., 'fas fa-hospital'), koristi se samo ako logotip nije unet.",
            }),
            defineField({
              name: "image",
              title: "Logotip",
              type: "string",
              description: "Putanja do fajla u /public/images/partners (npr. /images/partners/ministarstvo-nauke.svg).",
            }),
            defineField({
              name: "name",
              title: "Name",
              type: "localeString",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "subtitle",
              title: "Dodatni tekst",
              type: "localeString",
              description: "Kratak dodatni red ispod naziva (npr. broj odluke/rešenja).",
            }),
          ],
          preview: {
            select: {
              title: "name.sr",
              subtitle: "icon",
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(10),
    }),
  ],
  preview: {
    select: {
      title: "heading.sr",
      partners: "partners",
    },
    prepare({ title, partners }) {
      return {
        title: title || "Partners Section",
        subtitle: partners ? `${partners.length} партнера` : "Нема партнера",
      };
    },
  },
});
