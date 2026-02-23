import { ClinicPageTemplate } from "../_components/ClinicPageTemplate";
import type { ClinicPageData } from "../_components/ClinicPageTemplate";

const DATA: ClinicPageData = {
  breadcrumbLabel: "Телемедицина",
  title: "Телемедицина",
  subtitle: "Здравствене услуге на даљину — консултације, контроле и мониторинг без доласка у институт",
  introIcon: "fas fa-laptop-medical",
  introTitle: "О телемедицини",
  introText: "Служба за телемедицину ИКВБ Дедиње омогућава пацијентима приступ специјалистичким консултацијама и контролним прегледима путем видео-позива и дигиталних платформи. Ова услуга је посебно значајна за пацијенте из удаљених крајева, за постоперативно праћење и за брзу размену налаза и мишљења између лекара.",
  areas: [
    { icon: "fas fa-video", title: "Видео консултације", desc: "Специјалистички прегледи путем видео-позива у реалном времену" },
    { icon: "fas fa-file-arrow-up", title: "Дигитални налази", desc: "Слање и пријем налаза, извештаја и медицинске документације" },
    { icon: "fas fa-chart-line", title: "Даљински мониторинг", desc: "Праћење виталних параметара и уређаја на даљину" },
    { icon: "fas fa-comments", title: "Секундарно мишљење", desc: "Консултације између лекара за сложене случајеве" },
  ],
};

export default function TelemedicinaPage() {
  return <ClinicPageTemplate data={DATA} />;
}
