import { Text } from "@/components/typography";
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
  // Parse text and convert *text* to <em>text</em> for italic journal names
  const parseText = (input: string) => {
    const parts = input.split(/(\*[^*]+\*)/g);

    return parts.map((part, index) => {
      if (part.startsWith("*") && part.endsWith("*")) {
        // Remove asterisks and wrap in <em>
        const content = part.slice(1, -1);
        return <em key={index}>{content}</em>;
      }
      return part;
    });
  };

  return (
    <div className={`${styles.publicationItem} ${className}`}>
      <span className={styles.pubNumber}>{number}.</span>
      <div className={styles.pubContent}>
        <Text variant="body">{parseText(text)}</Text>
      </div>
    </div>
  );
}
