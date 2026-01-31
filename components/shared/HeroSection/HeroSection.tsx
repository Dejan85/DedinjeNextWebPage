import React from "react";
import styles from "./HeroSection.module.css";

interface HeroSectionProps {
  img: string;
  imgAlt: string;
  badge?: string;
  title: string;
  subtitle?: string;
  showScrollIndicator?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  img,
  imgAlt,
  badge,
  title,
  subtitle,
  showScrollIndicator = true,
}) => {
  return (
    <section className={styles.directorHero}>
      <div className={styles.directorHeroBg}>
        <img src={img} alt={imgAlt} />
      </div>
      <div className={styles.directorHeroOverlay}></div>
      <div className={styles.directorHeroContent}>
        <div className="container">
          <div className={styles.directorHeroText}>
            {badge && <span className={styles.directorBadge}>{badge}</span>}
            <h1 dangerouslySetInnerHTML={{ __html: title }} />
            {subtitle && <p className={styles.directorSubtitle}>{subtitle}</p>}
          </div>
        </div>
      </div>
      {showScrollIndicator && (
        <div className={styles.scrollIndicator}>
          <i className="fas fa-chevron-down"></i>
        </div>
      )}
    </section>
  );
};
