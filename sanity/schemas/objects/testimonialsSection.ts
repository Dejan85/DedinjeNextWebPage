import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonialsSection",
  title: "Testimonijali sekcija",
  type: "object",
  icon: () => "💬",
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
      name: "testimonials",
      title: "Testimonijali",
      type: "array",
      of: [
        {
          type: "object",
          name: "testimonialItem",
          title: "Testimonial",
          fields: [
            {
              name: "quote",
              title: "Citat/Iskustvo",
              type: "text",
              rows: 5,
              validation: (Rule) => Rule.required(),
            },
            {
              name: "authorName",
              title: "Ime autora",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "authorRole",
              title: "Pozicija/Status autora",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "authorImage",
              title: "Slika autora",
              type: "image",
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              name: "authorName",
              role: "authorRole",
              quote: "quote",
              media: "authorImage",
            },
            prepare({ name, role, quote, media }) {
              return {
                title: name,
                subtitle: `${role} • ${quote?.substring(0, 60)}...`,
                media,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(2).max(10),
    }),
  ],
  preview: {
    select: {
      heading: "heading",
      testimonials: "testimonials",
    },
    prepare({ heading, testimonials }) {
      const count = testimonials?.length || 0;
      return {
        title: `💬 ${heading || "Testimonijali sekcija"}`,
        subtitle: `${count} testimonijala`,
      };
    },
  },
});
