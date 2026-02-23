import Link from "next/link";
import {
  Container,
  PageHeader,
  ProgramCardGrid,
  Section,
} from "@/components/shared";
import { EDUKATIVNI_PROGRAMI } from "./constants";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

export { generateMetadata };

const OSTALO = [
  {
    key: "1",
    icon: "fas fa-calendar-alt",
    title: "KME 2024",
    description: "Конгрес кардиолога и електрофизиолога — акредитована КМЕ настава и предавања.",
    href: "/edukacija/kme-2024",
  },
  {
    key: "2",
    icon: "fas fa-users",
    title: "Интерна едукација",
    description: "Мултидисциплинарна континуирана едукација за медицинске сестре, техничаре и младе лекаре.",
    href: "/edukacija/interna-edukacija",
  },
  {
    key: "3",
    icon: "fas fa-laptop-medical",
    title: "Радионице",
    description: "Специјализоване практичне радионице из области кардиоваскуларне медицине и хирургије.",
    href: "/edukacija/radionice",
  },
  {
    key: "4",
    icon: "fas fa-microphone",
    title: "Конгреси",
    description: "Годишњи конгрес Института и конгрес кардиоваскуларне превенције.",
    href: "/edukacija/kongresi",
  },
  {
    key: "5",
    icon: "fas fa-globe",
    title: "Међународни конгреси",
    description: "Учешће на престижним међународним научним скуповима и размена знања.",
    href: "/edukacija/medjunarodni-kongresi",
  },
];

export default function EdukacijaPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Едукација" },
        ]}
        title="Едукација"
        subtitle="Обука, радионице и конгреси у области кардиоваскуларне медицине"
      />

      {/* About */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.about}>
            <div className={styles.aboutIcon}>
              <i className="fas fa-graduation-cap" aria-hidden />
            </div>
            <div className={styles.aboutContent}>
              <h2>О едукацији</h2>
              <p>
                {'Институт за кардиоваскуларне болести „Дедиње" је центар за едукацију и усавршавање стручњака у области кардиоваскуларне медицине. Кроз едукативне програме, радионице и конгресе пружамо могућност континуираног образовања лекара и медицинског особља.'}
              </p>
              <div className={styles.aboutStats}>
                <div className={styles.stat}>
                  <span className={styles.statNum}>3</span>
                  <span className={styles.statLabel}>Школе</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNum}>5+</span>
                  <span className={styles.statLabel}>Конгреса годишње</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNum}>200+</span>
                  <span className={styles.statLabel}>Полазника</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNum}>15+</span>
                  <span className={styles.statLabel}>Година искуства</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Programs */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.sectionHeader}>
            <div>
              <h2>Едукативни програми</h2>
              <p>Акредитоване школе за стручно усавршавање</p>
            </div>
          </div>
          <ProgramCardGrid items={EDUKATIVNI_PROGRAMI} />
        </Container>
      </Section>

      {/* Other */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.sectionHeader}>
            <div>
              <h2>Конгреси, радионице и друге активности</h2>
              <p>Све едукативне активности Института Дедиње</p>
            </div>
          </div>
          <div className={styles.grid}>
            {OSTALO.map((item, idx) => (
              <Link
                key={item.key}
                href={item.href}
                className={styles.card}
              >
                <div className={styles.cardLeft}>
                  <div className={styles.cardIcon}>
                    <i className={item.icon} aria-hidden />
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div className={styles.cardArrow}>
                  <i className="fas fa-arrow-right" aria-hidden />
                </div>
                <span className={styles.cardNumber}>{String(idx + 1).padStart(2, "0")}</span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
