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
      type: "string",
      initialValue: "ДЕДИЊЕ",
    }),
    defineField({
      name: "instituteSubtitle",
      title: "Podnaslov instituta",
      type: "string",
      initialValue: "Институт за КВБ",
    }),
    defineField({
      name: "description",
      title: "Opis",
      type: "text",
      rows: 4,
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
      name: "quickLinks",
      title: "Brzi linkovi",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Naslov sekcije",
          type: "string",
          initialValue: "Брзи линкови",
        }),
        defineField({
          name: "links",
          title: "Linkovi",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Naslov",
                  type: "string",
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
      ],
    }),
    defineField({
      name: "services",
      title: "Usluge",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Naslov sekcije",
          type: "string",
          initialValue: "Услуге",
        }),
        defineField({
          name: "links",
          title: "Linkovi",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Naslov",
                  type: "string",
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
      ],
    }),
    defineField({
      name: "contact",
      title: "Kontakt informacije",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Naslov sekcije",
          type: "string",
          initialValue: "Контакт",
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
        defineField({
          name: "phone1",
          title: "Telefon 1",
          type: "string",
        }),
        defineField({
          name: "phone2",
          title: "Telefon 2",
          type: "string",
        }),
        defineField({
          name: "email",
          title: "Email",
          type: "string",
        }),
        defineField({
          name: "workingHours",
          title: "Radno vreme",
          type: "object",
          fields: [
            defineField({
              name: "weekdays",
              title: "Radni dani",
              type: "string",
              initialValue: "Пон - Пет: 08:00 - 19:00",
            }),
            defineField({
              name: "weekend",
              title: "Vikend",
              type: "string",
              initialValue: "Викенд: 09:00 - 15:00",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "copyright",
      title: "Copyright tekst",
      type: "string",
      initialValue:
        "© 2026 Институт за кардиоваскуларне болести Дедиње. Сва права задржана.",
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
              type: "string",
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
  ],
  preview: {
    prepare() {
      return {
        title: "Footer Configuration",
      };
    },
  },
});
