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
      instituteName: "НАЦИОНАЛНИ ИНСТИТУТ",
      instituteSubtitle: "За срце и крвне судове „Дедиње“",
      description:
        "Национални институт за срце и крвне судове „Дедиње” је водећа здравствена установа у региону специјализована за дијагностику и лечење болести срца и крвних судова.",
      socialLinks: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        linkedin: "#",
        youtube: "#",
      },
      locations: [
        {
          _key: "dedinje-1",
          title: { _type: "localeString", sr: "ДЕДИЊЕ 1", en: "DEDINJE 1" },
          mapEmbedUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2832.5!2d20.4565!3d44.7733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7009d2b5e8d3%3A0x5f8e8b6f7c6d3e0!2z0JjQvdGB0YLQuNGC0YPRgiDQt9CwINC60LDRgNC00LjQvtCy0LDRgdC60YPQu9Cw0YDQvdC1INCx0L7Qu9C10YHRgtC4INCU0LXQtNC40ZrQtQ!5e0!3m2!1ssr!2srs!4v1700000000000!5m2!1ssr!2srs",
          address: "Хероја Милана Тепића бр. 1",
          city: "11040 Београд, Србија",
        },
        {
          _key: "dedinje-2",
          title: { _type: "localeString", sr: "ДЕДИЊЕ 2", en: "DEDINJE 2" },
          mapEmbedUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2832.5!2d20.4565!3d44.7733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7009d2b5e8d3%3A0x5f8e8b6f7c6d3e0!2z0JjQvdGB0YLQuNGC0YPRgiDQt9CwINC60LDRgNC00LjQvtCy0LDRgdC60YPQu9Cw0YDQvdC1INCx0L7Qu9C10YHRgtC4INCU0LXQtNC40ZrQtQ!5e0!3m2!1ssr!2srs!4v1700000000000!5m2!1ssr!2srs",
          address: "Хероја Милана Тепића бр. 1",
          city: "11040 Београд, Србија",
        },
        {
          _key: "dedinje-3",
          title: { _type: "localeString", sr: "ДЕДИЊЕ 3", en: "DEDINJE 3" },
          mapEmbedUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2832.5!2d20.4565!3d44.7733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7009d2b5e8d3%3A0x5f8e8b6f7c6d3e0!2z0JjQvdGB0YLQuNGC0YPRgiDQt9CwINC60LDRgNC00LjQvtCy0LDRgdC60YPQu9Cw0YDQvdC1INCx0L7Qu9C10YHRgtC4INCU0LXQtNC40ZrQtQ!5e0!3m2!1ssr!2srs!4v1700000000000!5m2!1ssr!2srs",
          address: "Сокобањска 17",
          city: "11040 Београд, Србија",
        },
      ],
      copyright:
        "© 2026 Национални институт за срце и крвне судове „Дедиње”. Сва права задржана.",
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
    console.log(`  📍 Lokacije: ${footer.locations.length}`);
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
