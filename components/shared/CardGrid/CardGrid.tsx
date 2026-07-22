import Link from "next/link";
import Container from "../Container/Container";
import { Section } from "../Section/Section";
import styles from "./CardGrid.module.css";

export interface CardGridItem {
  icon?: string;
  title?: string;
  value?: string;
  description?: string;
  href?: string;
  date?: string;
  category?: string;
}

interface CardGridProps {
  heading?: string;
  subtitle?: string;
  intro?: string;
  numbered?: boolean;
  cards: CardGridItem[];
  background?: "white" | "gray";
}

export default function CardGrid({
  heading,
  subtitle,
  intro,
  numbered,
  cards,
  background = "gray",
}: CardGridProps) {
  return (
    <Section padding="medium" background={background}>
      <Container>
        {heading && (
          <div className={styles.sectionHeader}>
            <div>
              <h2>{heading}</h2>
              {subtitle && <p>{subtitle}</p>}
            </div>
          </div>
        )}

        {intro && <p className={styles.intro}>{intro}</p>}

        <div className={styles.grid}>
          {cards.map((card, idx) => {
            const content = (
              <>
                {numbered && <div className={styles.stepNumber}>{idx + 1}</div>}
                {card.icon && (
                  <div className={styles.cardIcon}>
                    <i className={card.icon} aria-hidden />
                  </div>
                )}
                {(card.category || card.date) && (
                  <div className={styles.cardMeta}>
                    {card.category && (
                      <span className={styles.cardCategory}>{card.category}</span>
                    )}
                    {card.date && (
                      <span className={styles.cardDate}>
                        <i className="fas fa-calendar-alt" aria-hidden /> {card.date}
                      </span>
                    )}
                  </div>
                )}
                {card.value && (
                  <div className={styles.cardValue}>{card.value}</div>
                )}
                {card.title && <h4>{card.title}</h4>}
                {card.description && <p>{card.description}</p>}
              </>
            );
            return card.href ? (
              <Link key={idx} href={card.href} className={styles.card}>
                {content}
              </Link>
            ) : (
              <div key={idx} className={styles.card}>
                {content}
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
