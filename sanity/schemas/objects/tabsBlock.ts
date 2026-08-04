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
              type: "localeString",
              validation: (Rule) => Rule.required(),
            },
            { name: "image", title: "Slika (putanja, opciono)", type: "string" },
            { name: "imageAlt", title: "Alt tekst slike", type: "localeString" },
            {
              name: "introHeading",
              title: "Naslov uvoda",
              type: "localeString",
            },
            {
              name: "introParagraphs",
              title: "Paragrafi uvoda",
              type: "array",
              of: [{ type: "localeText" }],
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
                    { name: "question", title: "Pitanje / naslov", type: "localeString" },
                    {
                      name: "answerParagraphs",
                      title: "Paragrafi odgovora",
                      type: "array",
                      of: [{ type: "localeText" }],
                    },
                  ],
                  preview: { select: { title: "question.sr" } },
                },
              ],
            },
            {
              name: "introList",
              title: "Prosta lista odmah posle uvoda (opciono)",
              type: "array",
              of: [{ type: "localeString" }],
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
                    { name: "title", title: "Naslov", type: "localeString" },
                    { name: "text", title: "Tekst (opciono)", type: "localeText" },
                    {
                      name: "items",
                      title: "Stavke liste (opciono)",
                      type: "array",
                      of: [{ type: "localeString" }],
                    },
                  ],
                  preview: { select: { title: "title.sr" } },
                },
              ],
            },
            {
              name: "outroParagraphs",
              title: "Paragrafi posle focus kartica (opciono)",
              type: "array",
              of: [{ type: "localeText" }],
            },
          ],
          preview: { select: { title: "label.sr" } },
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
