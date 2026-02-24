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

async function migrateDirectorPage() {
  console.log("\n👨‍⚕️ MIGRACIJA РЕЧ ДИРЕКТОРА СТРАНИЦЕ");
  console.log("═══════════════════════════════════════════════\n");

  try {
    const directorPage = {
      _type: "directorPage",
      _id: "directorPage",

      // Hero Section
      hero: {
        badge: "Директор Института",
        title: "Академик проф. др Милован М. Бојић",
        subtitle: 'Директор Института за кардиоваскуларне болести "Дедиње"',
        showScrollIndicator: true,
        // image će biti dodato ručno kroz Sanity Studio
      },

      // Info Cards
      infoCards: [
        {
          _key: "info-1",
          icon: "fas fa-user-graduate",
          title: "Биографија",
          description:
            "Упознајте се са каријером и достигнућима нашег директора",
          buttonText: "Прочитајте више",
          buttonHref: "/biografija",
          highlight: false,
        },
        {
          _key: "info-2",
          icon: "fas fa-book-open",
          title: "Библиографија",
          description: "Преглед научних радова и публикација",
          buttonText: "Погледајте",
          buttonHref: "/bibliografija",
          highlight: false,
        },
        {
          _key: "info-3",
          icon: "fas fa-award",
          title: "Достигнућа",
          description: "Награде и признања у области кардиоваскуларне медицине",
          buttonText: "Сазнајте више",
          buttonHref: "/dostignuca",
          highlight: true,
        },
      ],

      // Director Message
      message: {
        badge: "Реч директора",
        heading: "Посвећеност изврсности у кардиоваскуларној медицини",
        paragraphs: [
          {
            _key: "para-1",
            variant: "lead",
            text: "Обољења срца и крвних судова представљају најчешћи узрок обољевања и умирања у данашње време. Ово има огроман утицај на све области нашег живота у социјалном, психолошком, организационом, а поготову финансијском смислу.",
          },
          {
            _key: "para-2",
            variant: "body",
            text: "Наша обавеза је да обезбедимо врхунску услугу у домену кардиоваскуларне медицине уопште, а конкретно у области модерне кардиохируршке праксе. Ефикасне, квалитетне, у кратком року изведене кардиохируршке процедуре без значајних компликација, омогућавају да се болесници брзо и успешно опораве након операције и у кратком временском интервалу врате свом уобичајеном начину живота и професионалним активностима, чиме обезбеђују егзистенцију себи и својој породици.",
          },
          {
            _key: "para-3",
            variant: "body",
            text: "Наша Клиника обезбеђује потпуно заокружен систем ефикасне дијагностике, лечења и постоперативног опоравка за болеснике којима је потребна кардиохируршка интервенција.",
          },
        ],
        signature: "Академик проф. др Милован М. Бојић",
        videoSrc: "/videos/rec-direktora.mp4",
        videoOverlayText: "Погледајте видео поруку",
        videoCaption: "Видео порука директора о визији и мисији Института",
      },

      // Quote
      quote: {
        text: "Наша посвећеност је да сваком пацијенту пружимо најбољу могућу негу, користећи најсавременије методе и технологије у кардиоваскуларној медицини.",
        author: "Академик проф. др Милован М. Бојић",
      },

      // Partners
      partners: {
        heading: "Сертификати и партнерства",
        items: [
          {
            _key: "partner-1",
            icon: "fas fa-hospital",
            text: "ISO 9001",
          },
          {
            _key: "partner-2",
            icon: "fas fa-certificate",
            text: "JCI Акредитација",
          },
          {
            _key: "partner-3",
            icon: "fas fa-award",
            text: "Европски стандарди",
          },
          {
            _key: "partner-4",
            icon: "fas fa-shield-alt",
            text: "Здравствена заштита",
          },
          {
            _key: "partner-5",
            icon: "fas fa-heart",
            text: "Кардио центар",
          },
        ],
      },

      // SEO
      seo: {
        title:
          "Реч директора - Академик проф. др Милован М. Бојић | Институт Дедиње",
        description:
          "Упознајте се са визијом и мисијом директора Института за кардиоваскуларне болести Дедиње - академика проф. др Милована М. Бојића.",
      },
    };

    console.log("📝 Креирам документ...");
    const result = await client.createOrReplace(directorPage);
    console.log("✅ Документ креиран!", result._id);

    console.log("\n✨ Миграција завршена!");
    console.log("\n⚠️  НАПОМЕНА: Слику директора треба додати ручно:");
    console.log("   1. Отвори Sanity Studio (/studio)");
    console.log("   2. Иди на 'Реч директора'");
    console.log("   3. Upload слику у Hero > Image поље");
    console.log("   4. Публикуј промене\n");
  } catch (error) {
    console.error("❌ Грешка приликом миграције:", error);
    process.exit(1);
  }
}

// Run migration
migrateDirectorPage();
