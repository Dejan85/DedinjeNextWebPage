import { ClinicPageTemplate } from "../_components/ClinicPageTemplate";
import type { ClinicPageData } from "../_components/ClinicPageTemplate";

const DATA: ClinicPageData = {
  breadcrumbLabel: "Аптека и медицинско снабдевање",
  title: "Аптека и медицинско снабдевање",
  subtitle: "Снабдевање лековима, медицинским средствима и потрошним материјалом за потребе института",
  introIcon: "fas fa-pills",
  introTitle: "О аптеци",
  introText: "Болничка аптека ИКВБ Дедиње обезбеђује континуирано снабдевање свих клиника и одељења неопходним лековима, медицинским средствима и потрошним материјалом. Фармацеутски тим контролише квалитет, рокове трајања и правилно складиштење, а пружа и стручне информације о лековима здравственим радницима и пацијентима.",
  areas: [
    { icon: "fas fa-pills", title: "Снабдевање лековима", desc: "Обезбеђивање свих потребних лекова за болничко лечење" },
    { icon: "fas fa-kit-medical", title: "Медицинска средства", desc: "Хируршки материјал, импланти и потрошни материјал" },
    { icon: "fas fa-clipboard-check", title: "Контрола квалитета", desc: "Праћење рокова, услова складиштења и фармаковигиланца" },
    { icon: "fas fa-circle-info", title: "Фармацеутске информације", desc: "Стручни савети о лековима, интеракцијама и дозирању" },
  ],
};

export default function AptekaPage() {
  return <ClinicPageTemplate data={DATA} />;
}
