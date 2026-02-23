"use client";

import LectureList, { type LectureItem } from "../LectureList/LectureList";
import TabbedPanel from "../TabbedPanel/TabbedPanel";
import styles from "./TemePredavaciTabs.module.css";

export type { LectureItem };

export interface YearTabSection {
  title: string;
  items: LectureItem[];
}

export interface YearTab {
  id: string;
  label: string;
  /** Равна листа – користи се када нема секција */
  items?: LectureItem[];
  /** Секције са насловима – користи се уместо items када је дефинисано */
  sections?: YearTabSection[];
}

interface TemePredavaciTabsProps {
  tabs: YearTab[];
  defaultTabId?: string;
}

function TabContent({ tab }: { tab: YearTab }) {
  if (tab.sections?.length) {
    return (
      <div className={styles.sections}>
        {tab.sections.map((section, i) => (
          <div key={i} className={styles.section}>
            <h4 className={styles.sectionTitle}>{section.title}</h4>
            <LectureList items={section.items ?? []} />
          </div>
        ))}
      </div>
    );
  }
  return <LectureList items={tab.items ?? []} />;
}

export default function TemePredavaciTabs({
  tabs,
  defaultTabId,
}: TemePredavaciTabsProps) {
  const panelTabs = tabs.map((tab) => ({
    id: tab.id,
    label: tab.label,
    content: <TabContent tab={tab} />,
  }));

  return (
    <TabbedPanel
      tabs={panelTabs}
      defaultTabId={defaultTabId}
    />
  );
}
