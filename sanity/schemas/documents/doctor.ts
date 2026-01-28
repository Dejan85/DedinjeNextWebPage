import { defineType, defineField } from "sanity";

export default defineType({
  name: "doctor",
  title: "Lekari",
  type: "document",
  icon: () => "👨‍⚕️",
  fields: [
    defineField({
      name: "name",
      title: "Ime i prezime",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Titula",
      type: "string",
      description: 'npr. "Akademik prof. dr"',
    }),
    defineField({
      name: "position",
      title: "Pozicija",
      type: "string",
      description: 'npr. "Direktor Instituta"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "specialization",
      title: "Specijalizacija",
      type: "string",
      description: 'npr. "Kardiohirurg"',
    }),
    defineField({
      name: "image",
      title: "Fotografija",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "biography",
      title: "Biografija",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "timeline",
      title: "Profesionalni put",
      type: "array",
      of: [{ type: "timeline" }],
    }),
    defineField({
      name: "education",
      title: "Obrazovanje",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "degree", title: "Stepen", type: "string" },
            { name: "institution", title: "Institucija", type: "string" },
            { name: "year", title: "Godina", type: "string" },
            { name: "description", title: "Opis", type: "text" },
          ],
        },
      ],
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Telefon",
      type: "string",
    }),
    defineField({
      name: "socialLinks",
      title: "Društvene mreže",
      type: "object",
      fields: [
        { name: "facebook", title: "Facebook", type: "url" },
        { name: "linkedin", title: "LinkedIn", type: "url" },
        { name: "twitter", title: "Twitter", type: "url" },
      ],
    }),
    defineField({
      name: "department",
      title: "Odeljenje",
      type: "reference",
      to: [{ type: "department" }],
    }),
    defineField({
      name: "featured",
      title: "Istaknuti lekar",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Redosled",
      type: "number",
      description: "Redosled prikazivanja",
    }),
    defineField({
      name: "seo",
      title: "SEO Metadata",
      type: "seoMetadata",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "position",
      media: "image",
    },
  },
  orderings: [
    {
      title: "Ime A-Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      title: "Redosled",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
