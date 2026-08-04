import { defineType, defineField } from "sanity";

export default defineType({
  name: "servicesSection",
  title: "Usluge sekcija",
  type: "object",
  icon: () => "💊",
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
      name: "services",
      title: "Usluge",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Ikonica",
              type: "string",
              description: 'Font Awesome klasa (npr. "fas fa-heart")',
              validation: (Rule) => Rule.required(),
            },
            {
              name: "title",
              title: "Naslov usluge",
              type: "localeString",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "Opis",
              type: "localeText",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "featured",
              title: "Istaknut (Featured)",
              type: "boolean",
              description: 'Ako je true, prikazuje se "НАЈПОПУЛАРНИЈЕ" badge',
              initialValue: false,
            },
            {
              name: "features",
              title: "Pod-features (linkovi)",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "text",
                      title: "Tekst",
                      type: "localeString",
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "link",
                      title: "Link",
                      type: "string",
                    },
                  ],
                  preview: {
                    select: {
                      text: "text.sr",
                    },
                    prepare({ text }) {
                      return {
                        title: text,
                      };
                    },
                  },
                },
              ],
              validation: (Rule) => Rule.min(2).max(5),
            },
            {
              name: "ctaText",
              title: "CTA dugme tekst",
              type: "localeString",
              initialValue: { sr: "Сазнајте више", en: "Learn more" },
            },
            {
              name: "ctaLink",
              title: "CTA dugme link",
              type: "string",
            },
          ],
          preview: {
            select: {
              title: "title.sr",
              icon: "icon",
              featured: "featured",
            },
            prepare({ title, icon, featured }) {
              return {
                title: title,
                subtitle: featured ? `⭐ Featured • ${icon}` : icon,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(2).max(8),
    }),
  ],
  preview: {
    select: {
      heading: "heading.sr",
      services: "services",
    },
    prepare({ heading, services }) {
      return {
        title: `💊 ${heading || "Usluge sekcija"}`,
        subtitle: `${services?.length || 0} usluga`,
      };
    },
  },
});
