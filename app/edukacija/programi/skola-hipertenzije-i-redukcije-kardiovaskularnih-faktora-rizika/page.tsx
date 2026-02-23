import { Container, PageHeader, Section, StatItem } from "@/components/shared";
import { Heading, Text } from "@/components/typography";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

const BAZICNI_PROGRAM = [
  {
    icon: "fas fa-heartbeat",
    title: "Хипертензија као фактор ризика/болест",
  },
  {
    icon: "fas fa-stethoscope",
    title: "Дијагностика хипертензије и оштећења циљних органа",
  },
  {
    icon: "fas fa-user-md",
    title: "Персонализовани програми лечења кардиоваскуларних фактора ризика",
  },
];

export { generateMetadata };

export default function SkolaHipertenzijePage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Едукација", href: "/edukacija" },
          { label: "Едукативни програми", href: "/edukacija/programi" },
          { label: "Школа хипертензије" },
        ]}
        title="Школа хипертензије и редукције кардиоваскуларних фактора ризика"
      />

      {/* Базични програм */}
      <Section padding="medium" background="gray">
        <Container>
          <Heading variant="h2" text="Базични програм школе" align="center" className={styles.sectionTitle} />
          <div className={styles.programGrid}>
            {BAZICNI_PROGRAM.map((item) => (
              <div key={item.title} className={styles.programCard}>
                <div className={styles.programCardIcon}>
                  <i className={item.icon} aria-hidden />
                </div>
                <h3>{item.title}</h3>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Статистика */}
      <Section padding="small" background="white">
        <Container>
          <div className={styles.statsRow}>
            <StatItem value="1" label="Недеља теорије" />
            <StatItem value="2" label="Месеца праксе" />
            <StatItem value="40+" label="Холтер анализа" />
            <StatItem value="100+" label="ХИСПА прегледа" />
          </div>
        </Container>
      </Section>

      {/* Програм школе */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.courseHeader}>
            <span className={styles.courseIcon}>
              <i className="fas fa-graduation-cap" aria-hidden />
            </span>
            <Heading variant="h2" text="Програм школе" />
          </div>
          <Text
            variant="body"
            text="Настава се састоји из теоретског и практичног дела."
            className={styles.introText}
          />

          <div className={styles.courseDetails}>
            <div className={styles.courseDetail}>
              <div className={styles.detailIcon}>
                <i className="fas fa-book" aria-hidden />
              </div>
              <div>
                <h4>Теоријска настава</h4>
                <p>Теоријска настава се одвија тако што постоје предавања која садрже од 3 до 5 часова дневно током недељу дана. Након тога се полаже тест.</p>
              </div>
            </div>
            <div className={styles.courseDetail}>
              <div className={styles.detailIcon}>
                <i className="fas fa-hand-holding-medical" aria-hidden />
              </div>
              <div>
                <h4>Практична настава</h4>
                <p>У току наредна 2 месеца одвија се практична настава у преподневним и послеподневним терминима (од 12 до 16 часова и од 16 до 20 часова) и у договору са самим кандидатима посвећена едукацији ХИСПА мултидисциплинарног и персонализованог програма редукције кардиоваскуларног ризика.</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Захтеви и сертификат */}
      <Section padding="medium" background="white">
        <Container>
          <Heading variant="h2" text="Захтеви и сертификат" align="center" className={styles.sectionTitle} />

          <div className={styles.requirementsGrid}>
            <div className={styles.requirementCard}>
              <div className={styles.requirementIcon}>
                <i className="fas fa-clipboard-check" aria-hidden />
              </div>
              <h4>Минимални захтеви</h4>
              <p>За време едукације сваки полазник мора самостално да уради најмање 40 анализа холтера крвног притиска, 100 ХИСПА прегледа са израчунавањем кардиоваскуларног ризика и примене програма персонализоване кардиоваскуларне превенције.</p>
            </div>
            <div className={styles.requirementCard}>
              <div className={styles.requirementIcon}>
                <i className="fas fa-certificate" aria-hidden />
              </div>
              <h4>Сертификат</h4>
              <p>Полазници школе добијају сертификат који потврђује оспособљеност за превенцију, дијагностику и лечење персонализованим програмом редукције фактора ризика.</p>
            </div>
            <div className={styles.requirementCard}>
              <div className={styles.requirementIcon}>
                <i className="fas fa-award" aria-hidden />
              </div>
              <h4>Акредитација</h4>
              <p>Школа ће бити акредитована од стране Здравственог савета Републике Србије, полазници добијају бодове.</p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
