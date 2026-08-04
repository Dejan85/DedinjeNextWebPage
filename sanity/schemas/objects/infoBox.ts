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
      type: "localeString",
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
          { title: "Kontakt (telefon i faks)", value: "contact" },
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
      type: "localeText",
      hidden: ({ parent }) => parent?.variant !== "regular",
    }),
    defineField({
      name: "linkText",
      title: "Tekst linka",
      type: "localeString",
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
              type: "localeString",
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
              days: "days.sr",
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
      type: "localeString",
      hidden: ({ parent }) => parent?.variant !== "emergency",
    }),
    // Contact box polja
    defineField({
      name: "contactPhone",
      title: "Call centar (telefon)",
      type: "string",
      hidden: ({ parent }) => parent?.variant !== "contact",
    }),
    defineField({
      name: "contactFax",
      title: "Faks",
      type: "string",
      hidden: ({ parent }) => parent?.variant !== "contact",
    }),
  ],
  preview: {
    select: {
      title: "title.sr",
      variant: "variant",
      icon: "icon",
    },
    prepare({ title, variant, icon }) {
      const variantEmoji =
        variant === "schedule"
          ? "⏰"
          : variant === "emergency"
            ? "🚨"
            : variant === "contact"
              ? "☎️"
              : "📦";
      const variantLabel =
        variant === "schedule"
          ? "Radno vreme"
          : variant === "emergency"
            ? "Emergency"
            : variant === "contact"
              ? "Kontakt"
              : "Info Box";

      return {
        title: `${variantEmoji} ${title || "Bez naslova"}`,
        subtitle: `${variantLabel} | ${icon || "Bez ikone"}`,
      };
    },
  },
});
