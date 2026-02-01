import React from "react";
import styles from "./ClinicCardGrid.module.css";

interface ClinicCardGridProps {
  children: React.ReactNode;
  className?: string;
}

export const ClinicCardGrid: React.FC<ClinicCardGridProps> = ({
  children,
  className = "",
}) => {
  return <div className={`${styles.grid} ${className}`}>{children}</div>;
};
