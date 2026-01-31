import styles from "./FeatureItem.module.css";

interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureItem({
  icon,
  title,
  description,
}: FeatureItemProps) {
  // Check if icon is a Font Awesome class or emoji
  const isFontAwesome = icon.includes("fa-") || icon.includes("fas ");

  return (
    <div className={styles.featureItem}>
      <div className={styles.featureIcon}>
        {isFontAwesome ? (
          <i className={icon}></i>
        ) : (
          <span className={styles.emojiIcon}>{icon}</span>
        )}
      </div>
      <div className={styles.featureText}>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}
