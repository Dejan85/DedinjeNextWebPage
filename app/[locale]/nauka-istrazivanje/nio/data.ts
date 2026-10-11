import type {
  AccordionBlockData,
  BannerBlockData,
  CardGridBlockData,
  DocumentListBlockData,
  IntroSectionBlock,
  PatientPage,
} from "@/sanity/types";
import { RESEARCHER_COUNT, RESEARCHER_ITEMS } from "./researchers";

const intro: IntroSectionBlock = {
  _type: "introSection",
  icon: "fas fa-flask",
  heading: "О научноистраживачком раду",
  paragraphs: [
    'Вођен визијом о стварању здравствене установе која би равноправно егзистирала са водећим светским клиникама по броју и квалитету научних пројеката и публикација, по активном учешћу наших лекара на светски признатим конгресима и др. облицима едукације, директор Проф. др Милован Бојић, НС је 2020. године покренуо иницијативу добијања научне акредитације Националног института за срце и крвне судове „Дедиње”.',
  ],
  stats: [
    { value: "2020", label: "Иницијатива" },
    { value: "2025", label: "Акредитација" },
    { value: "2026", label: "Центар изузетних вредности" },
  ],
};

const akreditacija: BannerBlockData = {
  _type: "bannerBlock",
  variant: "highlight",
  icon: "fas fa-award",
  title: "Акредитовани научноистраживачки институт",
  text: "Одбор за акредитацију научноистраживачких организација Министарства науке, технолошког развоја и иновација доделио је научну акредитацију Институту Одлуком бр 660-01-0007/2024-32 од 08.07.2025. године.",
};

const dokumenta: DocumentListBlockData = {
  _type: "documentListBlock",
  heading: "Документа и извештаји",
  subtitle: "Прегледајте документа директно или преузмите ПДФ",
  items: [
    {
      icon: "fas fa-certificate",
      label: "Одлука о научној акредитацији Института",
      href: "/pdf/odluka-akreditacija.pdf",
      year: "2025",
    },
    {
      icon: "fas fa-file-alt",
      label: "Извештај о Научноистраживачком раду за 2020.",
      href: "/pdf/izvestaj-nio-2020.pdf",
      year: "2020",
    },
    {
      icon: "fas fa-file-alt",
      label: "Извештај о Научноистраживачком раду за 2021.",
      href: "/pdf/izvestaj-nio-2021.pdf",
      year: "2021",
    },
    {
      icon: "fas fa-file-alt",
      label: "Извештај о Научноистраживачком раду за 2022.",
      href: "/pdf/izvestaj-nio-2022.pdf",
      year: "2022",
    },
    {
      icon: "fas fa-file-alt",
      label: "Извештај о Научноистраживачком раду за 2023.",
      href: "/pdf/izvestaj-nio-2023.pdf",
      year: "2023",
    },
  ],
};

// ── Центар изузетних вредности (раније посебна страница) ──────────────

const civIntro: IntroSectionBlock = {
  _type: "introSection",
  icon: "fas fa-award",
  heading: "Центар изузетних вредности",
  paragraphs: [
    'Национални институт за срце и крвне судове „Дедиње” представља установу од изванредног научноистраживачког значаја обзиром на број пацијената које лечи, спектар кардиоваскуларних процедура које се изводе на Институту и структуру кадра који се бави научноистраживачким радом. Један од основних услова за савремен истраживачки рад је квалификовано и адекватно обучено особље.',
    "У Центру за научну и истраживачку делатност у области кардиоваскуларне медицине остварује се неопходан континуитет у образовању, упознавање са савременим дијагностичким и терапијским методама као и овладавање техникама научноистраживачког рада.",
  ],
  stats: [{ value: "16", label: "истраживача у Центру" }],
};

const civAkreditacija: BannerBlockData = {
  _type: "bannerBlock",
  variant: "highlight",
  icon: "fas fa-certificate",
  title: "Статус Центра изузетних вредности",
  text: "Одбор за акредитацију научноистраживачких организација акредитовао је Центар изузетних вредности за научну и истраживачку делатност у области кардиоваскуларне медицине Одлуком бр. 660-01-00020/2026-03/4 од 09.06.2026. године, а Национални савет за научни и технолошки развој Одлуком од 24.06.2026. године доделио му је статус Центра изузетних вредности.",
};

const civDokumenta: DocumentListBlockData = {
  _type: "documentListBlock",
  heading: "Одлуке о акредитацији Центра",
  subtitle: "Прегледајте документа директно или преузмите ПДФ",
  items: [
    {
      icon: "fas fa-certificate",
      label: "Одлука о акредитацији Центра изузетних вредности (Одбор за акредитацију)",
      href: "/pdf/odluka-akreditacija-civ.pdf",
      year: "2026",
    },
    {
      icon: "fas fa-award",
      label: "Одлука о додели статуса Центра изузетних вредности (Национални савет)",
      href: "/pdf/odluka-status-civ.pdf",
      year: "2026",
    },
  ],
};

const standardi: CardGridBlockData = {
  _type: "cardGridBlock",
  heading: "Стандарди квалитета",
  subtitle: "Принципи које Центар примењује у научном истраживању",
  cards: [
    {
      icon: "fas fa-microscope",
      title: "ГСП — Добра научна пракса",
      description:
        "Принципи и стандарди који обезбеђују интегритет, поузданост и квалитет научноистраживачког рада.",
    },
    {
      icon: "fas fa-stethoscope",
      title: "ГЦП — Добра клиничка пракса",
      description:
        "Међународни стандард за дизајн, спровођење и извештавање о клиничким испитивањима на људима.",
    },
    {
      icon: "fas fa-flask",
      title: "ГЛП — Добра лабораторијска пракса",
      description:
        "Систем квалитета који се примењује у лабораторијском раду за обезбеђивање поузданости резултата.",
    },
  ],
};

const mentorstvo: BannerBlockData = {
  _type: "bannerBlock",
  variant: "info",
  icon: "fas fa-user-graduate",
  title: "Менторство младих истраживача",
  text: "У односу на младе истраживаче, сарадници Центра и Научно веће надгледају адекватну примену ГСП-а, обезбеђујући менторску подршку и континуирано усавршавање у области научноистраживачког рада.",
};

// ── Листа истраживача (раније посебна страница) ───────────────────────

const istrazivaciIntro: IntroSectionBlock = {
  _type: "introSection",
  icon: "fas fa-users",
  heading: "Истраживачки тим Института",
  paragraphs: [
    'Научноистраживачки рад Националног института за срце и крвне судове „Дедиње” остварује тим истраживача организованих по категоријама — од редовних професора до истраживача приправника. Списак је ажуриран на дан 03.09.2026. године.',
  ],
  stats: [
    { value: String(RESEARCHER_COUNT), label: "истраживача" },
    { value: String(RESEARCHER_ITEMS.length), label: "категорија" },
  ],
};

const istrazivaci: AccordionBlockData = {
  _type: "accordionBlock",
  title: 'Истраживачи Националног института за срце и крвне судове „Дедиње”',
  defaultOpenId: "visi-naucni-saradnici",
  items: RESEARCHER_ITEMS,
};

export const DATA: PatientPage = {
  title: "NIO",
  subtitle: "Научноистраживачки одсек Националног института за срце и крвне судове „Дедиње”",
  pageBuilder: [
    intro,
    akreditacija,
    dokumenta,
    civIntro,
    civAkreditacija,
    civDokumenta,
    standardi,
    mentorstvo,
    istrazivaciIntro,
    istrazivaci,
  ],
};
