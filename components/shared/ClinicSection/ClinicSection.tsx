import React from "react";
import styles from "./ClinicSection.module.css";

interface ClinicSectionProps {
  children: React.ReactNode;
  className?: string;
}

export const ClinicSection: React.FC<ClinicSectionProps> = ({
  children,
  className = "",
}) => {
  return (
    <section className={`${styles.section} ${className}`}>{children}</section>
  );
};
