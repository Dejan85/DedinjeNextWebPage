import { ClinicPageTemplate } from "../_components/ClinicPageTemplate";
import type { ClinicPageData } from "../_components/ClinicPageTemplate";

const DATA: ClinicPageData = {
  breadcrumbLabel: "Центар за срчану слабост",
  title: "Центар за срчану слабост",
  subtitle: "Комплексно лечење срчане слабости — од медикаментозне терапије до механичке потпоре и трансплантације",
  introIcon: "fas fa-heart-circle-check",
  introTitle: "О центру",
  introText: "Центар за срчану слабост ИКВБ Дедиње пружа свеобухватан приступ лечењу пацијената са тешком срчаном слабошћу. Мултидисциплинарни тим кардиолога, кардиохирурга и специјализованих медицинских сестара обезбеђује најсавременије методе лечења, укључујући оптимизацију медикаментозне терапије, ресинхронизациону терапију, механичку потпору циркулације и припрему за трансплантацију срца.",
  areas: [
    { icon: "fas fa-pills", title: "Медикаментозна терапија", desc: "Оптимизација лекова по најновијим смерницама за лечење срчане слабости" },
    { icon: "fas fa-gear", title: "Механичка потпора", desc: "VAD системи и ECMO за пацијенте са терминалном срчаном слабошћу" },
    { icon: "fas fa-heart-circle-bolt", title: "Ресинхронизација", desc: "CRT уређаји за побољшање координације срчаних комора" },
    { icon: "fas fa-user-doctor", title: "Мултидисциплинарни тим", desc: "Заједнички рад кардиолога, хирурга и специјалиста за срчану слабост" },
  ],
};

export default function CentarSrcanaSlabostPage() {
  return <ClinicPageTemplate data={DATA} />;
}
