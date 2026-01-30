import React from "react";
import Link from "next/link";

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
    <Link href={href} className={`clinic-card ${featured ? "featured" : ""}`}>
      <div className="clinic-card-icon">
        <i className={icon}></i>
      </div>
      <div className="clinic-card-content">
        <h3 className="clinic-card-title">{title}</h3>
        {subtitle && <p className="clinic-card-subtitle">{subtitle}</p>}
      </div>
      <div className="clinic-card-arrow">
        <i className="fas fa-arrow-right"></i>
      </div>
    </Link>
  );
};
