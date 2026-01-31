import React from "react";
import Link from "next/link";
import styles from "./ClinicCard.module.css";

interface ClinicCardProps {
  icon: string;
  title: string;
  subtitle?: string;
  href: string;
  featured?: boolean;
}

export const ClinicCard: React.FC<ClinicCardProps> = ({
  icon,
  title,
  subtitle,
  href,
  featured = false,
}) => {
  return (
    <Link
      href={href}
      className={`${styles.clinicCard} ${featured ? styles.featured : ""}`}
    >
      <div className={styles.clinicCardIcon}>
        <i className={icon}></i>
      </div>
      <div className={styles.clinicCardContent}>
        <h3 className={styles.clinicCardTitle}>{title}</h3>
        {subtitle && <p className={styles.clinicCardSubtitle}>{subtitle}</p>}
      </div>
      <div className={styles.clinicCardArrow}>
        <i className="fas fa-arrow-right"></i>
      </div>
    </Link>
  );
};
