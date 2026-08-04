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

const lokacija = {
  _type: "page",
  _id: "page-lokacija",
  title: "Локација Института",
  slug: { _type: "slug", current: "lokacija" },
  subtitle: "Како доћи до Института за кардиоваскуларне болести Дедиње",
  section: "ostalo",
  pageBuilder: [
    {
      _type: "cardGridBlock",
      _key: "cg-1",
      heading: "Како до нас",
      subtitle: "Доступне опције јавног и приватног превоза",
      cards: [
        { _key: "c-1", icon: "fas fa-bus", title: "Аутобус", value: "Линије 37, 58, 59", description: 'Станица "Дедиње" — директно испред Института' },
        { _key: "c-2", icon: "fas fa-train-tram", title: "Трамвај", value: "Линије 3, 12", description: 'Станица "Топчидерска звезда" — 10 минута пешице' },
        { _key: "c-3", icon: "fas fa-car", title: "Аутомобил", value: "Паркинг доступан", description: "Бесплатан паркинг у кругу Института за пацијенте" },
        { _key: "c-4", icon: "fas fa-taxi", title: "Такси", value: "Све такси службе", description: "Адреса: Хероја Милана Тепића бр. 1, 11040 Београд" },
      ],
    },
    {
      _type: "bannerBlock",
      _key: "bb-1",
      variant: "highlight",
      icon: "fas fa-parking",
      title: "Паркинг за пацијенте",
      text: "Бесплатан паркинг простор је доступан у кругу Института. За пацијенте који долазе на хируршке интервенције, обезбеђен је паркинг у непосредној близини главног улаза.",
    },
  ],
  publishedAt: new Date().toISOString(),
};

const nemedicinskiPoslovi = {
  _type: "page",
  _id: "page-nemedicinski-poslovi",
  title: "Немедицински послови",
  slug: { _type: "slug", current: "nemedicinski-poslovi" },
  subtitle: "Организационе јединице за административну, финансијску, правну и техничку подршку раду Института",
  section: "ostalo",
  pageBuilder: [
    {
      _type: "introSection",
      _key: "is-1",
      icon: "fas fa-building-columns",
      heading: "Подршка медицинском раду",
      paragraphs: [
        "Немедицинске службе Института обезбеђују несметано функционисање свих пословних процеса — од финансија и јавних набавки, преко правних послова, до техничког одржавања и информационих технологија. Професионалан рад ових служби омогућава лекарима и медицинском особљу да се у потпуности посвете пацијентима.",
      ],
    },
    {
      _type: "bannerBlock",
      _key: "bb-1",
      variant: "highlight",
      icon: "fas fa-user-tie",
      title: "Помоћник директора за немедицинске послове — Бојана Поповић, маст.екон.",
      text: "Телефон: (+381 11) 3601 806 · Е-пошта: bojana.popovic@ikvbd.com",
    },
    {
      _type: "cardGridBlock",
      _key: "cg-1",
      heading: "Организационе јединице",
      subtitle: "Службе и одељења за подршку пословању",
      cards: [
        { _key: "c-1", icon: "fas fa-coins", title: "Економско финансијски послови", description: "Финансијско планирање, буџетирање, рачуноводство и економска контрола пословања Института", contactPerson: "Божинка Томашевић, дипл.екон.", phone: "(+381 11) 3601 612", email: "racunovodstvo@ikvbd.com" },
        { _key: "c-2", icon: "fas fa-file-contract", title: "Служба јавних набавки", description: "Спровођење поступака јавних набавки у складу са законском регулативом", contactPerson: "Драгица Скочић, дипл. инж.", phone: "(+381 11) 3601 606", email: "dragica@ikvbd.com" },
        { _key: "c-3", icon: "fas fa-scale-balanced", title: "Правна служба", description: "Правни послови, нормативна акта, радни односи и заступање Института", contactPerson: "Наташа Елезовић, дипл. прав.", phone: "(+381 11) 3601 700", email: "elezovic.natasa@ikvbd.com" },
        { _key: "c-4", icon: "fas fa-wrench", title: "Техничка служба", description: "Одржавање техничких система, инфраструктуре и медицинске опреме", contactPerson: "Александар Томић, дипл. инж.", phone: "(+381 11) 3601 735", email: "tehnickasluzba@ikvbd.com" },
        { _key: "c-5", icon: "fas fa-server", title: "Рачунарски центар", description: "ИТ инфраструктура, информациони системи и техничка подршка", contactPerson: "Ненад Петковић, инж.", phone: "(+381 11) 3601 691", email: "racunarski.centar@institutdedinje.org" },
      ],
    },
  ],
  publishedAt: new Date().toISOString(),
};

const odboriIOrgani = {
  _type: "page",
  _id: "page-odbori-i-organi-instituta",
  title: "Одбори и органи Института",
  slug: { _type: "slug", current: "odbori-i-organi-instituta" },
  subtitle: "Управни, стручни, надзорни и етички органи који обезбеђују ефикасно управљање и квалитетну здравствену негу",
  section: "ostalo",
  pageBuilder: [
    {
      _type: "introSection",
      _key: "is-1",
      icon: "fas fa-university",
      heading: "Организација управљања",
      paragraphs: [
        'Институти за здравствену негу, као што је Институт за кардиоваскуларне болести „Дедиње", обично организују своје активности путем различитих органа и одбора како би обезбедили ефикасно управљање, доношење одлука и пружање висококвалитетне здравствене неге.',
      ],
      stats: [
        { _key: "s-1", value: "4", label: "Органа и одбора" },
        { _key: "s-2", value: "25+", label: "Чланова укупно" },
        { _key: "s-3", value: "4", label: "Области надлежности" },
      ],
    },
    {
      _type: "boardListBlock",
      _key: "bl-1",
      heading: "Органи и одбори",
      subtitle: "Кликните на одбор за детаљне информације о саставу",
      boards: [
        {
          _key: "board-1",
          icon: "fas fa-landmark",
          title: "Управни одбор Института",
          chairman: { name: "Академик проф. др Јован Хаџи-Ђокић", role: "Председник Управног одбора" },
          membersLabel: "Чланови",
          members: [
            { _key: "m-1", name: "Проф. др Марија Јовић", role: "Факултет организационих наука Универзитета у Београду" },
            { _key: "m-2", name: "Др Драган Велић", role: "дипл. прав. из Београда" },
            { _key: "m-3", name: 'Доц. др Бранко Лозук, НС', role: 'Институт за кардиоваскуларне болести „Дедиње"' },
            { _key: "m-4", name: 'Клин. асист. др Горан Лончар, ВНС', role: 'Институт за кардиоваскуларне болести „Дедиње"' },
          ],
        },
        {
          _key: "board-2",
          icon: "fas fa-user-graduate",
          title: "Стручни савет Института",
          chairman: { name: "Проф. др Александра Николић", role: "Председник Стручног савета" },
          viceChairman: { name: "Доц. др Милан Добрић", role: "Заменик председника" },
          membersLabel: "Чланови Стручног савета",
          members: [
            { _key: "m-1", name: "Др Саша Хинић" },
            { _key: "m-2", name: "Др Милан Ћирковић" },
            { _key: "m-3", name: "Др Сандра Гајић" },
            { _key: "m-4", name: "Доц. др Предраг Матић" },
            { _key: "m-5", name: "Клин. асист. др Иван Илић" },
            { _key: "m-6", name: "Др Драгана Кошевић" },
            { _key: "m-7", name: "Зорица Васић", role: "Главна сестра Института" },
          ],
        },
        {
          _key: "board-3",
          icon: "fas fa-eye",
          title: "Надзорни одбор Института",
          chairman: { name: "Светозар Ћапин", role: "Председник Надзорног одбора, дипл. машински инжењер из Београда" },
          membersLabel: "Чланови",
          members: [
            { _key: "m-1", name: "Нађа Баранин", role: "дипл. економиста из Београда" },
            { _key: "m-2", name: "Др Дражен Јелача", role: "Општа болница Панчево" },
            { _key: "m-3", name: 'Доц. др Ивана Петровић, НС', role: 'Институт за кардиоваскуларне болести „Дедиње"' },
            { _key: "m-4", name: 'Доц. др Слободан Танасковић, ВНС', role: 'Институт за кардиоваскуларне болести „Дедиње"' },
          ],
        },
        {
          _key: "board-4",
          icon: "fas fa-scale-balanced",
          title: "Етички одбор Института",
          chairman: { name: "Др Синиша Јагодић", role: "Председник Етичког одбора" },
          viceChairman: { name: "Доц. др Предраг Гајин", role: "Заменик председника" },
          membersLabel: "Чланови Етичког одбора",
          members: [
            { _key: "m-1", name: "Др Владимир Ковачевић" },
            { _key: "m-2", name: "Др Велибор Ристић" },
            { _key: "m-3", name: "Др Милан Вуковић" },
            { _key: "m-4", name: "Клин. асист. др Саша Боровић" },
            { _key: "m-5", name: "Др Анита Поповић" },
            { _key: "m-6", name: "Др Љубомир Ђоковић" },
            { _key: "m-7", name: "Наташа Елезовић", role: "дипл. прав." },
          ],
        },
      ],
    },
  ],
  publishedAt: new Date().toISOString(),
};

const zdravstvenaAkreditacija = {
  _type: "page",
  _id: "page-zdravstvena-akreditacija",
  title: "Здравствена акредитација Института",
  slug: { _type: "slug", current: "zdravstvena-akreditacija" },
  subtitle: "Континуирано унапређење квалитета и безбедности здравствене заштите",
  section: "ostalo",
  pageBuilder: [
    {
      _type: "introSection",
      _key: "is-1",
      icon: "fas fa-certificate",
      heading: "Акредитација као гаранција квалитета",
      paragraphs: [
        'Здравствена акредитација је поступак процене квалитета рада здравствене установе, који спроводи Агенција за акредитацију здравствених установа Србије. Институт за кардиоваскуларне болести „Дедиње" континуирано ради на унапређењу стандарда квалитета и безбедности пацијената, у складу са националним и међународним смерницама.',
      ],
    },
    {
      _type: "bannerBlock",
      _key: "bb-1",
      variant: "info",
      icon: "fas fa-landmark",
      title: "Агенција за акредитацију здравствених установа Србије",
      text: "Независно тело надлежно за процену и акредитацију здравствених установа",
    },
    {
      _type: "cardGridBlock",
      _key: "cg-1",
      heading: "Агенција и координатори",
      subtitle: "Надлежна агенција и одговорна лица за процес акредитације",
      cards: [
        { _key: "c-1", icon: "fas fa-crown", title: "Проф. др Александра Николић", description: "Координатор за здравствену акредитацију" },
        { _key: "c-2", icon: "fas fa-star", title: "СМТ Далибор Аксић", description: "Заменик координатора за акредитацију" },
      ],
    },
    {
      _type: "documentListBlock",
      _key: "dl-1",
      heading: "Документација",
      subtitle: "Документи везани за процес акредитације",
      items: [
        { _key: "d-1", icon: "fas fa-file-pdf", label: "Тимови и чланови тима", href: "#" },
        { _key: "d-2", icon: "fas fa-file-pdf", label: "Општи утисак оцењивача", href: "#" },
      ],
    },
  ],
  publishedAt: new Date().toISOString(),
};

async function migrateONama() {
  console.log("\n🏛️ MIGRACIJA O NAMA (4 podstranice)");
  console.log("═══════════════════════════════════════════════\n");

  const docs: { doc: { _id: string; _type: string } & Record<string, unknown>; label: string }[] = [
    { doc: lokacija, label: "Локација" },
    { doc: nemedicinskiPoslovi, label: "Немедицински послови" },
    { doc: odboriIOrgani, label: "Одбори и органи Института" },
    { doc: zdravstvenaAkreditacija, label: "Здравствена акредитација Института" },
  ];

  for (const { doc, label } of docs) {
    try {
      const result = await client.createOrReplace(doc);
      console.log(`✅ ${label} → ${result._id}`);
    } catch (error) {
      console.error(`\n❌ GREŠKA (${label}):\n`, error);
    }
  }

  console.log("\n═══════════════════════════════════════════════");
  console.log("✨ MIGRACIJA O NAMA ZAVRŠENA\n");
}

migrateONama();
