import { Container, Image, PageHeader, Section } from "@/components/shared";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

const RADIONICE_IMAGES = [
  {
    src: "/images/CMR-POKRIVALICA-800x450.jpg",
    alt: "CMR in Modern Cardiology – International Workshop",
    width: 800,
    height: 450,
  },
  {
    src: "/images/IKVBD-3D-800x450.jpg",
    alt: "IKVBD MedTech 3D Workshop",
    width: 800,
    height: 450,
  },
  {
    src: "/images/Micovic-800x448.jpg",
    alt: "Minimally Invasive Aortic Valve Surgery – Virtual Workshop",
    width: 800,
    height: 448,
  },
];

const KARAKTERISTIKE = [
  {
    icon: "fas fa-globe",
    title: "Међународно учешће",
    description: "Радионице привлаче стручњаке из различитих области широм света и омогућавају размену искустава на глобалном нивоу.",
  },
  {
    icon: "fas fa-microscope",
    title: "Иновације и технологије",
    description: "Имплементација нових технологија и метода лечења кардиоваскуларних болести кроз практичне демонстрације.",
  },
  {
    icon: "fas fa-hands-helping",
    title: "Практична настава",
    description: "Директан рад са најсавременијом опремом и техникама у инспиративном окружењу Института Дедиње.",
  },
];

export { generateMetadata };

export default function RadionicePage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Едукација", href: "/edukacija" },
          { label: "Радионице" },
        ]}
        title="Радионице"
        subtitle="Размена идеја, научних открића и нових технологија"
      />

      {/* About */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.about}>
            <div className={styles.aboutIcon}>
              <i className="fas fa-laptop-medical" aria-hidden />
            </div>
            <div className={styles.aboutContent}>
              <h2>О радионицама</h2>
              <p>
                У срцу Београда, у прелепом и историјском окружењу Дедиња, одвијају
                се престижне радионице које привлаче пажњу стручњака из различитих
                области широм света. Ова ексклузивна локација, обогаћена културном
                баштином и луксузном атмосфером, пружа инспиративно окружење за
                размену идеја и научних открића.
              </p>
              <p>
                Једна од кључних карактеристика Института је константна тежња ка
                иновацијама. Својим истраживањима и имплементацијом нових технологија,
                доприносе унапређењу метода лечења кардиоваскуларних болести.
              </p>
              <div className={styles.aboutStats}>
                <div className={styles.stat}>
                  <span className={styles.statNum}>3+</span>
                  <span className={styles.statLabel}>Радионице годишње</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNum}>10+</span>
                  <span className={styles.statLabel}>Земаља</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNum}>50+</span>
                  <span className={styles.statLabel}>Учесника</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Features */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.sectionHeader}>
            <h2>Карактеристике радионица</h2>
            <p>Шта издваја наше радионице</p>
          </div>
          <div className={styles.featuresGrid}>
            {KARAKTERISTIKE.map((item) => (
              <div key={item.title} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <i className={item.icon} aria-hidden />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Gallery */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.sectionHeader}>
            <h2>Радионице Института Дедиње</h2>
            <p>Преглед одржаних и предстојећих радионица</p>
          </div>
          <div className={styles.galleryGrid}>
            <div className={styles.galleryMain}>
              <Image
                src={RADIONICE_IMAGES[0].src}
                alt={RADIONICE_IMAGES[0].alt}
                width={RADIONICE_IMAGES[0].width}
                height={RADIONICE_IMAGES[0].height}
              />
              <div className={styles.galleryCaption}>
                <span className={styles.galleryBadge}>Предстојећа</span>
                <h3>CMR in Modern Cardiology</h3>
                <p>International Workshop — 30. октобар – 1. новембар 2026.</p>
              </div>
            </div>
            <div className={styles.gallerySide}>
              <div className={styles.galleryItem}>
                <Image
                  src={RADIONICE_IMAGES[1].src}
                  alt={RADIONICE_IMAGES[1].alt}
                  width={RADIONICE_IMAGES[1].width}
                  height={RADIONICE_IMAGES[1].height}
                />
                <div className={styles.galleryCaption}>
                  <h4>IKVBD MedTech 3D Workshop</h4>
                  <p>27. март 2025.</p>
                </div>
              </div>
              <div className={styles.galleryItem}>
                <Image
                  src={RADIONICE_IMAGES[2].src}
                  alt={RADIONICE_IMAGES[2].alt}
                  width={RADIONICE_IMAGES[2].width}
                  height={RADIONICE_IMAGES[2].height}
                />
                <div className={styles.galleryCaption}>
                  <h4>Minimally Invasive Aortic Valve Surgery</h4>
                  <p>04. април 2024.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Quote banner */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.quoteBanner}>
            <div className={styles.quoteIcon}>
              <i className="fas fa-award" aria-hidden />
            </div>
            <div className={styles.quoteContent}>
              <p>
                Институт за кардиоваскуларне болести &quot;Дедиње&quot; представља
                светионик стручности, иновације и бриге о срцу и крвним судовима
                и као такав постао је призната институција која поставља стандарде
                у лечењу, истраживању и превенцији кардиоваскуларних обољења.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
