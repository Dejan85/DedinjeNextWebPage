import type { BannerBlockData, CardGridBlockData, IntroSectionBlock, PatientPage } from "@/sanity/types";

const intro: IntroSectionBlock = {
  _type: "introSection",
  icon: "fas fa-laptop-medical",
  heading: "О радионицама",
  paragraphs: [
    "У срцу Београда, у прелепом и историјском окружењу Дедиња, одвијају се престижне радионице које привлаче пажњу стручњака из различитих области широм света. Ова ексклузивна локација, обогаћена културном баштином и луксузном атмосфером, пружа инспиративно окружење за размену идеја и научних открића.",
    "Једна од кључних карактеристика Института је константна тежња ка иновацијама. Својим истраживањима и имплементацијом нових технологија, доприносе унапређењу метода лечења кардиоваскуларних болести.",
  ],
  stats: [
    { value: "3+", label: "Радионице годишње" },
    { value: "10+", label: "Земаља" },
    { value: "50+", label: "Учесника" },
  ],
};

const karakteristike: CardGridBlockData = {
  _type: "cardGridBlock",
  heading: "Карактеристике радионица",
  subtitle: "Шта издваја наше радионице",
  cards: [
    {
      icon: "fas fa-globe",
      title: "Међународно учешће",
      description:
        "Радионице привлаче стручњаке из различитих области широм света и омогућавају размену искустава на глобалном нивоу.",
    },
    {
      icon: "fas fa-microscope",
      title: "Иновације и технологије",
      description:
        "Имплементација нових технологија и метода лечења кардиоваскуларних болести кроз практичне демонстрације.",
    },
    {
      icon: "fas fa-hands-helping",
      title: "Практична настава",
      description:
        "Директан рад са најсавременијом опремом и техникама у инспиративном окружењу Института Дедиње.",
    },
  ],
};

const galerija: CardGridBlockData = {
  _type: "cardGridBlock",
  heading: "Радионице Института Дедиње",
  subtitle: "Преглед одржаних и предстојећих радионица",
  cards: [
    {
      icon: "fas fa-calendar-star",
      title: "CMR in Modern Cardiology",
      value: "Предстојећа",
      description: "International Workshop — 30. октобар – 1. новембар 2026.",
    },
    {
      icon: "fas fa-cube",
      title: "IKVBD MedTech 3D Workshop",
      description: "27. март 2025.",
    },
    {
      icon: "fas fa-heart-pulse",
      title: "Minimally Invasive Aortic Valve Surgery",
      description: "Virtual Workshop — 04. април 2024.",
    },
  ],
};

const quote: BannerBlockData = {
  _type: "bannerBlock",
  variant: "motto",
  icon: "fas fa-award",
  text: 'Институт за кардиоваскуларне болести "Дедиње" представља светионик стручности, иновације и бриге о срцу и крвним судовима и као такав постао је призната институција која поставља стандарде у лечењу, истраживању и превенцији кардиоваскуларних обољења.',
};

export const DATA: PatientPage = {
  title: "Радионице",
  subtitle: "Размена идеја, научних открића и нових технологија",
  pageBuilder: [intro, karakteristike, galerija, quote],
};
