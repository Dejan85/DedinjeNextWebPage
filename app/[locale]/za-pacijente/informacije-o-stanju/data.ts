import type {
  BannerBlockData,
  CardGridBlockData,
  ContactDirectoryBlockData,
  IntroSectionBlock,
  PatientPage,
} from "@/sanity/types";

const intro: IntroSectionBlock = {
  _type: "introSection",
  icon: "fas fa-info-circle",
  heading: "Информисање о стању пацијента",
  paragraphs: [
    "За пацијенте који се хитно оперишу, најближи чланови породице могу доћи и добити информације лично од лекара сваког дана у 12 часова. За дуголежеће пацијенте, информације се могу добити лично уз претходни договор са лекарима.",
  ],
};

const alertBanner: BannerBlockData = {
  _type: "bannerBlock",
  variant: "alert",
  icon: "fas fa-triangle-exclamation",
  title: "Информације се односе само на хоспитализоване пацијенте",
  text: "Информације путем телефона могу добити искључиво најближи чланови породице (особе које је пацијент навео при отварању историје болести). Информације искључиво пружају лекари.",
};

const contactDirectory: ContactDirectoryBlockData = {
  _type: "contactDirectoryBlock",
  heading: "Контакт телефони по одељењима",
  subtitle: "Позовите одељење у назначеном термину",
  categories: [
    {
      title: "Кардиохируршки пацијенти",
      icon: "fas fa-heart-pulse",
      contacts: [
        {
          title: "Одељење преоперативне припреме кардиохирургије",
          note: "пре операције",
          phone: "011/3601-819",
          href: "tel:0113601819",
          time: "12:00 – 13:00",
        },
        {
          title: "Клиника за анестезију и интензивно лечење",
          note: "након операције",
          phone: "011/3601-784",
          href: "tel:0113601784",
          time: "12:30 – 13:30 и 20:00 – 20:30 (за пацијенте оперисане тог дана)",
        },
        {
          title: "Одељење за постоперативно лечење",
          note: "након преласка из интензивне неге",
          phone: "011/3601-792 или 011/3601-796",
          href: "tel:0113601792",
          time: "13:00 – 13:30",
        },
      ],
    },
    {
      title: "Васкуларни пацијенти",
      icon: "fas fa-stethoscope",
      contacts: [
        {
          title: "Клиника за анестезију и интензивно лечење",
          note: "након операције",
          phone: "011/3601-784",
          href: "tel:0113601784",
          time: "12:30 – 13:30 и 20:00 – 20:30 (за болеснике оперисане тог дана)",
        },
        {
          title: "Клиника за васкуларну хирургију",
          phone: "011/3601-705",
          href: "tel:0113601705",
          time: "12:00 – 13:00",
        },
      ],
    },
    {
      title: "Кардиолошки пацијенти",
      icon: "fas fa-heart",
      contacts: [
        {
          title: "Клиника за кардиологију",
          phone: "011/3601-707, 011/3601-709 (коронарна јединица)",
          href: "tel:0113601707",
          time: "12:00 – 13:00",
        },
      ],
    },
  ],
};

const deliveryGrid: CardGridBlockData = {
  _type: "cardGridBlock",
  heading: "Достава ствари",
  subtitle: "Информације о достави ствари хоспитализованим пацијентима",
  cards: [
    { icon: "fas fa-clock", title: "Време доставе", description: "14:00 – 16:00 часова" },
    {
      icon: "fas fa-building",
      title: "Дедиње 1 – средњи улаз",
      description:
        "Одељења кардиологије, васкуларне хирургије и интензивне неге васкуларне хирургије",
    },
    {
      icon: "fas fa-building",
      title: "Дедиње 2 – главни улаз",
      description: "Преоперативна припрема, постоперативна нега и интензивна нега кардиохирургије",
    },
  ],
};

const warningBanner: BannerBlockData = {
  _type: "bannerBlock",
  variant: "warning",
  icon: "fas fa-ban",
  text: "Строго је забрањена достава унапред припремљене хране.",
};

const deliveryNote: BannerBlockData = {
  _type: "bannerBlock",
  variant: "info",
  icon: "fas fa-circle-info",
  text: "Лекови и медицинска документација могу се доставити и ван наведеног времена. Болничарке са одељења силазе по ствари након обавештења портира.",
};

export const DATA: PatientPage = {
  title: "Информације о здравственом стању пацијента",
  subtitle: "Информације за најближе чланове породице хоспитализованих пацијената",
  pageBuilder: [intro, alertBanner, contactDirectory, deliveryGrid, warningBanner, deliveryNote],
};
