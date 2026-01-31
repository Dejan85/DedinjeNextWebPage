import React from "react";
import styles from "./StatCard.module.css";

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
        {label && <span className={styles.statLabel}>{label}</span>}
        <h3 className={styles.statValue}>{value}</h3>
        <p className={styles.statDescription}>{description}</p>
      </div>
    </div>
  );
};
