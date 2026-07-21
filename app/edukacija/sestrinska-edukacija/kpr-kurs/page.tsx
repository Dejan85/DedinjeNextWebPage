import { Container, PageHeader, Section } from "@/components/shared";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

export { generateMetadata };

const CILJEVI = [
  "Упознавање са најновијим домаћим и светским препорукама за спровођење основних и виших мера оживљавања одраслих",
  "Савладавање мануелних вештина које се примењују током КПР-а",
  "Усвајање алгоритама за реанимацију у специфичним околностима",
];

const PROGRAM = [
  "Теоријска предавања и стручне демонстрације",
  "Увежбавање проходности дисајног пута",
  "Правилно извођење оксигенотерапије",
  "Поступак безбедне дефибрилације",
  "Симулација рада у реанимационом тиму",
];

const ORGANIZACIJA = [
  { title: "Интерактиван приступ", desc: "Курс је конципиран кроз активан практичан рад." },
  { title: "Мале групе", desc: "Групе од 6 полазника." },
  { title: "Индивидуални рад", desc: "На три реанимационе лутке (манекена) ради по један едукатор са два полазника." },
  { title: "Предавачки тим", desc: "Један лекар и две медицинске сестре / техничара." },
];

export default function KprKursPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Едукација", href: "/edukacija" },
          { label: "Едукација медицинских сестара и техничара", href: "/edukacija/sestrinska-edukacija" },
          { label: "Курс КПР" },
        ]}
        title="Примена стандарда у кардиопулмоналној реанимацији одраслих особа"
        subtitle="Курс кардиопулмоналне реанимације за медицинске сестре и техничаре"
      />

      <Section padding="medium" background="white">
        <Container>
          <div className={styles.about}>
            <div className={styles.aboutIcon}>
              <i className="fas fa-heart-pulse" aria-hidden />
            </div>
            <div className={styles.aboutContent}>
              <h2>О курсу</h2>
              <p>
                Кардиопулмонално-церебрална реанимација (КПЦР), или ресусцитација
                (термин који је увео др Петер Сафар, 1924–2003), представља скуп
                хитних медицинских мера које се примењују код особе која је
                доживела застој рада срца и/или застој дисања (кардиореспираторни
                арест). Основни циљ реанимације је допремање кисеоника до мозга,
                срца и осталих виталних органа — ове мере се спроводе све док се
                сложенијим медицинским поступцима не успоставе адекватна срчана
                акција и спонтано дисање.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.about}>
            <div className={styles.aboutIcon}>
              <i className="fas fa-bullseye" aria-hidden />
            </div>
            <div className={styles.aboutContent}>
              <h2>Циљеви курса</h2>
              <ul className={styles.list}>
                {CILJEVI.map((item) => (
                  <li key={item}>
                    <i className="fas fa-check" aria-hidden />
                    {item}
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
              <i className="fas fa-list-check" aria-hidden />
            </div>
            <div className={styles.aboutContent}>
              <h2>Програм и садржај</h2>
              <ul className={styles.list}>
                {PROGRAM.map((item) => (
                  <li key={item}>
                    <i className="fas fa-check" aria-hidden />
                    {item}
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
              <i className="fas fa-users-gear" aria-hidden />
            </div>
            <div className={styles.aboutContent}>
              <h2>Организација рада</h2>
              <div className={styles.orgGrid}>
                {ORGANIZACIJA.map((item) => (
                  <div key={item.title} className={styles.orgCard}>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
