import { createClient } from "@sanity/client";
import dotenv from "dotenv";

import type { ClinicPageData, ProceduresListData } from "../app/[locale]/klinike/_components/ClinicPageTemplate";

dotenv.config({ path: ".env.local" });

// Generička patch-migracija klinika iz foldera `docs za ubacivanje/11/`.
// Upotreba: tsx scripts/migrate-klinike-folder11.ts <slug>[:unset1,unset2] [<slug> ...]
// Patch (ne createOrReplace): postojeći EN prevodi se čuvaju za SR stringove koji se nisu
// promenili; novi/izmenjeni se dopunjuju kroz i18n:export-untranslated / i18n:apply-translations.
const client = createClient({
  projectId: "haygvfxq",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const key = (prefix: string, i: number) => `${prefix}-${i + 1}`;

function collectEn(node: unknown, map: Map<string, string>) {
  if (Array.isArray(node)) return node.forEach((n) => collectEn(n, map));
  if (node && typeof node === "object") {
    const o = node as Record<string, unknown>;
    if (typeof o.sr === "string" && typeof o.en === "string" && o.en) map.set(o.sr, o.en);
    Object.values(o).forEach((v) => collectEn(v, map));
  }
}

async function migrate(slug: string, unset: string[]) {
  const ID = `clinicPage-${slug}`;
  const { DATA: d } = (await import(`../app/[locale]/klinike/${slug}/data`)) as { DATA: ClinicPageData };
  const doc = await client.getDocument(ID);
  if (!doc) throw new Error(`${ID} ne postoji`);
  const en = new Map<string, string>();
  collectEn(doc, en);

  const ls = (sr: string) => ({ _type: "localeString", sr, ...(en.has(sr) ? { en: en.get(sr) } : {}) });
  const lt = (sr: string) => ({ _type: "localeText", sr, ...(en.has(sr) ? { en: en.get(sr) } : {}) });

  const list = (l: ProceduresListData) => ({
    title: ls(l.title),
    ...(l.popup !== undefined ? { popup: l.popup } : {}),
    items: l.items.map((t, i) => ({ ...ls(t), _key: key("item", i) })),
    ...(l.detailedItems
      ? {
          detailedItems: l.detailedItems.map((x, i) => ({
            _key: key("proc", i),
            title: ls(x.title),
            desc: lt(x.desc),
            ...(x.image ? { image: x.image } : {}),
            ...(x.photos
              ? {
                  photos: x.photos.map((ph, pi) => ({
                    _key: key("photo", pi),
                    src: ph.src,
                    ...(ph.caption ? { caption: ls(ph.caption) } : {}),
                  })),
                }
              : {}),
          })),
        }
      : {}),
  });

  const set: Record<string, unknown> = {
    title: ls(d.title),
    breadcrumbLabel: ls(d.breadcrumbLabel),
    subtitle: lt(d.subtitle),
    introIcon: d.introIcon,
    introTitle: ls(d.introTitle),
    introText: lt(d.introText),
    introParagraphs: (d.introParagraphs ?? []).map((t, i) => ({ ...lt(t), _key: key("intro", i) })),
    areas: d.areas.map((a, i) => ({ _key: key("area", i), icon: a.icon, title: ls(a.title), desc: lt(a.desc) })),
    enReviewed: false,
  };
  if (d.organizationalStructure) set.organizationalStructure = lt(d.organizationalStructure);
  if (d.areasTitle) set.areasTitle = ls(d.areasTitle);
  if (d.areasSubtitle) set.areasSubtitle = ls(d.areasSubtitle);
  if (d.areasIcon) set.areasIcon = d.areasIcon;
  if (d.stats) {
    set.stats = d.stats.map((s, i) => ({
      _key: key("stat", i),
      value: s.value,
      label: ls(s.label),
      ...(s.icon ? { icon: s.icon } : {}),
    }));
  }
  if (d.highlights) {
    set.highlights = d.highlights.map((h, i) => ({
      _key: key("hl", i),
      ...(h.icon ? { icon: h.icon } : {}),
      text: lt(h.text),
    }));
  }
  if (d.extraBanner) {
    set.extraBanner = { value: d.extraBanner.value, label: ls(d.extraBanner.label), desc: ls(d.extraBanner.desc) };
  }
  if (d.proceduresList) set.proceduresList = list(d.proceduresList);
  if (d.technologies) set.technologies = list(d.technologies);
  if (d.staffList) {
    set.staffList = {
      title: ls(d.staffList.title),
      groups: d.staffList.groups.map((g, gi) => ({
        _key: key("group", gi),
        ...(g.heading ? { heading: ls(g.heading) } : {}),
        ...(g.names ? { names: g.names } : {}),
        ...(g.members
          ? {
              members: g.members.map((m, mi) => ({
                _key: key("member", mi),
                name: m.name,
                ...(m.role ? { role: ls(m.role) } : {}),
              })),
            }
          : {}),
      })),
    };
  }
  if (d.sections) {
    set.sections = d.sections.map((sec, i) => ({
      _key: key("section", i),
      ...(sec.icon ? { icon: sec.icon } : {}),
      title: ls(sec.title),
      paragraphs: sec.paragraphs.map((t, pi) => ({ ...lt(t), _key: key("p", pi) })),
      ...(sec.image ? { image: sec.image } : {}),
      ...(sec.images ? { images: sec.images } : {}),
    }));
  }
  if (d.patientInstructions) {
    set.patientInstructions = {
      title: ls(d.patientInstructions.title),
      paragraphs: d.patientInstructions.paragraphs.map((t, i) => ({ ...lt(t), _key: key("p", i) })),
    };
  }

  let p = client.patch(ID).set(set);
  if (unset.length) p = p.unset(unset);
  await p.commit();
  console.log(`✅ ${ID} — ažuriran (EN u mapi: ${en.size}${unset.length ? `, unset: ${unset.join(",")}` : ""})`);
}

async function main() {
  const args = process.argv.slice(2);
  if (!args.length) throw new Error("Navedi bar jedan slug (opciono slug:polje1,polje2 za unset)");
  for (const a of args) {
    const [slug, u] = a.split(":");
    await migrate(slug, u ? u.split(",") : []);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
