import { Heading, Text } from "@/components/typography";
import styles from "./HighlightItem.module.css";

interface HighlightItemProps {
  icon: string;
  title: string;
  description: string;
}

export default function HighlightItem({
  icon,
  title,
  description,
}: HighlightItemProps) {
  return (
    <div className={styles.highlightItem}>
      <div className={styles.highlightIcon}>
        <i className={icon}></i>
      </div>
      <div className={styles.highlightText}>
        <Heading variant="h4" text={title} />
        <Text text={description} />
      </div>
    </div>
  );
}
