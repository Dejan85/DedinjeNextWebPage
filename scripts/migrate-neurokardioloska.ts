import { createClient } from "@sanity/client";
import dotenv from "dotenv";

import { DATA as d } from "../app/[locale]/klinike/neurokardioloska-laboratorija/data";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: "haygvfxq",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const ID = "clinicPage-neurokardioloska-laboratorija";
const key = (prefix: string, i: number) => `${prefix}-${i + 1}`;

// Patch (ne createOrReplace). Postojeći EN prevodi se čuvaju za SR tekstove koji
// se nisu promenili; novi/izmenjeni dobijaju samo SR i dopunjuju se kroz
// i18n:export-untranslated / i18n:apply-translations.
function collectEn(node: unknown, map: Map<string, string>) {
  if (Array.isArray(node)) return node.forEach((n) => collectEn(n, map));
  if (node && typeof node === "object") {
    const o = node as Record<string, unknown>;
    if (typeof o.sr === "string" && typeof o.en === "string" && o.en) map.set(o.sr, o.en);
    Object.values(o).forEach((v) => collectEn(v, map));
  }
}

async function main() {
  const doc = await client.getDocument(ID);
  if (!doc) throw new Error(`${ID} ne postoji`);
  const en = new Map<string, string>();
  collectEn(doc, en);

  const ls = (sr: string) => ({ _type: "localeString", sr, ...(en.has(sr) ? { en: en.get(sr) } : {}) });
  const lt = (sr: string) => ({ _type: "localeText", sr, ...(en.has(sr) ? { en: en.get(sr) } : {}) });

  await client
    .patch(ID)
    .set({
      introTitle: ls(d.introTitle),
      introText: lt(d.introText),
      introParagraphs: (d.introParagraphs ?? []).map((t, i) => ({ ...lt(t), _key: key("intro", i) })),
      proceduresList: {
        title: ls(d.proceduresList!.title),
        items: d.proceduresList!.items.map((t, i) => ({ ...ls(t), _key: key("item", i) })),
      },
      staffList: {
        title: ls(d.staffList!.title),
        groups: d.staffList!.groups.map((g, gi) => ({
          _key: key("group", gi),
          ...(g.heading ? { heading: ls(g.heading) } : {}),
          ...(g.names ? { names: g.names } : {}),
        })),
      },
      sections: (d.sections ?? []).map((sec, i) => ({
        _key: key("section", i),
        icon: sec.icon,
        title: ls(sec.title),
        paragraphs: sec.paragraphs.map((t, pi) => ({ ...lt(t), _key: key("p", pi) })),
      })),
      patientInstructions: {
        title: ls(d.patientInstructions!.title),
        paragraphs: d.patientInstructions!.paragraphs.map((t, i) => ({ ...lt(t), _key: key("p", i) })),
      },
      enReviewed: false,
    })
    .commit();
  console.log(`✅ ${ID} — ažuriran (sačuvano EN prevoda: ${en.size} SR stringova u mapi)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
