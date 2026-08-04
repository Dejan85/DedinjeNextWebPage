import { defineType, defineField } from "sanity";

export default defineType({
  name: "announcement",
  title: "Обавештења",
  type: "document",
  icon: () => "📢",
  fields: [
    defineField({
      name: "title",
      title: "Naslov",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Datum (tekstualno)",
      type: "string",
      description: 'npr. "15. фебруар 2026."',
    }),
    defineField({
      name: "icon",
      title: "Ikonica (Font Awesome klasa)",
      type: "string",
    }),
    defineField({
      name: "type",
      title: "Tip obaveštenja",
      type: "string",
      options: {
        list: ["Радно време", "Опрема", "Едукација", "Информација", "Кадрови"],
      },
    }),
    defineField({
      name: "text",
      title: "Tekst",
      type: "localeText",
    }),
    defineField({
      name: "important",
      title: "Istaknuto/važno",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Redosled (manji broj = novije)",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "title.sr", subtitle: "type" },
  },
  orderings: [
    { title: "Redosled", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
