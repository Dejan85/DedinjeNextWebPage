import type { BannerBlockData, CardGridBlockData, ChecklistBlockData, PatientPage } from "@/sanity/types";

const kmeCards: CardGridBlockData = {
  _type: "cardGridBlock",
  cards: [
    { icon: "fas fa-user-md", title: "КМЕ – Лекари", href: "/edukacija/kme-2024" },
    {
      icon: "fas fa-user-nurse",
      title: "КМЕ – медицинске сестре/техничари",
      href: "/edukacija/kme-2024/kme-medicinske-sestre-tehnicari",
    },
    { icon: "fas fa-archive", title: "КМЕ – Архива", href: "/edukacija/kme-2024" },
  ],
};

const sluzba: ChecklistBlockData = {
  _type: "checklistBlock",
  heading: "Служба за образовну делатност",
  intro: "Научно-истраживачки рад обухвата све клинике медицинског сектора Института",
  items: [
    "Планира, надзире и евалуира израду научно-истраживачких и развојних пројеката",
    "Координира припремање и објављивање стручних и научних радова",
    "Планира и координира научне и техничке послове у вези научно-истраживачког рада Института",
    "Припрема опште акте који уређују научно-истраживачку делатност Института",
  ],
};

const sektor: ChecklistBlockData = {
  _type: "checklistBlock",
  heading: "Сектор за научно-истраживачки рад",
  intro: "КМЕ је део редовних активности Сектора за научно-истраживачки рад",
  items: [
    "Организује различите облике стручног и научног усавршавања",
    "Организује различите облике међународне сарадње",
    "Координира учешће на научним и стручним скуповима",
    "Прати и контролише спровођење обавезног лекарског, специјалистичког и субспецијалистичког стажа на Институту",
  ],
};

const infoNota: BannerBlockData = {
  _type: "bannerBlock",
  variant: "info",
  icon: "fas fa-info-circle",
  text: "Усавршавање лекара и медицинских техничара је обавеза запослених и неопходна је како за унапређење квалитета рада тако и за обнављање лиценци за њихов рад.",
};

const rasporedPoTemama: CardGridBlockData = {
  _type: "cardGridBlock",
  heading: "Распоред по темама",
  subtitle: "Преглед завршених специјализација — 14 предавања",
  numbered: true,
  cards: [
    { title: "ЕЦМО – Екстракорпорална мембранска оксигенација", description: "проф. др Миомир Јовић" },
    {
      title: "Хипертензија и физичка активност – да ли је могућа терапија без лекова?",
      description: "проф. др Небојша Тасић",
    },
    { title: "Лечење аритмолошке олује", description: "др Дејан Којић" },
    {
      title: "Контрола фактора ризика за исхемијски кардиоваскуларни догађај",
      description: "асс. др сци. мед. др Срђан Бабић",
    },
    { title: "Вентрикуларна тахикардија (ВТ)", description: "проф. др Петар Оташевић" },
    {
      title: "Клиничко-патохистолошки модалитети миокардитиса на обдукцијском материјалу",
      description: "др Љубомир Ђоковић",
    },
    { title: "ЛВАД И ЕЦМО", description: "Др Јелена Латковић – Др Љубомир Ђоковић" },
    {
      title: "Сепса и септички шок",
      description: "Др Јована Иванчевић – Др Љ. Ђоковић, Др Д. Унић-Стојановић",
    },
    { title: "Хронични коронарни синдром", description: "Др Маја Милошевић – Проф. др Петар Оташевић" },
    { title: "Преткоморске аритмије", description: "Др Михаило Јовичић, Др Велибор Ристић" },
    {
      title: "Неоклузивна коронарна болест и микроциркулација",
      description: "Др Стефан Тимчић, Проф. др Раде Бабић",
    },
    {
      title: "Клинички преглед и дијагностика васкуларних болести",
      description: "Др Александар Бабић, Проф. др Ненад Илијевски",
    },
    {
      title: "Анеуризматска и периферна артеријска болест код поливаскуларног болесника",
      description: "Др Игор Атанасијевић, Асс. др Предраг Матић",
    },
    {
      title: "ЦТ коронарографија",
      description: "Др Тијана Рошул, Др Милица Брковић, Др Ковачевић",
    },
  ],
};

const kontakt: CardGridBlockData = {
  _type: "cardGridBlock",
  heading: "Контакт",
  intro: "За додатне информације о КМЕ програму, обратите се:",
  cards: [
    { icon: "fas fa-user", title: "Контакт особа", description: "Проф. др Небојша Тасић" },
    { icon: "fas fa-phone", title: "Телефон", description: "011 360 1669" },
    { icon: "fas fa-envelope", title: "Е-маил", description: "nic@yahoo.com" },
  ],
};

export const DATA: PatientPage = {
  title: "KME 2024",
  subtitle: "Континуирана медицинска едукација",
  pageBuilder: [kmeCards, sluzba, sektor, infoNota, rasporedPoTemama, kontakt],
};
