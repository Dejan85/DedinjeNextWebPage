import {
  Container,
  PageHeader,
  Section,
} from "@/components/shared";
import styles from "./page.module.css";
import { metadata } from "./metadata";

export { metadata };

const STATS = [
  { value: "55.000+", label: "Укупно процедура", icon: "fas fa-heart-pulse" },
  { value: "3.000+", label: "Годишње операција", icon: "fas fa-calendar-check" },
  { value: "95,5%", label: "Стопа преживљавања", icon: "fas fa-chart-line" },
  { value: "50+", label: "Година искуства", icon: "fas fa-award" },
];

const PROCEDURE = [
  { icon: "fas fa-arrows-rotate", title: "Хируршка реваскуларизација миокарда", desc: "Бајпас операције сужених или затворених крвних судова срца уз употребу артеријских и/или венских графтова" },
  { icon: "fas fa-heart-circle-plus", title: "Замена срчаних залистака", desc: "Уградња вештачких залистака — механичких или од природних материјала" },
  { icon: "fas fa-screwdriver-wrench", title: "Реконструкција срчаних залистака", desc: "Митрални, аортни и трикуспидни залистак" },
  { icon: "fas fa-shield-halved", title: "Хирургија аорте", desc: "Усходна аорта, лук и силазна грудна аорта" },
  { icon: "fas fa-bolt", title: "Хитне процедуре", desc: "Интервенције након дисекције (цепања) грудне аорте" },
  { icon: "fas fa-child", title: "Урођене мане", desc: "Хирургија урођених срчаних мана у одраслих болесника (старијих од 18 година)" },
  { icon: "fas fa-video", title: "Минимално инвазивне процедуре", desc: "Бајпас, митрални, аортни и трикуспидни залистак, као и усходна аорта" },
  { icon: "fas fa-wave-square", title: "Хирургија поремећаја срчаног ритма", desc: "Хируршка аблација срца" },
  { icon: "fas fa-gear", title: "Хирургија срчане слабости", desc: "Интра-аортална балон-пумпа, ECMO, парцијално или тотално вештачко срце, трансплантација срца" },
  { icon: "fas fa-code-merge", title: "Хибридне процедуре", desc: "Реваскуларизација срца, удружене коронарне и каротидне болести, болести грудне аорте" },
  { icon: "fas fa-robot", title: "Роботска хирургија", desc: "Роботски асистирана реваскуларизација срца" },
];

const HIGHLIGHTS = [
  { icon: "fas fa-ranking-star", text: "Преко 55.000 изведених кардиохируршких процедура од оснивања, више од 3.000 на годишњем нивоу — сам европски и светски врх" },
  { icon: "fas fa-heart-circle-check", text: "1995. године прва успешна трансплантација срца у Србији, изведена на Институту „Дедиње“" },
  { icon: "fas fa-heart-circle-bolt", text: "Уградња првог вештачког срца на овим просторима (Heart-Mate I, 1995.)" },
  { icon: "fas fa-microscope", text: "Употреба радијалне артерије у хируршкој реваскуларизацији миокарда од 1999. године" },
  { icon: "fas fa-wand-magic-sparkles", text: "Развој минимално инвазивне хирургије кроз торакотомију отпочет 2011. године" },
  { icon: "fas fa-heart-pulse", text: "Прво тотално вештачко срце имплантирано 2017. године" },
  { icon: "fas fa-award", text: "2024. године изведено 3.000 кардиохируршких процедура — највећи број у Србији, међу највећима у Европи" },
  { icon: "fas fa-rotate", text: "После 30 година мораторијума, 2024. године обновљен програм трансплантације срца" },
  { icon: "fas fa-robot", text: "Прва роботски асистирана кардиохируршка процедура изведена 2025. године" },
  { icon: "fas fa-book-open", text: "Радови у NEJM, Circulation, Ann Thorac Surg, ITCVS, JCC, EJCTS и другим престижним часописима, учешће у мултицентричним студијама (ROMA, CMIC)" },
];

const KADAR = [
  { name: "Проф. др Слободан Мићовић", role: "Управник Клинике за кардиохирургију" },
  { name: "Доц. др Петар Вуковић", role: "Заменик управника Клинике за кардиохирургију" },
  { name: "Проф. др Иван Стојановић", role: "Начелник Центра за минимално инвазивну кардиохирургију" },
  { name: "Доц. др Саша Боровић", role: "Начелник Центра за минимално инвазивну хирургију" },
  { name: "Кл. асист. Марко Каитовић", role: "Начелник операционог блока" },
  { name: "Мр сц. др мед. Ђорђе Здравковић", role: "" },
  { name: "Др Жељко Бојовић", role: "" },
  { name: "Кл. асист. др Петар Милачић", role: "" },
  { name: "Кл. асист. др Мирослав Миличић", role: "" },
  { name: "Кл. асист. Иван Нешић", role: "" },
  { name: "Кл. асист. Игор Живковић", role: "" },
  { name: "Др Бранислав Стојковић", role: "" },
  { name: "Др Милош Јовановић", role: "" },
  { name: "Др Марко Анђелковић", role: "" },
  { name: "Др Слободан Локас", role: "" },
  { name: "Др Татјана Вујичић", role: "" },
  { name: "Др Ђорђе Крстић", role: "" },
  { name: "Кл. асист. Богдан Окиљевић", role: "" },
  { name: "Др Вук Андријашевић", role: "" },
  { name: "Др Стефан Станковић", role: "" },
  { name: "Др Немања Милошевић", role: "" },
  { name: "Др Зоран Табаковић", role: "" },
  { name: "Др Стефан Грујић", role: "" },
  { name: "Др Милица Лудошки", role: "" },
  { name: "Др Зорана Данчетовић", role: "" },
  { name: "Др Милица Ивановић", role: "" },
  { name: "Др Анђела Шушањ", role: "" },
  { name: "Др Петар Томић", role: "" },
  { name: "Др Иво Паункоски", role: "" },
];

export default function KardiohirurgijaPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Клинике", href: "/klinike" },
          { label: "Клиника за кардиохирургију" },
        ]}
        title="Клиника за кардиохирургију"
        subtitle="Високоспецијализовано оперативно лечење срчаних обољења, комплетна дијагностика и постоперативни опоравак"
      />

      {/* Intro + Stats */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.intro}>
            <div className={styles.introIcon}>
              <i className="fas fa-heart-pulse" aria-hidden />
            </div>
            <div className={styles.introContent}>
              <h2>О клиници</h2>
              <p>
                Наша обавеза је да обезбедимо врхунску услугу у домену
                кардиоваскуларне медицине — ефикасне, квалитетне кардиохируршке
                процедуре без значајних компликација, које омогућавају брз
                опоравак и повратак свакодневним активностима.
              </p>
              <p>
                Клиника обезбеђује потпуно заокружен систем ефикасне
                дијагностике, лечења и постоперативног опоравка за болеснике
                којима је потребна кардиохируршка интервенција.
              </p>
              <p>
                У оквиру Клинике за општу хирургију КБЦ „Др Драгиша Мишовић“
                1973. године формирано је одељење Васкуларне хирургије — то је
                била претеча Завода, Центра, Клинике и коначно данашњег
                Института за кардиоваскуларне болести „Дедиње“. Први директор
                Завода за кардиоваскуларну хирургију био је прим. др Драгољуб
                Адамов, који је 1965. године уградио први електростимулатор
                срчаног ритма у бившој Југославији. Доцент др Михаило Вучинић
                урадио је 1. фебруара 1978. године прву кардиохируршку
                процедуру — троструки аортокоронарни бајпас, да би до данас на
                Клиници било урађено више од 55.000 операција на отвореном
                срцу, укључујући трансплантације срца и уградњу парцијалних и
                тоталних вештачких срца. На Клиници се данас изводе све
                кардиохируршке процедуре у одраслих, у седам операционих сала
                (шест стандардних и једна хибридна), уз готово 50% оперативног
                програма који чине најкомпликованије кардиохируршке процедуре —
                оне које се изводе само у најеминентнијим центрима у свету.
                Клиника је фокусирана на неколико програма: минимално инвазивну
                и роботску кардиохирургију, хирургију срчане слабости
                (парцијална и/или тотална вештачка срца, трансплантација
                срца), као и вишеструку и/или комплетну артеријску
                реваскуларизацију срца, што је Институт поставило на мапу
                светске кардиохирургије учешћем у међународној, мултицентричној
                РОМА студији.
              </p>
              <h3 className={styles.subheading}>Организациона структура</h3>
              <p>
                Клинику за кардиохирургију чине: Одељење кардиохирургије 1 (са
                операционим блоком), Одељење кардиохирургије 2, Одсек за
                вантелесни крвоток, Центар за минимално инвазивну
                кардиохирургију и Кардиохируршка амбуланта.
              </p>
            </div>
          </div>

          <div className={styles.statsGrid}>
            {STATS.map((stat, idx) => (
              <div key={idx} className={styles.statCard}>
                <div className={styles.statIcon}>
                  <i className={stat.icon} aria-hidden />
                </div>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Procedure */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIconWrap}>
              <i className="fas fa-list-check" aria-hidden />
            </span>
            <div>
              <h2>Процедуре које изводимо</h2>
              <p>Широк спектар кардиохируршких интервенција</p>
            </div>
          </div>

          <div className={styles.procedureGrid}>
            {PROCEDURE.map((item, idx) => (
              <div key={idx} className={styles.procedureCard}>
                <div className={styles.procedureCardIcon}>
                  <i className={item.icon} aria-hidden />
                </div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Highlights banner */}
      <section className={styles.highlightSection}>
        <Container>
          <div className={styles.highlightHeader}>
            <div className={styles.highlightHeaderIcon}>
              <i className="fas fa-trophy" aria-hidden />
            </div>
            <h2>Најзначајнији резултати</h2>
            <p>Постигнућа која нас позиционирају у сам европски и светски врх</p>
          </div>
          <div className={styles.highlightGrid}>
            {HIGHLIGHTS.map((item, idx) => (
              <div key={idx} className={styles.highlightCard}>
                <span className={styles.highlightCardIcon}>
                  <i className={item.icon} aria-hidden />
                </span>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Kadar */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIconWrap}>
              <i className="fas fa-users" aria-hidden />
            </span>
            <div>
              <h2>Руководство клинике</h2>
              <p>Кључни кадрови Клинике за кардиохирургију</p>
            </div>
          </div>

          <div className={styles.teamGrid}>
            {KADAR.map((person, idx) => (
              <div key={idx} className={styles.teamCard}>
                <div className={styles.teamCardIcon}>
                  <i className="fas fa-user-doctor" aria-hidden />
                </div>
                <div>
                  <strong>{person.name}</strong>
                  <p>{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

    </>
  );
}
