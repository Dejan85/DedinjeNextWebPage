import type {
  BannerBlockData,
  CardGridBlockData,
  IntroSectionBlock,
  PatientPage,
} from "@/sanity/types";

const intro: IntroSectionBlock = {
  _type: "introSection",
  icon: "fas fa-stethoscope",
  heading: "О конзилијуму",
  paragraphs: [
    "Васкуларни конзилијум је високоспецијализовани тим који се свакодневно састаје ради доношења одлука о лечењу пацијената са обољењима крвних судова.",
  ],
  badges: [
    { icon: "fas fa-user-doctor", label: "Васкуларни хирурзи" },
    { icon: "fas fa-x-ray", label: "Радиолози" },
    { icon: "fas fa-heart-pulse", label: "Ангиолози" },
    { icon: "fas fa-brain", label: "Неуролози" },
    { icon: "fas fa-heart", label: "Кардиолози" },
  ],
};

const procesRada: CardGridBlockData = {
  _type: "cardGridBlock",
  heading: "Процес рада конзилијума",
  subtitle: "Од прегледа до одлуке о лечењу",
  numbered: true,
  cards: [
    {
      icon: "fas fa-stethoscope",
      title: "Преглед и дијагностика",
      description:
        "На основу прегледа ординирајућег васкуларног хирурга и налаза адекватне дијагностике (КТ и МР ангиографија) доносе се индивидуализоване одлуке за лечење сваког пацијента.",
    },
    {
      icon: "fas fa-clipboard-list",
      title: "Одлука конзилијума",
      description:
        "Утврђује се степен хитности индикованих интервенција у односу на природу болести и смештајне капацитете клинике, те се пацијенти стављају на листе чекања.",
    },
    {
      icon: "fas fa-phone",
      title: "Обавештавање пацијента",
      description:
        "Пацијенти се сами обавештавају о одлуци конзилијума телефонским путем, неколико дана након њеног доношења.",
    },
  ],
};

const infoBanner: BannerBlockData = {
  _type: "bannerBlock",
  variant: "info",
  icon: "fas fa-circle-info",
  title: "Додатне информације",
  text: "Уколико је неопходно даље болничко лечење, пацијент ће благовремено бити обавештен о термину хоспитализације и о неопходној документацији коју је потребно да прибави. За све додатне информације пацијенти могу да се обрате надлежним васкуларним хирурзима у термину њиховог амбулантног дана.",
};

const contact: BannerBlockData = {
  _type: "bannerBlock",
  variant: "highlight",
  icon: "fas fa-phone",
  title: "Контакт —",
  text: "Call центар Института Дедиње: 011 3601 700",
};

export const DATA: PatientPage = {
  title: "Васкуларни конзилијум",
  subtitle: "Високоспецијализовани тим за лечење обољења крвних судова",
  pageBuilder: [intro, procesRada, infoBanner, contact],
};
