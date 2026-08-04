import { createClient } from "@sanity/client";
import dotenv from "dotenv";

import { DATA as edukacija } from "../app/[locale]/edukacija/data";
import { DATA as internaEdukacija } from "../app/[locale]/edukacija/interna-edukacija/data";
import { DATA as kme2024 } from "../app/[locale]/edukacija/kme-2024/data";
import { DATA as kmeMedicinskeSestreTehnicari } from "../app/[locale]/edukacija/kme-2024/kme-medicinske-sestre-tehnicari/data";
import { DATA as kongresi } from "../app/[locale]/edukacija/kongresi/data";
import { DATA as medjunarodniKongresi } from "../app/[locale]/edukacija/medjunarodni-kongresi/data";
import { DATA as programi } from "../app/[locale]/edukacija/programi/data";
import { DATA as radionice } from "../app/[locale]/edukacija/radionice/data";
import { DATA as sestrinskaEdukacija } from "../app/[locale]/edukacija/sestrinska-edukacija/data";
import { DATA as istorijat } from "../app/[locale]/edukacija/sestrinska-edukacija/istorijat/data";
import { DATA as kprKurs } from "../app/[locale]/edukacija/sestrinska-edukacija/kpr-kurs/data";
import { DATA as pripravnickiStaz } from "../app/[locale]/edukacija/sestrinska-edukacija/pripravnicki-staz/data";
import { DATA as programKratkihStudija } from "../app/[locale]/edukacija/sestrinska-edukacija/program-kratkih-studija/data";

import { DATA as skolaEhokardiografije } from "../app/[locale]/edukacija/programi/skola-ehokardiografije-prof-dr-aleksandra-nikolic/data";
import { DATA as skolaHipertenzije } from "../app/[locale]/edukacija/programi/skola-hipertenzije-i-redukcije-kardiovaskularnih-faktora-rizika/data";
import { DATA as skolaVaskularnogUltrazvuka } from "../app/[locale]/edukacija/programi/skola-vaskularnog-ultrazvuka/data";

import type { PatientPage, SchoolPage } from "../sanity/types";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: "haygvfxq",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const PAGES: { slug: string; data: PatientPage }[] = [
  { slug: "edukacija", data: edukacija },
  { slug: "interna-edukacija", data: internaEdukacija },
  { slug: "kme-2024", data: kme2024 },
  { slug: "kme-medicinske-sestre-tehnicari", data: kmeMedicinskeSestreTehnicari },
  { slug: "kongresi", data: kongresi },
  { slug: "medjunarodni-kongresi", data: medjunarodniKongresi },
  { slug: "edukativni-programi", data: programi },
  { slug: "radionice", data: radionice },
  { slug: "sestrinska-edukacija", data: sestrinskaEdukacija },
  { slug: "sestrinska-edukacija-istorijat", data: istorijat },
  { slug: "sestrinska-edukacija-kpr-kurs", data: kprKurs },
  { slug: "sestrinska-edukacija-pripravnicki-staz", data: pripravnickiStaz },
  { slug: "sestrinska-edukacija-program-kratkih-studija", data: programKratkihStudija },
];

const SCHOOLS: { slug: string; data: SchoolPage }[] = [
  { slug: "skola-ehokardiografije-prof-dr-aleksandra-nikolic", data: skolaEhokardiografije },
  {
    slug: "skola-hipertenzije-i-redukcije-kardiovaskularnih-faktora-rizika",
    data: skolaHipertenzije,
  },
  { slug: "skola-vaskularnog-ultrazvuka", data: skolaVaskularnogUltrazvuka },
];

async function migrateEdukacija() {
  console.log("\n🎓 МИГРАЦИЈА „ЕДУКАЦИЈА” (page)");
  console.log("═══════════════════════════════════════════════\n");

  for (const { slug, data } of PAGES) {
    const doc = {
      _type: "page",
      _id: `page-${slug}`,
      slug: { _type: "slug", current: slug },
      title: data.title,
      subtitle: data.subtitle,
      pageBuilder: data.pageBuilder,
      publishedAt: new Date().toISOString(),
    };

    try {
      const result = await client.createOrReplace(doc);
      console.log(`✅ ${slug} → ${result._id}`);
    } catch (error) {
      console.error(`❌ ${slug} — грешка приликом миграције:`, error);
      process.exit(1);
    }
  }

  console.log("\n🏫 МИГРАЦИЈА ШКОЛА (schoolPage)");
  console.log("═══════════════════════════════════════════════\n");

  for (const { slug, data } of SCHOOLS) {
    const doc = {
      _type: "schoolPage",
      _id: `schoolPage-${slug}`,
      slug: { _type: "slug", current: slug },
      title: data.title,
      subtitle: data.subtitle,
      breadcrumbLabel: data.breadcrumbLabel,
      intro: data.intro,
      programNav: data.programNav,
      stats: data.stats,
      courseSections: data.courseSections,
      requirementsSection: data.requirementsSection,
      examSection: data.examSection,
      team: data.team,
      techTeam: data.techTeam,
    };

    try {
      const result = await client.createOrReplace(doc);
      console.log(`✅ ${slug} → ${result._id}`);
    } catch (error) {
      console.error(`❌ ${slug} — грешка приликом миграције:`, error);
      process.exit(1);
    }
  }

  console.log("\n✨ Миграција свих „Едукација” страница завршена!\n");
}

migrateEdukacija();
