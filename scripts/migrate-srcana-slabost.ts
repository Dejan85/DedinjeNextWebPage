import { createClient } from "@sanity/client";
import dotenv from "dotenv";

import { DATA as slabost } from "../app/[locale]/klinike/centar-srcana-slabost/data";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: "haygvfxq",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const ls = (sr: string) => ({ _type: "localeString", sr });
const lt = (sr: string) => ({ _type: "localeText", sr });
const key = (prefix: string, i: number) => `${prefix}-${i + 1}`;

const SLABOST_ID = "clinicPage-centar-srcana-slabost";
const KARDIOHIRURGIJA_ID = "clinicPage-kardiohirurgija";

// Patch (ne createOrReplace) — čuva slug/order i ostala polja. Izmenjena polja
// dobijaju samo SR; EN se dopunjuje kroz i18n:export-untranslated / apply.
async function migrate() {
  console.log("\n🫀 Centar za srčanu slabost — korigovan tekst + slike; Vuković uloga\n");
  const s = slabost;
  const p = s.proceduresList!;

  try {
    await client
      .patch(SLABOST_ID)
      .set({
        introTitle: ls(s.introTitle),
        introText: lt(s.introText),
        introParagraphs: (s.introParagraphs ?? []).map((t, i) => ({ ...lt(t), _key: key("intro", i) })),
        organizationalStructure: lt(s.organizationalStructure!),
        areas: [],
        proceduresList: {
          title: ls(p.title),
          items: p.items.map((t, i) => ({ ...ls(t), _key: key("item", i) })),
          detailedItems: (p.detailedItems ?? []).map((d, i) => ({
            _key: key("proc", i),
            title: ls(d.title),
            desc: lt(d.desc),
            photos: (d.photos ?? []).map((ph, pi) => ({
              _key: key("photo", pi),
              src: ph.src,
              caption: ls(ph.caption!),
            })),
          })),
        },
        patientInstructions: {
          title: ls(s.patientInstructions!.title),
          paragraphs: s.patientInstructions!.paragraphs.map((t, i) => ({ ...lt(t), _key: key("p", i) })),
        },
        enReviewed: false,
      })
      .unset(["areasTitle", "areasSubtitle", "areasIcon"])
      .commit();
    console.log(`✅ ${SLABOST_ID}`);

    const kh = await client.getDocument(KARDIOHIRURGIJA_ID);
    const groups = (kh?.staffList?.groups ?? []) as { members?: { _key: string; name: string }[] }[];
    let patched = 0;
    for (let g = 0; g < groups.length; g++) {
      for (const m of groups[g].members ?? []) {
        if (m.name === "Доц. др Петар Вуковић") {
          await client
            .patch(KARDIOHIRURGIJA_ID)
            .set({
              [`staffList.groups[${g}].members[_key=="${m._key}"].role`]: {
                _type: "localeString",
                sr: "Заменик управника Клинике за кардиохирургију и Начелник службе за срчану слабост",
                en: "Deputy Head of the Cardiac Surgery Clinic and Head of the Heart Failure Service",
              },
            })
            .commit();
          patched++;
        }
      }
    }
    console.log(`✅ ${KARDIOHIRURGIJA_ID} → uloga Petra Vukovića (${patched})`);
  } catch (error) {
    console.error("\n❌ GREŠKA PRI MIGRACIJI:\n", error);
    process.exit(1);
  }
}

migrate();
