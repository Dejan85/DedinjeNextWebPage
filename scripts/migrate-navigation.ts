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

interface SubItem {
  _key: string;
  title: string;
  link: string;
  icon?: string;
}

interface SubmenuItem {
  _key: string;
  title: string;
  link?: string;
  icon?: string;
  items?: SubItem[];
}

interface MainMenuItem {
  _key: string;
  title: string;
  link?: string;
  submenu?: SubmenuItem[];
}

function subItems(prefix: string, items: Array<[string, string]>): SubItem[] {
  return items.map(([title, link], i) => ({
    _key: `${prefix}-${i}`,
    title,
    link,
  }));
}

const mainMenu: MainMenuItem[] = [
  { _key: "home", title: "ПОЧЕТНА", link: "/" },
  {
    _key: "o-nama",
    title: "О НАМА",
    submenu: [
      { _key: "o-nama-1", title: "Реч директора", link: "/rec-direktora", icon: "fas fa-user-tie" },
      { _key: "o-nama-2", title: "О институту", link: "/o-institutu", icon: "fas fa-building" },
      { _key: "o-nama-tim", title: "Наш тим", link: "/nas-tim", icon: "fas fa-user-md" },
      {
        _key: "o-nama-3",
        title: "Немедицински послови",
        link: "/o-nama/nemedicinski-poslovi",
        icon: "fas fa-briefcase",
      },
      {
        _key: "o-nama-4",
        title: "Одбори и органи Института",
        link: "/o-nama/odbori-i-organi-instituta",
        icon: "fas fa-users",
      },
      {
        _key: "o-nama-5",
        title: "Здравствена акредитација Института",
        link: "/o-nama/zdravstvena-akreditacija",
        icon: "fas fa-certificate",
      },
      { _key: "o-nama-6", title: "Монографија Института", link: "#", icon: "fas fa-book" },
      { _key: "o-nama-7", title: "Акт института", link: "#", icon: "fas fa-file-alt" },
      { _key: "o-nama-8", title: "Локација", link: "/o-nama/lokacija", icon: "fas fa-map-marker-alt" },
    ],
  },
  { _key: "klinike", title: "КЛИНИКЕ", link: "/klinike" },
  {
    _key: "za-pacijente",
    title: "ЗА ПАЦИЈЕНТЕ",
    link: "/za-pacijente",
    submenu: [
      { _key: "zp-1", title: "Честа питања", link: "/za-pacijente/cesta-pitanja" },
      { _key: "zp-2", title: "Амбуланте", link: "/za-pacijente/ambulante" },
      {
        _key: "zp-3",
        title: "Информације",
        items: subItems("zp-3-i", [
          ["Васкуларна хирургија – информације за пацијенте", "/za-pacijente/vaskularna-hirurgija"],
          ["Кардиологија – информације за пацијенте", "/za-pacijente/kardiologija"],
          ["Обавештење за електрофизиолошке процедуре", "/za-pacijente/elektrofizioloske-procedure"],
          ["Обавештење за електростимулативне процедуре", "/za-pacijente/elektrostimulativne-procedure"],
        ]),
      },
      { _key: "zp-4", title: "Пријем у болницу", link: "/za-pacijente/prijem" },
      { _key: "zp-5", title: "Преоперативна припрема", link: "/za-pacijente/preoperativna-priprema" },
      {
        _key: "zp-6",
        title: "Информације о здравственом стању пацијента",
        link: "/za-pacijente/informacije-o-stanju",
      },
      { _key: "zp-7", title: "Кардиохируршки конзилијум", link: "/za-pacijente/kardiohirurski-konzilijum" },
      { _key: "zp-8", title: "Васкуларни конзилијум", link: "/za-pacijente/vaskularni-konzilijum" },
      {
        _key: "zp-9",
        title: "О вашем здрављу",
        items: subItems("zp-9-i", [["План исхране", "/za-pacijente/plan-ishrane"]]),
      },
    ],
  },
  {
    _key: "nauka",
    title: "НАУКА И ИСТРАЖИВАЊЕ",
    submenu: [
      { _key: "nauka-1", title: "NIO", link: "/nauka-istrazivanje/nio" },
      {
        _key: "nauka-2",
        title: "Центар изузетних вредности",
        link: "/nauka-istrazivanje/centar-izuzetnih-vrednosti",
      },
      { _key: "nauka-3", title: "SAIGE пројекат", link: "/nauka-istrazivanje/saige-projekat" },
      { _key: "nauka-4", title: "Актуелности из науке", link: "/nauka-istrazivanje/aktuelnosti" },
      { _key: "nauka-5", title: "Листа истраживача", link: "/nauka-istrazivanje/lista-istrazivaca" },
      { _key: "nauka-6", title: "CardioView3D LAB", link: "/nauka-istrazivanje/cardioview3d-lab" },
      {
        _key: "nauka-7",
        title: "Корисни линкови",
        items: subItems("nauka-7-i", [
          ["НИТРА", "/nauka-istrazivanje/korisni-linkovi/nitra"],
          ["AMPREC", "/nauka-istrazivanje/korisni-linkovi/amprec"],
          ["КОБСОН", "/nauka-istrazivanje/korisni-linkovi/kobson"],
          ["Заједница института", "/nauka-istrazivanje/korisni-linkovi/zajednica-instituta"],
        ]),
      },
      { _key: "nauka-8", title: "Монографија Института", link: "/nauka-istrazivanje/monografija" },
    ],
  },
  {
    _key: "edukacija",
    title: "ЕДУКАЦИЈА",
    submenu: [
      { _key: "eduk-1", title: "Едукација Институт Дедиње", link: "/edukacija" },
      { _key: "eduk-2", title: "KME 2024", link: "/edukacija/kme-2024" },
      { _key: "eduk-3", title: "Едукативни програми", link: "/edukacija/programi" },
      { _key: "eduk-4", title: "Интерна едукација", link: "/edukacija/interna-edukacija" },
      {
        _key: "eduk-5",
        title: "Едукација медицинских сестара и техничара",
        link: "/edukacija/sestrinska-edukacija",
      },
      { _key: "eduk-6", title: "Радионице", link: "/edukacija/radionice" },
      { _key: "eduk-7", title: "Конгреси", link: "/edukacija/kongresi" },
      { _key: "eduk-8", title: "Међународни конгреси", link: "/edukacija/medjunarodni-kongresi" },
    ],
  },
  {
    _key: "aktuelnosti",
    title: "АКТУЕЛНОСТИ",
    submenu: [
      { _key: "akt-1", title: "Актуелности", link: "/aktuelnosti" },
      { _key: "akt-2", title: "Вести", link: "/aktuelnosti/vesti" },
      { _key: "akt-3", title: "Гостовања", link: "/aktuelnosti/gostovanja" },
      { _key: "akt-4", title: "Обавештења", link: "/aktuelnosti/obavestenja" },
      { _key: "akt-5", title: "Огласи и конкурси", link: "/aktuelnosti/oglasi-konkursi" },
      { _key: "akt-6", title: "Часопис Дедиње", link: "/aktuelnosti/casopis-dedinje" },
      { _key: "akt-7", title: "Информатор о раду", link: "/aktuelnosti/informator" },
    ],
  },
  { _key: "kontakt", title: "КОНТАКТ", link: "/kontakt" },
];

async function migrateNavigation() {
  console.log("\n🧭 MIGRACIJA NAVIGATION DOKUMENTA");
  console.log("═══════════════════════════════════════════════\n");

  try {
    const navigation = {
      _type: "navigation",
      _id: "navigation",
      mainMenu,
    };

    console.log("📝 Kreiranje Navigation dokumenta...\n");
    const result = await client.createOrReplace(navigation);

    console.log("✅ Navigation dokument uspešno kreiran!");
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
