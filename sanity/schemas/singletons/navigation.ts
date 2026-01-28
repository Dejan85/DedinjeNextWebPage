import { defineType, defineField } from "sanity";

export default defineType({
  name: "navigation",
  title: "Navigacija",
  type: "document",
  icon: () => "🧭",
  fields: [
    defineField({
      name: "mainMenu",
      title: "Glavni meni",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Naslov", type: "string" },
            { name: "link", title: "Link", type: "string" },
            {
              name: "submenu",
              title: "Podmeni",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "title", title: "Naslov", type: "string" },
                    { name: "link", title: "Link", type: "string" },
                    { name: "icon", title: "Ikonica", type: "string" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "footerMenu",
      title: "Footer meni",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Naslov", type: "string" },
            { name: "link", title: "Link", type: "string" },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Navigacija",
      };
    },
  },
});
