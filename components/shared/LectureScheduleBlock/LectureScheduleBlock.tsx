import Container from "../Container/Container";
import { Section } from "../Section/Section";
import TemePredavaciTabs from "../TemePredavaciTabs/TemePredavaciTabs";
import styles from "./LectureScheduleBlock.module.css";
import type { LectureScheduleTab } from "@/sanity/types";

interface LectureScheduleBlockProps {
  heading?: string;
  subtitle?: string;
  defaultTabId?: string;
  tabs: LectureScheduleTab[];
  background?: "white" | "gray";
}

export default function LectureScheduleBlock({
  heading,
  subtitle,
  defaultTabId,
  tabs,
  background = "gray",
}: LectureScheduleBlockProps) {
  const yearTabs = tabs.map((tab) => ({
    id: tab.tabId,
    label: tab.label,
    items: tab.items,
    sections: tab.sections,
  }));

  return (
    <Section padding="medium" background={background}>
      <Container>
        {(heading || subtitle) && (
          <div className={styles.sectionHeader}>
            {heading && <h2>{heading}</h2>}
            {subtitle && <p>{subtitle}</p>}
          </div>
        )}
        <TemePredavaciTabs tabs={yearTabs} defaultTabId={defaultTabId} />
      </Container>
    </Section>
  );
}
