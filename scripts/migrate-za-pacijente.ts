import { createClient } from "@sanity/client";
import dotenv from "dotenv";

import { DATA as ambulante } from "../app/[locale]/za-pacijente/ambulante/data";
import { DATA as cestaPitanja } from "../app/[locale]/za-pacijente/cesta-pitanja/data";
import { DATA as elektrofizioloskeProcedure } from "../app/[locale]/za-pacijente/elektrofizioloske-procedure/data";
import { DATA as elektrostimulativneProcedure } from "../app/[locale]/za-pacijente/elektrostimulativne-procedure/data";
import { DATA as informacijeOStanju } from "../app/[locale]/za-pacijente/informacije-o-stanju/data";
import { DATA as kardiohirurskiKonzilijum } from "../app/[locale]/za-pacijente/kardiohirurski-konzilijum/data";
import { DATA as kardiologija } from "../app/[locale]/za-pacijente/kardiologija/data";
import { DATA as planIshrane } from "../app/[locale]/za-pacijente/plan-ishrane/data";
import { DATA as preoperativnaPriprema } from "../app/[locale]/za-pacijente/preoperativna-priprema/data";
import { DATA as prijem } from "../app/[locale]/za-pacijente/prijem/data";
import { DATA as vaskularnaHirurgija } from "../app/[locale]/za-pacijente/vaskularna-hirurgija/data";
import { DATA as vaskularniKonzilijum } from "../app/[locale]/za-pacijente/vaskularni-konzilijum/data";

import type { PatientPage } from "../sanity/types";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: "haygvfxq",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Slug prati stvarnu rutu; kardiologija/vaskularna-hirurgija imaju "-za-pacijente"
// sufiks da se razlikuju od istoimenih clinicPage dokumenata (drugi _type, ali isti slug
// bi i dalje bio zbunjujuć u Studio pretrazi).
const PAGES: { slug: string; data: PatientPage }[] = [
  { slug: "ambulante", data: ambulante },
  { slug: "cesta-pitanja", data: cestaPitanja },
  { slug: "elektrofizioloske-procedure", data: elektrofizioloskeProcedure },
  { slug: "elektrostimulativne-procedure", data: elektrostimulativneProcedure },
  { slug: "informacije-o-stanju", data: informacijeOStanju },
  { slug: "kardiohirurski-konzilijum", data: kardiohirurskiKonzilijum },
  { slug: "kardiologija-za-pacijente", data: kardiologija },
  { slug: "plan-ishrane", data: planIshrane },
  { slug: "preoperativna-priprema", data: preoperativnaPriprema },
  { slug: "prijem", data: prijem },
  { slug: "vaskularna-hirurgija-za-pacijente", data: vaskularnaHirurgija },
  { slug: "vaskularni-konzilijum", data: vaskularniKonzilijum },
];

async function migrateZaPacijente() {
  console.log("\n🩺 МИГРАЦИЈА „ЗА ПАЦИЈЕНТЕ” (page)");
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

  console.log("\n✨ Миграција свих „За пацијенте” страница завршена!\n");
}

migrateZaPacijente();
