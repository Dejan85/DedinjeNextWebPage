"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import Container from "../Container/Container";
import { Section } from "../Section/Section";
import styles from "./DocumentListBlock.module.css";

const PdfViewer = dynamic(() => import("../PdfViewer/PdfViewer"), {
  ssr: false,
});

export interface DocumentListItem {
  icon?: string;
  label: string;
  href: string;
  year?: string;
}

interface DocumentListBlockProps {
  heading?: string;
  subtitle?: string;
  items: DocumentListItem[];
  background?: "white" | "gray";
}

export default function DocumentListBlock({
  heading,
  subtitle,
  items,
  background = "white",
}: DocumentListBlockProps) {
  const t = useTranslations("DocumentList");
  const [selected, setSelected] = useState<{ href: string; label: string } | null>(null);

  return (
    <Section padding="medium" background={background}>
      <Container>
        {heading && (
          <div className={styles.sectionHeader}>
            <h2>{heading}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
        )}

        <div className={styles.docsList}>
          {items.map((item) => (
            <div key={item.href} className={styles.docCard}>
              {item.icon && (
                <div className={styles.docIcon}>
                  <i className={item.icon} aria-hidden />
                </div>
              )}
              <div className={styles.docBody}>
                {item.year && <span className={styles.docYear}>{item.year}</span>}
                <h3>{item.label}</h3>
              </div>
              <div className={styles.docActions}>
                <button
                  className={styles.docReadBtn}
                  onClick={() => {
                    setSelected(
                      selected?.href === item.href ? null : { href: item.href, label: item.label }
                    );
                    if (selected?.href !== item.href) {
                      setTimeout(() => {
                        document.getElementById("pdf-viewer")?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }
                  }}
                >
                  <i className={selected?.href === item.href ? "fas fa-times" : "fas fa-book-reader"} aria-hidden />
                  {selected?.href === item.href ? t("close") : t("read")}
                </button>
                <a href={item.href} download className={styles.docDownloadBtn}>
                  <i className="fas fa-download" aria-hidden />
                </a>
              </div>
            </div>
          ))}
        </div>

        {selected && (
          <div id="pdf-viewer" className={styles.viewer}>
            <div className={styles.viewerHeader}>
              <div>
                <h2 className={styles.viewerTitle}>{selected.label}</h2>
                <p className={styles.viewerSubtitle}>{t("previewSubtitle")}</p>
              </div>
              <button className={styles.closeViewerBtn} onClick={() => setSelected(null)}>
                <i className="fas fa-times" aria-hidden /> {t("close")}
              </button>
            </div>
            <PdfViewer url={selected.href} title={selected.label} />
          </div>
        )}
      </Container>
    </Section>
  );
}
