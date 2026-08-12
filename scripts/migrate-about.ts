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

async function migrateAboutPage() {
  console.log("\n🏥 MIGRACIJA О ИНСТИТУТУ СТРАНИЦЕ");
  console.log("═══════════════════════════════════════════════\n");

  try {
    const aboutPage = {
      _type: "aboutPage",
      _id: "aboutPage",

      // Hero Section
      hero: {
        badge: "О ИНСТИТУТУ",
        title: "Ваш национални институт за срце и крвне судове",
        subtitle:
          "Водећа здравствена установа у региону са преко 65 година искуства у кардиоваскуларној медицини",
        showScrollIndicator: false,
        // image će biti dodato ručno kroz Sanity Studio
      },

      // About Section
      about: {
        badge: "О нама",
        heading: "Национални институт за срце и крвне судове „Дедиње”",
        leadText:
          "Национални институт за срце и крвне судове „Дедиње” је национална референтна здравствена установа терцијалног нивоа из области кардиоваскуларних болести и специјализована установа за научноистраживачки рад.",
        bodyText:
          "Од свог оснивања 1959. године, Институт је постао симбол изврсности у дијагностици, лечењу и рехабилитацији срчаних и васкуларних обољења. Са тимом од преко 200 високо квалификованих лекара специјалиста и најсавременијом медицинском опремом, пружамо услуге највишег квалитета.",
        highlights: [
          {
            _key: "highlight-1",
            icon: "fas fa-award",
            title: "Национална референца",
            description: "Водећа установа за КВБ у Србији",
          },
          {
            _key: "highlight-2",
            icon: "fas fa-microscope",
            title: "Научни рад",
            description: "Специјализована за истраживања",
          },
          {
            _key: "highlight-3",
            icon: "fas fa-user-graduate",
            title: "Едукација",
            description: "Центар за обуку специјалиста",
          },
        ],
        foundedYear: "1959",
        videoSrc: "/images/o-institutu.mp4",
        videoOverlayText: "Погледајте видео",
        videoCaption:
          "Видео презентација Националног института за срце и крвне судове „Дедиње”",
      },

      // Statistics Section
      statistics: {
        badge: "Наши резултати",
        heading: "Бројке које говоре о нама",
        subtitle: "Преко шест деценија посвећености здрављу пацијената",
        stats: [
          {
            _key: "stat-1",
            icon: "fas fa-users",
            label: "Преко",
            value: "74.000",
            description: "болесника дана годишње",
          },
          {
            _key: "stat-2",
            icon: "fas fa-hospital-user",
            label: "Преко",
            value: "15.900",
            description: "лечених пацијентата годишње",
          },
          {
            _key: "stat-3",
            icon: "fas fa-heartbeat",
            label: "Преко",
            value: "5.600",
            description: "коронарографија годишње",
          },
          {
            _key: "stat-4",
            icon: "fas fa-procedures",
            label: "Преко",
            value: "1.000",
            description: "ЦФР, ИВУС, ОЦТ годишње",
          },
          {
            _key: "stat-5",
            icon: "fas fa-user-md",
            label: "Over",
            value: "3.000",
            description: "cardiac surgeries per year",
          },
          {
            _key: "stat-6",
            icon: "fas fa-stethoscope",
            label: "Over",
            value: "1.750",
            description: "vascular surgeries per year",
          },
          {
            _key: "stat-7",
            icon: "fas fa-heart",
            label: "Over",
            value: "2.400",
            description: "PCI procedures per year",
          },
          {
            _key: "stat-8",
            icon: "fas fa-bolt",
            label: "Over",
            value: "3.020",
            description: "electrophysiological procedures per year",
          },
          {
            _key: "stat-9",
            icon: "fas fa-clipboard-check",
            label: "Преко",
            value: "270",
            description: "ТАБИ процедура годишње",
          },
          {
            _key: "stat-10",
            icon: "fas fa-lungs",
            label: "Преко",
            value: "60",
            description: "ТЕВАР/ЕВАР годишње",
          },
          {
            _key: "stat-11",
            icon: "fas fa-heartbeat",
            label: "Преко",
            value: "400",
            description: "ПТА годишње",
          },
          {
            _key: "stat-12",
            icon: "fas fa-notes-medical",
            label: "Преко",
            value: "236",
            description: "биопсичких пастила",
          },
        ],
      },

      // Management Section
      management: {
        badge: "Управа",
        heading: "Управа Института",
        subtitle: "Искусни професионалци који воде наш институт",
        profiles: [
          {
            _key: "profile-1",
            id: "medicinski",
            icon: "fas fa-user-md",
            tabText: "Помоћник директора за медицинске послове",
            // image će biti dodato ručno
            name: "Др Драгана Ункић-Стојановић",
            title: "Помоћник директора за медицинске послове",
            bioTitle: "Биографија",
            bioParagraphs: [
              "Доцент др сц. мед. Драгана Ункић-Стојановић је рођена 1976. године у Гостивару, Република Македонија. Медицински факултет Универзитета у Београду уписала је 1994/1995. године. Дипломирала је 2006. године. Специјалистички испит из Анестезиологије са реаниматологијом је положила у септембру 2006.",
              "<strong>Докторску дисертацију</strong> под насловом &ldquo;Утицај интраоперативне нормоволемијске хемодилуције и прогностичког модела на потребу за трансфузијом и компликације код болесника хируршки лечених због болести коронарних артерија&rdquo; одбранила је на Медицинском факултету Универзитета у Београду у марту 2020.",
              "Од 2014-2021. године др Драгана Ункић-Стојановић је била главни анестезиолог болнице са анестезиолошким одељењем (уз обавезу – анестезиологија). Од октобра 2021. у радном odnosу на превентивној хирургији са анестезиологијом на Медицинском факултету у Београду.",
            ],
          },
          {
            _key: "profile-2",
            id: "nemedicinski",
            icon: "fas fa-briefcase",
            tabText: "Помоћник директора за немедицинске послове",
            // image će biti dodato ručno
            name: "Бојана Поповић, маст.екон.",
            title: "Помоћник директора за немедицинске послове",
            bioTitle: "Биографија",
            bioParagraphs: [
              "Бојана Поповић је дипломирани економиста са мастер степеном стеченим на Економском факултету у Београду. Поседује богато искуство у управљању здравственим установама и финансијском планирању.",
              "Као помоћник директора за немедицинске послове, одговорна је за све административне, финансијске и организационе аспекте пословања Института. Њена посвећеност ефикасности и модернизацији процеса допринела је значајном унапређењу пословања установе.",
            ],
          },
          {
            _key: "profile-3",
            id: "sestra",
            icon: "fas fa-user-nurse",
            tabText: "Главна сестра Института",
            // image će biti dodato ručno
            name: "Зорица Васић, ВМС",
            title: "Главна сестра Института",
            bioTitle: "Биографија",
            bioParagraphs: [
              "Зорица Васић је дипломирана виша медицинска сестра са вишедеценијским искуством у кардиоваскуларној негаторској пракси. Током своје каријере показала је изузетну посвећеност пацијентима и стручном развоју медицинског особља.",
              "Као главна сестра Института, координира рад свих медицинских сестара и техничара, обезбеђујући најбоље стандарде неге и безбедности пацијената. Активно учествује у едукацији младих кадрова и унапређењу стандарда неге.",
            ],
          },
        ],
      },

      // Values Section
      values: {
        badge: "Наше вредности",
        heading: "Оно у шта верујемо",
        subtitle: "Принципи који воде наш рад сваког дана",
        items: [
          {
            _key: "value-1",
            icon: "fas fa-heart",
            title: "Посвећеност пацијенту",
            description:
              "Здравље и добробит наших пацијената су у центру свега што радимо. Пружамо персонализовану негу са поштовањем и пажњом.",
          },
          {
            _key: "value-2",
            icon: "fas fa-graduation-cap",
            title: "Стручност и изврсност",
            description:
              "Континуирано усавршавамо наше вештине и знање како бисмо пружили најбољу могућу здравствену заштиту на светском нивоу.",
          },
          {
            _key: "value-3",
            icon: "fas fa-lightbulb",
            title: "Иновације",
            description:
              "Усвајамо најсавременије технологије и методе лечења, будући пионири у примени нових третмана и процедура.",
          },
          {
            _key: "value-4",
            icon: "fas fa-users",
            title: "Тимски рад",
            description:
              "Мултидисциплинарни приступ и сарадња стручњака различитих специјалности обезбеђују оптималне резултате лечења.",
          },
          {
            _key: "value-5",
            icon: "fas fa-shield-alt",
            title: "Безбедност",
            description:
              "Безбедност пацијената је наш најважнији приоритет. Поштујемо највише стандарде квалитета и безбедности у свим процедурама.",
          },
          {
            _key: "value-6",
            icon: "fas fa-handshake",
            title: "Интегритет",
            description:
              "Поступамо са интегритетом, транспарентношћу и етичношћу у свим аспектима нашег рада и односа са пацијентима.",
          },
        ],
      },

      // CTA Section
      cta: {
        heading: "Контактирајте нас данас",
        text: "Наш тим стручњака је спреман да вам пружи све потребне информације",
        buttons: [
          {
            _key: "btn-1",
            text: "Контактирајте нас",
            href: "/kontakt",
            icon: "fas fa-phone",
            variant: "primary",
          },
          {
            _key: "btn-2",
            text: "Упознајте наш тим",
            href: "/tim",
            icon: "fas fa-user-md",
            variant: "secondary",
          },
        ],
      },

      // SEO
      seo: {
        title: "О институту - Национални институт за срце и крвне судове „Дедиње”",
        description:
          "Национални институт за срце и крвне судове „Дедиње” је национална референтна здравствена установа са преко 65 година искуства у кардиоваскуларној медицини.",
      },
    };

    console.log("📝 Креирам документ...");
    const result = await client.createOrReplace(aboutPage);
    console.log("✅ Документ креиран!", result._id);

    console.log("\n✨ Миграција завршена!");
    console.log("\n⚠️  НАПОМЕНА: Слике треба додати ручно:");
    console.log("   1. Отвори Sanity Studio (/studio)");
    console.log("   2. Иди на 'О институту'");
    console.log("   3. Upload слике:");
    console.log("      - Hero > Image");
    console.log("      - Management > Profiles (3 слике)");
    console.log("   4. Публикуј промене\n");
  } catch (error) {
    console.error("❌ Грешка приликом миграције:", error);
    process.exit(1);
  }
}

// Run migration
migrateAboutPage();
