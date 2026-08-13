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

// Tri sitne ispravke prijavljene anotiranim screenshotom vlasnika sajta (2026-08-13):
// 1. Welcome sekcija: "65 година искуства" -> "50 година искуства" (stats sekcija
//    već ispravno prikazuje 50 - ovaj tekst je zaostao neusklađen).
// 2. "Наше клинике" grid: kartica "Васкуларна хирургија" dobija precizniji podnaslov.
// 3. "Наш тим": akademsko zvanje ispred imena dr Унић Стојановић i dr Добрић ажурирано на "Доц. др".
async function migrateHomepageContentFixes() {
  console.log("\n🔧 SITNE ISPRAVKE HOMEPAGE SADRŽAJA (welcome/klinike/tim)\n");
  console.log("═══════════════════════════════════════════════\n");

  const homepage = await client.getDocument("homepage");
  if (!homepage) {
    console.error("❌ Homepage dokument (_id: homepage) ne postoji. Pokreni prvo: npm run migrate:all");
    return;
  }

  const pageBuilder: Array<{
    _type: string;
    _key?: string;
    bodyText?: { sr?: string; en?: string };
    items?: Array<{ _key?: string; desc?: { sr?: string; en?: string } }>;
    team?: Array<{ _key?: string; name?: string }>;
  }> = homepage.pageBuilder || [];

  const patchSet: Record<string, unknown> = {};

  // 1. Welcome bodyText
  const welcome = pageBuilder.find((b) => b._type === "welcomeSection");
  if (welcome?._key && welcome.bodyText) {
    patchSet[`pageBuilder[_key=="${welcome._key}"].bodyText.sr`] = welcome.bodyText.sr?.replace(
      "Са више од 65 година искуства",
      "Са више од 50 година искуства"
    );
    patchSet[`pageBuilder[_key=="${welcome._key}"].bodyText.en`] = welcome.bodyText.en?.replace(
      "With more than 65 years of experience",
      "With more than 50 years of experience"
    );
  } else {
    console.error("❌ Blok welcomeSection nije pronađen.");
  }

  // 2. Клиника "Васкуларна хирургија" opis
  const clinics = pageBuilder.find((b) => b._type === "clinicsFeaturedSection");
  const clinic2 = clinics?.items?.find((i) => i._key === "clinic-2");
  if (clinics?._key && clinic2) {
    patchSet[`pageBuilder[_key=="${clinics._key}"].items[_key=="clinic-2"].desc`] = {
      _type: "localeString",
      sr: "Васкуларна и ендоваскуларна хирургија",
      en: "Vascular and Endovascular Surgery",
    };
  } else {
    console.error("❌ Klinika 'clinic-2' (Vaskularna hirurgija) nije pronađena.");
  }

  // 3. Akademska zvanja u "Наш тим"
  const team = pageBuilder.find((b) => b._type === "teamSection");
  const unicStojanovic = team?.team?.find((m) => m._key === "team-member-2");
  const dobric = team?.team?.find((m) => m._key === "team-member-3");
  if (team?._key && unicStojanovic) {
    patchSet[`pageBuilder[_key=="${team._key}"].team[_key=="team-member-2"].name`] =
      "Доц. др сци. мед. Драгана Унић Стојановић";
  } else {
    console.error("❌ Član tima 'team-member-2' (Unić Stojanović) nije pronađen.");
  }
  if (team?._key && dobric) {
    patchSet[`pageBuilder[_key=="${team._key}"].team[_key=="team-member-3"].name`] = "Доц. др Милан Добрић";
  } else {
    console.error("❌ Član tima 'team-member-3' (Dobrić) nije pronađen.");
  }

  if (Object.keys(patchSet).length === 0) {
    console.error("❌ Ništa za izmenu — svi blokovi nedostaju.");
    return;
  }

  await client.patch("homepage").set(patchSet).commit();

  console.log(`✅ Ažurirano ${Object.keys(patchSet).length} polja.\n`);
}

migrateHomepageContentFixes().catch((error) => {
  console.error("\n❌ GREŠKA PRI MIGRACIJI:\n");
  console.error(error);
  console.log("\n💡 Pokušaj ponovo sa: npm run migrate:homepage-content-fixes\n");
});
