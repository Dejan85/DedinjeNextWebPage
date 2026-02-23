import { Container, PageHeader, Section } from "@/components/shared";
import { Heading, Text } from "@/components/typography";
import { generateMetadata } from "./metadata";
import ProgramCardGrid from "./ProgramCard/ProgramCardGrid";
import styles from "./page.module.css";

export { generateMetadata };

const EDUKATIVNI_PROGRAMI = [
  {
    id: "skola-ehokardiografije",
    title: "Школа ехокардиографије",
    icon: "fas fa-heart-pulse",
    href: "/edukacija/programi/skola-ehokardiografije-prof-dr-aleksandra-nikolic",
    buttonText: "Сазнај више",
  },
  {
    id: "skola-hipertenzije",
    title: "Школа хипертензије и редукције кардиоваскуларних фактора ризика",
    icon: "fas fa-heart",
    href: "/edukacija/programi",
    buttonText: "Сазнај више",
  },
  {
    id: "skola-vaskularnog-ultrazvuka",
    title: "Школа васкуларног ултразвука",
    icon: "fas fa-wave-square",
    href: "/edukacija/programi",
    buttonText: "Сазнај више",
  },
];

export default function EdukativniProgramiPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Едукација", href: "/edukacija" },
          { label: "Едукативни програми" },
        ]}
        title="Едукативни програми"
        subtitle="Програми обуке и усавршавања стручњака"
      />

      <Section padding="medium" background="gray">
        <Container>
          <div className="informacije-content">
            <div className="informacije-block">
              <Heading variant="h2" text="О едукативним програмима" />
              <Text
                variant="body"
                text={'Институт за кардиоваскуларне болести „Дедиње" нуди различите едукативне програме усмерене на обуку и усавршавање стручњака у области кардиоваскуларне медицине. Програми обухватају континуирану медицинску едукацију (КМЕ), специјализоване школе и практичне обуке.'}
              />
              <Text
                variant="body"
                text={'Институт нуди Школу ехокардиографије, Школу хипертензије и редукције кардиоваскуларних фактора ризика и Школу васкуларног ултразвука. Сви програми су у складу са прописима Коморе здравствених радника и Здравственог савета Србије.'}
              />
            </div>

            <Heading variant="h2" text="Програми" className={styles.programsTitle} />
            <ProgramCardGrid
              items={EDUKATIVNI_PROGRAMI}
              className={styles.programsGrid}
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
