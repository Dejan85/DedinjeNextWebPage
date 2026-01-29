import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import https from "https";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: "haygvfxq",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const imageUrls = {
  hero: [
    "https://images.unsplash.com/photo-1551076805-e1869033e561?w=1920",
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1920",
    "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1920",
  ],
  welcome: {
    main: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800",
    secondary:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400",
  },
  whyChooseUs:
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200",
};

function downloadImage(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      const chunks: Buffer[] = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", () => resolve(Buffer.concat(chunks)));
      response.on("error", reject);
    });
  });
}

async function uploadImage(url: string, filename: string): Promise<string> {
  console.log(`📥 Preuzimam ${filename}...`);
  const imageBuffer = await downloadImage(url);

  console.log(`📤 Upload-ujem ${filename} u Sanity...`);
  const asset = await client.assets.upload("image", imageBuffer, {
    filename,
  });

  console.log(`✅ ${filename} upload-ovan! ID: ${asset._id}`);
  return asset._id;
}

async function migrateAll() {
  try {
    console.log("🚀 Kompletna migracija Homepage-a...\n");
    console.log("═══════════════════════════════════════════════\n");

    // ============================================
    // 1. UPLOAD SLIKA
    // ============================================
    console.log("📸 KORAK 1: Upload slika...\n");

    console.log("  📷 Hero slike:");
    const heroImageIds = await Promise.all(
      imageUrls.hero.map((url, index) =>
        uploadImage(url, `hero-${index + 1}.jpg`),
      ),
    );

    console.log("\n  📷 Welcome slike:");
    const welcomeMainImageId = await uploadImage(
      imageUrls.welcome.main,
      "welcome-main.jpg",
    );
    const welcomeSecondaryImageId = await uploadImage(
      imageUrls.welcome.secondary,
      "welcome-secondary.jpg",
    );

    console.log("\n  📷 Why Choose Us slika:");
    const whyChooseUsImageId = await uploadImage(
      imageUrls.whyChooseUs,
      "why-choose-us.jpg",
    );

    console.log("\n✅ Sve slike upload-ovane!\n");
    console.log("═══════════════════════════════════════════════\n");

    // ============================================
    // 2. KREIRAJ HERO SLIDES
    // ============================================
    console.log("🎯 KORAK 2: Kreiranje Hero Slides...\n");

    const heroSlides = [
      {
        _type: "hero",
        _key: "hero-1",
        heading: "Ваш национални институт за срце и крвне судове",
        subheading:
          "Водећа здравствена установа у региону са преко 65 година искуства у кардиоваскуларној медицини",
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: heroImageIds[0],
          },
        },
      },
      {
        _type: "hero",
        _key: "hero-2",
        heading: "Најсавременија дијагностика",
        subheading:
          "Користимо најновију технологију и опрему за прецизну дијагностику и лечење кардиоваскуларних обољења",
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: heroImageIds[1],
          },
        },
        cta: {
          text: "ПОГЛЕДАЈ УСЛУГЕ",
          link: "#services",
        },
      },
      {
        _type: "hero",
        _key: "hero-3",
        heading: "Тим стручњака на вашој услузи",
        subheading:
          "Преко 200 лекара специјалиста посвећених вашем здрављу и опоравку",
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: heroImageIds[2],
          },
        },
      },
    ];

    console.log(`  ✅ Kreirano ${heroSlides.length} Hero slide-a`);
    console.log("═══════════════════════════════════════════════\n");

    // ============================================
    // 3. KREIRAJ INFO BOXES
    // ============================================
    console.log("📦 KORAK 3: Kreiranje Info Boxes...\n");

    const infoBoxes = [
      {
        _type: "infoBox",
        _key: "infobox-1",
        icon: "far fa-clock",
        title: "Радно време",
        variant: "schedule",
        schedule: [
          { _key: "schedule-1", days: "Пон - Пет", hours: "08:00 - 19:00" },
          { _key: "schedule-2", days: "Субота", hours: "09:00 - 17:00" },
          { _key: "schedule-3", days: "Недеља", hours: "09:00 - 15:00" },
        ],
      },
      {
        _type: "infoBox",
        _key: "infobox-2",
        icon: "fas fa-hospital",
        title: "Наша одељења",
        variant: "regular",
        description:
          "Упознајте се са свим одељењима и услугама које наш институт нуди пацијентима.",
        linkText: "Погледај одељења",
        linkHref: "#departments",
      },
      {
        _type: "infoBox",
        _key: "infobox-3",
        icon: "fas fa-user-md",
        title: "Наш тим",
        variant: "regular",
        description:
          "Упознајте наше лекаре специјалисте и стручњаке који брину о вашем здрављу.",
        linkText: "Упознајте тим",
        linkHref: "#team",
      },
      {
        _type: "infoBox",
        _key: "infobox-4",
        icon: "fas fa-ambulance",
        title: "Хитни случајеви",
        variant: "emergency",
        emergencyPhone: "011 3601 600",
        emergencyNote: "Доступни 24/7 за хитне случајеве",
      },
    ];

    console.log(`  ✅ Kreirano ${infoBoxes.length} Info Box-a`);
    console.log("═══════════════════════════════════════════════\n");

    // ============================================
    // 4. KREIRAJ WELCOME SECTION
    // ============================================
    console.log("👋 KORAK 4: Kreiranje Welcome sekcije...\n");

    const welcomeSection = {
      _type: "welcomeSection",
      _key: "welcome-1",
      badge: "Добродошли",
      heading: "Институт за кардиоваскуларне болести Дедиње",
      leadText:
        "Водећа здравствена установа у региону специјализована за дијагностику, лечење и рехабилитацију кардиоваскуларних обољења.",
      bodyText:
        "Са више од 65 година искуства и преко 200 лекара специјалиста, Институт Дедиње представља симбол изврсности у кардиоваскуларној медицини. Наша посвећеност пацијентима и константно усавршавање чине нас првим избором за хиљаде пацијената сваке године.",
      features: [
        {
          _key: "feature-1",
          icon: "fas fa-check-circle",
          text: "Најсавременија опрема",
        },
        {
          _key: "feature-2",
          icon: "fas fa-check-circle",
          text: "Стручни тим лекара",
        },
        {
          _key: "feature-3",
          icon: "fas fa-check-circle",
          text: "Комплетна дијагностика",
        },
        {
          _key: "feature-4",
          icon: "fas fa-check-circle",
          text: "24/7 хитна помоћ",
        },
      ],
      ctaButton: {
        text: "Сазнајте више о нама",
        link: "#about",
      },
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: welcomeMainImageId,
        },
      },
      secondaryImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: welcomeSecondaryImageId,
        },
      },
      imageBadge: {
        number: "65+",
        text: "ГОДИНА ИСКУСТВА",
      },
    };

    console.log(`  ✅ Kreirana Welcome sekcija`);
    console.log("═══════════════════════════════════════════════\n");

    // ============================================
    // 5. KREIRAJ STATS SECTION
    // ============================================
    console.log("📊 KORAK 5: Kreiranje Stats sekcije...\n");

    const statsSection = {
      _type: "statsSection",
      _key: "stats-1",
      heading: "Бројке које говоре",
      subheading: "Наши резултати су доказ посвећености и стручности",
      stats: [
        {
          _key: "stat-1",
          icon: "fas fa-heartbeat",
          number: "15,000",
          label: "ОПЕРАЦИЈА ГОДИШЊЕ",
        },
        {
          _key: "stat-2",
          icon: "fas fa-user-md",
          number: "200",
          label: "ЛЕКАРА СПЕЦИЈАЛИСТА",
        },
        {
          _key: "stat-3",
          icon: "fas fa-award",
          number: "65",
          label: "ГОДИНА ИСКУСТВА",
        },
        {
          _key: "stat-4",
          icon: "fas fa-smile",
          number: "50,000",
          label: "ЗАДОВОЉНИХ ПАЦИЈЕНАТА",
        },
      ],
    };

    console.log(`  ✅ Kreirana Stats sekcija`);
    console.log("═══════════════════════════════════════════════\n");

    // ============================================
    // 6. KREIRAJ SERVICES SECTION
    // ============================================
    console.log("💊 KORAK 6: Kreiranje Services sekcije...\n");

    const servicesSection = {
      _type: "servicesSection",
      _key: "services-1",
      badge: "Наше услуге",
      heading: "Комплетна кардиоваскуларна нега",
      subheading:
        "Пружамо широк спектар услуга од дијагностике до хируршких интервенција",
      services: [
        {
          _key: "service-1",
          icon: "fas fa-heart",
          title: "Кардиохирургија",
          description:
            "Хируршко лечење болести срца укључујући коронарни бајпас, замену и реконструкцију срчаних залистака, операције аорте.",
          featured: false,
          features: [
            { _key: "feature-1-1", text: "Коронарни бајпас", link: "#" },
            { _key: "feature-1-2", text: "Замена залистака", link: "#" },
            { _key: "feature-1-3", text: "Операције аорте", link: "#" },
          ],
          ctaText: "Сазнајте више",
          ctaLink: "#",
        },
        {
          _key: "service-2",
          icon: "fas fa-stethoscope",
          title: "Кардиологија",
          description:
            "Комплетна дијагностика и нехируршко лечење болести срца. Модерна опрема за прецизну дијагнозу.",
          featured: true, // НАЈПОПУЛАРНИЈЕ
          features: [
            { _key: "feature-2-1", text: "Ехокардиографија", link: "#" },
            { _key: "feature-2-2", text: "ЕКГ и Холтер", link: "#" },
            { _key: "feature-2-3", text: "Стрес тестови", link: "#" },
          ],
          ctaText: "Сазнајте више",
          ctaLink: "#",
        },
        {
          _key: "service-3",
          icon: "fas fa-x-ray",
          title: "Васкуларна хирургија",
          description:
            "Хируршко лечење болести крвних судова укључујући аорту, каротидне и периферне артерије.",
          featured: false,
          features: [
            { _key: "feature-3-1", text: "Операције аорте", link: "#" },
            { _key: "feature-3-2", text: "Каротидна хирургија", link: "#" },
            { _key: "feature-3-3", text: "Периферна хирургија", link: "#" },
          ],
          ctaText: "Сазнајте више",
          ctaLink: "#",
        },
        {
          _key: "service-4",
          icon: "fas fa-procedures",
          title: "Интервентна кардиологија",
          description:
            "Минимално инвазивне процедуре за лечење срчаних обољења без отворене хирургије.",
          featured: false,
          features: [
            { _key: "feature-4-1", text: "Уградња стентова", link: "#" },
            { _key: "feature-4-2", text: "Ангиопластика", link: "#" },
            { _key: "feature-4-3", text: "Катетеризација", link: "#" },
          ],
          ctaText: "Сазнајте више",
          ctaLink: "#",
        },
      ],
    };

    console.log(`  ✅ Kreirana Services sekcija`);
    console.log("═══════════════════════════════════════════════\n");

    // ============================================
    // 7. KREIRAJ WHY CHOOSE US SECTION
    // ============================================
    console.log("⭐ KORAK 7: Kreiranje Why Choose Us sekcije...\n");

    const whyChooseUsSection = {
      _type: "whyChooseUsSection",
      _key: "why-choose-us-1",
      badge: "Зашто ми",
      heading: "По чему смо другачији",
      subheading:
        "Институт Дедиње комбинује дугогодишње искуство са најсавременијом технологијом како би пружио најбољу могућу негу.",
      features: [
        {
          _key: "why-feature-1",
          icon: "fas fa-user-md",
          title: "Врхунски стручњаци",
          description:
            "Тим од преко 200 лекара специјалиста са међународним искуством.",
        },
        {
          _key: "why-feature-2",
          icon: "fas fa-microscope",
          title: "Најмодернија опрема",
          description:
            "Користимо најновију медицинску технологију за прецизну дијагностику.",
        },
        {
          _key: "why-feature-3",
          icon: "fas fa-clock",
          title: "Брза дијагностика",
          description:
            "Резултати у најкраћем могућем року за правовремено лечење.",
        },
        {
          _key: "why-feature-4",
          icon: "fas fa-hand-holding-heart",
          title: "Индивидуални приступ",
          description: "Сваки пацијент добија персонализован план лечења.",
        },
      ],
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: whyChooseUsImageId,
        },
      },
    };

    console.log(`  ✅ Kreirana Why Choose Us sekcija`);
    console.log("═══════════════════════════════════════════════\n");

    // ============================================
    // 8. KOMBNOVANI PAGE BUILDER
    // ============================================
    console.log("📝 KORAK 8: Kreiranje Homepage dokumenta...\n");

    const pageBuilder = [
      ...heroSlides,
      ...infoBoxes,
      welcomeSection,
      statsSection,
      servicesSection,
      whyChooseUsSection,
    ];

    const homepage = {
      _type: "page",
      _id: "homepage",
      title: "Početna strana",
      slug: {
        _type: "slug",
        current: "/",
      },
      pageBuilder: pageBuilder,
      publishedAt: new Date().toISOString(),
    };

    // ============================================
    // 6. KREIRAJ/UPDATE HOMEPAGE
    // ============================================
    console.log("💾 Snimam Homepage u Sanity...\n");
    const result = await client.createOrReplace(homepage);

    console.log("═══════════════════════════════════════════════\n");
    console.log("🎉 MIGRACIJA USPEŠNO ZAVRŠENA!\n");
    console.log("═══════════════════════════════════════════════\n");

    console.log("📊 Statistika:");
    console.log(`  📄 Document ID: ${result._id}`);
    console.log(`  🎯 Hero Slides: ${heroSlides.length}`);
    console.log(`  📦 Info Boxes: ${infoBoxes.length}`);
    console.log(`  👋 Welcome Sekcija: 1`);
    console.log(
      `  📊 Stats Sekcija: 1 (${statsSection.stats.length} statistike)`,
    );
    console.log(
      `  💊 Services Sekcija: 1 (${servicesSection.services.length} usluge)`,
    );
    console.log(
      `  ⭐ Why Choose Us Sekcija: 1 (${whyChooseUsSection.features.length} features)`,
    );
    console.log(`  📸 Ukupno slika: ${heroImageIds.length + 3}`);
    console.log(`  📝 Ukupno elemenata: ${pageBuilder.length}\n`);

    console.log("═══════════════════════════════════════════════\n");
    console.log("✨ SLEDEĆI KORACI:\n");
    console.log("1. Restartuj Sanity Studio:");
    console.log("   - Pritisni Ctrl+C u terminalu gde radi sanity:dev");
    console.log("   - Pokreni: npm run sanity:dev\n");
    console.log("2. Otvori Sanity Studio u NOVOM tab-u:");
    console.log("   - http://localhost:3000/studio");
    console.log("   - Hard refresh: Ctrl+Shift+R\n");
    console.log("3. Proveri sadržaj:");
    console.log('   - Stranice → Početna strana → "Sadržaj stranice"\n');
    console.log("4. Refresh sajt:");
    console.log("   - http://localhost:3000\n");
    console.log("═══════════════════════════════════════════════\n");
  } catch (error) {
    console.error("\n❌ GREŠKA PRI MIGRACIJI:\n");
    console.error(error);
    console.log("\n💡 Pokušaj ponovo sa: npm run migrate:all\n");
  }
}

migrateAll();
