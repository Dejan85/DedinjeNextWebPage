import { defineType, defineField } from "sanity";

export default defineType({
  name: "welcomeSection",
  title: "Dobrodošli sekcija",
  type: "object",
  icon: () => "👋",
  fields: [
    defineField({
      name: "badge",
      title: "Badge tekst",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heading",
      title: "Glavni naslov",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "leadText",
      title: "Lead tekst (uvodni)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bodyText",
      title: "Body tekst (glavni sadržaj)",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "features",
      title: "Features (karakteristike)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Ikonica",
              type: "string",
              description: 'Font Awesome klasa (npr. "fas fa-check-circle")',
              validation: (Rule) => Rule.required(),
            },
            {
              name: "text",
              title: "Tekst",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              text: "text",
              icon: "icon",
            },
            prepare({ text, icon }) {
              return {
                title: text,
                subtitle: icon,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(2).max(6),
    }),
    defineField({
      name: "ctaButton",
      title: "CTA Button",
      type: "object",
      fields: [
        {
          name: "text",
          title: "Tekst dugmeta",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "link",
          title: "Link",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: "image",
      title: "Glavna slika",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "secondaryImage",
      title: "Mala slika (secondary)",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Mala slika koja se prikazuje ispod glavne",
    }),
    defineField({
      name: "imageBadge",
      title: "Badge na slici",
      type: "object",
      fields: [
        {
          name: "number",
          title: "Broj",
          type: "string",
          description: 'Npr. "65+"',
        },
        {
          name: "text",
          title: "Tekst",
          type: "string",
          description: 'Npr. "ГОДИНА ИСКУСТВА"',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "heading",
      media: "image",
      badge: "badge",
    },
    prepare({ title, media, badge }) {
      return {
        title: `👋 ${title || "Dobrodošli sekcija"}`,
        subtitle: badge,
        media,
      };
    },
  },
});
