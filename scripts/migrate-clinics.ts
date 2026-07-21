import { createClient } from "@sanity/client";
import dotenv from "dotenv";

import { DATA as anesteziologija } from "../app/klinike/anesteziologija/data";
import { DATA as apteka } from "../app/klinike/apteka/data";
import { DATA as centarSrcanaSlabost } from "../app/klinike/centar-srcana-slabost/data";
import { DATA as cusmo } from "../app/klinike/cusmo/data";
import { DATA as edukacijaPrevencija } from "../app/klinike/edukacija-prevencija/data";
import { DATA as elektrofiziologija } from "../app/klinike/elektrofiziologija/data";
import { DATA as fizikalnaMedicina } from "../app/klinike/fizikalna-medicina/data";
import { DATA as invazivnaDijagnostika } from "../app/klinike/invazivna-dijagnostika/data";
import { DATA as kardiologija } from "../app/klinike/kardiologija/data";
import { DATA as kardiovaskularnaRehabilitacija } from "../app/klinike/kardiovaskularna-rehabilitacija/data";
import { DATA as klinickaPatologija } from "../app/klinike/klinicka-patologija/data";
import { DATA as kvDijagnostika } from "../app/klinike/kv-dijagnostika/data";
import { DATA as laboratorija } from "../app/klinike/laboratorija/data";
import { DATA as neinvazivnaDijagnostikaSrca } from "../app/klinike/neinvazivna-dijagnostika-srca/data";
import { DATA as neurokardioloskaLaboratorija } from "../app/klinike/neurokardioloska-laboratorija/data";
import { DATA as poliklinika } from "../app/klinike/poliklinika/data";
import { DATA as telemedicina } from "../app/klinike/telemedicina/data";
import { DATA as transfuzija } from "../app/klinike/transfuzija/data";
import { DATA as vaskularnaHirurgija } from "../app/klinike/vaskularna-hirurgija/data";

import type { ClinicPageData } from "../app/klinike/_components/ClinicPageTemplate";

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
