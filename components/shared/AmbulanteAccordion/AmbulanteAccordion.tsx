"use client";

import { useState } from "react";
import { Text } from "@/components/typography";
import Container from "../Container/Container";
import Button from "../Button/Button";
import styles from "./AmbulanteAccordion.module.css";

export interface AmbulantaSection {
  title: string;
  type: "text" | "list";
  content: string | string[];
}

export interface AmbulantaItem {
  id: string;
  title: string;
  icon?: string;
  sections: AmbulantaSection[];
}

interface AmbulanteAccordionProps {
  items: AmbulantaItem[];
  title?: string;
  subtitle?: string;
  defaultOpenId?: string;
}

export default function AmbulanteAccordion({
  items,
  title = "Амбуланте",
  subtitle,
  defaultOpenId,
}: AmbulanteAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(
    defaultOpenId && items.some((i) => i.id === defaultOpenId) ? defaultOpenId : null
  );

  return (
    <section className={styles.ambulanteSection}>
      <Container>
        <div className={styles.ambulanteHeader}>
          <h2 className={styles.ambulanteTitle}>{title}</h2>
          {subtitle && (
            <p className={styles.ambulanteSubtitle}>{subtitle}</p>
          )}
        </div>

        <div className={styles.ambulanteList}>
          {items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`${styles.ambulanteItem} ${isOpen ? styles.open : ""}`}
              >
                <button
                  type="button"
                  className={styles.ambulanteTrigger}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                >
                  {item.icon && (
                    <span className={styles.ambulanteIcon}>
                      <i className={item.icon} aria-hidden />
                    </span>
                  )}
                  <span className={styles.ambulanteTriggerText}>{item.title}</span>
                  <i
                    className={`fas fa-chevron-down ${styles.chevron}`}
                    aria-hidden
                  ></i>
                </button>
                <div className={styles.ambulanteContent}>
                  <div className={styles.ambulanteContentInner}>
                  {item.sections
                    .filter(
                      (s) =>
                        (Array.isArray(s.content) && s.content.length > 0) ||
                        (typeof s.content === "string" && s.content.trim() !== "")
                    )
                    .map((section, idx) => (
                      <div key={idx} className={styles.ambulanteSectionBlock}>
                        <h4 className={styles.sectionTitle}>{section.title}</h4>
                        {section.type === "text" ? (
                          <div className={styles.sectionText}>
                            {Array.isArray(section.content)
                              ? section.content.map((p, i) => (
                                  <p key={i}>{p}</p>
                                ))
                              : (
                                <p>{section.content}</p>
                              )}
                          </div>
                        ) : (
                          <ul className={styles.sectionList}>
                            {(section.content as string[]).map((li, i) => (
                              <li key={i}>{li}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.ctaWrapper}>
          <Text
            text="За заказивање прегледа контактирајте Call центар"
            variant="lead"
            className={styles.ctaText}
          />
          <Button variant="primary" href="tel:0113601700">
            <i className="fas fa-phone"></i>
            011 3601 700
          </Button>
        </div>
      </Container>
    </section>
  );
}
