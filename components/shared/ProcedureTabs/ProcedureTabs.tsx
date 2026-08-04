import Container from "../Container/Container";
import { Section } from "../Section/Section";
import { SidebarTabs, type SidebarTab } from "../SidebarTabs/SidebarTabs";
import styles from "./ProcedureTabs.module.css";

export interface ProcedureInfoBlock {
  icon?: string;
  question?: string;
  answerParagraphs?: string[];
}

export interface ProcedureFocusCard {
  title: string;
  text?: string;
  items?: string[];
}

export interface ProcedureTab {
  tabId: string;
  label: string;
  image?: string;
  imageAlt?: string;
  introHeading?: string;
  introParagraphs?: string[];
  infoBlocks?: ProcedureInfoBlock[];
  introList?: string[];
  focusCards?: ProcedureFocusCard[];
  outroParagraphs?: string[];
}

interface ProcedureTabsProps {
  tabs: ProcedureTab[];
  defaultTabId?: string;
  background?: "white" | "gray";
}

function InfoBlock({
  icon,
  question,
  answerParagraphs,
}: ProcedureInfoBlock) {
  return (
    <div className={styles.infoBlock}>
      <div className={styles.infoBlockHeader}>
        {icon && (
          <span className={styles.infoBlockIcon}>
            <i className={icon} aria-hidden />
          </span>
        )}
        <h3>{question}</h3>
      </div>
      <div className={styles.infoBlockBody}>
        {answerParagraphs?.map((p, idx) => <p key={idx}>{p}</p>)}
      </div>
    </div>
  );
}

export default function ProcedureTabs({
  tabs,
  defaultTabId,
  background = "white",
}: ProcedureTabsProps) {
  const sidebarTabs: SidebarTab[] = tabs.map((tab) => ({
    id: tab.tabId,
    label: tab.label,
    image: tab.image,
    imageAlt: tab.imageAlt,
    content: (
      <div className={styles.tabContent}>
        {tab.introHeading && (
          <div className={styles.tabIntro}>
            <h2>{tab.introHeading}</h2>
            {tab.introParagraphs?.map((p, idx) => <p key={idx}>{p}</p>)}
          </div>
        )}

        {tab.infoBlocks && tab.infoBlocks.length > 0 && (
          <div className={styles.blocksGrid}>
            {tab.infoBlocks.map((block, idx) => (
              <InfoBlock key={idx} {...block} />
            ))}
          </div>
        )}

        {tab.introList && tab.introList.length > 0 && (
          <ul className={styles.introList}>
            {tab.introList.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}

        {tab.focusCards && tab.focusCards.length > 0 && (
          <div className={styles.focusGrid}>
            {tab.focusCards.map((card, idx) => (
              <div key={idx} className={styles.focusCard}>
                <h4>{card.title}</h4>
                {card.text && <p>{card.text}</p>}
                {card.items && card.items.length > 0 && (
                  <ul>
                    {card.items.map((item, itemIdx) => (
                      <li key={itemIdx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {tab.outroParagraphs?.map((p, idx) => <p key={idx}>{p}</p>)}
      </div>
    ),
  }));

  return (
    <Section padding="medium" background={background}>
      <Container>
        <SidebarTabs tabs={sidebarTabs} defaultTab={defaultTabId} />
      </Container>
    </Section>
  );
}
