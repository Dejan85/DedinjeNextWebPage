import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Podešavanja sajta",
  type: "document",
  icon: () => "⚙️",
  fields: [
    defineField({
      name: "siteName",
      title: "Naziv sajta",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "siteDescription",
      title: "Opis sajta",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "contact",
      title: "Kontakt informacije",
      type: "object",
      fields: [
        { name: "phone1", title: "Telefon 1", type: "string" },
        { name: "phone2", title: "Telefon 2", type: "string" },
        { name: "emergencyPhone", title: "Hitni slučajevi", type: "string" },
        { name: "email", title: "Email", type: "string" },
        { name: "address", title: "Adresa", type: "string" },
        { name: "city", title: "Grad", type: "string" },
        { name: "zipCode", title: "Poštanski broj", type: "string" },
      ],
    }),
    defineField({
      name: "workingHours",
      title: "Radno vreme",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "days", title: "Dani", type: "string" },
            { name: "hours", title: "Vreme", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Društvene mreže",
      type: "object",
      fields: [
        { name: "facebook", title: "Facebook", type: "url" },
        { name: "instagram", title: "Instagram", type: "url" },
        { name: "linkedin", title: "LinkedIn", type: "url" },
        { name: "twitter", title: "Twitter", type: "url" },
        { name: "youtube", title: "YouTube", type: "url" },
      ],
    }),
    defineField({
      name: "seo",
      title: "Globalna SEO podešavanja",
      type: "seoMetadata",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Podešavanja sajta",
      };
    },
  },
});
