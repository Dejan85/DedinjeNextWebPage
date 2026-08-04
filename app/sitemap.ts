import type { MetadataRoute } from "next";
import { createClient } from "@sanity/client";

// Potrebno za `output: "export"` (build:static) — bez ovoga, korišćenje
// `new Date()` u lastModified čini rutu "dinamičkom" što export ne dozvoljava.
export const dynamic = "force-static";

const BASE_URL = "https://www.institutdedinje.rs";

// Odvojen, keširan (useCdn: true, bez custom fetch opcija) klijent — namerno
// NE koristi sanity/lib/client.ts (koji ima `cache: "no-store"`), jer bi to
// prisililo dinamičko renderovanje ove rute i sudaralo se sa `force-static`.
const sitemapClient = createClient({
  projectId: "haygvfxq",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const STATIC_ROUTES = [
  "/",
  "/rec-direktora",
  "/o-institutu",
  "/biografija",
  "/bibliografija",
  "/kontakt",
  "/nas-tim",

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

  "/za-pacijente",
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

// Dva `page` dokumenta u sekciji za-pacijente imaju Sanity slug različit od
// URL segmenta (namerno, da izbegnu koliziju sa istoimenim `clinicPage`
// slug-om — vidi TASKS.md sekcija 2). Sitemap URL "kardiologija" mora da se
// mapira na stvarni Sanity slug pre provere `enReviewed`.
const ZA_PACIJENTE_SLUG_OVERRIDES: Record<string, string> = {
  kardiologija: "kardiologija-za-pacijente",
  "vaskularna-hirurgija": "vaskularna-hirurgija-za-pacijente",
};

// Faza 3d (i18n): sadržaj klinika i za-pacijente stranica je AI-preveden ali
// još nije ljudski pregledan (`enReviewed` polje u Sanity-ju, uređuje se u
// Studio-u). Dok pojedinačna stranica nije potvrđena, njena /en/* varijanta
// se izostavlja iz sitemap-a (ne indeksira se) — SR varijanta ostaje
// nepromenjena. Ostale sekcije (o nama, edukacija, nauka, aktuelnosti) nisu
// klinički osetljive na isti način, pa ostaju u sitemap-u bez ovog gate-a.
async function getUnreviewedSlugs(): Promise<{ klinike: Set<string>; zaPacijente: Set<string> }> {
  const [clinics, pages] = await Promise.all([
    sitemapClient.fetch<Array<{ slug: string | null; enReviewed?: boolean }>>(
      `*[_type == "clinicPage" && defined(slug.current)]{ "slug": slug.current, enReviewed }`
    ),
    sitemapClient.fetch<Array<{ slug: string | null; enReviewed?: boolean }>>(
      `*[_type == "page" && section == "za-pacijente" && defined(slug.current)]{ "slug": slug.current, enReviewed }`
    ),
  ]);
  return {
    klinike: new Set(clinics.filter((c) => !c.enReviewed && c.slug).map((c) => c.slug!)),
    zaPacijente: new Set(pages.filter((p) => !p.enReviewed && p.slug).map((p) => p.slug!)),
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Ako Sanity fetch ne uspe, ne blokiramo ceo sitemap — samo ne gate-ujemo
  // (konzervativno: uključi sve, isti fallback-princip kao ostatak sajta).
  const unreviewed = await getUnreviewedSlugs().catch(() => ({
    klinike: new Set<string>(),
    zaPacijente: new Set<string>(),
  }));

  // SR (podrazumevani jezik) ostaje bez prefiksa, EN ide pod /en — vidi
  // i18n/routing.ts (localePrefix: "as-needed").
  return STATIC_ROUTES.flatMap((route) => {
    const entry = (url: string): MetadataRoute.Sitemap[number] => ({
      url,
      lastModified: new Date(),
      changeFrequency: route === "/" ? "daily" : "weekly",
      priority: route === "/" ? 1 : 0.7,
    });

    const entries: MetadataRoute.Sitemap = [entry(`${BASE_URL}${route}`)];

    const klinikeSlug = route.match(/^\/klinike\/([^/]+)$/)?.[1];
    const zaPacijenteRouteSlug = route.match(/^\/za-pacijente\/([^/]+)$/)?.[1];
    const zaPacijenteSlug = zaPacijenteRouteSlug
      ? (ZA_PACIJENTE_SLUG_OVERRIDES[zaPacijenteRouteSlug] ?? zaPacijenteRouteSlug)
      : undefined;
    const gated =
      (klinikeSlug && unreviewed.klinike.has(klinikeSlug)) ||
      (zaPacijenteSlug && unreviewed.zaPacijente.has(zaPacijenteSlug));

    if (!gated) {
      const enPath = route === "/" ? "/en" : `/en${route}`;
      entries.push(entry(`${BASE_URL}${enPath}`));
    }

    return entries;
  });
}
