import { defineType, defineField } from "sanity";

export default defineType({
  name: "hero",
  title: "Hero sekcija",
  type: "object",
  icon: () => "🎯",
  fields: [
    defineField({
      name: "heading",
      title: "Naslov",
      type: "localeString",
    }),
    defineField({
      name: "subheading",
      title: "Podnaslov",
      type: "localeText",
    }),
    defineField({
      name: "image",
      title: "Slika",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "video",
      title: "Video URL",
      type: "url",
      description: "Link ka video fajlu ili YouTube",
    }),
    defineField({
      name: "cta",
      title: "Dugme",
      type: "object",
      fields: [
        { name: "text", title: "Tekst", type: "string" },
        { name: "link", title: "Link", type: "string" },
      ],
    }),
  ],
  preview: {
    select: {
      title: "heading.sr",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "Hero sekcija",
        media,
      };
    },
  },
});
