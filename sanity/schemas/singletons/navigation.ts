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
            { name: "title", title: "Naslov", type: "localeString" },
            { name: "link", title: "Link", type: "string" },
            {
              name: "submenu",
              title: "Podmeni",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "title", title: "Naslov", type: "localeString" },
                    {
                      name: "link",
                      title: "Link (prazno = grupa sa pod-stavkama)",
                      type: "string",
                    },
                    { name: "icon", title: "Ikonica", type: "string" },
                    {
                      name: "items",
                      title: "Pod-stavke (treći nivo)",
                      type: "array",
                      of: [
                        {
                          type: "object",
                          fields: [
                            { name: "title", title: "Naslov", type: "localeString" },
                            { name: "link", title: "Link", type: "string" },
                            { name: "icon", title: "Ikonica", type: "string" },
                          ],
                        },
                      ],
                    },
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
            { name: "title", title: "Naslov", type: "localeString" },
            { name: "link", title: "Link", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "enReviewed",
      title: "🌍 EN prevod pregledan",
      description:
        "Označi tek nakon što pregledaš AI-generisani engleski prevod ovog dokumenta (Faza 3d i18n). Dok je isključeno, /en/* varijanta izostaje iz sitemap-a.",
      type: "boolean",
      initialValue: false,
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
