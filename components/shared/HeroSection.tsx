import React from "react";

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
    <section className="director-hero">
      <div className="director-hero-bg">
        <img src={img} alt={imgAlt} />
      </div>
      <div className="director-hero-overlay"></div>
      <div className="director-hero-content">
        <div className="container">
          <div className="director-hero-text">
            {badge && <span className="director-badge">{badge}</span>}
            <h1 dangerouslySetInnerHTML={{ __html: title }} />
            {subtitle && <p className="director-subtitle">{subtitle}</p>}
          </div>
        </div>
      </div>
      {showScrollIndicator && (
        <div className="scroll-indicator">
          <i className="fas fa-chevron-down"></i>
        </div>
      )}
    </section>
  );
};
