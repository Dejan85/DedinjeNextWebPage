import Container from "../Container/Container";
import { Section } from "../Section/Section";
import styles from "./TimelineBlock.module.css";

export interface TimelineBlockItem {
  year: string;
  title: string;
  subtitle?: string;
  description?: string;
}

interface TimelineBlockProps {
  heading?: string;
  intro?: string;
  items: TimelineBlockItem[];
  background?: "white" | "gray";
}

export default function TimelineBlock({
  heading,
  intro,
  items,
  background = "gray",
}: TimelineBlockProps) {
  return (
    <Section padding="medium" background={background}>
      <Container>
        {heading && (
          <div className={styles.sectionHeader}>
            <h2>{heading}</h2>
          </div>
        )}

        {intro && <p className={styles.intro}>{intro}</p>}

        <ul className={styles.timeline}>
          {items.map((item, idx) => (
            <li key={idx}>
              <span className={styles.timelineYear}>{item.year}</span>
              <div className={styles.timelineBody}>
                <span className={styles.timelineText}>{item.title}</span>
                {item.subtitle && <span className={styles.timelineSubtitle}>{item.subtitle}</span>}
                {item.description && <p className={styles.timelineDescription}>{item.description}</p>}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
