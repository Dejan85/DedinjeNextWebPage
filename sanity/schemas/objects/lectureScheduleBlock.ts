import { defineType, defineField } from "sanity";

export default defineType({
  name: "lectureScheduleBlock",
  title: "Raspored predavanja (tabovi po godinama)",
  type: "object",
  icon: () => "📅",
  fields: [
    defineField({
      name: "heading",
      title: "Naslov",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Podnaslov",
      type: "string",
    }),
    defineField({
      name: "defaultTabId",
      title: "Podrazumevano otvoren tab (mora se poklapati sa ID godine)",
      type: "string",
    }),
    defineField({
      name: "tabs",
      title: "Tabovi (godine)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "tabId", title: "ID (godina)", type: "string", validation: (Rule) => Rule.required() },
            { name: "label", title: "Naziv taba", type: "string", validation: (Rule) => Rule.required() },
            {
              name: "items",
              title: "Predavanja (ravna lista — koristi se kad nema sekcija)",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "date", title: "Datum (opciono)", type: "string" },
                    { name: "title", title: "Naslov predavanja", type: "string", validation: (Rule) => Rule.required() },
                    { name: "lecturer", title: "Predavač", type: "string", validation: (Rule) => Rule.required() },
                  ],
                  preview: { select: { title: "title", subtitle: "lecturer" } },
                },
              ],
            },
            {
              name: "sections",
              title: "Sekcije (grupe predavanja sa naslovom — koristi se umesto items)",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "title", title: "Naslov sekcije", type: "string", validation: (Rule) => Rule.required() },
                    {
                      name: "items",
                      title: "Predavanja",
                      type: "array",
                      of: [
                        {
                          type: "object",
                          fields: [
                            { name: "date", title: "Datum (opciono)", type: "string" },
                            { name: "title", title: "Naslov predavanja", type: "string", validation: (Rule) => Rule.required() },
                            { name: "lecturer", title: "Predavač", type: "string", validation: (Rule) => Rule.required() },
                          ],
                          preview: { select: { title: "title", subtitle: "lecturer" } },
                        },
                      ],
                    },
                  ],
                  preview: { select: { title: "title" } },
                },
              ],
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
      return { title: `📅 Raspored predavanja (${tabs?.length || 0} god.)` };
    },
  },
});
