import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import { execSync } from "node:child_process";

import { DATA as aktuelnosti } from "../app/[locale]/nauka-istrazivanje/aktuelnosti/data";
import { DATA as nio } from "../app/[locale]/nauka-istrazivanje/nio/data";
import { DATA as saigeProjekat } from "../app/[locale]/nauka-istrazivanje/saige-projekat/data";
import { HUB_DATA, SUB_DATA, LAB_SLUGS } from "../app/[locale]/nauka-istrazivanje/3d-laboratorija/data";

import type { PatientPage } from "../sanity/types";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: "haygvfxq",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Reorganizacija Nauke (2026-10-11, email Miljenka i Dragiše): CIV i lista istraživača
// ulaze u NIO, CardioView3D LAB postaje „3D laboratorija” sa 3 podstranice, SAIGE
// dobija novu strukturu. Skripta piše PLAIN stringove (kao ostale migrate-* skripte)
// i na kraju poziva migrate:i18n-schema --type=page koji ih pretvara u {sr,en}.
const PAGES: { slug: string; data: PatientPage }[] = [
  { slug: "nauka-istrazivanje-aktuelnosti", data: aktuelnosti },
  { slug: "saige-projekat", data: saigeProjekat },
  { slug: "nio", data: nio },
  { slug: "3d-laboratorija", data: HUB_DATA },
  ...LAB_SLUGS.map((s) => ({ slug: `3d-laboratorija-${s}`, data: SUB_DATA[s] as PatientPage })),
];

// Dokumenti čiji je sadržaj preseljen (ili preimenovan) — brišu se.
const OBSOLETE_IDS = ["page-centar-izuzetnih-vrednosti", "page-lista-istrazivaca", "page-cardioview3d-lab"];

async function main() {
  console.log("\n🔬 МИГРАЦИЈА „НАУКА И ИСТРАЖИВАЊЕ” (page) — реорганизација 2026-10-11\n");

  for (const { slug, data } of PAGES) {
    if (slug === "nauka-istrazivanje-aktuelnosti") continue; // nije menjano
    await client.createOrReplace({
      _type: "page",
      _id: `page-${slug}`,
      slug: { _type: "slug", current: slug },
      title: data.title,
      subtitle: data.subtitle,
      section: "nauka-istrazivanje",
      pageBuilder: data.pageBuilder,
      publishedAt: new Date().toISOString(),
    });
    console.log(`✅ ${slug} → page-${slug}`);
  }

  for (const id of OBSOLETE_IDS) {
    await client.delete(id);
    console.log(`🗑️  obrisan ${id}`);
  }

  console.log("\n🌐 pretvaranje plain stringova u {sr,en} (migrate:i18n-schema --type=page)…");
  execSync("npx tsx scripts/migrate-i18n-schema.ts --type=page", { stdio: "inherit" });
  console.log("\n✅ Завршено. Следеће: i18n:export-untranslated --type=page + i18n:apply-translations.\n");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
