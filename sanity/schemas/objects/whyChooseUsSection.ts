import { defineType, defineField } from "sanity";

export default defineType({
  name: "whyChooseUsSection",
  title: "Why Choose Us Section",
  type: "object",
  fields: [
    defineField({
      name: "badge",
      title: "Badge Text",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "localeText",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Icon",
              type: "string",
              description: "Icon name/emoji",
            },
            {
              name: "title",
              title: "Title",
              type: "localeString",
            },
            {
              name: "description",
              title: "Description",
              type: "localeText",
            },
          ],
          preview: {
            select: {
              title: "title.sr",
              subtitle: "description.sr",
              icon: "icon",
            },
            prepare({ title, subtitle, icon }) {
              return {
                title: `${icon} ${title}`,
                subtitle,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "image",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "heading.sr",
      subtitle: "badge.sr",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Why Choose Us Section",
        subtitle: subtitle || "No badge",
      };
    },
  },
});
