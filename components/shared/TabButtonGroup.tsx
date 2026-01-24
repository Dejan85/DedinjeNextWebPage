import React from "react";
import { TabButton } from "./TabButton";

interface Tab {
  id: string;
  icon: string;
  text: string;
}

interface TabButtonGroupProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export const TabButtonGroup: React.FC<TabButtonGroupProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = "",
}) => {
  return (
    <div className={`tab-button-group ${className}`}>
      {tabs.map((tab) => (
        <TabButton
          key={tab.id}
          icon={tab.icon}
          text={tab.text}
          isActive={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
        />
      ))}
    </div>
  );
};
