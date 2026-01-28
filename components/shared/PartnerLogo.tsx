import { Text } from "@/components/typography";

interface PartnerLogoProps {
  icon: string;
  text: string;
}

export default function PartnerLogo({ icon, text }: PartnerLogoProps) {
  return (
    <div className="partner-logo">
      <i className={icon}></i>
      <Text text={text} as="span" />
    </div>
  );
}
