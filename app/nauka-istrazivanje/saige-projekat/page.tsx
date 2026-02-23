import { Container, PageHeader, Section } from "@/components/shared";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

export { generateMetadata };

const DELOVI_PROJEKTA = [
  {
    icon: "fas fa-rocket",
    title: "Фонд за иновације и предузетништво",
    description:
      "Рад Фонда за иновациону делатност и подстицај предузетништва кроз подршку финансирању старт-уп-овима, иновативним предузећима итд.",
  },
  {
    icon: "fas fa-graduation-cap",
    title: "Подизање капацитета у науци",
    description:
      "Подизање капацитета у науци кроз рад Фонда за науку и унапређење истраживачких могућности.",
  },
  {
    icon: "fas fa-building",
    title: "Трансформација института",
    description:
      "Институционална трансформација научних установа ради постизања изврсности и бољег квалитета рада.",
  },
];

export default function SaigeProjekatPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Наука и истраживање", href: "/nauka-istrazivanje" },
          { label: "SAIGE пројекат" },
        ]}
        title="Пројекат SAIGE"
        subtitle="Акцелерација иновација и подстицај предузетништва у Републици Србији"
      />

      {/* About */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.about}>
            <div className={styles.aboutIcon}>
              <i className="fas fa-lightbulb" aria-hidden />
            </div>
            <div className={styles.aboutContent}>
              <h2>О пројекту SAIGE</h2>
              <p>
                Пројекат акцелерације иновација и подстицања раста предузетништва
                у Републици Србији — SAIGE (Serbia Accelerating Innovation and
                Entrepreneurship Project) је део реформских процеса у науци и
                подразумева трансформацију научних института кроз партнерство са
                Светском банком и Европском унијом, под покровитељством
                Министарства науке, технолошког развоја и иновација Републике
                Србије.
              </p>
              <p>
                Институт за кардиоваскуларне болести &bdquo;Дедиње&ldquo; се
                нашао у другој групи института који у оквиру SAIGE пројекта желе
                да ојачају своје капацитете, унапреде рад и ефикасније се укључе
                у међународну научну мрежу, уз помоћ међународне експертске
                процене, подршке, обука и разних видова усавршавања.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Vrednovanje 2020 */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.infoBanner}>
            <div className={styles.infoIcon}>
              <i className="fas fa-clipboard-check" aria-hidden />
            </div>
            <div className={styles.infoContent}>
              <h3>Вредновање 2020.</h3>
              <p>
                2020. године спроведен је процес вредновања Института који
                обављају научноистраживачку делатност. Институти су сами проценили
                своје тренутно стање и изјаснили се о учешћу у трансформацији чији
                је циљ осигуравање бољег квалитета научноистраживачког рада,
                подстицање иновативног предузетништва и лакши приступ изворима
                финансирања — у интересу раста српске економије и ојачавања
                установа.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3 dela projekta */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.sectionHeader}>
            <h2>Пројекат SAIGE садржи 3 дела</h2>
            <p>Кључне компоненте пројекта трансформације науке и иновација</p>
          </div>
          <div className={styles.deloviGrid}>
            {DELOVI_PROJEKTA.map((deo, idx) => (
              <div key={idx} className={styles.deoCard}>
                <div className={styles.deoNumber}>{idx + 1}</div>
                <div className={styles.deoIcon}>
                  <i className={deo.icon} aria-hidden />
                </div>
                <h3>{deo.title}</h3>
                <p>{deo.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Memorandum banner */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.memorandumBanner}>
            <div className={styles.memorandumIcon}>
              <i className="fas fa-file-signature" aria-hidden />
            </div>
            <div className={styles.memorandumContent}>
              <h3>Меморандум о сарадњи</h3>
              <p>
                Министарство просвете, науке и технолошког развоја Републике
                Србије и Институт за кардиоваскуларне болести Дедиње 03. 08.
                2022. године потписали су Меморандум о сарадњи и подршци процесу
                институционалне трансформације са циљем постизања изврсности у
                науци и подизању квалитета научноистраживачког рада.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
