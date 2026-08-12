"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Container, PageHeader, Section } from "@/components/shared";
import styles from "./page.module.css";

const PdfViewer = dynamic(
  () => import("@/components/shared/PdfViewer/PdfViewer"),
  { ssr: false }
);

export interface IzdanjeItem {
  id: string;
  volume: string;
  number: string;
  year: string;
  title: string;
  topics: string[];
  pdfUrl: string;
  coverColor: string;
}

export default function CasopisDedinjeClient({ items }: { items: IzdanjeItem[] }) {
  const [selectedIzdanje, setSelectedIzdanje] = useState<IzdanjeItem | null>(null);

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Актуелности", href: "/aktuelnosti" },
          { label: "Часопис Дедиње" },
        ]}
        title="Часопис Дедиње"
        subtitle="Стручни часопис из области кардиоваскуларне медицине"
      />

      {/* About */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.aboutSection}>
            <div className={styles.aboutIcon}>
              <i className="fas fa-book-medical" aria-hidden />
            </div>
            <div className={styles.aboutContent}>
              <h2>О часопису</h2>
              <p>
                Часопис Дедиње је стручна публикација Националног института за срце и крвне судове „Дедиње”
                која објављује научне и клиничке радове из области кардиоваскуларне медицине,
                хирургије и дијагностике. Часопис излази два пута годишње и садржи оригиналне
                радове, прегледне чланке и приказе случајева.
              </p>
              <div className={styles.aboutStats}>
                <div className={styles.aboutStat}>
                  <span className={styles.aboutStatNum}>{items.length}</span>
                  <span className={styles.aboutStatLabel}>Издања</span>
                </div>
                <div className={styles.aboutStat}>
                  <span className={styles.aboutStatNum}>2x</span>
                  <span className={styles.aboutStatLabel}>Годишње</span>
                </div>
                <div className={styles.aboutStat}>
                  <span className={styles.aboutStatNum}>12+</span>
                  <span className={styles.aboutStatLabel}>Година</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* PDF Viewer (when selected) */}
      {selectedIzdanje && (
        <Section padding="medium" background="gray">
          <Container>
            <div className={styles.viewerHeader}>
              <div>
                <h2 className={styles.viewerTitle}>
                  Вол. {selectedIzdanje.volume}, Бр. {selectedIzdanje.number} ({selectedIzdanje.year})
                </h2>
                <p className={styles.viewerSubtitle}>{selectedIzdanje.title}</p>
              </div>
              <button
                className={styles.closeViewerBtn}
                onClick={() => setSelectedIzdanje(null)}
              >
                <i className="fas fa-times" aria-hidden /> Затвори
              </button>
            </div>
            <PdfViewer
              url={selectedIzdanje.pdfUrl}
              title={`Часопис Дедиње — Вол. ${selectedIzdanje.volume}, Бр. ${selectedIzdanje.number}`}
            />
          </Container>
        </Section>
      )}

      {/* Issues grid */}
      <Section padding="medium" background={selectedIzdanje ? "white" : "gray"}>
        <Container>
          <div className={styles.issuesHeader}>
            <h2>Сва издања</h2>
            <span className={styles.issuesCount}>{items.length} издања</span>
          </div>
          <div className={styles.grid}>
            {items.map((izdanje) => {
              const isActive = selectedIzdanje?.id === izdanje.id;
              return (
                <button
                  key={izdanje.id}
                  className={`${styles.card} ${isActive ? styles.cardActive : ""}`}
                  onClick={() => {
                    setSelectedIzdanje(isActive ? null : izdanje);
                    if (!isActive) {
                      window.scrollTo({ top: 400, behavior: "smooth" });
                    }
                  }}
                >
                  {/* Mini cover */}
                  <div
                    className={styles.cover}
                    style={{ background: `linear-gradient(135deg, ${izdanje.coverColor} 0%, ${izdanje.coverColor}dd 100%)` }}
                  >
                    <div className={styles.coverContent}>
                      <span className={styles.coverJournal}>ЧАСОПИС</span>
                      <span className={styles.coverInstitute}>ДЕДИЊЕ</span>
                      <div className={styles.coverDivider} />
                      <span className={styles.coverVol}>Вол. {izdanje.volume}</span>
                      <span className={styles.coverNum}>Бр. {izdanje.number}</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className={styles.cardBody}>
                    <span className={styles.cardYear}>{izdanje.year}</span>
                    <h3>{izdanje.title}</h3>
                    <div className={styles.cardTopics}>
                      {izdanje.topics.map((topic) => (
                        <span key={topic} className={styles.topic}>{topic}</span>
                      ))}
                    </div>
                    <span className={styles.readBtn}>
                      <i className={isActive ? "fas fa-eye-slash" : "fas fa-book-reader"} aria-hidden />
                      {isActive ? "Затвори" : "Читај"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
