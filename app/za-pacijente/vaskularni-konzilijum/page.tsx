import { Container, PageHeader, Section } from "@/components/shared";
import { Heading, Text } from "@/components/typography";
import { generateMetadata } from "./metadata";

export { generateMetadata };

export default function VaskularniKonzilijumPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "За пацијенте", href: "/za-pacijente" },
          { label: "Васкуларни конзилијум" },
        ]}
        title="Васкуларни конзилијум"
        subtitle="Високоспецијализовани тим за лечење обољења крвних судова"
      />

      <Section padding="medium" background="gray">
        <Container>
          <div className="informacije-content">
            <div className="informacije-block">
              <Heading variant="h2" text="Опште информације" />
              <Text
                variant="body"
                text="Васкуларни конзилијум је високоспецијализовани тим који се свакодневно састаје ради доношења одлука о лечењу пацијената са обољењима крвних судова. Чланови конзилијума су васкуларни хирурзи, радиолози, ангиолози, неуролози и кардиолози."
              />
              <Text
                variant="body"
                text="На основу прегледа ординирајућег васкуларног хирурга и налаза адекватне дијагностике (КТ и МР ангиографија) доносе се индивидуализоване одлуке за лечење сваког пацијента. Такође, утврђује се степен хитности индикованих интервенција у односу на природу болести и смештајне капацитете наше клинике, те се пацијенти стављају на листе чекања."
              />
              <Text
                variant="body"
                text="Пацијенти се сами обавештавају о одлуци конзилијума телефонским путем, неколико дана након њеног доношења. Уколико је неопходно даље болничко лечење, пацијент ће благовремено бити обавештен о термину хоспитализације и о неопходној документацији, коју је потребно да прибави. За све додатне информације пацијенти могу да се обрате надлежним васкуларним хирурзима у термину њиховог амбулантног дана."
              />
            </div>

            <div className="informacije-block">
              <Heading variant="h2" text="Контакт" />
              <p>
                <strong>Телефон:</strong>{" "}
                <a href="tel:0113601700">Call centar Института Дедиње 011 3601 700</a>
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
