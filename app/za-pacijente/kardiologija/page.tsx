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

function ComingSoon({ title }: { title: string }) {
  return (
    <div className={styles.tabContent}>
      <div className={styles.tabIntro}>
        <h2>{title}</h2>
      </div>
      <div className={styles.comingSoon}>
        <div className={styles.comingSoonIcon}>
          <i className="fas fa-tools" aria-hidden />
        </div>
        <h3>Садржај биће допуњен</h3>
        <p>
          Детаљне информације о овој процедури биће ускоро доступне.
          За питања контактирајте Call центар Института.
        </p>
      </div>
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
    content: <ComingSoon title="Катетерско затварање ПФО АСД" />,
  },
  {
    id: "koronarografija",
    label: "Коронарографија",
    image: "/images/kardiohirurgija.jpg",
    content: <ComingSoon title="Коронарографија" />,
  },
  {
    id: "perkutana-koronarna-intervencija",
    label: "Перкутана коронарна интервенција",
    image: "/images/kardiohirurgija.jpg",
    content: <ComingSoon title="Перкутана коронарна интервенција" />,
  },
  {
    id: "spirometrija",
    label: "Спирометрија",
    image: "/images/kardiohirurgija.jpg",
    content: <ComingSoon title="Спирометрија" />,
  },
  {
    id: "tavi",
    label: "ТАВИ",
    image: "/images/kardiohirurgija.jpg",
    content: <ComingSoon title="ТАВИ" />,
  },
  {
    id: "test-fizickim-opterecenjem",
    label: "Тест физичким оптерећењем",
    image: "/images/kardiohirurgija.jpg",
    content: <ComingSoon title="Тест физичким оптерећењем" />,
  },
  {
    id: "transezofagealni-eho-srca",
    label: "Трансезофагеални ехо срца",
    image: "/images/kardiohirurgija.jpg",
    content: <ComingSoon title="Трансезофагеални ехо срца" />,
  },
  {
    id: "transtorakalni-eho-srca",
    label: "Трансторакални ехо срца",
    image: "/images/kardiohirurgija.jpg",
    content: <ComingSoon title="Трансторакални ехо срца" />,
  },
  {
    id: "farmakoloski-stres-eho-test",
    label: "Фармаколошки стрес ехо тест",
    image: "/images/kardiohirurgija.jpg",
    content: <ComingSoon title="Фармаколошки стрес ехо тест" />,
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
