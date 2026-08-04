import { defineType, defineField } from "sanity";

export default defineType({
  name: "newsSection",
  title: "Vesti sekcija",
  type: "object",
  icon: () => "📰",
  fields: [
    defineField({
      name: "badge",
      title: "Badge tekst",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heading",
      title: "Glavni naslov",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Podnaslov",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "news",
      title: "Vesti",
      type: "array",
      of: [
        {
          type: "object",
          name: "newsItem",
          title: "Vest",
          fields: [
            {
              name: "image",
              title: "Slika",
              type: "image",
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "category",
              title: "Kategorija",
              type: "localeString",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "date",
              title: "Datum",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "author",
              title: "Autor",
              type: "localeString",
            },
            {
              name: "title",
              title: "Naslov",
              type: "localeString",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "Opis",
              type: "localeText",
            },
            {
              name: "linkHref",
              title: "Link",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "size",
              title: "Veličina",
              type: "string",
              options: {
                list: [
                  { title: "Velika (Featured)", value: "large" },
                  { title: "Mala (Sidebar)", value: "small" },
                ],
              },
              initialValue: "small",
            },
          ],
          preview: {
            select: {
              title: "title.sr",
              category: "category.sr",
              date: "date",
              media: "image",
              size: "size",
            },
            prepare({ title, category, date, media, size }) {
              return {
                title: title,
                subtitle: `${category} • ${date} • ${size === "large" ? "Featured" : "Sidebar"}`,
                media,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(10),
    }),
  ],
  preview: {
    select: {
      heading: "heading.sr",
      news: "news",
    },
    prepare({ heading, news }) {
      const count = news?.length || 0;
      return {
        title: `📰 ${heading || "Vesti sekcija"}`,
        subtitle: `${count} vesti`,
      };
    },
  },
});
