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

const BODY_TEXT_EN = [
  'With more than 65 years of experience and over 200 specialist physicians, the Institute Dedinje stands as a symbol of excellence in cardiovascular medicine. Our dedication to patients and continuous professional advancement make us the first choice for thousands of patients every year.',
  'For more than 45 years, our physicians and medical staff have been dedicated to the prevention, diagnosis, and treatment of cardiovascular and cerebrovascular diseases.',
  "Teamwork, the achievements of our experts, personalized treatment, state-of-the-art equipment, the application of new knowledge, record-breaking results, and decades of experience are the foundation of the outstanding outcomes and pioneering procedures that have saved and improved the lives of thousands of cardiovascular patients.",
  'The "Dedinje" Institute is an institution of exceptional potential, scientifically accredited, and has become a center of excellence in multiple fields — enabling this institution to perform and deliver everything that is done at the world\'s leading medical centers.',
  'Join us in the shared fight against the greatest threat to health in the Republic of Serbia and the region — cardiovascular disease.',
  'Your National Institute for Heart and Blood Vessels "Dedinje"',
].join("\n\n");

async function migrateHomepageWelcomeEnUpdate() {
  console.log("\n🇬🇧 PREVOD 'Добродошли' bodyText polja na engleski (homepage welcomeSection)");
  console.log("═══════════════════════════════════════════════\n");

  const homepage = await client.getDocument("homepage");
  if (!homepage) {
    console.error("❌ Homepage dokument (_id: homepage) ne postoji. Pokreni prvo: npm run migrate:all");
    return;
  }

  const pageBuilder: Array<{ _type: string; _key?: string }> = homepage.pageBuilder || [];
  const block = pageBuilder.find((b) => b._type === "welcomeSection");
  if (!block) {
    console.error("❌ Blok welcomeSection ne postoji u pageBuilder-u.");
    return;
  }

  await client
    .patch("homepage")
    .set({ [`pageBuilder[_key=="${block._key}"].bodyText.en`]: BODY_TEXT_EN })
    .commit();

  console.log("✅ bodyText.en popunjen — /en sad prikazuje pravi prevod umesto SR fallback-a.\n");
}

migrateHomepageWelcomeEnUpdate().catch((error) => {
  console.error("\n❌ GREŠKA PRI MIGRACIJI:\n");
  console.error(error);
  console.log("\n💡 Pokušaj ponovo sa: npm run migrate:homepage-welcome-en-update\n");
});
