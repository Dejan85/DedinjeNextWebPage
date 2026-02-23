"use client";

import { useState, type ReactNode } from "react";
import styles from "./TabbedPanel.module.css";

export interface TabbedPanelTab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabbedPanelProps {
  tabs: TabbedPanelTab[];
  defaultTabId?: string;
  className?: string;
  /** Максимална висина садржаја (px). Подразумевано 500. */
  maxContentHeight?: number;
}

export default function TabbedPanel({
  tabs,
  defaultTabId,
  className = "",
  maxContentHeight = 500,
}: TabbedPanelProps) {
  const [activeTab, setActiveTab] = useState(
    defaultTabId || tabs[0]?.id || ""
  );

  const activeTabData = tabs.find((t) => t.id === activeTab);

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.tabBar}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        className={styles.content}
        style={{ maxHeight: maxContentHeight }}
      >
        {activeTabData?.content}
      </div>
    </div>
  );
}
