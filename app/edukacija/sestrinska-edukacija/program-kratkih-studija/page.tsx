import { Container, PageHeader, Section } from "@/components/shared";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

export { generateMetadata };

export default function ProgramKratkihStudijaPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Едукација", href: "/edukacija" },
          { label: "Едукација медицинских сестара и техничара", href: "/edukacija/sestrinska-edukacija" },
          { label: "Програм кратких студија" },
        ]}
        title="Програм кратких студија"
        subtitle="Заједнички програм Факултета медицинских наука у Крагујевцу и Института Дедиње"
      />

      <Section padding="medium" background="white">
        <Container>
          <div className={styles.about}>
            <div className={styles.aboutIcon}>
              <i className="fas fa-book-medical" aria-hidden />
            </div>
            <div className={styles.aboutContent}>
              <h2>О програму</h2>
              <p>
                Факултет медицинских наука у Крагујевцу и Институт за
                кардиоваскуларне болести „Дедиње“ покренули су јединствен
                програм кратких студија који превазилази недостатке
                традиционалног система образовања — по први пут системски
                школује кадар за рад на најзахтевнијим радним местима.
              </p>
              <div className={styles.grid}>
                <div className={styles.card}>
                  <h4>Зашто овај програм?</h4>
                  <p>
                    У постојећем систему средњих, виших школа и факултета није
                    постојао наменски програм за рад у Јединицама интензивног
                    лечења по савременим светским стандардима, као ни за
                    биомедицинске технологије — вантелесни крвоток и механички
                    асистирану циркулацију.
                  </p>
                </div>
                <div className={styles.card}>
                  <h4>Врхунски спој теорије и праксе</h4>
                  <p>
                    Експертски тим наставника, сарадника, истраживача и искусног
                    средњег медицинског кадра, најмодернија опрема Института и
                    симулационо учење засновано на реалним клиничким
                    сценаријима чине овај модел јединственим на овим просторима.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.about}>
            <div className={styles.aboutIcon}>
              <i className="fas fa-calendar-check" aria-hidden />
            </div>
            <div className={styles.aboutContent}>
              <h2>Структура и трајање студија</h2>
              <p>
                Програм се реализује према званично акредитованом наставном
                плану: теоријска предавања одржавају се суботом, а практична
                настава током радне недеље.
              </p>
              <div className={styles.statsRow}>
                <div className={styles.stat}>
                  <span className={styles.statNum}>6</span>
                  <span className={styles.statLabel}>Месеци</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNum}>60</span>
                  <span className={styles.statLabel}>ЕСПБ бодова</span>
                </div>
              </div>
              <p className={styles.examNote}>
                Завршни испит организован је кроз две фазе: завршни тест са 50
                питања и израду и одбрану стручног семинарског рада.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
