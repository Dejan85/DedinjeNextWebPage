import { Container, Image, PageHeader, ProgramCardGrid, Section, StatItem } from "@/components/shared";
import { Heading, Text } from "@/components/typography";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

const KURSEVI_KARTICE = [
  {
    id: "bazicna",
    title: "Базична ехокардиографија",
    icon: "fas fa-heart-pulse",
    href: "#bazicna-ehokardiografija",
    buttonText: "Базична ехокардиографија",
  },
  {
    id: "transsezofagealna",
    title: "Трансезофагеална ехокардиографија",
    icon: "fas fa-heart",
    href: "#transsezofagealna",
    buttonText: "Трансезофагеална ехокардиографија",
  },
  {
    id: "stres",
    title: "Стрес ехокардиографија",
    icon: "fas fa-heart-pulse",
    href: "#stres",
    buttonText: "Стрес ехокардиографија",
  },
];

const UCESNICI = [
  { name: "Проф. др Александра Николић", role: "руководилац програма" },
  { name: "Доц. др Слободан Томић и др Милан Вуковић", role: "коруководиоци програма" },
  { name: "Др Љиљана Тркуља" },
  { name: "Мр. сци. мед. Снежана Димитријевић" },
  { name: "Др Бранислава Борзановић" },
  { name: "Др Драгана Радоичић" },
  { name: "Др Јована Лакчевић" },
  { name: "Др Стефан Вељковић" },
  { name: "Др Ана Перуничић" },
];

const EHOTEHNICARI = [
  "Сања Вучинић",
  "Сања Каблар",
  "Лидија Милуновић",
  "Мира Гојковић",
  "Сања Берић",
  "Биљана Јеринић",
  "Јелена Милајић",
  "Вида Каитовић",
  "Милица Глишић",
];

export { generateMetadata };

export default function SkolaEhokardiografijePage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Едукација", href: "/edukacija" },
          { label: "Едукативни програми", href: "/edukacija/programi" },
          { label: "Школа ехокардиографије" },
        ]}
        title="Школа ехокардиографије"
        subtitle="Проф. др Александра Николић"
      />

      {/* О програму */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.introGrid}>
            <div className={styles.introText}>
              <Heading variant="h2" text="О програму" />
              <Text
                variant="body"
                text={'Институт за кардиоваскуларне болести „Дедиње" велику пажњу посвећује едукацији лекара који су запослени у Институту, али и лекарима из других установа у земљи и свету, који су различитих специјалности, у различитим субдисциплинама кардиоваскуларне медицине и имиџинга, али и у новим технологијама које Институт Дедиње континуирано развија. Зато ову школу води Проф. др Александра Николић.'}
              />
              <Text
                variant="body"
                text="Школа ехокардиографије спада у један од најстаријих едукативних програма Института Дедиње и за сада обухвата базични курс из трансторакалне ехокардиографије и два напредна курса – из трансезофагеалне ехокардиографије и стрес ехокардиографије."
              />
            </div>
            <div className={styles.introImages}>
              <div className={styles.imageWrap}>
                <Image
                  src="/images/13-600x727.png"
                  alt="Школа ехокардиографије – Институт Дедиње"
                  width={600}
                  height={727}
                />
              </div>
              <div className={styles.imageWrap}>
                <Image
                  src="/images/21-600x416.png"
                  alt="Школа ехокардиографије – едукација"
                  width={600}
                  height={416}
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Статистика */}
      <Section padding="small" background="white">
        <Container>
          <div className={styles.statsRow}>
            <StatItem value="27+" label="Одржаних курсева" />
            <StatItem value="350+" label="Полазника" />
            <StatItem value="2007" label="Година оснивања" />
            <StatItem value="3" label="Типа курсева" />
          </div>
        </Container>
      </Section>

      {/* Курсеви навигација */}
      <Section padding="medium" background="gray">
        <Container>
          <Heading variant="h2" text="Курсеви" align="center" className={styles.sectionTitle} />
          <Text
            variant="body"
            align="center"
            text="Сви курсеви ехокардиографије Института Дедиње настоје да прате трендове савремене ехокардиографије и исте примењују у едукацији пратећи последње ESC и ACC/AHA препоруке."
            className={styles.sectionSubtitle}
          />
          <ProgramCardGrid items={KURSEVI_KARTICE} className={styles.kurseviGrid} />
        </Container>
      </Section>

      {/* Базична ехокардиографија */}
      <Section padding="medium" background="white">
        <Container>
          <div id="bazicna-ehokardiografija" className={styles.courseSection}>
            <div className={styles.courseHeader}>
              <span className={styles.courseIcon}>
                <i className="fas fa-heart-pulse" aria-hidden />
              </span>
              <Heading variant="h2" text="Базична ехокардиографија" />
            </div>

            <Text
              variant="body"
              text="Први курс базичне ехокардиографије почео је 24. септембра 2007. године и обухватио је едукацију 13 полазника. Од 2007. године до данас било је 27. курсева базичне ехокардиографије при чему су најчешће одржавана по два курса годишње у трајању од по 12 недеља. Курсеви базичне ехокардиографије нису прекинути ни током пандемије SARS-CoV-2 вируса, али су били модификовани у практичном приступу, а све у складу са тада актуелном епидемиолошком ситуацијом. Базични курс ехокардиографије до сада је завршило преко 350 полазника."
            />

            <div className={styles.courseDetails}>
              <div className={styles.courseDetail}>
                <div className={styles.detailIcon}>
                  <i className="fas fa-book" aria-hidden />
                </div>
                <div>
                  <h4>Теоријски део</h4>
                  <p>Траје пет радних дана. Полазници имају прилику да чују предавања предавача са нашег Института, али и водећих стручњака из других терцијарних здравствених установа у Београду. Предавања су тематски подељена по данима.</p>
                </div>
              </div>
              <div className={styles.courseDetail}>
                <div className={styles.detailIcon}>
                  <i className="fas fa-hand-holding-medical" aria-hidden />
                </div>
                <div>
                  <h4>Практични део</h4>
                  <p>Састоји се од 11 недеља континуиране hands-on обуке у ехокардиографским кабинетима Института Дедиње. Полазници су подељени у две смене како би свако самостално урадио предвиђен број прегледа.</p>
                </div>
              </div>
              <div className={styles.courseDetail}>
                <div className={styles.detailIcon}>
                  <i className="fas fa-graduation-cap" aria-hidden />
                </div>
                <div>
                  <h4>Завршни испит</h4>
                  <p>Курс се завршава полагањем теоријског испита (тест од 30 питања) и практичног испита (рад са пацијентима), као завршне анализе свега што су током едукације научили.</p>
                </div>
              </div>
            </div>

            <div className={styles.courseHighlight}>
              <i className="fas fa-globe" aria-hidden />
              <p>Једна од чињеница на које смо најпоноснији је да се код нас, осим лекара из Београда и осталих градова у Републици Србији, едуковао и велики број полазника из земаља из окружења.</p>
            </div>

            <div className={styles.singleImage}>
              <Image
                src="/images/4-600x443.png"
                alt="Базични курс ехокардиографије – Институт Дедиње"
                width={600}
                height={443}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ТЕЕ и Стрес */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.coursesGrid}>
            <div id="transsezofagealna" className={styles.courseCard}>
              <div className={styles.courseCardIcon}>
                <i className="fas fa-heart" aria-hidden />
              </div>
              <Heading variant="h3" text="Курс трансезофагеалне ехокардиографије" />
              <Text
                variant="body"
                text="Курс трансезофагеалне ехокардиографије (ТЕЕ) започет је 2009. године. До сада је одржано пет курсева. Неопходан услов за курс ТЕЕ је знање трансторакалне ехокардиографије. Трајање курса је два месеца, од чега су предавања организована у првој недељи, а потом следи практични део у наредних седам недеља, који обухвата ТЕЕ прегледе у ехокардиографским кабинетима, али и интраоперативне и периинтервентне ТЕЕ прегледе."
              />
              <div className={styles.courseCardMeta}>
                <span><i className="fas fa-clock" aria-hidden /> 2 месеца</span>
                <span><i className="fas fa-calendar" aria-hidden /> Од 2009.</span>
                <span><i className="fas fa-users" aria-hidden /> 5 курсева</span>
              </div>
            </div>

            <div id="stres" className={styles.courseCard}>
              <div className={styles.courseCardIcon}>
                <i className="fas fa-heart-pulse" aria-hidden />
              </div>
              <Heading variant="h3" text="Курс стрес ехокардиографије" />
              <Text
                variant="body"
                text="Курс стрес ехокардиографије траје месец дана, од чега су предавања организована у прва три дана курса. Неопходан услов за овај курс је знање конвенционалне трансторакалне ехокардиографије. Први курс стрес ехокардиографије одржан је 2011. године и до сада је одржано шест курсева."
              />
              <div className={styles.courseCardMeta}>
                <span><i className="fas fa-clock" aria-hidden /> 1 месец</span>
                <span><i className="fas fa-calendar" aria-hidden /> Од 2011.</span>
                <span><i className="fas fa-users" aria-hidden /> 6 курсева</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Тим */}
      <Section padding="medium" background="white">
        <Container>
          <Heading variant="h2" text="Учесници у едукацији" align="center" className={styles.sectionTitle} />
          <Text
            variant="body"
            align="center"
            text="У едукацији учествује целокупно особље Одељења неинвазивне дијагностике срца"
            className={styles.sectionSubtitle}
          />

          <div className={styles.teamGrid}>
            {UCESNICI.map((person) => (
              <div key={person.name} className={styles.teamMember}>
                <div className={styles.teamMemberIcon}>
                  <i className="fas fa-user-md" aria-hidden />
                </div>
                <div className={styles.teamMemberInfo}>
                  <h4>{person.name}</h4>
                  {person.role && <span>{person.role}</span>}
                </div>
              </div>
            ))}
          </div>

          <Heading variant="h3" text="Ехотехничари" align="center" className={styles.sectionTitle} />
          <div className={styles.techGrid}>
            {EHOTEHNICARI.map((name) => (
              <div key={name} className={styles.techMember}>
                <i className="fas fa-user-nurse" aria-hidden />
                <span>{name}</span>
              </div>
            ))}
          </div>
          <Text
            variant="small"
            align="center"
            color="muted"
            text="А до 2021. године и Весна Миливојевић и Мариенка Вереш"
            className={styles.footnote}
          />
        </Container>
      </Section>
    </>
  );
}
