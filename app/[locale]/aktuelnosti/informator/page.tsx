import { client } from "@/sanity/lib/client";
import { INFORMATOR_QUERY } from "@/sanity/lib/queries";
import type { InformatorPage as InformatorPageData } from "@/sanity/types";
import InformatorClient, { type InformatorData } from "./InformatorClient";

const FALLBACK: InformatorData = {
  heroHeading: "О информатору",
  heroParagraphs: [
    "Информатор о раду Института за кардиоваскуларне болести Дедиње припремљен је у складу са чланом 39. Закона о слободном приступу информацијама од јавног значаја и Упутством за израду и објављивање информатора о раду државног органа.",
    "Циљ информатора је да заинтересованим лицима омогући увид у основне податке о раду Института, унутрашњој организацији, надлежностима, услугама и поступцима.",
  ],
  publishDate: "15. јануар 2026.",
  updatedDate: "01. фебруар 2026.",
  pdfUrl: "/pdf/АКАДЕМИК-CV-АВГУСТ-2025.pdf",
  sections: [
    {
      icon: "fas fa-landmark",
      title: "Основни подаци",
      description:
        "Пун назив, седиште, матични број, ПИБ, оснивач и правни статус Института за кардиоваскуларне болести Дедиње.",
    },
    {
      icon: "fas fa-sitemap",
      title: "Организациона структура",
      description: "Унутрашња организација Института – клинике, одељења, службе и органи управљања.",
    },
    {
      icon: "fas fa-gavel",
      title: "Прописи и акти",
      description: "Закони, подзаконски акти и интерни акти на основу којих Институт обавља своју делатност.",
    },
    {
      icon: "fas fa-money-bill-wave",
      title: "Буџет и финансије",
      description: "Информације о изворима финансирања, буџету и финансијским извештајима Института.",
    },
    {
      icon: "fas fa-hands-helping",
      title: "Услуге и права грађана",
      description:
        "Информације о услугама које Институт пружа, правима пацијената и поступку остваривања права.",
    },
    {
      icon: "fas fa-envelope-open-text",
      title: "Подношење захтева",
      description: "Упутство за подношење захтева за слободан приступ информацијама од јавног значаја.",
    },
  ],
  contactHeading: "Захтев за приступ информацијама",
  contactText:
    "У складу са Законом о слободном приступу информацијама од јавног значаја, свако физичко и правно лице може поднети захтев за приступ информацијама. Захтев се подноси писмено или усмено.",
  contactPerson: "Проф. др Небојша Тасић",
  contactPhone: "011 360 1669",
  contactEmail: "informator@ikvbd.rs",
  contactAddress: "Хероја Милана Тепића 1, 11040 Београд",
};

async function getInformator(): Promise<InformatorData> {
  try {
    const data = await client.fetch<InformatorPageData | null>(INFORMATOR_QUERY);
    if (data && data.sections && data.sections.length > 0) {
      return {
        heroHeading: data.heroHeading || FALLBACK.heroHeading,
        heroParagraphs: data.heroText ? data.heroText.split("\n\n") : FALLBACK.heroParagraphs,
        publishDate: data.publishDate || FALLBACK.publishDate,
        updatedDate: data.updatedDate || FALLBACK.updatedDate,
        pdfUrl: data.pdfUrl || FALLBACK.pdfUrl,
        sections: data.sections.map((s) => ({
          icon: s.icon || "fas fa-file-alt",
          title: s.title,
          description: s.description || "",
        })),
        contactHeading: data.contactHeading || FALLBACK.contactHeading,
        contactText: data.contactText || FALLBACK.contactText,
        contactPerson: data.contactPerson || FALLBACK.contactPerson,
        contactPhone: data.contactPhone || FALLBACK.contactPhone,
        contactEmail: data.contactEmail || FALLBACK.contactEmail,
        contactAddress: data.contactAddress || FALLBACK.contactAddress,
      };
    }
  } catch (error) {
    console.error("Error fetching informator:", error);
  }
  return FALLBACK;
}

export default async function InformatorPage() {
  const data = await getInformator();
  return <InformatorClient data={data} />;
}
