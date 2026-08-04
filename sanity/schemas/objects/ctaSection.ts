import { defineType, defineField } from "sanity";

export default defineType({
  name: "ctaSection",
  title: "CTA Sekcija (Call to Action)",
  type: "object",
  icon: () => "📢",
  fields: [
    defineField({
      name: "heading",
      title: "Glavni naslov",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bodyText",
      title: "Tekst opisa",
      type: "localeText",
    }),
    defineField({
      name: "buttons",
      title: "Dugmad",
      type: "array",
      of: [
        {
          type: "object",
          name: "ctaButton",
          title: "Dugme",
          fields: [
            {
              name: "text",
              title: "Tekst dugmeta",
              type: "localeString",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "link",
              title: "Link",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "variant",
              title: "Stil dugmeta",
              type: "string",
              options: {
                list: [
                  { title: "Primarno", value: "primary" },
                  { title: "Sekundarno", value: "secondary" },
                  { title: "Outline", value: "outline" },
                ],
              },
              initialValue: "primary",
            },
            {
              name: "icon",
              title: "Ikona (FontAwesome klasa)",
              type: "string",
              description: "npr: fas fa-phone",
            },
          ],
          preview: {
            select: {
              title: "text.sr",
              variant: "variant",
              icon: "icon",
            },
            prepare({ title, variant, icon }) {
              return {
                title: title,
                subtitle: `${variant}${icon ? ` • ${icon}` : ""}`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
  ],
  preview: {
    select: {
      title: "heading.sr",
      bodyText: "bodyText.sr",
      buttons: "buttons",
    },
    prepare({ title, bodyText, buttons }) {
      const buttonCount = buttons?.length || 0;
      return {
        title: title || "CTA Sekcija",
        subtitle: `${buttonCount} dugme${buttonCount === 1 ? "" : "ta"}${bodyText ? ` • ${bodyText.substring(0, 50)}...` : ""}`,
      };
    },
  },
});
