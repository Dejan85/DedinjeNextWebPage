import { ClinicPageTemplate } from "../_components/ClinicPageTemplate";
import type { ClinicPageData } from "../_components/ClinicPageTemplate";
import { metadata } from "./metadata";

export { metadata };

const DATA: ClinicPageData = {
  breadcrumbLabel: "Физикална медицина и рехабилитација",
  title: "Физикална медицина и рехабилитација",
  subtitle: "Опоравак и рехабилитација пацијената након кардиохируршких и васкуларних интервенција",
  introIcon: "fas fa-dumbbell",
  introTitle: "О одсеку",
  introText: "Одсек за физикалну медицину и рехабилитацију пружа свеобухватан програм опоравка за пацијенте након кардиохируршких и васкуларних процедура. Рана мобилизација, индивидуализирани програми вежби и физикална терапија значајно убрзавају опоравак, побољшавају функционални капацитет и квалитет живота пацијената.",
  areas: [
    { icon: "fas fa-person-walking", title: "Рана мобилизација", desc: "Покретање пацијената у првим данима после операције" },
    { icon: "fas fa-lungs", title: "Респираторна рехабилитација", desc: "Вежбе дисања и чишћење дисајних путева" },
    { icon: "fas fa-dumbbell", title: "Кинезитерапија", desc: "Индивидуални програми вежби за јачање и издржљивост" },
    { icon: "fas fa-house-chimney-medical", title: "Кућна рехабилитација", desc: "Упутства и програми за наставак опоравка код куће" },
  ],
};

export default function FizikalnaMedicinaPage() {
  return <ClinicPageTemplate data={DATA} />;
}
