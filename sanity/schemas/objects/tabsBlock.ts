import { defineType, defineField } from "sanity";

export default defineType({
  name: "tabsBlock",
  title: "Tabovi (procedure)",
  type: "object",
  icon: () => "🗂️",
  fields: [
    defineField({
      name: "defaultTabId",
      title: "Podrazumevano otvoren tab (opciono, mora se poklapati sa ID taba)",
      type: "string",
    }),
    defineField({
      name: "tabs",
      title: "Tabovi",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "tabId",
              title: "ID taba (jedinstven)",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "label",
              title: "Naziv taba",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            { name: "image", title: "Slika (putanja, opciono)", type: "string" },
            { name: "imageAlt", title: "Alt tekst slike", type: "string" },
            {
              name: "introHeading",
              title: "Naslov uvoda",
              type: "string",
            },
            {
              name: "introParagraphs",
              title: "Paragrafi uvoda",
              type: "array",
              of: [{ type: "text", rows: 3 }],
            },
            {
              name: "infoBlocks",
              title: "Info-blokovi (pitanje/odgovor)",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "icon", title: "Ikonica", type: "string" },
                    { name: "question", title: "Pitanje / naslov", type: "string" },
                    {
                      name: "answerParagraphs",
                      title: "Paragrafi odgovora",
                      type: "array",
                      of: [{ type: "text", rows: 3 }],
                    },
                  ],
                  preview: { select: { title: "question" } },
                },
              ],
            },
            {
              name: "introList",
              title: "Prosta lista odmah posle uvoda (opciono)",
              type: "array",
              of: [{ type: "string" }],
            },
            {
              name: "focusCards",
              title: "Focus kartice (opciono)",
              description: "Grid kartica sa naslovom + tekstom ili listom stavki.",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "title", title: "Naslov", type: "string" },
                    { name: "text", title: "Tekst (opciono)", type: "text", rows: 3 },
                    {
                      name: "items",
                      title: "Stavke liste (opciono)",
                      type: "array",
                      of: [{ type: "string" }],
                    },
                  ],
                  preview: { select: { title: "title" } },
                },
              ],
            },
            {
              name: "outroParagraphs",
              title: "Paragrafi posle focus kartica (opciono)",
              type: "array",
              of: [{ type: "text", rows: 3 }],
            },
          ],
          preview: { select: { title: "label" } },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { tabs: "tabs" },
    prepare({ tabs }) {
      return { title: `🗂️ Tabovi (${tabs?.length || 0})` };
    },
  },
});
