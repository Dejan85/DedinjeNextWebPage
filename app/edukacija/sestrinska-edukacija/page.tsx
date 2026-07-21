import { ClinicCard, ClinicCardGrid, Container, PageHeader, Section } from "@/components/shared";
import { generateMetadata } from "./metadata";

export { generateMetadata };

export default function SestrinskaEdukacijaPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Едукација", href: "/edukacija" },
          { label: "Едукација медицинских сестара и техничара" },
        ]}
        title="Едукација медицинских сестара и техничара"
        subtitle="Едукација медицинских сестара и техничара представља темељ сигурног, савременог и ефикасног здравственог система"
      />

      <Section padding="medium" background="gray">
        <Container>
          <ClinicCardGrid>
            <ClinicCard
              icon="fas fa-clock-rotate-left"
              title="Историјат и међународна сарадња"
              subtitle="Развој сестринске едукације од седамдесетих година до данас"
              href="/edukacija/sestrinska-edukacija/istorijat"
            />
            <ClinicCard
              icon="fas fa-graduation-cap"
              title="Интерна едукација (КМЕ)"
              subtitle="Континуирана медицинска едукација за све запослене"
              href="/edukacija/interna-edukacija"
            />
            <ClinicCard
              icon="fas fa-heart-pulse"
              title="Курс КПР"
              subtitle="Примена стандарда у кардиопулмоналној реанимацији одраслих особа"
              href="/edukacija/sestrinska-edukacija/kpr-kurs"
            />
            <ClinicCard
              icon="fas fa-user-nurse"
              title="Приправнички стаж"
              subtitle="Стажирање медицинских сестара и техничара у ИКВБ Дедиње"
              href="/edukacija/sestrinska-edukacija/pripravnicki-staz"
            />
            <ClinicCard
              icon="fas fa-book-medical"
              title="Програм кратких студија"
              subtitle="Заједнички програм са Факултетом медицинских наука у Крагујевцу"
              href="/edukacija/sestrinska-edukacija/program-kratkih-studija"
            />
          </ClinicCardGrid>
        </Container>
      </Section>
    </>
  );
}
