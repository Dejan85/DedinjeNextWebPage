import React from "react";

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
    <div className={`stat-card ${className}`}>
      <div className="stat-icon">
        <i className={icon}></i>
      </div>
      <div className="stat-info">
        {label && <span className="stat-label">{label}</span>}
        <h3 className="stat-value">{value}</h3>
        <p className="stat-description">{description}</p>
      </div>
    </div>
  );
};
