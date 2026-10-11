import { createClient } from "@sanity/client";
import dotenv from "dotenv";

import { DATA as d } from "../app/[locale]/klinike/kardiohirurgija/data";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: "haygvfxq",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const ID = "clinicPage-kardiohirurgija";
const key = (prefix: string, i: number) => `${prefix}-${i + 1}`;

// Patch (ne createOrReplace) — dodaje samo proceduresList sa detaljnim opisima
// (docs za ubacivanje/06). EN se dopunjuje kroz i18n:export-untranslated / apply.
async function migrate() {
  console.log("\n🫀 Kardiohirurgija — detaljni opisi procedura\n");
  const p = d.proceduresList!;
  await client
    .patch(ID)
    .set({
      proceduresList: {
        title: { _type: "localeString", sr: p.title },
        items: p.items.map((t, i) => ({ _type: "localeString", _key: key("item", i), sr: t })),
        detailedItems: (p.detailedItems ?? []).map((x, i) => ({
          _key: key("proc", i),
          title: { _type: "localeString", sr: x.title },
          desc: { _type: "localeText", sr: x.desc },
        })),
      },
      enReviewed: false,
    })
    .commit();
  console.log(`✅ ${ID} — ${p.detailedItems?.length} procedura`);
}

migrate().catch((e) => {
  console.error(e);
  process.exit(1);
});
