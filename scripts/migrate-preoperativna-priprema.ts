import { createClient } from "@sanity/client";
import dotenv from "dotenv";

import { DATA as d } from "../app/[locale]/klinike/preoperativna-priprema/data";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: "haygvfxq",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Lokalizovana polja se pišu u {_type, sr} obliku (en se popunjava kroz
// i18n export/translate/apply pipeline; do tada localize() pada na sr).
const ls = (sr: string) => ({ _type: "localeString", sr });
const lt = (sr: string) => ({ _type: "localeText", sr });
const key = (prefix: string, i: number) => `${prefix}-${i + 1}`;

async function migrate() {
  console.log("\n🏥 Odeljenje preoperativne pripreme (docs za ubacivanje/08)\n");

  const p = d.proceduresList!;
  const doc = {
    _type: "clinicPage",
    _id: "clinicPage-preoperativna-priprema",
    slug: { _type: "slug", current: "preoperativna-priprema" },
    order: 22,
    title: ls(d.title),
    breadcrumbLabel: ls(d.breadcrumbLabel),
    subtitle: lt(d.subtitle),
    introIcon: d.introIcon,
    introTitle: ls(d.introTitle),
    introText: lt(d.introText),
    areas: [],
    proceduresList: {
      title: ls(p.title),
      items: p.items.map((t, i) => ({ ...ls(t), _key: key("item", i) })),
      detailedItems: (p.detailedItems ?? []).map((x, i) => ({
        _key: key("proc", i),
        title: ls(x.title),
        desc: lt(x.desc),
      })),
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
  };

  try {
    const created = await client.createOrReplace(doc);
    console.log(`✅ ${created._id} (procedure: ${p.detailedItems?.length}, sections: ${doc.sections.length})`);
  } catch (error) {
    console.error("\n❌ GREŠKA PRI MIGRACIJI:\n", error);
    process.exit(1);
  }
}

migrate();
