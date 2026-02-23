import { Container, PageHeader, Section } from "@/components/shared";
import { Heading, Text } from "@/components/typography";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

export { generateMetadata };

export default function KongresiPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Едукација", href: "/edukacija" },
          { label: "Конгреси" },
        ]}
        title="Конгреси и симпозијуми"
        subtitle="Међународни научни скупови у области кардиоваскуларне медицине"
      />

      {/* Brano Heart Failure */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.congressCard}>
            <div className={styles.congressBadge}>
              <i className="fas fa-star" aria-hidden />
              <span>Актуелно</span>
            </div>
            <div className={styles.congressHeader}>
              <span className={styles.congressIcon}>
                <i className="fas fa-globe" aria-hidden />
              </span>
              <div>
                <Heading variant="h2" text={'Међународни симпозијум "Brano Heart Failure 2024"'} />
                <div className={styles.congressMeta}>
                  <span><i className="fas fa-calendar" aria-hidden /> 18–20. септембар 2024.</span>
                  <span><i className="fas fa-map-marker-alt" aria-hidden /> Београд</span>
                </div>
              </div>
            </div>
            <Text variant="body" text="Поштоване колеге, част нам је да вас позовемо да будете део Brano Heart Failure Forum-а, који ће се одржати од 18 до 20. септембра 2024. у Београду." />
            <Text variant="body" text="На линку у наставку можете извршити неопходну регистрацију." />
            <a href="https://www.brano-hff.org/registration" target="_blank" rel="noopener noreferrer" className={styles.registerBtn}>
              <i className="fas fa-external-link-alt" aria-hidden />
              Регистрација
            </a>
          </div>
        </Container>
      </Section>

      {/* Остали конгреси */}
      <Section padding="medium" background="white">
        <Container>
          <Heading variant="h2" text="Конгреси" align="center" className={styles.sectionTitle} />
          <div className={styles.congressesGrid}>
            <div className={styles.congressItem}>
              <div className={styles.itemIcon}>
                <i className="fas fa-heartbeat" aria-hidden />
              </div>
              <Heading variant="h3" text={'Годишњи конгрес Института за кардиоваскуларне болести „Дедиње"'} />
              <Text
                variant="body"
                text={'Сваке године се у термину април/мај одржава годишњи Међународни конгрес Института за Кардиоваскуларне болести „Дедиње" на којем стручњаци Института представљају најзначајније стручне и научне резултате Института и у оквиру панел дискусија дискутују са реномираним кардиоваскуларним експертима из Европе и света.'}
              />
              <div className={styles.itemMeta}>
                <span><i className="fas fa-sync-alt" aria-hidden /> Сваке године</span>
                <span><i className="fas fa-calendar" aria-hidden /> Април / мај</span>
              </div>
            </div>

            <div className={styles.congressItem}>
              <div className={styles.itemIcon}>
                <i className="fas fa-shield-heart" aria-hidden />
              </div>
              <Heading variant="h3" text="Конгрес кардиоваскуларне превенције" />
              <Text
                variant="body"
                text="Сваке друге године Удружење Центара за хипертензију, превенцију Инфаркта и шлога ХИСПА организује Међународни конгрес посвећен редукцији кардиоваскуларних фактора ризика заједно са Међународним удружењем за Васкуларно здравље (ИСВХ) и Европским удружењем за превенцију (Europrevent)."
              />
              <div className={styles.itemMeta}>
                <span><i className="fas fa-sync-alt" aria-hidden /> Сваке друге године</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
