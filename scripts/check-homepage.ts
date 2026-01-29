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

async function checkHomepage() {
  try {
    console.log("🔍 Proveravam šta je u Homepage dokumentu...\n");

    const homepage = await client.fetch(`
      *[_type == "page" && _id == "homepage"][0] {
        _id,
        title,
        pageBuilder[] {
          _type,
          title,
          heading,
          variant,
          icon
        }
      }
    `);

    console.log("📄 Homepage dokument:");
    console.log(JSON.stringify(homepage, null, 2));

    console.log("\n📊 Statistika:");
    console.log(
      `  • Ukupno elemenata u pageBuilder: ${homepage.pageBuilder?.length || 0}`,
    );

    const heroCount =
      homepage.pageBuilder?.filter((item: any) => item._type === "hero")
        .length || 0;
    const infoBoxCount =
      homepage.pageBuilder?.filter((item: any) => item._type === "infoBox")
        .length || 0;

    console.log(`  • Hero slides: ${heroCount}`);
    console.log(`  • Info Boxes: ${infoBoxCount}`);

    if (infoBoxCount === 0) {
      console.log("\n❌ Info Boxes nisu u bazi! Migracija nije uspela.");
    } else {
      console.log(
        "\n✅ Info Boxes SU u bazi! Problem je sa cache-om u Studio-u.",
      );
    }
  } catch (error) {
    console.error("❌ Greška:", error);
  }
}

checkHomepage();
