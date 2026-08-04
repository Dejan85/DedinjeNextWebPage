import type { PatientPage } from "@/sanity/types";

export const DATA: PatientPage = {
  title: "Немедицински послови",
  subtitle:
    "Организационе јединице за административну, финансијску, правну и техничку подршку раду Института",
  pageBuilder: [
    {
      _type: "introSection",
      icon: "fas fa-building-columns",
      heading: "Подршка медицинском раду",
      paragraphs: [
        "Немедицинске службе Института обезбеђују несметано функционисање свих пословних процеса — од финансија и јавних набавки, преко правних послова, до техничког одржавања и информационих технологија. Професионалан рад ових служби омогућава лекарима и медицинском особљу да се у потпуности посвете пацијентима.",
      ],
    },
    {
      _type: "bannerBlock",
      variant: "highlight",
      icon: "fas fa-user-tie",
      title: "Помоћник директора за немедицинске послове — Бојана Поповић, маст.екон.",
      text: "Телефон: (+381 11) 3601 806 · Е-пошта: bojana.popovic@ikvbd.com",
    },
    {
      _type: "cardGridBlock",
      heading: "Организационе јединице",
      subtitle: "Службе и одељења за подршку пословању",
      cards: [
        {
          icon: "fas fa-coins",
          title: "Економско финансијски послови",
          description: "Финансијско планирање, буџетирање, рачуноводство и економска контрола пословања Института",
          contactPerson: "Божинка Томашевић, дипл.екон.",
          phone: "(+381 11) 3601 612",
          email: "racunovodstvo@ikvbd.com",
        },
        {
          icon: "fas fa-file-contract",
          title: "Служба јавних набавки",
          description: "Спровођење поступака јавних набавки у складу са законском регулативом",
          contactPerson: "Драгица Скочић, дипл. инж.",
          phone: "(+381 11) 3601 606",
          email: "dragica@ikvbd.com",
        },
        {
          icon: "fas fa-scale-balanced",
          title: "Правна служба",
          description: "Правни послови, нормативна акта, радни односи и заступање Института",
          contactPerson: "Наташа Елезовић, дипл. прав.",
          phone: "(+381 11) 3601 700",
          email: "elezovic.natasa@ikvbd.com",
        },
        {
          icon: "fas fa-wrench",
          title: "Техничка служба",
          description: "Одржавање техничких система, инфраструктуре и медицинске опреме",
          contactPerson: "Александар Томић, дипл. инж.",
          phone: "(+381 11) 3601 735",
          email: "tehnickasluzba@ikvbd.com",
        },
        {
          icon: "fas fa-server",
          title: "Рачунарски центар",
          description: "ИТ инфраструктура, информациони системи и техничка подршка",
          contactPerson: "Ненад Петковић, инж.",
          phone: "(+381 11) 3601 691",
          email: "racunarski.centar@institutdedinje.org",
        },
      ],
    },
  ],
};
