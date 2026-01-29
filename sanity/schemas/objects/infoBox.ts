import { defineType, defineField } from "sanity";

export default defineType({
  name: "infoBox",
  title: "Info kutija",
  type: "object",
  icon: () => "📦",
  fields: [
    defineField({
      name: "icon",
      title: "Ikonica",
      type: "string",
      description: 'Font Awesome klasa (npr. "far fa-clock")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Naslov",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "variant",
      title: "Tip Info Box-a",
      type: "string",
      options: {
        list: [
          { title: "Običan (sa opisom i linkom)", value: "regular" },
          { title: "Radno vreme", value: "schedule" },
          { title: "Hitni slučaj (Emergency)", value: "emergency" },
        ],
        layout: "radio",
      },
      initialValue: "regular",
      validation: (Rule) => Rule.required(),
    }),
    // Regular box polja
    defineField({
      name: "description",
      title: "Opis",
      type: "text",
      rows: 3,
      hidden: ({ parent }) => parent?.variant !== "regular",
    }),
    defineField({
      name: "linkText",
      title: "Tekst linka",
      type: "string",
      hidden: ({ parent }) => parent?.variant !== "regular",
    }),
    defineField({
      name: "linkHref",
      title: "URL linka",
      type: "string",
      hidden: ({ parent }) => parent?.variant !== "regular",
    }),
    // Schedule box polja
    defineField({
      name: "schedule",
      title: "Raspored radnog vremena",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "days",
              title: "Dani",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "hours",
              title: "Sati",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              days: "days",
              hours: "hours",
            },
            prepare({ days, hours }) {
              return {
                title: `${days}: ${hours}`,
              };
            },
          },
        },
      ],
      hidden: ({ parent }) => parent?.variant !== "schedule",
    }),
    // Emergency box polja
    defineField({
      name: "emergencyPhone",
      title: "Telefon za hitne slučajeve",
      type: "string",
      hidden: ({ parent }) => parent?.variant !== "emergency",
    }),
    defineField({
      name: "emergencyNote",
      title: "Napomena",
      type: "string",
      hidden: ({ parent }) => parent?.variant !== "emergency",
    }),
  ],
  preview: {
    select: {
      title: "title",
      variant: "variant",
      icon: "icon",
    },
    prepare({ title, variant, icon }) {
      const variantEmoji =
        variant === "schedule" ? "⏰" : variant === "emergency" ? "🚨" : "📦";
      const variantLabel =
        variant === "schedule"
          ? "Radno vreme"
          : variant === "emergency"
            ? "Emergency"
            : "Info Box";

      return {
        title: `${variantEmoji} ${title || "Bez naslova"}`,
        subtitle: `${variantLabel} | ${icon || "Bez ikone"}`,
      };
    },
  },
});
