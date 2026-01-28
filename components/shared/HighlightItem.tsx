import { Heading, Text } from "@/components/typography";

interface HighlightItemProps {
  icon: string;
  title: string;
  description: string;
}

export default function HighlightItem({
  icon,
  title,
  description,
}: HighlightItemProps) {
  return (
    <div className="highlight-item">
      <div className="highlight-icon">
        <i className={icon}></i>
      </div>
      <div className="highlight-text">
        <Heading variant="h4" text={title} />
        <Text text={description} />
      </div>
    </div>
  );
}
