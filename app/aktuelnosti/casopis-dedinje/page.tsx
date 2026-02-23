import { Container, PageHeader, Section } from "@/components/shared";
import { Heading, Text } from "@/components/typography";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

const IZDANJA = [
  {
    id: "1",
    volume: "Вол. 12, Бр. 1",
    year: "2025",
    title: "Кардиоваскуларна хирургија и интервентна кардиологија",
    topics: ["Минимално инвазивна кардиохирургија", "ТАВИ процедуре", "Хибридне операције"],
  },
  {
    id: "2",
    volume: "Вол. 11, Бр. 2",
    year: "2024",
    title: "Ехокардиографија и имиџинг",
    topics: ["3D ехокардиографија", "Стрес ехо протоколи", "Кардио МР"],
  },
  {
    id: "3",
    volume: "Вол. 11, Бр. 1",
    year: "2024",
    title: "Васкуларна хирургија и ангиологија",
    topics: ["Каротидна хирургија", "Ендоваскуларне процедуре", "Васкуларни ултразвук"],
  },
];

export { generateMetadata };

export default function CasopisDedinjePage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Актуелности", href: "/aktuelnosti" },
          { label: "Часопис Дедиње" },
        ]}
        title="Часопис Дедиње"
        subtitle="Стручни часопис из области кардиоваскуларне медицине"
      />

      <Section padding="medium" background="gray">
        <Container>
          <Heading variant="h2" text="О часопису" className={styles.sectionTitle} />
          <Text
            variant="body"
            text="Часопис Дедиње је стручна публикација Института за кардиоваскуларне болести Дедиње која објављује научне и клиничке радове из области кардиоваскуларне медицине, хирургије и дијагностике. Часопис излази два пута годишње и садржи оригиналне радове, прегледне чланке и приказе случајева."
          />
        </Container>
      </Section>

      <Section padding="medium" background="white">
        <Container>
          <Heading variant="h2" text="Издања" align="center" className={styles.sectionTitle} />
          <div className={styles.issuesList}>
            {IZDANJA.map((issue) => (
              <article key={issue.id} className={styles.issueCard}>
                <div className={styles.issueHeader}>
                  <div className={styles.issueIcon}>
                    <i className="fas fa-book-open" aria-hidden />
                  </div>
                  <div>
                    <span className={styles.issueVolume}>{issue.volume}</span>
                    <span className={styles.issueYear}>{issue.year}</span>
                  </div>
                </div>
                <h3>{issue.title}</h3>
                <div className={styles.topicsList}>
                  {issue.topics.map((topic) => (
                    <span key={topic} className={styles.topic}>{topic}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
