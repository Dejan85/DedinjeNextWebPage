import { ClinicPageTemplate } from "../_components/ClinicPageTemplate";
import type { ClinicPageData } from "../_components/ClinicPageTemplate";
import { metadata } from "./metadata";

export { metadata };

const DATA: ClinicPageData = {
  breadcrumbLabel: "Клиника за кардиологију",
  title: "Клиника за кардиологију",
  subtitle: "Комплетна неинвазивна и инвазивна дијагностика и лечење срчаних обољења",
  introIcon: "fas fa-heart",
  introTitle: "О клиници",
  introText: "Клиника за кардиологију пружа свеобухватну дијагностику и лечење кардиоваскуларних обољења. Од неинвазивних прегледа, преко фармаколошке терапије, до припреме пацијената за инвазивне и хируршке процедуре — наш тим кардиолога обезбеђује индивидуални приступ сваком пацијенту уз примену најновијих смерница и протокола.",
  areas: [
    { icon: "fas fa-wave-square", title: "Неинвазивна дијагностика", desc: "ЕКГ, ехокардиографија, стрес тестови и холтер мониторинг" },
    { icon: "fas fa-pills", title: "Фармакотерапија", desc: "Оптимизација медикаментозне терапије по савременим протоколима" },
    { icon: "fas fa-bed-pulse", title: "Хоспитално лечење", desc: "Збрињавање акутних кардиолошких стања и стабилизација" },
    { icon: "fas fa-chart-line", title: "Превенција", desc: "Процена кардиоваскуларног ризика и превентивне мере" },
  ],
};

export default function KardiologijaPage() {
  return <ClinicPageTemplate data={DATA} />;
}
