import { Container, PageHeader, Section, SidebarTabs } from "@/components/shared";
import { Heading, Text } from "@/components/typography";
import { generateMetadata } from "./metadata";

export { generateMetadata };

const KARDIOLOGIJA_TABS = [
  {
    id: "katetersko-zatvaranje-aurikule",
    label: "Катетерско затварање аурикуле леве преткоморе",
    image: "/images/kardiohirurgija.jpg",
    content: (
      <div className="informacije-content">
        <div className="informacije-block">
          <Heading variant="h2" text="Катетерско затварање аурикуле леве преткоморе" />
          <Text
            variant="body"
            text="Циљ ове процедуре је превенција можданог удара код пацијената који пате од атријалне фибрилације (АФ) код којих је примена оралне антикоагулантне терапије контраиндикована."
          />
          <Heading variant="h3" text="Шта је атријална фибрилација?" />
          <Text
            variant="body"
            text="Атријална фибрилација представља кардиолошко стање које се манифестује убрзаним и неправилним радом срца (аритмијом). То може резултирати у задржавању крви и могућности формирања тромба у аурикули леве преткоморе."
          />
          <Heading variant="h3" text="Шта је аурикула леве преткоморе?" />
          <Text
            variant="body"
            text="Срце сваког човека има аурикулу или ушасти наставак на преткоморама. Овај наставак се налази у нивоу горње леве плућне вене. Приближно је величине палца и подсећа на мали џеп, неку врсту слепе улице, где се крв задржава код пацијената са атријалном фибрилацијом и на тај начин потенцијално може доћи до стварања крвних угрушака."
          />
          <Heading variant="h3" text="Како долази до можданог удара?" />
          <Text
            variant="body"
            text="Крвни угрушак, или део угрушка, може се одвојити и путовати крвотоком према мозгу где може запушити артерију (мождана тромбоемболија). Ова блокада може спречити снабдевање крвљу тог подручја мозга и изазвати мождани удар."
          />
          <Text
            variant="body"
            text="Главни третман за смањење ризика од можданог удара болесника са атријалном фибрилацијом су лекови који се зову антикоагуланси, познатији као разређивачи крви. Међутим, неки пацијенти могу имати контраиндикације за примену ових лекова или компликације након њихове примене у виду озбиљнијих крварења."
          />
          <Heading variant="h3" text="Шта је уређај за затварање аурикуле леве преткоморе?" />
          <Text
            variant="body"
            text="Уређај за затварање аурикуле леве преткоморе је трајни имплантат који се поставља на улазу аурикуле. Дизајниран је тако да онемогућава улазак крвних угрушака у крвоток и тиме спречава настанак можданог удара. Имплант је израђен од материјала који се налазе у многим медицинским уређајима, као што су на пример стентови."
          />
          <Heading variant="h3" text="Како функционише затварање аурикуле атријума?" />
          <Text
            variant="body"
            text="Процедура се обично изводи у тоталној анестезији, а траје отприлике између 45 минута и једног сата. Поступак је сличан техникама које се користе у ангиопластици (постављање стента у срчану артерију)."
          />
          <ul className="konzilijum-list">
            <li>Лекар води уређај према унутрашњости срца, кроз мали катетер уметнут унутар венског система, на подручју препона.</li>
            <li>Након што је катетер правилно постављен, лекар снима срце како би измерио леву аурикулу и одредио величину уређаја која ће се уградити.</li>
            <li>Након постављања уређаја, лекар врши додатна мерења и прави додатне слике како би се уверио да је уређај добро постављен.</li>
            <li>Пошто је провера завршена, уређај се ослобађа како би се могао трајно уградити у срце.</li>
            <li>Уобичајено време за опоравак након интервенције је 24 сата.</li>
          </ul>
          <Heading variant="h3" text="Шта се догађа након имплантације уређаја у аурикулу леве преткоморе?" />
          <Text
            variant="body"
            text="Након имплантације, пацијент ће бити отпуштен кући са одговарајућом антикоагулантном или антитромбоцитном терапијом за спречавање згрушавања крви и стварања тромба. Лекар може пацијенту прописати и друге лекове ако утврди да су неопходни у вези са извршеном интервенцијом. Неколико недеља након интервенције пацијент долази на контролу. Том приликом ће се можда извршити ултразвучно снимање срца како би се на основу добијене слике проценила имплантација уређаја. На основу добијених резултата, лекар ће пацијенту променити или прекинути терапију или наставити дотадашњу терапију."
          />
          <Heading variant="h3" text="Да ли је овај поступак уобичајен?" />
          <Text
            variant="body"
            text="Овај поступак се примењује од 2003. године и изведен је код више од 150.000 пацијената широм света. Протокол за имплантацију уређаја за затварање аурикуле леве преткоморе је униформан и поткрепљен клиничким подацима."
          />
          <Text
            variant="body"
            text="Међутим, као и код сваке интервенције, и овде постоје одређени ризици и могуће компликације као што су хематоми, настанак аритмија (неправилног срчаног рада), настанак тампонаде срца и у изнимним случајевима летални исход. Одговорни лекар ће детаљно разговарати са Вама о детаљима процедуре и одговорити на сва Ваша питања."
          />
        </div>
      </div>
    ),
  },
  {
    id: "katetersko-zatvaranje-pfo-asd",
    label: "Катетерско затварање ПФО АСД",
    image: "/images/kardiohirurgija.jpg",
    content: (
      <div className="informacije-content">
        <div className="informacije-block">
          <Heading variant="h2" text="Катетерско затварање ПФО АСД" />
          <Text variant="body" text="Садржај о овој процедури биће допуњен." />
        </div>
      </div>
    ),
  },
  {
    id: "koronarografija",
    label: "Коронарографија",
    image: "/images/kardiohirurgija.jpg",
    content: (
      <div className="informacije-content">
        <div className="informacije-block">
          <Heading variant="h2" text="Коронарографија" />
          <Text variant="body" text="Садржај о овој процедури биће допуњен." />
        </div>
      </div>
    ),
  },
  {
    id: "perkutana-koronarna-intervencija",
    label: "Перкутана коронарна интервенција",
    image: "/images/kardiohirurgija.jpg",
    content: (
      <div className="informacije-content">
        <div className="informacije-block">
          <Heading variant="h2" text="Перкутана коронарна интервенција" />
          <Text variant="body" text="Садржај о овој процедури биће допуњен." />
        </div>
      </div>
    ),
  },
  {
    id: "spirometrija",
    label: "Спирометрија",
    image: "/images/kardiohirurgija.jpg",
    content: (
      <div className="informacije-content">
        <div className="informacije-block">
          <Heading variant="h2" text="Спирометрија" />
          <Text variant="body" text="Садржај о овој процедури биће допуњен." />
        </div>
      </div>
    ),
  },
  {
    id: "tavi",
    label: "ТАВИ",
    image: "/images/kardiohirurgija.jpg",
    content: (
      <div className="informacije-content">
        <div className="informacije-block">
          <Heading variant="h2" text="ТАВИ" />
          <Text variant="body" text="Садржај о овој процедури биће допуњен." />
        </div>
      </div>
    ),
  },
  {
    id: "test-fizickim-opterecenjem",
    label: "Тест физичким оптерећењем",
    image: "/images/kardiohirurgija.jpg",
    content: (
      <div className="informacije-content">
        <div className="informacije-block">
          <Heading variant="h2" text="Тест физичким оптерећењем" />
          <Text variant="body" text="Садржај о овој процедури биће допуњен." />
        </div>
      </div>
    ),
  },
  {
    id: "transezofagealni-eho-srca",
    label: "Трансезофагеални ехо срца",
    image: "/images/kardiohirurgija.jpg",
    content: (
      <div className="informacije-content">
        <div className="informacije-block">
          <Heading variant="h2" text="Трансезофагеални ехо срца" />
          <Text variant="body" text="Садржај о овој процедури биће допуњен." />
        </div>
      </div>
    ),
  },
  {
    id: "transtorakalni-eho-srca",
    label: "Трансторакални ехо срца",
    image: "/images/kardiohirurgija.jpg",
    content: (
      <div className="informacije-content">
        <div className="informacije-block">
          <Heading variant="h2" text="Трансторакални ехо срца" />
          <Text variant="body" text="Садржај о овој процедури биће допуњен." />
        </div>
      </div>
    ),
  },
  {
    id: "farmakoloski-stres-eho-test",
    label: "Фармаколошки стрес ехо тест",
    image: "/images/kardiohirurgija.jpg",
    content: (
      <div className="informacije-content">
        <div className="informacije-block">
          <Heading variant="h2" text="Фармаколошки стрес ехо тест" />
          <Text variant="body" text="Садржај о овој процедури биће допуњен." />
        </div>
      </div>
    ),
  },
];

export default function KardiologijaZaPacijentePage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "За пацијенте", href: "/za-pacijente" },
          { label: "Кардиологија" },
        ]}
        title="Кардиологија"
        subtitle="Информације за пацијенте"
      />

      <Section padding="medium" background="gray">
        <Container>
          <SidebarTabs tabs={KARDIOLOGIJA_TABS} defaultTab="katetersko-zatvaranje-aurikule" />
        </Container>
      </Section>
    </>
  );
}
