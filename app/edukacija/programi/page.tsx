import Link from "next/link";
import { Container, PageHeader, Section } from "@/components/shared";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

export { generateMetadata };

const PROGRAM_DETAILS = [
  {
    id: "skola-ehokardiografije",
    icon: "fas fa-heart-pulse",
    title: "Школа ехокардиографије",
    subtitle: "Проф. др Александра Николић",
    description: "Базична школа ехокардиографије обухвата теоретску и практичну наставу из области трансторакалне, трансезофагеалне и стрес ехокардиографије.",
    href: "/edukacija/programi/skola-ehokardiografije-prof-dr-aleksandra-nikolic",
    stats: [
      { value: "6+", label: "Месеци" },
      { value: "100+", label: "Прегледа" },
      { value: "3", label: "Модула" },
    ],
    tags: ["Ехокардиографија", "Ултразвук", "Дијагностика"],
  },
  {
    id: "skola-hipertenzije",
    icon: "fas fa-heart",
    title: "Школа хипертензије и редукције кардиоваскуларних фактора ризика",
    subtitle: "Програм персонализоване превенције",
    description: "Едукација из области дијагностике хипертензије, оштећења циљних органа и персонализованих програма редукције кардиоваскуларног ризика.",
    href: "/edukacija/programi/skola-hipertenzije-i-redukcije-kardiovaskularnih-faktora-rizika",
    stats: [
      { value: "2+", label: "Месеци" },
      { value: "100+", label: "ХИСПА прегледа" },
      { value: "40+", label: "Холтера" },
    ],
    tags: ["Хипертензија", "Превенција", "ХИСПА"],
  },
  {
    id: "skola-vaskularnog-ultrazvuka",
    icon: "fas fa-wave-square",
    title: "Школа васкуларног ултразвука",
    subtitle: "Ултрасонографска ангиолошка дијагностика",
    description: "Обука из области ултрасонографије супрааорталних грана, абдоминалне аорте, висцералних артерија и артерија и вена екстремитета.",
    href: "/edukacija/programi/skola-vaskularnog-ultrazvuka",
    stats: [
      { value: "2+", label: "Месеци" },
      { value: "200+", label: "Прегледа" },
      { value: "2", label: "Испита" },
    ],
    tags: ["Васкуларни УЗ", "Ангиологија", "Дијагностика"],
  },
];

export default function EdukativniProgramiPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Едукација", href: "/edukacija" },
          { label: "Едукативни програми" },
        ]}
        title="Едукативни програми"
        subtitle="Акредитоване школе за стручно усавршавање из области кардиоваскуларне медицине"
      />

      {/* About */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.about}>
            <div className={styles.aboutIcon}>
              <i className="fas fa-graduation-cap" aria-hidden />
            </div>
            <div className={styles.aboutContent}>
              <h2>О едукативним програмима</h2>
              <p>
                {'Институт за кардиоваскуларне болести „Дедиње" нуди различите едукативне програме усмерене на обуку и усавршавање стручњака у области кардиоваскуларне медицине. Програми обухватају континуирану медицинску едукацију (КМЕ), специјализоване школе и практичне обуке.'}
              </p>
              <p>
                Сви програми су у складу са прописима Коморе здравствених радника и Здравственог
                савета Србије. Полазници добијају акредитоване сертификате.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Programs */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.sectionHeader}>
            <h2>Програми</h2>
            <span className={styles.badge}>{PROGRAM_DETAILS.length} акредитоване школе</span>
          </div>
          <div className={styles.programList}>
            {PROGRAM_DETAILS.map((program) => (
              <Link key={program.id} href={program.href} className={styles.card}>
                <div className={styles.cardAccent} />
                <div className={styles.cardInner}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}>
                      <i className={program.icon} aria-hidden />
                    </div>
                    <div>
                      <h3>{program.title}</h3>
                      <span className={styles.cardSubtitle}>{program.subtitle}</span>
                    </div>
                  </div>

                  <p className={styles.cardDesc}>{program.description}</p>

                  <div className={styles.cardStats}>
                    {program.stats.map((stat) => (
                      <div key={stat.label} className={styles.cardStat}>
                        <span className={styles.cardStatVal}>{stat.value}</span>
                        <span className={styles.cardStatLabel}>{stat.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.cardFooter}>
                    <div className={styles.cardTags}>
                      {program.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                    <span className={styles.cardCta}>
                      Детаљније <i className="fas fa-arrow-right" aria-hidden />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Info banner */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.infoBanner}>
            <div className={styles.infoLeft}>
              <i className="fas fa-certificate" aria-hidden />
            </div>
            <div className={styles.infoBody}>
              <h3>Акредитовани програми</h3>
              <p>
                Све школе су акредитоване од стране Здравственог савета Републике Србије.
                Полазници добијају бодове континуиране медицинске едукације и сертификат
                који потврђује оспособљеност у датој области.
              </p>
            </div>
            <Link href="/edukacija" className={styles.infoCta}>
              <span>Назад на едукацију</span>
              <i className="fas fa-arrow-right" aria-hidden />
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
