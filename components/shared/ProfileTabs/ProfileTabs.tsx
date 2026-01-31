"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { TabButtonGroup } from "../TabButtonGroup/TabButtonGroup";
import styles from "./ProfileTabs.module.css";

interface Profile {
  id: string;
  icon: string;
  tabText: string;
  image: string;
  imageAlt: string;
  name: string;
  title: string;
  bioTitle?: string;
  bioParagraphs: string[];
}

interface ProfileTabsProps {
  profiles: Profile[];
  defaultTab?: string;
  className?: string;
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({
  profiles,
  defaultTab,
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState(
    defaultTab || profiles[0]?.id || "",
  );

  const tabs = profiles.map((profile) => ({
    id: profile.id,
    icon: profile.icon,
    text: profile.tabText,
  }));

  const activeProfile = profiles.find((profile) => profile.id === activeTab);

  return (
    <div className={`${styles.managementTabs} ${className}`}>
      <TabButtonGroup
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className={styles.tabContent}>
        <AnimatePresence mode="wait">
          {activeProfile && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={styles.managementCard}
            >
              <div className={styles.managementImage}>
                <Image
                  src={activeProfile.image}
                  alt={activeProfile.imageAlt}
                  width={500}
                  height={600}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
              <div className={styles.managementInfo}>
                <h3>{activeProfile.name}</h3>
                <p className={styles.managementTitle}>{activeProfile.title}</p>
                <div className={styles.managementBio}>
                  {activeProfile.bioTitle && <h4>{activeProfile.bioTitle}</h4>}
                  {activeProfile.bioParagraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      dangerouslySetInnerHTML={{ __html: paragraph }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
