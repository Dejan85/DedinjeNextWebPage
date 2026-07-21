import { ClinicPageTemplate } from "../_components/ClinicPageTemplate";
import type { ClinicPageData } from "../_components/ClinicPageTemplate";
import { metadata } from "./metadata";

export { metadata };

const DATA: ClinicPageData = {
  breadcrumbLabel: "Одељење за неинвазивну дијагностику срца",
  title: "Одељење за неинвазивну дијагностику срца",
  subtitle: "Ехокардиографија и процена пацијената за структурне интервентне процедуре",
  introIcon: "fas fa-heart",
  introTitle: "О одељењу",
  introText: "Одељење спроводи процену и припрему пацијената за структурне интервентне процедуре, као и активно учешће у извођењу интервентних захвата без отварања грудног коша, укључујући нехируршко затварање урођених и стечених дефеката срца (ФОА, АСД, ВСД, ДАП), имплантацију оклудера леве аурикуле, транскатетерску имплантацију аортне валвуле (ТАВИ) и транскатетерску корекцију митралног залиска (MitraClip). Ехокардиографија има кључну улогу у процени подобности пацијената, планирању процедуре, интрапроцедуралном вођењу и постпроцедуралном праћењу болесника.",
  areas: [
    { icon: "fas fa-circle-half-stroke", title: "Затварање дефеката без операције", desc: "ФОА, АСД, ВСД и ДАП — нехируршко затварање урођених и стечених дефеката срца" },
    { icon: "fas fa-heart-circle-bolt", title: "Оклудер леве аурикуле", desc: "Имплантација оклудера ради превенције тромбоемболијских компликација" },
    { icon: "fas fa-heart-circle-plus", title: "ТАВИ", desc: "Транскатетерска имплантација аортне валвуле" },
    { icon: "fas fa-clone", title: "MitraClip", desc: "Транскатетерска корекција митралног залиска" },
  ],
};

export default function NeinvazivnaDijagnostikaSrcaPage() {
  return <ClinicPageTemplate data={DATA} />;
}
