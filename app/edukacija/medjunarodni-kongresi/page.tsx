import { Container, Image, PageHeader, Section } from "@/components/shared";
import { Heading, Text } from "@/components/typography";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

const KONGRESI = [
  {
    src: "/images/Neurocard-2025-e1752724076617-1024x555.jpg",
    alt: "Neurocard 2025",
    width: 1024,
    height: 555,
    title: "Neurocard 2025",
    description: "Међународни конгрес посвећен неурокардиологији и интеракцији нервног и кардиоваскуларног система. Стручњаци из целог света размењују најновија сазнања из ове растуће области медицине.",
    date: "2025",
  },
  {
    src: "/images/COVID-2025-800x1128.jpg",
    alt: "COVID и кардиоваскуларне болести 2025",
    width: 800,
    height: 1128,
    title: "COVID и кардиоваскуларне болести",
    description: "Симпозијум о утицају COVID-19 инфекције на кардиоваскуларни систем, пост-ковид компликације и стратегије лечења кардиолошких пацијената.",
    date: "2025",
  },
  {
    src: "/images/TAVI-pokrivalica-800x451.jpg",
    alt: "TAVI Workshop",
    width: 800,
    height: 451,
    title: "TAVI Workshop",
    description: "Радионица посвећена транскатетерској имплантацији аортног залиска (ТАВИ) – минимално инвазивном приступу лечења аортне стенозе код високоризичних пацијената.",
    date: "2024",
  },
  {
    src: "/images/Workshop-Dedinje-800x450.jpg",
    alt: "Workshop Dedinje",
    width: 800,
    height: 450,
    title: "Workshop Dedinje",
    description: "Интерактивна радионица Института Дедиње у сарадњи са међународним стручњацима, фокусирана на најновије технике и технологије у кардиоваскуларној хирургији.",
    date: "2024",
  },
  {
    src: "/images/21-1-800x450.jpg",
    alt: "Годишњи конгрес ИКВБД",
    width: 800,
    height: 450,
    title: "Годишњи конгрес ИКВБД",
    description: "Годишњи међународни конгрес Института за кардиоваскуларне болести Дедиње на којем стручњаци представљају најзначајније научне и клиничке резултате.",
    date: "2024",
  },
  {
    src: "/images/312.jpg",
    alt: "Кардиоваскуларна хирургија live",
    width: 800,
    height: 600,
    title: "Кардиоваскуларна хирургија – Live Cases",
    description: "Преношење оперативних захвата уживо са дискусијом експертског панела – јединствена прилика за едукацију и размену искустава међу хирурзима.",
    date: "2023",
  },
  {
    src: "/images/Screenshot_1-800x421.jpg",
    alt: "Конгрес кардиоваскуларне превенције",
    width: 800,
    height: 421,
    title: "Конгрес кардиоваскуларне превенције",
    description: "Међународни конгрес посвећен редукцији кардиоваскуларних фактора ризика у сарадњи са ХИСПА удружењем и Европским удружењем за превенцију.",
    date: "2023",
  },
  {
    src: "/images/Screenshot_2-1-800x480.jpg",
    alt: "Brano Heart Failure Forum",
    width: 800,
    height: 480,
    title: "Brano Heart Failure Forum",
    description: "Међународни симпозијум посвећен срчаној инсуфицијенцији – дијагностика, лечење и најновије терапијске стратегије у области хроничне и акутне срчане слабости.",
    date: "2024",
  },
];

export { generateMetadata };

export default function MedjunarodniKongresiPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Едукација", href: "/edukacija" },
          { label: "Међународни конгреси" },
        ]}
        title="Међународни конгреси"
        subtitle="Престижни научни скупови у области кардиоваскуларне медицине"
      />

      {/* Увод */}
      <Section padding="medium" background="gray">
        <Container>
          <Heading variant="h2" text="О конгресима" align="center" className={styles.sectionTitle} />
          <div className={styles.introTexts}>
            <Text
              variant="body"
              align="center"
              text="У срцу Београда, у прелепом и историјском окружењу Дедиња, одвијају се престижни међународни конгреси који привлаче пажњу стручњака из различитих области широм света. Ова ексклузивна локација, обогаћена културном баштином и луксузном атмосфером, пружа инспиративно окружење за размену идеја, научних открића."
              className={styles.introSubtitle}
            />
            <Text
              variant="body"
              align="center"
              text="Једна од кључних карактеристика Института је њихова константна тежња ка иновацијама. Својим истраживањима и имплементацијом нових технологија, доприносе унапређењу метода лечења кардиоваскуларних болести, чиме побољшавају квалитет живота пацијената и доприносе развоју медицинске науке у целини."
              className={styles.introSubtitle}
            />
          </div>
        </Container>
      </Section>

      {/* Конгреси */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.eventsGrid}>
            {KONGRESI.map((kongres) => (
              <div key={kongres.src} className={styles.eventCard}>
                <div className={styles.eventImage}>
                  <Image
                    src={kongres.src}
                    alt={kongres.alt}
                    width={kongres.width}
                    height={kongres.height}
                  />
                </div>
                <div className={styles.eventBody}>
                  <span className={styles.eventDate}>{kongres.date}</span>
                  <h3>{kongres.title}</h3>
                  <p>{kongres.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Истакнута порука */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.highlight}>
            <i className="fas fa-award" aria-hidden />
            <p>{'Институт за кардиоваскуларне болести "Дедиње" представља светионик стручности, иновације и бриге о срцу и крвним судовима и као такав постао је призната институција која поставља стандарде у лечењу, истраживању и превенцији кардиоваскуларних обољења.'}</p>
          </div>
        </Container>
      </Section>
    </>
  );
}
