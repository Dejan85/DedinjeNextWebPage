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

// `event.title` je ispravno `localeString` (za razliku od infoBox/clinics
// buga), samo `en` nikad nije popunjen otkad je 4 demo/najavljena
// događaja seed-ovano skriptom `migrate-events.ts` — homepage "Предстојећи
// догађаји" vidžet je zato na `/en` prikazivao ćirilične naslove. Samo 4
// dokumenta, prevod bezbedno uraditi ovde umesto čekanja na punu i18n
// review pipeline.
const TITLES_EN: Record<string, string> = {
  "event-godisnji-kongres-instituta":
    "Annual Congress of the National Institute for Heart and Blood Vessels „Dedinje”",
  "event-kongres-kardiovaskularne-prevencije":
    "Congress of Cardiovascular Prevention (HISPA)",
  "event-skola-ehokardiografije-novi-ciklus":
    "School of Echocardiography — new cycle of the basic course",
  "event-sretenjska-radionica-vaskularne-hirurgije":
    "Sretenje Workshop on the Latest Technologies in Vascular Surgery",
};

async function migrateEventsEnUpdate() {
  console.log("\n🇬🇧 PREVOD naziva događaja (homepage 'Предстојећи догађаји') na engleski\n");
  console.log("═══════════════════════════════════════════════\n");

  let updated = 0;
  for (const [id, en] of Object.entries(TITLES_EN)) {
    const doc = await client.getDocument(id);
    if (!doc) {
      console.error(`❌ Dokument ${id} ne postoji — preskačem.`);
      continue;
    }
    await client.patch(id).set({ "title.en": en }).commit();
    console.log(`✅ ${id} → "${en}"`);
    updated += 1;
  }

  console.log(`\n✅ Gotovo — ${updated}/${Object.keys(TITLES_EN).length} događaja dobilo engleski naslov.\n`);
}

migrateEventsEnUpdate().catch((error) => {
  console.error("\n❌ GREŠKA PRI MIGRACIJI:\n");
  console.error(error);
  console.log("\n💡 Pokušaj ponovo sa: npm run migrate:events-en-update\n");
});
