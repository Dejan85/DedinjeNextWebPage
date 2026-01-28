"use client";

import { useState, ReactNode } from "react";
import { TabButtonGroup } from "./TabButtonGroup";

interface Tab {
  id: string;
  icon: string;
  text: string;
  content: ReactNode;
}

interface ContentTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

export const ContentTabs: React.FC<ContentTabsProps> = ({
  tabs,
  defaultTab,
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || "");

  const tabButtons = tabs.map((tab) => ({
    id: tab.id,
    icon: tab.icon,
    text: tab.text,
  }));

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className={className}>
      <TabButtonGroup
        tabs={tabButtons}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="tab-content">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={tab.id}
            className={`bio-tab-content ${activeTab === tab.id ? "active" : ""}`}
          >
            {activeTab === tab.id && tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};
