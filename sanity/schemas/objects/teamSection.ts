import { defineType, defineField } from "sanity";

export default defineType({
  name: "teamSection",
  title: "Tim sekcija",
  type: "object",
  icon: () => "👥",
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
      name: "subheading",
      title: "Podnaslov",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "team",
      title: "Članovi tima",
      type: "array",
      of: [
        {
          type: "object",
          name: "teamMember",
          title: "Član tima",
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
              name: "name",
              title: "Ime i prezime",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "role",
              title: "Pozicija/Specijalnost",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "Opis",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
            {
              name: "socialLinks",
              title: "Društvene mreže",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "platform",
                      title: "Platforma",
                      type: "string",
                      options: {
                        list: [
                          { title: "Facebook", value: "facebook" },
                          { title: "LinkedIn", value: "linkedin" },
                          { title: "Twitter", value: "twitter" },
                          { title: "Email", value: "email" },
                          { title: "Instagram", value: "instagram" },
                        ],
                      },
                    },
                    {
                      name: "url",
                      title: "URL",
                      type: "string",
                    },
                  ],
                  preview: {
                    select: {
                      platform: "platform",
                      url: "url",
                    },
                    prepare({ platform, url }) {
                      return {
                        title: platform || "Društvena mreža",
                        subtitle: url,
                      };
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              name: "name",
              role: "role",
              media: "image",
            },
            prepare({ name, role, media }) {
              return {
                title: name,
                subtitle: role,
                media,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(2).max(12),
    }),
    defineField({
      name: "ctaButton",
      title: "CTA dugme",
      type: "object",
      fields: [
        {
          name: "text",
          title: "Tekst dugmeta",
          type: "string",
        },
        {
          name: "link",
          title: "Link",
          type: "string",
        },
      ],
    }),
  ],
  preview: {
    select: {
      heading: "heading",
      team: "team",
    },
    prepare({ heading, team }) {
      const count = team?.length || 0;
      return {
        title: `👥 ${heading || "Tim sekcija"}`,
        subtitle: `${count} članova tima`,
      };
    },
  },
});
