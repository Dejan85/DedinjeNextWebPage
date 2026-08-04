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

async function migrateCardioview3dLab() {
  console.log("\n🧊 MIGRACIJA CardioView3D LAB (probijena politika izuzetka)");
  console.log("═══════════════════════════════════════════════\n");

  const doc = {
    _type: "page",
    _id: "page-cardioview3d-lab",
    title: "CardioView3D LAB",
    slug: { _type: "slug", current: "cardioview3d-lab" },
    subtitle:
      "Три језгра лабораторије посвећене 3Д штампи, инжењерингу и брзој изради прототипова у кардиоваскуларној медицини",
    section: "nauka-istrazivanje",
    pageBuilder: [
      {
        _type: "tabsBlock",
        _key: "tabs-1",
        defaultTabId: "3d-print-core",
        tabs: [
          {
            _key: "tab-1",
            tabId: "3d-print-core",
            label: "3D Print Core",
            introHeading: "3D Print Core",
            introParagraphs: [
              "3D Print Core располаже са три врхунске машине за 3Д штампање, које пружају подршку истраживачима, клиничким студијама, као и сопственим пројектима лабораторије. Тренутна опрема укључује 3Д штампаче Ultimaker S7, Formlabs 3BL и Stratasys J5 Medi Jet.",
            ],
            introList: ["Ultimaker S7", "Formlabs 3BL", "Stratasys J5 Medi Jet"],
          },
          {
            _key: "tab-2",
            tabId: "engineering-core",
            label: "Engineering Core",
            introHeading: "Engineering Core — спој науке и технологије",
            introParagraphs: [
              "Engineering Core тим интегрише мултидисциплинарна знања из инжењеринга, медицине, хемије, физике и биологије како би развио иновативна решења за лечење кардиоваскуларних болести, као и иновативне алате и опрему са циљем олакшавања свакодневног рада медицинског и немедицинског особља. Ово језгро функционише као спона између клиничких потреба и технолошких могућности.",
            ],
            focusCards: [
              {
                _key: "fc-1",
                title: "Развој нових технологија",
                items: [
                  "Пројектовање и имплементација напредних медицинских уређаја",
                  "Сарадња са хирурзима на развоју прилагођених решења за специфичне захвате",
                ],
              },
              {
                _key: "fc-2",
                title: "Подршка клиничким истраживањима",
                items: [
                  "Техничка подршка за експерименталне студије",
                  "Израда брзих прототипова алата, уређаја и медицинске опреме",
                  "Креирање прилагођених уређаја и система за клиничка испитивања",
                ],
              },
              {
                _key: "fc-3",
                title: "Унапређење инфраструктуре",
                items: [
                  "Свакодневни рад са тимом одржавања на ревитализацији и унапређењу постојеће опреме",
                  "Консултације приликом инвестирања и куповине нове опреме",
                ],
              },
            ],
            outroParagraphs: [
              "Engineering Core тежи да постане лидер у развоју напредних инжењерских решења за кардиоваскуларну медицину, спајајући науку, технологију и клиничку праксу.",
            ],
          },
          {
            _key: "tab-3",
            tabId: "mechanical-core",
            label: "Mechanical / Rapid Prototyping Core",
            introHeading: "Mechanical/Rapid Prototyping Core",
            introParagraphs: [
              "Машинска радионица и 3Д принт лабораторија баве се израдом медицинских уређаја, алата и модела који се користе у напредној кардиоваскуларној медицини. Ова лабораторија омогућава лекарима и инжењерима да брзо пређу са идеје на функционалне прототипове.",
            ],
            focusCards: [
              {
                _key: "fc-4",
                title: "Брза израда 3Д модела",
                text: "Користимо савремене 3Д штампаче и CAD софтвер за израду прилагођених анатомских модела и прототипа медицинских алата.",
              },
              {
                _key: "fc-5",
                title: "Производња медицинских компоненти",
                text: "Развијамо специјализоване компоненте и инструменте, са фокусом на прилагођавање пацијентима.",
              },
              {
                _key: "fc-6",
                title: "Итеративно тестирање прототипова",
                text: "Сваки прототип пролази кроз више итерација како би се осигурала његова функционалност, поузданост и сигурност.",
              },
              {
                _key: "fc-7",
                title: "Контакт",
                items: ["Miljenko Subašić", "Maša Petrović"],
              },
            ],
            outroParagraphs: [
              "Циљ лабораторије је да убрза процес развоја нових медицинских технологија и омогући практична решења за свакодневну клиничку праксу.",
            ],
          },
        ],
      },
    ],
    publishedAt: new Date().toISOString(),
  };

  try {
    const result = await client.createOrReplace(doc);
    console.log("✅ CardioView3D LAB uspešno kreiran kao page dokument!");
    console.log(`📄 Document ID: ${result._id}\n`);
  } catch (error) {
    console.error("\n❌ GREŠKA PRI MIGRACIJI:\n");
    console.error(error);
    console.log("\n💡 Pokušaj ponovo sa: npm run migrate:cardioview3d-lab\n");
  }
}

migrateCardioview3dLab();
