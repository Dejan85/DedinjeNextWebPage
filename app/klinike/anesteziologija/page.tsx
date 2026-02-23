import { ClinicPageTemplate } from "../_components/ClinicPageTemplate";
import type { ClinicPageData } from "../_components/ClinicPageTemplate";

const DATA: ClinicPageData = {
  breadcrumbLabel: "Клиника за анестезију и интензивно лечење",
  title: "Клиника за анестезију и интензивно лечење",
  subtitle: "Анестезија, интензивна нега и постоперативни мониторинг кардиохируршких и васкуларних пацијената",
  introIcon: "fas fa-syringe",
  introTitle: "О клиници",
  introText: "Клиника за анестезију и интензивно лечење обезбеђује безбедну анестезију током хируршких интервенција и комплетну постоперативну негу у јединици интензивног лечења. Тим анестезиолога и медицинских сестара пружа континуиран мониторинг виталних функција, управљање болом и стабилизацију пацијената након сложених кардиохируршких и васкуларних процедура.",
  areas: [
    { icon: "fas fa-mask-ventilator", title: "Општа анестезија", desc: "Примена савремених анестетика и техника за безбедан ток интервенције" },
    { icon: "fas fa-monitor-waveform", title: "Интензивна нега", desc: "24/7 мониторинг и збрињавање критично оболелих пацијената" },
    { icon: "fas fa-lungs", title: "Респираторна подршка", desc: "Механичка вентилација и управљање дисајним путевима" },
    { icon: "fas fa-heart-pulse", title: "Хемодинамски мониторинг", desc: "Континуирано праћење рада срца и циркулације" },
  ],
  extraBanner: { value: "24/7", label: "Интензивна нега", desc: "Непрекидан мониторинг и збрињавање пацијената" },
};

export default function AnesteziologijaPage() {
  return <ClinicPageTemplate data={DATA} />;
}
