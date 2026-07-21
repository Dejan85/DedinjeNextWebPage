import { ClinicPageTemplate } from "../_components/ClinicPageTemplate";
import type { ClinicPageData } from "../_components/ClinicPageTemplate";
import { metadata } from "./metadata";

export { metadata };

const DATA: ClinicPageData = {
  breadcrumbLabel: "Клиника за васкуларну хирургију",
  title: "Клиника за васкуларну хирургију",
  subtitle: "Дијагностика и хируршко лечење обољења артерија и вена, уз савремене протоколе и мултидисциплинарни тим",
  introIcon: "fas fa-stethoscope",
  introTitle: "О клиници",
  introText: "Клиника за васкуларну хирургију пружа комплетну дијагностику и лечење обољења периферних крвних судова. Циљ је правовремено препознавање ризика, избор оптималне терапије и безбедан опоравак пацијента.",
  areas: [
    { icon: "fas fa-shield-heart", title: "Превенција и процена ризика", desc: "Правовремено препознавање фактора ризика за обољења периферних крвних судова" },
    { icon: "fas fa-x-ray", title: "Дијагностика и планирање", desc: "Савремена дијагностика и избор оптималне терапије за сваког пацијента" },
    { icon: "fas fa-syringe", title: "Хируршке процедуре", desc: "Класичне и ендоваскуларне интервенције на артеријама и венама" },
    { icon: "fas fa-person-walking", title: "Опоравак и праћење", desc: "Постоперативна нега, рехабилитација и континуирано праћење пацијента" },
  ],
  extraBanner: { value: "24/7", label: "Дежурство", desc: "Клиника обезбеђује непрекидно дежурство за хитне случајеве" },
};

export default function VaskularnaHirurgijaPage() {
  return <ClinicPageTemplate data={DATA} />;
}
