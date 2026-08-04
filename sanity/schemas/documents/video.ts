import { defineType, defineField } from "sanity";

export default defineType({
  name: "video",
  title: "Гостовања (видео)",
  type: "document",
  icon: () => "🎥",
  fields: [
    defineField({
      name: "title",
      title: "Naslov",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "title.sr", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "youtubeId",
      title: "YouTube ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "source",
      title: "Izvor (medij)",
      type: "string",
      options: {
        list: ["РТС", "Прва ТВ", "Н1", "Хепи ТВ", "Б92"],
      },
    }),
    defineField({
      name: "date",
      title: "Datum (tekstualno)",
      type: "string",
      description: 'npr. "15. фебруар 2026."',
    }),
    defineField({
      name: "description",
      title: "Kratak opis",
      type: "localeText",
    }),
    defineField({
      name: "fullText",
      title: "Pun tekst",
      description: "Pasusi odvojeni praznim redom.",
      type: "localeText",
    }),
    defineField({
      name: "isNew",
      title: "Označi kao novo",
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
    select: { title: "title.sr", subtitle: "date" },
  },
  orderings: [
    { title: "Redosled", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
