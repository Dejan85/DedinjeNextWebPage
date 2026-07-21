import type {
  BannerBlockData,
  CardGridBlockData,
  IntroSectionBlock,
  PatientPage,
} from "@/sanity/types";

const intro: IntroSectionBlock = {
  _type: "introSection",
  icon: "fas fa-utensils",
  heading: "Здрава исхрана за здраво срце",
  paragraphs: [
    "Метаболички поремећаји, укључујући дијабетес, хипертензију и гојазност, све су чешћи у модерном друштву. Промене у исхрани су међу најефикаснијим начинима за превенцију и контролу ових стања.",
    "Правилна исхрана је кључни фактор у превенцији и лечењу метаболичких поремећаја. Уравнотежена, разноврсна и умерена исхрана може значајно побољшати квалитет живота и смањити ризик од ових здравствених проблема.",
  ],
};

const preporuke: CardGridBlockData = {
  _type: "cardGridBlock",
  heading: "Основне препоруке за исхрану",
  subtitle: "Кључни принципи здраве исхране за превенцију обољења",
  cards: [
    {
      icon: "fas fa-apple-whole",
      title: "Воће и поврће",
      description:
        "Најмање 5 порција дневно — богат извор витамина, минерала и влакана за здрав кардиоваскуларни систем.",
    },
    {
      icon: "fas fa-wheat-awn",
      title: "Интегрални житарице",
      description:
        "Замените рафинисане угљене хидрате интегралним — хлеб, пиринач, тестенине од целог зрна.",
    },
    {
      icon: "fas fa-fish",
      title: "Здрави протеини",
      description:
        "Риба (нарочито масна риба), пилетина без коже, махунарке и ораси су одличан извор квалитетних протеина.",
    },
    {
      icon: "fas fa-droplet",
      title: "Здрави масти",
      description:
        "Маслиново уље, авокадо и ораси уместо засићених и транс масти. Ограничите унос масноће животињског порекла.",
    },
    {
      icon: "fas fa-ban",
      title: "Ограничите со и шећер",
      description:
        "Мање од 5g соли дневно. Избегавајте додати шећер, газиране и заслађене напитке.",
    },
    {
      icon: "fas fa-glass-water",
      title: "Хидратација",
      description:
        "Најмање 1.5–2 литре воде дневно. Избегавајте алкохол и напитке са кофеином у великим количинама.",
    },
  ],
};

const kalorijskiPlanovi: CardGridBlockData = {
  _type: "cardGridBlock",
  heading: "Калоријски планови",
  subtitle: "Прилагођени планови према потребама пацијента",
  intro:
    'Институт за кардиоваскуларне болести „Дедиње" пружа детаљан план препоручене исхране за превенцију и лечење метаболичких и кардиоваскуларних обољења, са различитим калоријским вредностима.',
  cards: [
    {
      icon: "fas fa-weight-scale",
      value: "1200",
      description: "За особе са вишком килограма и дијабетесом тип 2",
    },
    {
      icon: "fas fa-person-walking",
      value: "1500",
      description: "За контролу тежине и умерену физичку активност",
    },
    {
      icon: "fas fa-person-running",
      value: "1800",
      description: "За одржавање тежине уз редовну физичку активност",
    },
    {
      icon: "fas fa-heart-pulse",
      value: "2000",
      description: "Стандардни план за одрасле без значајног вишка тежине",
    },
  ],
};

const motto: BannerBlockData = {
  _type: "bannerBlock",
  variant: "motto",
  icon: "fas fa-heart",
  text: "Знање штити срце: ваша превенција је наша мисија!",
};

export const DATA: PatientPage = {
  title: "План исхране",
  subtitle: "Препоруке за превенцију и лечење метаболичких обољења",
  pageBuilder: [intro, preporuke, kalorijskiPlanovi, motto],
};
