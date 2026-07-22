import { defineType, defineField } from "sanity";

export default defineType({
  name: "cardGridBlock",
  title: "Grid kartica",
  type: "object",
  icon: () => "🗂️",
  fields: [
    defineField({
      name: "heading",
      title: "Naslov sekcije",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Podnaslov sekcije",
      type: "string",
    }),
    defineField({
      name: "intro",
      title: "Uvodni tekst pre kartica (opciono)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "numbered",
      title: "Prikaži redni broj na karticama (koraci)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "cards",
      title: "Kartice",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "Ikonica", type: "string" },
            { name: "title", title: "Naslov", type: "string" },
            {
              name: "value",
              title: "Vrednost (opciono, npr. \"1200\" za kcal)",
              type: "string",
            },
            { name: "description", title: "Opis", type: "text", rows: 2 },
            { name: "href", title: "Link (opciono — kartica postaje klikabilna)", type: "string" },
            { name: "date", title: "Datum (opciono, npr. za vesti/aktuelnosti)", type: "string" },
            { name: "category", title: "Kategorija (opciono, npr. za vesti/aktuelnosti)", type: "string" },
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: `🗂️ ${title || "Grid kartica"}` };
    },
  },
});
