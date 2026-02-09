import { Heading, Text } from "@/components/typography";
import Button from "../Button/Button";
import styles from "./InfoCard.module.css";

interface InfoCardProps {
  icon: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  highlight?: boolean;
}

export default function InfoCard({
  icon,
  title,
  description,
  buttonText,
  buttonHref,
  highlight = false,
}: InfoCardProps) {
  const headingColor = highlight ? "light" : "dark";
  const textColor = highlight ? "light" : "default";
  const buttonVariant = highlight ? "outline-white" : "primary";

  return (
    <div
      className={`${styles.directorInfoCard} ${highlight ? styles.highlight : ""}`}
    >
      <div className={styles.infoCardIcon}>
        <i className={icon}></i>
      </div>
      <Heading variant="h3" text={title} color={headingColor} align="center" />
      <Text text={description} color={textColor} align="center" />
      <Button
        href={buttonHref}
        variant={buttonVariant}
        className={styles.cardButton}
      >
        {buttonText} <i className="fas fa-arrow-right"></i>
      </Button>
    </div>
  );
}
