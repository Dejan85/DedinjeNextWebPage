import type { StructureResolver } from "sanity/structure";

const singleton = (S: Parameters<StructureResolver>[0], typeName: string, title: string) =>
  S.listItem()
    .title(title)
    .id(typeName)
    .child(S.document().schemaType(typeName).documentId(typeName));

export const structure: StructureResolver = (S) =>
  S.list()
    .id("root")
    .title("Sadržaj")
    .items([
      S.listItem()
        .title("Почетна")
        .id("homepage")
        .child(S.document().schemaType("page").documentId("homepage")),

      S.listItem()
        .title("О нама")
        .id("o-nama")
        .child(
          S.list()
            .id("o-nama-list")
            .title("О нама")
            .items([
              singleton(S, "directorPage", "Реч директора"),
              singleton(S, "aboutPage", "О институту"),
              singleton(S, "biographyPage", "Биографија"),
              singleton(S, "bibliographyPage", "Библиографија"),
            ]),
        ),

      S.listItem()
        .title("Клинике")
        .id("klinike")
        .child(
          S.documentTypeList("clinicPage")
            .id("klinike-list")
            .title("Клинике")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),

      S.listItem()
        .title("За пацијенте")
        .id("za-pacijente")
        .child(
          S.documentTypeList("page")
            .id("za-pacijente-list")
            .title("За пацијенте")
            .filter('_type == "page" && section == "za-pacijente"'),
        ),

      S.listItem()
        .title("Наука и истраживање")
        .id("nauka-istrazivanje")
        .child(
          S.documentTypeList("page")
            .id("nauka-istrazivanje-list")
            .title("Наука и истраживање")
            .filter('_type == "page" && section == "nauka-istrazivanje"'),
        ),

      S.listItem()
        .title("Едукација")
        .id("edukacija")
        .child(
          S.list()
            .id("edukacija-list")
            .title("Едукација")
            .items([
              S.listItem()
                .title("Stranice")
                .id("edukacija-stranice")
                .child(
                  S.documentTypeList("page")
                    .id("edukacija-stranice-list")
                    .title("Едукација — stranice")
                    .filter('_type == "page" && section == "edukacija"'),
                ),
              S.listItem()
                .title("Škole")
                .id("edukacija-skole")
                .child(S.documentTypeList("schoolPage").id("edukacija-skole-list").title("Škole")),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title("Тим и услуге")
        .id("tim-usluge")
        .child(
          S.list()
            .id("tim-usluge-list")
            .title("Тим и услуге")
            .items([
              S.documentTypeListItem("doctor").id("doctor").title("Lekari"),
              S.documentTypeListItem("department").id("department").title("Odeljenja"),
              S.documentTypeListItem("service").id("service").title("Usluge"),
            ]),
        ),

      S.listItem()
        .title("Новости и садржај")
        .id("novosti-sadrzaj")
        .child(
          S.list()
            .id("novosti-sadrzaj-list")
            .title("Новости и садржај (napomena: /aktuelnosti ruta je i dalje hardkodovana, ovi tipovi još nisu prikazani na sajtu)")
            .items([
              S.documentTypeListItem("news").id("news").title("Novosti"),
              S.documentTypeListItem("publication").id("publication").title("Publikacije"),
              S.documentTypeListItem("testimonial").id("testimonial").title("Testimonials"),
            ]),
        ),

      S.divider(),

      singleton(S, "navigation", "Навигација"),
      singleton(S, "footer", "Footer"),
      singleton(S, "siteSettings", "Подешавања сајта"),
    ]);
