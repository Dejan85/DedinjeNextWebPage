import { defineType, defineField } from "sanity";

export default defineType({
  name: "informatorPage",
  title: "Информатор о раду",
  type: "document",
  icon: () => "📄",
  fields: [
    defineField({ name: "heroHeading", title: "Naslov (О информатору)", type: "localeString" }),
    defineField({ name: "heroText", title: "Tekst (О информатору)", type: "localeText" }),
    defineField({ name: "publishDate", title: "Datum objave (tekstualno)", type: "string" }),
    defineField({ name: "updatedDate", title: "Poslednje ažuriranje (tekstualno)", type: "string" }),
    defineField({ name: "pdfUrl", title: "PDF link", type: "string" }),
    defineField({
      name: "sections",
      title: "Sekcije sadržaja",
      type: "array",
      of: [
        {
          type: "object",
          name: "informatorSection",
          fields: [
            { name: "icon", title: "Ikonica", type: "string" },
            { name: "title", title: "Naslov", type: "localeString" },
            { name: "description", title: "Opis", type: "localeText" },
          ],
        },
      ],
    }),
    defineField({ name: "contactHeading", title: "Naslov (Zahtev za pristup)", type: "localeString" }),
    defineField({ name: "contactText", title: "Tekst (Zahtev za pristup)", type: "localeText" }),
    defineField({ name: "contactPerson", title: "Ovlašćeno lice", type: "string" }),
    defineField({ name: "contactPhone", title: "Telefon", type: "string" }),
    defineField({ name: "contactEmail", title: "Email", type: "string" }),
    defineField({ name: "contactAddress", title: "Adresa", type: "string" }),
  ],
  preview: {
    prepare() {
      return { title: "Информатор о раду" };
    },
  },
});
