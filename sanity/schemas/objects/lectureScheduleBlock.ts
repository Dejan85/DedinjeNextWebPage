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
      type: "localeString",
    }),
    defineField({
      name: "subtitle",
      title: "Podnaslov",
      type: "localeString",
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
            { name: "label", title: "Naziv taba", type: "localeString", validation: (Rule) => Rule.required() },
            {
              name: "items",
              title: "Predavanja (ravna lista — koristi se kad nema sekcija)",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "date", title: "Datum (opciono)", type: "string" },
                    { name: "title", title: "Naslov predavanja", type: "localeString", validation: (Rule) => Rule.required() },
                    { name: "lecturer", title: "Predavač", type: "string", validation: (Rule) => Rule.required() },
                  ],
                  preview: { select: { title: "title.sr", subtitle: "lecturer" } },
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
                    { name: "title", title: "Naslov sekcije", type: "localeString", validation: (Rule) => Rule.required() },
                    {
                      name: "items",
                      title: "Predavanja",
                      type: "array",
                      of: [
                        {
                          type: "object",
                          fields: [
                            { name: "date", title: "Datum (opciono)", type: "string" },
                            { name: "title", title: "Naslov predavanja", type: "localeString", validation: (Rule) => Rule.required() },
                            { name: "lecturer", title: "Predavač", type: "string", validation: (Rule) => Rule.required() },
                          ],
                          preview: { select: { title: "title.sr", subtitle: "lecturer" } },
                        },
                      ],
                    },
                  ],
                  preview: { select: { title: "title.sr" } },
                },
              ],
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
      return { title: `📅 Raspored predavanja (${tabs?.length || 0} god.)` };
    },
  },
});
