import type {
  BannerBlockData,
  CardGridBlockData,
  ChecklistBlockData,
  IntroSectionBlock,
  PatientPage,
} from "@/sanity/types";

const intro: IntroSectionBlock = {
  _type: "introSection",
  icon: "fas fa-graduation-cap",
  heading: "О програму",
  paragraphs: [
    "Убрзани развој савремене медицине захтева континуирану едукацију и усавршавање у свим областима. Како би одржали корак, развили смо програме мултидисциплинарне континуиране едукације и усавршавања, у различитим облицима (предавања, конфронтација, семинара) медицинских сестара и техничара, младих лекара и техничара одељења перфузије.",
  ],
  stats: [
    { value: "3", label: "Програма" },
    { value: "46+", label: "Младих лекара" },
    { value: "32", label: "Предавања" },
    { value: "16", label: "Вежби" },
  ],
};

const simulacioniProgrami: ChecklistBlockData = {
  _type: "checklistBlock",
  heading: "Програми симулационог учења",
  intro: "Истовремено се одвијају програми симулационог учења:",
  items: [
    "Кардиопулмоналне реанимације за све запослене",
    "Обезбеђивања дисајног пута и интензивног лечења",
  ],
};

const simulacioniNota: BannerBlockData = {
  _type: "bannerBlock",
  variant: "info",
  icon: "fas fa-flask",
  text: "У припреми су нови програми едукације.",
};

const moduliSestre: CardGridBlockData = {
  _type: "cardGridBlock",
  heading: "Едукација медицинских сестара/техничара",
  subtitle: "Модули за стручно усавршавање здравствених радника",
  cards: [
    {
      icon: "fas fa-book-medical",
      title: "Модул теоријске наставе",
      description:
        "16 предавања са практичним вежбама (реализују лекари и сестре едукатори – главне сестре) – по предвиђеном програму (једном недељно).",
    },
    {
      icon: "fas fa-heartbeat",
      title: "Модул кардиопулмоналне реанимације",
      description:
        "Предавања, вежбе и клинички сценарији спровођења КПР (реализују лекари и сестре едукатори – главне сестре) – трајање модула седам радних дана – у току је едукација друге групе.",
    },
  ],
};

const planNastave: CardGridBlockData = {
  _type: "cardGridBlock",
  heading: "План наставе",
  numbered: true,
  cards: [
    {
      title: "Прва група",
      description:
        "Медицинске сестре и техничари Клинике за анестезију и интензивно лечење (Одељења анестезије и Одељења интензивног лечења) и Коронарне јединице.",
    },
    {
      title: "Наредне групе",
      description: "Потом ће бити реализован за медицинске сестре / техничаре свих клиника и одељења.",
    },
  ],
};

const temePredavaci: IntroSectionBlock = {
  _type: "introSection",
  heading: "Теме и предавачи (2024–2026)",
  paragraphs: [
    "У оквиру Континуиране медицинске едукације, према Програму усвојеном од стране Тима за едукацију Института, одржан је Семинар интензивног лечења за медицинске сестре/техничаре. Предавања са овог семинара су снимљена и постављањем на ову платформу доступна свим медицинским сестрама и техничарима Института за кардиоваскуларне болести „Дедиње“. Циљ предавања је да се обнове и стекну нова знања и вештине које ће одмах бити преточене у свакодневни клинички рад.",
    "Предавања су из седам области:",
  ],
};

const kmeOblasti: ChecklistBlockData = {
  _type: "checklistBlock",
  items: [
    "Уводна предавања",
    "Превенција интрахоспиталних инфекција",
    "Основе кардиоваскуларне медицине",
    "Васкуларна хирургија",
    "Кардиохирургија",
    "Рехабилитација",
    "Продужено лечење",
  ],
};

const moduliLekari: CardGridBlockData = {
  _type: "cardGridBlock",
  heading: "Едукација младих лекара",
  subtitle: "Програм за младе специјалисте и специјализанте",
  cards: [
    {
      icon: "fas fa-chalkboard-teacher",
      title: "Модул теоријске наставе",
      description:
        "Реализују млади лекари са менторима / едукаторима по предвиђеном програму Тима за едукацију (једном недељно). Планирана су 32 предавања до 07.10.2021 за 46 младих лекара.",
    },
    {
      icon: "fas fa-heartbeat",
      title: "Модул кардиопулмоналне реанимације",
      description: "У припреми модул са програмом у трајању 5–6 радних дана (у току је едукација едукатора).",
    },
  ],
};

const lekariNota: BannerBlockData = {
  _type: "bannerBlock",
  variant: "info",
  icon: "fas fa-info-circle",
  text: "У припреми је почетак рада са првом групом младих лекара Клинике за анестезију и интензивно лечење, а надаље биће укључени сви полазници едукације.",
};

const kontakt: CardGridBlockData = {
  _type: "cardGridBlock",
  heading: "Контакт за интерну едукацију",
  intro:
    "За све информације о програмима интерне едукације, пријавама и распореду, обратите се контакт особи.",
  cards: [
    { icon: "fas fa-user", title: "Контакт особа", description: "Проф. др Небојша Тасић" },
    { icon: "fas fa-phone", title: "Телефон", description: "011 360 1669" },
    { icon: "fas fa-envelope", title: "Е-маил", description: "nic@yahoo.com" },
  ],
};

export const DATA: PatientPage = {
  title: "Интерна едукација",
  subtitle: "Континуирано усавршавање запослених",
  pageBuilder: [
    intro,
    simulacioniProgrami,
    simulacioniNota,
    moduliSestre,
    planNastave,
    temePredavaci,
    kmeOblasti,
    moduliLekari,
    lekariNota,
    kontakt,
  ],
};
