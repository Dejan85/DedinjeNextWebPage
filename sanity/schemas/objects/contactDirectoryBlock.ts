import { defineType, defineField } from "sanity";

export default defineType({
  name: "contactDirectoryBlock",
  title: "Kontakt direktorijum",
  type: "object",
  icon: () => "📞",
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
      name: "categories",
      title: "Kategorije",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Naslov kategorije", type: "localeString" },
            { name: "icon", title: "Ikonica", type: "string" },
            {
              name: "contacts",
              title: "Kontakti",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "title", title: "Naslov", type: "localeString" },
                    { name: "note", title: "Napomena (opciono)", type: "localeString" },
                    { name: "phone", title: "Telefon (prikaz)", type: "string" },
                    { name: "href", title: "tel: link", type: "string" },
                    { name: "time", title: "Vreme / termin", type: "localeString" },
                  ],
                  preview: { select: { title: "title.sr", subtitle: "phone" } },
                },
              ],
            },
          ],
          preview: {
            select: { title: "title.sr", contacts: "contacts" },
            prepare({ title, contacts }) {
              return {
                title: title,
                subtitle: `${contacts?.length || 0} kontakt(a)`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "heading.sr" },
    prepare({ title }) {
      return { title: `📞 ${title || "Kontakt direktorijum"}` };
    },
  },
});
