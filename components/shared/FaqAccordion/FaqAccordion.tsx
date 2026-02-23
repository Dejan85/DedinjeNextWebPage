"use client";

import { useState, useMemo } from "react";
import { Heading, Text } from "@/components/typography";
import Container from "../Container/Container";
import Button from "../Button/Button";
import styles from "./FaqAccordion.module.css";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  title?: string;
  subtitle?: string;
}

export default function FaqAccordion({
  items,
  title = "Честа питања",
  subtitle = "Најчешће постављана питања од стране пацијената",
}: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const categories = useMemo(() => {
    const cats = [...new Set(items.map((i) => i.category))];
    return cats;
  }, [items]);

  const filteredItems = useMemo(() => {
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [items, search]);

  const groupedByCategory = useMemo(() => {
    const groups: Record<string, FaqItem[]> = {};
    categories.forEach((cat) => {
      groups[cat] = filteredItems.filter((item) => item.category === cat);
    });
    return Object.entries(groups).filter(([, items]) => items.length > 0);
  }, [categories, filteredItems]);

  return (
    <section className={styles.faqSection}>
      <Container>
        <div className={styles.faqHeader}>
          <Heading variant="h2" text={title} align="center" />
          {subtitle && (
            <Text
              text={subtitle}
              variant="body"
              align="center"
              className={styles.subtitle}
            />
          )}
        </div>

        <div className={styles.searchWrapper}>
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Претражите питања..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.faqList}>
          {groupedByCategory.length === 0 ? (
            <div className={styles.noResults}>
              <i className="fas fa-info-circle"></i>
              <Text text="Нема резултата за вашу претрагу." variant="body" />
            </div>
          ) : (
            groupedByCategory.map(([category, categoryItems]) => (
              <div key={category} className={styles.categoryGroup}>
                <h3 className={styles.categoryTitle}>{category}</h3>
                {categoryItems.map((item) => {
                  const isOpen = openId === item.id;
                  return (
                    <div
                      key={item.id}
                      className={`${styles.faqItem} ${isOpen ? styles.open : ""}`}
                    >
                      <button
                        type="button"
                        className={styles.faqQuestion}
                        onClick={() => setOpenId(isOpen ? null : item.id)}
                        aria-expanded={isOpen}
                      >
                        <span>{item.question}</span>
                        <i
                          className={`fas fa-chevron-down ${styles.chevron}`}
                        ></i>
                      </button>
                      <div className={styles.faqAnswer}>
                        <div className={styles.faqAnswerInner}>
                          <Text text={item.answer} variant="body" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className={styles.ctaWrapper}>
          <Text
            text="Немате одговор на ваше питање?"
            variant="lead"
            className={styles.ctaText}
          />
          <Button variant="primary" href="/kontakt">
            <i className="fas fa-envelope"></i>
            Контактирајте нас
          </Button>
        </div>
      </Container>
    </section>
  );
}
