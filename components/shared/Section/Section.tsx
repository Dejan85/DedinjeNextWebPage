import React from "react";
import styles from "./Section.module.css";

interface SectionProps {
  children: React.ReactNode;
  padding?: "small" | "medium" | "large";
  background?: "white" | "gray" | "none";
  className?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  padding = "large",
  background = "gray",
  className = "",
}) => {
  const paddingClass =
    styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}`];
  const backgroundClass =
    styles[
      `background${background.charAt(0).toUpperCase() + background.slice(1)}`
    ];

  return (
    <section
      className={`${styles.section} ${paddingClass} ${backgroundClass} ${className}`}
    >
      {children}
    </section>
  );
};

// Backward compatibility alias
export const ClinicSection = Section;
