import Link from "next/link";
import { Container, PageHeader, Section } from "@/components/shared";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

export { generateMetadata };

const AKTUELNOSTI = [
  {
    date: "03. 08. 2022.",
    category: "Трансформација",
    icon: "fas fa-file-signature",
    title: "Меморандум о сарадњи — SAIGE пројекат",
    summary:
      "Министарство просвете, науке и технолошког развоја Републике Србије и Институт за кардиоваскуларне болести Дедиње потписали су Меморандум о сарадњи и подршци процесу институционалне трансформације са циљем постизања изврсности у науци.",
    href: "/nauka-istrazivanje/saige-projekat",
    linkLabel: "Сазнај више о SAIGE пројекту",
  },
  {
    date: "2020.",
    category: "Вредновање",
    icon: "fas fa-clipboard-check",
    title: "Процес вредновања научноистраживачких института",
    summary:
      'Спроведен је процес вредновања Института који обављају научноистраживачку делатност. Институт за кардиоваскуларне болести „Дедиње" пријавио се у другу групу института у оквиру SAIGE пројекта.',
    href: "/nauka-istrazivanje/saige-projekat",
    linkLabel: "Детаљи пројекта",
  },
];

export default function AktuelnostiPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Наука и истраживање", href: "/nauka-istrazivanje" },
          { label: "Актуелности из науке" },
        ]}
        title="Актуелности из науке"
        subtitle="Најновије вести и дешавања из научноистраживачког рада Института"
      />

      <Section padding="medium" background="white">
        <Container>
          <div className={styles.intro}>
            <div className={styles.introIcon}>
              <i className="fas fa-newspaper" aria-hidden />
            </div>
            <div className={styles.introContent}>
              <h2>Научне активности Института</h2>
              <p>
                Пратите актуелна дешавања, пројекте и партнерства у области
                научноистраживачке делатности Института за кардиоваскуларне
                болести Дедиње.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.list}>
            {AKTUELNOSTI.map((item, idx) => (
              <article key={idx} className={styles.card}>
                <div className={styles.cardIcon}>
                  <i className={item.icon} aria-hidden />
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardCategory}>{item.category}</span>
                    <span className={styles.cardDate}>
                      <i className="fas fa-calendar-alt" aria-hidden /> {item.date}
                    </span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <Link href={item.href} className={styles.cardLink}>
                    {item.linkLabel}
                    <i className="fas fa-arrow-right" aria-hidden />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
