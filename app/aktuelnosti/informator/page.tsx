import { Container, PageHeader, Section } from "@/components/shared";
import { Heading, Text } from "@/components/typography";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

const INFORMATOR_SEKCIJE = [
  {
    icon: "fas fa-landmark",
    title: "Основни подаци",
    description: "Пун назив, седиште, матични број, ПИБ, оснивач и правни статус Института за кардиоваскуларне болести Дедиње.",
  },
  {
    icon: "fas fa-sitemap",
    title: "Организациона структура",
    description: "Унутрашња организација Института – клинике, одељења, службе и органи управљања.",
  },
  {
    icon: "fas fa-gavel",
    title: "Прописи и акти",
    description: "Закони, подзаконски акти и интерни акти на основу којих Институт обавља своју делатност.",
  },
  {
    icon: "fas fa-money-bill-wave",
    title: "Буџет и финансије",
    description: "Информације о изворима финансирања, буџету и финансијским извештајима Института.",
  },
  {
    icon: "fas fa-hands-helping",
    title: "Услуге и права грађана",
    description: "Информације о услугама које Институт пружа, правима пацијената и поступку остваривања права.",
  },
  {
    icon: "fas fa-envelope-open-text",
    title: "Подношење захтева",
    description: "Упутство за подношење захтева за слободан приступ информацијама од јавног значаја.",
  },
];

export { generateMetadata };

export default function InformatorPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Актуелности", href: "/aktuelnosti" },
          { label: "Информатор о раду" },
        ]}
        title="Информатор о раду"
        subtitle="У складу са Законом о слободном приступу информацијама од јавног значаја"
      />

      <Section padding="medium" background="gray">
        <Container>
          <Heading variant="h2" text="О информатору" className={styles.sectionTitle} />
          <Text
            variant="body"
            text="Информатор о раду Института за кардиоваскуларне болести Дедиње припремљен је у складу са чланом 39. Закона о слободном приступу информацијама од јавног значаја и Упутством за израду и објављивање информатора о раду државног органа."
          />
          <Text
            variant="body"
            text="Циљ информатора је да заинтересованим лицима омогући увид у основне податке о раду Института, унутрашњој организацији, надлежностима, услугама и поступцима."
          />
        </Container>
      </Section>

      <Section padding="medium" background="white">
        <Container>
          <Heading variant="h2" text="Садржај информатора" align="center" className={styles.sectionTitle} />
          <div className={styles.sectionsGrid}>
            {INFORMATOR_SEKCIJE.map((sekcija) => (
              <div key={sekcija.title} className={styles.sectionCard}>
                <div className={styles.cardIcon}>
                  <i className={sekcija.icon} aria-hidden />
                </div>
                <h3>{sekcija.title}</h3>
                <p>{sekcija.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
