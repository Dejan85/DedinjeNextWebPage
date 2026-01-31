import { Heading, Text } from "@/components/typography";
import styles from "./ValueCard.module.css";

interface ValueCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function ValueCard({
  icon,
  title,
  description,
}: ValueCardProps) {
  return (
    <div className={styles.valueCard}>
      <div className={styles.valueIcon}>
        <i className={icon}></i>
      </div>
      <Heading variant="h3" text={title} />
      <Text text={description} />
    </div>
  );
}
