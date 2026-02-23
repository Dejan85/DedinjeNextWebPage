import { Container, PageHeader, Section } from "@/components/shared";
import { Text } from "@/components/typography";
import { generateMetadata } from "./metadata";

export { generateMetadata };

export default function CentarIzuzetnihVrednostiPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Наука и истраживање", href: "/nauka-istrazivanje" },
          { label: "Центар изузетних вредности" },
        ]}
        title="Центар изузетних вредности"
        subtitle="Признања и акредитације Института за кардиоваскуларне болести Дедиње"
      />

      <Section padding="medium" background="gray">
        <Container>
          <div className="informacije-content">
            <div className="informacije-notice">
              <p>Одлука о акредитацији Центра изузетних вредности</p>
            </div>

            <div className="informacije-block">
              <Text
                variant="body"
                text={'Институт за кардиоваскуларне болести „Дедиње" представља установу од изванредног научноистраживачког значаја обзиром на број пацијената које лечи, спектар кардиоваскуларних процедура које се изводе на Институту и структуру кадра који се бави научноистраживачким радом. Један од основних услова за савремен истраживачки рад је квалификовано и адекватно обучено особље.'}
              />
              <Text
                variant="body"
                text={'У Центру за научну и истраживачку делатност у области кардиоваскуларне медицине - Центру изузетних вредности, остварује се неопходан континуитет у образовању, упознавање са савременим дијагностичким и терапијским методама у кардиоваскуларној медицини као и овладавање техникама научноистраживачког рада одн. методама прикупљања, обраде и публиковања научно вредних података.'}
              />
              <Text
                variant="body"
                text={'Центар изузетних вредности као организациона јединица Института јесте организација која у научном истраживању спроводи принципе Добре научне праксе (Good Scientific Practice, GSP), Добре клиничке праксе (Good Clinical Practice, GCP) и Добре лабораторијске праксе (Good Laboratory Practice, GLP). У односу на младе истраживаче, сарадници Центра и Научно веће надгледају адекватну примену GSP-а.'}
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
