import { createClient } from "@sanity/client";
import dotenv from "dotenv";

// Učitaj .env.local
dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: "haygvfxq",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function migrateSiteSettings() {
  try {
    console.log("🚀 Migracija Site Settings...\n");

    const siteSettings = {
      _type: "siteSettings",
      _id: "siteSettings",
      siteName: "Институт за кардиоваскуларне болести Дедиње",
      siteDescription:
        "Водећа здравствена установа у региону специјализована за дијагностику, лечење и рехабилитацију кардиоваскуларних обољења.",
      contact: {
        phone1: "011 3601 668",
        phone2: "011 3601 669",
        emergencyPhone: "011 3601 600",
        email: "info@ikvbd.rs",
        address: "Хероја Милана Тепића 1",
        city: "Београд",
        zipCode: "11040",
      },
      workingHours: [
        {
          days: "Пон - Пет",
          hours: "08:00 - 19:00",
        },
        {
          days: "Субота",
          hours: "09:00 - 17:00",
        },
        {
          days: "Недеља",
          hours: "09:00 - 15:00",
        },
      ],
      socialLinks: {
        facebook: "#",
        instagram: "#",
        linkedin: "#",
        twitter: "#",
        youtube: "#",
      },
      seo: {
        metaTitle: "Институт Дедиње - Кардиоваскуларне болести",
        metaDescription:
          "Институт за кардиоваскуларне болести Дедиње је водећа здравствена установа у региону",
        metaKeywords: [
          "кардиологија",
          "кардиохирургија",
          "институт дедиње",
          "срце",
          "васкуларна хирургија",
        ],
      },
    };

    const result = await client.createOrReplace(siteSettings);
    console.log("✅ Site Settings kreirani uspešno!");
    console.log(`📄 Document ID: ${result._id}\n`);

    console.log("📋 Kreirano:");
    console.log(`  • Kontakt: ${siteSettings.contact.phone1}`);
    console.log(`  • Email: ${siteSettings.contact.email}`);
    console.log(`  • Adresa: ${siteSettings.contact.address}`);
    console.log(`  • Radno vreme: ${siteSettings.workingHours.length} perioda`);

    console.log("\n🎉 Migracija završena!");
  } catch (error) {
    console.error("❌ Greška pri migraciji:", error);
  }
}

migrateSiteSettings();
