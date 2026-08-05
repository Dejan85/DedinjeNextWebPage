import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: "haygvfxq",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const CLINICS_ITEMS = [
  {
    _key: "clinic-1",
    icon: "fas fa-heart-pulse",
    title: "Кардиохирургија",
    desc: "Оперативно лечење срчаних обољења",
    href: "/klinike/kardiohirurgija",
  },
  {
    _key: "clinic-2",
    icon: "fas fa-stethoscope",
    title: "Васкуларна хирургија",
    desc: "Лечење крвних судова",
    href: "/klinike/vaskularna-hirurgija",
  },
  {
    _key: "clinic-3",
    icon: "fas fa-heart",
    title: "Кардиологија",
    desc: "Дијагностика и лечење срца",
    href: "/klinike/kardiologija",
  },
  {
    _key: "clinic-4",
    icon: "fas fa-syringe",
    title: "Анестезиологија",
    desc: "Анестезија и интензивно лечење",
    href: "/klinike/anesteziologija",
  },
  {
    _key: "clinic-5",
    icon: "fas fa-heartbeat",
    title: "Инвазивна дијагностика",
    desc: "Катетеризација и интервенције",
    href: "/klinike/invazivna-dijagnostika",
  },
  {
    _key: "clinic-6",
    icon: "fas fa-heart-circle-check",
    title: "Центар за срчану слабост",
    desc: "Комплексно лечење",
    href: "/klinike/centar-srcana-slabost",
  },
  {
    _key: "clinic-7",
    icon: "fas fa-x-ray",
    title: "КВ КТ и КВ МР дијагностика",
    desc: "Кардиоваскуларна компјутеризована дијагностика",
    href: "/klinike/kv-dijagnostika",
  },
  {
    _key: "clinic-8",
    icon: "fas fa-laptop-medical",
    title: "Телемедицина",
    desc: "Здравствене услуге на даљину",
    href: "/klinike/telemedicina",
  },
  {
    _key: "clinic-9",
    icon: "fas fa-hospital",
    title: "Поликлиника",
    desc: "Амбулантне здравствене услуге",
    href: "/klinike/poliklinika",
  },
  {
    _key: "clinic-10",
    icon: "fas fa-person-walking",
    title: "Кардиоваскуларна рехабилитација",
    desc: "Опоравак и рехабилитација пацијената",
    href: "/klinike/kardiovaskularna-rehabilitacija",
  },
  {
    _key: "clinic-11",
    icon: "fas fa-pills",
    title: "Апотека",
    desc: "Лекови и медицинско снабдевање",
    href: "/klinike/apteka",
  },
  {
    _key: "clinic-12",
    icon: "fas fa-flask",
    title: "Лабораторијска дијагностика",
    desc: "Лабораторијске анализе",
    href: "/klinike/laboratorija",
  },
  {
    _key: "clinic-13",
    icon: "fas fa-droplet",
    title: "Банка крви",
    desc: "Одељење за трансфузију",
    href: "/klinike/transfuzija",
  },
];

async function migrateHomepageClinicsUpdate() {
  console.log("\n📦 AŽURIRANJE SEKCIJE „NAŠE KLINIKE” NA POČETNOJ (6 → 13 stavki)");
  console.log("═══════════════════════════════════════════════\n");

  const homepage = await client.getDocument("homepage");
  if (!homepage) {
    console.error("❌ Homepage dokument (_id: homepage) ne postoji. Pokreni prvo: npm run migrate:all");
    return;
  }

  const pageBuilder: Array<{ _type: string; _key?: string }> = homepage.pageBuilder || [];
  const block = pageBuilder.find((b) => b._type === "clinicsFeaturedSection");
  if (!block) {
    console.error("❌ Blok clinicsFeaturedSection ne postoji u pageBuilder-u. Pokreni prvo: npm run migrate:homepage-extra");
    return;
  }

  await client
    .patch("homepage")
    .set({ [`pageBuilder[_key=="${block._key}"].items`]: CLINICS_ITEMS })
    .commit();

  console.log(`✅ Sekcija „Naše klinike” ažurirana na ${CLINICS_ITEMS.length} stavki!\n`);
}

migrateHomepageClinicsUpdate().catch((error) => {
  console.error("\n❌ GREŠKA PRI MIGRACIJI:\n");
  console.error(error);
  console.log("\n💡 Pokušaj ponovo sa: npm run migrate:homepage-clinics-update\n");
});
