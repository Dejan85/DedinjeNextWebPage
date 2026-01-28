import { defineType, defineField } from "sanity";

export default defineType({
  name: "contentBlock",
  title: "Sadržaj blok",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Naslov",
      type: "string",
    }),
    defineField({
      name: "content",
      title: "Sadržaj",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Tekst samo", value: "text-only" },
          { title: "Tekst + slika desno", value: "text-image-right" },
          { title: "Tekst + slika levo", value: "text-image-left" },
          { title: "2 kolone", value: "two-columns" },
        ],
      },
      initialValue: "text-only",
    }),
  ],
  preview: {
    select: {
      title: "heading",
    },
    prepare({ title }) {
      return {
        title: title || "Sadržaj blok",
      };
    },
  },
});
