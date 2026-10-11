import type { PatientPage } from "@/sanity/types";

export const DATA: PatientPage = {
  title: "Локација Института",
  subtitle: "Како доћи до Националног института за срце и крвне судове „Дедиње”",
  pageBuilder: [
    {
      _type: "cardGridBlock",
      heading: "Како до нас",
      subtitle: "Доступне опције јавног и приватног превоза",
      cards: [
        {
          icon: "fas fa-bus",
          title: "Аутобус",
          value: "Линије 42, 59, 78",
          description: 'Станица "Дедиње" — директно испред Института',
        },
        {
          icon: "fas fa-train-tram",
          title: "Трамвај",
          value: "Линије 3, 12",
          description: 'Станица "Топчидерска звезда" — 10 минута пешице',
        },
        {
          icon: "fas fa-car",
          title: "Аутомобил",
          value: "Без сопственог паркинга",
          description: "Институт нема паркинг за пацијенте и пратњу — препоручујемо паркирање у споредним улицама",
        },
        {
          icon: "fas fa-taxi",
          title: "Такси",
          value: "Све такси службе",
          description: "Адреса: Хероја Милана Тепића бр. 1, 11040 Београд",
        },
      ],
    },
    {
      _type: "bannerBlock",
      variant: "highlight",
      icon: "fas fa-parking",
      title: "Паркинг",
      text: "Институт нема сопствени паркинг за пацијенте и пратњу. Препоручујемо паркирање у споредним улицама у околини Института или долазак јавним градским превозом.",
    },
  ],
};
