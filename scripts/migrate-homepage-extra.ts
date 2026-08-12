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

const heroSlidesSection = {
  _type: "heroSlidesSection",
  _key: "hero-slides-section",
  slides: [
    {
      _key: "slide-1",
      video: "/videos/institut-dedinje-video-2.mp4",
      badge: "Институт",
      title: 'Национални институт за срце и крвне судове „Дедиње”',
      subtitle:
        "Савремена дијагностика и лечење, врхунски тим стручњака и најновија медицинска технологија — у служби вашег здравља.",
    },
    {
      _key: "slide-2",
      video: "/videos/klinike-video.mp4",
      badge: "Клинике",
      title: "Врхунска кардиоваскуларна нега",
      subtitle:
        "Специјализоване клинике опремљене најсавременијом медицинском технологијом за дијагностику и лечење.",
    },
    {
      _key: "slide-3",
      video: "/images/o-institutu.mp4",
      badge: "О нама",
      title: "Више од 60 година искуства",
      subtitle:
        "Традиција изврсности у кардиоваскуларној медицини, препозната у региону и шире.",
    },
    {
      _key: "slide-4",
      video: "/videos/rec-direktora.mp4",
      badge: "Реч директора",
      title: "У служби здравља наших пацијената",
      subtitle:
        "Мисија Института је пружање најквалитетније здравствене заштите сваком пацијенту.",
    },
  ],
};

const clinicsFeaturedSection = {
  _type: "clinicsFeaturedSection",
  _key: "clinics-featured-section",
  icon: "fas fa-hospital",
  heading: "Наше клинике",
  subheading: "Специјализоване организационе јединице Института",
  items: [
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
      desc: "Анестезија и интензивна нега",
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
  ],
};

const patientLinksSection = {
  _type: "patientLinksSection",
  _key: "patient-links-section",
  icon: "fas fa-user-shield",
  heading: "За пацијенте",
  subheading: "Брз приступ најважнијим информацијама",
  items: [
    {
      _key: "patient-1",
      icon: "fas fa-hospital-user",
      title: "Пријем у болницу",
      desc: "Информације о пријему и припреми",
      href: "/za-pacijente/prijem",
    },
    {
      _key: "patient-2",
      icon: "fas fa-circle-question",
      title: "Честа питања",
      desc: "Одговори на најчешћа питања",
      href: "/za-pacijente/cesta-pitanja",
    },
    {
      _key: "patient-3",
      icon: "fas fa-heart-pulse",
      title: "Кардиохируршки конзилијум",
      desc: "Документација и термини",
      href: "/za-pacijente/kardiohirurski-konzilijum",
    },
    {
      _key: "patient-4",
      icon: "fas fa-stethoscope",
      title: "Васкуларни конзилијум",
      desc: "Процес рада и контакт",
      href: "/za-pacijente/vaskularni-konzilijum",
    },
    {
      _key: "patient-5",
      icon: "fas fa-clipboard-list",
      title: "Амбуланте",
      desc: "Радно време и локације",
      href: "/za-pacijente/ambulante",
    },
    {
      _key: "patient-6",
      icon: "fas fa-utensils",
      title: "План исхране",
      desc: "Препоруке за исхрану",
      href: "/za-pacijente/plan-ishrane",
    },
  ],
};

async function migrateHomepageExtra() {
  console.log("\n🏠 DOPUNA HOMEPAGE PAGEBUILDER-A (hero/klinike/pacijenti)");
  console.log("═══════════════════════════════════════════════\n");

  try {
    const homepage = await client.getDocument("homepage");
    if (!homepage) {
      console.error("❌ Homepage dokument (_id: homepage) ne postoji. Pokreni prvo: npm run migrate:all");
      return;
    }

    const pageBuilder: Array<{ _type: string }> = homepage.pageBuilder || [];
    const existingTypes = new Set(pageBuilder.map((b) => b._type));

    const toAppend = [heroSlidesSection, clinicsFeaturedSection, patientLinksSection].filter(
      (block) => !existingTypes.has(block._type),
    );

    if (toAppend.length === 0) {
      console.log("ℹ️  Sve tri sekcije već postoje u pageBuilder-u, ništa se ne dodaje.\n");
      return;
    }

    console.log(`📝 Dodavanje ${toAppend.length} sekcija u pageBuilder...\n`);
    await client
      .patch("homepage")
      .setIfMissing({ pageBuilder: [] })
      .append("pageBuilder", toAppend)
      .commit();

    console.log("✅ Homepage pageBuilder uspešno dopunjen!");
    console.log(`   Dodato: ${toAppend.map((b) => b._type).join(", ")}\n`);
  } catch (error) {
    console.error("\n❌ GREŠKA PRI MIGRACIJI:\n");
    console.error(error);
    console.log("\n💡 Pokušaj ponovo sa: npm run migrate:homepage-extra\n");
  }
}

migrateHomepageExtra();
