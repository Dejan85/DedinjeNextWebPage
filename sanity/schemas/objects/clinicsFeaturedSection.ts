import { defineType, defineField } from "sanity";

export default defineType({
  name: "clinicsFeaturedSection",
  title: "Istaknute klinike (početna)",
  type: "object",
  icon: () => "🏥",
  fields: [
    defineField({ name: "icon", title: "Ikonica badge-a", type: "string" }),
    defineField({ name: "heading", title: "Naslov", type: "localeString" }),
    defineField({ name: "subheading", title: "Podnaslov", type: "localeString" }),
    defineField({
      name: "items",
      title: "Klinike",
      type: "array",
      of: [
        {
          type: "object",
          name: "clinicFeaturedItem",
          fields: [
            { name: "icon", title: "Ikonica", type: "string" },
            { name: "title", title: "Naslov", type: "localeString" },
            { name: "desc", title: "Opis", type: "localeString" },
            { name: "href", title: "Link", type: "string" },
          ],
          preview: {
            select: { title: "title.sr", subtitle: "href" },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: { heading: "heading.sr", items: "items" },
    prepare({ heading, items }) {
      return {
        title: `🏥 ${heading || "Istaknute klinike"}`,
        subtitle: `${items?.length || 0} klinika`,
      };
    },
  },
});
