"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Container, PageHeader, Section } from "@/components/shared";
import styles from "./page.module.css";

const PdfViewer = dynamic(
  () => import("@/components/shared/PdfViewer/PdfViewer"),
  { ssr: false }
);

const INFORMATOR_SEKCIJE = [
  {
    icon: "fas fa-landmark",
    title: "Основни подаци",
    description: "Пун назив, седиште, матични број, ПИБ, оснивач и правни статус Института за кардиоваскуларне болести Дедиње.",
  },
  {
    icon: "fas fa-sitemap",
    title: "Организациона структура",
    description: "Унутрашња организација Института – клинике, одељења, службе и органи управљања.",
  },
  {
    icon: "fas fa-gavel",
    title: "Прописи и акти",
    description: "Закони, подзаконски акти и интерни акти на основу којих Институт обавља своју делатност.",
  },
  {
    icon: "fas fa-money-bill-wave",
    title: "Буџет и финансије",
    description: "Информације о изворима финансирања, буџету и финансијским извештајима Института.",
  },
  {
    icon: "fas fa-hands-helping",
    title: "Услуге и права грађана",
    description: "Информације о услугама које Институт пружа, правима пацијената и поступку остваривања права.",
  },
  {
    icon: "fas fa-envelope-open-text",
    title: "Подношење захтева",
    description: "Упутство за подношење захтева за слободан приступ информацијама од јавног значаја.",
  },
];

export default function InformatorPage() {
  const [showPdf, setShowPdf] = useState(false);

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Актуелности", href: "/aktuelnosti" },
          { label: "Информатор о раду" },
        ]}
        title="Информатор о раду"
        subtitle="У складу са Законом о слободном приступу информацијама од јавног значаја"
      />

      {/* Hero about */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.hero}>
            <div className={styles.heroIcon}>
              <i className="fas fa-balance-scale" aria-hidden />
            </div>
            <div className={styles.heroContent}>
              <h2>О информатору</h2>
              <p>
                Информатор о раду Института за кардиоваскуларне болести Дедиње
                припремљен је у складу са чланом 39. Закона о слободном приступу
                информацијама од јавног значаја и Упутством за израду и
                објављивање информатора о раду државног органа.
              </p>
              <p>
                Циљ информатора је да заинтересованим лицима омогући увид у
                основне податке о раду Института, унутрашњој организацији,
                надлежностима, услугама и поступцима.
              </p>
              <div className={styles.heroMeta}>
                <div className={styles.heroMetaItem}>
                  <i className="fas fa-calendar-alt" aria-hidden />
                  <div>
                    <span className={styles.metaLabel}>Датум објаве</span>
                    <span className={styles.metaValue}>15. јануар 2026.</span>
                  </div>
                </div>
                <div className={styles.heroMetaItem}>
                  <i className="fas fa-sync-alt" aria-hidden />
                  <div>
                    <span className={styles.metaLabel}>Последње ажурирање</span>
                    <span className={styles.metaValue}>01. фебруар 2026.</span>
                  </div>
                </div>
                <div className={styles.heroMetaItem}>
                  <i className="fas fa-file-pdf" aria-hidden />
                  <div>
                    <span className={styles.metaLabel}>Формат</span>
                    <span className={styles.metaValue}>PDF документ</span>
                  </div>
                </div>
              </div>
              <div className={styles.heroActions}>
                <button
                  className={styles.primaryBtn}
                  onClick={() => {
                    setShowPdf(!showPdf);
                    if (!showPdf) {
                      setTimeout(() => {
                        document.getElementById("pdf-viewer")?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }
                  }}
                >
                  <i className={showPdf ? "fas fa-times" : "fas fa-book-reader"} aria-hidden />
                  {showPdf ? "Затвори читач" : "Читај информатор"}
                </button>
                <a href="/pdf/АКАДЕМИК-CV-АВГУСТ-2025.pdf" download className={styles.secondaryBtn}>
                  <i className="fas fa-download" aria-hidden />
                  Преузми PDF
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* PDF Viewer */}
      {showPdf && (
        <Section padding="medium" background="gray">
          <Container>
            <div id="pdf-viewer">
              <PdfViewer
                url="/pdf/АКАДЕМИК-CV-АВГУСТ-2025.pdf"
                title="Информатор о раду — Институт Дедиње"
              />
            </div>
          </Container>
        </Section>
      )}

      {/* Content sections */}
      <Section padding="medium" background={showPdf ? "white" : "gray"}>
        <Container>
          <div className={styles.sectionHeader}>
            <h2>Садржај информатора</h2>
            <p>Информатор о раду садржи следеће целине</p>
          </div>
          <div className={styles.grid}>
            {INFORMATOR_SEKCIJE.map((sekcija, idx) => (
              <div key={sekcija.title} className={styles.card}>
                <div className={styles.cardNumber}>{String(idx + 1).padStart(2, "0")}</div>
                <div className={styles.cardIconWrap}>
                  <i className={sekcija.icon} aria-hidden />
                </div>
                <h3>{sekcija.title}</h3>
                <p>{sekcija.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact / Request info */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.contactSection}>
            <div className={styles.contactIcon}>
              <i className="fas fa-info-circle" aria-hidden />
            </div>
            <div className={styles.contactContent}>
              <h2>Захтев за приступ информацијама</h2>
              <p>
                У складу са Законом о слободном приступу информацијама од јавног
                значаја, свако физичко и правно лице може поднети захтев за
                приступ информацијама. Захтев се подноси писмено или усмено.
              </p>
              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <i className="fas fa-user" aria-hidden />
                  <div>
                    <span className={styles.contactLabel}>Овлашћено лице</span>
                    <span className={styles.contactValue}>Проф. др Небојша Тасић</span>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <i className="fas fa-phone" aria-hidden />
                  <div>
                    <span className={styles.contactLabel}>Телефон</span>
                    <span className={styles.contactValue}>011 360 1669</span>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <i className="fas fa-envelope" aria-hidden />
                  <div>
                    <span className={styles.contactLabel}>Е-маил</span>
                    <span className={styles.contactValue}>informator@ikvbd.rs</span>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <i className="fas fa-map-marker-alt" aria-hidden />
                  <div>
                    <span className={styles.contactLabel}>Адреса</span>
                    <span className={styles.contactValue}>Хероја Милана Тепића 1, 11040 Београд</span>
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
