"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Container, PageHeader, Section } from "@/components/shared";
import styles from "./page.module.css";

const PdfViewer = dynamic(
  () => import("@/components/shared/PdfViewer/PdfViewer"),
  { ssr: false }
);

export interface InformatorData {
  heroHeading: string;
  heroParagraphs: string[];
  publishDate: string;
  updatedDate: string;
  pdfUrl: string;
  sections: Array<{ icon: string; title: string; description: string }>;
  contactHeading: string;
  contactText: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
}

export default function InformatorClient({ data }: { data: InformatorData }) {
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
              <h2>{data.heroHeading}</h2>
              {data.heroParagraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
              <div className={styles.heroMeta}>
                <div className={styles.heroMetaItem}>
                  <i className="fas fa-calendar-alt" aria-hidden />
                  <div>
                    <span className={styles.metaLabel}>Датум објаве</span>
                    <span className={styles.metaValue}>{data.publishDate}</span>
                  </div>
                </div>
                <div className={styles.heroMetaItem}>
                  <i className="fas fa-sync-alt" aria-hidden />
                  <div>
                    <span className={styles.metaLabel}>Последње ажурирање</span>
                    <span className={styles.metaValue}>{data.updatedDate}</span>
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
                <a href={data.pdfUrl} download className={styles.secondaryBtn}>
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
              <PdfViewer url={data.pdfUrl} title="Информатор о раду — Институт Дедиње" />
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
            {data.sections.map((sekcija, idx) => (
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
              <h2>{data.contactHeading}</h2>
              <p>{data.contactText}</p>
              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <i className="fas fa-user" aria-hidden />
                  <div>
                    <span className={styles.contactLabel}>Овлашћено лице</span>
                    <span className={styles.contactValue}>{data.contactPerson}</span>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <i className="fas fa-phone" aria-hidden />
                  <div>
                    <span className={styles.contactLabel}>Телефон</span>
                    <span className={styles.contactValue}>{data.contactPhone}</span>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <i className="fas fa-envelope" aria-hidden />
                  <div>
                    <span className={styles.contactLabel}>Е-маил</span>
                    <span className={styles.contactValue}>{data.contactEmail}</span>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <i className="fas fa-map-marker-alt" aria-hidden />
                  <div>
                    <span className={styles.contactLabel}>Адреса</span>
                    <span className={styles.contactValue}>{data.contactAddress}</span>
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
