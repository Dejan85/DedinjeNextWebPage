import { Heading, Text } from "@/components/typography";
import Button from "./Button";

interface InfoCardProps {
  icon: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  highlight?: boolean;
}

export default function InfoCard({
  icon,
  title,
  description,
  buttonText,
  buttonHref,
  highlight = false,
}: InfoCardProps) {
  return (
    <div className={`director-info-card ${highlight ? "highlight" : ""}`}>
      <div className="info-card-icon">
        <i className={icon}></i>
      </div>
      <Heading variant="h3" text={title} />
      <Text text={description} />
      <Button href={buttonHref} variant="primary">
        {buttonText} <i className="fas fa-arrow-right"></i>
      </Button>
    </div>
  );
}
