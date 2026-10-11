import { createClient } from "@sanity/client";
import dotenv from "dotenv";

import { DATA as strukturne } from "../app/[locale]/klinike/centar-strukturne-bolesti-srca/data";
import { DATA as invazivna } from "../app/[locale]/klinike/invazivna-dijagnostika/data";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: "haygvfxq",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Lokalizovana polja se pišu u {_type, sr} obliku (en se popunjava kroz
// standardni i18n export/translate/apply pipeline; do tada localize() pada na sr).
const ls = (sr: string) => ({ _type: "localeString", sr });
const lt = (sr: string) => ({ _type: "localeText", sr });
const key = (prefix: string, i: number) => `${prefix}-${i + 1}`;

async function migrate() {
  console.log("\n🏥 Centar za strukturne bolesti srca + opisi procedura (invazivna-dijagnostika)\n");

  const s = strukturne;
  const doc = {
    _type: "clinicPage",
    _id: "clinicPage-centar-strukturne-bolesti-srca",
    slug: { _type: "slug", current: "centar-strukturne-bolesti-srca" },
    order: 21,
    title: ls(s.title),
    breadcrumbLabel: ls(s.breadcrumbLabel),
    subtitle: lt(s.subtitle),
    introIcon: s.introIcon,
    introTitle: ls(s.introTitle),
    introText: lt(s.introText),
    introParagraphs: (s.introParagraphs ?? []).map((p, i) => ({ ...lt(p), _key: key("intro", i) })),
    stats: (s.stats ?? []).map((st, i) => ({
      _key: key("stat", i),
      value: st.value,
      label: ls(st.label),
      icon: st.icon,
    })),
    staffList: s.staffList && {
      title: ls(s.staffList.title),
      groups: s.staffList.groups.map((g, gi) => ({
        _key: key("group", gi),
        members: (g.members ?? []).map((m, mi) => ({
          _key: key("member", mi),
          name: m.name,
          role: m.role ? ls(m.role) : undefined,
        })),
      })),
    },
    areasTitle: ls(s.areasTitle!),
    areasSubtitle: ls(s.areasSubtitle!),
    areasIcon: s.areasIcon,
    areas: s.areas.map((a, i) => ({
      _key: key("area", i),
      icon: a.icon,
      title: ls(a.title),
      desc: lt(a.desc),
    })),
    sections: (s.sections ?? []).map((sec, i) => ({
      _key: key("section", i),
      icon: sec.icon,
      title: ls(sec.title),
      paragraphs: sec.paragraphs.map((p, pi) => ({ ...lt(p), _key: key("p", pi) })),
    })),
    enReviewed: false,
  };

  try {
    const created = await client.createOrReplace(doc);
    console.log(`✅ ${created._id} (areas: ${doc.areas.length}, sections: ${doc.sections.length})`);

    const detailed = (invazivna.proceduresList?.detailedItems ?? []).map((d, i) => ({
      _key: key("proc", i),
      title: ls(d.title),
      desc: lt(d.desc),
    }));
    await client
      .patch("clinicPage-invazivna-dijagnostika")
      .set({ "proceduresList.detailedItems": detailed })
      .commit();
    console.log(`✅ clinicPage-invazivna-dijagnostika → detailedItems: ${detailed.length}`);
  } catch (error) {
    console.error("\n❌ GREŠKA PRI MIGRACIJI:\n", error);
    process.exit(1);
  }
}

migrate();
