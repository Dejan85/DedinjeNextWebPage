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
  departments: [
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600",
    "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=600",
    "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600",
  ],
  team: [
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400",
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400",
    "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400",
  ],
  testimonials: [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
  ],
  news: [
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
    "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400",
    "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400",
    "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400",
  ],
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

    console.log("\n  📷 Departments slike:");
    const departmentImageIds = await Promise.all(
      imageUrls.departments.map((url, index) =>
        uploadImage(url, `department-${index + 1}.jpg`),
      ),
    );

    console.log("\n  📷 Team slike:");
    const teamImageIds = await Promise.all(
      imageUrls.team.map((url, index) =>
        uploadImage(url, `team-${index + 1}.jpg`),
      ),
    );

    console.log("\n  📷 Testimonials slike:");
    const testimonialImageIds = await Promise.all(
      imageUrls.testimonials.map((url, index) =>
        uploadImage(url, `testimonial-${index + 1}.jpg`),
      ),
    );

    console.log("\n  📷 News slike:");
    const newsImageIds = await Promise.all(
      imageUrls.news.map((url, index) =>
        uploadImage(url, `news-${index + 1}.jpg`),
      ),
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
    // 8. KREIRAJ CTA SECTION
    // ============================================
    console.log("📢 KORAK 8: Kreiranje CTA (Call to Action) sekcije...\n");

    const ctaSection = {
      _type: "ctaSection",
      _key: "cta-1",
      heading: "Ваше здравље је наш приоритет",
      bodyText:
        "Контактирајте нас за више информација о нашим услугама и како можемо помоћи вашем здрављу.",
      buttons: [
        {
          _key: "cta-button-1",
          text: "ПОЗОВИТЕ НАС",
          link: "tel:0113601600",
          variant: "primary",
          icon: "fas fa-phone",
        },
        {
          _key: "cta-button-2",
          text: "КОНТАКТИРАЈТЕ НАС",
          link: "#contact",
          variant: "secondary",
          icon: "",
        },
      ],
    };

    console.log(`  ✅ Kreirana CTA sekcija`);
    console.log("═══════════════════════════════════════════════\n");

    // ============================================
    // 9. KREIRAJ DEPARTMENTS SECTION
    // ============================================
    console.log("🏥 KORAK 9: Kreiranje Departments sekcije...\n");

    const departmentsSection = {
      _type: "departmentsSection",
      _key: "departments-1",
      badge: "Одељења",
      heading: "Наша специјализована одељења",
      subheading:
        "Свако одељење посвећено је одређеној области кардиоваскуларне медицине",
      departments: [
        {
          _key: "dept-1",
          image: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: departmentImageIds[0],
            },
          },
          title: "Одељење за кардиохирургију",
          description: "Комплексне хируршке интервенције на срцу",
          linkHref: "#",
        },
        {
          _key: "dept-2",
          image: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: departmentImageIds[1],
            },
          },
          title: "Одељење за кардиологију",
          description: "Дијагностика и нехируршко лечење",
          linkHref: "#",
        },
        {
          _key: "dept-3",
          image: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: departmentImageIds[2],
            },
          },
          title: "Интензивна нега",
          description: "24/7 мониторинг критичних пацијената",
          linkHref: "#",
        },
        {
          _key: "dept-4",
          image: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: departmentImageIds[3],
            },
          },
          title: "Рехабилитација",
          description: "Постоперативни опоравак и терапија",
          linkHref: "#",
        },
      ],
    };

    console.log(`  ✅ Kreirana Departments sekcija`);
    console.log("═══════════════════════════════════════════════\n");

    // ============================================
    // 10. KREIRAJ TEAM SECTION
    // ============================================
    console.log("👥 KORAK 10: Kreiranje Team sekcije...\n");

    const teamSection = {
      _type: "teamSection",
      _key: "team-1",
      badge: "Наш тим",
      heading: "Упознајте наше стручњаке",
      subheading: "Искусни лекари посвећени вашем здрављу",
      team: [
        {
          _key: "team-member-1",
          image: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: teamImageIds[0],
            },
          },
          name: "Др Марко Јовановић",
          role: "Кардиохирург",
          description:
            "Специјалиста са 20+ година искуства у комплексним кардиохируршким интервенцијама.",
          socialLinks: [
            { _key: "social-1-1", platform: "facebook", url: "#" },
            { _key: "social-1-2", platform: "linkedin", url: "#" },
            { _key: "social-1-3", platform: "email", url: "#" },
          ],
        },
        {
          _key: "team-member-2",
          image: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: teamImageIds[1],
            },
          },
          name: "Др Ана Петровић",
          role: "Кардиолог",
          description:
            "Водећи специјалиста за неинвазивну кардиолошку дијагностику и превенцију.",
          socialLinks: [
            { _key: "social-2-1", platform: "facebook", url: "#" },
            { _key: "social-2-2", platform: "linkedin", url: "#" },
            { _key: "social-2-3", platform: "email", url: "#" },
          ],
        },
        {
          _key: "team-member-3",
          image: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: teamImageIds[2],
            },
          },
          name: "Др Милан Николић",
          role: "Васкуларни хирург",
          description:
            "Експерт за хируршко лечење болести крвних судова и аортне патологије.",
          socialLinks: [
            { _key: "social-3-1", platform: "facebook", url: "#" },
            { _key: "social-3-2", platform: "linkedin", url: "#" },
            { _key: "social-3-3", platform: "email", url: "#" },
          ],
        },
        {
          _key: "team-member-4",
          image: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: teamImageIds[3],
            },
          },
          name: "Др Јелена Стојковић",
          role: "Анестезиолог",
          description:
            "Специјалиста за кардиоанестезију са богатим искуством у интензивној нези.",
          socialLinks: [
            { _key: "social-4-1", platform: "facebook", url: "#" },
            { _key: "social-4-2", platform: "linkedin", url: "#" },
            { _key: "social-4-3", platform: "email", url: "#" },
          ],
        },
      ],
      ctaButton: {
        text: "Сви наши лекари",
        link: "#team",
      },
    };

    console.log(`  ✅ Kreirana Team sekcija`);
    console.log("═══════════════════════════════════════════════\n");

    // ============================================
    // 11. KREIRAJ TESTIMONIALS SECTION
    // ============================================
    console.log("💬 KORAK 11: Kreiranje Testimonials sekcije...\n");

    const testimonialsSection = {
      _type: "testimonialsSection",
      _key: "testimonials-1",
      badge: "Искуства",
      heading: "Шта кажу наши пацијенти",
      testimonials: [
        {
          _key: "testimonial-1",
          quote:
            "Захваљујући тиму на Дедињу, данас водим потпуно нормалан живот. Операција је протекла без компликација, а постоперативна нега је била на највишем нивоу. Неизмерно сам захвалан.",
          authorName: "Петар Миловановић",
          authorRole: "Пацијент, Кардиохирургија",
          authorImage: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: testimonialImageIds[0],
            },
          },
        },
        {
          _key: "testimonial-2",
          quote:
            "Професионалност и хуманост особља на Дедињу су ме одушевили. Од првог прегледа до завршетка лечења осећала сам се сигурно и збринуто. Топло препоручујем.",
          authorName: "Марија Станковић",
          authorRole: "Пацијенткиња, Кардиологија",
          authorImage: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: testimonialImageIds[1],
            },
          },
        },
        {
          _key: "testimonial-3",
          quote:
            "Након уградње стентова осећам се као нов човек. Др Јовановић и његов тим су истински професионалци. Брза интервенција ми је спасила живот.",
          authorName: "Зоран Томић",
          authorRole: "Пацијент, Интервентна кардиологија",
          authorImage: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: testimonialImageIds[2],
            },
          },
        },
      ],
    };

    console.log(`  ✅ Kreirana Testimonials sekcija`);
    console.log("═══════════════════════════════════════════════\n");

    // ============================================
    // 12. KREIRAJ NEWS SECTION
    // ============================================
    console.log("📰 KORAK 12: Kreiranje News sekcije...\n");

    const newsSection = {
      _type: "newsSection",
      _key: "news-1",
      badge: "Новости",
      heading: "Најновије вести",
      subheading: "Будите у току са дешавањима на Институту",
      news: [
        {
          _key: "news-1",
          image: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: newsImageIds[0],
            },
          },
          category: "Иновације",
          date: "15. јануар 2026",
          author: "Медицински тим",
          title: "Нова метода минимално инвазивне кардиохирургије",
          description:
            "Институт Дедиње уводи најновију технологију за минимално инвазивне операције срца која значајно скраћује време опоравка пацијената.",
          linkHref: "#",
          size: "large",
        },
        {
          _key: "news-2",
          image: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: newsImageIds[1],
            },
          },
          category: "Акције",
          date: "10. јануар 2026",
          title: "Бесплатни кардиолошки прегледи",
          linkHref: "#",
          size: "small",
        },
        {
          _key: "news-3",
          image: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: newsImageIds[2],
            },
          },
          category: "Опрема",
          date: "5. јануар 2026",
          title: "Нова савремена опрема на одељењу",
          linkHref: "#",
          size: "small",
        },
        {
          _key: "news-4",
          image: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: newsImageIds[3],
            },
          },
          category: "Успех",
          date: "1. јануар 2026",
          title: "Успешна 10.000 операција у 2025.",
          linkHref: "#",
          size: "small",
        },
      ],
    };

    console.log(`  ✅ Kreirana News sekcija`);
    console.log("═══════════════════════════════════════════════\n");

    // ============================================
    // 13. KREIRAJ CONTACT SECTION
    // ============================================
    console.log("📞 KORAK 13: Kreiranje Contact sekcije...\n");

    const contactSection = {
      _type: "contactSection",
      _key: "contact-section",
      heading: "Контактирајте нас",
      subheading:
        "Попуните формулар и наш тим ће вас контактирати у најкраћем року са свим потребним информацијама.",
      contactInfo: {
        phone: "011 3601 668",
        email: "info@ikvbd.rs",
        address: "Херој Милана Тепића 1",
      },
      formFields: {
        namePlaceholder: "Име и презиме",
        emailPlaceholder: "E-пошта",
        phonePlaceholder: "Телефон",
        departmentLabel: "Одељење",
        dateLabel: "Датум",
        timeLabel: "Време",
        notesPlaceholder: "Додатне напомене",
        submitButtonText: "ПОШАЉИТЕ ПОРУКУ",
      },
      departments: [
        "Кардиологија",
        "Кардиохирургија",
        "Васкуларна хирургија",
        "Интензивна нега",
        "Дијагностика",
        "Рехабилитација",
      ],
    };

    console.log(`  ✅ Kreirana Contact sekcija`);
    console.log("═══════════════════════════════════════════════\n");

    // ============================================
    // 14. KREIRAJ PARTNERS SECTION
    // ============================================
    console.log("🤝 KORAK 14: Kreiranje Partners sekcije...\n");

    const partnersSection = {
      _type: "partnersSection",
      _key: "partners-section",
      heading: "Сертификати и партнерства",
      partners: [
        {
          _key: "partner-1",
          icon: "fas fa-hospital",
          name: "ISO 9001",
        },
        {
          _key: "partner-2",
          icon: "fas fa-certificate",
          name: "JCI Акредитација",
        },
        {
          _key: "partner-3",
          icon: "fas fa-award",
          name: "Европски стандарди",
        },
        {
          _key: "partner-4",
          icon: "fas fa-shield-alt",
          name: "Здравствена заштита",
        },
        {
          _key: "partner-5",
          icon: "fas fa-heart",
          name: "Кардио центар",
        },
      ],
    };

    console.log(
      `  ✅ Kreirana Partners sekcija sa ${partnersSection.partners.length} partnera`,
    );
    console.log("═══════════════════════════════════════════════\n");

    // ============================================
    // 15. KOMBNOVANI PAGE BUILDER
    // ============================================
    console.log("📝 KORAK 15: Kreiranje Homepage dokumenta...\n");

    const pageBuilder = [
      ...heroSlides,
      ...infoBoxes,
      welcomeSection,
      statsSection,
      servicesSection,
      whyChooseUsSection,
      ctaSection,
      departmentsSection,
      teamSection,
      testimonialsSection,
      newsSection,
      contactSection,
      partnersSection,
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
    console.log(`  � CTA Sekcija: 1 (${ctaSection.buttons.length} dugmeta)`);
    console.log(
      `  🏥 Departments Sekcija: 1 (${departmentsSection.departments.length} odeljenja)`,
    );
    console.log(
      `  👥 Team Sekcija: 1 (${teamSection.team.length} članova tima)`,
    );
    console.log(
      `  � Testimonials Sekcija: 1 (${testimonialsSection.testimonials.length} testimonijala)`,
    );
    console.log(`  📰 News Sekcija: 1 (${newsSection.news.length} vesti)`);
    console.log(`  📞 Contact Sekcija: 1`);
    console.log(
      `  🤝 Partners Sekcija: 1 (${partnersSection.partners.length} partnera)`,
    );
    console.log(
      `  📸 Ukupno slika: ${heroImageIds.length + 3 + departmentImageIds.length + teamImageIds.length + testimonialImageIds.length + newsImageIds.length}`,
    );
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
