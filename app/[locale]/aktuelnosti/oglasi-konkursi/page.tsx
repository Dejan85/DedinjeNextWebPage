import { client } from "@/sanity/lib/client";
import { JOB_POSTINGS_QUERY } from "@/sanity/lib/queries";
import { localize, type Locale } from "@/sanity/lib/locale";
import type { JobPosting } from "@/sanity/types";
import OglasiKonkursiClient, { type OglasItem } from "./OglasiKonkursiClient";

const OGLASI_FALLBACK: OglasItem[] = [
  {
    id: "1",
    date: "10. фебруар 2026.",
    title: "Конкурс за пријем лекара специјалиста кардиологије",
    type: "Запошљавање",
    icon: "fas fa-user-md",
    text: "Институт за кардиоваскуларне болести Дедиње расписује конкурс за пријем лекара специјалиста кардиологије на неодређено време. Потребно радно искуство: минимум 3 године у области интервентне кардиологије.",
    active: true,
    deadline: "28. фебруар 2026.",
  },
  {
    id: "2",
    date: "05. фебруар 2026.",
    title: "Оглас за набавку медицинске опреме",
    type: "Јавна набавка",
    icon: "fas fa-file-invoice",
    text: "Институт Дедиње објављује јавни позив за набавку ехокардиографских апарата и пратеће опреме за потребе Одељења за неинвазивну дијагностику.",
    active: true,
    deadline: "05. март 2026.",
  },
  {
    id: "3",
    date: "01. фебруар 2026.",
    title: "Конкурс за перфузионисте",
    type: "Запошљавање",
    icon: "fas fa-user-md",
    text: "Расписује се конкурс за пријем два перфузиониста за рад у Одељењу перфузије. Услов: завршен медицински факултет и специјализација из перфузиологије или еквивалентна квалификација.",
    active: true,
    deadline: "20. фебруар 2026.",
  },
  {
    id: "4",
    date: "20. јануар 2026.",
    title: "Набавка санитетског материјала",
    type: "Јавна набавка",
    icon: "fas fa-file-invoice",
    text: "Јавни позив за набавку санитетског и потрошног материјала за потребе оперативног блока и одељења интензивне неге. Рок за подношење понуда: 15. фебруар 2026.",
    active: false,
    deadline: "15. фебруар 2026.",
  },
  {
    id: "5",
    date: "15. јануар 2026.",
    title: "Конкурс за медицинске сестре/техничаре",
    type: "Запошљавање",
    icon: "fas fa-user-nurse",
    text: "Расписује се конкурс за пријем медицинских сестара/техничара за рад на Одељењу интензивног лечења. Услов: завршена средња медицинска школа и положен стручни испит.",
    active: false,
  },
  {
    id: "6",
    date: "05. јануар 2026.",
    title: "Набавка ИТ опреме",
    type: "Јавна набавка",
    icon: "fas fa-file-invoice",
    text: "Институт Дедиње објављује јавни позив за набавку рачунарске опреме и серверске инфраструктуре за потребе дигитализације медицинске документације.",
    active: false,
  },
];

async function getOglasi(locale: Locale): Promise<OglasItem[]> {
  try {
    const itemsRaw = await client.fetch<JobPosting[]>(JOB_POSTINGS_QUERY);
    const items = itemsRaw ? localize(itemsRaw, locale) : itemsRaw;
    if (items && items.length > 0) {
      return items.map((o) => ({
        id: o._id,
        date: o.date || "",
        title: o.title,
        type: o.type || "",
        icon: o.icon || "fas fa-info-circle",
        text: o.text || "",
        active: o.active ?? true,
        deadline: o.deadline,
      }));
    }
  } catch (error) {
    console.error("Error fetching oglasi:", error);
  }
  return OGLASI_FALLBACK;
}

export default async function OglasiKonkursiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const items = await getOglasi(locale as Locale);
  return <OglasiKonkursiClient items={items} />;
}
