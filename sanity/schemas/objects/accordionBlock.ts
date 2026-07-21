import { defineType, defineField } from "sanity";

export default defineType({
  name: "accordionBlock",
  title: "Akordeon",
  type: "object",
  icon: () => "📋",
  fields: [
    defineField({
      name: "title",
      title: "Naslov",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Podnaslov",
      type: "string",
    }),
    defineField({
      name: "defaultOpenId",
      title: "Podrazumevano otvorena stavka (opciono, mora se poklapati sa ID stavke)",
      type: "string",
    }),
    defineField({
      name: "items",
      title: "Stavke",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "itemId",
              title: "ID stavke (jedinstven, koristi se za default-open)",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            { name: "title", title: "Naslov", type: "string" },
            { name: "icon", title: "Ikonica", type: "string" },
            {
              name: "sections",
              title: "Sekcije",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "title", title: "Naslov sekcije", type: "string" },
                    {
                      name: "kind",
                      title: "Tip sadržaja",
                      type: "string",
                      options: {
                        list: [
                          { title: "Tekst (paragrafi)", value: "text" },
                          { title: "Lista", value: "list" },
                        ],
                        layout: "radio",
                      },
                      initialValue: "text",
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "text",
                      title: "Paragrafi",
                      type: "array",
                      of: [{ type: "text", rows: 2 }],
                      hidden: ({ parent }) => parent?.kind !== "text",
                    },
                    {
                      name: "list",
                      title: "Stavke liste",
                      type: "array",
                      of: [{ type: "string" }],
                      hidden: ({ parent }) => parent?.kind !== "list",
                    },
                  ],
                  preview: { select: { title: "title" } },
                },
              ],
            },
          ],
          preview: { select: { title: "title" } },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: `📋 ${title || "Akordeon"}` };
    },
  },
});
