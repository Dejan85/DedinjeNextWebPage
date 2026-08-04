import AmbulanteAccordion, {
  type AmbulantaItem,
} from "../AmbulanteAccordion/AmbulanteAccordion";
import FaqAccordion, { type FaqItem } from "../FaqAccordion/FaqAccordion";
import IntroSection from "../IntroSection/IntroSection";
import BannerBlock from "../BannerBlock/BannerBlock";
import CardGrid from "../CardGrid/CardGrid";
import ChecklistBlock from "../ChecklistBlock/ChecklistBlock";
import ContactDirectory from "../ContactDirectory/ContactDirectory";
import ProcedureTabs from "../ProcedureTabs/ProcedureTabs";
import TimelineBlock from "../TimelineBlock/TimelineBlock";
import LectureScheduleBlock from "../LectureScheduleBlock/LectureScheduleBlock";
import DocumentListBlock from "../DocumentListBlock/DocumentListBlock";
import BoardListBlock from "../BoardListBlock/BoardListBlock";
import type {
  AccordionBlockData,
  BannerBlockData,
  CardGridBlockData,
  ChecklistBlockData,
  ContactDirectoryBlockData,
  DocumentListBlockData,
  BoardListBlockData,
  FaqBlockData,
  IntroSectionBlock,
  LectureScheduleBlockData,
  TabsBlockData,
  TimelineBlockData,
} from "@/sanity/types";

type PageBuilderBlockInput =
  | IntroSectionBlock
  | BannerBlockData
  | CardGridBlockData
  | ChecklistBlockData
  | ContactDirectoryBlockData
  | AccordionBlockData
  | FaqBlockData
  | TabsBlockData
  | TimelineBlockData
  | LectureScheduleBlockData
  | DocumentListBlockData
  | BoardListBlockData;

interface PageBuilderProps {
  blocks: PageBuilderBlockInput[];
}

function toAmbulantaItems(block: AccordionBlockData): AmbulantaItem[] {
  return block.items.map((item) => ({
    id: item.itemId,
    title: item.title || "",
    icon: item.icon,
    sections: item.sections.map((section) => ({
      title: section.title || "",
      type: section.kind,
      content: section.kind === "list" ? section.list || [] : section.text || [],
    })),
  }));
}

function toFaqItems(block: FaqBlockData): FaqItem[] {
  return block.items.map((item, idx) => ({
    id: `faq-${idx}`,
    question: item.question,
    answer: item.answer,
    category: item.category,
  }));
}

export default function PageBuilder({ blocks }: PageBuilderProps) {
  let sectionIndex = 0;

  return (
    <>
      {blocks.map((block, idx) => {
        switch (block._type) {
          case "introSection": {
            const background = sectionIndex++ % 2 === 0 ? "white" : "gray";
            return (
              <IntroSection
                key={idx}
                icon={block.icon}
                heading={block.heading}
                paragraphs={block.paragraphs}
                badges={block.badges}
                stats={block.stats}
                background={background}
              />
            );
          }
          case "bannerBlock": {
            const background = sectionIndex++ % 2 === 0 ? "white" : "gray";
            return (
              <BannerBlock
                key={idx}
                variant={block.variant}
                icon={block.icon}
                title={block.title}
                text={block.text}
                background={background}
              />
            );
          }
          case "cardGridBlock": {
            const background = sectionIndex++ % 2 === 0 ? "white" : "gray";
            return (
              <CardGrid
                key={idx}
                heading={block.heading}
                subtitle={block.subtitle}
                intro={block.intro}
                numbered={block.numbered}
                cards={block.cards}
                background={background}
              />
            );
          }
          case "checklistBlock": {
            const background = sectionIndex++ % 2 === 0 ? "white" : "gray";
            return (
              <ChecklistBlock
                key={idx}
                heading={block.heading}
                intro={block.intro}
                items={block.items}
                background={background}
              />
            );
          }
          case "contactDirectoryBlock": {
            const background = sectionIndex++ % 2 === 0 ? "white" : "gray";
            return (
              <ContactDirectory
                key={idx}
                heading={block.heading}
                subtitle={block.subtitle}
                categories={block.categories}
                background={background}
              />
            );
          }
          case "accordionBlock": {
            sectionIndex++;
            return (
              <AmbulanteAccordion
                key={idx}
                items={toAmbulantaItems(block)}
                title={block.title}
                subtitle={block.subtitle}
                defaultOpenId={block.defaultOpenId}
              />
            );
          }
          case "faqBlock": {
            sectionIndex++;
            return (
              <FaqAccordion
                key={idx}
                items={toFaqItems(block)}
                title={block.title}
                subtitle={block.subtitle}
              />
            );
          }
          case "tabsBlock": {
            const background = sectionIndex++ % 2 === 0 ? "white" : "gray";
            return (
              <ProcedureTabs
                key={idx}
                tabs={block.tabs}
                defaultTabId={block.defaultTabId}
                background={background}
              />
            );
          }
          case "timelineBlock": {
            const background = sectionIndex++ % 2 === 0 ? "white" : "gray";
            return (
              <TimelineBlock
                key={idx}
                heading={block.heading}
                intro={block.intro}
                items={block.items}
                background={background}
              />
            );
          }
          case "lectureScheduleBlock": {
            const background = sectionIndex++ % 2 === 0 ? "white" : "gray";
            return (
              <LectureScheduleBlock
                key={idx}
                heading={block.heading}
                subtitle={block.subtitle}
                defaultTabId={block.defaultTabId}
                tabs={block.tabs}
                background={background}
              />
            );
          }
          case "documentListBlock": {
            const background = sectionIndex++ % 2 === 0 ? "white" : "gray";
            return (
              <DocumentListBlock
                key={idx}
                heading={block.heading}
                subtitle={block.subtitle}
                items={block.items}
                background={background}
              />
            );
          }
          case "boardListBlock": {
            const background = sectionIndex++ % 2 === 0 ? "white" : "gray";
            return (
              <BoardListBlock
                key={idx}
                heading={block.heading}
                subtitle={block.subtitle}
                boards={block.boards}
                background={background}
              />
            );
          }
          default:
            return null;
        }
      })}
    </>
  );
}
