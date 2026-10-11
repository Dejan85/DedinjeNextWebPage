import { createClient } from "@sanity/client";
import dotenv from "dotenv";

import { DATA as s } from "../app/[locale]/klinike/centar-strukturne-bolesti-srca/data";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: "haygvfxq",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const ID = "clinicPage-centar-strukturne-bolesti-srca";
const key = (prefix: string, i: number) => `${prefix}-${i + 1}`;

// Patch (ne createOrReplace). Postojeći EN prevodi se čuvaju za SR tekstove koji
// se nisu promenili (sr→en mapa iz trenutnog dokumenta); novi/izmenjeni dobijaju
// samo SR i dopunjuju se kroz i18n:export-untranslated / i18n:apply-translations.
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

  const p = s.proceduresList!;
  await client
    .patch(ID)
    .set({
      introText: lt(s.introText),
      introParagraphs: (s.introParagraphs ?? []).map((t, i) => ({ ...lt(t), _key: key("intro", i) })),
      staffList: {
        title: ls(s.staffList!.title),
        groups: s.staffList!.groups.map((g, gi) => ({
          _key: key("group", gi),
          ...(g.heading ? { heading: ls(g.heading) } : {}),
          ...(g.names ? { names: g.names } : {}),
          ...(g.members
            ? { members: g.members.map((m, mi) => ({ _key: key("member", mi), name: m.name, role: m.role ? ls(m.role) : undefined })) }
            : {}),
        })),
      },
      proceduresList: {
        title: ls(p.title),
        items: p.items.map((t, i) => ({ ...ls(t), _key: key("item", i) })),
        detailedItems: (p.detailedItems ?? []).map((d, i) => ({
          _key: key("proc", i),
          title: ls(d.title),
          desc: lt(d.desc),
          ...(d.image ? { image: d.image } : {}),
          ...(d.photos ? { photos: d.photos.map((ph, pi) => ({ _key: key("photo", pi), src: ph.src })) } : {}),
        })),
      },
      sections: (s.sections ?? []).map((sec, i) => ({
        _key: key("section", i),
        icon: sec.icon,
        title: ls(sec.title),
        paragraphs: sec.paragraphs.map((t, pi) => ({ ...lt(t), _key: key("p", pi) })),
        ...(sec.images ? { images: sec.images } : {}),
      })),
      patientInstructions: {
        title: ls(s.patientInstructions!.title),
        paragraphs: s.patientInstructions!.paragraphs.map((t, i) => ({ ...lt(t), _key: key("p", i) })),
      },
      enReviewed: false,
    })
    .commit();
  console.log(`✅ ${ID} — korigovan tekst (sačuvano EN prevoda: ${en.size} SR stringova u mapi)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
