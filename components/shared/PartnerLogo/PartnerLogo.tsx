import { Text } from "@/components/typography";
import styles from "./PartnerLogo.module.css";

interface PartnerLogoProps {
  icon: string;
  text: string;
}

export default function PartnerLogo({ icon, text }: PartnerLogoProps) {
  return (
    <div className={styles.partnerLogo}>
      <i className={icon}></i>
      <Text text={text} as="span" />
    </div>
  );
}
