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

const PARTNERS_SECTION_HEADING = {
  _type: "localeString",
  sr: "Акредитације Института",
  en: "Institute Accreditations",
};

const PARTNERS = [
  {
    _key: "partner-1",
    image: "/images/partners/ministarstvo-nauke.svg",
    name: { _type: "localeString", sr: "Научна акредитација", en: "Scientific Accreditation" },
    subtitle: {
      _type: "localeString",
      sr: "Одлука бр. 660-01-0007/2024-32",
      en: "Decision No. 660-01-0007/2024-32",
    },
  },
  {
    _key: "partner-2",
    image: "/images/partners/azus-akreditacija.jpg",
    name: { _type: "localeString", sr: "Здравствена акредитација", en: "Healthcare Accreditation" },
    subtitle: {
      _type: "localeString",
      sr: "Бр. Р-1-207-08/2026 · до јула 2033.",
      en: "No. Р-1-207-08/2026 · valid until July 2033",
    },
  },
];

async function migrateHomepagePartnersSectionUpdate() {
  console.log("\n🏅 AŽURIRANJE HOMEPAGE 'СЕРТИФИКАТИ И ПАРТНЕРСТВА' SEKCIJE (realna akreditacija)");
  console.log("═══════════════════════════════════════════════\n");

  const homepage = await client.getDocument("homepage");
  if (!homepage) {
    console.error("❌ Homepage dokument (_id: homepage) ne postoji. Pokreni prvo: npm run migrate:all");
    return;
  }

  const pageBuilder: Array<{ _type: string; _key?: string }> = homepage.pageBuilder || [];
  const block = pageBuilder.find((b) => b._type === "partnersSection");
  if (!block) {
    console.error("❌ Blok partnersSection ne postoji u pageBuilder-u.");
    return;
  }

  await client
    .patch("homepage")
    .set({
      [`pageBuilder[_key=="${block._key}"].heading`]: PARTNERS_SECTION_HEADING,
      [`pageBuilder[_key=="${block._key}"].partners`]: PARTNERS,
    })
    .commit();

  console.log("✅ Sekcija ažurirana realnim sadržajem!\n");
  console.log("   1. Научна акредитација — Министарство науке (660-01-0007/2024-32)");
  console.log("   2. Здравствена акредитација — АЗУС (Р-1-207-08/2026)\n");
}

migrateHomepagePartnersSectionUpdate().catch((error) => {
  console.error("\n❌ GREŠKA PRI MIGRACIJI:\n");
  console.error(error);
  console.log("\n💡 Pokušaj ponovo sa: npm run migrate:homepage-partners-section-update\n");
});
