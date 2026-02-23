import { Container, PageHeader, Section } from "@/components/shared";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

export { generateMetadata };

const KARDIOHIRURSKI = [
  {
    title: "Одељење преоперативне припреме кардиохирургије",
    note: "пре операције",
    phone: "011/3601-819",
    href: "tel:0113601819",
    time: "12:00 – 13:00",
  },
  {
    title: "Клиника за анестезију и интензивно лечење",
    note: "након операције",
    phone: "011/3601-784",
    href: "tel:0113601784",
    time: "12:30 – 13:30 и 20:00 – 20:30 (за пацијенте оперисане тог дана)",
  },
  {
    title: "Одељење за постоперативно лечење",
    note: "након преласка из интензивне неге",
    phone: "011/3601-792 или 011/3601-796",
    href: "tel:0113601792",
    time: "13:00 – 13:30",
  },
];

const VASKULARNI = [
  {
    title: "Клиника за анестезију и интензивно лечење",
    note: "након операције",
    phone: "011/3601-784",
    href: "tel:0113601784",
    time: "12:30 – 13:30 и 20:00 – 20:30 (за болеснике оперисане тог дана)",
  },
  {
    title: "Клиника за васкуларну хирургију",
    phone: "011/3601-705",
    href: "tel:0113601705",
    time: "12:00 – 13:00",
  },
];

const KARDIOLOSKI = [
  {
    title: "Клиника за кардиологију",
    phone: "011/3601-707, 011/3601-709 (коронарна јединица)",
    href: "tel:0113601707",
    time: "12:00 – 13:00",
  },
];

export default function InformacijeOStanjuPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "За пацијенте", href: "/za-pacijente" },
          { label: "Информације о здравственом стању пацијента" },
        ]}
        title="Информације о здравственом стању пацијента"
        subtitle="Информације за најближе чланове породице хоспитализованих пацијената"
      />

      {/* Intro + Important notice */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.intro}>
            <div className={styles.introIcon}>
              <i className="fas fa-info-circle" aria-hidden />
            </div>
            <div className={styles.introContent}>
              <h2>Информисање о стању пацијента</h2>
              <p>
                За пацијенте који се хитно оперишу, најближи чланови породице
                могу доћи и добити информације лично од лекара сваког дана у 12
                часова. За дуголежеће пацијенте, информације се могу добити
                лично уз претходни договор са лекарима.
              </p>
            </div>
          </div>

          <div className={styles.alertBanner}>
            <div className={styles.alertIcon}>
              <i className="fas fa-triangle-exclamation" aria-hidden />
            </div>
            <div className={styles.alertContent}>
              <strong>Информације се односе само на хоспитализоване пацијенте</strong>
              <p>
                Информације путем телефона могу добити искључиво најближи
                чланови породице (особе које је пацијент навео при отварању
                историје болести). Информације искључиво пружају лекари.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Kontakti po kategorijama */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIconWrap}>
              <i className="fas fa-phone" aria-hidden />
            </span>
            <div>
              <h2>Контакт телефони по одељењима</h2>
              <p>Позовите одељење у назначеном термину</p>
            </div>
          </div>

          {/* Kardiohirurski */}
          <div className={styles.categoryBlock}>
            <h3 className={styles.categoryTitle}>
              <i className="fas fa-heart-pulse" aria-hidden />
              Кардиохируршки пацијенти
            </h3>
            <div className={styles.contactGrid}>
              {KARDIOHIRURSKI.map((item, idx) => (
                <div key={idx} className={styles.contactCard}>
                  <div className={styles.contactCardHeader}>
                    <strong>{item.title}</strong>
                    {item.note && <span className={styles.contactNote}>{item.note}</span>}
                  </div>
                  <div className={styles.contactCardBody}>
                    <div className={styles.contactRow}>
                      <i className="fas fa-phone" aria-hidden />
                      <a href={item.href}>{item.phone}</a>
                    </div>
                    <div className={styles.contactRow}>
                      <i className="fas fa-clock" aria-hidden />
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vaskularni */}
          <div className={styles.categoryBlock}>
            <h3 className={styles.categoryTitle}>
              <i className="fas fa-stethoscope" aria-hidden />
              Васкуларни пацијенти
            </h3>
            <div className={styles.contactGrid}>
              {VASKULARNI.map((item, idx) => (
                <div key={idx} className={styles.contactCard}>
                  <div className={styles.contactCardHeader}>
                    <strong>{item.title}</strong>
                    {item.note && <span className={styles.contactNote}>{item.note}</span>}
                  </div>
                  <div className={styles.contactCardBody}>
                    <div className={styles.contactRow}>
                      <i className="fas fa-phone" aria-hidden />
                      <a href={item.href}>{item.phone}</a>
                    </div>
                    <div className={styles.contactRow}>
                      <i className="fas fa-clock" aria-hidden />
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kardioloski */}
          <div className={styles.categoryBlock}>
            <h3 className={styles.categoryTitle}>
              <i className="fas fa-heart" aria-hidden />
              Кардиолошки пацијенти
            </h3>
            <div className={styles.contactGrid}>
              {KARDIOLOSKI.map((item, idx) => (
                <div key={idx} className={styles.contactCard}>
                  <div className={styles.contactCardHeader}>
                    <strong>{item.title}</strong>
                  </div>
                  <div className={styles.contactCardBody}>
                    <div className={styles.contactRow}>
                      <i className="fas fa-phone" aria-hidden />
                      <a href={item.href}>{item.phone}</a>
                    </div>
                    <div className={styles.contactRow}>
                      <i className="fas fa-clock" aria-hidden />
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Dostava stvari */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIconWrap}>
              <i className="fas fa-box" aria-hidden />
            </span>
            <div>
              <h2>Достава ствари</h2>
              <p>Информације о доставиствари хоспитализованим пацијентима</p>
            </div>
          </div>

          <div className={styles.deliveryGrid}>
            <div className={styles.deliveryCard}>
              <div className={styles.deliveryCardIcon}>
                <i className="fas fa-clock" aria-hidden />
              </div>
              <h4>Време доставе</h4>
              <p>14:00 – 16:00 часова</p>
            </div>
            <div className={styles.deliveryCard}>
              <div className={styles.deliveryCardIcon}>
                <i className="fas fa-building" aria-hidden />
              </div>
              <h4>Дедиње 1 – средњи улаз</h4>
              <p>
                Одељења кардиологије, васкуларне хирургије и интензивне неге
                васкуларне хирургије
              </p>
            </div>
            <div className={styles.deliveryCard}>
              <div className={styles.deliveryCardIcon}>
                <i className="fas fa-building" aria-hidden />
              </div>
              <h4>Дедиње 2 – главни улаз</h4>
              <p>
                Преоперативна припрема, постоперативна нега и интензивна нега
                кардиохирургије
              </p>
            </div>
          </div>

          <div className={styles.warningBanner}>
            <i className="fas fa-ban" aria-hidden />
            <span>Строго је забрањена достава унапред припремљене хране.</span>
          </div>

          <p className={styles.deliveryNote}>
            Лекови и медицинска документација могу се доставити и ван наведеног
            времена. Болничарке са одељења силазе по ствари након обавештења
            портира.
          </p>
        </Container>
      </Section>
    </>
  );
}
