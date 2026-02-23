"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "@/components/shared/Image/Image";
import styles from "./SidebarTabs.module.css";

export interface SidebarTab {
  id: string;
  label: string;
  image?: string;
  imageAlt?: string;
  content: ReactNode;
}

interface SidebarTabsProps {
  tabs: SidebarTab[];
  defaultTab?: string;
  className?: string;
}

const ANIM_DURATION = 0.6;

export const SidebarTabs: React.FC<SidebarTabsProps> = ({
  tabs,
  defaultTab,
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || "");
  const activeTabData = tabs.find((tab) => tab.id === activeTab);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <nav className={styles.sidebar} aria-label="Навигација по секцијама">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ""}`}
            onClick={() => setActiveTab(tab.id)}
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <div ref={contentRef} className={styles.content} role="tabpanel">
        <AnimatePresence mode="wait" initial={false}>
          {activeTabData && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: ANIM_DURATION, ease: "easeInOut" }}
              className={styles.contentInner}
            >
              {activeTabData.image && (
                <div className={styles.imageWrapper}>
                  <Image
                    src={activeTabData.image}
                    alt={activeTabData.imageAlt || activeTabData.label}
                    fill
                    className={styles.tabImage}
                    objectFit="cover"
                  />
                </div>
              )}
              {activeTabData.content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
