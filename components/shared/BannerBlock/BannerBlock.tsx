import Container from "../Container/Container";
import { Section } from "../Section/Section";
import styles from "./BannerBlock.module.css";

export type BannerVariant = "info" | "alert" | "warning" | "motto" | "highlight";

interface BannerBlockProps {
  variant?: BannerVariant;
  icon?: string;
  title?: string;
  text: string;
  background?: "white" | "gray";
}

export default function BannerBlock({
  variant = "info",
  icon,
  title,
  text,
  background = "white",
}: BannerBlockProps) {
  if (variant === "motto") {
    return (
      <Section padding="medium" background={background}>
        <Container>
          <div className={styles.mottoBanner}>
            {icon && <i className={icon} aria-hidden />}
            <span>{text}</span>
          </div>
        </Container>
      </Section>
    );
  }

  if (variant === "highlight") {
    return (
      <Section padding="medium" background={background}>
        <Container>
          <div className={styles.highlightBanner}>
            {icon && <i className={icon} aria-hidden />}
            <span>
              {title && <strong>{title} </strong>}
              {text}
            </span>
          </div>
        </Container>
      </Section>
    );
  }

  if (variant === "warning") {
    return (
      <Section padding="medium" background={background}>
        <Container>
          <div className={styles.warningBanner}>
            {icon && <i className={icon} aria-hidden />}
            <span>{text}</span>
          </div>
        </Container>
      </Section>
    );
  }

  const boxClass = variant === "alert" ? styles.alertBox : styles.infoBox;

  return (
    <Section padding="medium" background={background}>
      <Container>
        <div className={boxClass}>
          <div className={styles.boxIcon}>
            {icon && <i className={icon} aria-hidden />}
          </div>
          <div className={styles.boxContent}>
            {title && <strong>{title}</strong>}
            <p>{text}</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
