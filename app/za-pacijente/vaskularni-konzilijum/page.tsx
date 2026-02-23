import { Container, PageHeader, Section } from "@/components/shared";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

export { generateMetadata };

const CLANOVI_TIMA = [
  { icon: "fas fa-user-doctor", label: "Васкуларни хирурзи" },
  { icon: "fas fa-x-ray", label: "Радиолози" },
  { icon: "fas fa-heart-pulse", label: "Ангиолози" },
  { icon: "fas fa-brain", label: "Неуролози" },
  { icon: "fas fa-heart", label: "Кардиолози" },
];

const PROCES_KORACI = [
  {
    icon: "fas fa-stethoscope",
    title: "Преглед и дијагностика",
    description:
      "На основу прегледа ординирајућег васкуларног хирурга и налаза адекватне дијагностике (КТ и МР ангиографија) доносе се индивидуализоване одлуке за лечење сваког пацијента.",
  },
  {
    icon: "fas fa-clipboard-list",
    title: "Одлука конзилијума",
    description:
      "Утврђује се степен хитности индикованих интервенција у односу на природу болести и смештајне капацитете клинике, те се пацијенти стављају на листе чекања.",
  },
  {
    icon: "fas fa-phone",
    title: "Обавештавање пацијента",
    description:
      "Пацијенти се сами обавештавају о одлуци конзилијума телефонским путем, неколико дана након њеног доношења.",
  },
];

export default function VaskularniKonzilijumPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "За пацијенте", href: "/za-pacijente" },
          { label: "Васкуларни конзилијум" },
        ]}
        title="Васкуларни конзилијум"
        subtitle="Високоспецијализовани тим за лечење обољења крвних судова"
      />

      {/* Intro */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.intro}>
            <div className={styles.introIcon}>
              <i className="fas fa-stethoscope" aria-hidden />
            </div>
            <div className={styles.introContent}>
              <h2>О конзилијуму</h2>
              <p>
                Васкуларни конзилијум је високоспецијализовани тим који се
                свакодневно састаје ради доношења одлука о лечењу пацијената
                са обољењима крвних судова.
              </p>
            </div>
          </div>

          <div className={styles.teamGrid}>
            {CLANOVI_TIMA.map((clan, idx) => (
              <div key={idx} className={styles.teamBadge}>
                <i className={clan.icon} aria-hidden />
                <span>{clan.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Proces rada */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIconWrap}>
              <i className="fas fa-diagram-project" aria-hidden />
            </span>
            <div>
              <h2>Процес рада конзилијума</h2>
              <p>Од прегледа до одлуке о лечењу</p>
            </div>
          </div>

          <div className={styles.stepsGrid}>
            {PROCES_KORACI.map((korak, idx) => (
              <div key={idx} className={styles.stepCard}>
                <div className={styles.stepNumber}>{idx + 1}</div>
                <div className={styles.stepIconWrap}>
                  <i className={korak.icon} aria-hidden />
                </div>
                <h4>{korak.title}</h4>
                <p>{korak.description}</p>
              </div>
            ))}
          </div>

          <div className={styles.infoBanner}>
            <div className={styles.infoBannerIcon}>
              <i className="fas fa-circle-info" aria-hidden />
            </div>
            <div className={styles.infoBannerContent}>
              <strong>Додатне информације</strong>
              <p>
                Уколико је неопходно даље болничко лечење, пацијент ће
                благовремено бити обавештен о термину хоспитализације и о
                неопходној документацији коју је потребно да прибави. За све
                додатне информације пацијенти могу да се обрате надлежним
                васкуларним хирурзима у термину њиховог амбулантног дана.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Контакт */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.contactCard}>
            <div className={styles.contactCardIcon}>
              <i className="fas fa-phone" aria-hidden />
            </div>
            <div className={styles.contactCardContent}>
              <h3>Контакт</h3>
              <p>Call центар Института Дедиње</p>
              <a href="tel:0113601700" className={styles.phoneLink}>
                011 3601 700
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
