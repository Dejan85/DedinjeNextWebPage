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

const PARTNERS = {
  heading: { _type: "localeString", sr: "Акредитације Института", en: "Institute Accreditations" },
  items: [
    {
      _key: "partner-1",
      image: "/images/partners/ministarstvo-nauke.svg",
      text: { _type: "localeString", sr: "Научна акредитација", en: "Scientific Accreditation" },
      description: {
        _type: "localeText",
        sr: "Министарство науке, технолошког развоја и иновација доделило је Институту научну акредитацију Одлуком бр. 660-01-0007/2024-32 од 08.07.2025. године.",
        en: "The Ministry of Science, Technological Development and Innovation granted the Institute scientific accreditation by Decision No. 660-01-0007/2024-32 of July 8, 2025.",
      },
    },
    {
      _key: "partner-2",
      image: "/images/partners/azus-akreditacija.jpg",
      text: { _type: "localeString", sr: "Здравствена акредитација", en: "Healthcare Accreditation" },
      description: {
        _type: "localeText",
        sr: "Агенција за акредитацију здравствених установа Србије доделила је Институту акредитацију бр. Р-1-207-08/2026 — акредитовани до јула 2033. године.",
        en: "The Agency for Accreditation of Healthcare Institutions of Serbia granted the Institute accreditation No. Р-1-207-08/2026 — accredited until July 2033.",
      },
    },
  ],
};

async function migrateDirectorPartnersUpdate() {
  console.log("\n🏅 AŽURIRANJE SEKCIJE AKREDITACIJA (реч директора)");
  console.log("═══════════════════════════════════════════════\n");

  const directorPage = await client.getDocument("directorPage");
  if (!directorPage) {
    console.error("❌ Dokument directorPage ne postoji. Pokreni prvo: npm run migrate:director");
    return;
  }

  await client.patch("directorPage").set({ partners: PARTNERS }).commit();

  console.log("✅ Sekcija akreditacija ažurirana realnim sadržajem!\n");
  console.log("   1. Научна акредитација — Министарство науке (660-01-0007/2024-32)");
  console.log("   2. Здравствена акредитација — АЗУС (Р-1-207-08/2026)\n");
}

migrateDirectorPartnersUpdate().catch((error) => {
  console.error("\n❌ GREŠKA PRI MIGRACIJI:\n");
  console.error(error);
  console.log("\n💡 Pokušaj ponovo sa: npm run migrate:director-partners-update\n");
});
