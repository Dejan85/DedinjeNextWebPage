import { ClinicPageTemplate } from "../_components/ClinicPageTemplate";
import type { ClinicPageData } from "../_components/ClinicPageTemplate";
import { metadata } from "./metadata";

export { metadata };

const DATA: ClinicPageData = {
  breadcrumbLabel: "Лабораторијска дијагностика",
  title: "Лабораторијска дијагностика",
  subtitle: "Биохемијске, хематолошке и коагулационе анализе за потребе дијагностике и лечења",
  introIcon: "fas fa-flask",
  introTitle: "О лабораторији",
  introText: "Лабораторија за клиничку дијагностику обезбеђује комплетан спектар биохемијских, хематолошких и коагулационих анализа неопходних за дијагностику, праћење лечења и постоперативну контролу пацијената. Савремена аутоматизована опрема омогућава брзе и прецизне резултате, а тим лабораторијских стручњака гарантује поузданост налаза.",
  areas: [
    { icon: "fas fa-vials", title: "Биохемија", desc: "Анализе крви, електролита, ензима и метаболита" },
    { icon: "fas fa-droplet", title: "Хематологија", desc: "Комплетна крвна слика и диференцијална анализа" },
    { icon: "fas fa-clock", title: "Коагулација", desc: "Тестови згрушавања крви и контрола антикоагулантне терапије" },
    { icon: "fas fa-bolt", title: "Хитне анализе", desc: "Резултати у најкраћем року за ургентне случајеве" },
  ],
  extraBanner: { value: "24/7", label: "Хитна лабораторија", desc: "Непрекидна доступност за ургентне анализе" },
};

export default function LaboratorijaPage() {
  return <ClinicPageTemplate data={DATA} />;
}
