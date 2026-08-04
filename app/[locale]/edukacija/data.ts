import type {
  CardGridBlockData,
  IntroSectionBlock,
  PatientPage,
} from "@/sanity/types";

const intro: IntroSectionBlock = {
  _type: "introSection",
  icon: "fas fa-graduation-cap",
  heading: "О едукацији",
  paragraphs: [
    'Институт за кардиоваскуларне болести „Дедиње" је центар за едукацију и усавршавање стручњака у области кардиоваскуларне медицине. Кроз едукативне програме, радионице и конгресе пружамо могућност континуираног образовања лекара и медицинског особља.',
    "Од оснивања, посебна пажња посвећује се едукацији медицинских сестара, техничара и лекара. Дугогодишња сарадња са медицинским центрима у Хјустону и едукација преко 60 наших стручњака деведесетих година омогућила је покретање програма трансплантације срца и јетре. Стручно усавршавање се данас непрекидно спроводи у областима кардиологије, анестезиологије и кардиоваскуларне хирургије, кроз академске програме Медицинског факултета Универзитета у Београду и међународне едукативне центре — Институт је наставна база више српских универзитета и организатор међународних конгреса.",
  ],
  stats: [
    { value: "3", label: "Школе" },
    { value: "5+", label: "Конгреса годишње" },
    { value: "200+", label: "Полазника" },
    { value: "15+", label: "Година искуства" },
  ],
};

const programi: CardGridBlockData = {
  _type: "cardGridBlock",
  heading: "Едукативни програми",
  subtitle: "Акредитоване школе за стручно усавршавање",
  cards: [
    {
      icon: "fas fa-heart-pulse",
      title: "Школа ехокардиографије",
      href: "/edukacija/programi/skola-ehokardiografije-prof-dr-aleksandra-nikolic",
    },
    {
      icon: "fas fa-heart",
      title: "Школа хипертензије и редукције кардиоваскуларних фактора ризика",
      href: "/edukacija/programi/skola-hipertenzije-i-redukcije-kardiovaskularnih-faktora-rizika",
    },
    {
      icon: "fas fa-wave-square",
      title: "Школа васкуларног ултразвука",
      href: "/edukacija/programi/skola-vaskularnog-ultrazvuka",
    },
  ],
};

const ostalo: CardGridBlockData = {
  _type: "cardGridBlock",
  heading: "Конгреси, радионице и друге активности",
  subtitle: "Све едукативне активности Института Дедиње",
  cards: [
    {
      icon: "fas fa-calendar-alt",
      title: "KME 2024",
      description:
        "Конгрес кардиолога и електрофизиолога — акредитована КМЕ настава и предавања.",
      href: "/edukacija/kme-2024",
    },
    {
      icon: "fas fa-users",
      title: "Интерна едукација",
      description:
        "Мултидисциплинарна континуирана едукација за медицинске сестре, техничаре и младе лекаре.",
      href: "/edukacija/interna-edukacija",
    },
    {
      icon: "fas fa-laptop-medical",
      title: "Радионице",
      description:
        "Специјализоване практичне радионице из области кардиоваскуларне медицине и хирургије.",
      href: "/edukacija/radionice",
    },
    {
      icon: "fas fa-microphone",
      title: "Конгреси",
      description: "Годишњи конгрес Института и конгрес кардиоваскуларне превенције.",
      href: "/edukacija/kongresi",
    },
    {
      icon: "fas fa-globe",
      title: "Међународни конгреси",
      description: "Учешће на престижним међународним научним скуповима и размена знања.",
      href: "/edukacija/medjunarodni-kongresi",
    },
  ],
};

export const DATA: PatientPage = {
  title: "Едукација",
  subtitle: "Обука, радионице и конгреси у области кардиоваскуларне медицине",
  pageBuilder: [intro, programi, ostalo],
};
