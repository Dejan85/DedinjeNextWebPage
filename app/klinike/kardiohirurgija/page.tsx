import {
  Container,
  PageHeader,
  Section,
} from "@/components/shared";
import styles from "./page.module.css";
import { metadata } from "./metadata";

export { metadata };

const STATS = [
  { value: "55.000+", label: "Укупно процедура", icon: "fas fa-heart-pulse" },
  { value: "2.000+", label: "Годишње операција", icon: "fas fa-calendar-check" },
  { value: "95,5%", label: "Стопа преживљавања", icon: "fas fa-chart-line" },
  { value: "40+", label: "Година искуства", icon: "fas fa-award" },
];

const PROCEDURE = [
  { icon: "fas fa-arrows-rotate", title: "Бајпас операције", desc: "Реваскуларизација исхемијског миокарда уз употребу венских и/или артеријских графтова" },
  { icon: "fas fa-heart-circle-plus", title: "Замена залистака", desc: "Уградња вештачких залистака — механичких или од природних материјала" },
  { icon: "fas fa-screwdriver-wrench", title: "Реконструкција залистака", desc: "Митрални, аортни и трикуспидни залистак — стандардним или минимално инвазивним приступом" },
  { icon: "fas fa-video", title: "Ендоскопске интервенције", desc: "Ендоскопске процедуре на митралном залиску" },
  { icon: "fas fa-shield-halved", title: "Реконструкција аорте", desc: "Планиране процедуре на усходној грудној аорти, аортном луку и силазној грудној аорти" },
  { icon: "fas fa-bolt", title: "Хитне процедуре", desc: "Интервенције након дисекције (цепања) грудне аорте" },
  { icon: "fas fa-child", title: "Урођене мане", desc: "Реконструкција урођених срчаних мана у одраслих болесника" },
  { icon: "fas fa-gear", title: "Механичка потпора", desc: "ECMO, интра-аортална балон-пумпа, парцијална и тотална вештачка срца" },
  { icon: "fas fa-code-merge", title: "Хибридне процедуре", desc: "Комбинована кардиохируршка и инвазивна радиолошка процедура на аортном луку" },
];

const HIGHLIGHTS = [
  { icon: "fas fa-globe", text: "Једна од највећих серија реконструкција митралног залиска у свету — од 1985. године" },
  { icon: "fas fa-microscope", text: "Пионири у употреби а. радилиса у реваскуларизацији миокарда од 1999. године" },
  { icon: "fas fa-ranking-star", text: "Европски и светски врх — преко 2.000 процедура годишње" },
  { icon: "fas fa-heart-circle-bolt", text: "Прво вештачко срце на овим просторима (Heart-Mate I, 1995.)" },
  { icon: "fas fa-wand-magic-sparkles", text: "Прва ендоскопска операција срца у Србији (2011.)" },
  { icon: "fas fa-book-open", text: "Радови у NEJM, Circulation, Ann Thorac Surg и другим престижним часописима" },
];

const KADAR = [
  { name: "Доц. др сци. мед. Слободан Митровић", role: "Управник Клинике" },
  { name: "Асс др сци. мед. Петар Вуковић", role: "Помоћник управника" },
  { name: "Проф др сци. мед. Миодраг Перин", role: "Саветник директора" },
  { name: "Проф. др сци. мед. Иван Стојановић", role: "Начелник Центра за минимално инвазивну кардиохирургију" },
  { name: "Асс др сци. мед. Сања Боровић", role: "Начелник Центра за лечење срчане слабости" },
  { name: "Мр сци. мед. др Ђорђе Здравковић", role: "Начелник операционог блока" },
];

export default function KardiohirurgijaPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Клинике", href: "/klinike" },
          { label: "Клиника за кардиохирургију" },
        ]}
        title="Клиника за кардиохирургију"
        subtitle="Високоспецијализовано оперативно лечење срчаних обољења, комплетна дијагностика и постоперативни опоравак"
      />

      {/* Intro + Stats */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.intro}>
            <div className={styles.introIcon}>
              <i className="fas fa-heart-pulse" aria-hidden />
            </div>
            <div className={styles.introContent}>
              <h2>О клиници</h2>
              <p>
                Наша обавеза је да обезбедимо врхунску услугу у домену
                кардиоваскуларне медицине — ефикасне, квалитетне кардиохируршке
                процедуре без значајних компликација, које омогућавају брз
                опоравак и повратак свакодневним активностима.
              </p>
              <p>
                Клиника обезбеђује потпуно заокружен систем ефикасне
                дијагностике, лечења и постоперативног опоравка за болеснике
                којима је потребна кардиохируршка интервенција.
              </p>
            </div>
          </div>

          <div className={styles.statsGrid}>
            {STATS.map((stat, idx) => (
              <div key={idx} className={styles.statCard}>
                <div className={styles.statIcon}>
                  <i className={stat.icon} aria-hidden />
                </div>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Procedure */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIconWrap}>
              <i className="fas fa-list-check" aria-hidden />
            </span>
            <div>
              <h2>Процедуре које изводимо</h2>
              <p>Широк спектар кардиохируршких интервенција</p>
            </div>
          </div>

          <div className={styles.procedureGrid}>
            {PROCEDURE.map((item, idx) => (
              <div key={idx} className={styles.procedureCard}>
                <div className={styles.procedureCardIcon}>
                  <i className={item.icon} aria-hidden />
                </div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Highlights banner */}
      <section className={styles.highlightSection}>
        <Container>
          <div className={styles.highlightHeader}>
            <div className={styles.highlightHeaderIcon}>
              <i className="fas fa-trophy" aria-hidden />
            </div>
            <h2>Најзначајнији резултати</h2>
            <p>Постигнућа која нас позиционирају у сам европски и светски врх</p>
          </div>
          <div className={styles.highlightGrid}>
            {HIGHLIGHTS.map((item, idx) => (
              <div key={idx} className={styles.highlightCard}>
                <span className={styles.highlightCardIcon}>
                  <i className={item.icon} aria-hidden />
                </span>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Kadar */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIconWrap}>
              <i className="fas fa-users" aria-hidden />
            </span>
            <div>
              <h2>Руководство клинике</h2>
              <p>Кључни кадрови Клинике за кардиохирургију</p>
            </div>
          </div>

          <div className={styles.teamGrid}>
            {KADAR.map((person, idx) => (
              <div key={idx} className={styles.teamCard}>
                <div className={styles.teamCardIcon}>
                  <i className="fas fa-user-doctor" aria-hidden />
                </div>
                <div>
                  <strong>{person.name}</strong>
                  <p>{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

    </>
  );
}
