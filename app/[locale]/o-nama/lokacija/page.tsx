import {
  Container,
  PageHeader,
  Button,
  Section,
  PageBuilder,
} from "@/components/shared";
import { client } from "@/sanity/lib/client";
import { PAGE_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { localize, type Locale } from "@/sanity/lib/locale";
import type { PatientPage } from "@/sanity/types";
import styles from "./page.module.css";
import { metadata } from "./metadata";
import { DATA } from "./data";

export { metadata };

const SLUG = "lokacija";

const INFO_ITEMS = [
  { icon: "fas fa-clock", label: "Радно време", value: "Понедељак - Петак: 07-20h" },
  { icon: "fas fa-phone", label: "Call центар", value: "011 3601 700" },
  { icon: "fas fa-fax", label: "Факс", value: "(+381 11) 2666 445" },
  { icon: "fas fa-envelope", label: "Е-пошта", value: "info@ikvbd.com" },
  { icon: "fas fa-globe", label: "Веб сајт", value: "www.institutdedinje.rs" },
];

export default async function LokacijaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let page: PatientPage | null = null;

  try {
    const raw = await client.fetch<PatientPage>(PAGE_BY_SLUG_QUERY, { slug: SLUG });
    page = raw ? localize(raw, locale as Locale) : null;
  } catch (error) {
    console.error("⚠️ Sanity fetch failed:", error);
  }

  const data = page ?? DATA;

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "О нама" },
          { label: "Локација" },
        ]}
        title={data.title}
        subtitle={data.subtitle}
      />

      <Section padding="medium" background="white">
        <Container>
          <div className={styles.mapGrid}>
            <div className={styles.addressBlock}>
              <div className={styles.addressIcon}>
                <i className="fas fa-location-dot" aria-hidden />
              </div>
              <h2>Национални институт за срце и крвне судове „Дедиње”</h2>
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

      <PageBuilder blocks={data.pageBuilder} />

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
