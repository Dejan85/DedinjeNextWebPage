import { client } from "@/sanity/lib/client";
import { ANNOUNCEMENTS_QUERY } from "@/sanity/lib/queries";
import type { Announcement } from "@/sanity/types";
import ObavestenjaClient, { type ObavestenjeItem } from "./ObavestenjaClient";

const OBAVESTENJA_FALLBACK: ObavestenjeItem[] = [
  {
    id: "1",
    date: "15. фебруар 2026.",
    icon: "fas fa-clock",
    type: "Радно време",
    title: "Радно време за време празника",
    text: "Обавештавамо пацијенте да ће Институт Дедиње радити по измењеном распореду током предстојећих празника. Амбулантни прегледи неће се обављати, док ће ургентни пријем радити 24 часа.",
    important: true,
  },
  {
    id: "2",
    date: "01. фебруар 2026.",
    icon: "fas fa-heartbeat",
    type: "Опрема",
    title: "Нови апарати за дијагностику",
    text: "Институт Дедиње је набавио најсавременије апарате за ехокардиографску и васкуларну дијагностику, чиме се додатно унапређује квалитет прегледа и скраћује време чекања.",
    important: false,
  },
  {
    id: "3",
    date: "20. јануар 2026.",
    icon: "fas fa-graduation-cap",
    type: "Едукација",
    title: "Позив за едукативне програме",
    text: "Отворене су пријаве за нови циклус базичне школе ехокардиографије. Курс почиње у марту 2026. године. Заинтересовани кандидати могу се пријавити путем контакт форме на сајту.",
    important: false,
  },
  {
    id: "4",
    date: "10. јануар 2026.",
    icon: "fas fa-hospital",
    type: "Информација",
    title: "Нова амбуланта за васкуларну дијагностику",
    text: "Од 15. јануара 2026. године, Институт Дедиње отвара нову амбуланту за васкуларну ултразвучну дијагностику на другом спрату главне зграде. Заказивање путем телефона 011 360 1669.",
    important: false,
  },
  {
    id: "5",
    date: "28. децембар 2025.",
    icon: "fas fa-users",
    type: "Кадрови",
    title: "Нови специјалисти у тиму Института",
    text: "Институт Дедиње са задовољством најављује пријем три нова специјалиста кардиологије и два васкуларна хирурга који ће додатно ојачати стручни тим Института.",
    important: false,
  },
  {
    id: "6",
    date: "15. децембар 2025.",
    icon: "fas fa-calendar-check",
    type: "Информација",
    title: "Распоред амбулантних прегледа за јануар 2026.",
    text: "Објављујемо распоред амбулантних прегледа за јануар 2026. године. Прегледи се заказују путем телефона 011 360 1669, радним данима од 08:00 до 14:00.",
    important: false,
  },
  {
    id: "7",
    date: "01. децембар 2025.",
    icon: "fas fa-heartbeat",
    type: "Опрема",
    title: "Инсталиран нови МР скенер",
    text: "Институт Дедиње је инсталирао магнетну резонанцу најновије генерације за кардиолошку дијагностику. Апарат омогућава детаљнији приказ срчаних структура и прецизнију процену виталности миокарда.",
    important: false,
  },
];

async function getObavestenja(): Promise<ObavestenjeItem[]> {
  try {
    const items = await client.fetch<Announcement[]>(ANNOUNCEMENTS_QUERY);
    if (items && items.length > 0) {
      return items.map((o) => ({
        id: o._id,
        date: o.date || "",
        icon: o.icon || "fas fa-bullhorn",
        type: o.type || "",
        title: o.title,
        text: o.text || "",
        important: o.important || false,
      }));
    }
  } catch (error) {
    console.error("Error fetching obaveštenja:", error);
  }
  return OBAVESTENJA_FALLBACK;
}

export default async function ObavestenjaPage() {
  const items = await getObavestenja();
  return <ObavestenjaClient items={items} />;
}
