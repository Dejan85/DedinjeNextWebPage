import { Container, PageHeader, Section } from "@/components/shared";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

export { generateMetadata };

const DOKUMENTACIJA = [
  "Молба за обављање приправничког стажа",
  "Оверена фотокопија дипломе",
  "Очитана лична карта",
  "Картон вакцинације",
  "Санитарна књижица",
];

const SKOLE = [
  "Медицинска школа „Надежда Петровић“ — Земун",
  "Медицинска школа „Београд“ — Звездара",
  "Медицинска школа са домом ученика „Сестре Нинковић“ — Крагујевац",
  "Медицинска школа „Др Андра Јовановић“ — Шабац",
  "Медицинска школа Краљево",
  "Медицинска школа „7. април“ — Нови Сад",
];

export default function PripravnickiStazPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Едукација", href: "/edukacija" },
          { label: "Едукација медицинских сестара и техничара", href: "/edukacija/sestrinska-edukacija" },
          { label: "Приправнички стаж" },
        ]}
        title="Приправнички стаж"
        subtitle="Стажирање медицинских сестара и техничара у ИКВБ Дедиње"
      />

      <Section padding="medium" background="white">
        <Container>
          <div className={styles.about}>
            <div className={styles.aboutIcon}>
              <i className="fas fa-user-graduate" aria-hidden />
            </div>
            <div className={styles.aboutContent}>
              <h2>О приправничком стажу</h2>
              <p>
                Стажирање у Институту за кардиоваскуларне болести „Дедиње“ је
                први корак ка професионалном развоју и лидерству у здравству.
                Циљ је да образујемо и подржавамо нове генерације медицинских
                сестара и техничара који ће наставити традицију изузетности,
                верујући у знање, тимски рад и континуирано усавршавање као
                основу савремене кардиоваскуларне медицине.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.about}>
            <div className={styles.aboutIcon}>
              <i className="fas fa-file-signature" aria-hidden />
            </div>
            <div className={styles.aboutContent}>
              <h2>Пријава и потребна документација</h2>
              <p>
                Пријава се врши лично у правно-кадровској служби ИКВБ „Дедиње“,
                или слањем документације на е-пошту: dedinje@ikvbd.com. За
                пријављивање је потребно приложити следећу документацију:
              </p>
              <ul className={styles.list}>
                {DOKUMENTACIJA.map((item) => (
                  <li key={item}>
                    <i className="fas fa-check" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <p className={styles.contactNote}>
                За сва питања и консултације обратите се Далибору Аксићу, контакт
                телефон: 064 175 3309.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section padding="medium" background="white">
        <Container>
          <div className={styles.about}>
            <div className={styles.aboutIcon}>
              <i className="fas fa-school" aria-hidden />
            </div>
            <div className={styles.aboutContent}>
              <h2>Сарадња са средњим медицинским школама</h2>
              <p>
                У циљу унапређења стручног усавршавања и професионалне
                оријентације ученика, организована су гостовања у средњим
                медицинским школама, са предавањима о програму стручне праксе
                (стажирања) у Институту. Гостовања су организована у сарадњи са
                управама школа и наставним особљем, кроз интеракцију, питања и
                дискусију са ученицима.
              </p>
              <ul className={`${styles.list} ${styles.schoolGrid}`}>
                {SKOLE.map((skola) => (
                  <li key={skola}>
                    <i className="fas fa-graduation-cap" aria-hidden />
                    {skola}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.about}>
            <div className={styles.aboutIcon}>
              <i className="fas fa-calendar-days" aria-hidden />
            </div>
            <div className={styles.aboutContent}>
              <h2>Дани посете Институту</h2>
              <p>
                Матуранти Медицинске школе „7. април“ из Новог Сада и
                Медицинске школе из Ужица посетили су Институт и имали прилику
                да се упознају са радним окружењем, обиђу релевантне
                организационе јединице и додатно продубе своје знање кроз
                директан контакт са здравственим професионалцима — значајан
                корак ка још квалитетнијем повезивању теоријског знања са
                практичним искуством.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
