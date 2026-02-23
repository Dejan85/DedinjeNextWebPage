import { ClinicPageTemplate } from "../_components/ClinicPageTemplate";
import type { ClinicPageData } from "../_components/ClinicPageTemplate";

const DATA: ClinicPageData = {
  breadcrumbLabel: "КВ компјутеризована дијагностика",
  title: "Кардиоваскуларна компјутеризована дијагностика КВ КТ и КВ МР",
  subtitle: "Напредна визуализација срца и крвних судова компјутерском томографијом и магнетном резонанцом",
  introIcon: "fas fa-x-ray",
  introTitle: "О одсеку",
  introText: "Одсек за кардиоваскуларну компјутеризовану дијагностику користи најсавременије КТ и МР скенере за детаљну визуализацију срца, коронарних артерија, аорте и периферних крвних судова. Ове неинвазивне методе омогућавају прецизну дијагностику без потребе за катетеризацијом, а резултати се користе за планирање хируршких и интервентних процедура.",
  areas: [
    { icon: "fas fa-heart-circle-check", title: "КТ коронарографија", desc: "Неинвазивна визуализација коронарних артерија мултислајсним КТ скенером" },
    { icon: "fas fa-magnet", title: "Кардијални МР", desc: "Процена структуре и функције срца магнетном резонанцом" },
    { icon: "fas fa-circle-nodes", title: "КТ ангиографија аорте", desc: "Детаљна визуализација аорте и великих крвних судова" },
    { icon: "fas fa-brain", title: "3Д реконструкције", desc: "Тродимензионални прикази за прецизно планирање интервенција" },
  ],
};

export default function KVDijagnostikaPage() {
  return <ClinicPageTemplate data={DATA} />;
}
