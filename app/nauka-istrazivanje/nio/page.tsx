"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Container, PageHeader, Section } from "@/components/shared";
import styles from "./page.module.css";

const PdfViewer = dynamic(
  () => import("@/components/shared/PdfViewer/PdfViewer"),
  { ssr: false }
);

const NIO_LINKS = [
  {
    icon: "fas fa-certificate",
    label: "Одлука о научној акредитацији Института",
    href: "/pdf/odluka-akreditacija.pdf",
    year: "2025",
  },
  {
    icon: "fas fa-file-alt",
    label: "Извештај о Научноистраживачком раду за 2020.",
    href: "/pdf/izvestaj-nio-2020.pdf",
    year: "2020",
  },
  {
    icon: "fas fa-file-alt",
    label: "Извештај о Научноистраживачком раду за 2021.",
    href: "/pdf/izvestaj-nio-2021.pdf",
    year: "2021",
  },
  {
    icon: "fas fa-file-alt",
    label: "Извештај о Научноистраживачком раду за 2022.",
    href: "/pdf/izvestaj-nio-2022.pdf",
    year: "2022",
  },
  {
    icon: "fas fa-file-alt",
    label: "Извештај о Научноистраживачком раду за 2023.",
    href: "/pdf/izvestaj-nio-2023.pdf",
    year: "2023",
  },
];

export default function NioPage() {
  const [selectedPdf, setSelectedPdf] = useState<{ href: string; label: string } | null>(null);

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Наука и истраживање", href: "/nauka-istrazivanje" },
          { label: "NIO" },
        ]}
        title="NIO"
        subtitle="Научноистраживачки одсек Института за кардиоваскуларне болести Дедиње"
      />

      {/* About */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.about}>
            <div className={styles.aboutIcon}>
              <i className="fas fa-flask" aria-hidden />
            </div>
            <div className={styles.aboutContent}>
              <h2>О научноистраживачком раду</h2>
              <p>
                Вођен визијом о стварању здравствене установе која би равноправно
                егзистирала са водећим светским клиникама по броју и квалитету
                научних пројеката и публикација, по активном учешћу наших лекара
                на светски признатим конгресима и др. облицима едукације, директор
                Проф. др Милован Бојић, НС је 2020. године покренуо иницијативу
                добијања научне акредитације Института за кардиоваскуларне болести
                &bdquo;Дедиње&ldquo;.
              </p>
              <div className={styles.aboutStats}>
                <div className={styles.stat}>
                  <span className={styles.statNum}>2020</span>
                  <span className={styles.statLabel}>Иницијатива</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNum}>2025</span>
                  <span className={styles.statLabel}>Акредитација</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNum}>4</span>
                  <span className={styles.statLabel}>Годишња извештаја</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Accreditation banner */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.accreditBanner}>
            <div className={styles.accreditIcon}>
              <i className="fas fa-award" aria-hidden />
            </div>
            <div className={styles.accreditContent}>
              <div className={styles.accreditBadge}>
                <i className="fas fa-check-circle" aria-hidden /> Научна акредитација
              </div>
              <h2>Акредитовани научноистраживачки институт</h2>
              <p>
                Одбор за акредитацију научноистраживачких организација Министарства
                науке, технолошког развоја и иновација доделио је научну
                акредитацију Институту Одлуком бр 660-01-0007/2024-32 од 08.07.2025.
                године.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Documents */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.sectionHeader}>
            <h2>Документа и извештаји</h2>
            <p>Прегледајте документа директно или преузмите PDF</p>
          </div>
          <div className={styles.docsList}>
            {NIO_LINKS.map((link) => (
              <div key={link.href} className={styles.docCard}>
                <div className={styles.docIcon}>
                  <i className={link.icon} aria-hidden />
                </div>
                <div className={styles.docBody}>
                  <span className={styles.docYear}>{link.year}</span>
                  <h3>{link.label}</h3>
                </div>
                <div className={styles.docActions}>
                  <button
                    className={styles.docReadBtn}
                    onClick={() => {
                      setSelectedPdf(
                        selectedPdf?.href === link.href ? null : { href: link.href, label: link.label }
                      );
                      if (selectedPdf?.href !== link.href) {
                        setTimeout(() => {
                          document.getElementById("pdf-viewer")?.scrollIntoView({ behavior: "smooth" });
                        }, 100);
                      }
                    }}
                  >
                    <i className={selectedPdf?.href === link.href ? "fas fa-times" : "fas fa-book-reader"} aria-hidden />
                    {selectedPdf?.href === link.href ? "Затвори" : "Читај"}
                  </button>
                  <a href={link.href} download className={styles.docDownloadBtn}>
                    <i className="fas fa-download" aria-hidden />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* PDF Viewer */}
      {selectedPdf && (
        <Section padding="medium" background="gray">
          <Container>
            <div id="pdf-viewer">
              <div className={styles.viewerHeader}>
                <div>
                  <h2 className={styles.viewerTitle}>{selectedPdf.label}</h2>
                  <p className={styles.viewerSubtitle}>Преглед документа</p>
                </div>
                <button
                  className={styles.closeViewerBtn}
                  onClick={() => setSelectedPdf(null)}
                >
                  <i className="fas fa-times" aria-hidden /> Затвори
                </button>
              </div>
              <PdfViewer url={selectedPdf.href} title={selectedPdf.label} />
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
