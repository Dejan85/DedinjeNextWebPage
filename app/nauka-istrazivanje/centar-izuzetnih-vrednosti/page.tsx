import { Container, PageHeader, Section } from "@/components/shared";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

export { generateMetadata };

const PRAKSE = [
  {
    icon: "fas fa-microscope",
    abbr: "GSP",
    title: "Добра научна пракса",
    full: "Good Scientific Practice",
    description: "Принципи и стандарди који обезбеђују интегритет, поузданост и квалитет научноистраживачког рада.",
  },
  {
    icon: "fas fa-stethoscope",
    abbr: "GCP",
    title: "Добра клиничка пракса",
    full: "Good Clinical Practice",
    description: "Међународни стандард за дизајн, спровођење и извештавање о клиничким испитивањима на људима.",
  },
  {
    icon: "fas fa-flask",
    abbr: "GLP",
    title: "Добра лабораторијска пракса",
    full: "Good Laboratory Practice",
    description: "Систем квалитета који се примењује у лабораторијском раду за обезбеђивање поузданости резултата.",
  },
];

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

      {/* About */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.about}>
            <div className={styles.aboutIcon}>
              <i className="fas fa-award" aria-hidden />
            </div>
            <div className={styles.aboutContent}>
              <h2>О Центру изузетних вредности</h2>
              <p>
                Институт за кардиоваскуларне болести &bdquo;Дедиње&ldquo;
                представља установу од изванредног научноистраживачког значаја
                обзиром на број пацијената које лечи, спектар кардиоваскуларних
                процедура које се изводе на Институту и структуру кадра који се
                бави научноистраживачким радом. Један од основних услова за
                савремен истраживачки рад је квалификовано и адекватно обучено
                особље.
              </p>
              <p>
                У Центру за научну и истраживачку делатност у области
                кардиоваскуларне медицине остварује се неопходан континуитет у
                образовању, упознавање са савременим дијагностичким и терапијским
                методама као и овладавање техникама научноистраживачког рада.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Accreditation banner */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.accreditBanner}>
            <div className={styles.accreditBannerIcon}>
              <i className="fas fa-certificate" aria-hidden />
            </div>
            <div className={styles.accreditBannerContent}>
              <h3>Одлука о акредитацији Центра изузетних вредности</h3>
              <p>
                Центар изузетних вредности као организациона јединица Института
                јесте организација која у научном истраживању спроводи принципе
                међународно признатих стандарда квалитета. Центар је, на
                предлог директора проф. др Милована Бојића и уз одобрење
                Управног одбора на 26. седници, акредитован 20.07.2021.
                године од стране Министарства науке, технолошког развоја и
                иновација.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Prakse / Standards */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.sectionHeader}>
            <h2>Стандарди квалитета</h2>
            <p>Принципи које Центар примењује у научном истраживању</p>
          </div>
          <div className={styles.praksaGrid}>
            {PRAKSE.map((praksa) => (
              <div key={praksa.abbr} className={styles.praksaCard}>
                <div className={styles.praksaIcon}>
                  <i className={praksa.icon} aria-hidden />
                </div>
                <div className={styles.praksaAbbr}>{praksa.abbr}</div>
                <h3>{praksa.title}</h3>
                <span className={styles.praksaFull}>{praksa.full}</span>
                <p>{praksa.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Mentorship note */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.mentorBanner}>
            <div className={styles.mentorIcon}>
              <i className="fas fa-user-graduate" aria-hidden />
            </div>
            <div className={styles.mentorContent}>
              <h3>Менторство младих истраживача</h3>
              <p>
                У односу на младе истраживаче, сарадници Центра и Научно веће
                надгледају адекватну примену GSP-а, обезбеђујући менторску
                подршку и континуирано усавршавање у области научноистраживачког
                рада.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
