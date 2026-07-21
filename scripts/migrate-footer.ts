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

async function migrateFooter() {
  console.log("\n🦶 MIGRACIJA FOOTER DOKUMENTA");
  console.log("═══════════════════════════════════════════════\n");

  try {
    const footer = {
      _type: "footer",
      _id: "footer",
      instituteName: "ДЕДИЊЕ",
      instituteSubtitle: "Институт за КВБ",
      description:
        "Институт за кардиоваскуларне болести Дедиње је водећа здравствена установа у региону специјализована за дијагностику и лечење болести срца и крвних судова.",
      socialLinks: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        linkedin: "#",
        youtube: "#",
      },
      quickLinks: {
        heading: "Брзи линкови",
        links: [
          {
            _key: "quick-1",
            title: "Реч директора",
            href: "/rec-direktora",
          },
          {
            _key: "quick-2",
            title: "Биографија",
            href: "/biografija",
          },
          {
            _key: "quick-3",
            title: "О нама",
            href: "/o-institutu",
          },
          {
            _key: "quick-4",
            title: "Услуге",
            href: "#services",
          },
          {
            _key: "quick-5",
            title: "Одељења",
            href: "#departments",
          },
          {
            _key: "quick-6",
            title: "Наш тим",
            href: "#team",
          },
          {
            _key: "quick-7",
            title: "Новости",
            href: "#news",
          },
          {
            _key: "quick-8",
            title: "Контакт",
            href: "#contact",
          },
        ],
      },
      services: {
        heading: "Услуге",
        links: [
          {
            _key: "service-1",
            title: "Кардиохирургија",
            href: "#",
          },
          {
            _key: "service-2",
            title: "Кардиологија",
            href: "#",
          },
          {
            _key: "service-3",
            title: "Васкуларна хирургија",
            href: "#",
          },
          {
            _key: "service-4",
            title: "Интервентна кардиологија",
            href: "#",
          },
          {
            _key: "service-5",
            title: "Рехабилитација",
            href: "#",
          },
          {
            _key: "service-6",
            title: "Дијагностика",
            href: "#",
          },
        ],
      },
      contact: {
        heading: "Контакт",
        address: "Хероја Милана Тепића 1",
        city: "11040 Београд, Србија",
        phone1: "011 3601 700",
        email: "info@ikvbd.com",
        workingHours: {
          weekdays: "Пон - Пет: 08:00 - 19:00",
          weekend: "Викенд: 09:00 - 15:00",
        },
      },
      copyright:
        "© 2026 Институт за кардиоваскуларне болести Дедиње. Сва права задржана.",
      legalLinks: [
        {
          _key: "legal-1",
          title: "Политика приватности",
          href: "#",
        },
        {
          _key: "legal-2",
          title: "Услови коришћења",
          href: "#",
        },
        {
          _key: "legal-3",
          title: "Карта сајта",
          href: "#",
        },
      ],
    };

    console.log("📝 Kreiranje Footer dokumenta...\n");
    const result = await client.createOrReplace(footer);

    console.log("✅ Footer dokument uspešno kreiran!");
    console.log("═══════════════════════════════════════════════\n");
    console.log("📊 Statistika:");
    console.log(`  📄 Document ID: ${result._id}`);
    console.log(`  🔗 Brzi linkovi: ${footer.quickLinks.links.length}`);
    console.log(`  💼 Usluge: ${footer.services.links.length}`);
    console.log(`  📜 Pravni linkovi: ${footer.legalLinks.length}`);
    console.log(`  🌐 Društvene mreže: 5\n`);

    console.log("═══════════════════════════════════════════════\n");
    console.log("✨ SLEDEĆI KORACI:\n");
    console.log("1. Restartuj Sanity Studio:");
    console.log("   - Pritisni Ctrl+C u terminalu gde radi sanity:dev");
    console.log("   - Pokreni: npm run sanity:dev\n");
    console.log("2. Otvori Sanity Studio:");
    console.log("   - http://localhost:3000/studio");
    console.log("   - Idi na Content → Footer\n");
    console.log("3. Proveri Footer na sajtu:");
    console.log("   - http://localhost:3000\n");
    console.log("═══════════════════════════════════════════════\n");
  } catch (error) {
    console.error("\n❌ GREŠKA PRI MIGRACIJI:\n");
    console.error(error);
    console.log("\n💡 Pokušaj ponovo sa: npm run migrate:footer\n");
  }
}

migrateFooter();
