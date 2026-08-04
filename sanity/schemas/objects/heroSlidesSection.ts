import { defineType, defineField } from "sanity";

export default defineType({
  name: "heroSlidesSection",
  title: "Hero slajder (video)",
  type: "object",
  icon: () => "🎬",
  fields: [
    defineField({
      name: "slides",
      title: "Slajdovi",
      type: "array",
      of: [
        {
          type: "object",
          name: "heroSlide",
          title: "Slajd",
          fields: [
            { name: "badge", title: "Badge tekst", type: "localeString" },
            { name: "title", title: "Naslov", type: "localeString" },
            { name: "subtitle", title: "Podnaslov", type: "localeText" },
            {
              name: "video",
              title: "Video URL",
              type: "string",
              description: "Putanja do video fajla (npr. /videos/ime.mp4) ili URL",
            },
            {
              name: "image",
              title: "Rezervna slika (poster)",
              type: "image",
              options: { hotspot: true },
            },
          ],
          preview: {
            select: { title: "title.sr", subtitle: "badge.sr" },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: { slides: "slides" },
    prepare({ slides }) {
      return {
        title: "🎬 Hero slajder",
        subtitle: `${slides?.length || 0} slajdova`,
      };
    },
  },
});
