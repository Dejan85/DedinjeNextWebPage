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
  return (
    <div
      className={`${styles.directorInfoCard} ${highlight ? styles.highlight : ""}`}
    >
      <div className={styles.infoCardIcon}>
        <i className={icon}></i>
      </div>
      <Heading variant="h3" text={title} />
      <Text text={description} />
      <Button href={buttonHref} variant="primary">
        {buttonText} <i className="fas fa-arrow-right"></i>
      </Button>
    </div>
  );
}
