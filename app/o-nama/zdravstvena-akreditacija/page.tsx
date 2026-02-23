import {
  Container,
  PageHeader,
  Section,
} from "@/components/shared";
import styles from "./page.module.css";

const DOKUMENTA = [
  { name: "Тимови и чланови тима", href: "#" },
  { name: "Општи утисак оцењивача", href: "#" },
];

export default function ZdravstvenaAkreditacijaPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "О нама" },
          { label: "Здравствена акредитација Института" },
        ]}
        title="Здравствена акредитација Института"
        subtitle="Континуирано унапређење квалитета и безбедности здравствене заштите"
      />

      {/* Intro */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.intro}>
            <div className={styles.introIcon}>
              <i className="fas fa-certificate" aria-hidden />
            </div>
            <div className={styles.introContent}>
              <h2>Акредитација као гаранција квалитета</h2>
              <p>
                Здравствена акредитација је поступак процене квалитета рада
                здравствене установе, који спроводи Агенција за акредитацију
                здравствених установа Србије. Институт за кардиоваскуларне
                болести „Дедиње" континуирано ради на унапређењу стандарда
                квалитета и безбедности пацијената, у складу са националним и
                међународним смерницама.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Agency + Coordinators */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIconWrap}>
              <i className="fas fa-building-columns" aria-hidden />
            </span>
            <div>
              <h2>Агенција и координатори</h2>
              <p>Надлежна агенција и одговорна лица за процес акредитације</p>
            </div>
          </div>

          <div className={styles.agencyBanner}>
            <div className={styles.agencyInfo}>
              <div className={styles.agencyBadge}>
                <i className="fas fa-landmark" aria-hidden />
              </div>
              <div>
                <h3>Агенција за акредитацију здравствених установа Србије</h3>
                <p>Независно тело надлежно за процену и акредитацију здравствених установа</p>
              </div>
            </div>
          </div>

          <div className={styles.coordinatorsGrid}>
            <div className={styles.coordinatorCard}>
              <div className={styles.coordinatorIcon}>
                <i className="fas fa-crown" aria-hidden />
              </div>
              <span className={styles.coordinatorRole}>Координатор за здравствену акредитацију</span>
              <strong>Проф. др Александра Николић</strong>
            </div>
            <div className={styles.coordinatorCard}>
              <div className={styles.coordinatorIconAlt}>
                <i className="fas fa-star" aria-hidden />
              </div>
              <span className={styles.coordinatorRole}>Заменик координатора за акредитацију</span>
              <strong>СМТ Далибор Аксић</strong>
            </div>
          </div>
        </Container>
      </Section>

      {/* Documents */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIconWrap}>
              <i className="fas fa-file-lines" aria-hidden />
            </span>
            <div>
              <h2>Документација</h2>
              <p>Документи везани за процес акредитације</p>
            </div>
          </div>

          <div className={styles.docsGrid}>
            {DOKUMENTA.map((doc, idx) => (
              <a key={idx} href={doc.href} className={styles.docCard}>
                <div className={styles.docCardIcon}>
                  <i className="fas fa-file-pdf" aria-hidden />
                </div>
                <div className={styles.docCardInfo}>
                  <strong>{doc.name}</strong>
                  <span>Преузмите документ</span>
                </div>
                <div className={styles.docCardArrow}>
                  <i className="fas fa-arrow-right" aria-hidden />
                </div>
              </a>
            ))}
          </div>
        </Container>
      </Section>

    </>
  );
}
