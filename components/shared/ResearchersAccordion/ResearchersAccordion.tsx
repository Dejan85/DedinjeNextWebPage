"use client";

import { useState } from "react";
import Container from "../Container/Container";
import styles from "./ResearchersAccordion.module.css";

export interface ResearcherCategory {
  id: string;
  title: string;
  icon?: string;
  researchers: string[];
}

interface ResearchersAccordionProps {
  items: ResearcherCategory[];
  title?: string;
  defaultOpenId?: string;
}

export default function ResearchersAccordion({
  items,
  title,
  defaultOpenId,
}: ResearchersAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(
    defaultOpenId && items.some((i) => i.id === defaultOpenId) ? defaultOpenId : null
  );

  return (
    <section className={styles.section}>
      <Container>
        {title && <h2 className={styles.title}>{title}</h2>}

        <div className={styles.list}>
          {items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`${styles.item} ${isOpen ? styles.open : ""}`}
              >
                <button
                  type="button"
                  className={styles.trigger}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                >
                  {item.icon && (
                    <span className={styles.icon}>
                      <i className={item.icon} aria-hidden />
                    </span>
                  )}
                  <span className={styles.triggerText}>{item.title}</span>
                  <i
                    className={`fas fa-chevron-down ${styles.chevron}`}
                    aria-hidden
                  ></i>
                </button>
                <div className={styles.content}>
                  {item.researchers.length > 0 ? (
                    <ul className={styles.researchersList}>
                      {item.researchers.map((name, i) => (
                        <li key={i}>{name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className={styles.empty}>Садржај биће допуњен.</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
