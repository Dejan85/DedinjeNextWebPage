import React from "react";
import styles from "./TabButton.module.css";

interface TabButtonProps {
  icon: string;
  text: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

export const TabButton: React.FC<TabButtonProps> = ({
  icon,
  text,
  isActive,
  onClick,
  className = "",
}) => {
  return (
    <button
      className={`${styles.tabBtn} ${isActive ? styles.active : ""} ${className}`}
      onClick={onClick}
    >
      <i className={icon}></i>
      <span>{text}</span>
    </button>
  );
};
