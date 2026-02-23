"use client";

import { useState } from "react";
import {
  Container,
  PageHeader,
  Section,
} from "@/components/shared";
import styles from "./page.module.css";

const CONTACT_CARDS = [
  {
    icon: "fas fa-phone",
    title: "Call центар",
    value: "011 3601 700",
    href: "tel:+381113601700",
    desc: "Понедељак - Петак: 07-20h",
  },
  {
    icon: "fas fa-envelope",
    title: "Е-пошта",
    value: "info@ikvbd.com",
    href: "mailto:info@ikvbd.com",
    desc: "Одговарамо у року од 24h",
  },
  {
    icon: "fas fa-location-dot",
    title: "Адреса",
    value: "Хероја Милана Тепића 1",
    href: "https://maps.google.com/?q=Institut+za+kardiovaskularne+bolesti+Dedinje",
    desc: "11040 Београд, Србија",
  },
  {
    icon: "fas fa-clock",
    title: "Радно време",
    value: "07:00 - 20:00",
    href: "#",
    desc: "Понедељак - Петак",
  },
];

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    ime: "",
    prezime: "",
    email: "",
    poruka: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Контакт" },
        ]}
        title="Контактирајте нас"
        subtitle="Наш тим је спреман да одговори на сва ваша питања и помогне вам"
      />

      {/* Contact cards */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.cardsGrid}>
            {CONTACT_CARDS.map((card, idx) => (
              <a key={idx} href={card.href} className={styles.contactCard}>
                <div className={styles.contactCardIcon}>
                  <i className={card.icon} aria-hidden />
                </div>
                <span className={styles.contactCardTitle}>{card.title}</span>
                <strong>{card.value}</strong>
                <span className={styles.contactCardDesc}>{card.desc}</span>
              </a>
            ))}
          </div>
        </Container>
      </Section>

      {/* Form + Map */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.formMapGrid}>
            {/* Form */}
            <div className={styles.formBlock}>
              <div className={styles.formHeader}>
                <div className={styles.formHeaderIcon}>
                  <i className="fas fa-paper-plane" aria-hidden />
                </div>
                <div>
                  <h2>Пошаљите нам поруку</h2>
                  <p>Попуните формулар и одговорићемо вам у најкраћем року</p>
                </div>
              </div>

              {submitted ? (
                <div className={styles.successMessage}>
                  <div className={styles.successIcon}>
                    <i className="fas fa-check-circle" aria-hidden />
                  </div>
                  <h3>Порука је послата!</h3>
                  <p>Хвала вам на поруци. Одговорићемо вам у најкраћем могућем року.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="ime">
                        Име <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="text"
                        id="ime"
                        required
                        value={formData.ime}
                        onChange={(e) => setFormData({ ...formData, ime: e.target.value })}
                        placeholder="Ваше име"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="prezime">Презиме</label>
                      <input
                        type="text"
                        id="prezime"
                        value={formData.prezime}
                        onChange={(e) => setFormData({ ...formData, prezime: e.target.value })}
                        placeholder="Ваше презиме"
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email">
                      Е-маил <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="vasa@adresa.com"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="poruka">
                      Порука <span className={styles.required}>*</span>
                    </label>
                    <textarea
                      id="poruka"
                      required
                      rows={5}
                      value={formData.poruka}
                      onChange={(e) => setFormData({ ...formData, poruka: e.target.value })}
                      placeholder="Напишите вашу поруку..."
                    />
                  </div>

                  <button type="submit" className={styles.submitBtn}>
                    <i className="fas fa-paper-plane" aria-hidden />
                    Пошаљите поруку
                  </button>
                </form>
              )}
            </div>

            {/* Map + info */}
            <div className={styles.mapBlock}>
              <div className={styles.mapWrap}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2832.5!2d20.4565!3d44.7733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7009d2b5e8d3%3A0x5f8e8b6f7c6d3e0!2z0JjQvdGB0YLQuNGC0YPRgiDQt9CwINC60LDRgNC00LjQvtCy0LDRgdC60YPQu9Cw0YDQvdC1INCx0L7Qu9C10YHRgtC4INCU0LXQtNC40ZrQtQ!5e0!3m2!1ssr!2srs!4v1700000000000!5m2!1ssr!2srs"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Локација Института Дедиње"
                />
              </div>

              <div className={styles.mapInfo}>
                <div className={styles.mapInfoIcon}>
                  <i className="fas fa-hospital" aria-hidden />
                </div>
                <div>
                  <h3>Институт за кардиоваскуларне болести Дедиње</h3>
                  <p>
                    Једна од водећих здравствених установа у Србији и на Балкану
                    која пружа здравствене услуге из домена кардиологије,
                    кардиохирургије, васкуларне хирургије, трансплантације и др.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Emergency banner */}
      <section className={styles.emergencyBanner}>
        <Container>
          <div className={styles.emergencyContent}>
            <div className={styles.emergencyIcon}>
              <i className="fas fa-triangle-exclamation" aria-hidden />
            </div>
            <div>
              <h3>Хитни случајеви</h3>
              <p>
                У случају хитне медицинске помоћи, позовите <strong>194</strong> или
                се јавите на пријемну амбуланту Института. Наш тим је доступан 24/7.
              </p>
            </div>
            <a href="tel:194" className={styles.emergencyBtn}>
              <i className="fas fa-phone" aria-hidden />
              194
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
