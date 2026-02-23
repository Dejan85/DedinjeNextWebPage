import { Text } from "@/components/typography";
import styles from "./StatItem.module.css";

interface StatItemProps {
  value: string | number;
  label: string;
  className?: string;
}

export default function StatItem({
  value,
  label,
  className = "",
}: StatItemProps) {
  return (
    <div className={`${styles.statItem} ${className}`}>
      <div className={styles.statValue}>{value}</div>
      <Text text={label} variant="small" color="light" className={styles.statLabel} />
    </div>
  );
}
