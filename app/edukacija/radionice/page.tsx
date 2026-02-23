import { Container, Image, PageHeader, Section } from "@/components/shared";
import { Heading, Text } from "@/components/typography";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

const RADIONICE_IMAGES = [
  {
    src: "/images/CMR-POKRIVALICA-800x450.jpg",
    alt: "Радионица – Институт Дедиње",
    width: 800,
    height: 450,
  },
  {
    src: "/images/IKVBD-3D-800x450.jpg",
    alt: "ИКВБД 3D лабораторија – Институт Дедиње",
    width: 800,
    height: 450,
  },
  {
    src: "/images/Micovic-800x448.jpg",
    alt: "Радионица – Институт Дедиње",
    width: 800,
    height: 448,
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

      {/* Увод */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.introGrid}>
            <div className={styles.introText}>
              <Heading variant="h2" text="О радионицама" />
              <Text
                variant="body"
                text={'У срцу Београда, у прелепом и историјском окружењу Дедиња, одвијају се престижне радионице које привлаче пажњу стручњака из различитих области широм света. Ова ексклузивна локација, обогаћена културном баштином и луксузном атмосфером, пружа инспиративно окружење за размену идеја, научних открића.'}
              />
              <Text
                variant="body"
                text="Једна од кључних карактеристика Института је њихова константна тежња ка иновацијама. Својим истраживањима и имплементацијом нових технологија, доприносе унапређењу метода лечења кардиоваскуларних болести, чиме побољшавају квалитет живота пацијената и доприносе развоју медицинске науке у целини."
              />
            </div>
            <div className={styles.introImage}>
              <Image
                src={RADIONICE_IMAGES[0].src}
                alt={RADIONICE_IMAGES[0].alt}
                width={RADIONICE_IMAGES[0].width}
                height={RADIONICE_IMAGES[0].height}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Галерија и истакнута порука */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.highlight}>
            <i className="fas fa-award" aria-hidden />
            <p>{'Институт за кардиоваскуларне болести "Дедиње" представља светионик стручности, иновације и бриге о срцу и крвним судовима и као такав постао је призната институција која поставља стандарде у лечењу, истраживању и превенцији кардиоваскуларних обољења.'}</p>
          </div>

          <div className={styles.galleryGrid}>
            <div className={styles.galleryItem}>
              <Image
                src={RADIONICE_IMAGES[1].src}
                alt={RADIONICE_IMAGES[1].alt}
                width={RADIONICE_IMAGES[1].width}
                height={RADIONICE_IMAGES[1].height}
              />
            </div>
            <div className={styles.galleryItem}>
              <Image
                src={RADIONICE_IMAGES[2].src}
                alt={RADIONICE_IMAGES[2].alt}
                width={RADIONICE_IMAGES[2].width}
                height={RADIONICE_IMAGES[2].height}
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
