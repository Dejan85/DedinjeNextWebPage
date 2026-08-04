import type {
  BannerBlockData,
  DocumentListBlockData,
  IntroSectionBlock,
  PatientPage,
} from "@/sanity/types";

const intro: IntroSectionBlock = {
  _type: "introSection",
  icon: "fas fa-flask",
  heading: "О научноистраживачком раду",
  paragraphs: [
    'Вођен визијом о стварању здравствене установе која би равноправно егзистирала са водећим светским клиникама по броју и квалитету научних пројеката и публикација, по активном учешћу наших лекара на светски признатим конгресима и др. облицима едукације, директор Проф. др Милован Бојић, НС је 2020. године покренуо иницијативу добијања научне акредитације Института за кардиоваскуларне болести „Дедиње".',
  ],
  stats: [
    { value: "2020", label: "Иницијатива" },
    { value: "2025", label: "Акредитација" },
    { value: "4", label: "Годишња извештаја" },
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
  subtitle: "Прегледајте документа директно или преузмите PDF",
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

export const DATA: PatientPage = {
  title: "NIO",
  subtitle: "Научноистраживачки одсек Института за кардиоваскуларне болести Дедиње",
  pageBuilder: [intro, akreditacija, dokumenta],
};
