import { Container, PageHeader, Section, SidebarTabs } from "@/components/shared";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

export { generateMetadata };

function InfoBlock({
  icon,
  question,
  children,
}: {
  icon: string;
  question: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.infoBlock}>
      <div className={styles.infoBlockHeader}>
        <span className={styles.infoBlockIcon}>
          <i className={icon} aria-hidden />
        </span>
        <h3>{question}</h3>
      </div>
      <div className={styles.infoBlockBody}>{children}</div>
    </div>
  );
}

const KARDIOLOGIJA_TABS = [
  {
    id: "katetersko-zatvaranje-aurikule",
    label: "Катетерско затварање аурикуле леве преткоморе",
    image: "/images/kardiohirurgija.jpg",
    content: (
      <div className={styles.tabContent}>
        <div className={styles.tabIntro}>
          <h2>Катетерско затварање аурикуле леве преткоморе</h2>
          <p>
            Циљ ове процедуре је превенција можданог удара код пацијената са
            атријалном фибрилацијом (АФ) код којих је примена оралне
            антикоагулантне терапије контраиндикована.
          </p>
        </div>

        <div className={styles.blocksGrid}>
          <InfoBlock icon="fas fa-heart-pulse" question="Шта је атријална фибрилација?">
            <p>
              АФ је кардиолошко стање са убрзаним и неправилним радом срца.
              Може резултирати задржавањем крви и формирањем тромба у
              аурикули леве преткоморе.
            </p>
          </InfoBlock>

          <InfoBlock icon="fas fa-heart" question="Шта је аурикула леве преткоморе?">
            <p>
              Мали наставак на преткомори, величине палца — врста слепе
              улице где се крв задржава код пацијената са АФ и потенцијално
              стварају крвни угрушци.
            </p>
          </InfoBlock>

          <InfoBlock icon="fas fa-brain" question="Како долази до можданог удара?">
            <p>
              Угрушак се може одвојити, путовати крвотоком ка мозгу и
              запушити артерију — изазивајући мождани удар. Антикоагуланси
              смањују ризик, али нису погодни за све пацијенте.
            </p>
          </InfoBlock>

          <InfoBlock icon="fas fa-circle-dot" question="Шта је уређај за затварање аурикуле?">
            <p>
              Трајни имплантат на улазу аурикуле, направљен од материјала
              сличних стентовима. Онемогућава угрушцима улаз у крвоток и
              спречава мождани удар.
            </p>
          </InfoBlock>

          <InfoBlock icon="fas fa-procedures" question="Како функционише процедура?">
            <p>
              У тоталној анестезији, 45–60 мин. Катетер се уводи кроз вену у
              препони. Лекар мери аурикулу, поставља уређај одговарајуће
              величине, верификује положај и ослобађа га за трајну уградњу.
              Опоравак — 24 сата.
            </p>
          </InfoBlock>

          <InfoBlock icon="fas fa-calendar-check" question="Шта се догађа након имплантације?">
            <p>
              Пацијент добија антикоагулантну или антитромбоцитну терапију.
              Неколико недеља касније долази на контролу са ултразвучним
              снимањем срца. На основу резултата лекар прилагођава терапију.
            </p>
          </InfoBlock>

          <InfoBlock icon="fas fa-globe" question="Да ли је овај поступак уобичајен?">
            <p>
              Примењује се од 2003. године и изведен је код преко 150.000
              пацијената широм света. Протокол је униформан и поткрепљен
              клиничким подацима.
            </p>
          </InfoBlock>

          <InfoBlock icon="fas fa-triangle-exclamation" question="Могући ризици">
            <p>
              Као и код сваке интервенције, могу се јавити: хематоми,
              аритмије, тампонада срца. У изнимним случајевима — летални
              исход. Лекар ће детаљно разговарати о свим ризицима.
            </p>
          </InfoBlock>
        </div>
      </div>
    ),
  },
  {
    id: "katetersko-zatvaranje-pfo-asd",
    label: "Катетерско затварање ПФО АСД",
    image: "/images/kardiohirurgija.jpg",
    content: (
      <div className={styles.tabContent}>
        <div className={styles.tabIntro}>
          <h2>Катетерско затварање ПФО и АСД</h2>
          <p>
            Инвазивна кардиолошка метода којом се затвара отвор између
            преткомора срца — форамен овале (ПФО) или атријални септални
            дефект (АСД).
          </p>
        </div>

        <div className={styles.blocksGrid}>
          <InfoBlock icon="fas fa-question-circle" question="Зашто се ради ова процедура?">
            <p>
              Процедура спречава мождани удар код пацијената са пролазним
              форамен овале или атријалним септалним дефектом, тако што
              онемогућава пролазак крвних угрушака кроз отвор.
            </p>
          </InfoBlock>

          <InfoBlock icon="fas fa-procedures" question="Како се изводи процедура?">
            <p>
              Катетер се уводи кроз артерију у препони, а под контролом
              ултразвука поставља се затварач преко дефекта. Процедура траје
              око 30 минута и изводи се без опште анестезије.
            </p>
          </InfoBlock>

          <InfoBlock icon="fas fa-triangle-exclamation" question="Могући ризици">
            <p>
              Поремећаји срчаног ритма, крварење, оштећење крвног суда,
              инфекција или померање уређаја.
            </p>
          </InfoBlock>

          <InfoBlock icon="fas fa-calendar-check" question="Шта се дешава после процедуре?">
            <p>
              Боравак у болници траје 24 часа, уз антикоагулантну терапију у
              наредних најмање 6 месеци. Контролни ултразвук срца заказује се
              између 30. дана и 6. месеца након процедуре.
            </p>
          </InfoBlock>
        </div>
      </div>
    ),
  },
  {
    id: "koronarografija",
    label: "Коронарографија",
    image: "/images/kardiohirurgija.jpg",
    content: (
      <div className={styles.tabContent}>
        <div className={styles.tabIntro}>
          <h2>Коронарографија</h2>
          <p>
            Дијагностичка процедура снимања крвних судова срца ради откривања
            сужења коронарних артерија.
          </p>
        </div>

        <div className={styles.blocksGrid}>
          <InfoBlock icon="fas fa-question-circle" question="Зашто се ради ова процедура?">
            <p>
              Утврђује степен и распоред коронарне болести и усмерава даљу
              одлуку о лечењу — медикаментозном, интервентном или хируршком.
            </p>
          </InfoBlock>

          <InfoBlock icon="fas fa-procedures" question="Како се изводи процедура?">
            <p>
              Иглом се пунктира крвни суд на руци или препони, кроз који се
              катетером долази до коронарних артерија, убризгава контраст и
              снима њихов ток. Процедура траје 10-15 минута.
            </p>
          </InfoBlock>

          <InfoBlock icon="fas fa-triangle-exclamation" question="Могући ризици">
            <p>
              Алергијска реакција на контраст, мождани удар, инфаркт,
              попуштање бубрега, крварење — учесталост компликација око 0,7%.
            </p>
          </InfoBlock>

          <InfoBlock icon="fas fa-calendar-check" question="Шта се дешава после процедуре?">
            <p>
              Пацијент се отпушта истог или наредног дана. Уколико је приступ
              био преко зглоба, поставља се компресивна нарукавица; уколико је
              приступ био преко препоне, врши се ручна компресија места убода.
            </p>
          </InfoBlock>
        </div>
      </div>
    ),
  },
  {
    id: "perkutana-koronarna-intervencija",
    label: "Перкутана коронарна интервенција",
    image: "/images/kardiohirurgija.jpg",
    content: (
      <div className={styles.tabContent}>
        <div className={styles.tabIntro}>
          <h2>Перкутана коронарна интервенција (ПЦИ)</h2>
          <p>
            Терапијска интервенција којом се уклања сужење коронарне артерије
            уз помоћ балона и/или стента.
          </p>
        </div>

        <div className={styles.blocksGrid}>
          <InfoBlock icon="fas fa-question-circle" question="Зашто се ради ова процедура?">
            <p>
              Успоставља проток крви кроз сужену коронарну артерију,
              смањујући бол у грудима и ризик од инфаркта миокарда.
            </p>
          </InfoBlock>

          <InfoBlock icon="fas fa-procedures" question="Како се изводи процедура?">
            <p>
              Слично коронарографији — балоном се шири сужено место, а затим
              се поставља стент. Процедура траје у просеку око 45 минута.
            </p>
          </InfoBlock>

          <InfoBlock icon="fas fa-triangle-exclamation" question="Могући ризици">
            <p>
              Учесталост компликација око 3% — поремећаји ритма, мождани
              удар, инфаркт, оштећење бубрега, крварење; смртност око 0,05%.
            </p>
          </InfoBlock>

          <InfoBlock icon="fas fa-calendar-check" question="Шта се дешава после процедуре?">
            <p>
              Уводи се антиагрегациона терапија, пацијент се прати 24 часа, а
              даље праћење се одвија по упутству кардиолога.
            </p>
          </InfoBlock>
        </div>
      </div>
    ),
  },
  {
    id: "spirometrija",
    label: "Спирометрија",
    image: "/images/kardiohirurgija.jpg",
    content: (
      <div className={styles.tabContent}>
        <div className={styles.tabIntro}>
          <h2>Спирометрија</h2>
          <p>Основни тест којим се почиње испитивање дисајне функције.</p>
        </div>

        <div className={styles.blocksGrid}>
          <InfoBlock icon="fas fa-question-circle" question="Зашто се ради овај тест?">
            <p>
              Процењује функцију дисања, одређује потребу за даљим
              испитивањима и прати ток болести плућа.
            </p>
          </InfoBlock>

          <InfoBlock icon="fas fa-procedures" question="Како се изводи тест?">
            <p>
              Пацијент удише и снажно издише ваздух у спирометар, а уређај
              одмах бележи и штампа резултате мерења.
            </p>
          </InfoBlock>

          <InfoBlock icon="fas fa-triangle-exclamation" question="Могући ризици">
            <p>
              Ретки — пролазни осећај недостатка ваздуха или вртоглавица.
              Тест је контраиндикован непосредно после инфаркта миокарда или
              веће операције.
            </p>
          </InfoBlock>

          <InfoBlock icon="fas fa-calendar-check" question="Шта се дешава после теста?">
            <p>
              Лекар тумачи резултате истог дана, а пацијент добија одштампан
              налаз.
            </p>
          </InfoBlock>
        </div>
      </div>
    ),
  },
  {
    id: "tavi",
    label: "ТАВИ",
    image: "/images/kardiohirurgija.jpg",
    content: (
      <div className={styles.tabContent}>
        <div className={styles.tabIntro}>
          <h2>ТАВИ — транскатетерска имплантација аортног залиска</h2>
          <p>
            Минимално инвазивна процедура уградње вештачког залиска унутар
            суженог аортног залиска.
          </p>
        </div>

        <div className={styles.blocksGrid}>
          <InfoBlock icon="fas fa-question-circle" question="Зашто се ради ова процедура?">
            <p>
              Лечи тешку аортну стенозу, побољшавајући рад срца и квалитет
              живота пацијента, код кога отворена хируршка замена залиска
              носи висок ризик.
            </p>
          </InfoBlock>

          <InfoBlock icon="fas fa-procedures" question="Како се изводи процедура?">
            <p>
              Катетер се уводи кроз артерију у препони и под рендгенском
              контролом доноси вештачки залистак до срца, где се позиционира
              и отвара. Процедура траје 1-2 часа.
            </p>
          </InfoBlock>

          <InfoBlock icon="fas fa-triangle-exclamation" question="Могући ризици">
            <p>
              Поремећај ритма (10-20%), потреба за пејсмејкером (5-10%),
              крварење (5%), мождани удар (3%), смртност испод 1%.
            </p>
          </InfoBlock>

          <InfoBlock icon="fas fa-calendar-check" question="Шта се дешава после процедуре?">
            <p>
              Боравак у болници траје 48-72 часа. Пацијент добија терапију и
              детаљна упутства за опоравак приликом отпуста.
            </p>
          </InfoBlock>
        </div>
      </div>
    ),
  },
  {
    id: "test-fizickim-opterecenjem",
    label: "Тест физичким оптерећењем",
    image: "/images/kardiohirurgija.jpg",
    content: (
      <div className={styles.tabContent}>
        <div className={styles.tabIntro}>
          <h2>Тест физичким оптерећењем (ергометрија)</h2>
          <p>
            Испитаник хода по покретној траци која свака три минута мења
            брзину и нагиб.
          </p>
        </div>

        <div className={styles.blocksGrid}>
          <InfoBlock icon="fas fa-question-circle" question="Зашто се ради овај тест?">
            <p>
              Процењује одговор срца на физички напор и открива знаке
              исхемије или поремећаја срчаног ритма изазване напором.
            </p>
          </InfoBlock>

          <InfoBlock icon="fas fa-procedures" question="Како се изводи тест?">
            <p>
              Током целог теста прате се ЕКГ и крвни притисак. Тест се
              наставља до постизања циљне срчане фреквенце (85% од
              максималне предвиђене) или до појаве симптома.
            </p>
          </InfoBlock>

          <InfoBlock icon="fas fa-triangle-exclamation" question="Могући ризици">
            <p>
              Ниског ризика — могу се јавити пад притиска, поремећаји ритма
              или, изузетно ретко, инфаркт.
            </p>
          </InfoBlock>

          <InfoBlock icon="fas fa-calendar-check" question="Шта се дешава после теста?">
            <p>
              Резултати са ЕКГ записима доступни су одмах, а налаз се
              оверава на шалтеру амбулантне службе.
            </p>
          </InfoBlock>
        </div>
      </div>
    ),
  },
  {
    id: "transezofagealni-eho-srca",
    label: "Трансезофагеални ехо срца",
    image: "/images/kardiohirurgija.jpg",
    content: (
      <div className={styles.tabContent}>
        <div className={styles.tabIntro}>
          <h2>Трансезофагеални ехо срца (ТЕЕ)</h2>
          <p>
            Минимално инвазивна дијагностичка метода код које се сонда за
            ултразвук уводи кроз једњак ради детаљног приказа срца.
          </p>
        </div>

        <div className={styles.blocksGrid}>
          <InfoBlock icon="fas fa-question-circle" question="Зашто се ради ова процедура?">
            <p>
              Приказује структуре које се слабо виде приликом стандардног
              прегледа преко грудног коша — аурикулу леве преткоморе, плућне
              вене, аорту — и повећава дијагностичку прецизност.
            </p>
          </InfoBlock>

          <InfoBlock icon="fas fa-procedures" question="Како се изводи процедура?">
            <p>
              Сонда се уз седацију уводи кроз једњак, чиме се добијају детаљни
              прикази срца из непосредне близине.
            </p>
          </InfoBlock>

          <InfoBlock icon="fas fa-triangle-exclamation" question="Могући ризици">
            <p>
              Нелагодност у грлу, отежано дисање, поремећаји ритма, повреда
              једњака, крварење, изузетно ретко застој срца.
            </p>
          </InfoBlock>

          <InfoBlock icon="fas fa-calendar-check" question="Шта се дешава после процедуре?">
            <p>
              Пацијент се прати одређено време ради опоравка од седације пре
              него што напусти установу.
            </p>
          </InfoBlock>
        </div>
      </div>
    ),
  },
  {
    id: "transtorakalni-eho-srca",
    label: "Трансторакални ехо срца",
    image: "/images/kardiohirurgija.jpg",
    content: (
      <div className={styles.tabContent}>
        <div className={styles.tabIntro}>
          <h2>Трансторакални ехо срца (ТТЕ)</h2>
          <p>
            Неинвазивна ултразвучна метода приказа срца, сонда се поставља на
            зид грудног коша.
          </p>
        </div>

        <div className={styles.blocksGrid}>
          <InfoBlock icon="fas fa-question-circle" question="Зашто се ради ова процедура?">
            <p>
              Процењује величину срца, снагу срчаног мишића, функцију
              залистака и димензије крвних судова.
            </p>
          </InfoBlock>

          <InfoBlock icon="fas fa-procedures" question="Како се изводи процедура?">
            <p>
              Пацијент се позиционира на левом боку, сонда се приљубљује уз
              грудни кош, а слике срца добијају се у реалном времену.
            </p>
          </InfoBlock>

          <InfoBlock icon="fas fa-shield-heart" question="Могући ризици">
            <p>Прегледом се не наносе никакви ризици по пацијента.</p>
          </InfoBlock>

          <InfoBlock icon="fas fa-calendar-check" question="Шта се дешава после прегледа?">
            <p>
              Резултати се тумаче одмах по завршетку прегледа, без потребе за
              периодом опоравка.
            </p>
          </InfoBlock>
        </div>
      </div>
    ),
  },
  {
    id: "farmakoloski-stres-eho-test",
    label: "Фармаколошки стрес ехо тест",
    image: "/images/kardiohirurgija.jpg",
    content: (
      <div className={styles.tabContent}>
        <div className={styles.tabIntro}>
          <h2>Фармаколошки стрес ехо тест</h2>
          <p>
            Лековима изазвано оптерећење срца комбиновано са ултразвучним
            прегледом, намењено пацијентима који не могу да изведу физичко
            оптерећење.
          </p>
        </div>

        <div className={styles.blocksGrid}>
          <InfoBlock icon="fas fa-question-circle" question="Зашто се ради овај тест?">
            <p>
              Процењује функцију срца и стање залистака, испитује сужења
              коронарних артерија и помаже у одлуци о потреби за
              интервенцијом.
            </p>
          </InfoBlock>

          <InfoBlock icon="fas fa-procedures" question="Како се изводи тест?">
            <p>
              Лековима се убрзава рад срца и тиме имитира физички напор.
              Поставља се венска линија, дају се лекови уз праћење срчане
              фреквенце и притиска. Тест укупно траје око сат времена.
            </p>
          </InfoBlock>

          <InfoBlock icon="fas fa-triangle-exclamation" question="Могући ризици">
            <p>
              Ниског ризика у контролисаним условима — ретко бол у грудима,
              поремећаји ритма или, изузетно ретко, инфаркт.
            </p>
          </InfoBlock>

          <InfoBlock icon="fas fa-calendar-check" question="Шта се дешава после теста?">
            <p>
              Пацијент се прати 30 минута након теста, по потреби прима лек
              за прекид дејства, а венска линија се уклања након 30 минута.
              Резултати се тумаче и оверавају истог дана.
            </p>
          </InfoBlock>
        </div>
      </div>
    ),
  },
];

export default function KardiologijaZaPacijentePage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "За пацијенте", href: "/za-pacijente" },
          { label: "Кардиологија" },
        ]}
        title="Кардиологија"
        subtitle="Информације за пацијенте"
      />

      <Section padding="medium" background="gray">
        <Container>
          <SidebarTabs tabs={KARDIOLOGIJA_TABS} defaultTab="katetersko-zatvaranje-aurikule" />
        </Container>
      </Section>
    </>
  );
}
