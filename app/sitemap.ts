import type { MetadataRoute } from "next";

// Potrebno za `output: "export"` (build:static) — bez ovoga, korišćenje
// `new Date()` u lastModified čini rutu "dinamičkom" što export ne dozvoljava.
export const dynamic = "force-static";

const BASE_URL = "https://www.institutdedinje.rs";

const STATIC_ROUTES = [
  "/",
  "/rec-direktora",
  "/o-institutu",
  "/biografija",
  "/bibliografija",
  "/kontakt",

  "/o-nama/lokacija",
  "/o-nama/nemedicinski-poslovi",
  "/o-nama/odbori-i-organi-instituta",
  "/o-nama/zdravstvena-akreditacija",

  "/klinike",
  "/klinike/anesteziologija",
  "/klinike/apteka",
  "/klinike/centar-srcana-slabost",
  "/klinike/edukacija-prevencija",
  "/klinike/fizikalna-medicina",
  "/klinike/invazivna-dijagnostika",
  "/klinike/kardiohirurgija",
  "/klinike/kardiologija",
  "/klinike/klinicka-patologija",
  "/klinike/kv-dijagnostika",
  "/klinike/laboratorija",
  "/klinike/poliklinika",
  "/klinike/telemedicina",
  "/klinike/transfuzija",
  "/klinike/vaskularna-hirurgija",

  "/za-pacijente/ambulante",
  "/za-pacijente/cesta-pitanja",
  "/za-pacijente/elektrofizioloske-procedure",
  "/za-pacijente/elektrostimulativne-procedure",
  "/za-pacijente/informacije-o-stanju",
  "/za-pacijente/kardiohirurski-konzilijum",
  "/za-pacijente/kardiologija",
  "/za-pacijente/plan-ishrane",
  "/za-pacijente/prijem",
  "/za-pacijente/vaskularna-hirurgija",
  "/za-pacijente/vaskularni-konzilijum",

  "/nauka-istrazivanje/aktuelnosti",
  "/nauka-istrazivanje/cardioview3d-lab/workshop",
  "/nauka-istrazivanje/centar-izuzetnih-vrednosti",
  "/nauka-istrazivanje/lista-istrazivaca",
  "/nauka-istrazivanje/nio",
  "/nauka-istrazivanje/saige-projekat",

  "/edukacija",
  "/edukacija/interna-edukacija",
  "/edukacija/kme-2024",
  "/edukacija/kme-2024/kme-medicinske-sestre-tehnicari",
  "/edukacija/kongresi",
  "/edukacija/medjunarodni-kongresi",
  "/edukacija/programi",
  "/edukacija/programi/skola-ehokardiografije-prof-dr-aleksandra-nikolic",
  "/edukacija/programi/skola-hipertenzije-i-redukcije-kardiovaskularnih-faktora-rizika",
  "/edukacija/programi/skola-vaskularnog-ultrazvuka",
  "/edukacija/radionice",

  "/aktuelnosti",
  "/aktuelnosti/vesti",
  "/aktuelnosti/casopis-dedinje",
  "/aktuelnosti/gostovanja",
  "/aktuelnosti/informator",
  "/aktuelnosti/obavestenja",
  "/aktuelnosti/oglasi-konkursi",
];

export default function sitemap(): MetadataRoute.Sitemap {
  // SR (podrazumevani jezik) ostaje bez prefiksa, EN ide pod /en — vidi
  // i18n/routing.ts (localePrefix: "as-needed").
  return STATIC_ROUTES.flatMap((route) => {
    const entry = (url: string): MetadataRoute.Sitemap[number] => ({
      url,
      lastModified: new Date(),
      changeFrequency: route === "/" ? "daily" : "weekly",
      priority: route === "/" ? 1 : 0.7,
    });
    const enPath = route === "/" ? "/en" : `/en${route}`;
    return [entry(`${BASE_URL}${route}`), entry(`${BASE_URL}${enPath}`)];
  });
}
