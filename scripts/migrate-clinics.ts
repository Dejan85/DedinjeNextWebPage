import { createClient } from "@sanity/client";
import dotenv from "dotenv";

import { DATA as anesteziologija } from "../app/[locale]/klinike/anesteziologija/data";
import { DATA as apteka } from "../app/[locale]/klinike/apteka/data";
import { DATA as centarSrcanaSlabost } from "../app/[locale]/klinike/centar-srcana-slabost/data";
import { DATA as cusmo } from "../app/[locale]/klinike/cusmo/data";
import { DATA as edukacijaPrevencija } from "../app/[locale]/klinike/edukacija-prevencija/data";
import { DATA as elektrofiziologija } from "../app/[locale]/klinike/elektrofiziologija/data";
import { DATA as fizikalnaMedicina } from "../app/[locale]/klinike/fizikalna-medicina/data";
import { DATA as invazivnaDijagnostika } from "../app/[locale]/klinike/invazivna-dijagnostika/data";
import { DATA as kardiologija } from "../app/[locale]/klinike/kardiologija/data";
import { DATA as kardiovaskularnaRehabilitacija } from "../app/[locale]/klinike/kardiovaskularna-rehabilitacija/data";
import { DATA as klinickaPatologija } from "../app/[locale]/klinike/klinicka-patologija/data";
import { DATA as kvDijagnostika } from "../app/[locale]/klinike/kv-dijagnostika/data";
import { DATA as laboratorija } from "../app/[locale]/klinike/laboratorija/data";
import { DATA as neinvazivnaDijagnostikaSrca } from "../app/[locale]/klinike/neinvazivna-dijagnostika-srca/data";
import { DATA as neurokardioloskaLaboratorija } from "../app/[locale]/klinike/neurokardioloska-laboratorija/data";
import { DATA as poliklinika } from "../app/[locale]/klinike/poliklinika/data";
import { DATA as telemedicina } from "../app/[locale]/klinike/telemedicina/data";
import { DATA as transfuzija } from "../app/[locale]/klinike/transfuzija/data";
import { DATA as vaskularnaHirurgija } from "../app/[locale]/klinike/vaskularna-hirurgija/data";

import type { ClinicPageData } from "../app/[locale]/klinike/_components/ClinicPageTemplate";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: "haygvfxq",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Redosled prati postojeći /klinike hub (kardiohirurgija ostaje van ovog tipa — custom stranica)
const CLINICS: { slug: string; data: ClinicPageData }[] = [
  { slug: "vaskularna-hirurgija", data: vaskularnaHirurgija },
  { slug: "anesteziologija", data: anesteziologija },
  { slug: "invazivna-dijagnostika", data: invazivnaDijagnostika },
  { slug: "elektrofiziologija", data: elektrofiziologija },
  { slug: "neurokardioloska-laboratorija", data: neurokardioloskaLaboratorija },
  { slug: "cusmo", data: cusmo },
  { slug: "neinvazivna-dijagnostika-srca", data: neinvazivnaDijagnostikaSrca },
  { slug: "centar-srcana-slabost", data: centarSrcanaSlabost },
  { slug: "poliklinika", data: poliklinika },
  { slug: "klinicka-patologija", data: klinickaPatologija },
  { slug: "kardiologija", data: kardiologija },
  { slug: "kv-dijagnostika", data: kvDijagnostika },
  { slug: "telemedicina", data: telemedicina },
  { slug: "edukacija-prevencija", data: edukacijaPrevencija },
  { slug: "fizikalna-medicina", data: fizikalnaMedicina },
  { slug: "kardiovaskularna-rehabilitacija", data: kardiovaskularnaRehabilitacija },
  { slug: "apteka", data: apteka },
  { slug: "laboratorija", data: laboratorija },
  { slug: "transfuzija", data: transfuzija },
];

async function migrateClinics() {
  console.log("\n🏥 MIGRACIJA KLINIKA (clinicPage)");
  console.log("═══════════════════════════════════════════════\n");

  for (let i = 0; i < CLINICS.length; i++) {
    const { slug, data } = CLINICS[i];
    const doc = {
      _type: "clinicPage",
      _id: `clinicPage-${slug}`,
      slug: { _type: "slug", current: slug },
      order: i + 1,
      ...data,
    };

    try {
      const result = await client.createOrReplace(doc);
      console.log(`✅ ${slug} → ${result._id}`);
    } catch (error) {
      console.error(`❌ ${slug} — грешка приликом миграције:`, error);
      process.exit(1);
    }
  }

  console.log("\n✨ Миграција свих клиника завршена!\n");
}

migrateClinics();
