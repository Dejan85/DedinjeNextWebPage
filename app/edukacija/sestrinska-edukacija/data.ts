import type { CardGridBlockData, PatientPage } from "@/sanity/types";

const nav: CardGridBlockData = {
  _type: "cardGridBlock",
  cards: [
    {
      icon: "fas fa-clock-rotate-left",
      title: "Историјат и међународна сарадња",
      description: "Развој сестринске едукације од седамдесетих година до данас",
      href: "/edukacija/sestrinska-edukacija/istorijat",
    },
    {
      icon: "fas fa-graduation-cap",
      title: "Интерна едукација (КМЕ)",
      description: "Континуирана медицинска едукација за све запослене",
      href: "/edukacija/interna-edukacija",
    },
    {
      icon: "fas fa-heart-pulse",
      title: "Курс КПР",
      description: "Примена стандарда у кардиопулмоналној реанимацији одраслих особа",
      href: "/edukacija/sestrinska-edukacija/kpr-kurs",
    },
    {
      icon: "fas fa-user-nurse",
      title: "Приправнички стаж",
      description: "Стажирање медицинских сестара и техничара у ИКВБ Дедиње",
      href: "/edukacija/sestrinska-edukacija/pripravnicki-staz",
    },
    {
      icon: "fas fa-book-medical",
      title: "Програм кратких студија",
      description: "Заједнички програм са Факултетом медицинских наука у Крагујевцу",
      href: "/edukacija/sestrinska-edukacija/program-kratkih-studija",
    },
  ],
};

export const DATA: PatientPage = {
  title: "Едукација медицинских сестара и техничара",
  subtitle:
    "Едукација медицинских сестара и техничара представља темељ сигурног, савременог и ефикасног здравственог система",
  pageBuilder: [nav],
};
