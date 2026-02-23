import { Container, PageHeader, Section } from "@/components/shared";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

export { generateMetadata };

const PREPORUKE = [
  {
    icon: "fas fa-apple-whole",
    title: "Воће и поврће",
    description: "Најмање 5 порција дневно — богат извор витамина, минерала и влакана за здрав кардиоваскуларни систем.",
  },
  {
    icon: "fas fa-wheat-awn",
    title: "Интегрални житарице",
    description: "Замените рафинисане угљене хидрате интегралним — хлеб, пиринач, тестенине од целог зрна.",
  },
  {
    icon: "fas fa-fish",
    title: "Здрави протеини",
    description: "Риба (нарочито масна риба), пилетина без коже, махунарке и ораси су одличан извор квалитетних протеина.",
  },
  {
    icon: "fas fa-droplet",
    title: "Здрави масти",
    description: "Маслиново уље, авокадо и ораси уместо засићених и транс масти. Ограничите унос масноће животињског порекла.",
  },
  {
    icon: "fas fa-ban",
    title: "Ограничите со и шећер",
    description: "Мање од 5g соли дневно. Избегавајте додати шећер, газиране и заслађене напитке.",
  },
  {
    icon: "fas fa-glass-water",
    title: "Хидратација",
    description: "Најмање 1.5–2 литре воде дневно. Избегавајте алкохол и напитке са кофеином у великим количинама.",
  },
];

const KALORIJSKI_PLANOVI = [
  { kcal: "1200", opis: "За особе са вишком килограма и дијабетесом тип 2", icon: "fas fa-weight-scale" },
  { kcal: "1500", opis: "За контролу тежине и умерену физичку активност", icon: "fas fa-person-walking" },
  { kcal: "1800", opis: "За одржавање тежине уз редовну физичку активност", icon: "fas fa-person-running" },
  { kcal: "2000", opis: "Стандардни план за одрасле без значајног вишка тежине", icon: "fas fa-heart-pulse" },
];

export default function PlanIshranePage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "За пацијенте", href: "/za-pacijente" },
          { label: "План исхране" },
        ]}
        title="План исхране"
        subtitle="Препоруке за превенцију и лечење метаболичких обољења"
      />

      {/* Intro */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.intro}>
            <div className={styles.introIcon}>
              <i className="fas fa-utensils" aria-hidden />
            </div>
            <div className={styles.introContent}>
              <h2>Здрава исхрана за здраво срце</h2>
              <p>
                Метаболички поремећаји, укључујући дијабетес, хипертензију и
                гојазност, све су чешћи у модерном друштву. Промене у исхрани
                су међу најефикаснијим начинима за превенцију и контролу ових
                стања.
              </p>
              <p>
                Правилна исхрана је кључни фактор у превенцији и лечењу
                метаболичких поремећаја. Уравнотежена, разноврсна и умерена
                исхрана може значајно побољшати квалитет живота и смањити
                ризик од ових здравствених проблема.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Preporuke */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIconWrap}>
              <i className="fas fa-clipboard-list" aria-hidden />
            </span>
            <div>
              <h2>Основне препоруке за исхрану</h2>
              <p>Кључни принципи здраве исхране за превенцију обољења</p>
            </div>
          </div>

          <div className={styles.preporukeGrid}>
            {PREPORUKE.map((item, idx) => (
              <div key={idx} className={styles.preporukaCard}>
                <div className={styles.preporukaIcon}>
                  <i className={item.icon} aria-hidden />
                </div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Kalorijski planovi */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIconWrap}>
              <i className="fas fa-chart-pie" aria-hidden />
            </span>
            <div>
              <h2>Калоријски планови</h2>
              <p>Прилагођени планови према потребама пацијента</p>
            </div>
          </div>

          <p className={styles.planIntro}>
            Институт за кардиоваскуларне болести „Дедиње" пружа детаљан план
            препоручене исхране за превенцију и лечење метаболичких и
            кардиоваскуларних обољења, са различитим калоријским вредностима.
          </p>

          <div className={styles.planoviGrid}>
            {KALORIJSKI_PLANOVI.map((plan, idx) => (
              <div key={idx} className={styles.planCard}>
                <div className={styles.planCardIcon}>
                  <i className={plan.icon} aria-hidden />
                </div>
                <div className={styles.planKcal}>{plan.kcal} <span>kcal</span></div>
                <p>{plan.opis}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Motto banner */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.mottoBanner}>
            <i className="fas fa-heart" aria-hidden />
            <span>Знање штити срце: ваша превенција је наша мисија!</span>
          </div>
        </Container>
      </Section>
    </>
  );
}
