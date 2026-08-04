import { defineType, defineField } from "sanity";

export default defineType({
  name: "bannerBlock",
  title: "Banner",
  type: "object",
  icon: () => "📢",
  fields: [
    defineField({
      name: "variant",
      title: "Tip bannera",
      type: "string",
      options: {
        list: [
          { title: "Info", value: "info" },
          { title: "Upozorenje (alert)", value: "alert" },
          { title: "Zabrana (warning)", value: "warning" },
          { title: "Moto / isticanje", value: "motto" },
          { title: "Koordinator / istaknuta osoba", value: "highlight" },
        ],
        layout: "radio",
      },
      initialValue: "info",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Ikonica",
      type: "string",
      description: 'Font Awesome klasa (npr. "fas fa-triangle-exclamation")',
    }),
    defineField({
      name: "title",
      title: "Naslov (opciono)",
      type: "localeString",
    }),
    defineField({
      name: "text",
      title: "Tekst",
      type: "localeText",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title.sr", text: "text.sr", variant: "variant" },
    prepare({ title, text, variant }) {
      return {
        title: `📢 ${title || text?.substring(0, 50) || "Banner"}`,
        subtitle: variant,
      };
    },
  },
});
