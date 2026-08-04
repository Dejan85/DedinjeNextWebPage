import type { CardGridBlockData, IntroSectionBlock, PatientPage } from "@/sanity/types";

const intro: IntroSectionBlock = {
  _type: "introSection",
  icon: "fas fa-newspaper",
  heading: "Научне активности Института",
  paragraphs: [
    "Пратите актуелна дешавања, пројекте и партнерства у области научноистраживачке делатности Института за кардиоваскуларне болести Дедиње.",
  ],
};

const vesti: CardGridBlockData = {
  _type: "cardGridBlock",
  cards: [
    {
      icon: "fas fa-file-signature",
      category: "Трансформација",
      date: "03. 08. 2022.",
      title: "Меморандум о сарадњи — SAIGE пројекат",
      description:
        "Министарство просвете, науке и технолошког развоја Републике Србије и Институт за кардиоваскуларне болести Дедиње потписали су Меморандум о сарадњи и подршци процесу институционалне трансформације са циљем постизања изврсности у науци.",
      href: "/nauka-istrazivanje/saige-projekat",
    },
    {
      icon: "fas fa-clipboard-check",
      category: "Вредновање",
      date: "2020.",
      title: "Процес вредновања научноистраживачких института",
      description:
        'Спроведен је процес вредновања Института који обављају научноистраживачку делатност. Институт за кардиоваскуларне болести „Дедиње" пријавио се у другу групу института у оквиру SAIGE пројекта.',
      href: "/nauka-istrazivanje/saige-projekat",
    },
  ],
};

export const DATA: PatientPage = {
  title: "Актуелности из науке",
  subtitle: "Најновије вести и дешавања из научноистраживачког рада Института",
  pageBuilder: [intro, vesti],
};
