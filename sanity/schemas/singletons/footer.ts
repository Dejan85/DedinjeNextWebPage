import { defineType, defineField } from "sanity";

export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  icon: () => "🦶",
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Logo instituta za footer",
    }),
    defineField({
      name: "instituteName",
      title: "Naziv instituta",
      type: "localeString",
      initialValue: { sr: "НАЦИОНАЛНИ ИНСТИТУТ", en: "NATIONAL INSTITUTE" },
    }),
    defineField({
      name: "instituteSubtitle",
      title: "Podnaslov instituta",
      type: "localeString",
      initialValue: {
        sr: "За срце и крвне судове „Дедиње“",
        en: "For Heart and Blood Vessels „Dedinje“",
      },
    }),
    defineField({
      name: "description",
      title: "Opis",
      type: "localeText",
      description: "Kratak opis instituta",
    }),
    defineField({
      name: "socialLinks",
      title: "Društvene mreže",
      type: "object",
      fields: [
        defineField({
          name: "facebook",
          title: "Facebook",
          type: "url",
        }),
        defineField({
          name: "twitter",
          title: "Twitter",
          type: "url",
        }),
        defineField({
          name: "instagram",
          title: "Instagram",
          type: "url",
        }),
        defineField({
          name: "linkedin",
          title: "LinkedIn",
          type: "url",
        }),
        defineField({
          name: "youtube",
          title: "YouTube",
          type: "url",
        }),
      ],
    }),
    defineField({
      name: "locations",
      title: "Lokacije (mape)",
      description:
        "Tri bloka u footeru — svaki sa naslovom, Google Maps embed linkom i adresom (npr. Дедиње 1/2/3).",
      type: "array",
      validation: (Rule) => Rule.max(3),
      of: [
        {
          type: "object",
          name: "footerLocation",
          fields: [
            defineField({
              name: "title",
              title: "Naslov",
              type: "localeString",
            }),
            defineField({
              name: "mapEmbedUrl",
              title: "Google Maps embed URL",
              description:
                "URL iz Google Maps 'Embed a map' opcije (src atribut iframe-a).",
              type: "url",
            }),
            defineField({
              name: "address",
              title: "Adresa",
              type: "string",
            }),
            defineField({
              name: "city",
              title: "Grad",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "title.sr", subtitle: "address" },
          },
        },
      ],
    }),
    defineField({
      name: "copyright",
      title: "Copyright tekst",
      type: "localeString",
      initialValue: {
        sr: "© 2026 Национални институт за срце и крвне судове „Дедиње”. Сва права задржана.",
        en: "© 2026 National Institute for Heart and Blood Vessels “Dedinje”. All rights reserved.",
      },
    }),
    defineField({
      name: "legalLinks",
      title: "Pravni linkovi",
      type: "array",
      description: "Linkovi u footer dnu (npr. Politika privatnosti)",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Naslov",
              type: "localeString",
            }),
            defineField({
              name: "href",
              title: "URL",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "enReviewed",
      title: "🌍 EN prevod pregledan",
      description:
        "Označi tek nakon što pregledaš AI-generisani engleski prevod ovog dokumenta (Faza 3d i18n). Dok je isključeno, /en/* varijanta izostaje iz sitemap-a.",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Footer Configuration",
      };
    },
  },
});
