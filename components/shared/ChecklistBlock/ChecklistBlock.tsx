import Container from "../Container/Container";
import { Section } from "../Section/Section";
import styles from "./ChecklistBlock.module.css";

interface ChecklistBlockProps {
  heading?: string;
  intro?: string;
  items: string[];
  background?: "white" | "gray";
}

export default function ChecklistBlock({
  heading,
  intro,
  items,
  background = "gray",
}: ChecklistBlockProps) {
  return (
    <Section padding="medium" background={background}>
      <Container>
        {heading && (
          <div className={styles.sectionHeader}>
            <h2>{heading}</h2>
          </div>
        )}

        {intro && <p className={styles.intro}>{intro}</p>}

        <div className={styles.checklistGrid}>
          {items.map((item, idx) => (
            <div key={idx} className={styles.checklistItem}>
              <span className={styles.checklistBullet}>
                <i className="fas fa-check" aria-hidden />
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
