import { Container, PageHeader, Section, TabbedPanel } from "@/components/shared";
import { Heading, Text } from "@/components/typography";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

export { generateMetadata };

export default function Cardioview3dLabPage() {
  const tabs = [
    {
      id: "3d-print-core",
      label: "3D Print Core",
      content: (
        <div className={styles.tabContent}>
          <Heading variant="h2" text="3D Print Core" />
          <Text
            variant="body"
            text="3D Print Core располаже са три врхунске машине за 3Д штампање, које пружају подршку истраживачима, клиничким студијама, као и сопственим пројектима лабораторије. Тренутна опрема укључује 3Д штампаче Ultimaker S7, Formlabs 3BL и Stratasys J5 Medi Jet."
          />
          <ul className={styles.list}>
            <li>Ultimaker S7</li>
            <li>Formlabs 3BL</li>
            <li>Stratasys J5 Medi Jet</li>
          </ul>
        </div>
      ),
    },
    {
      id: "engineering-core",
      label: "Engineering Core",
      content: (
        <div className={styles.tabContent}>
          <Heading variant="h2" text="Engineering Core — спој науке и технологије" />
          <Text
            variant="body"
            text="Engineering Core тим интегрише мултидисциплинарна знања из инжењеринга, медицине, хемије, физике и биологије како би развио иновативна решења за лечење кардиоваскуларних болести, као и иновативне алате и опрему са циљем олакшавања свакодневног рада медицинског и немедицинског особља. Ово језгро функционише као спона између клиничких потреба и технолошких могућности."
          />
          <div className={styles.focusGrid}>
            <div className={styles.focusCard}>
              <h4>Развој нових технологија</h4>
              <ul className={styles.list}>
                <li>Пројектовање и имплементација напредних медицинских уређаја</li>
                <li>Сарадња са хирурзима на развоју прилагођених решења за специфичне захвате</li>
              </ul>
            </div>
            <div className={styles.focusCard}>
              <h4>Подршка клиничким истраживањима</h4>
              <ul className={styles.list}>
                <li>Техничка подршка за експерименталне студије</li>
                <li>Израда брзих прототипова алата, уређаја и медицинске опреме</li>
                <li>Креирање прилагођених уређаја и система за клиничка испитивања</li>
              </ul>
            </div>
            <div className={styles.focusCard}>
              <h4>Унапређење инфраструктуре</h4>
              <ul className={styles.list}>
                <li>Свакодневни рад са тимом одржавања на ревитализацији и унапређењу постојеће опреме</li>
                <li>Консултације приликом инвестирања и куповине нове опреме</li>
              </ul>
            </div>
          </div>
          <Text
            variant="body"
            text="Engineering Core тежи да постане лидер у развоју напредних инжењерских решења за кардиоваскуларну медицину, спајајући науку, технологију и клиничку праксу."
          />
        </div>
      ),
    },
    {
      id: "mechanical-core",
      label: "Mechanical / Rapid Prototyping Core",
      content: (
        <div className={styles.tabContent}>
          <Heading variant="h2" text="Mechanical/Rapid Prototyping Core" />
          <Text
            variant="body"
            text="Машинска радионица и 3Д принт лабораторија баве се израдом медицинских уређаја, алата и модела који се користе у напредној кардиоваскуларној медицини. Ова лабораторија омогућава лекарима и инжењерима да брзо пређу са идеје на функционалне прототипове."
          />
          <div className={styles.focusGrid}>
            <div className={styles.focusCard}>
              <h4>Брза израда 3Д модела</h4>
              <p>Користимо савремене 3Д штампаче и CAD софтвер за израду прилагођених анатомских модела и прототипа медицинских алата.</p>
            </div>
            <div className={styles.focusCard}>
              <h4>Производња медицинских компоненти</h4>
              <p>Развијамо специјализоване компоненте и инструменте, са фокусом на прилагођавање пацијентима.</p>
            </div>
            <div className={styles.focusCard}>
              <h4>Итеративно тестирање прототипова</h4>
              <p>Сваки прототип пролази кроз више итерација како би се осигурала његова функционалност, поузданост и сигурност.</p>
            </div>
          </div>
          <Text
            variant="body"
            text="Циљ лабораторије је да убрза процес развоја нових медицинских технологија и омогући практична решења за свакодневну клиничку праксу."
          />
          <div className={styles.focusCard}>
            <h4>Контакт</h4>
            <ul className={styles.list}>
              <li>Miljenko Subašić</li>
              <li>Maša Petrović</li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Наука и истраживање", href: "/nauka-istrazivanje" },
          { label: "CardioView3D LAB" },
        ]}
        title="CardioView3D LAB"
        subtitle="Три језгра лабораторије посвећене 3Д штампи, инжењерингу и брзој изради прототипова у кардиоваскуларној медицини"
      />

      <Section padding="medium" background="gray">
        <Container>
          <TabbedPanel tabs={tabs} defaultTabId="3d-print-core" maxContentHeight={2000} />
        </Container>
      </Section>
    </>
  );
}
