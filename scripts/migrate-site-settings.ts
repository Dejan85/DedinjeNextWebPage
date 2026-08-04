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

async function migrateSiteSettings() {
  console.log("\n⚙️ MIGRACIJA SITE SETTINGS (singleton, nije ranije postojao)");
  console.log("═══════════════════════════════════════════════\n");

  const doc = {
    _type: "siteSettings",
    _id: "siteSettings",
    siteName: "Институт за кардиоваскуларне болести Дедиње",
    siteDescription:
      "Институт за кардиоваскуларне болести Дедиње је водећа здравствена установа у региону специјализована за дијагностику и лечење болести срца и крвних судова.",
    contact: {
      phone1: "011 3601 700",
      emergencyPhone: "194",
      email: "info@ikvbd.com",
      address: "Хероја Милана Тепића 1",
      city: "Београд",
      zipCode: "11040",
    },
    workingHours: [
      { _key: "wh-1", days: "Понедељак - Петак", hours: "07:00 - 20:00" },
    ],
  };

  try {
    const result = await client.createOrReplace(doc);
    console.log("✅ Site settings uspešno kreiran!");
    console.log(`📄 Document ID: ${result._id}\n`);
  } catch (error) {
    console.error("\n❌ GREŠKA PRI MIGRACIJI:\n");
    console.error(error);
    console.log("\n💡 Pokušaj ponovo sa: npm run migrate:site-settings\n");
  }
}

migrateSiteSettings();
