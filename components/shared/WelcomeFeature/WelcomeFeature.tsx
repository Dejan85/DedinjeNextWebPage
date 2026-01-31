import styles from "./WelcomeFeature.module.css";

interface WelcomeFeatureProps {
  icon: string;
  text: string;
}

export default function WelcomeFeature({ icon, text }: WelcomeFeatureProps) {
  return (
    <div className={styles.welcomeFeature}>
      <i className={icon}></i>
      <span>{text}</span>
    </div>
  );
}
