import {
  Container,
  GradientCardGrid,
  PageHeader,
  Section,
} from "@/components/shared";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

export { generateMetadata };

const KME_CARDS = [
  {
    id: "lekar",
    title: "КМЕ – Лекари",
    icon: "fas fa-user-md",
    href: "/edukacija/kme-2024",
  },
  {
    id: "medicinske-sestre",
    title: "КМЕ – медицинске сестре/техничари",
    icon: "fas fa-user-nurse",
    href: "/edukacija/kme-2024/kme-medicinske-sestre-tehnicari",
  },
  {
    id: "arhiva",
    title: "КМЕ – Архива",
    icon: "fas fa-archive",
    href: "/edukacija/kme-2024",
  },
];

const SLUZBA_AKTIVNOSTI = [
  { icon: "fas fa-project-diagram", text: "Планира, надзире и евалуира израду научно-истраживачких и развојних пројеката" },
  { icon: "fas fa-file-alt", text: "Координира припремање и објављивање стручних и научних радова" },
  { icon: "fas fa-cogs", text: "Планира и координира научне и техничке послове у вези научно-истраживачког рада Института" },
  { icon: "fas fa-scroll", text: "Припрема опште акте који уређују научно-истраживачку делатност Института" },
];

const SEKTOR_AKTIVNOSTI = [
  { icon: "fas fa-chalkboard-teacher", text: "Организује различите облике стручног и научног усавршавања" },
  { icon: "fas fa-handshake", text: "Организује различите облике међународне сарадње" },
  { icon: "fas fa-calendar-check", text: "Координира учешће на научним и стручним скуповима" },
  { icon: "fas fa-clipboard-check", text: "Прати и контролише спровођење обавезног лекарског, специјалистичког и субспецијалистичког стажа на Институту" },
];

const RASPORED_PO_TEMAMA = [
  { title: "ЕЦМО – Екстракорпорална мембранска оксигенација", lecturer: "проф. др Миомир Јовић" },
  { title: "Хипертензија и физичка активност – да ли је могућа терапија без лекова?", lecturer: "проф. др Небојша Тасић" },
  { title: "Лечење аритмолошке олује", lecturer: "др Дејан Којић" },
  { title: "Контрола фактора ризика за исхемијски кардиоваскуларни догађај", lecturer: "асс. др сци. мед. др Срђан Бабић" },
  { title: "Вентрикуларна тахикардија (ВТ)", lecturer: "проф. др Петар Оташевић" },
  { title: "Клиничко-патохистолошки модалитети миокардитиса на обдукцијском материјалу", lecturer: "др Љубомир Ђоковић" },
  { title: "ЛВАД И ЕЦМО", lecturer: "Др Јелена Латковић – Др Љубомир Ђоковић" },
  { title: "Сепса и септички шок", lecturer: "Др Јована Иванчевић – Др Љ. Ђоковић, Др Д. Унић-Стојановић" },
  { title: "Хронични коронарни синдром", lecturer: "Др Маја Милошевић – Проф. др Петар Оташевић" },
  { title: "Преткоморске аритмије", lecturer: "Др Михаило Јовичић, Др Велибор Ристић" },
  { title: "Неоклузивна коронарна болест и микроциркулација", lecturer: "Др Стефан Тимчић, Проф. др Раде Бабић" },
  { title: "Клинички преглед и дијагностика васкуларних болести", lecturer: "Др Александар Бабић, Проф. др Ненад Илијевски" },
  { title: "Анеуризматска и периферна артеријска болест код поливаскуларног болесника", lecturer: "Др Игор Атанасијевић, Асс. др Предраг Матић" },
  { title: "ЦТ коронарографија", lecturer: "Др Тијана Рошул, Др Милица Брковић, Др Ковачевић" },
];

export default function Kme2024Page() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Едукација", href: "/edukacija" },
          { label: "KME 2024" },
        ]}
        title="KME 2024"
        subtitle="Континуирана медицинска едукација"
      />

      {/* KME Cards */}
      <Section padding="medium" background="white">
        <Container>
          <GradientCardGrid items={KME_CARDS} />
        </Container>
      </Section>

      {/* About */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.aboutGrid}>
            {/* Служба */}
            <div className={styles.aboutCard}>
              <div className={styles.aboutCardHeader}>
                <div className={styles.aboutCardIcon}>
                  <i className="fas fa-flask" aria-hidden />
                </div>
                <div>
                  <h3>Служба за образовну делатност</h3>
                  <p className={styles.aboutCardSubtitle}>
                    Научно-истраживачки рад обухвата све клинике медицинског сектора Института
                  </p>
                </div>
              </div>
              <ul className={styles.activityList}>
                {SLUZBA_AKTIVNOSTI.map((item) => (
                  <li key={item.text}>
                    <span className={styles.activityIcon}>
                      <i className={item.icon} aria-hidden />
                    </span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Сектор */}
            <div className={styles.aboutCard}>
              <div className={styles.aboutCardHeader}>
                <div className={`${styles.aboutCardIcon} ${styles.aboutCardIconAlt}`}>
                  <i className="fas fa-university" aria-hidden />
                </div>
                <div>
                  <h3>Сектор за научно-истраживачки рад</h3>
                  <p className={styles.aboutCardSubtitle}>
                    КМЕ је део редовних активности Сектора за научно-истраживачки рад
                  </p>
                </div>
              </div>
              <ul className={styles.activityList}>
                {SEKTOR_AKTIVNOSTI.map((item) => (
                  <li key={item.text}>
                    <span className={styles.activityIcon}>
                      <i className={item.icon} aria-hidden />
                    </span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.infoNote}>
            <i className="fas fa-info-circle" aria-hidden />
            <p>
              Усавршавање лекара и медицинских техничара је обавеза запослених и неопходна је
              како за унапређење квалитета рада тако и за обнављање лиценци за њихов рад.
            </p>
          </div>
        </Container>
      </Section>

      {/* Lectures */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.lecturesHeader}>
            <div>
              <h2>Распоред по темама</h2>
              <p>Преглед завршених специјализација — {RASPORED_PO_TEMAMA.length} предавања</p>
            </div>
          </div>
          <div className={styles.lecturesGrid}>
            {RASPORED_PO_TEMAMA.map((item, idx) => (
              <div key={idx} className={styles.lectureCard}>
                <span className={styles.lectureNum}>{String(idx + 1).padStart(2, "0")}</span>
                <div className={styles.lectureBody}>
                  <h4>{item.title}</h4>
                  <span className={styles.lecturerBadge}>
                    <i className="fas fa-user" aria-hidden /> {item.lecturer}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.contact}>
            <div className={styles.contactIconWrap}>
              <i className="fas fa-headset" aria-hidden />
            </div>
            <div className={styles.contactContent}>
              <h2>Контакт</h2>
              <p>За додатне информације о КМЕ програму, обратите се:</p>
              <div className={styles.contactGrid}>
                <div className={styles.contactItem}>
                  <i className="fas fa-user" aria-hidden />
                  <div>
                    <span className={styles.contactLabel}>Контакт особа</span>
                    <span className={styles.contactValue}>Проф. др Небојша Тасић</span>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <i className="fas fa-phone" aria-hidden />
                  <div>
                    <span className={styles.contactLabel}>Телефон</span>
                    <a href="tel:+381113601669" className={styles.contactValue}>011 360 1669</a>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <i className="fas fa-envelope" aria-hidden />
                  <div>
                    <span className={styles.contactLabel}>Е-маил</span>
                    <a href="mailto:nic@yahoo.com" className={styles.contactValue}>nic@yahoo.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
