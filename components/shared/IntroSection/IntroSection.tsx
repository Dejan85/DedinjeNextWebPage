import Container from "../Container/Container";
import { Section } from "../Section/Section";
import styles from "./IntroSection.module.css";

export interface IntroSectionBadge {
  icon?: string;
  label: string;
}

export interface IntroSectionStat {
  value: string;
  label: string;
}

interface IntroSectionProps {
  icon?: string;
  heading: string;
  paragraphs: string[];
  badges?: IntroSectionBadge[];
  stats?: IntroSectionStat[];
  background?: "white" | "gray";
}

export default function IntroSection({
  icon,
  heading,
  paragraphs,
  badges,
  stats,
  background = "white",
}: IntroSectionProps) {
  return (
    <Section padding="medium" background={background}>
      <Container>
        <div className={styles.intro}>
          {icon && (
            <div className={styles.introIcon}>
              <i className={icon} aria-hidden />
            </div>
          )}
          <div className={styles.introContent}>
            <h2>{heading}</h2>
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>

        {badges && badges.length > 0 && (
          <div className={styles.badgeGrid}>
            {badges.map((badge, idx) => (
              <div key={idx} className={styles.badge}>
                {badge.icon && <i className={badge.icon} aria-hidden />}
                <span>{badge.label}</span>
              </div>
            ))}
          </div>
        )}

        {stats && stats.length > 0 && (
          <div className={styles.stats}>
            {stats.map((stat, idx) => (
              <div key={idx} className={styles.statItem}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
