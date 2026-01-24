import React from "react";

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
      className={`tab-btn ${isActive ? "active" : ""} ${className}`}
      onClick={onClick}
    >
      <i className={icon}></i>
      <span>{text}</span>
    </button>
  );
};
