import type { BannerBlockData, CardGridBlockData, IntroSectionBlock, PatientPage } from "@/sanity/types";

const intro: IntroSectionBlock = {
  _type: "introSection",
  icon: "fas fa-graduation-cap",
  heading: "О едукативним програмима",
  paragraphs: [
    'Институт за кардиоваскуларне болести „Дедиње" нуди различите едукативне програме усмерене на обуку и усавршавање стручњака у области кардиоваскуларне медицине. Програми обухватају континуирану медицинску едукацију (КМЕ), специјализоване школе и практичне обуке.',
    "Сви програми су у складу са прописима Коморе здравствених радника и Здравственог савета Србије. Полазници добијају акредитоване сертификате.",
  ],
};

const programi: CardGridBlockData = {
  _type: "cardGridBlock",
  heading: "Програми",
  subtitle: "3 акредитоване школе",
  cards: [
    {
      icon: "fas fa-heart-pulse",
      title: "Школа ехокардиографије",
      description:
        "Проф. др Александра Николић. Базична школа ехокардиографије обухвата теоретску и практичну наставу из области трансторакалне, трансезофагеалне и стрес ехокардиографије. (6+ месеци, 100+ прегледа, 3 модула)",
      href: "/edukacija/programi/skola-ehokardiografije-prof-dr-aleksandra-nikolic",
    },
    {
      icon: "fas fa-heart",
      title: "Школа хипертензије и редукције кардиоваскуларних фактора ризика",
      description:
        "Програм персонализоване превенције. Едукација из области дијагностике хипертензије, оштећења циљних органа и персонализованих програма редукције кардиоваскуларног ризика. (2+ месеца, 100+ ХИСПА прегледа, 40+ холтера)",
      href: "/edukacija/programi/skola-hipertenzije-i-redukcije-kardiovaskularnih-faktora-rizika",
    },
    {
      icon: "fas fa-wave-square",
      title: "Школа васкуларног ултразвука",
      description:
        "Ултрасонографска ангиолошка дијагностика. Обука из области ултрасонографије супрааорталних грана, абдоминалне аорте, висцералних артерија и артерија и вена екстремитета. (2+ месеца, 200+ прегледа, 2 испита)",
      href: "/edukacija/programi/skola-vaskularnog-ultrazvuka",
    },
  ],
};

const info: BannerBlockData = {
  _type: "bannerBlock",
  variant: "info",
  icon: "fas fa-certificate",
  title: "Акредитовани програми",
  text: "Све школе су акредитоване од стране Здравственог савета Републике Србије. Полазници добијају бодове континуиране медицинске едукације и сертификат који потврђује оспособљеност у датој области.",
};

export const DATA: PatientPage = {
  title: "Едукативни програми",
  subtitle: "Акредитоване школе за стручно усавршавање из области кардиоваскуларне медицине",
  pageBuilder: [intro, programi, info],
};
