import { defineType, defineField } from "sanity";

export default defineType({
  name: "jobPosting",
  title: "Огласи и конкурси",
  type: "document",
  icon: () => "📋",
  fields: [
    defineField({
      name: "title",
      title: "Naslov",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Datum (tekstualno)",
      type: "string",
      description: 'npr. "10. фебруар 2026."',
    }),
    defineField({
      name: "type",
      title: "Tip",
      type: "string",
      options: {
        list: ["Запошљавање", "Јавна набавка", "Остало"],
      },
    }),
    defineField({
      name: "icon",
      title: "Ikonica (Font Awesome klasa)",
      type: "string",
    }),
    defineField({
      name: "text",
      title: "Tekst",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "active",
      title: "Aktivan",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "deadline",
      title: "Rok (tekstualno)",
      type: "string",
      description: 'npr. "28. фебруар 2026." (opciono)',
    }),
    defineField({
      name: "order",
      title: "Redosled (manji broj = novije)",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "type" },
  },
  orderings: [
    { title: "Redosled", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
