import {
  Container,
  PageHeader,
  Button,
  Section,
} from "@/components/shared";
import styles from "./page.module.css";

const ODELJENJA = [
  {
    icon: "fas fa-coins",
    title: "Економско финансијски послови",
    person: "Божинка Томашевић, дипл.екон.",
    phone: "(+381 11) 3601 612",
    email: "racunovodstvo@ikvbd.com",
    desc: "Финансијско планирање, буџетирање, рачуноводство и економска контрола пословања Института",
  },
  {
    icon: "fas fa-file-contract",
    title: "Служба јавних набавки",
    person: "Драгица Скочић, дипл. инж.",
    phone: "(+381 11) 3601 606",
    email: "dragica@ikvbd.com",
    desc: "Спровођење поступака јавних набавки у складу са законском регулативом",
  },
  {
    icon: "fas fa-scale-balanced",
    title: "Правна служба",
    person: "Наташа Елезовић, дипл. прав.",
    phone: "(+381 11) 3601 700",
    email: "elezovic.natasa@ikvbd.com",
    desc: "Правни послови, нормативна акта, радни односи и заступање Института",
  },
  {
    icon: "fas fa-wrench",
    title: "Техничка служба",
    person: "Александар Томић, дипл. инж.",
    phone: "(+381 11) 3601 735",
    email: "tehnickasluzba@ikvbd.com",
    desc: "Одржавање техничких система, инфраструктуре и медицинске опреме",
  },
  {
    icon: "fas fa-server",
    title: "Рачунарски центар",
    person: "Ненад Петковић, инж.",
    phone: "(+381 11) 3601 691",
    email: "racunarski.centar@institutdedinje.org",
    desc: "ИТ инфраструктура, информациони системи и техничка подршка",
  },
];

export default function NemedicinskiPosloviPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "О нама" },
          { label: "Немедицински послови" },
        ]}
        title="Немедицински послови"
        subtitle="Организационе јединице за административну, финансијску, правну и техничку подршку раду Института"
      />

      {/* Intro + Coordinator */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.intro}>
            <div className={styles.introIcon}>
              <i className="fas fa-building-columns" aria-hidden />
            </div>
            <div className={styles.introContent}>
              <h2>Подршка медицинском раду</h2>
              <p>
                Немедицинске службе Института обезбеђују несметано функционисање
                свих пословних процеса — од финансија и јавних набавки, преко
                правних послова, до техничког одржавања и информационих
                технологија. Професионалан рад ових служби омогућава лекарима и
                медицинском особљу да се у потпуности посвете пацијентима.
              </p>
            </div>
          </div>

          <div className={styles.coordinatorBanner}>
            <div className={styles.coordinatorIcon}>
              <i className="fas fa-user-tie" aria-hidden />
            </div>
            <div className={styles.coordinatorInfo}>
              <span className={styles.coordinatorLabel}>Помоћник директора за немедицинске послове</span>
              <strong>Бојана Поповић, маст.екон.</strong>
              <div className={styles.coordinatorContacts}>
                <a href="tel:+381113601806" className={styles.contactLink}>
                  <i className="fas fa-phone" aria-hidden />
                  (+381 11) 3601 806
                </a>
                <a href="mailto:bojana.popovic@ikvbd.com" className={styles.contactLink}>
                  <i className="fas fa-envelope" aria-hidden />
                  bojana.popovic@ikvbd.com
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Departments Grid */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIconWrap}>
              <i className="fas fa-sitemap" aria-hidden />
            </span>
            <div>
              <h2>Организационе јединице</h2>
              <p>Службе и одељења за подршку пословању</p>
            </div>
          </div>

          <div className={styles.deptGrid}>
            {ODELJENJA.map((dept, idx) => (
              <div key={idx} className={styles.deptCard}>
                <div className={styles.deptCardHeader}>
                  <div className={styles.deptCardIcon}>
                    <i className={dept.icon} aria-hidden />
                  </div>
                  <h3>{dept.title}</h3>
                </div>
                <p className={styles.deptDesc}>{dept.desc}</p>
                <div className={styles.deptDivider} />
                <div className={styles.deptPerson}>
                  <i className="fas fa-user" aria-hidden />
                  <strong>{dept.person}</strong>
                </div>
                <div className={styles.deptContacts}>
                  <a href={`tel:${dept.phone.replace(/[^\d+]/g, "")}`} className={styles.deptContactLink}>
                    <span className={styles.deptContactIcon}>
                      <i className="fas fa-phone" aria-hidden />
                    </span>
                    {dept.phone}
                  </a>
                  <a href={`mailto:${dept.email}`} className={styles.deptContactLink}>
                    <span className={styles.deptContactIcon}>
                      <i className="fas fa-envelope" aria-hidden />
                    </span>
                    {dept.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <Container>
          <div className={styles.ctaContent}>
            <div className={styles.ctaIcon}>
              <i className="fas fa-phone" aria-hidden />
            </div>
            <h2>Потребне су вам додатне информације?</h2>
            <p>
              За општа питања о раду Института или усмеравање ка одговарајућој
              служби, контактирајте наш Call центар.
            </p>
            <div className={styles.ctaButtons}>
              <Button variant="primary" href="/kontakt">
                <i className="fas fa-phone" aria-hidden />
                Контактирајте нас
              </Button>
              <Button variant="secondary" href="/o-institutu">
                <i className="fas fa-hospital" aria-hidden />
                О Институту
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
