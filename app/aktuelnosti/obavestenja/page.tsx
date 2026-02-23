import { Container, PageHeader, Section } from "@/components/shared";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

const OBAVESTENJA = [
  {
    id: "1",
    date: "15. фебруар 2026.",
    icon: "fas fa-clock",
    type: "Радно време",
    title: "Радно време за време празника",
    text: "Обавештавамо пацијенте да ће Институт Дедиње радити по измењеном распореду током предстојећих празника. Амбулантни прегледи неће се обављати, док ће ургентни пријем радити 24 часа.",
    important: true,
  },
  {
    id: "2",
    date: "01. фебруар 2026.",
    icon: "fas fa-heartbeat",
    type: "Опрема",
    title: "Нови апарати за дијагностику",
    text: "Институт Дедиње је набавио најсавременије апарате за ехокардиографску и васкуларну дијагностику, чиме се додатно унапређује квалитет прегледа и скраћује време чекања.",
    important: false,
  },
  {
    id: "3",
    date: "20. јануар 2026.",
    icon: "fas fa-graduation-cap",
    type: "Едукација",
    title: "Позив за едукативне програме",
    text: "Отворене су пријаве за нови циклус базичне школе ехокардиографије. Курс почиње у марту 2026. године. Заинтересовани кандидати могу се пријавити путем контакт форме на сајту.",
    important: false,
  },
  {
    id: "4",
    date: "10. јануар 2026.",
    icon: "fas fa-hospital",
    type: "Информација",
    title: "Нова амбуланта за васкуларну дијагностику",
    text: "Од 15. јануара 2026. године, Институт Дедиње отвара нову амбуланту за васкуларну ултразвучну дијагностику на другом спрату главне зграде. Заказивање путем телефона 011 360 1669.",
    important: false,
  },
  {
    id: "5",
    date: "28. децембар 2025.",
    icon: "fas fa-users",
    type: "Кадрови",
    title: "Нови специјалисти у тиму Института",
    text: "Институт Дедиње са задовољством најављује пријем три нова специјалиста кардиологије и два васкуларна хирурга који ће додатно ојачати стручни тим Института.",
    important: false,
  },
];

export { generateMetadata };

export default function ObavestenjaPage() {
  const featured = OBAVESTENJA[0];
  const rest = OBAVESTENJA.slice(1);

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Актуелности", href: "/aktuelnosti" },
          { label: "Обавештења" },
        ]}
        title="Обавештења"
        subtitle="Званична обавештења Института Дедиње"
      />

      {/* Featured */}
      <Section padding="medium" background="white">
        <Container>
          <article className={styles.featured}>
            <div className={styles.featuredIcon}>
              <i className={featured.icon} aria-hidden />
            </div>
            <div className={styles.featuredContent}>
              <div className={styles.featuredTop}>
                <span className={styles.typeBadge}>{featured.type}</span>
                <span className={styles.dateText}>
                  <i className="fas fa-calendar-alt" aria-hidden /> {featured.date}
                </span>
                {featured.important && (
                  <span className={styles.importantBadge}>
                    <i className="fas fa-exclamation-circle" aria-hidden /> Важно
                  </span>
                )}
              </div>
              <h2>{featured.title}</h2>
              <p>{featured.text}</p>
            </div>
          </article>
        </Container>
      </Section>

      {/* Rest */}
      <Section padding="medium" background="gray">
        <Container>
          <h2 className={styles.sectionTitle}>Ранија обавештења</h2>
          <div className={styles.grid}>
            {rest.map((item) => (
              <article key={item.id} className={styles.card}>
                <div className={styles.cardIcon}>
                  <i className={item.icon} aria-hidden />
                </div>
                <div className={styles.cardTop}>
                  <span className={styles.typeBadgeSmall}>{item.type}</span>
                  <span className={styles.dateSmall}>
                    <i className="fas fa-calendar-alt" aria-hidden /> {item.date}
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
