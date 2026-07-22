import { createClient } from "@sanity/client";
import dotenv from "dotenv";

import { DATA as centarIzuzetnihVrednosti } from "../app/nauka-istrazivanje/centar-izuzetnih-vrednosti/data";
import { DATA as saigeProjekat } from "../app/nauka-istrazivanje/saige-projekat/data";
import { DATA as aktuelnosti } from "../app/nauka-istrazivanje/aktuelnosti/data";
import { DATA as listaIstrazivaca } from "../app/nauka-istrazivanje/lista-istrazivaca/data";
import { DATA as nio } from "../app/nauka-istrazivanje/nio/data";

import type { PatientPage } from "../sanity/types";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: "haygvfxq",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const PAGES: { slug: string; data: PatientPage }[] = [
  { slug: "centar-izuzetnih-vrednosti", data: centarIzuzetnihVrednosti },
  { slug: "saige-projekat", data: saigeProjekat },
  { slug: "nauka-istrazivanje-aktuelnosti", data: aktuelnosti },
  { slug: "lista-istrazivaca", data: listaIstrazivaca },
  { slug: "nio", data: nio },
];

async function migrateNaukaIstrazivanje() {
  console.log("\n🔬 МИГРАЦИЈА „НАУКА И ИСТРАЖИВАЊЕ” (page)");
  console.log("═══════════════════════════════════════════════\n");

  for (const { slug, data } of PAGES) {
    const doc = {
      _type: "page",
      _id: `page-${slug}`,
      slug: { _type: "slug", current: slug },
      title: data.title,
      subtitle: data.subtitle,
      pageBuilder: data.pageBuilder,
      publishedAt: new Date().toISOString(),
    };

    try {
      const result = await client.createOrReplace(doc);
      console.log(`✅ ${slug} → ${result._id}`);
    } catch (error) {
      console.error(`❌ ${slug} — грешка приликом миграције:`, error);
      process.exit(1);
    }
  }

  console.log("\n✅ Миграција завршена.\n");
}

migrateNaukaIstrazivanje();
