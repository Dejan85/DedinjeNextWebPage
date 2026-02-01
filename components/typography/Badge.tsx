import styles from "./Badge.module.css";

interface BadgeProps {
  text: string;
  variant?: "primary" | "light" | "accent" | "hero";
  className?: string;
}

export default function Badge({
  text,
  variant = "primary",
  className = "",
}: BadgeProps) {
  // Map variant to CSS module classes
  const variantClassMap = {
    primary: styles.variantPrimary,
    light: styles.variantLight,
    accent: styles.variantAccent,
    hero: styles.variantHero,
  };

  // Build classes array
  const classes = [styles.badge, variantClassMap[variant], className]
    .filter(Boolean)
    .join(" ");

  return <span className={classes}>{text}</span>;
}
