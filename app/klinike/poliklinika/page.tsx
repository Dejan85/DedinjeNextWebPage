import { ClinicPageTemplate } from "../_components/ClinicPageTemplate";
import type { ClinicPageData } from "../_components/ClinicPageTemplate";
import { metadata } from "./metadata";

export { metadata };

const DATA: ClinicPageData = {
  breadcrumbLabel: "Поликлиника Института",
  title: "Поликлиника Института",
  subtitle: "Амбулантни прегледи, дијагностика и специјалистичке консултације без хоспитализације",
  introIcon: "fas fa-hospital",
  introTitle: "О поликлиници",
  introText: "Поликлиника Института Дедиње обезбеђује широк спектар амбулантних здравствених услуга. Пацијенти могу обавити специјалистичке прегледе, дијагностичке процедуре и контроле без потребе за болничким лечењем. Организована је тако да обезбеди ефикасан проток пацијената и кратко време чекања.",
  areas: [
    { icon: "fas fa-stethoscope", title: "Специјалистички прегледи", desc: "Кардиолошки, васкуларни и кардиохируршки амбулантни прегледи" },
    { icon: "fas fa-file-medical", title: "Дијагностика", desc: "ЕКГ, ехокардиографија, доплер и друге неинвазивне методе" },
    { icon: "fas fa-calendar-check", title: "Контролни прегледи", desc: "Редовно праћење стања пацијената после интервенција" },
    { icon: "fas fa-clipboard-list", title: "Конзилијарни прегледи", desc: "Процена индикација за хируршко или интервентно лечење" },
  ],
};

export default function PoliklinikPage() {
  return <ClinicPageTemplate data={DATA} />;
}
