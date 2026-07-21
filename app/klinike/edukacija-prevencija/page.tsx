import { ClinicPageTemplate } from "../_components/ClinicPageTemplate";
import type { ClinicPageData } from "../_components/ClinicPageTemplate";
import { metadata } from "./metadata";

export { metadata };

const DATA: ClinicPageData = {
  breadcrumbLabel: "Едукација и превенција КВ болести",
  title: "Едукација и превенција кардиоваскуларних болести",
  subtitle: "Програми едукације здравствених радника и превентивне активности за смањење кардиоваскуларног ризика",
  introIcon: "fas fa-graduation-cap",
  introTitle: "О одсеку",
  introText: "Одсек за едукацију и превенцију кардиоваскуларних болести спроводи програме континуиране медицинске едукације за здравствене раднике и организује превентивне активности усмерене ка општој популацији. Циљ је подизање свести о факторима ризика, промоција здравих животних навика и унапређење знања и вештина медицинског кадра.",
  areas: [
    { icon: "fas fa-chalkboard-user", title: "КМЕ програми", desc: "Акредитовани програми континуиране медицинске едукације" },
    { icon: "fas fa-heart-circle-exclamation", title: "Превенција", desc: "Програми за идентификацију и смањење кардиоваскуларних ризика" },
    { icon: "fas fa-people-group", title: "Јавне кампање", desc: "Едукативне акције и предавања за ширу јавност" },
    { icon: "fas fa-book-open-reader", title: "Научна истраживања", desc: "Учешће у клиничким студијама и истраживачким пројектима" },
  ],
};

export default function EdukacijaPrevencijaPage() {
  return <ClinicPageTemplate data={DATA} />;
}
