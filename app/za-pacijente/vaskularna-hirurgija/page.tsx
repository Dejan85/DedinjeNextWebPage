import { Container, PageHeader, Section, SidebarTabs } from "@/components/shared";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

export { generateMetadata };

function InfoBlock({
  icon,
  question,
  children,
}: {
  icon: string;
  question: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.infoBlock}>
      <div className={styles.infoBlockHeader}>
        <span className={styles.infoBlockIcon}>
          <i className={icon} aria-hidden />
        </span>
        <h3>{question}</h3>
      </div>
      <div className={styles.infoBlockBody}>{children}</div>
    </div>
  );
}

export default function VaskularnaHirurgijaZaPacijentePage() {
  const tabs = [
    {
      id: "aneurizma",
      label: "Анеуризма абдоминалне аорте",
      image: "/images/vaskularna-hirurgija.png",
      imageAlt: "Анеуризма абдоминалне аорте – васкуларна хирургија",
      content: (
        <div className={styles.tabContent}>
          <div className={styles.tabIntro}>
            <h2>Анеуризма абдоминалне аорте</h2>
            <p>
              Анеуризма абдоминалне аорте (ААА) је проширење главне артерије у
              Вашем телу која носи крв кроз трбух до доњих екстремитета. Ако
              Вам је постављена дијагноза ААА она може бити мала (3,0–5,4 цм)
              или велика (&gt;&nbsp;5,5 цм).
            </p>
          </div>

          <div className={styles.blocksGrid}>
            <InfoBlock icon="fas fa-question-circle" question="Зашто се ради ова операција?">
              <p>
                Већина анеуризми не изазива симптоме и најчешће се откривају
                приликом медицинских претрага. У случају када анеуризма порасте
                у дијаметру или ако се темпо раста убрза — препоручује се
                хируршко лечење које може бити отворено хируршко или
                ендоваскуларно.
              </p>
            </InfoBlock>

            <InfoBlock icon="fas fa-scalpel" question="Отворено хируршко лечење (ААА)">
              <p>
                Спроводи се у условима опште анестезије преко реза на средини
                трбуха. Аорта са ААА се изолује, крвоток се привремено
                заустави, а анеуризма замени вештачким крвним судом (графтом)
                који се ушије на оперисано место.
              </p>
            </InfoBlock>

            <InfoBlock icon="fas fa-syringe" question="Ендоваскуларно лечење (ЕВАР)">
              <p>
                Спроводи се методом ЕВАР — кроз мање резове у препонама носач
                са стент-графтом се провуче до аорте. Није погодно за све
                пацијенте — зависи од година, пратећих болести и
                карактеристика анеуризме.
              </p>
            </InfoBlock>

            <InfoBlock icon="fas fa-triangle-exclamation" question="Могуће компликације">
              <p>
                Могуће компликације: недовољна функција дисања, шлог, инфаркт,
                попуштање бубрега, исхемијско оштећење дигестивног тракта.
                У&nbsp;0,7–4% случајева може доћи до смртног исхода.
              </p>
            </InfoBlock>

            <InfoBlock icon="fas fa-clipboard-list" question="Посебна припрема">
              <p>
                Потребно је извршити одређене прегледе и донети одговарајућу
                документацију. Све неопходне претраге су побројане на посебном
                листу и не смеју бити старије од 15 дана.
              </p>
            </InfoBlock>

            <InfoBlock icon="fas fa-hospital" question="Шта се догађа након операције?">
              <p>
                Пацијент прелази у ЈИЛ на 48 сати. Уколико је постоперативни
                ток некомпликован, задржавање у болници је просечно 6–7 дана.
                На отпусној листи су терапија, начин превијања рана и датум
                контроле.
              </p>
            </InfoBlock>
          </div>
        </div>
      ),
    },
    {
      id: "karotidna",
      label: "Каротидна болест",
      image: "/images/klinike-slika.jpg",
      imageAlt: "Каротидна болест – ендартеректомија",
      content: (
        <div className={styles.tabContent}>
          <div className={styles.tabIntro}>
            <h2>Каротидна болест</h2>
            <p>
              Каротидне артерије снабдевају крвљу очи и мозак. Сужење ових
              артерија (стеноза) може довести до шлога или транзиторног
              исхемијског атака. Каротидна ендартеректомија је операција
              уклањања стенозе.
            </p>
          </div>

          <div className={styles.blocksGrid}>
            <InfoBlock icon="fas fa-question-circle" question="Зашто се ради ова операција?">
              <p>
                Стеноза каротидне артерије настаје акумулацијом масти и
                калцијума у зиду артерије (атеросклероза), најчешће на месту
                каротидне бифуркације, и може довести до шлога.
              </p>
            </InfoBlock>

            <InfoBlock icon="fas fa-scalpel" question="Како се изводи операција?">
              <p>
                У општој или локалној анестезији кроз рез на бочној страни
                врата. Артерија се клемује, отвара и стеноза пажљиво уклони.
                Затим се артерија затвара и успоставља циркулација. Рана се
                затвара уз дрен.
              </p>
            </InfoBlock>

            <InfoBlock icon="fas fa-triangle-exclamation" question="Могуће компликације">
              <p>
                Компликације се јављају у приближно 2–3% болесника: шлог,
                инфаркт, крварење на месту ране, отежано гутање, промуклост.
                У изузетно ретким случајевима може доћи до смртног исхода.
              </p>
            </InfoBlock>

            <InfoBlock icon="fas fa-clipboard-list" question="Посебна припрема">
              <p>
                Потребно је извршити одређене прегледе. Све неопходне претраге
                су побројане на посебном листу и не смеју бити старије од 15
                дана.
              </p>
            </InfoBlock>

            <InfoBlock icon="fas fa-hospital" question="Шта се догађа након операције?">
              <p>
                Буђење из анестезије одмах на операционом столу. Боравак у
                ЈИЛ-у је један дан. Уколико је постоперативни ток
                некомпликован, пацијент се другог постоперативног дана отпушта
                на кућно лечење.
              </p>
            </InfoBlock>
          </div>
        </div>
      ),
    },
    {
      id: "laserska",
      label: "Ласерска операција вена",
      image: "/images/vantelesni-krvotok.png",
      imageAlt: "Ласерска операција вена – EVLA",
      content: (
        <div className={styles.tabContent}>
          <div className={styles.tabIntro}>
            <h2>Ласерска операција вена</h2>
            <p>
              Ендовенска ласерска аблација (EVLA) је савремени, минимално
              инвазивни начин лечења проширених вена доњих екстремитета.
              Пацијент је будан током целе операције.
            </p>
          </div>

          <div className={styles.blocksGrid}>
            <InfoBlock icon="fas fa-question-circle" question="Зашто се ради ова метода?">
              <p>
                EVLA је савремена алтернатива класичном хируршком уклањању
                проширених вена — са мањом трауматичношћу, бржим опоравком и
                одличним естетским резултатом.
              </p>
            </InfoBlock>

            <InfoBlock icon="fas fa-laser-pointer" question="Како се изводи процедура?">
              <p>
                У тумесцентној анестезији (локална). Хирург ултразвуком одреди
                место, пласира ласерску сонду до ушћа вене и укључи ласер —
                топлотна енергија „затвара" вену. Варикозно измењене вене се
                уклоне кроз мини-резове.
              </p>
            </InfoBlock>

            <InfoBlock icon="fas fa-triangle-exclamation" question="Могуће компликације">
              <p>
                Компликације су веома ретке (&lt;&nbsp;4%): тромбоза дубоких
                вена, болни синдром, оток, гнојно запаљење, хиперпигментација,
                опекотине на месту проласка сонде.
              </p>
            </InfoBlock>

            <InfoBlock icon="fas fa-clipboard-check" question="Посебна припрема">
              <p>
                Не постоји посебна припрема за ову процедуру.
              </p>
            </InfoBlock>

            <InfoBlock icon="fas fa-house-medical" question="Шта се догађа након процедуре?">
              <p>
                Пацијент после 10-ак минута иде кући. Први контролни преглед
                унутар три дана. Наредне две недеље носити еластичан завој на
                оперисаној нози. Терапија је наведена на отпусној листи.
              </p>
            </InfoBlock>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "За пацијенте", href: "/za-pacijente" },
          { label: "Васкуларна хирургија" },
        ]}
        title="Васкуларна хирургија"
        subtitle="Информације за пацијенте"
      />

      <Section padding="medium" background="gray">
        <Container>
          <SidebarTabs tabs={tabs} defaultTab="aneurizma" />
        </Container>
      </Section>
    </>
  );
}
