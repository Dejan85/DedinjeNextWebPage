import {
  Container,
  InfoCard,
  PageHeader,
  Section,
} from "@/components/shared";
import { Heading, Text } from "@/components/typography";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

export { generateMetadata };

const EDUKACIJA_LINKS = [
  {
    _key: "1",
    icon: "fas fa-calendar-alt",
    title: "KME 2024",
    description: "Конгрес кардиолога и електрофизиолога",
    buttonText: "Сазнај више",
    buttonHref: "/edukacija/kme-2024",
    highlight: false,
  },
  {
    _key: "2",
    icon: "fas fa-graduation-cap",
    title: "Едукативни програми",
    description: "Програми обуке и усавршавања стручњака",
    buttonText: "Погледај програме",
    buttonHref: "/edukacija/programi",
    highlight: false,
  },
  {
    _key: "3",
    icon: "fas fa-users",
    title: "Интерна едукација",
    description: "Обука и усавршавање запослених у Институту",
    buttonText: "Сазнај више",
    buttonHref: "/edukacija/interna-edukacija",
    highlight: false,
  },
  {
    _key: "4",
    icon: "fas fa-laptop-medical",
    title: "Радионице",
    description: "Специјализоване радионице и практичне обуке",
    buttonText: "Погледај радионице",
    buttonHref: "/edukacija/radionice",
    highlight: false,
  },
  {
    _key: "5",
    icon: "fas fa-microphone",
    title: "Конгреси",
    description: "Домаћи конгреси из кардиоваскуларне медицине",
    buttonText: "Сазнај више",
    buttonHref: "/edukacija/kongresi",
    highlight: false,
  },
  {
    _key: "6",
    icon: "fas fa-globe",
    title: "Међународни конгреси",
    description: "Учешће на међународним научним скуповима",
    buttonText: "Погледај",
    buttonHref: "/edukacija/medjunarodni-kongresi",
    highlight: true,
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
        title="Едукација Институт Дедиње"
        subtitle="Обука, радионице и конгреси у области кардиоваскуларне медицине"
      />

      <Section padding="medium" background="gray">
        <Container>
          <div className="informacije-content">
            <div className="informacije-block">
              <Heading variant="h2" text="О едукацији" />
              <Text
                variant="body"
                text={'Институт за кардиоваскуларне болести „Дедиње" је центар за едукацију и усавршавање стручњака у области кардиоваскуларне медицине. Кроз едукативне програме, радионице и конгресе пружамо могућност континуираног образовања лекара и медицинског особља.'}
              />
            </div>

            <div className={styles.grid}>
              {EDUKACIJA_LINKS.map((card) => (
                <InfoCard
                  key={card._key}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                  buttonText={card.buttonText}
                  buttonHref={card.buttonHref}
                  highlight={card.highlight}
                />
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
