import React from "react";
import styles from "./StatCard.module.css";
import { Heading, Text } from "@/components/typography";

interface StatCardProps {
  icon: string;
  label?: string;
  value: string;
  description: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  description,
  className = "",
}) => {
  return (
    <div className={`${styles.statCard} ${className}`}>
      <div className={styles.statIcon}>
        <i className={icon}></i>
      </div>
      <div className={styles.statInfo}>
        {label && (
          <Text
            as="span"
            variant="meta"
            color="muted"
            text={label}
            className={styles.statLabel}
          />
        )}
        <Heading variant="h3" text={value} className={styles.statValue} />
        <Text text={description} className={styles.statDescription} />
      </div>
    </div>
  );
};
