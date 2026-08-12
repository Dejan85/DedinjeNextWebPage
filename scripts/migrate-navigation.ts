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

interface LocaleString {
  _type: "localeString";
  sr: string;
  en: string;
}

interface SubItem {
  _key: string;
  title: LocaleString;
  link: string;
  icon?: string;
}

interface SubmenuItem {
  _key: string;
  title: LocaleString;
  link?: string;
  icon?: string;
  items?: SubItem[];
}

interface MainMenuItem {
  _key: string;
  title: LocaleString;
  link?: string;
  submenu?: SubmenuItem[];
}

// `title` polja su Sanity `localeString` ({_type, sr, en}) — vidi Faza 3b
// (sanity/schemas/singletons/navigation.ts) i Faza 3c/3d i18n migraciju.
// Ranija verzija ove skripte je pisala obične stringove i preko
// `createOrReplace` prepisivala već urađen i18n prevod nazad na SR-only
// (otkriveno 2026-08-12, vidi docs/PROJECT_STATUS.md Dnevnik).
function t(sr: string, en: string): LocaleString {
  return { _type: "localeString", sr, en };
}

function subItems(prefix: string, items: Array<[string, string, string]>): SubItem[] {
  return items.map(([sr, en, link], i) => ({
    _key: `${prefix}-${i}`,
    title: t(sr, en),
    link,
  }));
}

const mainMenu: MainMenuItem[] = [
  { _key: "home", title: t("ПОЧЕТНА", "HOME"), link: "/" },
  {
    _key: "o-nama",
    title: t("О НАМА", "ABOUT US"),
    submenu: [
      { _key: "o-nama-1", title: t("Реч директора", "Director's Message"), link: "/rec-direktora", icon: "fas fa-user-tie" },
      { _key: "o-nama-2", title: t("О институту", "About the Institute"), link: "/o-institutu", icon: "fas fa-building" },
      { _key: "o-nama-tim", title: t("Наш тим", "Our Team"), link: "/nas-tim", icon: "fas fa-user-md" },
      {
        _key: "o-nama-3",
        title: t("Немедицински послови", "Non-Medical Positions"),
        link: "/o-nama/nemedicinski-poslovi",
        icon: "fas fa-briefcase",
      },
      {
        _key: "o-nama-4",
        title: t("Одбори и органи Института", "Institute Boards and Bodies"),
        link: "/o-nama/odbori-i-organi-instituta",
        icon: "fas fa-users",
      },
      {
        _key: "o-nama-5",
        title: t("Здравствена акредитација Института", "Institute's Healthcare Accreditation"),
        link: "/o-nama/zdravstvena-akreditacija",
        icon: "fas fa-certificate",
      },
      { _key: "o-nama-6", title: t("Монографија Института", "Institute Monograph"), link: "#", icon: "fas fa-book" },
      { _key: "o-nama-7", title: t("Акт института", "Institute Charter"), link: "#", icon: "fas fa-file-alt" },
      { _key: "o-nama-8", title: t("Локација", "Location"), link: "/o-nama/lokacija", icon: "fas fa-map-marker-alt" },
    ],
  },
  { _key: "klinike", title: t("КЛИНИКЕ", "CLINICS"), link: "/klinike" },
  {
    _key: "za-pacijente",
    title: t("ЗА ПАЦИЈЕНТЕ", "FOR PATIENTS"),
    link: "/za-pacijente",
    submenu: [
      { _key: "zp-1", title: t("Честа питања", "FAQ"), link: "/za-pacijente/cesta-pitanja" },
      { _key: "zp-2", title: t("Амбуланте", "Outpatient Clinics"), link: "/za-pacijente/ambulante" },
      {
        _key: "zp-3",
        title: t("Информације", "Information"),
        items: subItems("zp-3-i", [
          ["Васкуларна хирургија – информације за пацијенте", "Vascular Surgery – Patient Information", "/za-pacijente/vaskularna-hirurgija"],
          ["Кардиологија – информације за пацијенте", "Cardiology – Patient Information", "/za-pacijente/kardiologija"],
          ["Обавештење за електрофизиолошке процедуре", "Notice for Electrophysiology Procedures", "/za-pacijente/elektrofizioloske-procedure"],
          ["Обавештење за електростимулативне процедуре", "Notice for Electrostimulation Procedures", "/za-pacijente/elektrostimulativne-procedure"],
        ]),
      },
      { _key: "zp-4", title: t("Пријем у болницу", "Hospital Admission"), link: "/za-pacijente/prijem" },
      { _key: "zp-5", title: t("Преоперативна припрема", "Preoperative Preparation"), link: "/za-pacijente/preoperativna-priprema" },
      {
        _key: "zp-6",
        title: t("Информације о здравственом стању пацијента", "Patient Health Status Information"),
        link: "/za-pacijente/informacije-o-stanju",
      },
      { _key: "zp-7", title: t("Кардиохируршки конзилијум", "Cardiac Surgery Council"), link: "/za-pacijente/kardiohirurski-konzilijum" },
      { _key: "zp-8", title: t("Васкуларни конзилијум", "Vascular Council"), link: "/za-pacijente/vaskularni-konzilijum" },
      {
        _key: "zp-9",
        title: t("О вашем здрављу", "About Your Health"),
        items: subItems("zp-9-i", [["План исхране", "Nutrition Plan", "/za-pacijente/plan-ishrane"]]),
      },
    ],
  },
  {
    _key: "nauka",
    title: t("НАУКА И ИСТРАЖИВАЊЕ", "SCIENCE AND RESEARCH"),
    submenu: [
      { _key: "nauka-1", title: t("NIO", "NIO"), link: "/nauka-istrazivanje/nio" },
      {
        _key: "nauka-2",
        title: t("Центар изузетних вредности", "Center of Excellence"),
        link: "/nauka-istrazivanje/centar-izuzetnih-vrednosti",
      },
      { _key: "nauka-3", title: t("SAIGE пројекат", "SAIGE Project"), link: "/nauka-istrazivanje/saige-projekat" },
      { _key: "nauka-4", title: t("Актуелности из науке", "Science News"), link: "/nauka-istrazivanje/aktuelnosti" },
      { _key: "nauka-5", title: t("Листа истраживача", "List of Researchers"), link: "/nauka-istrazivanje/lista-istrazivaca" },
      { _key: "nauka-6", title: t("CardioView3D LAB", "CardioView3D LAB"), link: "/nauka-istrazivanje/cardioview3d-lab" },
      {
        _key: "nauka-7",
        title: t("Корисни линкови", "Useful Links"),
        items: subItems("nauka-7-i", [
          ["НИТРА", "NITRA", "/nauka-istrazivanje/korisni-linkovi/nitra"],
          ["AMPREC", "AMPREC", "/nauka-istrazivanje/korisni-linkovi/amprec"],
          ["КОБСОН", "KoBSON", "/nauka-istrazivanje/korisni-linkovi/kobson"],
          ["Заједница института", "Institute Community", "/nauka-istrazivanje/korisni-linkovi/zajednica-instituta"],
        ]),
      },
      { _key: "nauka-8", title: t("Монографија Института", "Institute Monograph"), link: "/nauka-istrazivanje/monografija" },
    ],
  },
  {
    _key: "edukacija",
    title: t("ЕДУКАЦИЈА", "EDUCATION"),
    submenu: [
      { _key: "eduk-1", title: t("Едукација Институт Дедиње", "Dedinje Institute Education"), link: "/edukacija" },
      { _key: "eduk-2", title: t("KME 2024", "CME 2024"), link: "/edukacija/kme-2024" },
      { _key: "eduk-3", title: t("Едукативни програми", "Educational Programs"), link: "/edukacija/programi" },
      { _key: "eduk-4", title: t("Интерна едукација", "Internal Education"), link: "/edukacija/interna-edukacija" },
      {
        _key: "eduk-5",
        title: t("Едукација медицинских сестара и техничара", "Nurse and Technician Education"),
        link: "/edukacija/sestrinska-edukacija",
      },
      { _key: "eduk-6", title: t("Радионице", "Workshops"), link: "/edukacija/radionice" },
      { _key: "eduk-7", title: t("Конгреси", "Congresses"), link: "/edukacija/kongresi" },
      { _key: "eduk-8", title: t("Међународни конгреси", "International Congresses"), link: "/edukacija/medjunarodni-kongresi" },
    ],
  },
  {
    _key: "aktuelnosti",
    title: t("АКТУЕЛНОСТИ", "NEWS"),
    submenu: [
      { _key: "akt-1", title: t("Актуелности", "News"), link: "/aktuelnosti" },
      { _key: "akt-2", title: t("Вести", "Articles"), link: "/aktuelnosti/vesti" },
      { _key: "akt-3", title: t("Гостовања", "Media Appearances"), link: "/aktuelnosti/gostovanja" },
      { _key: "akt-4", title: t("Обавештења", "Announcements"), link: "/aktuelnosti/obavestenja" },
      { _key: "akt-5", title: t("Огласи и конкурси", "Job Ads & Tenders"), link: "/aktuelnosti/oglasi-konkursi" },
      { _key: "akt-6", title: t("Часопис Дедиње", "Dedinje Journal"), link: "/aktuelnosti/casopis-dedinje" },
      { _key: "akt-7", title: t("Информатор о раду", "Information Booklet"), link: "/aktuelnosti/informator" },
    ],
  },
  { _key: "kontakt", title: t("КОНТАКТ", "CONTACT"), link: "/kontakt" },
];

async function migrateNavigation() {
  console.log("\n🧭 MIGRACIJA NAVIGATION DOKUMENTA");
  console.log("═══════════════════════════════════════════════\n");

  try {
    // `.patch().set()` na samo `mainMenu` polju (ne `createOrReplace` celog
    // dokumenta) — čuva `footerMenu`/`enReviewed` i ostala polja dokumenta
    // netaknutim ako ikad budu popunjena van ove skripte.
    await client.createIfNotExists({ _type: "navigation", _id: "navigation" });
    const result = await client
      .patch("navigation")
      .set({ mainMenu, enReviewed: false })
      .commit();

    console.log("✅ Navigation dokument uspešno ažuriran!");
    console.log("═══════════════════════════════════════════════\n");
    console.log(`📄 Document ID: ${result._id}`);
    console.log(`🔗 Top-level stavki: ${mainMenu.length}\n`);
  } catch (error) {
    console.error("\n❌ GREŠKA PRI MIGRACIJI:\n");
    console.error(error);
    console.log("\n💡 Pokušaj ponovo sa: npm run migrate:navigation\n");
  }
}

migrateNavigation();
