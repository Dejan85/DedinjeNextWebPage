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

// `clinicFeaturedItem.title`/`desc` su u šemi `localeString`
// (sanity/schemas/objects/clinicsFeaturedSection.ts), ali
// `scripts/migrate-homepage-clinics-update.ts` ih je pisao kao obične
// stringove — isti obrazac buga kao infoBox kartice (vidi
// migrate-homepage-infoboxes-en-update.ts). `heading`/`subheading` na
// istoj sekciji SU ispravno lokalizovani (tu skriptu nije diralo), samo
// pojedinačne stavke u `items[]` nisu. Otkriveno 2026-08-12 (vlasnik
// sajta poslao screenshot "Наше клинике" grida i dalje na ćirilici na
// `/en`, uz naslov/podnaslov sekcije ispravno na engleskom).
const PATCH: Record<string, { title: LocaleString; desc: LocaleString }> = {
  "clinic-1": { title: t("Кардиохирургија", "Cardiac Surgery"), desc: t("Оперативно лечење срчаних обољења", "Surgical treatment of heart conditions") },
  "clinic-2": { title: t("Васкуларна хирургија", "Vascular Surgery"), desc: t("Лечење крвних судова", "Treatment of blood vessels") },
  "clinic-3": { title: t("Кардиологија", "Cardiology"), desc: t("Дијагностика и лечење срца", "Diagnosis and treatment of the heart") },
  "clinic-4": { title: t("Анестезиологија", "Anesthesiology"), desc: t("Анестезија и интензивно лечење", "Anesthesia and intensive care") },
  "clinic-7": { title: t("Радиологија", "Radiology"), desc: t("Кардиоваскуларна компјутеризована дијагностика", "Cardiovascular computed diagnostics") },
  "clinic-9": { title: t("Поликлиника", "Outpatient Clinic"), desc: t("Амбулантне здравствене услуге", "Outpatient healthcare services") },
  "clinic-11": { title: t("Апотека", "Pharmacy"), desc: t("Лекови и медицинско снабдевање", "Medicines and medical supplies") },
  "clinic-12": { title: t("Лабораторијска дијагностика", "Laboratory Diagnostics"), desc: t("Лабораторијске анализе", "Laboratory analyses") },
  "clinic-13": { title: t("Банка крви", "Blood Bank"), desc: t("Одељење за трансфузију", "Transfusion department") },
};

async function migrateHomepageClinicsEnUpdate() {
  console.log("\n🇬🇧 PREVOD „Наше клинике” kartica (homepage) na engleski\n");
  console.log("═══════════════════════════════════════════════\n");

  const homepage = await client.getDocument("homepage");
  if (!homepage) {
    console.error("❌ Homepage dokument (_id: homepage) ne postoji. Pokreni prvo: npm run migrate:all");
    return;
  }

  const pageBuilder: Array<{ _type: string; _key?: string; items?: Array<{ _key?: string }> }> =
    homepage.pageBuilder || [];
  const block = pageBuilder.find((b) => b._type === "clinicsFeaturedSection");
  if (!block) {
    console.error("❌ Blok clinicsFeaturedSection ne postoji u pageBuilder-u.");
    return;
  }

  const patchSet: Record<string, unknown> = {};
  for (const item of block.items || []) {
    if (!item._key) continue;
    const fields = PATCH[item._key];
    if (!fields) continue;
    patchSet[`pageBuilder[_key=="${block._key}"].items[_key=="${item._key}"].title`] = fields.title;
    patchSet[`pageBuilder[_key=="${block._key}"].items[_key=="${item._key}"].desc`] = fields.desc;
  }

  if (Object.keys(patchSet).length === 0) {
    console.error("❌ Nijedan clinic _key iz PATCH mape nije pronađen u items[] — proveri _key vrednosti.");
    return;
  }

  await client.patch("homepage").set(patchSet).commit();

  console.log(`✅ Ažurirano ${Object.keys(patchSet).length} polja na ${Object.keys(PATCH).length} klinike — /en sad prikazuje engleski tekst.\n`);
}

migrateHomepageClinicsEnUpdate().catch((error) => {
  console.error("\n❌ GREŠKA PRI MIGRACIJI:\n");
  console.error(error);
  console.log("\n💡 Pokušaj ponovo sa: npm run migrate:homepage-clinics-en-update\n");
});
