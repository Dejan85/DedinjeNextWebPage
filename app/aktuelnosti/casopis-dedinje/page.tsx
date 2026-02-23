"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Container, PageHeader, Section } from "@/components/shared";
import styles from "./page.module.css";

const PdfViewer = dynamic(
  () => import("@/components/shared/PdfViewer/PdfViewer"),
  { ssr: false }
);

interface Izdanje {
  id: string;
  volume: string;
  number: string;
  year: string;
  title: string;
  topics: string[];
  pdfUrl: string;
  coverColor: string;
}

const IZDANJA: Izdanje[] = [
  {
    id: "vol12-1",
    volume: "12",
    number: "1",
    year: "2025",
    title: "Кардиоваскуларна хирургија и интервентна кардиологија",
    topics: ["Минимално инвазивна кардиохирургија", "ТАВИ процедуре", "Хибридне операције"],
    pdfUrl: "/pdf/АКАДЕМИК-CV-АВГУСТ-2025.pdf",
    coverColor: "#1a365d",
  },
  {
    id: "vol11-2",
    volume: "11",
    number: "2",
    year: "2024",
    title: "Ехокардиографија и имиџинг",
    topics: ["3D ехокардиографија", "Стрес ехо протоколи", "Кардио МР"],
    pdfUrl: "/pdf/РАДОВИ-ДИРЕКТОРА-avgust-2025.pdf",
    coverColor: "#1a5632",
  },
  {
    id: "vol11-1",
    volume: "11",
    number: "1",
    year: "2024",
    title: "Васкуларна хирургија и ангиологија",
    topics: ["Каротидна хирургија", "Ендоваскуларне процедуре", "Васкуларни ултразвук"],
    pdfUrl: "/pdf/АКАДЕМИК-CV-АВГУСТ-2025.pdf",
    coverColor: "#56340a",
  },
  {
    id: "vol10-2",
    volume: "10",
    number: "2",
    year: "2023",
    title: "Аритмологија и електрофизиологија",
    topics: ["Катетерска аблација", "Имплантација пејсмејкера", "Атријална фибрилација"],
    pdfUrl: "/pdf/РАДОВИ-ДИРЕКТОРА-avgust-2025.pdf",
    coverColor: "#4a1942",
  },
  {
    id: "vol10-1",
    volume: "10",
    number: "1",
    year: "2023",
    title: "Кардиолошка рехабилитација",
    topics: ["Постоперативна рехабилитација", "Физикална терапија", "Психолошка подршка"],
    pdfUrl: "/pdf/АКАДЕМИК-CV-АВГУСТ-2025.pdf",
    coverColor: "#1a365d",
  },
  {
    id: "vol9-2",
    volume: "9",
    number: "2",
    year: "2022",
    title: "Превенција кардиоваскуларних болести",
    topics: ["Хипертензија", "Дислипидемија", "Програми превенције"],
    pdfUrl: "/pdf/РАДОВИ-ДИРЕКТОРА-avgust-2025.pdf",
    coverColor: "#1a5632",
  },
];

export default function CasopisDedinjePage() {
  const [selectedIzdanje, setSelectedIzdanje] = useState<Izdanje | null>(null);

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
                Часопис Дедиње је стручна публикација Института за кардиоваскуларне болести Дедиње
                која објављује научне и клиничке радове из области кардиоваскуларне медицине,
                хирургије и дијагностике. Часопис излази два пута годишње и садржи оригиналне
                радове, прегледне чланке и приказе случајева.
              </p>
              <div className={styles.aboutStats}>
                <div className={styles.aboutStat}>
                  <span className={styles.aboutStatNum}>{IZDANJA.length}</span>
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
            <span className={styles.issuesCount}>{IZDANJA.length} издања</span>
          </div>
          <div className={styles.grid}>
            {IZDANJA.map((izdanje) => {
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
