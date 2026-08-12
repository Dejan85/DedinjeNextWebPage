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

const STATS = [
  {
    key: "stat-1",
    icon: "fas fa-heartbeat",
    number: "19,000+",
    label: "ПРОЦЕДУРА ГОДИШЊЕ",
    labelEn: "PROCEDURES PER YEAR",
  },
  {
    key: "stat-2",
    icon: "fas fa-user-md",
    number: "200+",
    label: "ЛЕКАРА СПЕЦИЈАЛИСТА",
    labelEn: "SPECIALIST PHYSICIANS",
  },
  {
    key: "stat-3",
    icon: "fas fa-award",
    number: "50",
    label: "ГОДИНА ИСКУСТВА",
    labelEn: "YEARS OF EXPERIENCE",
  },
  {
    key: "stat-4",
    icon: "fas fa-calendar-check",
    number: "146,000+",
    label: "ПОСЕТА ГОДИШЊЕ",
    labelEn: "VISITS PER YEAR",
  },
];

async function migrateHomepageStatsUpdate() {
  console.log("\n📊 AŽURIRANJE STATS SEKCIJE NA POČETNOJ (realne brojke)");
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

  const stats = STATS.map((stat) => ({
    _key: stat.key,
    icon: stat.icon,
    number: stat.number,
    label: { _type: "localeString", sr: stat.label, en: stat.labelEn },
  }));

  await client
    .patch("homepage")
    .set({ [`pageBuilder[_key=="${block._key}"].stats`]: stats })
    .commit();

  console.log("✅ Stats sekcija ažurirana realnim brojkama!\n");
  stats.forEach((s) => console.log(`  ${s.number} — ${s.label.sr}`));
  console.log("");
}

migrateHomepageStatsUpdate().catch((error) => {
  console.error("\n❌ GREŠKA PRI MIGRACIJI:\n");
  console.error(error);
  console.log("\n💡 Pokušaj ponovo sa: npm run migrate:homepage-stats-update\n");
});
