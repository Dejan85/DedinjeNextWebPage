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
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Podnaslov",
      type: "string",
    }),
    defineField({
      name: "categories",
      title: "Kategorije",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Naslov kategorije", type: "string" },
            { name: "icon", title: "Ikonica", type: "string" },
            {
              name: "contacts",
              title: "Kontakti",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "title", title: "Naslov", type: "string" },
                    { name: "note", title: "Napomena (opciono)", type: "string" },
                    { name: "phone", title: "Telefon (prikaz)", type: "string" },
                    { name: "href", title: "tel: link", type: "string" },
                    { name: "time", title: "Vreme / termin", type: "string" },
                  ],
                  preview: { select: { title: "title", subtitle: "phone" } },
                },
              ],
            },
          ],
          preview: {
            select: { title: "title", contacts: "contacts" },
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
    select: { title: "heading" },
    prepare({ title }) {
      return { title: `📞 ${title || "Kontakt direktorijum"}` };
    },
  },
});
