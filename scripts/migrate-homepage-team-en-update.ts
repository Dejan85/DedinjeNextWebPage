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

// `migrate-homepage-team-update.ts` je 2026-08-05 upisao 4 prava lekara sa
// `role.en`/`description.en` namerno praznim ("") — engleski prevod nikad
// nije dopisan, pa `localize()` korektno pada nazad na srpski (`sr`) tekst
// i "Naš tim" sekcija prikazuje ćirilicu na `/en`. Ovaj patch dopisuje
// nedostajuće `en` vrednosti (vidi `_key` iz `teamSection.team[]`).
const TEAM_EN: Record<string, { role: string; description: string }> = {
  "team-member-1": {
    role: "Radiologist",
    description:
      'Radiology specialist at the National Institute for Cardiovascular Diseases "Dedinje".',
  },
  "team-member-2": {
    role: "Anesthesiologist with Reanimatology",
    description:
      'Anesthesiology and reanimatology specialist at the National Institute for Cardiovascular Diseases "Dedinje".',
  },
  "team-member-3": {
    role: "Interventional Cardiologist",
    description:
      'Interventional cardiology specialist at the National Institute for Cardiovascular Diseases "Dedinje".',
  },
  "team-member-4": {
    role: "Cardiac Surgeon",
    description:
      'Cardiac surgeon at the National Institute for Cardiovascular Diseases "Dedinje", specialized in minimally invasive and endoscopic cardiac surgery.',
  },
};

async function migrateHomepageTeamEnUpdate() {
  console.log('\n🇬🇧 PREVOD sekcije "Naš tim" (homepage) na engleski\n');
  console.log("═══════════════════════════════════════════════\n");

  const homepage = await client.getDocument("homepage");
  if (!homepage) {
    console.error("❌ Homepage dokument (_id: homepage) ne postoji. Pokreni prvo: npm run migrate:all");
    return;
  }

  const pageBuilder: Array<{ _type: string; _key?: string; team?: Array<{ _key: string }> }> =
    homepage.pageBuilder || [];
  const block = pageBuilder.find((b) => b._type === "teamSection");
  if (!block?.team) {
    console.error("❌ Blok teamSection (sa `team` nizom) ne postoji u pageBuilder-u.");
    return;
  }

  const patchSet: Record<string, unknown> = {};
  for (const member of block.team) {
    const en = TEAM_EN[member._key];
    if (!en) continue;
    patchSet[`pageBuilder[_key=="${block._key}"].team[_key=="${member._key}"].role.en`] = en.role;
    patchSet[`pageBuilder[_key=="${block._key}"].team[_key=="${member._key}"].description.en`] =
      en.description;
  }

  if (Object.keys(patchSet).length === 0) {
    console.error("❌ Nijedan team-member _key iz TEAM_EN mape nije pronađen u pageBuilder-u — proveri _key vrednosti.");
    return;
  }

  await client.patch("homepage").set(patchSet).commit();

  console.log(`✅ Ažurirano ${Object.keys(patchSet).length} polja na ${Object.keys(TEAM_EN).length} člana tima — /en sad prikazuje engleski tekst.\n`);
}

migrateHomepageTeamEnUpdate().catch((error) => {
  console.error("\n❌ GREŠKA PRI MIGRACIJI:\n");
  console.error(error);
  console.log("\n💡 Pokušaj ponovo sa: npm run migrate:homepage-team-en-update\n");
});
