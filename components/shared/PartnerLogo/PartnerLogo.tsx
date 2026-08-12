import Image from "next/image";
import { Text } from "@/components/typography";
import styles from "./PartnerLogo.module.css";

interface PartnerLogoProps {
  icon?: string;
  image?: string;
  text: string;
  subtitle?: string;
}

export default function PartnerLogo({ icon, image, text, subtitle }: PartnerLogoProps) {
  return (
    <div className={styles.partnerLogo}>
      {image ? (
        <div className={styles.partnerLogoImgWrap}>
          <Image src={image} alt={text} fill style={{ objectFit: "contain" }} />
        </div>
      ) : (
        <i className={icon}></i>
      )}
      <Text text={text} as="span" />
      {subtitle && <span className={styles.partnerLogoSubtitle}>{subtitle}</span>}
    </div>
  );
}
