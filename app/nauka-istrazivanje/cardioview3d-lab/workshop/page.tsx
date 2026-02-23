import { Container, PageHeader, Section } from "@/components/shared";
import { Heading, Text } from "@/components/typography";
import { generateMetadata } from "./metadata";

export { generateMetadata };

export default function Cardioview3dWorkshopPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Наука и истраживање", href: "/nauka-istrazivanje" },
          { label: "CardioView3D LAB - Dedinje", href: "/nauka-istrazivanje/cardioview3d-lab" },
          { label: "CardioView3D LAB - WORKSHOP" },
        ]}
        title="CardioView3D LAB - WORKSHOP"
        subtitle="Радионица CardioView3D LAB у Институту за кардиоваскуларне болести Дедиње"
      />

      <Section padding="medium" background="gray">
        <Container>
          <div className="informacije-content">
            <div className="informacije-block">
              <Heading variant="h2" text="О радионици" />
              <Text
                variant="body"
                text={'CardioView3D LAB - WORKSHOP је део CardioView3D LAB - Dedinje пројекта, посвећен обуци и усавршавању стручњака у области 3D визуализације и анализе кардиоваскуларних података.'}
              />
              <Text
                variant="body"
                text={'Садржај странице биће допуњен.'}
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
