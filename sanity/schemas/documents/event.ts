import { defineType, defineField } from "sanity";

export default defineType({
  name: "event",
  title: "Догађаји",
  type: "document",
  icon: () => "📅",
  fields: [
    defineField({
      name: "title",
      title: "Naziv događaja",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Datum",
      type: "date",
      options: { dateFormat: "DD.MM.YYYY" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Slika",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Mesto održavanja",
      type: "string",
      description: 'npr. "Београд" (isto na оба jezika, ne prevodi se)',
    }),
    defineField({
      name: "link",
      title: "Link (opciono)",
      type: "string",
      description: "Link ka detaljnijim informacijama ili registraciji, ako postoji.",
    }),
    defineField({
      name: "enReviewed",
      title: "🌍 EN prevod pregledan",
      description:
        "Označi tek nakon što pregledaš AI-generisani engleski prevod ovog dokumenta (Faza 3d i18n).",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title.sr", date: "date", media: "image" },
    prepare({ title, date, media }) {
      return { title, subtitle: date, media };
    },
  },
  orderings: [
    { title: "Datum", name: "dateAsc", by: [{ field: "date", direction: "asc" }] },
  ],
});
