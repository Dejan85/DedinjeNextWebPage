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

const LABELS_EN: Record<string, string> = {
  "stat-1": "PROCEDURES PER YEAR",
  "stat-2": "SPECIALIST PHYSICIANS",
  "stat-3": "YEARS OF EXPERIENCE",
  "stat-4": "VISITS PER YEAR",
};

async function migrateHomepageStatsEnUpdate() {
  console.log("\n🇬🇧 PREVOD stats.label polja na engleski (homepage statsSection)");
  console.log("═══════════════════════════════════════════════\n");

  const homepage = await client.getDocument("homepage");
  if (!homepage) {
    console.error("❌ Homepage dokument (_id: homepage) ne postoji. Pokreni prvo: npm run migrate:all");
    return;
  }

  const pageBuilder: Array<{ _type: string; _key?: string }> = homepage.pageBuilder || [];
  const block = pageBuilder.find((b) => b._type === "statsSection");
  if (!block) {
    console.error("❌ Blok statsSection ne postoji u pageBuilder-u.");
    return;
  }

  const patch = client.patch("homepage");
  for (const [statKey, en] of Object.entries(LABELS_EN)) {
    patch.set({
      [`pageBuilder[_key=="${block._key}"].stats[_key=="${statKey}"].label.en`]: en,
    });
  }
  await patch.commit();

  console.log("✅ stats.label.en popunjen za sve 4 stavke — /en sad prikazuje pravi prevod umesto SR fallback-a.\n");
}

migrateHomepageStatsEnUpdate().catch((error) => {
  console.error("\n❌ GREŠKA PRI MIGRACIJI:\n");
  console.error(error);
  console.log("\n💡 Pokušaj ponovo sa: npm run migrate:homepage-stats-en-update\n");
});
