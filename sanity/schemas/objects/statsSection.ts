import { defineType, defineField } from "sanity";

export default defineType({
  name: "statsSection",
  title: "Statistika sekcija",
  type: "object",
  icon: () => "📊",
  fields: [
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
      name: "stats",
      title: "Statistike",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Ikonica",
              type: "string",
              description: 'Font Awesome klasa (npr. "fas fa-heartbeat")',
              validation: (Rule) => Rule.required(),
            },
            {
              name: "number",
              title: "Broj",
              type: "string",
              description: 'Broj sa formatiranjem (npr. "15,000" ili "200+")',
              validation: (Rule) => Rule.required(),
            },
            {
              name: "label",
              title: "Label (tekst ispod broja)",
              type: "localeString",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              number: "number",
              label: "label.sr",
              icon: "icon",
            },
            prepare({ number, label, icon }) {
              return {
                title: `${number} - ${label}`,
                subtitle: icon,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(2).max(6),
    }),
  ],
  preview: {
    select: {
      heading: "heading.sr",
      stats: "stats",
    },
    prepare({ heading, stats }) {
      return {
        title: `📊 ${heading || "Statistika sekcija"}`,
        subtitle: `${stats?.length || 0} statistika`,
      };
    },
  },
});
