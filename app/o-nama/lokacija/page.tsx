import {
  Container,
  PageHeader,
  Button,
  Section,
} from "@/components/shared";
import styles from "./page.module.css";
import { metadata } from "./metadata";

export { metadata };

const TRANSPORT = [
  {
    icon: "fas fa-bus",
    title: "Аутобус",
    lines: "Линије 37, 58, 59",
    desc: 'Станица "Дедиње" — директно испред Института',
  },
  {
    icon: "fas fa-train-tram",
    title: "Трамвај",
    lines: "Линије 3, 12",
    desc: 'Станица "Топчидерска звезда" — 10 минута пешице',
  },
  {
    icon: "fas fa-car",
    title: "Аутомобил",
    lines: "Паркинг доступан",
    desc: "Бесплатан паркинг у кругу Института за пацијенте",
  },
  {
    icon: "fas fa-taxi",
    title: "Такси",
    lines: "Све такси службе",
    desc: "Адреса: Хероја Милана Тепића бр. 1, 11040 Београд",
  },
];

const INFO_ITEMS = [
  { icon: "fas fa-clock", label: "Радно време", value: "Понедељак - Петак: 07-20h" },
  { icon: "fas fa-phone", label: "Call центар", value: "011 3601 700" },
  { icon: "fas fa-envelope", label: "Е-пошта", value: "info@ikvbd.com" },
  { icon: "fas fa-globe", label: "Веб сајт", value: "www.institutdedinje.rs" },
];

export default function LokacijaPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "О нама" },
          { label: "Локација" },
        ]}
        title="Локација Института"
        subtitle="Како доћи до Института за кардиоваскуларне болести Дедиње"
      />

      <Section padding="medium" background="white">
        <Container>
          <div className={styles.mapGrid}>
            <div className={styles.addressBlock}>
              <div className={styles.addressIcon}>
                <i className="fas fa-location-dot" aria-hidden />
              </div>
              <h2>Институт за кардиоваскуларне болести Дедиње</h2>
              <div className={styles.addressLines}>
                <div className={styles.addressLine}>
                  <i className="fas fa-map-pin" aria-hidden />
                  <span>Хероја Милана Тепића бр. 1</span>
                </div>
                <div className={styles.addressLine}>
                  <i className="fas fa-city" aria-hidden />
                  <span>11040 Београд, Србија</span>
                </div>
              </div>

              <div className={styles.quickInfo}>
                {INFO_ITEMS.map((item, idx) => (
                  <div key={idx} className={styles.quickInfoItem}>
                    <span className={styles.quickInfoIcon}>
                      <i className={item.icon} aria-hidden />
                    </span>
                    <div>
                      <span className={styles.quickInfoLabel}>{item.label}</span>
                      <strong>{item.value}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.mapWrap}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2832.5!2d20.4565!3d44.7733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7009d2b5e8d3%3A0x5f8e8b6f7c6d3e0!2z0JjQvdGB0YLQuNGC0YPRgiDQt9CwINC60LDRgNC00LjQvtCy0LDRgdC60YPQu9Cw0YDQvdC1INCx0L7Qu9C10YHRgtC4INCU0LXQtNC40ZrQtQ!5e0!3m2!1ssr!2srs!4v1700000000000!5m2!1ssr!2srs"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: 14 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Локација Института Дедиње"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIconWrap}>
              <i className="fas fa-route" aria-hidden />
            </span>
            <div>
              <h2>Како до нас</h2>
              <p>Доступне опције јавног и приватног превоза</p>
            </div>
          </div>

          <div className={styles.transportGrid}>
            {TRANSPORT.map((item, idx) => (
              <div key={idx} className={styles.transportCard}>
                <div className={styles.transportCardIcon}>
                  <i className={item.icon} aria-hidden />
                </div>
                <h4>{item.title}</h4>
                <span className={styles.transportLines}>{item.lines}</span>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <section className={styles.highlightBanner}>
        <Container>
          <div className={styles.highlightContent}>
            <div className={styles.highlightIcon}>
              <i className="fas fa-parking" aria-hidden />
            </div>
            <div>
              <h3>Паркинг за пацијенте</h3>
              <p>
                Бесплатан паркинг простор је доступан у кругу Института. За
                пацијенте који долазе на хируршке интервенције, обезбеђен је
                паркинг у непосредној близини главног улаза.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.ctaSection}>
        <Container>
          <div className={styles.ctaContent}>
            <div className={styles.ctaIcon}>
              <i className="fas fa-phone" aria-hidden />
            </div>
            <h2>Потребна вам је помоћ са усмеравањем?</h2>
            <p>
              Наш Call центар може вам помоћи са детаљним упутствима за долазак.
            </p>
            <div className={styles.ctaButtons}>
              <Button variant="primary" href="/kontakt">
                <i className="fas fa-phone" aria-hidden />
                Контактирајте нас
              </Button>
              <Button variant="secondary" href="/o-institutu">
                <i className="fas fa-hospital" aria-hidden />
                О Институту
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
