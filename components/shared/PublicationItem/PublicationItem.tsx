import Text from "@/components/typography/Text";
import styles from "./PublicationItem.module.css";

interface PublicationItemProps {
  number: number | string;
  text: string;
  className?: string;
}

export default function PublicationItem({
  number,
  text,
  className = "",
}: PublicationItemProps) {
  // Convert *text* to <em>text</em> for italic journal names
  const parsedHtml = text.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  return (
    <div className={`${styles.publicationItem} ${className}`}>
      <span className={styles.pubNumber}>{number}.</span>
      <div className={styles.pubContent}>
        <Text as="p" text={parsedHtml} />
      </div>
    </div>
  );
}
