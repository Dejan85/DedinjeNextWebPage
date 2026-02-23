import { Container, PageHeader, Section, StatItem } from "@/components/shared";
import { Heading, Text } from "@/components/typography";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

const BAZICNI_PROGRAM = [
  {
    icon: "fas fa-wave-square",
    title: "Општи принципи ултрасонографске дијагностике",
  },
  {
    icon: "fas fa-head-side-medical",
    title: "Ултрасонографија супрааорталних грана",
  },
  {
    icon: "fas fa-lungs",
    title: "Ултрасонографија абдоминалне аорте и висцералних артерија",
  },
  {
    icon: "fas fa-person",
    title: "Ултрасонографија артерија и вена доњих екстремитета",
  },
];

const PRAKTICNI_ISPIT = [
  "Један преглед супрааортних грана: каротидних, вертебралних артерија, трунцуса брахиоцефаликуса и субклавијалних артерија.",
  "Један преглед артерија и вена горњих и/или доњих екстремитета.",
  "Један преглед абдоминалне аорте и висцералних артерија.",
];

export { generateMetadata };

export default function SkolaVaskularnogUltrazvukaPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Едукација", href: "/edukacija" },
          { label: "Едукативни програми", href: "/edukacija/programi" },
          { label: "Школа васкуларног ултразвука" },
        ]}
        title="Школа васкуларног ултразвука"
      />

      {/* Базични програм */}
      <Section padding="medium" background="gray">
        <Container>
          <Heading variant="h2" text="Базични програм школе" align="center" className={styles.sectionTitle} />
          <div className={styles.programGrid}>
            {BAZICNI_PROGRAM.map((item) => (
              <div key={item.title} className={styles.programCard}>
                <div className={styles.programCardIcon}>
                  <i className={item.icon} aria-hidden />
                </div>
                <h3>{item.title}</h3>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Статистика */}
      <Section padding="small" background="white">
        <Container>
          <div className={styles.statsRow}>
            <StatItem value="1" label="Недеља теорије" />
            <StatItem value="2" label="Месеца праксе" />
            <StatItem value="200+" label="Прегледа укупно" />
            <StatItem value="2" label="Дела испита" />
          </div>
        </Container>
      </Section>

      {/* Програм школе */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.courseHeader}>
            <span className={styles.courseIcon}>
              <i className="fas fa-graduation-cap" aria-hidden />
            </span>
            <Heading variant="h2" text="Програм школе" />
          </div>
          <Text
            variant="body"
            text="Настава се састоји из теоретског и практичног дела."
            className={styles.introText}
          />

          <div className={styles.courseDetails}>
            <div className={styles.courseDetail}>
              <div className={styles.detailIcon}>
                <i className="fas fa-book" aria-hidden />
              </div>
              <div>
                <h4>Теоријска настава</h4>
                <p>Теоријска настава се одвија 5 до 7 часова дневно током недељу дана. Након тога се полаже квалификациони тест који лекаре оспособљава за праћење практичне наставе.</p>
              </div>
            </div>
            <div className={styles.courseDetail}>
              <div className={styles.detailIcon}>
                <i className="fas fa-hand-holding-medical" aria-hidden />
              </div>
              <div>
                <h4>Практична настава</h4>
                <p>У току наредна 2 месеца одвија се практична настава у преподневним и послеподневним терминима (од 12 до 16 часова и од 16 до 20 часова) и у договору са самим кандидатима. Практични рад се одвија у две смене са два полазника по апарату GE LogiQ.</p>
              </div>
            </div>
          </div>

          <div className={styles.courseHighlight}>
            <i className="fas fa-hospital" aria-hidden />
            <p>Практична едукација обухвата и присуство на васкуларном конзилијуму, боравак на одељењу васкуларне хирургије и у операционој сали ради компарације ултразвучних и интраоперативних налаза.</p>
          </div>
        </Container>
      </Section>

      {/* Минимални захтеви */}
      <Section padding="medium" background="white">
        <Container>
          <Heading variant="h2" text="Минимални захтеви" align="center" className={styles.sectionTitle} />
          <Text
            variant="body"
            align="center"
            text="За време едукације сваки полазник мора самостално да уради:"
            className={styles.sectionSubtitle}
          />
          <div className={styles.requirementsRow}>
            <div className={styles.requirementStat}>
              <div className={styles.requirementNumber}>100+</div>
              <p>прегледа супрааортних грана</p>
            </div>
            <div className={styles.requirementStat}>
              <div className={styles.requirementNumber}>50+</div>
              <p>прегледа абдоминалне аорте са висцералним артеријама</p>
            </div>
            <div className={styles.requirementStat}>
              <div className={styles.requirementNumber}>50+</div>
              <p>прегледа артерија и вена горњих и доњих екстремитета</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Завршни испит и сертификат */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.examGrid}>
            <div className={styles.examCard}>
              <div className={styles.examCardIcon}>
                <i className="fas fa-clipboard-check" aria-hidden />
              </div>
              <Heading variant="h3" text="Завршни испит" />
              <Text variant="body" text="Завршни испит се састоји из два дела. Практични испит у току кога полазник обавља:" />
              <ul className={styles.examList}>
                {PRAKTICNI_ISPIT.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Text
                variant="body"
                text="Преглед се тумачи усмено и пише се завршни налаз који прати и оцењује именована комисија. Завршни тест се процењује комисијски."
              />
            </div>

            <div className={styles.examCard}>
              <div className={styles.examCardIcon}>
                <i className="fas fa-certificate" aria-hidden />
              </div>
              <Heading variant="h3" text="Сертификат" />
              <Text
                variant="body"
                text="Полазници школе за ултрасонографску ангиолошку дијагностику добијају сертификат који званично потврђује оспособљеност за обављање и интерпретацију налаза из ултрасонографије супрааортних грана, абдоминалне аорте са висцералним гранама, као и артерија и вена горњих и доњих екстремитета."
              />
              <div className={styles.accreditationBadge}>
                <i className="fas fa-award" aria-hidden />
                <span>Школа је акредитована од стране Здравственог савета Републике Србије, полазници добијају бодове.</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
