import { Heading, Text } from "@/components/typography";

interface ValueCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function ValueCard({
  icon,
  title,
  description,
}: ValueCardProps) {
  return (
    <div className="value-card">
      <div className="value-icon">
        <i className={icon}></i>
      </div>
      <Heading variant="h3" text={title} />
      <Text text={description} />
    </div>
  );
}
