import { defineType, defineField } from "sanity";

export default defineType({
  name: "patientLinksSection",
  title: "Brzi linkovi za pacijente (početna)",
  type: "object",
  icon: () => "🩺",
  fields: [
    defineField({ name: "icon", title: "Ikonica badge-a", type: "string" }),
    defineField({ name: "heading", title: "Naslov", type: "string" }),
    defineField({ name: "subheading", title: "Podnaslov", type: "string" }),
    defineField({
      name: "items",
      title: "Linkovi",
      type: "array",
      of: [
        {
          type: "object",
          name: "patientLinkItem",
          fields: [
            { name: "icon", title: "Ikonica", type: "string" },
            { name: "title", title: "Naslov", type: "string" },
            { name: "desc", title: "Opis", type: "string" },
            { name: "href", title: "Link", type: "string" },
          ],
          preview: {
            select: { title: "title", subtitle: "href" },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: { heading: "heading", items: "items" },
    prepare({ heading, items }) {
      return {
        title: `🩺 ${heading || "Brzi linkovi za pacijente"}`,
        subtitle: `${items?.length || 0} linkova`,
      };
    },
  },
});
