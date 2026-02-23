import { Container, PageHeader, Section } from "@/components/shared";
import { Heading, Text } from "@/components/typography";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

const OGLASI = [
  {
    id: "1",
    date: "10. фебруар 2026.",
    title: "Конкурс за пријем лекара специјалиста кардиологије",
    type: "Запошљавање",
    text: "Институт за кардиоваскуларне болести Дедиње расписује конкурс за пријем лекара специјалиста кардиологије на неодређено време. Потребно радно искуство: минимум 3 године у области интервентне кардиологије.",
    active: true,
  },
  {
    id: "2",
    date: "05. фебруар 2026.",
    title: "Оглас за набавку медицинске опреме",
    type: "Јавна набавка",
    text: "Институт Дедиње објављује јавни позив за набавку ехокардиографских апарата и пратеће опреме за потребе Одељења за неинвазивну дијагностику.",
    active: true,
  },
  {
    id: "3",
    date: "15. јануар 2026.",
    title: "Конкурс за медицинске сестре/техничаре",
    type: "Запошљавање",
    text: "Расписује се конкурс за пријем медицинских сестара/техничара за рад на Одељењу интензивног лечења. Услов: завршена средња медицинска школа и положен стручни испит.",
    active: false,
  },
];

export { generateMetadata };

export default function OglasiKonkursiPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Актуелности", href: "/aktuelnosti" },
          { label: "Огласи и конкурси" },
        ]}
        title="Огласи и конкурси"
        subtitle="Отворене позиције и јавне набавке"
      />

      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.newsList}>
            {OGLASI.map((item) => (
              <article key={item.id} className={styles.newsItem}>
                <div className={styles.newsTop}>
                  <div className={styles.newsDate}>
                    <i className="fas fa-calendar-alt" aria-hidden />
                    <span>{item.date}</span>
                  </div>
                  <span className={`${styles.badge} ${item.active ? styles.badgeActive : styles.badgeClosed}`}>
                    {item.active ? "Активан" : "Затворен"}
                  </span>
                </div>
                <span className={styles.type}>{item.type}</span>
                <Heading variant="h3" text={item.title} />
                <Text variant="body" text={item.text} />
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
