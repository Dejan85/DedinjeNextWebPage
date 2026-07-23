import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: "haygvfxq",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const SECTIONS: Record<string, string[]> = {
  "za-pacijente": [
    "ambulante",
    "cesta-pitanja",
    "elektrofizioloske-procedure",
    "elektrostimulativne-procedure",
    "informacije-o-stanju",
    "kardiohirurski-konzilijum",
    "kardiologija-za-pacijente",
    "plan-ishrane",
    "preoperativna-priprema",
    "prijem",
    "vaskularna-hirurgija-za-pacijente",
    "vaskularni-konzilijum",
  ],
  edukacija: [
    "edukacija",
    "interna-edukacija",
    "kme-2024",
    "kme-medicinske-sestre-tehnicari",
    "kongresi",
    "medjunarodni-kongresi",
    "edukativni-programi",
    "radionice",
    "sestrinska-edukacija",
    "sestrinska-edukacija-istorijat",
    "sestrinska-edukacija-kpr-kurs",
    "sestrinska-edukacija-pripravnicki-staz",
    "sestrinska-edukacija-program-kratkih-studija",
  ],
  "nauka-istrazivanje": [
    "centar-izuzetnih-vrednosti",
    "saige-projekat",
    "nauka-istrazivanje-aktuelnosti",
    "lista-istrazivaca",
    "nio",
  ],
};

async function backfill() {
  let updated = 0;
  let missing = 0;

  for (const [section, slugs] of Object.entries(SECTIONS)) {
    for (const slug of slugs) {
      const id = `page-${slug}`;
      const exists = await client.fetch(`*[_type == "page" && _id == $id][0]._id`, { id });

      if (!exists) {
        console.warn(`⚠️  Nema dokumenta za slug "${slug}" (_id: ${id})`);
        missing++;
        continue;
      }

      await client.patch(id).set({ section }).commit();
      console.log(`✅ ${id} → section: ${section}`);
      updated++;
    }
  }

  // Homepage ("_id: homepage") je pinovan direktno u Studio meniju i ne
  // filtrira se po section-u, ali polje je required — mora dobiti vrednost.
  const homepage = await client.fetch(`*[_type == "page" && _id == "homepage"][0]._id`);
  if (homepage) {
    await client.patch("homepage").set({ section: "ostalo" }).commit();
    console.log(`✅ homepage → section: ostalo`);
    updated++;
  }

  console.log(`\nGotovo. Ažurirano: ${updated}, nedostaje: ${missing}.`);
}

backfill().catch((error) => {
  console.error("❌ Greška:", error);
  process.exit(1);
});
