import { Container, PageHeader, Section } from "@/components/shared";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

const SIMULACIONI_PROGRAMI = [
  "Кардиопулмоналне реанимације за све запослене",
  "Обезбеђивања дисајног пута и интензивног лечења",
];

const MODULI_SESTRE = [
  {
    icon: "fas fa-book-medical",
    title: "Модул теоријске наставе",
    description: "16 предавања са практичним вежбама (реализују лекари и сестре едукатори – главне сестре) – по предвиђеном програму (једном недељно).",
  },
  {
    icon: "fas fa-heartbeat",
    title: "Модул кардиопулмоналне реанимације",
    description: "Предавања, вежбе и клинички сценарији спровођења КПР (реализују лекари и сестре едукатори – главне сестре) – трајање модула седам радних дана – у току је едукација друге групе.",
  },
];

const MODULI_LEKARI = [
  {
    icon: "fas fa-chalkboard-teacher",
    title: "Модул теоријске наставе",
    description: "Реализују млади лекари са менторима / едукаторима по предвиђеном програму Тима за едукацију (једном недељно). Планирана су 32 предавања до 07.10.2021 за 46 младих лекара.",
  },
  {
    icon: "fas fa-heartbeat",
    title: "Модул кардиопулмоналне реанимације",
    description: "У припреми модул са програмом у трајању 5–6 радних дана (у току је едукација едукатора).",
  },
];

export { generateMetadata };

export default function InternaEdukacijaPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Едукација", href: "/edukacija" },
          { label: "Интерна едукација" },
        ]}
        title="Интерна едукација"
        subtitle="Континуирано усавршавање запослених"
      />

      {/* About */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.about}>
            <div className={styles.aboutIcon}>
              <i className="fas fa-graduation-cap" aria-hidden />
            </div>
            <div className={styles.aboutContent}>
              <h2>О програму</h2>
              <p>
                Убрзани развој савремене медицине захтева континуирану едукацију
                и усавршавање у свим областима. Како би одржали корак, развили смо
                програме мултидисциплинарне континуиране едукације и усавршавања,
                у различитим облицима (предавања, конфронтација, семинара)
                медицинских сестара и техничара, младих лекара и техничара одељења
                перфузије.
              </p>
              <div className={styles.aboutStats}>
                <div className={styles.stat}>
                  <span className={styles.statNum}>3</span>
                  <span className={styles.statLabel}>Програма</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNum}>46+</span>
                  <span className={styles.statLabel}>Младих лекара</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNum}>32</span>
                  <span className={styles.statLabel}>Предавања</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNum}>16</span>
                  <span className={styles.statLabel}>Вежби</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Simulation programs */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.simBanner}>
            <div className={styles.simBannerIcon}>
              <i className="fas fa-laptop-medical" aria-hidden />
            </div>
            <div className={styles.simBannerContent}>
              <h3>Програми симулационог учења</h3>
              <p>Истовремено се одвијају програми симулационог учења:</p>
              <ul>
                {SIMULACIONI_PROGRAMI.map((item) => (
                  <li key={item}>
                    <i className="fas fa-check" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <span className={styles.simNote}>
                <i className="fas fa-flask" aria-hidden /> У припреми су нови програми едукације.
              </span>
            </div>
          </div>
        </Container>
      </Section>

      {/* Едукација медицинских сестара/техничара */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.programHeader}>
            <div className={styles.programIcon}>
              <i className="fas fa-user-nurse" aria-hidden />
            </div>
            <div>
              <h2>Едукација медицинских сестара/техничара</h2>
              <p className={styles.programSubtitle}>Модули за стручно усавршавање здравствених радника</p>
            </div>
          </div>

          <div className={styles.modulesGrid}>
            {MODULI_SESTRE.map((modul) => (
              <div key={modul.title} className={styles.moduleCard}>
                <div className={styles.moduleIcon}>
                  <i className={modul.icon} aria-hidden />
                </div>
                <h4>{modul.title}</h4>
                <p>{modul.description}</p>
              </div>
            ))}
          </div>

          <div className={styles.planBlock}>
            <h3 className={styles.planTitle}>
              <i className="fas fa-list-ol" aria-hidden /> План наставе
            </h3>
            <div className={styles.planSteps}>
              <div className={styles.planStep}>
                <div className={styles.stepNumber}>1</div>
                <div>
                  <h4>Прва група</h4>
                  <p>Медицинске сестре и техничари Клинике за анестезију и интензивно лечење (Одељења анестезије и Одељења интензивног лечења) и Коронарне јединице.</p>
                </div>
              </div>
              <div className={styles.planStep}>
                <div className={styles.stepNumber}>2</div>
                <div>
                  <h4>Наредне групе</h4>
                  <p>Потом ће бити реализован за медицинске сестре / техничаре свих клиника и одељења.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Едукација младих лекара */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.programHeader}>
            <div className={styles.programIcon}>
              <i className="fas fa-user-md" aria-hidden />
            </div>
            <div>
              <h2>Едукација младих лекара</h2>
              <p className={styles.programSubtitle}>Програм за младе специјалисте и специјализанте</p>
            </div>
          </div>

          <div className={styles.modulesGrid}>
            {MODULI_LEKARI.map((modul) => (
              <div key={modul.title} className={styles.moduleCard}>
                <div className={styles.moduleIcon}>
                  <i className={modul.icon} aria-hidden />
                </div>
                <h4>{modul.title}</h4>
                <p>{modul.description}</p>
              </div>
            ))}
          </div>

          <div className={styles.infoNote}>
            <i className="fas fa-info-circle" aria-hidden />
            <p>У припреми је почетак рада са првом групом младих лекара Клинике за анестезију и интензивно лечење, а надаље биће укључени сви полазници едукације.</p>
          </div>
        </Container>
      </Section>

      {/* Contact */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.contactSection}>
            <div className={styles.contactIcon}>
              <i className="fas fa-info-circle" aria-hidden />
            </div>
            <div className={styles.contactContent}>
              <h2>Контакт за интерну едукацију</h2>
              <p>
                За све информације о програмима интерне едукације, пријавама и
                распореду, обратите се контакт особи.
              </p>
              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <i className="fas fa-user" aria-hidden />
                  <div>
                    <span className={styles.contactLabel}>Контакт особа</span>
                    <span className={styles.contactValue}>Проф. др Небојша Тасић</span>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <i className="fas fa-phone" aria-hidden />
                  <div>
                    <span className={styles.contactLabel}>Телефон</span>
                    <span className={styles.contactValue}>011 360 1669</span>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <i className="fas fa-envelope" aria-hidden />
                  <div>
                    <span className={styles.contactLabel}>Е-маил</span>
                    <span className={styles.contactValue}>nic@yahoo.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
