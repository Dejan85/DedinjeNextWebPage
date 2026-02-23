import { Container, PageHeader, Section } from "@/components/shared";
import { Heading, Text } from "@/components/typography";
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

      {/* Увод */}
      <Section padding="medium" background="gray">
        <Container>
          <Heading variant="h2" text="О програму" className={styles.sectionTitle} />
          <Text
            variant="body"
            text="Убрзани развој савремене медицине захтева континуирану едукацију и усавршавање у свим областима. Како би одржали корак, развили смо програме мултидисциплинарне континуиране едукације и усавршавања, у различитим облицима (предавања, конфронтација, семинара) медицинских сестара и техничара, младих лекара и техничара одељења перфузије."
          />

          <div className={styles.simHighlight}>
            <i className="fas fa-laptop-medical" aria-hidden />
            <div>
              <h4>Програми симулационог учења</h4>
              <p>Истовремено се одвијају програми симулационог учења:</p>
              <ul>
                {SIMULACIONI_PROGRAMI.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className={styles.note}>У припреми су нови програми едукације.</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Едукација медицинских сестара/техничара */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.programHeader}>
            <span className={styles.programIcon}>
              <i className="fas fa-user-nurse" aria-hidden />
            </span>
            <Heading variant="h2" text="Едукација медицинских сестара/техничара" />
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
            <Heading variant="h3" text="План наставе" className={styles.planTitle} />
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
            <span className={styles.programIcon}>
              <i className="fas fa-user-md" aria-hidden />
            </span>
            <Heading variant="h2" text="Едукација младих лекара" />
          </div>

          <div className={styles.modulesGrid}>
            <div className={styles.moduleCard}>
              <div className={styles.moduleIcon}>
                <i className="fas fa-chalkboard-teacher" aria-hidden />
              </div>
              <h4>Модул теоријске наставе</h4>
              <p>Реализују млади лекари са менторима / едукаторима по предвиђеном програму Тима за едукацију (једном недељно). Планирана су 32 предавања до 07.10.2021 за 46 младих лекара.</p>
            </div>
            <div className={styles.moduleCard}>
              <div className={styles.moduleIcon}>
                <i className="fas fa-heartbeat" aria-hidden />
              </div>
              <h4>Модул кардиопулмоналне реанимације</h4>
              <p>У припреми модул са програмом у трајању 5–6 радних дана (у току је едукација едукатора).</p>
            </div>
          </div>

          <div className={styles.simHighlight}>
            <i className="fas fa-info-circle" aria-hidden />
            <p>У припреми је почетак рада са првом групом младих лекара Клинике за анестезију и интензивно лечење, а надаље биће укључени сви полазници едукације.</p>
          </div>
        </Container>
      </Section>

      {/* Контакт */}
      <Section padding="medium" background="white">
        <Container>
          <Heading variant="h2" text="Контакт" align="center" className={styles.sectionTitle} />
          <div className={styles.contactCard}>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <i className="fas fa-user" aria-hidden />
              </div>
              <div>
                <span className={styles.contactLabel}>Контакт особа</span>
                <span className={styles.contactValue}>Проф. др Небојша Тасић</span>
              </div>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <i className="fas fa-phone" aria-hidden />
              </div>
              <div>
                <span className={styles.contactLabel}>Телефон</span>
                <a href="tel:+381113601669" className={styles.contactValue}>011 360 1669</a>
              </div>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <i className="fas fa-envelope" aria-hidden />
              </div>
              <div>
                <span className={styles.contactLabel}>Е-маил</span>
                <a href="mailto:nic@yahoo.com" className={styles.contactValue}>nic@yahoo.com</a>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
