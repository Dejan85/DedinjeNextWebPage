import { Container, PageHeader, Section } from "@/components/shared";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

export { generateMetadata };

const OBUKE = [
  { year: "1976.", text: "Словенија" },
  { year: "1979.", text: "Праг" },
  { year: "1995.", text: "Хановер" },
  { year: "2018.", text: "Беч" },
  { year: "2023.", text: "Будимпешта" },
];

const EDUKATORI = [
  "Биљана Радосављевић (1995)",
  "Светлана Јосифовић (1996–1998)",
  "Светлана Симић (1998–2011)",
  "Драгица Токоди (2011–2016)",
  "Соња Николић (2017–2019)",
  "Мира Ранковић (2019– )",
  "Далибор Аксић (2019– )",
];

export default function IstorijatSestrinskeEdukacijePage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Едукација", href: "/edukacija" },
          { label: "Едукација медицинских сестара и техничара", href: "/edukacija/sestrinska-edukacija" },
          { label: "Историјат и међународна сарадња" },
        ]}
        title="Историјат и међународна сарадња"
        subtitle="Развој сестринске едукације од седамдесетих година прошлог века до данас"
      />

      <Section padding="medium" background="white">
        <Container>
          <div className={styles.about}>
            <div className={styles.aboutIcon}>
              <i className="fas fa-user-nurse" aria-hidden />
            </div>
            <div className={styles.aboutContent}>
              <h2>Едукација</h2>
              <p>
                Едукација медицинских сестара и техничара представља темељ
                сигурног, савременог и ефикасног здравственог система. Наш кадар
                активно учествује у свим дијагностичким и терапијским
                поступцима — било као самостални извршиоци, било као асистенти
                лекара. Свакодневни рад у нашој установи захтева врхунску
                прецизност, висок ниво стручног знања и потпуну посвећеност
                сваком пацијенту. Медицинске сестре и техничари Института су
                врхунски обучени професионалци који својим вештинама успешно
                одговарају на све изазове кардиоваскуларне неге.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.about}>
            <div className={styles.aboutIcon}>
              <i className="fas fa-earth-europe" aria-hidden />
            </div>
            <div className={styles.aboutContent}>
              <h2>Историјат и међународна сарадња</h2>
              <p>
                Улога едуковане медицинске сестре као кључног члана тима у
                кардиоваскуларној хирургији препозната је још седамдесетих
                година прошлог века. Пре почетка извођења првих операција
                аортокоронарног бајпаса, наше сестре су прошле специјализоване
                обуке у признатим европским центрима. Континуирани развој и
                праћење светских трендова настављени су стручним усавршавањима
                у водећим медицинским центрима нове генерације.
              </p>
              <ul className={styles.timeline}>
                {OBUKE.map((item) => (
                  <li key={item.year}>
                    <span className={styles.timelineYear}>{item.year}</span>
                    <span className={styles.timelineText}>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section padding="medium" background="white">
        <Container>
          <div className={styles.about}>
            <div className={styles.aboutIcon}>
              <i className="fas fa-people-group" aria-hidden />
            </div>
            <div className={styles.aboutContent}>
              <h2>Подршка и менторство за младе кадрове</h2>
              <p>
                Са циљем брже, сигурније и ефикасније интеграције нових колега у
                специфичну област кардиоваскуларне хирургије, Институт је још
                1995. године увео едукатора за медицинске сестре и техничаре.
                Кроз овај систем менторства осигуравамо континуиран пренос
                драгоценог искуства и задржавање највиших стандарда неге. Ову
                важну функцију водили су и унапређивали:
              </p>
              <ul className={styles.timeline}>
                {EDUKATORI.map((item) => (
                  <li key={item}>
                    <span className={styles.timelineText}>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Сестрински менаџмент и Центар за едукацију Института дугују
                захвалност директору Института, академику проф. др Миловану
                Бојићу, који подржава сваки вид едукације и иницијативе
                медицинских сестара и техничара ради остварења професионалних
                циљева. Посебну захвалност имамо и према Вери Вилотић,
                наставници здравствене неге, која несебично дели идеје, подржава
                реализацију и даје нам ветар у леђа.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
