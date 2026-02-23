import { Container, PageHeader, Section } from "@/components/shared";
import { Text } from "@/components/typography";
import { generateMetadata } from "./metadata";

export { generateMetadata };

export default function PlanIshranePage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "За пацијенте", href: "/za-pacijente" },
          { label: "План исхране" },
        ]}
        title="План исхране"
        subtitle="Препоруке за превенцију и лечење метаболичких обољења"
      />

      <Section padding="medium" background="gray">
        <Container>
          <div className="informacije-content">
            <div className="informacije-block">
              <Text
                variant="body"
                text="Метаболички поремећаји, укључујући дијабетес, хипертензију и гојазност, све су чешћи у модерном друштву. Промене у исхрани су међу најефикаснијим начинима за превенцију и контролу ових стања. Овај водич пружа препоруке за исхрану које помажу у одржавању оптималног здравља и смањењу ризика од метаболичких поремећаја."
              />
              <Text
                variant="body"
                text="Правилна исхрана је кључни фактор у превенцији и лечењу метаболичких поремећаја. Уравнотежена, разноврсна и умерена исхрана може значајно побољшати квалитет живота и смањити ризик од ових здравствених проблема. Придржавање препорука из овог водича представља важан корак ка бољем здрављу и дуговечности."
              />
              <Text
                variant="body"
                text="Институт за кардиоваскуларне болести „Дедиње“ пружа детаљан план препоручене исхране за превенцију и лечење метаболичких и кардиоваскуларних обољења, са различитим калоријским вредностима."
              />
              <div className="informacije-highlight">
                <p>ЗНАЊЕ ШТИТИ СРЦЕ: ВАШ ПРЕВЕНЦИЈА ЈЕ НАША МИСИЈА!</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
