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

interface LocaleString {
  _type: "localeString";
  sr: string;
  en: string;
}

function t(sr: string, en: string): LocaleString {
  return { _type: "localeString", sr, en };
}

// `infoBox.title`/`description`/`linkText` su u šemi `localeString`, ali
// `scripts/migrate-all.ts` ih je od početka pisao kao obične stringove
// (nikad ažurirano posle i18n šema migracije) — `localize()` helper zato
// nema šta da lokalizuje pa `/en` prikazuje isti ćirilični tekst kao `sr`.
// Otkriveno 2026-08-12 (vlasnik sajta prijavio da su kartice ispod hero-a
// i dalje na srpskom na `/en`, iako je navigacija bila ispravna).
const PATCH: Record<string, { title: LocaleString; description?: LocaleString; linkText?: LocaleString }> = {
  "infobox-1": {
    title: t("Информације за пацијенте", "Patient Information"),
    description: t(
      "Све информације о пријему, припреми и боравку у Институту на једном месту.",
      "All the information about admission, preparation, and your stay at the Institute in one place.",
    ),
    linkText: t("Све информације", "All Information"),
  },
  "infobox-2": {
    title: t("Наше клинике", "Our Clinics"),
    description: t(
      "Упознајте се са свим клиникама и услугама које наш институт нуди пацијентима.",
      "Explore all the clinics and services our institute offers patients.",
    ),
    linkText: t("Погледај клинике", "View Clinics"),
  },
  "infobox-3": {
    title: t("Наш тим", "Our Team"),
    description: t(
      "Упознајте наше лекаре специјалисте и стручњаке који брину о вашем здрављу.",
      "Meet our specialist physicians and experts who take care of your health.",
    ),
    linkText: t("Упознајте тим", "Meet the Team"),
  },
  "infobox-4": {
    title: t("Контакт", "Contact"),
  },
};

async function migrateHomepageInfoboxesEnUpdate() {
  console.log("\n🇬🇧 PREVOD Info Box kartica (homepage) na engleski\n");
  console.log("═══════════════════════════════════════════════\n");

  const homepage = await client.getDocument("homepage");
  if (!homepage) {
    console.error("❌ Homepage dokument (_id: homepage) ne postoji. Pokreni prvo: npm run migrate:all");
    return;
  }

  const pageBuilder: Array<{ _type: string; _key?: string }> = homepage.pageBuilder || [];
  const patchSet: Record<string, unknown> = {};

  for (const block of pageBuilder) {
    if (block._type !== "infoBox" || !block._key) continue;
    const fields = PATCH[block._key];
    if (!fields) continue;
    for (const [field, value] of Object.entries(fields)) {
      patchSet[`pageBuilder[_key=="${block._key}"].${field}`] = value;
    }
  }

  if (Object.keys(patchSet).length === 0) {
    console.error("❌ Nijedan infoBox _key iz PATCH mape nije pronađen u pageBuilder-u — proveri _key vrednosti.");
    return;
  }

  await client.patch("homepage").set(patchSet).commit();

  console.log(`✅ Ažurirano ${Object.keys(patchSet).length} polja na ${Object.keys(PATCH).length} info kutije — /en sad prikazuje engleski tekst.\n`);
}

migrateHomepageInfoboxesEnUpdate().catch((error) => {
  console.error("\n❌ GREŠKA PRI MIGRACIJI:\n");
  console.error(error);
  console.log("\n💡 Pokušaj ponovo sa: npm run migrate:homepage-infoboxes-en-update\n");
});
