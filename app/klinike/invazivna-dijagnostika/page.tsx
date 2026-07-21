import { ClinicPageTemplate } from "../_components/ClinicPageTemplate";
import type { ClinicPageData } from "../_components/ClinicPageTemplate";
import { metadata } from "./metadata";

export { metadata };

const DATA: ClinicPageData = {
  breadcrumbLabel: "Инвазивна и интервентна КВ дијагностика и терапија",
  title: "Инвазивна и интервентна кардиоваскуларна дијагностика и терапија",
  subtitle: "Катетеризација срца, коронарографија и перкутане интервенције за дијагностику и лечење кардиоваскуларних обољења",
  introIcon: "fas fa-heartbeat",
  introTitle: "О клиници",
  introText: "Клиника за инвазивну и интервентну кардиоваскуларну дијагностику и терапију спроводи процедуре катетеризације срца, коронарографије и перкутаних коронарних интервенција. Модерна опрема и искусан тим омогућавају прецизну дијагностику и минимално инвазивне терапијске процедуре за пацијенте са коронарном болешћу и другим кардиоваскуларним стањима.",
  areas: [
    { icon: "fas fa-x-ray", title: "Коронарографија", desc: "Визуализација коронарних артерија за прецизну дијагностику" },
    { icon: "fas fa-syringe", title: "Перкутане интервенције", desc: "Имплантација стентова и балон-дилатација коронарних артерија" },
    { icon: "fas fa-wave-square", title: "Електрофизиологија", desc: "Дијагностика и лечење поремећаја срчаног ритма" },
    { icon: "fas fa-arrows-rotate", title: "Структурне интервенције", desc: "Перкутане процедуре на залисцима и урођеним манама" },
  ],
};

export default function InvazivnaDijagnostikaPage() {
  return <ClinicPageTemplate data={DATA} />;
}
